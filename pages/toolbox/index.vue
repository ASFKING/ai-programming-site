<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div class="text-center py-8">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-muted)">
        <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
        纯前端交互 · 零 API 调用 · 即开即用
      </div>
      <h1 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--color-text-primary)">
        🧰 AI 编程工具箱
      </h1>
      <p class="text-lg max-w-xl mx-auto" style="color: var(--color-text-muted)">
        交互式小工具，帮你「玩」懂 AI 编程中的抽象概念
      </p>
    </div>

    <!-- 工具卡片网格 -->
    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        class="card group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
        :class="tool.highlight ? 'ring-1' : ''"
      >
        <div class="flex items-start gap-4 mb-4">
          <div class="text-4xl group-hover:scale-110 transition-transform duration-300">{{ tool.icon }}</div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-lg font-semibold group-hover:text-blue-400 transition-colors" style="color: var(--color-text-primary)">
                {{ tool.name }}
              </h3>
              <span v-if="tool.tag" class="px-2 py-0.5 text-xs rounded-full" :style="{ background: tool.tagBg, color: tool.tagColor }">
                {{ tool.tag }}
              </span>
            </div>
            <p class="text-sm" style="color: var(--color-text-secondary)">{{ tool.description }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in tool.tags" :key="tag" class="px-2 py-0.5 rounded text-xs" style="background: var(--color-bg-surface); color: var(--color-text-muted)">
              {{ tag }}
            </span>
          </div>
          <span class="text-sm group-hover:translate-x-1 transition-transform" style="color: var(--color-text-muted)">
            试试看 →
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- 底部说明 -->
    <section class="p-6 rounded-xl text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
      <p class="text-sm" style="color: var(--color-text-muted)">
        💡 所有工具均在浏览器端运行，<strong style="color: var(--color-text-secondary)">不调用任何外部 API</strong>，你的数据不会离开设备。
        <br>
        有工具想法？
        <a href="https://github.com/ASFKING/ai-programming-site/issues" target="_blank" class="text-blue-400 hover:underline ml-1">
          欢迎反馈 →
        </a>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const tools = [
  {
    name: '上下文丢失可视化',
    icon: '🧠',
    path: '/toolbox/context-lost',
    description: '滑块调整上下文长度，热力图展示中间内容的注意力衰减——理解为什么"长上下文 ≠ 好上下文"',
    tags: ['注意力机制', 'Lost in the Middle', '交互可视化'],
    tag: '推荐',
    tagBg: 'rgba(167,139,250,0.15)',
    tagColor: '#a78bfa',
    highlight: true
  },
  {
    name: 'Token 估算器',
    icon: '🔢',
    path: '/toolbox/token-estimator',
    description: '输入文本，实时显示 token 数量 + 换算成各主流模型的调用成本',
    tags: ['Token 计数', '成本估算', '实时计算'],
    tag: '实用',
    tagBg: 'rgba(52,211,153,0.15)',
    tagColor: '#34d399',
    highlight: false
  },
  {
    name: 'Prompt 膨胀计算器',
    icon: '📏',
    path: '/toolbox/prompt-bloat',
    description: '对比"朴素 prompt" vs "优化 prompt" 的 token 消耗差异，看你能省多少钱',
    tags: ['Prompt 优化', '成本对比', '精简技巧'],
    tag: null,
    tagBg: '',
    tagColor: '',
    highlight: false
  },
  {
    name: '需求→范式推荐器',
    icon: '🎯',
    path: '/toolbox/paradigm-picker',
    description: '回答 5 个问题，推荐最适合你的 AI 编程范式——Code Completion / Vibe / Spec / Agentic',
    tags: ['决策树', '范式匹配', '个性化推荐'],
    tag: null,
    tagBg: '',
    tagColor: '',
    highlight: false
  }
]

useHead({
  title: 'AI 编程工具箱 - 交互式小工具 | 上下文可视化 / Token 估算 / Prompt 优化',
  meta: [
    { name: 'description', content: 'AI 编程工具箱：上下文丢失可视化、Token 估算器、Prompt 膨胀计算器、范式推荐器。纯前端交互，即开即用。' }
  ]
})
</script>
