<template>
  <div class="space-y-8">
    <!-- 页面头部 -->
    <div
      class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 border p-8" style="border: 1px solid var(--color-border)">
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50">
      </div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-4xl">🧠</span>
          <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">概念入门</span>
        </div>
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          AI编程概念入门
        </h1>
        <p class="text-xl text-gray-400 max-w-3xl">
          从发展历程到核心概念，全面了解AI编程的演进和关键原理
        </p>
        <div class="mt-6 p-4 rounded-xl" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <p class="italic">
            <span class="text-blue-400 font-semibold">学习路径：</span>
            先了解发展历程，再掌握核心概念，最后应用到实际开发中
          </p>
        </div>
      </div>
    </div>

    <!-- 主要内容卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink to="/concepts/history"
        class="group relative overflow-hidden card hover:border-blue-500 transition-all duration-300">
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
        <div class="relative">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl">🚀</span>
            <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">三次跃迁</span>
          </div>
          <h2 class="text-xl font-semibold mb-3">发展历程</h2>
          <p class="text-sm mb-4">
            了解AI编程从诞生到智能化时代的发展脉络，见证从辅助到自主的三次能力跃迁
          </p>
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <span class="text-blue-400">⌨️</span>
              <span style="color: var(--color-text-secondary)">辅助时代（2018-2023）</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-purple-400">💬</span>
              <span style="color: var(--color-text-secondary)">对话时代（2024-2025）</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-cyan-400">🤖</span>
              <span style="color: var(--color-text-secondary)">智能体时代（2026-至今）</span>
            </div>
          </div>
          <div class="text-blue-400 text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>探索完整历程</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/concepts/core"
        class="group relative overflow-hidden card hover:border-purple-500 transition-all duration-300">
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
        <div class="relative">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl">📚</span>
            <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">核心原理</span>
          </div>
          <h2 class="text-xl font-semibold mb-3">核心概念</h2>
          <p class="text-sm mb-4">
            掌握AI编程的关键术语和核心原理，理解AI的能力边界和最佳协作模式
          </p>
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <span class="text-purple-400">🎯</span>
              <span style="color: var(--color-text-secondary)">AI角色：从Copilot到顶级执行者</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-cyan-400">⚙️</span>
              <span style="color: var(--color-text-secondary)">能力边界：根据需求颗粒度选择策略</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-green-400">📝</span>
              <span style="color: var(--color-text-secondary)">角色重构：从写代码到写规范</span>
            </div>
          </div>
          <div class="text-purple-400 text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>学习核心概念</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- 关键亮点 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 rounded-xl" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
        <div class="text-2xl mb-3">💡</div>
        <h3 class="text-lg font-semibold mb-2">AI的角色转变</h3>
        <p class="text-sm">从简单的代码补全到智能体协作，AI正在重新定义编程方式</p>
      </div>
      <div class="p-4 rounded-xl" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
        <div class="text-2xl mb-3">🎯</div>
        <h3 class="text-lg font-semibold mb-2">能力边界框架</h3>
        <p class="text-sm">根据需求颗粒度选择最佳协作模式，提高开发效率</p>
      </div>
      <div class="p-4 rounded-xl" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
        <div class="text-2xl mb-3">🚀</div>
        <h3 class="text-lg font-semibold mb-2">开发者角色重构</h3>
        <p class="text-sm">从编写代码到设计规范，开发者工作向上迁移</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'AI编程概念入门 - 发展历程、核心原理与能力边界',
  meta: [
    { name: 'description', content: '从辅助补全到智能体自治，全面了解AI编程的三次能力跃迁。掌握AI的角色转变、能力边界框架，以及开发者在AI时代的重新定义。' }
  ]
})
</script>