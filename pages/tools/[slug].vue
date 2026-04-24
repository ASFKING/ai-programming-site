<template>
  <div class="space-y-8">
    <!-- 面包屑导航 -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- 最后更新时间 -->
    <LastUpdated :date="lastUpdated" />

    <!-- 统一页眉 -->
    <div class="flex items-start gap-4 mb-4">
      <span class="text-5xl shrink-0">{{ tool?.icon }}</span>
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl font-bold" style="color: var(--color-text-primary)">{{ tool?.name }}</h1>
        <div class="flex flex-wrap items-center gap-2 mt-2">
          <span class="text-sm" style="color: var(--color-text-muted)">{{ tool?.vendor }}</span>
          <span class="px-2 py-0.5 rounded-full text-xs" :class="tool?.region === '国内' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'">
            {{ tool?.region }}
          </span>
          <span class="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400">
            {{ tool?.form }}
          </span>
          <span class="px-2 py-0.5 rounded-full text-xs" :style="{ background: `${getCapabilityColor(tool?.capability?.level ?? 3)}20`, color: getCapabilityColor(tool?.capability?.level ?? 3) }">
            {{ tool?.capability?.label }}
          </span>
          <span class="px-2 py-0.5 rounded-full text-xs" :class="tool?.pricing?.free ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'">
            {{ tool?.pricing?.free ? '免费' : tool?.pricing?.paid }}
          </span>
        </div>
        <p class="text-sm mt-2" style="color: var(--color-text-secondary)">{{ tool?.longDescription }}</p>
      </div>
    </div>

    <!-- 能力光谱定位 -->
    <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-sm font-semibold mb-3" style="color: var(--color-text-primary)">📊 能力光谱定位</h2>
      <CapabilitySpectrum :highlight-ids="tool ? [tool.id] : []" />
    </section>

    <!-- 评分维度 -->
    <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-sm font-semibold mb-4" style="color: var(--color-text-primary)">📈 能力评分</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div v-for="dim in scoreDimensions" :key="dim.key" class="p-3 rounded-lg text-center" style="background: var(--color-bg-surface)">
          <div class="text-xs mb-1" style="color: var(--color-text-muted)">{{ dim.label }}</div>
          <div class="flex justify-center gap-0.5 mb-1">
            <span
              v-for="i in 5"
              :key="i"
              class="text-sm"
              :style="{ color: i <= (tool?.scores as any)?.[dim.key] ? dim.color : 'rgba(255,255,255,0.15)' }"
            >●</span>
          </div>
          <div class="text-xs font-medium" :style="{ color: dim.color }">
            {{ (tool?.scores as any)?.[dim.key] }}/5
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能 + 基本信息 -->
    <div class="grid md:grid-cols-2 gap-6">
      <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
        <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🎯 核心功能</h2>
        <ul class="space-y-2">
          <li v-for="feature in tool?.features" :key="feature" class="flex items-start gap-2 text-sm">
            <span class="text-blue-400 shrink-0 mt-0.5">✓</span>
            <span style="color: var(--color-text-secondary)">{{ feature }}</span>
          </li>
        </ul>
      </section>

      <div class="space-y-4">
        <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
          <h2 class="text-lg font-semibold mb-3" style="color: var(--color-text-primary)">📋 基本信息</h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span style="color: var(--color-text-muted)">平台</span>
              <span style="color: var(--color-text-secondary)">{{ tool?.platform }}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--color-text-muted)">网络</span>
              <span style="color: var(--color-text-secondary)">{{ tool?.network }}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--color-text-muted)">定价</span>
              <span style="color: var(--color-text-secondary)">{{ tool?.pricing?.free ? '免费' : tool?.pricing?.paid }}</span>
            </div>
            <div v-if="tool?.pricing?.enterprise" class="flex justify-between">
              <span style="color: var(--color-text-muted)">企业版</span>
              <span style="color: var(--color-text-secondary)">{{ tool.pricing.enterprise }}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--color-text-muted)">底层模型</span>
              <span class="text-xs text-right max-w-[60%]" style="color: var(--color-text-secondary)">{{ tool?.models }}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--color-text-muted)">官网</span>
              <a :href="tool?.website" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 text-xs">访问官网 →</a>
            </div>
          </div>
        </section>

        <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
          <h2 class="text-lg font-semibold mb-3" style="color: var(--color-text-primary)">🏷️ 标签</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in tool?.allTags" :key="tag" class="px-2 py-0.5 rounded text-xs" style="background: var(--color-bg-surface); color: var(--color-text-muted)">
              {{ tag }}
            </span>
          </div>
        </section>
      </div>
    </div>

    <!-- 实战技巧 -->
    <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">💡 实战技巧</h2>
      <div class="grid md:grid-cols-2 gap-3">
        <div v-for="(tip, index) in tool?.tips" :key="index" class="flex items-start gap-3 p-3 rounded-lg" style="background: var(--color-bg-surface)">
          <span class="text-blue-400 font-bold text-sm shrink-0">{{ index + 1 }}</span>
          <span class="text-sm" style="color: var(--color-text-secondary)">{{ tip }}</span>
        </div>
      </div>
    </section>

    <!-- 优缺点 -->
    <div class="grid md:grid-cols-2 gap-6">
      <section class="p-5 rounded-xl" style="background: rgba(52, 211, 153, 0.04); border: 1px solid rgba(52, 211, 153, 0.15)">
        <h2 class="text-lg font-semibold mb-4 text-green-400">✅ 优点</h2>
        <ul class="space-y-2">
          <li v-for="pro in tool?.pros" :key="pro" class="flex items-start gap-2 text-sm">
            <span class="text-green-400 shrink-0 mt-0.5">✓</span>
            <span style="color: var(--color-text-secondary)">{{ pro }}</span>
          </li>
        </ul>
      </section>

      <section class="p-5 rounded-xl" style="background: rgba(248, 113, 113, 0.04); border: 1px solid rgba(248, 113, 113, 0.15)">
        <h2 class="text-lg font-semibold mb-4 text-red-400">❌ 缺点</h2>
        <ul class="space-y-2">
          <li v-for="con in tool?.cons" :key="con" class="flex items-start gap-2 text-sm">
            <span class="text-red-400 shrink-0 mt-0.5">✗</span>
            <span style="color: var(--color-text-secondary)">{{ con }}</span>
          </li>
        </ul>
      </section>
    </div>

    <!-- 常见陷阱 -->
    <section class="p-5 rounded-xl" style="background: rgba(251, 191, 36, 0.04); border: 1px solid rgba(251, 191, 36, 0.15)">
      <h2 class="text-lg font-semibold mb-4 text-amber-400">⚠️ 常见陷阱</h2>
      <ul class="space-y-2">
        <li v-for="pitfall in tool?.pitfalls" :key="pitfall" class="flex items-start gap-2 text-sm">
          <span class="text-amber-400 shrink-0 mt-0.5">⚠</span>
          <span style="color: var(--color-text-secondary)">{{ pitfall }}</span>
        </li>
      </ul>
    </section>

    <!-- 与竞品对比 -->
    <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🔄 与竞品对比</h2>
      <div class="space-y-3">
        <NuxtLink
          v-for="competitorId in tool?.competitors"
          :key="competitorId"
          :to="`/tools/${competitorId}`"
          class="flex items-center gap-4 p-3 rounded-lg border transition-all hover:bg-white/5"
          style="border-color: var(--color-border)"
        >
          <span class="text-2xl">{{ getToolById(competitorId)?.icon }}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-medium" style="color: var(--color-text-primary)">{{ getToolById(competitorId)?.name }}</span>
              <span class="text-xs px-1.5 py-0.5 rounded" :style="{ background: `${getCapabilityColor(getToolById(competitorId)?.capability?.level ?? 3)}20`, color: getCapabilityColor(getToolById(competitorId)?.capability?.level ?? 3) }">
                {{ getToolById(competitorId)?.capability?.label }}
              </span>
            </div>
            <p class="text-xs mt-1" style="color: var(--color-text-muted)">{{ getToolById(competitorId)?.description }}</p>
          </div>
          <span class="text-xs shrink-0" style="color: var(--color-text-muted)">查看详情 →</span>
        </NuxtLink>
      </div>
      <div class="mt-4">
        <NuxtLink to="/tools/compare" class="text-sm text-blue-400 hover:text-blue-300">
          📊 使用对比工具查看详细差异 →
        </NuxtLink>
      </div>
    </section>

    <!-- 适用场景 -->
    <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🎯 适用场景</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="useCase in tool?.useCases" :key="useCase" class="px-3 py-1.5 rounded-lg text-sm" style="background: var(--color-bg-surface); color: var(--color-text-secondary)">
          {{ useCase }}
        </span>
      </div>
    </section>

    <!-- 定价详情 -->
    <section v-if="tool?.pricing" class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">💰 定价方案</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-if="tool.pricing.free" class="p-4 rounded-lg" style="background: rgba(52, 211, 153, 0.06); border: 1px solid rgba(52, 211, 153, 0.2)">
          <div class="text-sm font-medium text-green-400 mb-1">免费版</div>
          <div class="text-xs" style="color: var(--color-text-muted)">{{ tool.pricing.freeDetails }}</div>
        </div>
        <div v-if="tool.pricing.paid" class="p-4 rounded-lg" style="background: rgba(96, 165, 250, 0.06); border: 1px solid rgba(96, 165, 250, 0.2)">
          <div class="text-sm font-medium text-blue-400 mb-1">付费版</div>
          <div class="text-xs" style="color: var(--color-text-muted)">{{ tool.pricing.paid }}</div>
        </div>
        <div v-if="tool.pricing.enterprise" class="p-4 rounded-lg" style="background: rgba(167, 139, 250, 0.06); border: 1px solid rgba(167, 139, 250, 0.2)">
          <div class="text-sm font-medium text-purple-400 mb-1">企业版</div>
          <div class="text-xs" style="color: var(--color-text-muted)">{{ tool.pricing.enterprise }}</div>
        </div>
      </div>
    </section>

    <!-- 学习资源 -->
    <section v-if="tool?.learningResources?.length" class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">📚 学习资源</h2>
      <div class="space-y-2">
        <a
          v-for="resource in tool.learningResources"
          :key="resource.url"
          :href="resource.url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 p-3 rounded-lg border transition-all hover:bg-white/5"
          style="border-color: var(--color-border)"
        >
          <span class="text-blue-400">📖</span>
          <span class="text-sm" style="color: var(--color-text-secondary)">{{ resource.title }}</span>
          <span class="text-xs ml-auto" style="color: var(--color-text-muted)">→</span>
        </a>
      </div>
    </section>

    <!-- Markdown 内容（如果有） -->
    <ContentDoc :path="`/tools/${slug}`">
      <template v-slot="{ doc }">
        <section class="p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
          <article :class="[proseClass, 'max-w-none']">
            <ContentRenderer :value="doc" />
          </article>
        </section>
      </template>
      <template #not-found></template>
    </ContentDoc>

    <!-- 推荐阅读 -->
    <ReadNext :items="nextItems" />
    <CommunityLinks class="mt-8" />
    <FeedbackWidget :page-path="`/tools/${slug}`" />
  </div>
</template>

<script setup lang="ts">
import { getToolById, getCapabilityColor, tools } from '~/composables/useToolsData'

const route = useRoute()
const slug = route.params.slug as string
const { proseClass } = useTheme()

const tool = computed(() => getToolById(slug))

// Fetch lastUpdated from content frontmatter
const { data: toolContent } = await useAsyncData(`tool-meta-${slug}`, () =>
  queryContent(`tools/${slug}`).only(['lastUpdated']).findOne()
)
const lastUpdated = computed(() => toolContent.value?.lastUpdated)

const breadcrumbItems = computed(() => [
  { label: '首页', path: '/' },
  { label: 'AI工具', path: '/tools' },
  { label: tool.value?.name || slug }
])

const scoreDimensions = [
  { key: 'autonomy', label: '自主性', color: '#f87171' },
  { key: 'contextDepth', label: '上下文深度', color: '#60a5fa' },
  { key: 'engineering', label: '工程化', color: '#a78bfa' },
  { key: 'easeOfUse', label: '上手成本', color: '#34d399' },
  { key: 'costEfficiency', label: '成本效率', color: '#fbbf24' }
]

const nextItemsMap: Record<string, any[]> = {
  cursor: [
    { title: 'Vibe Coding 范式', path: '/paradigms/vibe-coding', icon: '🎵', description: 'Cursor 是 Vibe Coding 的最佳载体' },
    { title: 'Trae 工具对比', path: '/tools/trae', icon: '🔥', description: '看看 Trae 与 Cursor 的异同' },
    { title: '工具对比器', path: '/tools/compare', icon: '📊', description: '对比更多工具' }
  ],
  trae: [
    { title: 'Spec 驱动开发实战', path: '/methodology/spec-driven', icon: '📋', description: '学习如何在 Trae 中使用 Spec 模式' },
    { title: 'Cursor 工具对比', path: '/tools/cursor', icon: '💻', description: '看看 Cursor 与 Trae 的异同' },
    { title: '工具对比器', path: '/tools/compare', icon: '📊', description: '对比更多工具' }
  ],
  'claude-code': [
    { title: 'Agentic Coding', path: '/paradigms/agentic-coding', icon: '🧠', description: 'Claude Code 是最强的智能体编程工具' },
    { title: 'AGENTS.md 指南', path: '/methodology/agents-claude-md', icon: '📄', description: '学习如何为 Claude 设置指令文件' }
  ],
  'github-copilot': [
    { title: '代码补全范式', path: '/paradigms/code-completion', icon: '⌨️', description: '了解最基础的 AI 编程辅助方式' },
    { title: 'Cursor 分流', path: '/tools/cursor', icon: '💻', description: '体验更智能的 AI 原生开发环境' }
  ]
}

const nextItems = computed(() => {
  if (nextItemsMap[slug]) return nextItemsMap[slug]
  return [
    { title: '工具选型器', path: '/tools/picker', icon: '🧭', description: '3 步找到最适合你的工具' },
    { title: '工具对比器', path: '/tools/compare', icon: '📊', description: '对比更多工具' },
    { title: '方法论概览', path: '/methodology', icon: '📖', description: '如何更好地使用这些工具？' }
  ]
})

// SEO
useHead({
  title: computed(() => tool.value ? `${tool.value.name} - AI 编程工具评测与实战指南` : 'AI 编程工具'),
  meta: [
    { name: 'description', content: computed(() => tool.value?.description || '') }
  ]
})
</script>
