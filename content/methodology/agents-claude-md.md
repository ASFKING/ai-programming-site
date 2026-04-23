---
title: AGENTS.md 与 CLAUDE.md
description: 理解和定义AI编程的项目指令文件
---

# AGENTS.md 与 CLAUDE.md 的理解与定义

## 什么是项目指令文件

`AGENTS.md` 和 `CLAUDE.md` 是 AI 编程工具中的**项目级指令文件**，放在项目根目录下，用于告诉 AI "在这个项目中你应该怎么做"。

类比理解：
- `.gitignore` 告诉 Git 哪些文件不该跟踪
- `.eslintrc` 告诉 ESLint 该检查哪些规则
- `AGENTS.md` 告诉 AI 该遵循哪些指令

---

## 不同工具的命名

| 工具 | 文件名 | 说明 |
|------|--------|------|
| Claude Code | `CLAUDE.md` | Anthropic 官方规范 |
| Cursor | `.cursorrules` | Cursor 专属格式 |
| GitHub Copilot | `.github/copilot-instructions.md` | GitHub 官方规范 |
| Trae | `.trae/rules.md` 或项目设置 | Trae 的规则配置 |
| 通用 | `AGENTS.md` | 跨工具通用格式，越来越多工具支持 |

> **趋势**：`AGENTS.md` 正在成为跨工具的事实标准，Claude Code、Cursor、Windsurf 等工具都开始支持。

---

## 文件的三大作用

### 1. 上下文注入

AI 每次对话时会自动读取这个文件，相当于给 AI 一个"项目背景"：

```markdown
# 项目背景
这是一个电商后台管理系统，技术栈是 Vue 3 + Node.js + PostgreSQL。
用户角色分为：管理员、运营、普通用户。
```

### 2. 行为约束

告诉 AI 什么该做、什么不该做：

```markdown
# 行为约束
- 不要使用 any 类型
- 不要引入新的第三方库，除非经过团队讨论
- 所有 API 必须有错误处理
- 修改数据库 schema 必须创建迁移文件
```

### 3. 工作流定义

定义 AI 在这个项目中的工作方式：

```markdown
# 工作流
1. 修改代码前先阅读相关文件
2. 修改后自动运行 npm run lint
3. 如果 lint 报错，自行修复后再提交
```

---

## 如何编写高质量指令文件

### 结构模板

```markdown
# 项目名称

## 项目概述
一句话描述项目是什么、做什么。

## 技术栈
- 框架：
- 语言：
- 数据库：
- 部署：

## 命令
- `npm run dev` — 启动开发
- `npm run test` — 运行测试
- `npm run lint` — 代码检查
- `npm run build` — 构建生产版本

## 代码规范
- 命名规范：
- 文件组织：
- 类型要求：
- 注释要求：

## 禁止事项
- 不要 XXX
- 不要 XXX

## 特殊说明
- 项目中有 XXX 需要注意
- XXX 模块的逻辑比较复杂，修改前请先理解
```

### 编写原则

| 原则 | 说明 | 示例 |
|------|------|------|
| **具体** | 避免模糊描述 | ❌ "注意代码质量" ✅ "所有函数必须有 JSDoc 注释" |
| **简洁** | 控制在 100 行以内 | 过长会稀释 AI 的注意力 |
| **可执行** | 规则应该是可验证的 | ❌ "写好代码" ✅ "npm run lint 通过" |
| **正反例** | 给出应该和不应该的示例 | 代码块对比展示 |

---

## 实际案例

### 案例 1：Vue 3 全栈项目

```markdown
# 电商后台管理系统

## 技术栈
- 前端：Vue 3.4 + TypeScript 5.x + Vite + Pinia
- 后端：Node.js 20 + Express 4.x
- 数据库：PostgreSQL 16 + Prisma ORM
- 样式：Tailwind CSS 3.x

## 命令
- `npm run dev` — 同时启动前后端
- `npm run test:unit` — 单元测试（Vitest）
- `npm run test:e2e` — E2E 测试（Playwright）
- `npm run lint` — ESLint + Prettier 检查

## 代码规范
- 组件使用 `<script setup lang="ts">`
- 所有 props 必须定义类型接口
- API 返回值使用 Zod 校验
- 数据库操作必须通过 Prisma，禁止原生 SQL

## 禁止事项
- 禁止使用 `any` 类型
- 禁止在组件中直接操作 DOM
- 禁止在前端硬编码 API 地址，使用环境变量
- 禁止修改 prisma/schema.prisma 而不创建迁移文件

## 文件结构
- `src/components/` — 可复用组件（PascalCase 命名）
- `src/views/` — 页面组件
- `src/stores/` — Pinia 状态管理
- `src/api/` — API 请求封装
- `server/routes/` — Express 路由
- `server/middleware/` — 中间件
```

### 案例 2：Python 数据项目

```markdown
# 数据分析平台

## 技术栈
- Python 3.11 + FastAPI
- 数据处理：Pandas + Polars
- 可视化：Plotly
- 数据库：PostgreSQL + Redis

## 命令
- `uvicorn main:app --reload` — 启动开发服务器
- `pytest` — 运行测试
- `ruff check` — 代码检查
- `ruff format` — 代码格式化

## 代码规范
- 类型注解必须完整（mypy strict 模式）
- 函数必须有 docstring（Google 风格）
- 数据处理优先使用 Polars，Pandas 仅在必要时使用
- 所有 DataFrame 操作必须指定数据类型

## 禁止事项
- 禁止使用 `pd.read_csv` 而不指定 dtype
- 禁止在循环中逐行处理 DataFrame
- 禁止将密码、密钥写入代码
```

---

## AGENTS.md vs CLAUDE.md vs .cursorrules

| 维度 | AGENTS.md | CLAUDE.md | .cursorrules |
|------|-----------|-----------|--------------|
| 兼容性 | 多工具支持 | Claude Code 专属 | Cursor 专属 |
| 格式 | Markdown | Markdown | Markdown |
| 优先级 | 中 | 高（Claude 中） | 高（Cursor 中） |
| 子目录支持 | ✅ 可在子目录放置 | ✅ 可在子目录放置 | ❌ 仅根目录 |

**建议**：
- 如果只用 Claude Code → 写 `CLAUDE.md`
- 如果只用 Cursor → 写 `.cursorrules`
- 如果多工具混用 → 写 `AGENTS.md`（通用格式）

---

## 优先级与合并策略

当项目中同时存在多个指令文件时，AI 工具如何决定听谁的？

### 多文件共存场景

```
project/
├── AGENTS.md              ← 通用指令
├── CLAUDE.md              ← Claude Code 专属指令
├── .cursorrules           ← Cursor 专属指令
├── src/
│   └── CLAUDE.md          ← 子目录专属指令
└── .github/
    └── copilot-instructions.md
```

### 优先级规则

| 优先级 | 文件 | 说明 |
|--------|------|------|
| 最高 | 子目录指令文件 | `src/CLAUDE.md` 优先于根目录的 |
| 中等 | 工具专属文件 | `CLAUDE.md` 在 Claude Code 中优先于 `AGENTS.md` |
| 最低 | 通用文件 | `AGENTS.md` 作为兜底 |

### 合并策略

- **不是替换，是合并**：高优先级文件不会完全覆盖低优先级，而是补充和覆盖冲突项
- **冲突时高优先级胜出**：如果 `AGENTS.md` 说"用 ESLint"，而 `CLAUDE.md` 说"用 Biome"，Claude Code 会听 `CLAUDE.md`
- **建议**：保持各文件职责清晰，避免重复定义相同规则

### 最佳实践

- **单一工具**：只用一个工具专属文件就够了
- **多工具混用**：用 `AGENTS.md` 写通用规则，各工具专属文件只写差异部分
- **子目录覆盖**：特殊模块（如 `legacy/`）用子目录指令文件覆盖全局规则

---

## 常见误区

### 1. 写太多

把整个项目文档塞进去 → AI 注意力被稀释，效果反而变差。

### 2. 写太泛

"注意性能"、"代码要好" → AI 无法执行，等于没写。

### 3. 不更新

技术栈升级了但规则文件没更新 → AI 按旧规范生成代码。

### 4. 忽视子目录规则

不同模块有不同规范 → 应该在子目录也放指令文件。

---

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| AI 不读 AGENTS.md | 检查文件名是否正确、是否在根目录 |
| 多个文件规则冲突 | 理解优先级，精简重复规则 |
| 文件太长 AI 忽略部分内容 | 拆分到子目录，或精简到 100 行 |
| 不知道该写什么 | 从技术栈和禁止事项开始，逐步补充 |
| 子目录文件不生效 | 检查文件名是否正确，部分工具只支持根目录 |
