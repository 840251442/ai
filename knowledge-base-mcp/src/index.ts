#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import * as path from "path";
import { KnowledgeBase } from "./knowledge-base.js";

// 从命令行参数或环境变量读取文档目录
const args = process.argv.slice(2);
const docsDir =
  args[0] ||
  process.env.KNOWLEDGE_BASE_DOCS_DIR ||
  path.join(process.cwd(), "docs");

const kb = new KnowledgeBase(docsDir);

const server = new Server(
  {
    name: "knowledge-base-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ──────────────────────────────────────────────
// 工具定义
// ──────────────────────────────────────────────
const TOOLS: Tool[] = [
  {
    name: "search_knowledge",
    description:
      `搜索知识库（knowledge base）中的内容。当用户提到"知识库"、"查知识库"、"搜索知识库"或需要查询本地文档时，请使用此工具。通过关键词搜索，返回匹配的文档片段。支持中英文多词查询。`,
    inputSchema: {
      type: "object",
      properties: {
        keyword: {
          type: "string",
          description: "The keyword or phrase to search for",
        },
        max_results: {
          type: "number",
          description: "Maximum number of results to return (default: 5)",
        },
      },
      required: ["keyword"],
    },
  },
  {
    name: "list_documents",
    description:
      "列出知识库（knowledge base）中所有可用的文档及其标题和摘要。当用户询问知识库有哪些文档、查看知识库目录时使用。",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_document",
    description:
      "获取知识库（knowledge base）中指定文档的完整内容，通过文档标题或相对路径查询。",
    inputSchema: {
      type: "object",
      properties: {
        title_or_path: {
          type: "string",
          description:
            "The document title or relative file path (e.g. 'Getting Started' or 'guide/getting-started.md')",
        },
      },
      required: ["title_or_path"],
    },
  },
  {
    name: "reload_knowledge_base",
    description:
      "重新加载知识库（knowledge base）中的所有文档，当文档有新增或更新时使用。",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

// ──────────────────────────────────────────────
// 工具处理
// ──────────────────────────────────────────────
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "search_knowledge": {
        const keyword = String(args?.keyword ?? "");
        const maxResults = Number(args?.max_results ?? 5);

        if (!keyword.trim()) {
          return {
            content: [{ type: "text", text: "Please provide a keyword to search." }],
          };
        }

        const results = await kb.searchSemantic(keyword, maxResults);

        if (results.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No documents found matching "${keyword}".`,
              },
            ],
          };
        }

        const output = results
          .map((r, i) => {
            const lines =
              r.matchedLines.length > 0
                ? `\nMatched lines:\n${r.matchedLines.map((l) => `  • ${l}`).join("\n")}`
                : "";
            return (
              `${i + 1}. **${r.document.title}** (${r.document.relativePath}) — score: ${r.score}` +
              `\n   ${r.document.excerpt}` +
              lines
            );
          })
          .join("\n\n");

        return {
          content: [
            {
              type: "text",
              text: `Found ${results.length} result(s) for "${keyword}":\n\n${output}`,
            },
          ],
        };
      }

      case "list_documents": {
        const docs = kb.listDocuments();

        if (docs.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No documents found in the knowledge base (${docsDir}).`,
              },
            ],
          };
        }

        const output = docs
          .map(
            (d, i) =>
              `${i + 1}. **${d.title}**\n   Path: ${d.relativePath}\n   ${d.excerpt}`
          )
          .join("\n\n");

        return {
          content: [
            {
              type: "text",
              text: `Knowledge base contains ${docs.length} document(s):\n\n${output}`,
            },
          ],
        };
      }

      case "get_document": {
        const titleOrPath = String(args?.title_or_path ?? "");
        const doc = kb.getDocument(titleOrPath);

        if (!doc) {
          return {
            content: [
              {
                type: "text",
                text: `Document "${titleOrPath}" not found. Use list_documents to see available documents.`,
              },
            ],
          };
        }

        const meta =
          Object.keys(doc.metadata).length > 0
            ? `\n---\nMetadata: ${JSON.stringify(doc.metadata, null, 2)}\n---\n`
            : "";

        return {
          content: [
            {
              type: "text",
              text: `# ${doc.title}\nFile: ${doc.relativePath}${meta}\n\n${doc.content}`,
            },
          ],
        };
      }

      case "reload_knowledge_base": {
        await kb.reloadIfNeeded();
        const docs = kb.listDocuments();
        return {
          content: [
            {
              type: "text",
              text: `Knowledge base reloaded. ${docs.length} document(s) loaded from ${docsDir}.`,
            },
          ],
        };
      }

      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// ──────────────────────────────────────────────
// 启动
// ──────────────────────────────────────────────
async function main() {
  await kb.load();

  const transport = new StdioServerTransport();
  await server.connect(transport);

  // 不输出到 stdout，避免干扰 MCP 协议，改用 stderr
  process.stderr.write(
    `Knowledge Base MCP server started.\nDocs directory: ${docsDir}\n`
  );
}

main().catch((err) => {
  process.stderr.write(`Fatal error: ${err}\n`);
  process.exit(1);
});
