---
title: Spec 驱动开发
description: 用结构化的Spec文档约束AI生成边界，含SpecKit工具链详解与Trae实战
lastUpdated: '2026-04-27'
---

# Spec-Driven Development（规范驱动开发）

## 我应该用 Spec 吗？

在深入学习之前，先判断你的项目是否需要 Spec：

```
你的项目是什么规模？
│
├─ 单文件 / 小脚本 / 个人项目
│   → Chat 模式或 Plan 模式就够了，不需要 Spec
│
├─ 多文件 / 中等复杂度 / 2-5 人团队
│   → 考虑 Spec 驱动开发，从轻量级 Spec 开始
│
└─ 大型项目 / 企业级 / 合规要求 / 遗留系统改造
    → 必须使用 Spec 驱动开发
```

**快速判断**：
- AI 一次生成的代码你**能在 10 分钟内审查完** → 不需要 Spec
- 涉及**多个文件的协同修改** → 建议用 Spec
- 需要**可追溯的需求文档** → 必须用 Spec
- 有**合规/审计要求** → 必须用 Spec

---

## 什么是 Spec-Driven Development

**Spec-Driven Development**（规范驱动开发）是 AI 编程的主流工作流，核心是**用结构化的 Spec 文档约束 AI 生成的边界**，将"模糊需求"转化为"可执行的验收标准"，从而解决 AI 的"幻觉"问题，提升代码质量。

**传统开发 vs SDD**：

| 维度 | 传统开发 | Spec 驱动开发 |
|------|----------|--------------|
| 流程 | 需求 → 代码 → 文档（经常缺失） | 规范 → 计划 → 任务 → 实现 |
| 文档 | 事后补写，容易过时 | 事前编写，持续维护 |
| AI 协作 | AI 猜测需求，幻觉率高 | AI 按 Spec 执行，幻觉率低 |
| 可追溯性 | 低 | 从需求到代码的完整追溯链 |

---

## 核心流程

| 阶段 | 核心动作 | 输出物 | 耗时占比 |
|------|----------|--------|----------|
| **需求拆解** | 与 AI 协作，明确需求边界、验收标准与技术栈 | 需求清单、验收标准 | 10% |
| **Spec 编写** | 编写结构化的 spec 文档，包含功能描述、数据模型、接口定义、错误处理、代码规范 | spec.md、tasks.md | 30% |
| **AI 生成** | 将 spec 文档输入 AI 工具，生成代码、单元测试、接口文档 | 可运行代码、测试用例 | 5% |
| **人工评审** | 评审 AI 生成的代码，重点检查逻辑正确性、安全漏洞、性能瓶颈 | 评审报告、修改建议 | 15% |
| **测试调试** | 运行测试用例，定位并修复问题 | 测试报告、修复后的代码 | 25% |
| **迭代优化** | 根据测试结果或业务需求，迭代 spec 文档与代码 | 优化后的代码 | 15% |

> 💡 **关键认知**：AI 生成只占 5% 的时间。真正的成本在 Spec 编写（30%）和测试调试（25%）。这不是 AI 替代人，而是人用 Spec 约束 AI。

---

## 关键技巧

### 1. 结构化思维

多用列表、表格、枚举等结构化格式，少用大段自然语言。

**示例**：用表格定义接口入参

| 参数名 | 类型 | 是否必填 | 示例值 |
|--------|------|----------|--------|
| username | string | 是 | "zhangsan" |
| password | string | 是 | "123456" |

使用结构化格式，AI 的识别准确率可提升至 **95%** 以上。

### 2. 版本锁定

所有前置文档的版本、技术栈版本、规范版本必须一次性锁定，中途不随意变更。

**示例**：锁定"Vue 3.3 + SpringBoot 3.0"的技术栈，后续迭代不得修改。

### 3. 示例驱动

提供"好"和"坏"的代码示例，明确告诉 AI 应该避免什么。

```javascript
// ❌ 不要使用 var 定义变量
var name = "zhangsan";

// ✅ 统一用 let/const
const name = "zhangsan";
let age = 25;
```

将代码规范的符合率提升至 **90%** 以上。

### 4. 迭代 Spec

Spec 不是瀑布文档——它应该随项目迭代持续更新。每次代码变更后，检查 Spec 是否仍然准确。

---

## SpecKit 工具链详解

### SpecKit 是什么

[SpecKit](https://github.com/github/spec-kit) 是 **GitHub 官方开源**的规范驱动开发工具包。它通过"宪法 → 规范 → 计划 → 任务 → 实现"的结构化流程，将 AI 从"代码生成工具"转变为"产品开发伙伴"。

> 📺 官方视频介绍：[Spec Kit Video Overview](https://www.youtube.com/watch?v=a9eR1xsfvHg)

> 📖 GitHub 仓库：[github/spec-kit](https://github.com/github/spec-kit)

### 安装 Specify CLI

> ⚠️ **重要**：SpecKit 是 Python 生态工具，**不是 npm 包**。唯一官方安装来源是 GitHub 仓库，PyPI 上的同名包非官方维护，请勿使用。

**推荐方式：使用 uv（Python 包管理器）**

```bash
# 安装指定稳定版本（推荐，去 GitHub Releases 页面查看最新版本号）
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z

# 或安装最新版（可能包含未发布的变化）
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

**替代方式：使用 pipx**

```bash
pipx install git+https://github.com/github/spec-kit.git@vX.Y.Z
```

**验证安装**

```bash
specify version
```

### 初始化项目

```bash
# 新建项目
specify init <PROJECT_NAME>

# 在当前目录初始化（推荐）
specify init --here --integration copilot
# 或
specify init . --integration copilot
```

`--integration` 参数指定你使用的 AI 编程工具（如 `copilot`、`claude` 等）。

### 生成的目录结构

```
project/
├── memory/
│   ├── constitution.md              # 项目宪法（全局约束）
│   └── constitution_update_checklist.md
├── scripts/
│   ├── check-task-prerequisites.sh
│   ├── common.sh
│   ├── create-new-feature.sh
│   ├── get-feature-paths.sh
│   ├── setup-plan.sh
│   └── update-claude-md.sh
├── specs/
│   └── <FEATURE_NAME>/
│       └── spec.md                  # 功能规范
└── templates/
    ├── CLAUDE-template.md
    ├── plan-template.md
    ├── spec-template.md
    └── tasks-template.md
```

> ⚠️ **注意区分**：`specify` 是 CLI 命令（在终端执行），`/speckit.*` 是斜杠命令（在 AI 编程工具内执行）。两者完全不同。

---

### 核心流程：5 步 + 3 个可选步骤

```
┌─────────────────────────────────────────────────────────────┐
│  1. /speckit.constitution  — 建立项目原则                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  2. /speckit.specify       — 创建功能规范                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
                ┌─────────────┴─────────────┐
                │  可选：/speckit.clarify     │
                │  在 plan 前澄清模糊需求     │
                └─────────────┬─────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  3. /speckit.plan          — 创建技术计划                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
                ┌─────────────┴─────────────┐
                │  可选：/speckit.checklist   │
                │  质量检查清单               │
                └─────────────┬─────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  4. /speckit.tasks         — 分解为任务                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
                ┌─────────────┴─────────────┐
                │  可选：/speckit.analyze     │
                │  一致性分析                 │
                └─────────────┬─────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  5. /speckit.implement     — 执行实现                        │
└─────────────────────────────────────────────────────────────┘
```

> 以下所有 `/speckit.*` 命令均在 **AI 编程工具内**（Claude Code / Cursor / Trae 等）以斜杠命令形式输入，**不是**终端命令。

---

### Step 1：/speckit.constitution（建立项目原则）

**执行环境**：在 AI 编程工具内输入
**目的**：创建项目的最高指导原则，所有后续开发决策以此为准
**执行次数**：每个项目只需执行一次

**输入示例**：

```
/speckit.constitution 创建原则，聚焦于代码质量、测试标准、
用户体验一致性和性能要求
```

**输出产物**：`memory/constitution.md`（项目宪法）

**为什么这是第一步**：Constitution 是整个 SpecKit 流程的"宪法"，后续的 specify、plan、tasks 都会引用它作为约束条件。跳过这一步，AI 就没有全局约束，生成的内容可能偏离项目目标。

---

### Step 2：/speckit.specify（创建功能规范）

**执行环境**：在 AI 编程工具内输入
**前置条件**：Step 1 已完成
**目的**：描述要构建的功能（只写"做什么"和"为什么"，不写"怎么做"）
**执行次数**：每个新功能执行一次

**输入示例**：

```
/speckit.specify 实现一个文章发布系统，支持：
- 创建文章（标题、内容、标签）
- 编辑文章
- 删除文章
- 文章列表（分页、按标签筛选）
```

**输出产物**：`specs/<feature-name>/spec.md`（功能规范文档）

**规范应包含**：
- 用户场景和故事
- 功能需求
- 成功标准（可量化、可测试）
- 关键实体
- 边界和约束

---

### （可选）/speckit.clarify（澄清需求）

**执行环境**：在 AI 编程工具内输入
**前置条件**：Step 2 已完成，Step 3 尚未执行
**目的**：在写技术计划之前，提出结构化问题，降低需求中的模糊区域

**输入示例**：

```
/speckit.clarify
```

AI 会针对 spec.md 中不够清晰的部分提出问题，你回答后 AI 会更新规范。

---

### Step 3：/speckit.plan（创建技术计划）

**执行环境**：在 AI 编程工具内输入
**前置条件**：Step 2 已完成
**目的**：指定技术栈和架构，将功能规范转化为技术设计

**输入示例**：

```
/speckit.plan 使用 Next.js 14 App Router + Prisma ORM +
PostgreSQL，前端用 Tailwind CSS + Shadcn/ui
```

**输出产物**：
- `plan.md` — 技术实现计划
- `data-model.md` — 数据模型
- `contracts/` — 接口契约（如 API spec）

---

### （可选）/speckit.checklist（质量检查清单）

**执行环境**：在 AI 编程工具内输入
**前置条件**：Step 3 已完成
**目的**：生成质量检查清单，确保 plan 的完整性和一致性

---

### Step 4：/speckit.tasks（分解为任务）

**执行环境**：在 AI 编程工具内输入
**前置条件**：Step 3 已完成
**目的**：将技术计划分解为可执行的任务清单

**输入示例**：

```
/speckit.tasks
```

**输出产物**：`tasks.md`（任务清单），包含：
- 按用户故事组织的任务
- 依赖关系
- 并行执行机会
- 独立测试标准

---

### （可选）/speckit.analyze（一致性分析）

**执行环境**：在 AI 编程工具内输入
**前置条件**：Step 4 已完成，Step 5 尚未执行
**目的**：检查产品设计、技术设计、任务拆解之间的一致性，确保没有偏差

**输入示例**：

```
/speckit.analyze
```

---

### Step 5：/speckit.implement（执行实现）

**执行环境**：在 AI 编程工具内输入
**前置条件**：Step 4 已完成
**目的**：按 spec + plan + tasks 驱动 AI 生成代码

**输入示例**：

```
/speckit.implement
```

AI 会根据计划逐步生成代码。实现完成后，运行应用并检查错误。如果出现运行时错误，将错误信息提供给 AI 以修复。

---

### 与 AI 编程工具的集成

| 工具 | 集成方式 |
|------|----------|
| Cursor | 通过 `.cursorrules` 引用 spec 文件 |
| Claude Code | 通过 `CLAUDE.md` 引用 spec 文件 |
| Trae | 通过 Spec 模式直接读取 spec/ 目录 |
| GitHub Copilot | 通过 `copilot-instructions.md` 引用 |
| Codex CLI | 在 skills 模式下使用 `$speckit-*` 前缀 |

---

## Spec 实战：以 Trae 为例

### Trae 中如何开启 Spec 模式

1. 打开 Trae，进入项目
2. 在侧边栏找到 **Spec** 面板
3. 点击 **新建 Spec**
4. 输入需求描述

### 从需求到 Spec 的完整流程

**Step 1：描述需求**

```
实现一个文章发布系统，支持：
- 创建文章（标题、内容、标签）
- 编辑文章
- 删除文章
- 文章列表（分页、按标签筛选）
```

**Step 2：AI 生成 Spec**

Trae 会自动生成结构化 Spec：

```markdown
# 文章发布系统 Spec

## 数据模型
- Article: id, title, content, tags[], author_id, created_at, updated_at
- Tag: id, name

## API 接口
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/articles | 创建文章 |
| PUT | /api/articles/:id | 编辑文章 |
| DELETE | /api/articles/:id | 删除文章 |
| GET | /api/articles | 文章列表 |

## 业务规则
- 标题长度：1-200 字符
- 内容不能为空
- 标签最多 5 个
- 只有作者可以编辑/删除自己的文章

## 验收标准
- [ ] 创建文章后返回完整文章对象
- [ ] 编辑文章只更新传入的字段
- [ ] 删除文章为软删除
- [ ] 列表接口支持分页（page, pageSize）
- [ ] 列表接口支持按标签筛选
```

**Step 3：审查 Spec**

人工审查 AI 生成的 Spec，补充遗漏：
- 是否需要权限控制？
- 是否需要草稿功能？
- 标签是否需要预定义还是自由创建？

**Step 4：AI 生成代码**

确认 Spec 后，Trae 按 Spec 生成完整的代码实现。

**Step 5：验证与迭代**

运行测试，检查是否符合 Spec 中的验收标准。不符合的项回到 Spec 修正或让 AI 重新生成。

---

## 评审与测试

AI 生成的代码不等于正确的代码。评审和测试是 Spec 驱动开发中不可或缺的环节。

### AI 代码的常见失效模式

| 失效模式 | 表现 | 检查方法 |
|----------|------|----------|
| **幻觉 API** | 调用不存在的函数或方法 | 查阅官方文档验证 |
| **过时语法** | 使用已废弃的 API | 检查版本号 |
| **隐含 Bug** | 逻辑正确但边界条件遗漏 | 编写边界测试 |
| **安全漏洞** | SQL 注入、XSS、未校验输入 | 安全审查清单 |
| **性能问题** | N+1 查询、不必要的重渲染 | 性能测试 |

### 审查清单

每次 AI 生成代码后，按以下清单检查：

- [ ] **功能正确**：是否符合 Spec 中的验收标准？
- [ ] **输入验证**：所有外部输入是否校验？
- [ ] **错误处理**：异常情况是否处理？
- [ ] **安全检查**：是否有注入、越权等漏洞？
- [ ] **性能检查**：是否有 N+1、内存泄漏等问题？
- [ ] **代码规范**：是否符合项目规则？
- [ ] **测试覆盖**：关键路径是否有测试？

### 信任决策框架

| 场景 | 信任级别 | 行动 |
|------|---------|------|
| AI 生成的样板代码（CRUD、配置文件） | 高信任 | 快速审查后使用 |
| AI 生成的业务逻辑 | 中信任 | 仔细审查 + 测试 |
| AI 生成的安全相关代码（认证、加密） | 低信任 | 逐行审查 + 专项测试 |
| AI 生成的算法实现 | 低信任 | 理解原理后再使用 |

---

## 最佳实践

### 何时用 Spec / 何时不用

| 场景 | 是否需要 Spec | 原因 |
|------|-------------|------|
| 单文件脚本 | ❌ | Chat 模式足够 |
| 多文件功能 | ✅ | 需要跨文件协调 |
| 团队项目 | ✅ | 需要共同语言 |
| 原型验证 | ❌ | 速度优先 |
| 合规项目 | ✅ | 需要可追溯性 |

### Spec 的粒度控制

- **太细**：微管理 AI，反而降低效率
  - ❌ "第 3 行用 const 不用 let"
  - ✅ "所有变量声明使用 const 优先，需要重新赋值时用 let"
- **太粗**：等于没写
  - ❌ "实现用户系统"
  - ✅ "实现用户注册/登录/找回密码，包含邮箱验证和密码加密"

### Spec 与代码的同步

- 每次代码变更后，检查 Spec 是否仍然准确
- 使用 `/speckit.analyze` 检查一致性
- 将 Spec 文件纳入版本控制
- Spec 是 Source of Truth，代码跟随 Spec

---

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| Spec 写得太粗，AI 猜测太多 | 补充数据模型、接口定义、验收标准 |
| Spec 写得太细，耗时过长 | 只写关键约束，实现细节交给 AI |
| AI 不遵守 Spec | 在规则文件中引用 Spec，强调"严格遵守" |
| Spec 和代码不一致 | 用 Spec 作为 Source of Truth，代码跟随 Spec |
| 团队不愿意写 Spec | 从轻量级 Spec 开始（只写接口定义 + 验收标准），逐步完善 |
| 不确定 Spec 该写多细 | 参考"我应该用 Spec 吗"的决策树，按项目规模调整 |
| `npm install -g speckit` 报错 | SpecKit 不是 npm 包，使用 `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` |
| `/speckit.constitution` 和 `/speckit.specify` 有什么区别？ | constitution 是项目级原则（全局约束，只需一次），specify 是功能级规范（每个新功能都要执行） |
| `/speckit.clarify` 是必须的吗？ | 不是，它是可选的。需求已经很清晰时可以跳过 |

---

> 📖 **参考来源**
>
> - GitHub 官方仓库：[github/spec-kit](https://github.com/github/spec-kit)
> - 官方视频：[Spec Kit Video Overview](https://www.youtube.com/watch?v=a9eR1xsfvHg)
> - 数据更新于 2026 年 4 月 27 日 · AI 工具迭代迅速，信息仅供参考，请以官方最新发布为准
