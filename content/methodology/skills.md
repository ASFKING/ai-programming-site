---
title: Skills自定义
description: 创建自定义Skills封装常用工作流程
---

# Skills自定义

## 什么是Skills？

**Skills**是AI编程工具中的自定义指令集，可以封装常用的工作流程，让AI按照预设的流程执行任务。

---

## Skills的核心价值

1. **复用性**：将常用的工作流程封装为Skills，一次创建，多次使用
2. **标准化**：团队成员可以使用统一的Skills，保证工作流程一致
3. **效率提升**：减少重复配置，提高开发效率

---

## 常见Skills类型

### 1. 代码审查Skills

```markdown
# Code Review Skill

## 任务
审查代码并提供改进建议

## 检查项
- 代码规范
- 性能优化
- 安全漏洞
- 错误处理

## 输出格式
```markdown
## 审查结果

### 问题
- [问题1描述]
- [问题2描述]

### 建议
- [建议1描述]
- [建议2描述]
```
```

### 2. 单元测试Skills

```markdown
# Unit Test Skill

## 任务
为代码生成单元测试

## 要求
- 使用 Jest 框架
- 覆盖率目标: 80%以上
- 包含边界条件测试

## 输出格式
- test文件
- coverage报告
```

### 3. 文档生成Skills

```markdown
# Documentation Skill

## 任务
为代码生成文档

## 检查项
- API文档
- 使用示例
- 注意事项

## 输出格式
- Markdown格式
- 包含代码示例
```

---

## 如何创建Skills

1. 在AI编程工具中找到Skills配置
2. 点击"创建新Skill"
3. 编写Skill定义
4. 保存并命名

---

## 最佳实践

- 为常见任务创建Skills
- 保持Skills简洁、易理解
- 定期更新和维护Skills
- 团队共享常用Skills