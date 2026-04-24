<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">编程范式</h1>
      <p style="color: var(--color-text-muted)">四种AI编程范式，不是升级路径——而是不同场景下的最佳选择</p>
    </div>

    <!-- 场景选择器 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4">🧭 根据你的场景选择</h2>
      <p class="text-sm mb-5" style="color: var(--color-text-muted)">一个开发者可以同时使用多种范式，关键在于匹配当前任务的复杂度和协作需求。</p>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        <NuxtLink
          v-for="step in scenarioGuide"
          :key="step.id"
          :to="`/paradigms/${step.id}`"
          class="p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 text-center group"
          :class="step.cardClass"
        >
          <span class="text-3xl block mb-2">{{ step.icon }}</span>
          <span class="text-sm font-semibold block mb-1" :class="step.textClass">{{ step.label }}</span>
          <span class="text-xs block mb-2" style="color: var(--color-text-muted)">{{ step.scenario }}</span>
          <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" :class="step.textClass">
            了解更多 →
          </span>
        </NuxtLink>
      </div>
    </section>

    <!-- 四范式卡片 -->
    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="paradigm in paradigms"
        :key="paradigm.id"
        :to="`/paradigms/${paradigm.id}`"
        class="card group paradigm-card"
        :class="`paradigm-${paradigm.id}`"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">{{ paradigm.icon }}</span>
            <h2 class="text-xl font-semibold paradigm-title transition-colors">
              {{ paradigm.name }}
            </h2>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full font-medium" :class="paradigm.levelClass">{{ paradigm.level }}</span>
        </div>
        <p class="text-sm mb-3">{{ paradigm.description }}</p>
        <div class="flex flex-wrap gap-2 mb-3">
          <span v-for="tag in paradigm.tags" :key="tag" class="px-2 py-1 rounded text-xs paradigm-tag">
            {{ tag }}
          </span>
        </div>
        <div class="text-xs font-medium paradigm-title opacity-0 group-hover:opacity-100 transition-opacity">
          {{ paradigm.when }} →
        </div>
      </NuxtLink>
    </div>

    <!-- 范式对比 -->
    <section class="mt-12 p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-xl font-semibold mb-6">范式对比</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b" style="border-color: var(--color-border)">
              <th class="text-left py-3 px-4 theme-text-muted font-medium">维度</th>
              <th class="text-left py-3 px-4 text-cyan-400 font-medium">Code Completion</th>
              <th class="text-left py-3 px-4 text-blue-400 font-medium">Vibe Coding</th>
              <th class="text-left py-3 px-4 text-amber-400 font-medium">Spec Coding</th>
              <th class="text-left py-3 px-4 text-purple-400 font-medium">Agentic Coding</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 theme-text-muted">人类角色</td>
              <td class="py-3 px-4">打字员</td>
              <td class="py-3 px-4">导演</td>
              <td class="py-3 px-4">架构师</td>
              <td class="py-3 px-4">指挥官</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 theme-text-muted">AI角色</td>
              <td class="py-3 px-4">智能输入法</td>
              <td class="py-3 px-4">代码生成器</td>
              <td class="py-3 px-4">严格执行者</td>
              <td class="py-3 px-4">自主智能体</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 theme-text-muted">上下文范围</td>
              <td class="py-3 px-4">当前文件</td>
              <td class="py-3 px-4">单模块</td>
              <td class="py-3 px-4">全仓库</td>
              <td class="py-3 px-4">全仓库 + 工具</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 theme-text-muted">核心优势</td>
              <td class="py-3 px-4">减少重复劳动</td>
              <td class="py-3 px-4">快速、灵活、低门槛</td>
              <td class="py-3 px-4">可追溯、可验证</td>
              <td class="py-3 px-4">自主、端到端</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 theme-text-muted">适用场景</td>
              <td class="py-3 px-4">日常编码</td>
              <td class="py-3 px-4">原型验证</td>
              <td class="py-3 px-4">团队项目</td>
              <td class="py-3 px-4">企业级交付</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 theme-text-muted">质量控制</td>
              <td class="py-3 px-4">人工负责</td>
              <td class="py-3 px-4">大致可用</td>
              <td class="py-3 px-4">规格验证</td>
              <td class="py-3 px-4">自动化门禁</td>
            </tr>
            <tr>
              <td class="py-3 px-4 theme-text-muted">学习成本</td>
              <td class="py-3 px-4">⭐</td>
              <td class="py-3 px-4">⭐⭐</td>
              <td class="py-3 px-4">⭐⭐⭐</td>
              <td class="py-3 px-4">⭐⭐⭐⭐</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs mt-4" style="color: var(--color-text-muted)">💡 多数成熟团队会同时使用多种范式：日常用 Code Completion，原型用 Vibe Coding，生产用 Spec Coding，复杂任务用 Agentic Coding。</p>
    </section>

    <!-- 常见误区 -->
    <section class="p-6 rounded-xl" style="background: rgba(248, 113, 113, 0.05); border: 1px solid rgba(248, 113, 113, 0.15)">
      <h2 class="text-lg font-semibold mb-4 text-red-400">⚠️ 常见误区</h2>
      <div class="space-y-3 text-sm" style="color: var(--color-text-secondary)">
        <div class="flex gap-3">
          <span class="text-red-400 font-bold shrink-0">❌</span>
          <span><strong>"范式越高级越好"</strong> — 错。一个 500 行的脚本用 Vibe Coding 就够了，没必要写 Spec。</span>
        </div>
        <div class="flex gap-3">
          <span class="text-red-400 font-bold shrink-0">❌</span>
          <span><strong>"Vibe Coding 不专业"</strong> — 错。快速原型和个人项目中，它的效率远超传统方式。</span>
        </div>
        <div class="flex gap-3">
          <span class="text-red-400 font-bold shrink-0">❌</span>
          <span><strong>"选一个范式就够了"</strong> — 错。成熟的AI编程实践是根据场景灵活切换。</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const scenarioGuide = [
  {
    id: 'code-completion', icon: '⌨️', label: 'Code Completion',
    scenario: '日常编码、学习新语言/框架',
    cardClass: 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-cyan-500/5 hover:shadow-lg',
    textClass: 'text-cyan-400'
  },
  {
    id: 'vibe-coding', icon: '🎵', label: 'Vibe Coding',
    scenario: '快速原型、个人项目、创意探索',
    cardClass: 'bg-purple-500/5 border-purple-500/20 hover:border-purple-400/50 hover:shadow-purple-500/5 hover:shadow-lg',
    textClass: 'text-purple-400'
  },
  {
    id: 'spec-coding', icon: '📋', label: 'Spec Coding',
    scenario: '团队协作、生产项目、质量要求高',
    cardClass: 'bg-amber-500/5 border-amber-500/20 hover:border-amber-400/50 hover:shadow-amber-500/5 hover:shadow-lg',
    textClass: 'text-amber-400'
  },
  {
    id: 'agentic-coding', icon: '🧠', label: 'Agentic Coding',
    scenario: '复杂系统、端到端交付、自动化',
    cardClass: 'bg-red-500/5 border-red-500/20 hover:border-red-400/50 hover:shadow-red-500/5 hover:shadow-lg',
    textClass: 'text-red-400'
  }
]

const paradigms = [
  {
    id: 'code-completion',
    name: 'Code Completion',
    icon: '⌨️',
    description: 'AI预测你下一步要写的代码，按Tab接受。零学习成本，立即提效。',
    tags: ['被动响应', '逐行建议', '低门槛'],
    level: '入门', levelClass: 'bg-cyan-500/15 text-cyan-400',
    when: '日常编码、学习新语言/框架时'
  },
  {
    id: 'vibe-coding',
    name: 'Vibe Coding',
    icon: '🎵',
    description: '描述意图，AI实现，快速验证创意。适合"先做出来再说"的场景。',
    tags: ['自然语言', '创意优先', '沉浸式'],
    level: '进阶', levelClass: 'bg-purple-500/15 text-purple-400',
    when: '原型验证、个人项目、创意探索时'
  },
  {
    id: 'spec-coding',
    name: 'Spec Coding',
    icon: '📋',
    description: '先写规格再实现，契约驱动的工程化开发。规格是合同，代码是执行。',
    tags: ['规格先行', '可追溯', '质量保证'],
    level: '工程化', levelClass: 'bg-amber-500/15 text-amber-400',
    when: '团队协作、生产项目、质量要求高时'
  },
  {
    id: 'agentic-coding',
    name: 'Agentic Coding',
    icon: '🧠',
    description: 'AI自主规划、执行、闭环的端到端开发。人是指挥官，AI是执行者。',
    tags: ['自主决策', '工具调用', '端到端'],
    level: '高级', levelClass: 'bg-red-500/15 text-red-400',
    when: '复杂系统、端到端交付、自动化流程时'
  }
]

// SEO
useHead({
  title: 'AI编程四大范式 - Code Completion / Vibe Coding / Spec Coding / Agentic Coding',
  meta: [
    { name: 'description', content: '详解AI编程的四种范式：从代码补全到智能体编程，根据场景选择最佳方案。包含定义、对比、代码示例和适用场景。' }
  ]
})
</script>

<style scoped>

/* 主题适配 */
.theme-text-secondary { color: var(--color-text-secondary); }
.theme-text-muted { color: var(--color-text-muted); }

</style>
