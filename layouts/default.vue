<template>
  <div class="min-h-screen text-gray-100">
    <!-- 顶部导航 - 毛玻璃效果 -->
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#111827]/80 backdrop-blur-xl">
      <NavBar />
    </header>

    <!-- 主内容区 -->
    <div class="flex pt-16 min-h-screen">
      <!-- 侧边导航 - 桌面端 -->
      <aside v-if="showSidebar" class="hidden lg:block fixed left-0 top-16 bottom-0 w-64 border-r border-white/[0.08] bg-[#111827]/60 backdrop-blur-xl overflow-y-auto">
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
