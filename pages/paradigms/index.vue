<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">编程范式</h1>
      <p class="text-gray-400">从代码补全到智能体，AI编程的四层演进</p>
    </div>

    <!-- 演进路线图 -->
    <section class="p-6 rounded-xl glass border border-white/[0.08]">
      <h2 class="text-xl font-semibold mb-6">演进路线</h2>
      <div class="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        <div v-for="(step, index) in evolutionSteps" :key="step.id" class="flex items-center gap-2 shrink-0">
          <NuxtLink
            :to="`/paradigms/${step.id}`"
            class="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <span class="text-3xl">{{ step.icon }}</span>
            <span class="text-sm font-medium group-hover:text-blue-400 transition-colors">{{ step.label }}</span>
            <span class="text-xs text-gray-500">{{ step.keyword }}</span>
          </NuxtLink>
          <span v-if="index < evolutionSteps.length - 1" class="text-gray-600 text-xl">→</span>
        </div>
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
        <div class="text-4xl mb-4">{{ paradigm.icon }}</div>
        <h2 class="text-xl font-semibold mb-2 paradigm-title transition-colors">
          {{ paradigm.name }}
        </h2>
        <p class="text-gray-400 text-sm mb-4">{{ paradigm.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in paradigm.tags" :key="tag" class="px-2 py-1 rounded text-xs paradigm-tag">
            {{ tag }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- 范式对比 -->
    <section class="mt-12 p-6 rounded-xl glass border border-white/[0.08]">
      <h2 class="text-xl font-semibold mb-6">范式对比</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-white/[0.08]">
              <th class="text-left py-3 px-4 text-gray-400 font-medium">维度</th>
              <th class="text-left py-3 px-4 text-cyan-400 font-medium">Code Completion</th>
              <th class="text-left py-3 px-4 text-blue-400 font-medium">Vibe Coding</th>
              <th class="text-left py-3 px-4 text-amber-400 font-medium">Spec Coding</th>
              <th class="text-left py-3 px-4 text-purple-400 font-medium">Agentic Coding</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 text-gray-400">人类角色</td>
              <td class="py-3 px-4">打字员</td>
              <td class="py-3 px-4">导演</td>
              <td class="py-3 px-4">架构师</td>
              <td class="py-3 px-4">指挥官</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 text-gray-400">AI角色</td>
              <td class="py-3 px-4">智能输入法</td>
              <td class="py-3 px-4">代码生成器</td>
              <td class="py-3 px-4">严格执行者</td>
              <td class="py-3 px-4">自主智能体</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 text-gray-400">上下文范围</td>
              <td class="py-3 px-4">当前文件</td>
              <td class="py-3 px-4">单模块</td>
              <td class="py-3 px-4">全仓库</td>
              <td class="py-3 px-4">全仓库 + 工具</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 text-gray-400">核心优势</td>
              <td class="py-3 px-4">减少重复劳动</td>
              <td class="py-3 px-4">快速、灵活、低门槛</td>
              <td class="py-3 px-4">可追溯、可验证</td>
              <td class="py-3 px-4">自主、端到端</td>
            </tr>
            <tr class="border-b border-white/[0.04]">
              <td class="py-3 px-4 text-gray-400">适用场景</td>
              <td class="py-3 px-4">日常编码</td>
              <td class="py-3 px-4">原型验证</td>
              <td class="py-3 px-4">团队项目</td>
              <td class="py-3 px-4">企业级交付</td>
            </tr>
            <tr>
              <td class="py-3 px-4 text-gray-400">质量控制</td>
              <td class="py-3 px-4">人工负责</td>
              <td class="py-3 px-4">大致可用</td>
              <td class="py-3 px-4">规格验证</td>
              <td class="py-3 px-4">自动化门禁</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const evolutionSteps = [
  { id: 'code-completion', icon: '⌨️', label: '补全', keyword: '被动' },
  { id: 'vibe-coding', icon: '🎵', label: '氛围', keyword: '意图' },
  { id: 'spec-coding', icon: '📋', label: '规格', keyword: '约束' },
  { id: 'agentic-coding', icon: '🧠', label: '智能体', keyword: '自主' }
]

const paradigms = [
  {
    id: 'code-completion',
    name: 'Code Completion',
    icon: '⌨️',
    description: '代码补全 - AI预测你下一步要写的代码，按Tab接受',
    tags: ['被动响应', '逐行建议', '低门槛']
  },
  {
    id: 'vibe-coding',
    name: 'Vibe Coding',
    icon: '🎵',
    description: '氛围编程 - 描述意图，AI实现，快速验证创意',
    tags: ['自然语言', '创意优先', '沉浸式']
  },
  {
    id: 'spec-coding',
    name: 'Spec Coding',
    icon: '📋',
    description: '规格编程 - 先写规格再实现，契约驱动的工程化开发',
    tags: ['规格先行', '可追溯', '质量保证']
  },
  {
    id: 'agentic-coding',
    name: 'Agentic Coding',
    icon: '🧠',
    description: '智能体编程 - AI自主规划、执行、闭环的端到端开发',
    tags: ['自主决策', '工具调用', '端到端']
  }
]
</script>
