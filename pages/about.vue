<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">关于本站</h1>
      <p style="color: var(--color-text-muted)">了解本站的构建方法和背后的故事</p>
    </div>

    <!-- 构建方式卡片 -->
    <section class="p-6 rounded-xl glass border border-white/[0.08]">
      <div class="flex items-center gap-3 mb-4">
        <div>
          <h2 class="text-xl font-semibold">构建方式</h2>
          <p class="text-sm" style="color: var(--color-text-muted)">Claude Code + Spec 驱动开发</p>
        </div>
      </div>
      <div class="grid md:grid-cols-4 gap-4 mt-6">
        <div class="p-4 rounded-lg text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl mb-2">🛠️</div>
          <div class="text-sm font-medium">技术栈</div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">Nuxt 3 + Tailwind</div>
        </div>
        <div class="p-4 rounded-lg text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl mb-2">🤖</div>
          <div class="text-sm font-medium">AI 工具</div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">Claude Code</div>
        </div>
        <div class="p-4 rounded-lg text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl mb-2">📋</div>
          <div class="text-sm font-medium">开发方法</div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">Spec 驱动开发</div>
        </div>
        <div class="p-4 rounded-lg text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl mb-2">🚀</div>
          <div class="text-sm font-medium">部署</div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">GitHub Pages</div>
        </div>
      </div>
    </section>

    <!-- 本站诞生记 -->
    <ContentDoc path="/about/build-story" v-slot="{ doc }">
      <LastUpdated :date="doc.lastUpdated" />
      <article class="prose max-w-none">
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <!-- 底部标注 -->
    <div class="text-center text-sm py-8" style="color: var(--color-text-muted); border-top: 1px solid var(--color-border)">
      <p>🛠️ 构建方式：Claude Code + Spec 驱动开发</p>
    </div>
  </div>
</template>
