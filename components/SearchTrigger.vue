<template>
  <button
    @click="openSearch"
    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-black/5"
    style="color: var(--color-text-muted)"
    title="搜索 (⌘K)"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span class="hidden sm:inline text-xs">搜索</span>
    <kbd class="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded border" style="background: var(--color-bg-card); border-color: var(--color-border); color: var(--color-text-muted)">⌘K</kbd>
  </button>
</template>

<script setup lang="ts">
const openSearch = () => {
  window.dispatchEvent(new CustomEvent('open-search'))
}
</script>
