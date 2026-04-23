<template>
  <div class="space-y-12">
    <!-- 锚点导航 -->
    <nav class="sticky top-16 z-40 -mx-4 md:-mx-8 px-4 md:px-8 py-3 backdrop-blur-xl" style="border-bottom: 1px solid var(--color-border); background: var(--color-bg-nav)">
      <div class="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        <a
          v-for="anchor in anchors"
          :key="anchor.id"
          :href="`#${anchor.id}`"
          @click.prevent="scrollToSection(anchor.id)"
          class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
          :class="activeAnchor === anchor.id
            ? 'bg-blue-500/20 text-blue-400'
            : 'hover:bg-black/5'"
          :style="activeAnchor === anchor.id ? '' : { color: 'var(--color-text-muted)' }"
        >
          {{ anchor.icon }} {{ anchor.label }}
        </a>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="text-center py-16">
      <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
        AI编程：智能开发的未来
      </h1>
      <p class="text-xl max-w-2xl mx-auto mb-8" style="color: var(--color-text-muted)">
        从代码补全到智能体编程，AI正在重塑软件开发的方式。
        本网站帮助你全面了解AI编程技术、工具和方法论。
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/concepts" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          了解AI编程
        </NuxtLink>
        <NuxtLink to="/tools" class="px-6 py-3 rounded-lg font-medium transition-colors" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
          浏览工具
        </NuxtLink>
      </div>
    </section>

    <!-- 用户分流 -->
    <section id="audience" class="p-6 rounded-xl glass">
      <h2 class="text-xl font-semibold mb-6 text-center" style="color: var(--color-text-primary)">你是哪种开发者？</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <NuxtLink
          to="/concepts"
          class="p-5 rounded-xl border border-green-500/20 bg-green-500/5 hover:border-green-400/50 hover:bg-green-500/10 transition-all group text-center"
        >
          <div class="text-3xl mb-3">🐣</div>
          <h3 class="font-semibold text-green-500 mb-2">编程新手</h3>
          <p class="text-sm" style="color: var(--color-text-muted)">从概念入门，了解 AI 编程的全貌</p>
        </NuxtLink>
        <NuxtLink
          to="/tools"
          class="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all group text-center"
        >
          <div class="text-3xl mb-3">🧑‍💻</div>
          <h3 class="font-semibold text-blue-500 mb-2">有经验开发者</h3>
          <p class="text-sm" style="color: var(--color-text-muted)">直接看工具对比，选择适合你的工具</p>
        </NuxtLink>
        <NuxtLink
          to="/methodology"
          class="p-5 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all group text-center"
        >
          <div class="text-3xl mb-3">🏗️</div>
          <h3 class="font-semibold text-purple-500 mb-2">团队负责人</h3>
          <p class="text-sm" style="color: var(--color-text-muted)">学习方法论 + Spec 驱动开发</p>
        </NuxtLink>
      </div>
    </section>

    <!-- 核心概念卡片 -->
    <section id="content">
      <h2 class="text-2xl font-bold mb-6" style="color: var(--color-text-primary)">核心内容</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="card in cards"
          :key="card.path"
          :to="card.path"
          class="card group"
        >
          <div class="text-4xl mb-4">{{ card.icon }}</div>
          <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors" style="color: var(--color-text-primary)">
            {{ card.title }}
          </h3>
          <p class="text-sm" style="color: var(--color-text-muted)">{{ card.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- AI编程发展时间线 -->
    <section id="timeline">
      <h2 class="text-2xl font-bold mb-6" style="color: var(--color-text-primary)">发展历程</h2>
      <div class="space-y-4">
        <div v-for="(era, index) in eras" :key="index" class="flex gap-4">
          <div class="flex flex-col items-center">
            <div class="w-4 h-4 rounded-full bg-blue-500"></div>
            <div v-if="index < eras.length - 1" class="w-0.5 h-16" style="background: var(--color-border)"></div>
          </div>
          <div class="flex-1 pb-8">
            <span class="text-sm text-blue-400 font-medium">{{ era.period }}</span>
            <h3 class="text-lg font-semibold mt-1" style="color: var(--color-text-primary)">{{ era.title }}</h3>
            <p class="text-sm mt-1" style="color: var(--color-text-muted)">{{ era.description }}</p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <NuxtLink to="/concepts/history" class="text-blue-400 hover:text-blue-300 text-sm">
          查看完整发展历程 →
        </NuxtLink>
      </div>
    </section>

    <!-- 编程范式 -->
    <section id="paradigms">
      <h2 class="text-2xl font-bold mb-6" style="color: var(--color-text-primary)">四大编程范式</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="paradigm in paradigms"
          :key="paradigm.path"
          :to="paradigm.path"
          class="p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1"
          :class="paradigm.cardClass"
        >
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">{{ paradigm.icon }}</span>
            <h3 class="text-xl font-semibold" :class="paradigm.titleClass">{{ paradigm.name }}</h3>
          </div>
          <p class="text-sm mb-4" style="color: var(--color-text-muted)">{{ paradigm.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in paradigm.tags" :key="tag" class="px-2 py-1 rounded text-xs" :class="paradigm.tagClass">
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </div>
      <div class="mt-4">
        <NuxtLink to="/paradigms" class="text-blue-400 hover:text-blue-300 text-sm">
          查看范式对比 →
        </NuxtLink>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center py-12">
      <h2 class="text-2xl font-bold mb-4" style="color: var(--color-text-primary)">开始学习AI编程</h2>
      <p class="mb-6" style="color: var(--color-text-muted)">掌握AI编程工具，提升开发效率</p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/methodology" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all">
          查看方法论
        </NuxtLink>
        <NuxtLink to="/about" class="px-6 py-3 rounded-lg font-medium transition-colors" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
          本站诞生记
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const activeAnchor = ref('hero')
const anchors = [
  { id: 'hero', label: '首页', icon: '🏠' },
  { id: 'audience', label: '选择路径', icon: '🎯' },
  { id: 'content', label: '核心内容', icon: '📚' },
  { id: 'timeline', label: '发展历程', icon: '📅' },
  { id: 'paradigms', label: '编程范式', icon: '🧩' }
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeAnchor.value = id
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeAnchor.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
  )
  anchors.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
  onUnmounted(() => observer.disconnect())
})

const cards = [
  { icon: '📚', title: '概念入门', description: '了解AI编程的发展历程、核心概念和技术演进', path: '/concepts' },
  { icon: '🛠️', title: 'AI工具', description: '全面了解国内外主流AI编程工具的特性和适用场景', path: '/tools' },
  { icon: '📋', title: '方法论', description: '学习Spec驱动开发等规范的AI编程方法', path: '/methodology' }
]

const eras = [
  { period: '2021-2022', title: '代码补全时代', description: 'GitHub Copilot引领，AI辅助代码补全' },
  { period: '2023-2024', title: '生成式助手时代', description: '多轮对话调试，跨文件依赖识别' },
  { period: '2025-至今', title: '智能体自治时代', description: '全流程自主规划，端到端项目交付' }
]

const paradigms = [
  {
    name: 'Code Completion', icon: '⌨️',
    description: '代码补全 - AI预测下一步代码，按Tab接受，最基础的AI编程形态',
    tags: ['被动响应', '低门槛', '日常编码'], path: '/paradigms/code-completion',
    cardClass: 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-400/50',
    titleClass: 'text-cyan-500', tagClass: 'bg-cyan-500/10 text-cyan-500'
  },
  {
    name: 'Vibe Coding', icon: '🎵',
    description: '氛围编程 - 意图驱动，AI生成代码，人只需描述"做什么"',
    tags: ['快速验证', '创意优先', '适合原型'], path: '/paradigms/vibe-coding',
    cardClass: 'bg-purple-500/5 border-purple-500/20 hover:border-purple-400/50',
    titleClass: 'text-purple-500', tagClass: 'bg-purple-500/10 text-purple-500'
  },
  {
    name: 'Spec Coding', icon: '📋',
    description: '规格编程 - 先写规格再实现，契约驱动的工程化开发',
    tags: ['规格先行', '可追溯', '团队协作'], path: '/paradigms/spec-coding',
    cardClass: 'bg-amber-500/5 border-amber-500/20 hover:border-amber-400/50',
    titleClass: 'text-amber-500', tagClass: 'bg-amber-500/10 text-amber-500'
  },
  {
    name: 'Agentic Coding', icon: '🧠',
    description: '智能体编程 - AI自主规划、执行、迭代，端到端交付',
    tags: ['工程化', '可靠可扩展', '适合生产'], path: '/paradigms/agentic-coding',
    cardClass: 'bg-red-500/5 border-red-500/20 hover:border-red-400/50',
    titleClass: 'text-red-500', tagClass: 'bg-red-500/10 text-red-500'
  }
]
</script>
