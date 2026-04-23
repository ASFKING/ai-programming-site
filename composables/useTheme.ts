export const useTheme = () => {
  const isDark = ref(true)

  const proseClass = computed(() => isDark.value ? 'prose prose-invert' : 'prose')

  const updateTheme = () => {
    if (typeof document !== 'undefined') {
      isDark.value = !document.documentElement.classList.contains('light')
    }
  }

  onMounted(() => {
    updateTheme()
    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    onUnmounted(() => observer.disconnect())
  })

  return { isDark, proseClass }
}
