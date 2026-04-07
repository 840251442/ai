# knowledge-base-mcp

A **Model Context Protocol (MCP)** server that lets AI assistants query your local Markdown knowledge base — search by keyword, browse documents, and retrieve full content.

## Features

- Full-text keyword search with relevance scoring
- Exact title / path matching
- Frontmatter support (title, tags, custom fields)
- Auto-reloads on demand
- Works with any directory of `.md` files
- Publishable to npm, easy integration with Claude Desktop / VS Code Copilot

## Installation

```bash
npm install -g knowledge-base-mcp
```

## Usage

### CLI

```bash
# Point to your docs folder
knowledge-base-mcp /path/to/your/docs

# Or via environment variable
KNOWLEDGE_BASE_DOCS_DIR=/path/to/docs knowledge-base-mcp
```

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "knowledge-base": {
      "command": "knowledge-base-mcp",
      "args": ["/absolute/path/to/your/docs"]
    }
  }
}
```

### VS Code (`.vscode/mcp.json`)

```json
{
  "servers": {
    "knowledge-base": {
      "type": "stdio",
      "command": "knowledge-base-mcp",
      "args": ["/absolute/path/to/your/docs"]
    }
  }
}
```

## Available MCP Tools

| Tool | Description |
|------|-------------|
| `search_knowledge` | Search documents by keyword (supports multi-word) |
| `list_documents` | List all documents with titles and excerpts |
| `get_document` | Retrieve full content by title or file path |
| `reload_knowledge_base` | Reload docs directory (pick up new/changed files) |

## Document Format

Place `.md` files in your docs directory. Subdirectories are supported.

```
docs/
  getting-started.md
  api/
    auth.md
    endpoints.md
```

Add optional frontmatter to set a title, tags, or any custom metadata:

```markdown
---
title: API Authentication
tags: [api, security]
---

# API Authentication

Content here...
```

## Development

```bash
git clone <repo>
cd knowledge-base-mcp
npm install
npm run build
npm run dev -- ./docs   # run against local docs
```

## License

MIT
