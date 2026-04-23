<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">关于本站</h1>
      <p class="text-gray-400">了解本站的构建方法和背后的故事</p>
    </div>

    <!-- 构建方式卡片 -->
    <section class="p-6 rounded-xl glass border border-white/[0.08]">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">🦞</span>
        <div>
          <h2 class="text-xl font-semibold">构建方式</h2>
          <p class="text-gray-400 text-sm">Claude Code + Spec 驱动开发</p>
        </div>
      </div>
      <div class="grid md:grid-cols-4 gap-4 mt-6">
        <div class="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
          <div class="text-2xl mb-2">🛠️</div>
          <div class="text-sm font-medium">技术栈</div>
          <div class="text-xs text-gray-400 mt-1">Nuxt 3 + Tailwind</div>
        </div>
        <div class="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
          <div class="text-2xl mb-2">🤖</div>
          <div class="text-sm font-medium">AI 工具</div>
          <div class="text-xs text-gray-400 mt-1">Claude Code</div>
        </div>
        <div class="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
          <div class="text-2xl mb-2">📋</div>
          <div class="text-sm font-medium">开发方法</div>
          <div class="text-xs text-gray-400 mt-1">Spec 驱动开发</div>
        </div>
        <div class="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
          <div class="text-2xl mb-2">🚀</div>
          <div class="text-sm font-medium">部署</div>
          <div class="text-xs text-gray-400 mt-1">GitHub Pages</div>
        </div>
      </div>
    </section>

    <!-- 本站诞生记 -->
    <ContentDoc path="/about/build-story" v-slot="{ doc }">
      <article class="prose prose-invert max-w-none">
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <!-- 底部标注 -->
    <div class="text-center text-gray-500 text-sm py-8 border-t border-white/[0.08]">
      <p>📅 最后更新：2026-04-23</p>
      <p class="mt-1">🛠️ 构建方式：Claude Code + Spec 驱动开发</p>
    </div>
  </div>
</template>
