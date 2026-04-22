<template>
  <div class="min-h-screen bg-[#111827] text-gray-100">
    <!-- 顶部导航 -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#1f2937]/95 backdrop-blur-sm border-b border-[#334155]">
      <NavBar />
    </header>

    <!-- 主内容区 -->
    <div class="flex pt-16 min-h-screen">
      <!-- 侧边导航 -->
      <aside v-if="showSidebar" class="fixed left-0 top-16 bottom-0 w-64 bg-[#1f2937] border-r border-[#334155] overflow-y-auto">
        <SideNav />
      </aside>

      <!-- 内容区域 -->
      <main :class="['flex-1 p-8', showSidebar ? 'ml-64' : '']">
        <div class="max-w-4xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 判断是否显示侧边栏
const showSidebar = computed(() => {
  return route.path.startsWith('/concepts') ||
    route.path.startsWith('/tools') ||
    route.path.startsWith('/paradigms') ||
    route.path.startsWith('/methodology') ||
    route.path.startsWith('/trends')
})
</script>