<template>
  <nav v-if="items.length > 1" class="flex items-center gap-2 text-sm mb-6" aria-label="面包屑导航">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink
        v-if="item.path && index < items.length - 1"
        :to="item.path"
        class="text-gray-500 hover:text-blue-400 transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else-if="index === items.length - 1" class="text-gray-300 font-medium">
        {{ item.label }}
      </span>
      <span v-if="index < items.length - 1" class="text-gray-600">/</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
