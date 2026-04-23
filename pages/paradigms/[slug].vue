<template>
  <div class="space-y-8">
    <div class="flex items-center gap-4">
      <NuxtLink to="/paradigms" class="text-gray-400 hover:text-white">
        ← 返回编程范式
      </NuxtLink>
    </div>

    <ContentDoc :path="`/paradigms/${slug}`" v-slot="{ doc }">
      <article class="prose prose-invert max-w-none">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <div v-if="!hasContent" class="space-y-8">
      <!-- Header -->
      <div class="flex items-center gap-4">
        <span class="text-5xl">{{ currentParadigm?.icon }}</span>
        <div>
          <h1 class="text-3xl font-bold" :class="titleColorClass">{{ currentParadigm?.name }}</h1>
          <p class="text-gray-400">{{ currentParadigm?.enName }}</p>
        </div>
      </div>

      <!-- Definition -->
      <section class="card">
        <h2 class="text-xl font-semibold mb-4">定义</h2>
        <p class="text-gray-300">{{ currentParadigm?.definition }}</p>
      </section>

      <!-- Core Concepts -->
      <section class="card">
        <h2 class="text-xl font-semibold mb-4">核心理念</h2>
        <ul class="space-y-3">
          <li v-for="(item, index) in currentParadigm?.concepts" :key="index" class="flex items-start gap-3">
            <span class="mt-1" :class="accentTextClass">•</span>
            <span class="text-gray-300">{{ item }}</span>
          </li>
        </ul>
      </section>

      <!-- Code Example -->
      <section v-if="currentParadigm?.codeExample" class="card">
        <h2 class="text-xl font-semibold mb-4">代码示例</h2>
        <p class="text-gray-400 text-sm mb-4">{{ currentParadigm.codeExample.description }}</p>
        <CodeCompare
          :bad-code="currentParadigm.codeExample.bad"
          :good-code="currentParadigm.codeExample.good"
          :bad-label="currentParadigm.codeExample.badLabel"
          :good-label="currentParadigm.codeExample.goodLabel"
          :lang="currentParadigm.codeExample.lang"
        />
      </section>

      <!-- 适用 vs 不适用 -->
      <div class="grid md:grid-cols-2 gap-6">
        <section class="card border-green-500/20">
          <h2 class="text-xl font-semibold mb-4 text-green-400">✓ 适用场景</h2>
          <ul class="space-y-2">
            <li v-for="(scene, index) in currentParadigm?.scenes" :key="index" class="flex items-start gap-2">
              <span class="text-green-400 mt-0.5">✓</span>
              <span class="text-gray-300 text-sm">{{ scene }}</span>
            </li>
          </ul>
        </section>
        <section class="card border-red-500/20">
          <h2 class="text-xl font-semibold mb-4 text-red-400">✗ 不适用场景</h2>
          <ul class="space-y-2">
            <li v-for="(scene, index) in currentParadigm?.notSuitable" :key="index" class="flex items-start gap-2">
              <span class="text-red-400 mt-0.5">✗</span>
              <span class="text-gray-300 text-sm">{{ scene }}</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Representative Tools -->
      <section class="card">
        <h2 class="text-xl font-semibold mb-4">代表工具</h2>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="tool in currentParadigm?.toolLinks"
            :key="tool.slug"
            :to="`/tools/${tool.slug}`"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            :class="`${accentBgClass} border border-current/20 hover:border-current/40`"
          >
            {{ tool.name }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const hasContent = ref(false)

const paradigmsData: Record<string, any> = {
  'code-completion': {
    icon: '⌨️',
    name: 'Code Completion',
    enName: '代码补全',
    accent: 'cyan',
    definition: 'AI编程最基础的形态——AI根据光标周围的上下文，预测你下一步要写的代码，开发者按Tab接受。如果说传统IDE的自动补全是"查字典"，那AI代码补全就是"读心术"——它不只补全一个方法名，而是能补全整个函数体。',
    concepts: [
      '被动响应：AI不会主动介入，只在开发者输入时触发',
      '局部感知：通常只看当前文件/函数，不理解项目全貌',
      '逐块建议：从一行到一个函数，现代AI补全能生成完整函数实现'
    ],
    codeExample: {
      description: '当你输入函数签名，AI能自动补全整个实现：',
      badLabel: '❌ 手动编写',
      goodLabel: '✅ AI 补全（按 Tab 接受）',
      lang: 'python',
      bad: `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total`,
      good: `def calculate_sum(numbers: list[int]) -> int:
    # AI 补全了类型注解和一行实现
    return sum(numbers)`
    },
    scenes: ['日常编码效率提升', '重复性代码自动生成', '学习新语言/API时快速上手', '编写常见算法和数据结构'],
    notSuitable: ['需要理解项目全局架构的任务', '跨文件重构', '复杂业务逻辑设计', '需要创意的架构决策'],
    toolLinks: [
      { slug: 'github-copilot', name: 'GitHub Copilot' },
      { slug: 'cursor', name: 'Cursor' },
      { slug: 'qoder', name: 'Qoder' },
      { slug: 'codebuddy', name: 'CodeBuddy' }
    ]
  },
  'vibe-coding': {
    icon: '🎵',
    name: 'Vibe Coding',
    enName: '氛围编程',
    accent: 'purple',
    definition: '由前OpenAI联合创始人Andrej Karpathy于2025年2月提出，核心是"意图驱动的沉浸式编程"——开发者无需关注"如何实现"的技术细节，只需通过自然语言精准描述需求的"氛围"，AI即可生成可运行的完整代码。',
    concepts: [
      '反细节导向：开发者无需编写循环、定义变量等底层代码，只需明确"做什么"',
      '沉浸式协作：AI实时响应自然语言指令，形成"描述→生成→反馈→迭代"的即时循环',
      '创意优先：核心目标是快速验证创意，而非追求代码的极致优化'
    ],
    codeExample: {
      description: '用自然语言描述需求，AI生成完整实现：',
      badLabel: '❌ 手动搭建',
      goodLabel: '✅ 自然语言驱动',
      lang: 'typescript',
      bad: `// 手动创建 React 组件 + 样式 + 状态管理
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)
useEffect(() => {
  fetch('/api/users').then(r => r.json())
    .then(setUsers).finally(() => setLoading(false))
}, [])`,
      good: `// 💬 "创建一个用户列表页面，从 /api/users 获取数据，
//     支持搜索过滤，加载时显示骨架屏"
// → AI 自动生成完整组件、样式、错误处理`
    },
    scenes: ['个人项目快速搭建', '原型验证和 MVP 开发', '前端 UI 实验', '一次性脚本和自动化工具'],
    notSuitable: ['需要长期维护的生产项目', '多人协作的团队项目', '对代码质量有严格要求的场景', '涉及安全敏感的系统'],
    toolLinks: [
      { slug: 'cursor', name: 'Cursor' },
      { slug: 'trae', name: 'Trae Builder' },
      { slug: 'codex', name: 'Codex' }
    ]
  },
  'spec-coding': {
    icon: '📋',
    name: 'Spec Coding',
    enName: '规格编程',
    accent: 'amber',
    definition: '规格先行的契约式开发——先用结构化文档定义"做什么"和"验收标准"，再让AI严格按照规格生成实现。规格是不可篡改的合同，代码必须服从规格。SpecKit（GitHub官方）是当前最成熟的工具链，支持30+ AI编程代理。',
    concepts: [
      'Spec as Source of Truth：规格文档取代代码成为首要产物',
      '可执行规格：规格不只描述需求，还能直接驱动AI生成实现',
      '结构化流程：Constitution → Specify → Plan → Tasks → Implement'
    ],
    codeExample: {
      description: '先写规格文档，再让AI按规格实现：',
      badLabel: '❌ 直接让 AI 写代码',
      goodLabel: '✅ 先写 Spec 再实现',
      lang: 'markdown',
      bad: `// 💬 "帮我写一个用户注册功能"
// AI 可能生成：无验证、无错误处理、
// 硬编码的密码规则、缺少类型安全...`,
      good: `## Spec: 用户注册功能

### 需求
- 邮箱 + 密码注册，密码最少8位含大小写+数字
- 邮箱唯一性校验，返回明确错误码
- 密码 bcrypt 加密存储

### 验收标准
- [ ] 重复邮箱注册返回 409 Conflict
- [ ] 弱密码返回 422 + 具体提示
- [ ] 成功注册返回 201 + 用户ID

→ AI 按此规格生成代码，质量有保障`
    },
    scenes: ['团队协作项目', '企业级开发', '复杂业务逻辑实现', '遗留系统改造', '合规性要求高的场景'],
    notSuitable: ['一次性脚本', '个人小项目', '快速原型验证', '探索性编程'],
    toolLinks: [
      { slug: 'claude-code', name: 'Claude Code' },
      { slug: 'cursor', name: 'Cursor' },
      { slug: 'trae', name: 'Trae' }
    ]
  },
  'agentic-coding': {
    icon: '🧠',
    name: 'Agentic Coding',
    enName: '智能体编程',
    accent: 'red',
    definition: 'AI编程的高阶范式，核心是将AI从"被动响应的助手"升级为"主动执行的智能体"。AI能自主理解需求、拆解任务、调用工具、执行代码，并根据环境反馈完成闭环迭代。配合Harness工程控制（指令系统、验证门禁、状态追踪），实现AI-Native的开发流程。',
    concepts: [
      '自主决策：AI不仅能生成代码，还能像人类工程师一样思考和规划',
      '全流程执行：从需求分析到代码生成、测试、部署的完整流程',
      '工程化能力：AGENTS.md指令系统、Hooks验证门禁、人类审查点'
    ],
    codeExample: {
      description: '描述业务目标，AI自主拆解并执行全流程：',
      badLabel: '❌ 逐步手动指令',
      goodLabel: '✅ 目标驱动（AI 自主执行）',
      lang: 'bash',
      bad: `# 人类逐步下达指令
$ git checkout -b feat/auth
$ mkdir src/modules/auth
$ touch src/modules/auth/login.ts
$ # ... 逐个文件创建，逐个命令执行`,
      good: `# 💬 "把 Python 项目迁移到 TypeScript，
#       保持所有测试通过，提交 PR"
#
# AI 自主执行：
# 1. 分析项目结构和依赖
# 2. 制定迁移计划
# 3. 逐文件转换 + 运行测试
# 4. 修复错误直到全部通过
# 5. 提交 PR + 撰写说明文档`
    },
    scenes: ['企业级项目全流程交付', '团队开发中的复杂任务', '系统级重构', '跨模块联调和集成'],
    notSuitable: ['简单的代码修改', '需要高度创意的设计任务', '人类专家必须亲自把关的安全关键系统', '资源受限的环境'],
    toolLinks: [
      { slug: 'claude-code', name: 'Claude Code' },
      { slug: 'cursor', name: 'Cursor Composer' },
      { slug: 'trae', name: 'Trae SOLO' },
      { slug: 'codex', name: 'Codex CLI' }
    ]
  }
}

const currentParadigm = computed(() => paradigmsData[slug])

const titleColorClass = computed(() => {
  const map: Record<string, string> = {
    'code-completion': 'text-cyan-400',
    'vibe-coding': 'text-purple-400',
    'spec-coding': 'text-amber-400',
    'agentic-coding': 'text-red-400'
  }
  return map[slug] || 'text-blue-400'
})

const accentTextClass = computed(() => {
  const map: Record<string, string> = {
    'code-completion': 'text-cyan-400',
    'vibe-coding': 'text-purple-400',
    'spec-coding': 'text-amber-400',
    'agentic-coding': 'text-red-400'
  }
  return map[slug] || 'text-blue-400'
})

const accentBgClass = computed(() => {
  const map: Record<string, string> = {
    'code-completion': 'bg-cyan-500/10 text-cyan-400',
    'vibe-coding': 'bg-purple-500/10 text-purple-400',
    'spec-coding': 'bg-amber-500/10 text-amber-400',
    'agentic-coding': 'bg-red-500/10 text-red-400'
  }
  return map[slug] || 'bg-blue-500/10 text-blue-400'
})
</script>
