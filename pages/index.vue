<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-16">
      <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
        AI编程：智能开发的未来
      </h1>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
        从代码补全到智能体编程，AI正在重塑软件开发的方式。
        本网站帮助你全面了解AI编程技术、工具和方法论。
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/concepts" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
          了解AI编程
        </NuxtLink>
        <NuxtLink to="/tools" class="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-colors">
          浏览工具
        </NuxtLink>
      </div>
    </section>

    <!-- 核心概念卡片 -->
    <section>
      <h2 class="text-2xl font-bold mb-6">核心内容</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="card in cards"
          :key="card.path"
          :to="card.path"
          class="card group"
        >
          <div class="text-4xl mb-4">{{ card.icon }}</div>
          <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
            {{ card.title }}
          </h3>
          <p class="text-gray-400 text-sm">{{ card.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- AI编程发展时间线 -->
    <section>
      <h2 class="text-2xl font-bold mb-6">发展历程</h2>
      <div class="space-y-4">
        <div v-for="(era, index) in eras" :key="index" class="flex gap-4">
          <div class="flex flex-col items-center">
            <div class="w-4 h-4 rounded-full bg-blue-500"></div>
            <div v-if="index < eras.length - 1" class="w-0.5 h-16 bg-gray-800"></div>
          </div>
          <div class="flex-1 pb-8">
            <span class="text-sm text-blue-400 font-medium">{{ era.period }}</span>
            <h3 class="text-lg font-semibold mt-1">{{ era.title }}</h3>
            <p class="text-gray-400 text-sm mt-1">{{ era.description }}</p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <NuxtLink to="/concepts/history" class="text-blue-400 hover:text-blue-300 text-sm">
          查看完整发展历程 →
        </NuxtLink>
      </div>
    </section>

    <!-- 编程范式对比 -->
    <section>
      <h2 class="text-2xl font-bold mb-6">两大编程范式</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="paradigm in paradigms"
          :key="paradigm.path"
          :to="paradigm.path"
          class="p-6 rounded-xl border border-[#27272a] hover:border-blue-500/50 transition-colors"
        >
          <h3 class="text-xl font-semibold mb-2">{{ paradigm.name }}</h3>
          <p class="text-gray-400 text-sm mb-4">{{ paradigm.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in paradigm.tags" :key="tag" class="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center py-12">
      <h2 class="text-2xl font-bold mb-4">开始学习AI编程</h2>
      <p class="text-gray-400 mb-6">掌握AI编程工具，提升开发效率</p>
      <NuxtLink to="/methodology" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all">
        查看方法论
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    icon: '📚',
    title: '概念入门',
    description: '了解AI编程的发展历程、核心概念和技术演进',
    path: '/concepts'
  },
  {
    icon: '🛠️',
    title: 'AI工具',
    description: '全面了解国内外主流AI编程工具的特性和适用场景',
    path: '/tools'
  },
  {
    icon: '📋',
    title: '方法论',
    description: '学习Spec驱动开发等规范的AI编程方法',
    path: '/methodology'
  }
]

const eras = [
  {
    period: '2021-2022',
    title: '代码补全时代',
    description: 'GitHub Copilot引领，AI辅助代码补全'
  },
  {
    period: '2023-2024',
    title: '生成式助手时代',
    description: '多轮对话调试，跨文件依赖识别'
  },
  {
    period: '2025-至今',
    title: '智能体自治时代',
    description: '全流程自主规划，端到端项目交付'
  }
]

const paradigms = [
  {
    name: 'Vibe Coding',
    description: '氛围编程 - 意图驱动，AI生成代码，人只需描述"做什么"',
    tags: ['快速验证', '创意优先', '适合原型'],
    path: '/paradigms/vibe-coding'
  },
  {
    name: 'Agentic Coding',
    description: '智能体编程 - AI自主规划、执行、迭代，人作为"监督者"',
    tags: ['工程化', '可靠可扩展', '适合生产'],
    path: '/paradigms/agentic-coding'
  }
]
</script>