---
title: 项目规则配置
description: 为项目设置专属规则，团队成员共享统一的编码规范
---

# 项目规则配置（Project Rules）

## 什么是项目规则？

项目规则是存储在项目仓库中的 AI 编程配置文件，通常命名为 `.cursorrules`、`CLAUDE.md`、`.github/copilot-instructions.md` 等。与个人规则不同，项目规则**随代码版本管理**，确保团队所有成员使用统一的 AI 编程规范。

---

## 为什么需要项目规则？

| 问题 | 没有项目规则 | 有项目规则 |
|------|------------|-----------|
| 代码风格 | 每人各自为政 | 全队统一规范 |
| 技术栈选择 | AI可能推荐过时库 | 锁定团队技术栈 |
| 命名规范 | 混乱不一致 | 强制统一命名 |
| 安全要求 | 可能遗漏 | 内置安全检查清单 |

---

## 主流工具的配置方式

### Cursor — `.cursorrules`

在项目根目录创建 `.cursorrules` 文件：

```markdown
# 项目规则

## 技术栈
- 前端：Vue 3 + TypeScript + Vite
- 后端：Node.js + Express
- 数据库：PostgreSQL
- 样式：Tailwind CSS

## 代码规范
- 使用 Composition API，不使用 Options API
- 所有函数必须有 TypeScript 类型注释
- 组件文件使用 PascalCase 命名
- 工具函数使用 camelCase 命名

## 禁止事项
- 禁止使用 any 类型
- 禁止使用 var 声明变量
- 禁止在组件中直接操作 DOM
```

### Claude Code — `CLAUDE.md`

在项目根目录创建 `CLAUDE.md` 文件：

```markdown
# Claude 项目指令

## 架构说明
这是一个 Vue 3 + Node.js 的全栈项目。

## 命令
- npm run dev — 启动开发服务器
- npm run test — 运行测试
- npm run lint — 代码检查

## 代码风格
- 使用 TypeScript 严格模式
- 优先使用 async/await 而非 .then()
- 错误处理使用 try-catch，不要吞掉错误
```

### GitHub Copilot — `.github/copilot-instructions.md`

```markdown
# Copilot 指令

## 项目上下文
这是一个企业级 SaaS 项目，需要关注安全性和可维护性。

## 编码要求
- 所有 API 接口必须有输入验证
- 数据库查询必须使用参数化查询
- 敏感数据必须加密存储
```

---

## 最佳实践

1. **保持简洁**：规则文件不超过 100 行，过长会降低 AI 的遵循率
2. **具体明确**：写"使用 `const` 声明不变量"而非"注意变量声明"
3. **版本管理**：规则文件纳入 Git 管理，PR 审查时一并审查规则变更
4. **定期更新**：技术栈升级时同步更新规则文件
5. **团队共识**：规则应该是团队讨论后的共识，而非个人偏好

---

## 参考资源

- [Cursor Rules 官方文档](https://docs.cursor.com/context/rules)
- [Claude Code CLAUDE.md 文档](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub Copilot Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
