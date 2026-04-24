<template>
  <nav v-if="items.length > 1" class="flex items-center gap-2 text-sm mb-6" aria-label="面包屑导航">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink
        v-if="item.path && index < items.length - 1"
        :to="item.path"
        class="breadcrumb-link transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else-if="index === items.length - 1" class="breadcrumb-current font-medium">
        {{ item.label }}
      </span>
      <span v-if="index < items.length - 1" class="breadcrumb-separator">/</span>
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

<style scoped>
.breadcrumb-link {
  color: var(--color-text-muted);
}
.breadcrumb-link:hover {
  color: var(--color-accent-primary);
}
.breadcrumb-current {
  color: var(--color-text-secondary);
}
.breadcrumb-separator {
  color: var(--color-text-muted);
  opacity: 0.5;
}
</style>
