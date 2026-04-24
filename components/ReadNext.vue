<template>
  <div v-if="items && items.length > 0" class="mt-16 pt-8 border-t border-white/[0.08]">
    <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
      <span class="text-blue-400">➡️</span> 下一步推荐
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NuxtLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="group p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all flex items-center gap-4"
      >
        <div class="text-2xl group-hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center rounded-lg bg-white/[0.05]">
          {{ item.icon }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium group-hover:text-blue-400 transition-colors truncate">
            {{ item.title }}
          </div>
          <div class="text-xs text-gray-500 line-clamp-1">
            {{ item.description }}
          </div>
        </div>
        <div class="text-gray-600 group-hover:text-blue-400 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ReadNextItem {
  title: string
  path: string
  icon: string
  description: string
}

defineProps<{
  items?: ReadNextItem[]
}>()
</script>
