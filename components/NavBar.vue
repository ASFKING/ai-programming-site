<template>
  <nav class="flex items-center justify-between px-6 h-16">
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-3 text-xl font-bold">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <span class="text-white text-sm font-bold">AI</span>
      </div>
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        AI编程
      </span>
    </NuxtLink>

    <!-- 主导航链接 -->
    <div class="hidden md:flex items-center gap-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        :class="isActive(item.path)
          ? 'bg-blue-500/20 text-blue-400'
          : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'"
      >
        {{ item.name }}
      </NuxtLink>
    </div>

    <!-- 移动端菜单按钮 -->
    <button
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="md:hidden p-2 rounded-lg hover:bg-white/5"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- 移动端菜单 -->
    <div
      v-if="mobileMenuOpen"
      class="absolute top-16 left-0 right-0 border-b border-white/[0.08] bg-[#111827]/95 backdrop-blur-xl p-4 md:hidden"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        @click="mobileMenuOpen = false"
        class="block px-4 py-3 rounded-lg text-sm font-medium"
        :class="isActive(item.path)
          ? 'bg-blue-500/20 text-blue-400'
          : 'text-gray-400 hover:text-gray-100'"
      >
        {{ item.name }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '概念', path: '/concepts' },
  { name: '工具', path: '/tools' },
  { name: '范式', path: '/paradigms' },
  { name: '方法论', path: '/methodology' },
  { name: '案例', path: '/about' }
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>