---
title: Aider
description: 开源终端 AI pair programming 工具，支持 20+ LLM 后端
lastUpdated: '2026-04-27'
icon: 🛠️
category: 国外
vendor: 开源社区
features:
  - 四种聊天模式（code/ask/architect/help）
  - Architect 双模型模式
  - Git 原生集成
  - 20+ LLM 后端支持
  - 语音输入 / IDE 监听 / 浏览器模式
pricing: 完全开源免费（需自备 LLM API Key）
network: 取决于所用模型
useCases: 终端 pair programming，Architect 复杂重构，灵活切换 LLM，IDE AI 注释驱动
---

# Aider 🛠️

> 开源终端 AI pair programming 工具，支持 20+ LLM 后端

## 四种聊天模式

| 模式 | 用途 | 说明 |
|------|------|------|
| **code** | 编辑代码 | 默认模式，直接修改文件 |
| **ask** | 只读问答 | 讨论代码、获取建议，不修改文件 |
| **architect** | 双模型架构 | 主模型规划方案 + 编辑模型执行文件编辑 |
| **help** | 工具帮助 | 询问 aider 本身的使用、配置、排障 |

推荐工作流：先用 `/ask` 讨论方案，再切 `/code` 执行——比直接编辑效果更好。

## Architect 模式

Architect 模式将规划和编辑分离：
- **主模型**（architect）：分析需求，提出修改方案
- **编辑模型**（editor）：将方案转化为具体的文件编辑指令

特别适合 o1/o3 系列模型（推理强但编辑弱），搭配 GPT-4o 或 Sonnet 作为编辑模型效果最佳。

## 核心功能

- **Git 原生集成**：自动 commit 所有变更，`/undo` 一键回退
- **Repository Map**：自动分析代码库结构，无需手动添加所有文件
- **20+ LLM 后端**：OpenAI / Anthropic / Gemini / DeepSeek / Ollama / GROQ / xAI / Azure / Cohere / OpenRouter / GitHub Copilot / Vertex AI / Amazon Bedrock 等
- **语音输入**：Voice-to-Code，用语音与 aider 讨论代码
- **IDE 监听**：`--watch` 模式下，aider 监听文件变化，响应你在 IDE 中添加的 AI 注释
- **浏览器运行**：不仅限于终端，也可在浏览器中使用
- **Prompt 缓存**：支持 prompt caching 降低成本、加速响应
- **Linting/Testing 自动修复**：自动检测并修复 lint 和测试错误
- **LLM 排行榜**：在 aider.chat 提供代码编辑与重构排行榜

## 推荐模型

Claude 3.5 Sonnet、DeepSeek R1 & Chat V3、OpenAI o1、o3-mini、GPT-4o

## 适用场景

- ✅ 终端 AI pair programming
- ✅ Architect 模式处理复杂重构
- ✅ 需要灵活切换 LLM 后端的开发者
- ✅ 预算有限但想用 Agent 编程
- ✅ 在 IDE 中通过 AI 注释驱动代码修改

## 局限性

- 需要自备 LLM API Key，成本取决于模型选择
- 终端操作对新手有门槛
- 没有原生 GUI（但支持浏览器模式）
