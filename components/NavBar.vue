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
        class="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        :class="isActive(item.path)
          ? 'text-blue-400'
          : 'hover:bg-black/5'"
        :style="isActive(item.path) ? '' : { color: 'var(--color-text-muted)' }"
      >
        {{ item.name }}
        <!-- Active 下划线指示器 -->
        <span
          v-if="isActive(item.path)"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-blue-400 rounded-full"
        ></span>
      </NuxtLink>
      <ThemeToggle />
    </div>

    <!-- 移动端菜单按钮 -->
    <div class="flex items-center gap-2 md:hidden">
      <ThemeToggle />
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="p-2 rounded-lg hover:bg-black/5"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--color-text-secondary)">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <div
      v-if="mobileMenuOpen"
      class="absolute top-16 left-0 right-0 p-4 md:hidden"
      style="border-bottom: 1px solid var(--color-border); background: var(--color-bg-nav); backdrop-filter: blur(12px)"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        @click="mobileMenuOpen = false"
        class="block px-4 py-3 rounded-lg text-sm font-medium border-l-2 transition-all"
        :class="isActive(item.path)
          ? 'bg-blue-500/10 text-blue-400 border-blue-400'
          : 'border-transparent'"
        :style="isActive(item.path) ? '' : { color: 'var(--color-text-muted)' }"
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
  { name: '关于', path: '/about' }
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
