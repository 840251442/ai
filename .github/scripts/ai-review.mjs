import { readFileSync } from "fs";

const QWEN_API_KEY = process.env.QWEN_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.PR_NUMBER;
const REPO = process.env.REPO;

const REVIEW_PROMPT = `你是一位拥有 15 年经验的资深代码审查工程师。请对以下 PR diff 进行全方位审查。

## 审查维度
1. **安全性**：注入攻击、越权、敏感数据泄露、OWASP Top 10
2. **性能**：时间/空间复杂度、N+1 查询、内存泄漏、并发问题
3. **代码规范**：命名、DRY、可读性、函数设计
4. **架构设计**：职责划分、耦合度、扩展性
5. **错误处理**：异常捕获、边界条件、资源释放
6. **可维护性**：可测试性、变更影响范围

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
