<template>
  <div class="code-compare">
    <div class="code-compare-bad">
      <div class="code-compare-label">{{ badLabel || '❌ 不推荐' }}</div>
      <pre class="p-4 bg-[#1a1a2e] text-sm overflow-x-auto"><code :class="langClass">{{ badCode }}</code></pre>
    </div>
    <div class="code-compare-good">
      <div class="code-compare-label">{{ goodLabel || '✅ 推荐' }}</div>
      <pre class="p-4 bg-[#1a1a2e] text-sm overflow-x-auto"><code :class="langClass">{{ goodCode }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  badCode: string
  goodCode: string
  badLabel?: string
  goodLabel?: string
  lang?: string
}>()

const langClass = computed(() => {
  return props.lang ? `language-${props.lang}` : ''
})
</script>
