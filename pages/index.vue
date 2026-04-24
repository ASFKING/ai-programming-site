<template>
  <div>
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

    <!-- Hero Section — 视觉重心区，加大呼吸空间 -->
    <section id="hero" class="text-center pt-28 pb-32 relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 pointer-events-none opacity-30">
        <div class="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-muted)">
          <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          覆盖 8 款主流工具 · 4 种编程范式
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 leading-tight">
          AI编程：智能开发的未来
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style="color: var(--color-text-muted)">
          从代码补全到智能体编程，AI正在重塑软件开发的方式。<br class="hidden md:block">
          本网站帮助你全面了解AI编程技术、工具和方法论。
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <NuxtLink to="/concepts" class="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5">
            了解AI编程 →
          </NuxtLink>
          <NuxtLink to="/tools" class="px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
            浏览工具对比
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 用户分流 — 全宽浅色背景区，创造视觉节奏 -->
    <section id="audience" class="py-20 -mx-4 md:-mx-8 px-4 md:px-8" style="background: var(--color-bg-surface)">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold mb-8 text-center" style="color: var(--color-text-primary)">你是哪种开发者？</h2>
        <div class="grid md:grid-cols-3 gap-5">
          <NuxtLink
            to="/concepts"
            class="p-6 rounded-xl border border-green-500/20 bg-green-500/5 hover:border-green-400/50 hover:bg-green-500/10 transition-all group text-center"
          >
            <div class="text-4xl mb-4">🐣</div>
            <h3 class="font-semibold text-green-500 mb-2 text-lg">编程新手</h3>
            <p class="text-sm" style="color: var(--color-text-muted)">从概念入门，了解 AI 编程的全貌</p>
          </NuxtLink>
          <NuxtLink
            to="/tools"
            class="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all group text-center"
          >
            <div class="text-4xl mb-4">🧑‍💻</div>
            <h3 class="font-semibold text-blue-500 mb-2 text-lg">有经验开发者</h3>
            <p class="text-sm" style="color: var(--color-text-muted)">直接看工具对比，选择适合你的工具</p>
          </NuxtLink>
          <NuxtLink
            to="/methodology"
            class="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all group text-center"
          >
            <div class="text-4xl mb-4">🏗️</div>
            <h3 class="font-semibold text-purple-500 mb-2 text-lg">团队负责人</h3>
            <p class="text-sm" style="color: var(--color-text-muted)">学习方法论 + Spec 驱动开发</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 核心概念卡片 -->
    <section id="content" class="py-20">
      <h2 class="text-2xl font-bold mb-8" style="color: var(--color-text-primary)">核心内容</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="(card, index) in cards"
          :key="card.path"
          :to="card.path"
          class="card group relative overflow-hidden"
          :class="index === 0 ? 'ring-1 ring-blue-500/20' : ''"
        >
          <div v-if="index === 0" class="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-medium">
            推荐起点
          </div>
          <div class="text-3xl mb-3">{{ card.icon }}</div>
          <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors" style="color: var(--color-text-primary)">
            {{ card.title }}
          </h3>
          <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ card.description }}</p>
          <div class="mt-3 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {{ card.cta }} →
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- AI编程发展时间线 — 全宽交替背景区 -->
    <section id="timeline" class="py-20 -mx-4 md:-mx-8 px-4 md:px-8" style="background: var(--color-bg-surface)">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-8" style="color: var(--color-text-primary)">发展历程</h2>
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
      </div>
    </section>

    <!-- 编程范式 -->
    <section id="paradigms" class="py-20">
      <h2 class="text-2xl font-bold mb-3" style="color: var(--color-text-primary)">四大编程范式</h2>
      <p class="text-sm mb-8" style="color: var(--color-text-muted)">它们不是升级路径，而是不同场景下的最佳选择——像工具箱里的四把钳子，各有专长。</p>
      <div class="grid sm:grid-cols-2 gap-5">
        <NuxtLink
          v-for="paradigm in paradigms"
          :key="paradigm.path"
          :to="paradigm.path"
          class="p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 group"
          :class="paradigm.cardClass"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ paradigm.icon }}</span>
              <h3 class="text-lg font-semibold" :class="paradigm.titleClass">{{ paradigm.name }}</h3>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium" :class="paradigm.levelClass">{{ paradigm.level }}</span>
          </div>
          <p class="text-sm mb-3" style="color: var(--color-text-muted)">{{ paradigm.description }}</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-for="tag in paradigm.tags" :key="tag" class="px-2 py-0.5 rounded text-xs" :class="paradigm.tagClass">
              {{ tag }}
            </span>
          </div>
          <div class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" :class="paradigm.titleClass">
            {{ paradigm.when }} →
          </div>
        </NuxtLink>
      </div>

      <!-- 如何选择 -->
      <div class="mt-8 p-5 rounded-xl glass" style="border: 1px solid var(--color-border)">
        <h3 class="text-sm font-semibold mb-3" style="color: var(--color-text-primary)">🧭 如何选择？</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div class="flex items-start gap-2">
            <span class="text-cyan-400 font-bold mt-0.5">→</span>
            <span style="color: var(--color-text-muted)"><strong class="text-cyan-400">刚接触AI编程</strong>：从 Code Completion 开始</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-purple-400 font-bold mt-0.5">→</span>
            <span style="color: var(--color-text-muted)"><strong class="text-purple-400">快速验证想法</strong>：用 Vibe Coding 做原型</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-amber-400 font-bold mt-0.5">→</span>
            <span style="color: var(--color-text-muted)"><strong class="text-amber-400">团队协作/生产</strong>：选 Spec Coding</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-red-400 font-bold mt-0.5">→</span>
            <span style="color: var(--color-text-muted)"><strong class="text-red-400">复杂系统交付</strong>：上 Agentic Coding</span>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <NuxtLink to="/paradigms" class="text-blue-400 hover:text-blue-300 text-sm">
          查看范式详细对比 →
        </NuxtLink>
      </div>
    </section>

    <!-- CTA — 全宽渐变背景区 -->
    <section class="text-center py-20 px-6 -mx-4 md:-mx-8" style="background: linear-gradient(135deg, rgba(96,165,250,0.06), rgba(167,139,250,0.06))">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-4" style="color: var(--color-text-primary)">准备好开始了吗？</h2>
        <p class="mb-10 max-w-lg mx-auto" style="color: var(--color-text-muted)">无论你是刚接触编程还是资深工程师，都能在这里找到适合你的AI编程方式</p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <NuxtLink to="/methodology" class="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5">
            查看方法论
          </NuxtLink>
          <NuxtLink to="/about" class="px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
            本站诞生记
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'AI编程完全指南：从代码补全到智能体开发 | 工具对比 + 方法论',
  meta: [
    { name: 'description', content: '覆盖 8+ 主流 AI 编程工具对比（Trae, Cursor, Claude Code等），4 大编程范式详解（Vibe, Spec, Agentic），Spec 驱动开发方法论。2025 年最全 AI 编程学习资源。' }
  ]
})

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
  { icon: '📚', title: '概念入门', description: '了解AI编程的发展历程、核心概念和技术演进', path: '/concepts', cta: '从这里开始' },
  { icon: '🛠️', title: 'AI工具', description: '全面了解国内外主流AI编程工具的特性和适用场景', path: '/tools', cta: '查看工具对比' },
  { icon: '📋', title: '方法论', description: '学习Spec驱动开发等规范的AI编程方法', path: '/methodology', cta: '学习方法论' }
]

const eras = [
  { period: '2021-2022', title: '代码补全时代', description: 'GitHub Copilot引领，AI辅助代码补全' },
  { period: '2023-2024', title: '生成式助手时代', description: '多轮对话调试，跨文件依赖识别' },
  { period: '2025-至今', title: '智能体自治时代', description: '全流程自主规划，端到端项目交付' }
]

const paradigms = [
  {
    name: 'Code Completion', icon: '⌨️',
    description: 'AI预测下一步代码，按Tab接受。最基础的AI编程形态，零学习成本。',
    tags: ['被动响应', '低门槛', '日常编码'], path: '/paradigms/code-completion',
    level: '入门', levelClass: 'bg-cyan-500/15 text-cyan-400',
    when: '日常编码、学习新语言/框架时',
    cardClass: 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-cyan-500/5 hover:shadow-lg',
    titleClass: 'text-cyan-500', tagClass: 'bg-cyan-500/10 text-cyan-500'
  },
  {
    name: 'Vibe Coding', icon: '🎵',
    description: '意图驱动，AI生成代码，人只需描述"做什么"。快速、灵活、沉浸式。',
    tags: ['快速验证', '创意优先', '适合原型'], path: '/paradigms/vibe-coding',
    level: '进阶', levelClass: 'bg-purple-500/15 text-purple-400',
    when: '原型验证、个人项目、创意探索时',
    cardClass: 'bg-purple-500/5 border-purple-500/20 hover:border-purple-400/50 hover:shadow-purple-500/5 hover:shadow-lg',
    titleClass: 'text-purple-500', tagClass: 'bg-purple-500/10 text-purple-500'
  },
  {
    name: 'Spec Coding', icon: '📋',
    description: '先写规格再实现，契约驱动的工程化开发。规格是合同，代码是执行。',
    tags: ['规格先行', '可追溯', '团队协作'], path: '/paradigms/spec-coding',
    level: '工程化', levelClass: 'bg-amber-500/15 text-amber-400',
    when: '团队协作、生产项目、质量要求高时',
    cardClass: 'bg-amber-500/5 border-amber-500/20 hover:border-amber-400/50 hover:shadow-amber-500/5 hover:shadow-lg',
    titleClass: 'text-amber-500', tagClass: 'bg-amber-500/10 text-amber-500'
  },
  {
    name: 'Agentic Coding', icon: '🧠',
    description: 'AI自主规划、执行、迭代，端到端交付。人是指挥官，AI是执行者。',
    tags: ['工程化', '可靠可扩展', '适合生产'], path: '/paradigms/agentic-coding',
    level: '高级', levelClass: 'bg-red-500/15 text-red-400',
    when: '复杂系统、端到端交付、自动化流程时',
    cardClass: 'bg-red-500/5 border-red-500/20 hover:border-red-400/50 hover:shadow-red-500/5 hover:shadow-lg',
    titleClass: 'text-red-500', tagClass: 'bg-red-500/10 text-red-500'
  }
]
</script>
