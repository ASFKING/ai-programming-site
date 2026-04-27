---
title: Windsurf
description: Codeium 出品的 AI 原生 IDE，以 Cascade 智能代理系统著称
lastUpdated: '2026-04-27'
icon: 🏄
category: 国外
vendor: Codeium
features:
  - Cascade 三模式（Code/Plan/Ask）
  - Plan 模式生成实现计划
  - Turbo 自动执行模式
  - Fast Context 快速检索
  - MCP 协议支持
pricing: Free 版可用，Pro $15/月，Max/Teams/Enterprise 按需
network: 需要科学上网
useCases: 复杂功能开发与重构，规划型任务，代码库探索，全栈开发
---

# Windsurf 🏄

> Codeium 出品的 AI 原生 IDE，核心是 Cascade 智能代理系统

## Cascade 三模式

Cascade 在 VS Code 中提供三种模式，每种针对不同工作流优化：

| 模式 | 使用场景 | 能力 |
|------|----------|------|
| **Code** | 复杂功能开发、重构 | 全部工具可用，全自动智能代理 |
| **Plan** | 需要规划的复杂功能 | 全部工具可用，先生成计划再执行 |
| **Ask** | 学习、探索、提问 | 仅搜索类工具可用（只读） |

使用 `⌘+.` (Mac) 或 `Ctrl+.` (Windows/Linux) 快速切换模式。

## 核心功能

### Code 模式（默认）
- 全自动智能代理，可创建、编辑和删除文件
- 运行终端命令、搜索和分析代码库
- 安装依赖、自主执行多步任务

### Plan 模式
- 先为复杂任务生成详细的 Markdown 实现计划
- 通过交互式界面提供多个方案选择
- 计划存储在 `~/.windsurf/plans`，可跨会话复用
- 点击 "Implement" 按钮自动切换到 Code 模式执行

### Ask 模式
- 只读探索模式，搜索和分析代码库但不修改
- 适合学习不熟悉的代码库或提问

### Turbo 自动执行
- 三级自动执行：Off（手动确认）→ Auto（AI 判断）→ Turbo（全自动）
- Turbo 模式自动运行终端命令，配合 allow/deny list 使用

### 其他能力
- **Fast Context**：20x 加速代码检索（SWE-grep 模型）
- **语音输入**：用语音与 Cascade 交互
- **MCP 协议**：扩展外部工具和知识库
- **Autocomplete**：单行/多行代码补全
- **实时协作感知**：Cascade 自动感知你的手动编辑
- **步骤回退**：可回退 Cascade 的任何修改

## 适用场景
- ✅ 复杂功能开发与重构（Code 模式）
- ✅ 需要先规划再实现的复杂任务（Plan 模式）
- ✅ 代码库学习与探索（Ask 模式）
- ✅ 全栈开发
- ✅ 预算敏感的开发者

## 局限性
- 需要科学上网
- 社区规模不如 Cursor
- VS Code 版（Code/Plan/Ask）和 JetBrains 版（Write/Chat）模式不同
