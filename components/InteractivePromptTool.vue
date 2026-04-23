<template>
  <div class="rounded-xl border border-white/[0.08] bg-white/5 overflow-hidden">
    <div class="px-6 py-4 border-b border-white/[0.08] bg-white/5">
      <h3 class="font-semibold flex items-center gap-2">
        <span>🧪</span> Prompt 工坊 — 动手试试
      </h3>
      <p class="text-sm text-gray-500 mt-1">选择一个场景，调整 Prompt 策略，观察输出质量的变化</p>
    </div>

    <!-- 场景选择 -->
    <div class="px-6 py-4 border-b border-white/[0.08]">
      <label class="text-sm text-gray-400 mb-2 block">选择场景</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="scene in scenes"
          :key="scene.id"
          @click="activeScene = scene.id"
          class="px-3 py-1.5 rounded-lg text-sm transition-all"
          :class="activeScene === scene.id
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            : 'bg-white/5 text-gray-400 border border-white/[0.08] hover:border-white/20'"
        >
          {{ scene.icon }} {{ scene.name }}
        </button>
      </div>
    </div>

    <!-- 策略选择 -->
    <div class="px-6 py-4 border-b border-white/[0.08]">
      <label class="text-sm text-gray-400 mb-2 block">Prompt 策略</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="strategy in strategies"
          :key="strategy.id"
          @click="activeStrategy = strategy.id"
          class="px-3 py-1.5 rounded-lg text-sm transition-all"
          :class="activeStrategy === strategy.id
            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            : 'bg-white/5 text-gray-400 border border-white/[0.08] hover:border-white/20'"
        >
          {{ strategy.label }}
        </button>
      </div>
    </div>

    <!-- Prompt 展示 -->
    <div class="px-6 py-4 border-b border-white/[0.08]">
      <div class="flex items-center justify-between mb-2">
        <label class="text-sm text-gray-400">生成的 Prompt</label>
        <button
          @click="copyPrompt"
          class="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          {{ copied ? '✅ 已复制' : '📋 复制' }}
        </button>
      </div>
      <pre class="bg-black/30 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">{{ currentPrompt }}</pre>
    </div>

    <!-- 对比说明 -->
    <div class="px-6 py-4">
      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
          <p class="text-xs text-red-400 font-medium mb-1">❌ 为什么基础版不够好</p>
          <p class="text-xs text-gray-400">{{ currentScene?.badReason }}</p>
        </div>
        <div class="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
          <p class="text-xs text-green-400 font-medium mb-1">✅ 优化版的改进点</p>
          <p class="text-xs text-gray-400">{{ currentScene?.goodReason }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeScene = ref('api-design')
const activeStrategy = ref('structured')
const copied = ref(false)

const scenes = [
  {
    id: 'api-design',
    icon: '🔌',
    name: 'API 设计',
    badReason: '缺少约束，AI 可能生成无验证、无错误处理的接口',
    goodReason: '明确数据模型、状态码、验证规则，AI 生成的代码覆盖完整',
    prompts: {
      basic: '帮我写一个用户注册的 API 接口',
      structured: `设计一个用户注册 API 接口。

## 技术栈
- 框架: Express.js + TypeScript
- 数据库: PostgreSQL + Prisma ORM
- 验证: Zod

## 数据模型
- email: string (唯一, 邮箱格式校验)
- password: string (最少8位, 含大小写+数字)
- name: string (2-50字符)

## 接口规格
- Method: POST
- Path: /api/auth/register
- Request Body: { email, password, name }

## 响应规格
- 201: { id, email, name, createdAt }
- 409: { error: "邮箱已注册" }
- 422: { error: "密码不符合要求", details: [...] }

## 验收标准
- [ ] 密码 bcrypt 加密存储（cost factor = 12）
- [ ] 邮箱唯一性违反返回 409
- [ ] 输入验证失败返回 422 + 具体字段错误
- [ ] 包含单元测试（正常路径 + 边界情况）

## 代码规范
- 使用 async/await，不使用 .then()
- 错误统一通过 AppError 类抛出
- 所有函数添加 JSDoc 注释`,
      cot: `我需要设计一个用户注册 API，请按以下步骤思考：

**Step 1 — 需求分析**
列出这个接口需要处理的所有场景（正常注册、重复邮箱、弱密码、网络错误等）

**Step 2 — 数据模型**
设计 User 表的字段、类型、约束

**Step 3 — 接口契约**
定义 Request/Response 的完整 Schema，包括所有状态码

**Step 4 — 安全考量**
分析潜在的安全风险（SQL注入、暴力破解、密码泄露等），并给出防御方案

**Step 5 — 实现**
基于以上分析，编写完整的 Express.js 代码

技术栈：Express.js + TypeScript + PostgreSQL + Prisma + Zod`
    }
  },
  {
    id: 'refactor',
    icon: '🔧',
    name: '代码重构',
    badReason: '模糊指令导致 AI 可能只改表面结构，不解决根本问题',
    goodReason: '明确重构目标、约束条件和验证方式，确保改动可控',
    prompts: {
      basic: '帮我重构一下这个组件，太乱了',
      structured: `重构以下 React 组件。

## 当前问题
1. 组件超过 300 行，职责不清晰
2. 数据获取逻辑和 UI 渲染混在一起
3. 没有错误处理和加载状态
4. 多个 useEffect 存在竞态条件

## 重构目标
- 拆分为 3 个子组件：UserList / UserCard / UserFilter
- 数据获取逻辑抽取到 useUsers 自定义 Hook
- 添加 loading / error / empty 三种状态
- 解决 useEffect 竞态（使用 AbortController）

## 约束条件
- 保持现有 API 接口不变
- 保持现有样式不变
- 不引入新依赖
- 重构后每个文件不超过 100 行

## 验收标准
- [ ] 原有功能全部正常
- [ ] TypeScript strict 模式无报错
- [ ] 所有组件可独立测试

## 代码（粘贴现有组件代码）
...（用户粘贴代码）`,
      cot: `请帮我重构一个 React 组件，按以下步骤分析：

**Step 1 — 诊断**
阅读以下代码，列出所有代码异味（code smells）：
- 职责过多
- 重复代码
- 命名不清晰
- 潜在的 bug

**Step 2 — 设计**
基于诊断结果，设计重构后的组件结构：
- 组件拆分方案
- 自定义 Hook 设计
- 状态管理方案

**Step 3 — 实施计划**
按依赖顺序列出重构步骤，每步说明改了什么、为什么

**Step 4 — 执行**
按计划逐步重构，每步完成后说明变化

代码如下：
...（用户粘贴代码）`
    }
  },
  {
    id: 'debug',
    icon: '🐛',
    name: 'Bug 调试',
    badReason: '"帮我看看哪里有bug" 太模糊，AI 可能猜测错误的原因',
    goodReason: '提供复现步骤、期望行为、实际行为，让 AI 精准定位问题',
    prompts: {
      basic: '这段代码有 bug，帮我看看',
      structured: `## Bug 报告

### 问题描述
用户列表在切换页码后不更新，停留在第一页的数据

### 复现步骤
1. 打开用户列表页面，显示第一页数据（正常）
2. 点击第 2 页
3. 页码 UI 更新为 2，但数据仍然是第一页的内容

### 期望行为
切换页码后，列表显示对应页的用户数据

### 实际行为
页码 UI 变了，但列表数据不变

### 相关代码
\`\`\`typescript
const [page, setPage] = useState(1)
const [users, setUsers] = useState([])

useEffect(() => {
  fetchUsers(page).then(setUsers)
}, []) // ← 缺少 page 依赖？
\`\`\`

### 环境信息
- React 18.2
- Chrome 最新版

请分析 bug 原因并给出修复方案。`,
      cot: `我发现了一个 bug，请帮我用系统化方法调试：

**现象**：用户列表切换页码后数据不更新

**已知线索**：
1. 页码 UI 能正常切换
2. 网络请求似乎没有发出
3. 使用 React 18

请按以下步骤分析：

**Step 1 — 数据流追踪**
从用户点击页码按钮开始，追踪数据如何流动到 API 调用

**Step 2 — 状态分析**
检查相关 state 和 effect 的依赖关系

**Step 3 — 根因定位**
确定 bug 的根本原因

**Step 4 — 修复方案**
给出修复代码，并解释为什么这样修

相关代码：
\`\`\`typescript
const [page, setPage] = useState(1)
const [users, setUsers] = useState([])
useEffect(() => {
  fetchUsers(page).then(setUsers)
}, [])
\`\`\``
    }
  }
]

const strategies = [
  { id: 'basic', label: '🪶 基础版' },
  { id: 'structured', label: '📐 结构化' },
  { id: 'cot', label: '🧠 思维链' }
]

const currentScene = computed(() => scenes.find(s => s.id === activeScene.value))

const currentPrompt = computed(() => {
  const scene = currentScene.value
  if (!scene) return ''
  return scene.prompts[activeStrategy.value as keyof typeof scene.prompts] || ''
})

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(currentPrompt.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // fallback
    const textarea = document.createElement('textarea')
    textarea.value = currentPrompt.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>
