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
- 按以下格式输出：

### 📊 总体评价
综合评分：X/10，一句话总结

### 🚨 严重问题（必须修复）
指出文件名和行号，给出修复代码示例

### ⚠️ 建议改进（推荐修复）
不会导致故障但应该优化的问题

### 💡 优化建议（锦上添花）
可以提升代码质量但非必须

### ✅ 亮点
代码中做得好的地方

如果代码质量很好没有问题，也请明确说明并给出肯定。
`;

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
        model: "qwen-turbo",
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
  return data.choices[0].message.content;
}

const BOT_COMMENT_TAG = "<!-- ai-reviewer-bot -->";

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

async function postComment(body) {
  // 先清理旧评论
  await deleteOldComments();

  const response = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        body: `${BOT_COMMENT_TAG}\n## 🤖 AI Code Review\n\n${body}`,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${error}`);
  }

  console.log("Comment posted successfully!");
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

  console.log("📝 Posting comment to PR...");
  await postComment(review);

  console.log("✅ Done!");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
