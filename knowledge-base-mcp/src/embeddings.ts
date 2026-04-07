const OLLAMA_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
export const EMBED_MODEL =
  process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

/**
 * 调用 Ollama 生成文本向量，失败返回 null（Ollama 未启动时降级为关键词搜索）
 */
export async function embedText(text: string): Promise<number[] | null> {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: EMBED_MODEL, prompt: text }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { embedding: number[] };
    return data.embedding ?? null;
  } catch {
    return null;
  }
}

/**
 * 余弦相似度，值域 [-1, 1]，越接近 1 越相似
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * 简单哈希，用于判断 chunk 文本是否变化，决定是否需要重新生成向量
 */
export function simpleHash(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(31, h) + text.charCodeAt(i);
    h |= 0;
  }
  return (h >>> 0).toString(16);
}
