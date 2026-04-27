<template>
  <div class="min-h-screen" style="color: var(--color-text-primary)">
    <!-- 顶部导航 -->
    <header class="fixed top-0 left-0 right-0 z-50" style="border-bottom: 1px solid var(--color-border); background: var(--color-bg-nav); backdrop-filter: blur(12px)">
      <NavBar />
    </header>

    <!-- 主内容区 -->
    <div class="flex pt-16 min-h-screen">
      <!-- 侧边导航 - 桌面端 -->
      <aside v-if="showSidebar" class="hidden lg:block fixed left-0 top-16 bottom-0 w-60 overflow-y-auto" style="border-right: 1px solid var(--color-border); background: var(--color-bg-nav); backdrop-filter: blur(12px)">
        <SideNav />
      </aside>

      <!-- 移动端侧边栏切换按钮 -->
      <button
        v-if="showSidebar"
        @click="mobileSidebarOpen = !mobileSidebarOpen"
        class="lg:hidden fixed bottom-6 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
        style="background: var(--color-accent-primary); color: white;"
      >
        <svg v-if="!mobileSidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- 移动端侧边栏遮罩 -->
      <div
        v-if="showSidebar && mobileSidebarOpen"
        class="lg:hidden fixed inset-0 z-40 bg-black/50"
        @click="mobileSidebarOpen = false"
      ></div>

      <!-- 移动端侧边栏 -->
      <aside
        v-if="showSidebar"
        class="lg:hidden fixed left-0 top-16 bottom-0 w-64 z-40 overflow-y-auto transition-transform duration-300"
        :class="mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        style="border-right: 1px solid var(--color-border); background: var(--color-bg-nav); backdrop-filter: blur(12px)"
        @click="mobileSidebarOpen = false"
      >
        <SideNav />
      </aside>

      <!-- 内容区域 -->
      <main :class="['flex-1 p-4 md:p-8', showSidebar ? 'lg:ml-60' : '']">
        <div :class="hasToc ? 'max-w-6xl mx-auto' : 'max-w-4xl mx-auto'">
          <slot />
        </div>
      </main>
    </div>

    <!-- 回到顶部 -->
    <BackToTop />

    <!-- 全站数据时效声明 -->
    <div class="text-center py-4 text-xs" style="color: var(--color-text-muted); border-top: 1px solid var(--color-border-subtle);">
      🦞 本站内容基于 2026 年 4 月数据 · AI 工具迭代迅速，信息仅供参考，请以官方最新发布为准
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileSidebarOpen = ref(false)

const showSidebar = computed(() => {
  return route.path.startsWith('/concepts') ||
    route.path.startsWith('/tools') ||
    route.path.startsWith('/paradigms') ||
    route.path.startsWith('/methodology') ||
    route.path.startsWith('/toolbox')
})

const hasToc = computed(() => {
  return route.path.startsWith('/paradigms/') ||
    route.path.startsWith('/methodology/') ||
    route.path.startsWith('/concepts/') ||
    route.path.startsWith('/tools/')
})

// 路由切换时关闭移动端侧边栏
watch(() => route.path, () => {
  mobileSidebarOpen.value = false
})
</script>
