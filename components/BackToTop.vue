<template>
  <button
    class="back-to-top"
    :class="{ visible: isVisible }"
    @click="scrollToTop"
    aria-label="回到顶部"
  >
    ↑
  </button>
</template>

<script setup lang="ts">
const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const onScroll = () => {
    isVisible.value = window.scrollY > 300
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>
