<template>
  <div v-if="date" class="last-updated">
    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>数据更新于 <time :datetime="date">{{ formattedDate }}</time></span>
    <span v-if="isStale" class="stale-badge" title="此内容超过 30 天未更新，请注意时效性">
      ⚠️ 可能过时
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  date?: string
}>()

const formattedDate = computed(() => {
  if (!props.date) return ''
  const d = new Date(props.date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const isStale = computed(() => {
  if (!props.date) return false
  const d = new Date(props.date)
  const now = new Date()
  const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays > 30
})
</script>

<style scoped>
.last-updated {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}

.last-updated time {
  font-variant-numeric: tabular-nums;
}

.stale-badge {
  margin-left: 0.25rem;
  padding: 0.125rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-warning);
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 9999px;
}
</style>
