<template>
  <div class="space-y-8">
    <Breadcrumb :items="breadcrumbItems" />

    <ContentDoc :path="`/paradigms/${slug}`">
      <template #default="{ doc }">
        <LastUpdated :date="doc.lastUpdated" />
        <div class="flex gap-8">
          <article :class="[proseClass, 'max-w-none flex-1 min-w-0']">
            <ContentRenderer :value="doc" />
          </article>
          <aside class="hidden lg:block w-56 shrink-0">
            <PageToc :toc="doc.body?.toc?.links || []" />
          </aside>
        </div>
        <div class="mt-12"><InteractivePromptTool /></div>
        <div class="mt-8"><CommunityLinks /></div>
        <ReadNext :items="nextItems" />
        <FeedbackWidget :page-path="`/paradigms/${slug}`" />
      </template>

      <template #not-found>
        <div class="space-y-8">
      <div class="flex items-center gap-4">
        <span class="text-5xl">{{ currentParadigm?.icon }}</span>
        <div>
          <h1 class="text-3xl font-bold" :class="titleColorClass">{{ currentParadigm?.name }}</h1>
          <p style="color: var(--color-text-muted)">{{ currentParadigm?.enName }}</p>
        </div>
      </div>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4" style="color: var(--color-text-primary)">定义</h2>
        <p style="color: var(--color-text-secondary)">{{ currentParadigm?.definition }}</p>
      </section>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4" style="color: var(--color-text-primary)">核心理念</h2>
        <ul class="space-y-3">
          <li v-for="(item, index) in currentParadigm?.concepts" :key="index" class="flex items-start gap-3">
            <span class="mt-1" :class="accentTextClass">•</span>
            <span style="color: var(--color-text-secondary)">{{ item }}</span>
          </li>
        </ul>
      </section>

      <section v-if="currentParadigm?.codeExample" class="card">
        <h2 class="text-xl font-semibold mb-4" style="color: var(--color-text-primary)">代码示例</h2>
        <p class="text-sm mb-4" style="color: var(--color-text-muted)">{{ currentParadigm.codeExample.description }}</p>
        <CodeCompare
          :bad-code="currentParadigm.codeExample.bad"
          :good-code="currentParadigm.codeExample.good"
          :bad-label="currentParadigm.codeExample.badLabel"
          :good-label="currentParadigm.codeExample.goodLabel"
          :lang="currentParadigm.codeExample.lang"
        />
      </section>

      <div class="grid md:grid-cols-2 gap-6">
        <section class="card border-green-500/20">
          <h2 class="text-xl font-semibold mb-4 text-green-400">✓ 适用场景</h2>
          <ul class="space-y-2">
            <li v-for="(scene, index) in currentParadigm?.scenes" :key="index" class="flex items-start gap-2">
              <span class="text-green-400 mt-0.5">✓</span>
              <span class="text-sm" style="color: var(--color-text-secondary)">{{ scene }}</span>
            </li>
          </ul>
        </section>
        <section class="card border-red-500/20">
          <h2 class="text-xl font-semibold mb-4 text-red-400">✗ 不适用场景</h2>
          <ul class="space-y-2">
            <li v-for="(scene, index) in currentParadigm?.notSuitable" :key="index" class="flex items-start gap-2">
              <span class="text-red-400 mt-0.5">✗</span>
              <span class="text-sm" style="color: var(--color-text-secondary)">{{ scene }}</span>
            </li>
          </ul>
        </section>
      </div>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4" style="color: var(--color-text-primary)">代表工具</h2>
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

      <InteractivePromptTool />
      <CommunityLinks />
      <ReadNext :items="nextItems" />
      <FeedbackWidget :page-path="`/paradigms/${slug}`" />
    </div>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { proseClass } = useTheme()

const paradigmsData: Record<string, any> = {
  'code-completion': {
    icon: '⌨️', name: 'Code Completion', enName: '代码补全', accent: 'cyan',
    definition: 'AI编程最基础的形态——AI根据光标周围的上下文，预测你下一步要写的代码，开发者按Tab接受。如果说传统IDE的自动补全是"查字典"，那AI代码补全就是"读心术"——它不只补全一个方法名，而是能补全整个函数体。',
    concepts: ['被动响应：AI不会主动介入，只在开发者输入时触发', '局部感知：通常只看当前文件/函数，不理解项目全貌', '逐块建议：从一行到一个函数，现代AI补全能生成完整函数实现'],
    codeExample: { description: '当你输入函数签名，AI能自动补全整个实现：', badLabel: '❌ 手动编写', goodLabel: '✅ AI 补全（按 Tab 接受）', lang: 'python', bad: `def calculate_sum(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total`, good: `def calculate_sum(numbers: list[int]) -> int:\n    return sum(numbers)` },
    scenes: ['日常编码效率提升', '重复性代码自动生成', '学习新语言/API时快速上手', '编写常见算法和数据结构'],
    notSuitable: ['需要理解项目全局架构的任务', '跨文件重构', '复杂业务逻辑设计', '需要创意的架构决策'],
    toolLinks: [{ slug: 'github-copilot', name: 'GitHub Copilot' }, { slug: 'cursor', name: 'Cursor' }, { slug: 'qoder', name: 'Qoder' }, { slug: 'codebuddy', name: 'CodeBuddy' }]
  },
  'vibe-coding': {
    icon: '🎵', name: 'Vibe Coding', enName: '氛围编程', accent: 'purple',
    definition: '由前OpenAI联合创始人Andrej Karpathy于2025年2月提出，核心是"意图驱动的沉浸式编程"——开发者无需关注"如何实现"的技术细节，只需通过自然语言精准描述需求的"氛围"，AI即可生成可运行的完整代码。',
    concepts: ['反细节导向：开发者无需编写循环、定义变量等底层代码，只需明确"做什么"', '沉浸式协作：AI实时响应自然语言指令，形成"描述→生成→反馈→迭代"的即时循环', '创意优先：核心目标是快速验证创意，而非追求代码的极致优化'],
    codeExample: { description: '用自然语言描述需求，AI生成完整实现：', badLabel: '❌ 手动搭建', goodLabel: '✅ 自然语言驱动', lang: 'typescript', bad: `const [users, setUsers] = useState([])\nconst [loading, setLoading] = useState(true)\nuseEffect(() => {\n  fetch('/api/users').then(r => r.json())\n    .then(setUsers).finally(() => setLoading(false))\n}, [])`, good: `// 💬 "创建一个用户列表页面，从 /api/users 获取数据，\n//     支持搜索过滤，加载时显示骨架屏"\n// → AI 自动生成完整组件、样式、错误处理` },
    scenes: ['个人项目快速搭建', '原型验证和 MVP 开发', '前端 UI 实验', '一次性脚本和自动化工具'],
    notSuitable: ['需要长期维护的生产项目', '多人协作的团队项目', '对代码质量有严格要求的场景', '涉及安全敏感的系统'],
    toolLinks: [{ slug: 'cursor', name: 'Cursor' }, { slug: 'trae', name: 'Trae Builder' }, { slug: 'codex', name: 'Codex' }]
  },
  'spec-coding': {
    icon: '📋', name: 'Spec Coding', enName: '规格编程', accent: 'amber',
    definition: '规格先行的契约式开发——先用结构化文档定义"做什么"和"验收标准"，再让AI严格按照规格生成实现。规格是不可篡改的合同，代码必须服从规格。',
    concepts: ['Spec as Source of Truth：规格文档取代代码成为首要产物', '可执行规格：规格不只描述需求，还能直接驱动AI生成实现', '结构化流程：Constitution → Specify → Plan → Tasks → Implement'],
    codeExample: { description: '先写规格文档，再让AI按规格实现：', badLabel: '❌ 直接让 AI 写代码', goodLabel: '✅ 先写 Spec 再实现', lang: 'markdown', bad: `// 💬 "帮我写一个用户注册功能"\n// AI 可能生成：无验证、无错误处理、\n// 硬编码的密码规则、缺少类型安全...`, good: `## Spec: 用户注册功能\n\n### 需求\n- 邮箱 + 密码注册，密码最少8位含大小写+数字\n- 邮箱唯一性校验，返回明确错误码\n- 密码 bcrypt 加密存储\n\n### 验收标准\n- [ ] 重复邮箱注册返回 409 Conflict\n- [ ] 弱密码返回 422 + 具体提示\n- [ ] 成功注册返回 201 + 用户ID` },
    scenes: ['团队协作项目', '企业级开发', '复杂业务逻辑实现', '遗留系统改造', '合规性要求高的场景'],
    notSuitable: ['一次性脚本', '个人小项目', '快速原型验证', '探索性编程'],
    toolLinks: [{ slug: 'claude-code', name: 'Claude Code' }, { slug: 'cursor', name: 'Cursor' }, { slug: 'trae', name: 'Trae' }]
  },
  'agentic-coding': {
    icon: '🧠', name: 'Agentic Coding', enName: '智能体编程', accent: 'red',
    definition: 'AI编程的高阶范式，核心是将AI从"被动响应的助手"升级为"主动执行的智能体"。AI能自主理解需求、拆解任务、调用工具、执行代码，并根据环境反馈完成闭环迭代。',
    concepts: ['自主决策：AI不仅能生成代码，还能像人类工程师一样思考和规划', '全流程执行：从需求分析到代码生成、测试、部署的完整流程', '工程化能力：AGENTS.md指令系统、Hooks验证门禁、人类审查点'],
    codeExample: { description: '描述业务目标，AI自主拆解并执行全流程：', badLabel: '❌ 逐步手动指令', goodLabel: '✅ 目标驱动（AI 自主执行）', lang: 'bash', bad: `$ git checkout -b feat/auth\n$ mkdir src/modules/auth\n$ touch src/modules/auth/login.ts\n$ # ... 逐个文件创建，逐个命令执行`, good: `# 💬 "把 Python 项目迁移到 TypeScript，\n#       保持所有测试通过，提交 PR"\n#\n# AI 自主执行：\n# 1. 分析项目结构和依赖\n# 2. 制定迁移计划\n# 3. 逐文件转换 + 运行测试\n# 4. 修复错误直到全部通过\n# 5. 提交 PR + 撰写说明文档` },
    scenes: ['企业级项目全流程交付', '团队开发中的复杂任务', '系统级重构', '跨模块联调和集成'],
    notSuitable: ['简单的代码修改', '需要高度创意的设计任务', '人类专家必须亲自把关的安全关键系统', '资源受限的环境'],
    toolLinks: [{ slug: 'claude-code', name: 'Claude Code' }, { slug: 'cursor', name: 'Cursor Composer' }, { slug: 'trae', name: 'Trae SOLO' }, { slug: 'codex', name: 'Codex CLI' }]
  }
}

const currentParadigm = computed(() => paradigmsData[slug])

const breadcrumbItems = computed(() => {
  const name = currentParadigm.value?.name || slug
  return [{ label: '首页', path: '/' }, { label: '编程范式', path: '/paradigms' }, { label: name }]
})

const titleColorClass = computed(() => {
  const map: Record<string, string> = { 'code-completion': 'text-cyan-400', 'vibe-coding': 'text-purple-400', 'spec-coding': 'text-amber-400', 'agentic-coding': 'text-red-400' }
  return map[slug] || 'text-blue-400'
})

const accentTextClass = computed(() => {
  const map: Record<string, string> = { 'code-completion': 'text-cyan-400', 'vibe-coding': 'text-purple-400', 'spec-coding': 'text-amber-400', 'agentic-coding': 'text-red-400' }
  return map[slug] || 'text-blue-400'
})

const accentBgClass = computed(() => {
  const map: Record<string, string> = { 'code-completion': 'bg-cyan-500/10 text-cyan-400', 'vibe-coding': 'bg-purple-500/10 text-purple-400', 'spec-coding': 'bg-amber-500/10 text-amber-400', 'agentic-coding': 'bg-red-500/10 text-red-400' }
  return map[slug] || 'bg-blue-500/10 text-blue-400'
})

const nextItemsMap: Record<string, any[]> = {
  'code-completion': [
    { title: 'Vibe Coding', path: '/paradigms/vibe-coding', icon: '🎵', description: '意图驱动的沉浸式编程范式' },
    { title: '工具对比', path: '/tools', icon: '🛠️', description: '看看哪些工具支持代码补全' }
  ],
  'vibe-coding': [
    { title: 'Spec Coding', path: '/paradigms/spec-coding', icon: '📋', description: '用规格约束AI的生成，解决质量问题' },
    { title: 'Trae 工具详解', path: '/tools/trae', icon: '🔥', description: '国内首个支持 SOLO 模式的 AI IDE' }
  ],
  'spec-coding': [
    { title: 'Agentic Coding', path: '/paradigms/agentic-coding', icon: '🧠', description: '让 AI 自主规划和执行复杂任务' },
    { title: 'Spec 驱动开发方法论', path: '/methodology/spec-driven', icon: '📋', description: '深度解析 Spec 驱动开发的完整流程' }
  ],
  'agentic-coding': [
    { title: '方法论概览', path: '/methodology', icon: '📖', description: '系统学习 AI 编程的各类工作流' },
    { title: 'Claude Code 详解', path: '/tools/claude-code', icon: '🤖', description: '最强智能体工具实战' }
  ]
}

const nextItems = computed(() => nextItemsMap[slug] || [])
</script>
