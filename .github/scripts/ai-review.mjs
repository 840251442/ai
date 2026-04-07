import { readFileSync } from "fs";

const QWEN_API_KEY = process.env.QWEN_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.PR_NUMBER;
const REPO = process.env.REPO;

const REVIEW_PROMPT = `你是一位拥有 15 年经验的资深前端代码审查工程师，精通 JavaScript、TypeScript 和 React 生态。请对以下 PR diff 进行全方位审查。

## 审查维度

### 1. TypeScript 类型安全
- 是否滥用 any、unknown 是否正确收窄
- 泛型使用是否合理、类型推断是否充分
- 接口/类型定义是否准确完整
- 是否有类型断言（as）可以用类型守卫替代
- 枚举 vs 联合类型的选择是否恰当

### 2. React 最佳实践
- Hook 使用是否正确（依赖数组是否完整、是否违反 Hook 规则）
- useMemo/useCallback 是否必要（避免过早优化和遗漏优化）
- 组件是否应该拆分或合并、职责是否单一
- key 是否使用了稳定且唯一的值（禁止用 index 作 key 的场景）
- 状态管理是否合理（state 提升/下沉、是否该用 context 或状态库）
- useEffect 是否有清理函数、是否存在竞态条件
- 受控/非受控组件模式是否一致

### 3. 安全性
- XSS：dangerouslySetInnerHTML、用户输入未转义
- 敏感信息是否泄露到前端代码或日志中
- API 请求是否有 CSRF 防护
- 依赖包是否有已知漏洞
- eval/new Function 等动态执行是否存在

### 4. 性能
- 不必要的重渲染（props 引用变化、内联对象/函数/箭头函数）
- 大列表是否使用虚拟化（react-window/react-virtuoso）
- 图片/组件是否懒加载
- Bundle 体积：是否有可 tree-shake 的导入方式
- 异步请求是否有防抖/节流、是否处理了竞态
- 是否有内存泄漏（未清理的定时器/事件监听/订阅）

### 5. 代码规范
- 命名：组件 PascalCase、hook 以 use 开头、常量 UPPER_SNAKE_CASE
- 文件组织：组件/hook/工具函数/类型是否合理分离
- ES 新特性：可选链、空值合并、解构、模板字符串
- async/await vs .then 是否统一
- 避免魔法数字和硬编码字符串

### 6. 错误处理
- API 请求是否有 try/catch 和 loading/error 状态
- 组件是否有 ErrorBoundary 兜底
- Promise 是否有 reject 处理（避免 unhandled rejection）
- 边界条件：空数组、null/undefined、网络超时

## 输出要求
- 只审查变更的代码，不审查未修改的部分
- 使用中文输出
- 仅输出 JSON，不要在 JSON 外层包裹 markdown 代码块标记
- JSON 结构必须严格如下：
{
  "overall": "一句话总体评价",
  "score": 0-10 的数字,
  "findings": [
    {
      "severity": "high|medium|low",
      "file": "问题所在文件路径（来自 diff +++ b/... 行，去掉 b/ 前缀，无法确定时留空字符串）",
      "line": 42,
      "title": "问题标题",
      "detail": "问题描述（1-3句），如有代码示例请使用 markdown 代码块格式",
      "suggestion": "可执行修复建议（尽量具体），如有代码示例请使用 markdown 代码块格式"
    }
  ],
  "highlights": ["亮点1", "亮点2"]
}

规则：
- findings 只包含“需要改进”的点；没有问题时返回空数组 []
- file 必须来自 diff 中真实的文件路径（+++ b/path 去掉 b/ 前缀），line 必须是 diff 中有 + 开头的真实新增行行号；无法精确定位时 file 用空字符串、line 用 0
- 最多返回 12 条 findings
- detail 和 suggestion 字段中的代码片段必须用 markdown 代码块包裹，并标注语言类型（如 \`\`\`typescript、\`\`\`javascript 等）
`;

const BOT_COMMENT_TAG = "<!-- ai-reviewer-bot -->";
const CHECKLIST_START = "<!-- ai-reviewer-checklist:start -->";
const CHECKLIST_END = "<!-- ai-reviewer-checklist:end -->";

async function getDiff() {
  const diff = readFileSync("/tmp/pr.diff", "utf-8");
  const changedFiles = readFileSync("/tmp/changed_files.txt", "utf-8");

  // 过滤掉 lock 文件和构建产物的 diff
  const filteredDiff = diff
    .split("diff --git")
    .filter((section) => {
      const skipPatterns = [
        /package-lock\.json/,
        /yarn\.lock/,
        /pnpm-lock\.yaml/,
        /\.min\.js/,
        /\.min\.css/,
        /\/dist\//,
        /\/build\//,
      ];
      return !skipPatterns.some((p) => p.test(section));
    })
    .join("diff --git");

  return { diff: filteredDiff, changedFiles };
}

async function callQwenAPI(diff) {
  // 限制 diff 长度避免超出 token 限制
  const maxLength = 30000;
  const truncatedDiff =
    diff.length > maxLength
      ? diff.slice(0, maxLength) + "\n\n... (diff 过长已截断)"
      : diff;

  const response = await fetch(
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${QWEN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen-coder-plus",
        messages: [
          { role: "system", content: REVIEW_PROMPT },
          {
            role: "user",
            content: `请审查以下 PR diff:\n\n\`\`\`diff\n${truncatedDiff}\n\`\`\``,
          },
        ],
        temperature: 0.3,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Qwen API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content ?? "";

  // 兼容模型偶发返回 ```json 包裹
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return {
      overall: "模型返回非结构化内容，已降级为单条建议。",
      score: 6,
      findings: [
        {
          severity: "medium",
          title: "模型输出格式异常",
          detail: cleaned.slice(0, 1500),
          suggestion: "请检查 prompt 或切换模型后重试。",
        },
      ],
      highlights: [],
    };
  }
}

async function deleteOldComments() {
  // 获取已有评论，删除上一次 bot 的评论避免重复
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) return;

  const comments = await response.json();
  for (const comment of comments) {
    if (comment.body && comment.body.includes(BOT_COMMENT_TAG)) {
      await fetch(
        `https://api.github.com/repos/${REPO}/issues/comments/${comment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      console.log(`Deleted old comment #${comment.id}`);
    }
  }
}

async function postIssueComment(body) {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({ body }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function getPullRequest() {
  const response = await fetch(`https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Get PR error: ${response.status} - ${error}`);
  }

  return response.json();
}

function buildChecklistSection(findings, commentUrls) {
  if (!findings.length) {
    return `${CHECKLIST_START}
## AI Review Tasks

本次 AI Review 未发现需要改进的项。
${CHECKLIST_END}`;
  }

  const lines = findings.map((item, index) => {
    const level = String(item.severity || "medium").toUpperCase();
    const title = item.title || `改进项 ${index + 1}`;
    const commentUrl = commentUrls[index];
    const link = commentUrl ? ` ([查看评论](${commentUrl}))` : "";
    return `- [ ] [${level}] ${title}${link}`;
  });

  return `${CHECKLIST_START}
## AI Review Tasks

请逐项确认并勾选，未勾选项会在 PR 任务计数中显示。

${lines.join("\n")}
${CHECKLIST_END}`;
}

function upsertChecklistToBody(originalBody, section) {
  const body = originalBody || "";
  const start = body.indexOf(CHECKLIST_START);
  const end = body.indexOf(CHECKLIST_END);

  if (start >= 0 && end > start) {
    const before = body.slice(0, start).trimEnd();
    const after = body.slice(end + CHECKLIST_END.length).trimStart();
    const merged = [before, section, after].filter(Boolean).join("\n\n");
    return merged.trim();
  }

  if (!body.trim()) return section;
  return `${body.trim()}\n\n${section}`;
}

async function updatePullRequestBody(newBody) {
  const response = await fetch(`https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({ body: newBody }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Update PR body error: ${response.status} - ${error}`);
  }
}

function buildFindingComment(item) {
  const severityEmoji = { high: "🔴", medium: "🟡", low: "🔵" };
  const level = String(item.severity || "medium").toUpperCase();
  const emoji = severityEmoji[item.severity] || "⚪";
  return [
    `${BOT_COMMENT_TAG}`,
    `${emoji} **[${level}] ${item.title || "改进项"}**`,
    ``,
    `**问题描述**`,
    item.detail || "无",
    ``,
    `**修复建议**`,
    item.suggestion || "请结合上下文修复。",
  ].join("\n");
}

async function deleteOldReviews() {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (!response.ok) return;
  const reviews = await response.json();
  for (const review of reviews) {
    if (
      review.body &&
      review.body.includes(BOT_COMMENT_TAG) &&
      review.state !== "DISMISSED"
    ) {
      await fetch(
        `https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}/reviews/${review.id}/dismissals`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({ message: "已被新一轮 AI Review 替代" }),
        }
      );
      console.log(`Dismissed old review #${review.id}`);
    }
  }
}

async function createPRReview(findings, review, headSha) {
  const severityEmoji = { high: "🔴", medium: "🟡", low: "🔵" };
  const score = Number(review.score ?? 7);
  const event = score < 6 ? "REQUEST_CHANGES" : "COMMENT";

  // 分类：有精确位置的走 inline thread，其余放进 body
  const inlineFindings = findings.filter(
    (f) => f.file && String(f.file).trim() && f.line && Number(f.line) > 0
  );
  const bodyFindings = findings.filter(
    (f) => !(f.file && String(f.file).trim() && f.line && Number(f.line) > 0)
  );

  // 构建 review body（总览 + 无位置的 findings）
  const buildBody = (extraFindings = []) => {
    const parts = [
      `${BOT_COMMENT_TAG}`,
      `## 🤖 AI Code Review`,
      ``,
      `| | |`,
      `|---|---|`,
      `| **总体评价** | ${review.overall || "已完成本次变更审查。"} |`,
      `| **综合评分** | ${score}/10 |`,
      `| **改进项** | ${findings.length} 条（${inlineFindings.length} 条已标注到代码行） |`,
    ];
    if (Array.isArray(review.highlights) && review.highlights.length) {
      parts.push(``, `### ✅ 亮点`, ...review.highlights.map((x) => `- ${x}`));
    }
    const allBodyFindings = [...bodyFindings, ...extraFindings];
    if (allBodyFindings.length) {
      parts.push(``, `---`, ``, `### 📋 其他改进项`);
      allBodyFindings.forEach((item, i) => {
        const level = String(item.severity || "medium").toUpperCase();
        const emoji = severityEmoji[item.severity] || "⚪";
        parts.push(
          ``,
          `#### ${emoji} [${level}] ${item.title || `改进项 ${i + 1}`}`,
          item.file ? `> \`${item.file}${item.line ? `:${item.line}` : ""}\`` : "",
          ``,
          `**问题描述**`,
          item.detail || "无",
          ``,
          `**修复建议**`,
          item.suggestion || "请结合上下文修复。"
        );
      });
    }
    return parts.join("\n");
  };

  const comments = inlineFindings.map((item) => ({
    path: String(item.file).trim(),
    line: Number(item.line),
    side: "RIGHT",
    body: buildFindingComment(item),
  }));

  // 先尝试带 inline comments 提交
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}/reviews`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({ commit_id: headSha, body: buildBody(), event, comments }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    // 若 inline comments 位置非法，降级为纯 body review
    if (comments.length > 0) {
      console.warn(`Review with inline comments failed (${response.status}), retrying without inline: ${error}`);
      const retryResponse = await fetch(
        `https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}/reviews`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            commit_id: headSha,
            body: buildBody(inlineFindings),
            event,
            comments: [],
          }),
        }
      );
      if (!retryResponse.ok) {
        const retryError = await retryResponse.text();
        throw new Error(`GitHub PR Review error (retry): ${retryResponse.status} - ${retryError}`);
      }
      const retryData = await retryResponse.json();
      console.log(`Review created (fallback) #${retryData.id}`);
      return retryData;
    }
    throw new Error(`GitHub PR Review error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  console.log(`Review created #${data.id} with ${comments.length} inline thread(s)`);
  return data;
}

async function main() {
  console.log("🔍 Getting PR diff...");
  const { diff, changedFiles } = await getDiff();

  if (!diff.trim()) {
    console.log("No meaningful diff found, skipping review.");
    return;
  }

  console.log(`📄 Changed files:\n${changedFiles}`);
  console.log(`📏 Diff length: ${diff.length} chars`);

  console.log("🤖 Calling Qwen API for review...");
  const review = await callQwenAPI(diff);
  const findings = Array.isArray(review.findings) ? review.findings.slice(0, 12) : [];

  console.log("🔍 Getting PR info...");
  const pr = await getPullRequest();
  const headSha = pr.head.sha;

  // 清理旧 bot 评论和 review，避免多轮运行重复堆积
  await deleteOldComments();
  await deleteOldReviews();

  console.log("📝 Creating PR review with inline threads...");
  const createdReview = await createPRReview(findings, review, headSha);
  const reviewUrl = `https://github.com/${REPO}/pull/${PR_NUMBER}#pullrequestreview-${createdReview.id}`;
  const commentUrls = findings.map(() => reviewUrl);

  console.log("🧾 Updating PR checklist...");
  const checklistSection = buildChecklistSection(findings, commentUrls);
  const newBody = upsertChecklistToBody(pr.body, checklistSection);
  await updatePullRequestBody(newBody);

  console.log("✅ Done!");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
