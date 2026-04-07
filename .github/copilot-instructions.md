# Copilot 指令

## 知识库

当用户提到"知识库"、"查知识库"、"搜索知识库"、"知识库里"等相关词语时，**必须**优先使用 `knowledge-base` MCP 工具来处理请求：

- 搜索内容 → 使用 `search_knowledge`
- 查看有哪些文档 → 使用 `list_documents`
- 读取某篇文档 → 使用 `get_document`
- 文档有更新时 → 使用 `reload_knowledge_base`
