---
title: 个人规则配置
description: 配置个人化的AI编程规则
---

# 个人规则配置

## 什么是个人规则？

个人规则是你在使用AI编程工具时的偏好设置，可以帮助AI生成更符合你习惯的代码。

---

## 配置位置

不同的AI编程工具，规则配置位置不同：

| 工具 | 配置位置 |
|------|----------|
| Claude Code | `~/claude.md` |
| Trae | 设置 → 规则 |
| Cursor | Settings → Rules |

---

## 常见规则类型

### 1. 代码风格规则

```markdown
# 代码风格
- 使用 TypeScript，严格类型检查
- 使用 ESLint + Prettier
- 组件使用 Composition API
- 使用 functional component
```

### 2. 项目结构规则

```markdown
# 项目结构
- React 组件放在 components/ 目录
- 页面组件放在 pages/ 目录
- 工具函数放在 utils/ 目录
- hooks 放在 hooks/ 目录
```

### 3. 命名规范

```markdown
# 命名规范
- 组件使用 PascalCase (e.g., UserProfile)
- 函数使用 camelCase (e.g., getUserInfo)
- 常量使用 UPPER_SNAKE_CASE
- 文件使用 kebab-case
```

### 4. 注释规范

```markdown
# 注释规范
- 函数必须添加 JSDoc 注释
- 复杂逻辑需要行内注释
- 使用中文注释
```

---

## 如何配置

1. 打开AI编程工具的设置
2. 找到"规则"或"Rules"配置
3. 添加你的个人规则
4. 保存并生效

---

## 最佳实践

- 规则要具体、可执行
- 定期更新规则以适应新项目
- 可以为不同项目配置不同规则