<template>
  <div class="min-h-screen" style="color: var(--color-text-primary)">
    <!-- 顶部导航 -->
    <header class="fixed top-0 left-0 right-0 z-50" style="border-bottom: 1px solid var(--color-border); background: var(--color-bg-nav); backdrop-filter: blur(12px)">
      <NavBar />
    </header>

    <!-- 主内容区 -->
    <div class="flex pt-16 min-h-screen">
      <!-- 侧边导航 - 桌面端 -->
      <aside v-if="showSidebar" class="hidden lg:block fixed left-0 top-16 bottom-0 w-64 overflow-y-auto" style="border-right: 1px solid var(--color-border); background: var(--color-bg-nav); backdrop-filter: blur(12px)">
        <SideNav />
      </aside>

      <!-- 内容区域 -->
      <main :class="['flex-1 p-4 md:p-8', showSidebar ? 'lg:ml-64' : '']">
        <div :class="hasToc ? 'max-w-6xl mx-auto' : 'max-w-4xl mx-auto'">
          <slot />
        </div>
      </main>
    </div>

    <!-- 回到顶部 -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const showSidebar = computed(() => {
  return route.path.startsWith('/concepts') ||
    route.path.startsWith('/tools') ||
    route.path.startsWith('/paradigms') ||
    route.path.startsWith('/methodology')
})

const hasToc = computed(() => {
  return route.path.startsWith('/paradigms/') ||
    route.path.startsWith('/methodology/') ||
    route.path.startsWith('/concepts/') ||
    route.path.startsWith('/tools/')
})
</script>
