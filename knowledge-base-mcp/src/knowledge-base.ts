import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";
import matter from "gray-matter";
import { embedText, cosineSimilarity, simpleHash, EMBED_MODEL } from "./embeddings.js";

export interface Document {
  title: string;
  filename: string;
  relativePath: string;
  content: string;
  excerpt: string;
  metadata: Record<string, unknown>;
}

export interface SearchResult {
  document: Document;
  score: number;
  matchedLines: string[];
}

interface Chunk {
  relativePath: string;
  docTitle: string;
  heading: string;
  text: string;
  hash: string;
  embedding: number[] | null;
}

interface VectorCache {
  version: string;
  model: string;
  chunks: Chunk[];
}

const CACHE_VERSION = "1.0";
const CACHE_FILENAME = ".vector-cache.json";
const MAX_CHUNK_LENGTH = 2000;

export class KnowledgeBase {
  private docsDir: string;
  private documents: Document[] = [];
  private chunks: Chunk[] = [];
  private vectorsLoaded = false;
  private loaded = false;

  constructor(docsDir: string) {
    this.docsDir = path.resolve(docsDir);
  }

  async load(): Promise<void> {
    if (!fs.existsSync(this.docsDir)) {
      throw new Error(`Docs directory not found: ${this.docsDir}`);
    }

    const files = await glob("**/*.md", {
      cwd: this.docsDir,
      absolute: false,
    });

    this.documents = [];
    for (const file of files) {
      const fullPath = path.join(this.docsDir, file);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const parsed = matter(raw);
      const content = parsed.content.trim();

      // 从 frontmatter 或文件名推断标题
      const title =
        (parsed.data.title as string) ||
        this.inferTitle(file, content);

      this.documents.push({
        title,
        filename: path.basename(file),
        relativePath: file,
        content,
        excerpt: this.buildExcerpt(content),
        metadata: parsed.data as Record<string, unknown>,
      });
    }

    this.loaded = true;
    await this.buildVectorIndex();
  }

  private inferTitle(filePath: string, content: string): string {
    // 尝试从 markdown 第一个 # 标题提取
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1].trim();

    // fallback: 文件名去掉扩展名
    const basename = path.basename(filePath, ".md");
    return basename.replace(/[-_]/g, " ");
  }

  private buildExcerpt(content: string, maxLength = 200): string {
    // 去掉 markdown 标记
    const plain = content
      .replace(/^#+\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/\n+/g, " ")
      .trim();

    return plain.length > maxLength
      ? plain.slice(0, maxLength) + "..."
      : plain;
  }

  private ensureLoaded(): void {
    if (!this.loaded) {
      throw new Error(
        "Knowledge base not loaded. Call load() first."
      );
    }
  }

  listDocuments(): Pick<Document, "title" | "relativePath" | "excerpt" | "metadata">[] {
    this.ensureLoaded();
    return this.documents.map(({ title, relativePath, excerpt, metadata }) => ({
      title,
      relativePath,
      excerpt,
      metadata,
    }));
  }

  getDocument(titleOrPath: string): Document | null {
    this.ensureLoaded();
    const query = titleOrPath.toLowerCase();
    return (
      this.documents.find(
        (d) =>
          d.title.toLowerCase() === query ||
          d.relativePath.toLowerCase() === query ||
          d.filename.toLowerCase() === query
      ) ?? null
    );
  }

  search(keyword: string, maxResults = 10): SearchResult[] {
    this.ensureLoaded();
    if (!keyword.trim()) return [];

    const terms = keyword
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const results: SearchResult[] = [];

    for (const doc of this.documents) {
      const titleLower = doc.title.toLowerCase();
      const contentLower = doc.content.toLowerCase();

      let score = 0;
      const matchedLines: string[] = [];

      for (const term of terms) {
        // 标题匹配权重更高
        if (titleLower.includes(term)) {
          score += 10;
        }

        // 全文匹配
        const lines = doc.content.split("\n");
        for (const line of lines) {
          if (line.toLowerCase().includes(term)) {
            score += 1;
            const trimmed = line.trim();
            if (trimmed && !matchedLines.includes(trimmed)) {
              matchedLines.push(trimmed);
            }
          }
        }
      }

      if (score > 0) {
        results.push({
          document: doc,
          score,
          matchedLines: matchedLines.slice(0, 5),
        });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }

  // ── 向量索引 ──────────────────────────────────────────

  private createChunk(relativePath: string, docTitle: string, heading: string, text: string): Omit<Chunk, "embedding"> {
    return {
      relativePath,
      docTitle,
      heading,
      text,
      hash: simpleHash(text),
    };
  }

  private splitByParagraphs(doc: Document, heading: string, sectionText: string): Omit<Chunk, "embedding">[] {
    const paragraphs = sectionText
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter((part) => part.length > 0);

    const chunks: Omit<Chunk, "embedding">[] = [];
    let current = "";
    let partIndex = 1;

    for (const paragraph of paragraphs) {
      const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
      const candidateText = `# ${doc.title}\n\n${candidate}`;

      if (candidateText.length <= MAX_CHUNK_LENGTH) {
        current = candidate;
        continue;
      }

      if (current) {
        chunks.push(
          this.createChunk(
            doc.relativePath,
            doc.title,
            `${heading} (part ${partIndex})`,
            `# ${doc.title}\n\n${current}`
          )
        );
        partIndex += 1;
      }

      if (`# ${doc.title}\n\n${paragraph}`.length <= MAX_CHUNK_LENGTH) {
        current = paragraph;
      } else {
        const maxBodyLength = Math.max(1, MAX_CHUNK_LENGTH - (`# ${doc.title}\n\n`).length);
        for (let start = 0; start < paragraph.length; start += maxBodyLength) {
          const slice = paragraph.slice(start, start + maxBodyLength);
          chunks.push(
            this.createChunk(
              doc.relativePath,
              doc.title,
              `${heading} (part ${partIndex})`,
              `# ${doc.title}\n\n${slice}`
            )
          );
          partIndex += 1;
        }
        current = "";
      }
    }

    if (current) {
      chunks.push(
        this.createChunk(
          doc.relativePath,
          doc.title,
          `${heading} (part ${partIndex})`,
          `# ${doc.title}\n\n${current}`
        )
      );
    }

    return chunks;
  }

  private splitLargeSection(doc: Document, heading: string, sectionText: string): Omit<Chunk, "embedding">[] {
    const fullText = `# ${doc.title}\n\n${sectionText}`;
    if (fullText.length <= MAX_CHUNK_LENGTH) {
      return [this.createChunk(doc.relativePath, doc.title, heading, fullText)];
    }

    const subSections = sectionText
      .split(/(?=^###\s)|(?=^####\s)|(?=^#####\s)|(?=^######\s)/m)
      .map((part) => part.trim())
      .filter((part) => part.length > 0);

    if (subSections.length <= 1) {
      return this.splitByParagraphs(doc, heading, sectionText);
    }

    const chunks: Omit<Chunk, "embedding">[] = [];
    for (const part of subSections) {
      const subHeadingMatch = part.match(/^#{3,6}\s+(.+)$/m);
      const subHeading = subHeadingMatch ? `${heading} / ${subHeadingMatch[1].trim()}` : heading;
      chunks.push(...this.splitLargeSection(doc, subHeading, part));
    }

    return chunks;
  }

  private chunkDocument(doc: Document): Omit<Chunk, "embedding">[] {
    // 按 ## 标题分块，每块保留文档标题作为上下文
    const parts = doc.content.split(/(?=^## )/m);
    const result: Omit<Chunk, "embedding">[] = [];

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.length < 20) continue;
      const headingMatch = trimmed.match(/^##\s+(.+)$/m);
      const heading = headingMatch ? headingMatch[1].trim() : doc.title;
      result.push(...this.splitLargeSection(doc, heading, trimmed));
    }

    // 没有二级标题时整篇作为一块
    if (result.length === 0) {
      result.push(...this.splitLargeSection(doc, doc.title, doc.content.trim()));
    }

    return result;
  }

  private async buildVectorIndex(): Promise<void> {
    const cachePath = path.join(this.docsDir, CACHE_FILENAME);

    // 加载磁盘缓存
    let cached: Chunk[] = [];
    if (fs.existsSync(cachePath)) {
      try {
        const raw = fs.readFileSync(cachePath, "utf-8");
        const parsed = JSON.parse(raw) as VectorCache;
        if (parsed.version === CACHE_VERSION && parsed.model === EMBED_MODEL) {
          cached = parsed.chunks;
        }
      } catch { /* 缓存损坏，忽略 */ }
    }

    const cacheMap = new Map(cached.map((c) => [c.hash, c.embedding]));

    // 生成当前文档的所有 chunks
    const allChunks: Chunk[] = [];
    for (const doc of this.documents) {
      for (const c of this.chunkDocument(doc)) {
        allChunks.push({ ...c, embedding: cacheMap.get(c.hash) ?? null });
      }
    }

    // 对缺失向量的 chunk 调用 Ollama
    const missing = allChunks.filter((c) => c.embedding === null);
    if (missing.length > 0) {
      process.stderr.write(`[knowledge-base] Generating embeddings for ${missing.length} chunk(s) via Ollama...\n`);
      for (const chunk of missing) {
        chunk.embedding = await embedText(chunk.text);
      }
      // 保存到磁盘缓存
      const newCache: VectorCache = { version: CACHE_VERSION, model: EMBED_MODEL, chunks: allChunks };
      try {
        fs.writeFileSync(cachePath, JSON.stringify(newCache));
        process.stderr.write(`[knowledge-base] Vector cache saved (${allChunks.length} chunks).\n`);
      } catch { /* 写入失败忽略 */ }
    }

    this.chunks = allChunks;
    this.vectorsLoaded = allChunks.some((c) => c.embedding !== null);
  }

  /**
   * 语义搜索：用 Ollama 向量相似度排序返回最相关文档。
   * 若 Ollama 不可用自动降级为关键词搜索。
   */
  async searchSemantic(query: string, maxResults = 5): Promise<SearchResult[]> {
    if (!this.vectorsLoaded) return this.search(query, maxResults);

    const queryVec = await embedText(query);
    if (!queryVec) return this.search(query, maxResults);

    // 对每个 chunk 计算相似度，取每篇文档的最高分
    const docBest = new Map<string, { score: number; heading: string }>();
    for (const chunk of this.chunks) {
      if (!chunk.embedding) continue;
      const score = cosineSimilarity(queryVec, chunk.embedding);
      const prev = docBest.get(chunk.relativePath);
      if (!prev || score > prev.score) {
        docBest.set(chunk.relativePath, { score, heading: chunk.heading });
      }
    }

    return Array.from(docBest.entries())
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, maxResults)
      .map(([relativePath, { score, heading }]) => {
        const doc = this.documents.find((d) => d.relativePath === relativePath)!;
        return {
          document: doc,
          score: Math.round(score * 1000) / 1000,
          matchedLines: [heading],
        };
      });
  }

  // ───────────────────────────────────────────────────────

  reloadIfNeeded(): Promise<void> {
    this.loaded = false;
    this.vectorsLoaded = false;
    return this.load();
  }
}
