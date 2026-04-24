<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div class="text-center py-8">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-muted)">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
        覆盖 10 款主流工具 · 叠加结构分类
      </div>
      <h1 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--color-text-primary)">
        🧭 AI 编程工具选型系统
      </h1>
      <p class="text-lg max-w-xl mx-auto mb-8" style="color: var(--color-text-muted)">
        不知道用什么工具？3 步找到最适合你的
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-3">
        <NuxtLink to="/tools/picker" class="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5">
          🧭 开始选型 →
        </NuxtLink>
        <NuxtLink to="/tools/compare" class="px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
          📊 查看对比
        </NuxtLink>
      </div>
    </div>

    <!-- 核心认知：叠加结构 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🧠 核心认知：AI 编程工具是叠加结构</h2>
      <p class="text-sm mb-4" style="color: var(--color-text-muted)">
        所有 AI 编程工具都可以用两层来理解——<strong style="color: var(--color-text-primary)">形态</strong>决定你在哪里用它，<strong style="color: var(--color-text-primary)">能力</strong>决定它能帮你做多少事。
      </p>
      <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="font-medium text-blue-400 mb-2">🖥️ 形态层（Form）</div>
          <p style="color: var(--color-text-secondary)">我需要打开什么来用它？</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400">IDE</span>
            <span class="px-2 py-0.5 rounded text-xs bg-purple-500/10 text-purple-400">终端</span>
            <span class="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">插件</span>
            <span class="px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-400">Web</span>
          </div>
        </div>
        <div class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="font-medium text-purple-400 mb-2">🤖 能力层（Capability）</div>
          <p style="color: var(--color-text-secondary)">它能帮我做多少事？</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="px-2 py-0.5 rounded text-xs" style="background: rgba(34,211,238,0.1); color: #22d3ee">补全</span>
            <span class="px-2 py-0.5 rounded text-xs" style="background: rgba(52,211,153,0.1); color: #34d399">辅助</span>
            <span class="px-2 py-0.5 rounded text-xs" style="background: rgba(167,139,250,0.1); color: #a78bfa">协作</span>
            <span class="px-2 py-0.5 rounded text-xs" style="background: rgba(96,165,250,0.1); color: #60a5fa">Agent</span>
            <span class="px-2 py-0.5 rounded text-xs" style="background: rgba(248,113,113,0.1); color: #f87171">自主</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 能力光谱图（可交互） -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-semibold" style="color: var(--color-text-primary)">📊 能力光谱</h2>
          <p class="text-sm mt-1" style="color: var(--color-text-muted)">
            点击工具高亮筛选，再次点击取消
          </p>
        </div>
        <button
          v-if="highlightedTool"
          @click="highlightedTool = ''"
          class="text-xs px-3 py-1.5 rounded-lg border transition-all hover:border-red-400/50 hover:text-red-400"
          style="color: var(--color-text-muted); border-color: var(--color-border)"
        >
          ✕ 清除筛选
        </button>
      </div>
      <CapabilitySpectrum
        :highlight-ids="highlightedTool ? [highlightedTool] : []"
        :selected-id="highlightedTool"
        @select="handleSpectrumSelect"
      />
    </section>

    <!-- 筛选器 -->
    <section>
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          :class="activeFilter === filter.value
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            : 'border border-white/10 hover:border-white/20'"
          :style="activeFilter === filter.value ? '' : { color: 'var(--color-text-muted)' }"
        >
          {{ filter.icon }} {{ filter.label }}
        </button>
      </div>

      <!-- 工具卡片网格 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="tool in filteredTools"
          :key="tool.id"
          :to="`/tools/${tool.id}`"
          class="card group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
          :class="tool.region === '国内' ? 'hover:border-green-400/50 hover:shadow-green-500/10' : 'hover:border-blue-400/50 hover:shadow-blue-500/10'"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="text-3xl group-hover:scale-110 transition-transform duration-300">{{ tool.icon }}</div>
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="tool.region === '国内' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'"
              >
                {{ tool.region }}
              </span>
              <span class="px-2 py-1 text-xs rounded-full" :style="{ background: `${getCapabilityColor(tool.capability.level)}20`, color: getCapabilityColor(tool.capability.level) }">
                {{ tool.capability.label }}
              </span>
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors" style="color: var(--color-text-primary)">
            {{ tool.name }}
          </h3>
          <p class="text-xs mb-2" style="color: var(--color-text-muted)">{{ tool.vendor }} · {{ tool.form }}</p>
          <p class="text-sm mb-4" style="color: var(--color-text-secondary)">{{ tool.description }}</p>

          <!-- 能力光谱迷你条 -->
          <div class="w-full h-1.5 rounded-full overflow-hidden mb-3" style="background: rgba(255,255,255,0.08)">
            <div
              class="h-full rounded-full transition-all duration-500 group-hover:h-2"
              :style="{
                width: `${tool.capability.position}%`,
                background: `linear-gradient(90deg, #22d3ee, ${getCapabilityColor(tool.capability.level)})`
              }"
            ></div>
          </div>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in tool.tags" :key="tag" class="px-2 py-0.5 rounded text-xs" style="background: var(--color-bg-surface); color: var(--color-text-muted)">
              {{ tag }}
            </span>
          </div>

          <!-- 定价 -->
          <div class="mt-3 text-xs" style="color: var(--color-text-muted)">
            <span v-if="tool.pricing.free" class="text-green-400 font-medium">免费</span>
            <span v-else>{{ tool.pricing.paid }}</span>
            <span class="mx-1">·</span>
            <span>{{ tool.platform }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- 工具组合推荐 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🎯 推荐工具组合</h2>
      <p class="text-sm mb-6" style="color: var(--color-text-muted)">很多开发者不只用一个工具——组合使用效果更好</p>
      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="combo in combos" :key="combo.title" class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl mb-2">{{ combo.icon }}</div>
          <h3 class="font-semibold mb-1" style="color: var(--color-text-primary)">{{ combo.title }}</h3>
          <p class="text-xs mb-3" style="color: var(--color-text-muted)">{{ combo.desc }}</p>
          <div class="space-y-1">
            <div v-for="tool in combo.tools" :key="tool" class="text-xs flex items-center gap-2" style="color: var(--color-text-secondary)">
              <span>{{ getToolById(tool)?.icon }}</span>
              <span class="font-medium">{{ getToolById(tool)?.name }}</span>
              <span class="opacity-60">— {{ combo.roles[tool] }}</span>
            </div>
          </div>
          <div class="mt-3 text-xs" style="color: var(--color-text-muted)">
            适合：{{ combo.audience }}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center py-12 px-6 rounded-xl" style="background: linear-gradient(135deg, rgba(96,165,250,0.06), rgba(167,139,250,0.06))">
      <h2 class="text-2xl font-bold mb-3" style="color: var(--color-text-primary)">不确定该用什么？</h2>
      <p class="mb-6" style="color: var(--color-text-muted)">试试我们的智能选型器，3 步找到最适合你的工具</p>
      <NuxtLink to="/tools/picker" class="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 inline-block hover:-translate-y-0.5">
        🧭 开始选型
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { tools, getToolById, getCapabilityColor } from '~/composables/useToolsData'
import type { Tool } from '~/composables/useToolsData'

const activeFilter = ref('all')
const highlightedTool = ref('')

function handleSpectrumSelect(toolId: string) {
  highlightedTool.value = highlightedTool.value === toolId ? '' : toolId
}

const filters = [
  { value: 'all', label: '全部', icon: '🛠️' },
  { value: 'domestic', label: '国内', icon: '🇨🇳' },
  { value: 'overseas', label: '国外', icon: '🌍' },
  { value: 'ide', label: 'IDE', icon: '💻' },
  { value: 'terminal', label: '终端', icon: '⌨️' },
  { value: 'plugin', label: '插件', icon: '🔌' },
  { value: 'free', label: '免费', icon: '💰' },
  { value: 'agent', label: 'Agent+', icon: '🤖' }
]

const filteredTools = computed(() => {
  let result = tools
  // 先按筛选器过滤
  switch (activeFilter.value) {
    case 'domestic': result = result.filter(t => t.region === '国内'); break
    case 'overseas': result = result.filter(t => t.region === '国外'); break
    case 'ide': result = result.filter(t => t.form === 'IDE'); break
    case 'terminal': result = result.filter(t => t.form === '终端'); break
    case 'plugin': result = result.filter(t => t.form === '插件'); break
    case 'free': result = result.filter(t => t.pricing.free); break
    case 'agent': result = result.filter(t => t.capability.level >= 4); break
  }
  // 再按光谱高亮过滤
  if (highlightedTool.value) {
    result = result.filter(t => t.id === highlightedTool.value)
  }
  return result
})

const combos = [
  {
    icon: '🚀',
    title: '日常开发组合',
    desc: '覆盖补全到 Agent 的全场景',
    tools: ['cursor', 'github-copilot'],
    roles: { cursor: 'Agent 任务', 'github-copilot': '日常补全' },
    audience: '有经验的开发者'
  },
  {
    icon: '🇨🇳',
    title: '国内开发者组合',
    desc: '免费 + 国内直连',
    tools: ['trae', 'qoder'],
    roles: { trae: '复杂任务', qoder: '轻量补全' },
    audience: '国内开发者、预算有限'
  },
  {
    icon: '🧠',
    title: '深度工程组合',
    desc: 'IDE + 终端双管齐下',
    tools: ['cursor', 'claude-code'],
    roles: { cursor: '日常开发', 'claude-code': '深度重构' },
    audience: '追求代码质量的高级开发者'
  }
]

// SEO
useHead({
  title: 'AI编程工具选型系统 - 10 款主流工具对比 | Cursor / Trae / Claude Code',
  meta: [
    { name: 'description', content: 'AI 编程工具选型系统：覆盖 Cursor、Trae、Claude Code、GitHub Copilot 等 10 款主流工具，提供能力光谱对比、智能选型器和详细评测。' }
  ]
})
</script>
