<template>
  <div class="mt-12 border-t border-white/[0.08] pt-8">
    <!-- 评分区 -->
    <div class="text-center mb-6">
      <p class="text-gray-400 mb-3">这篇文章对你有帮助吗？</p>
      <div class="flex justify-center gap-3">
        <button
          v-for="option in feedbackOptions"
          :key="option.value"
          @click="submitFeedback(option.value)"
          class="px-5 py-2.5 rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
          :class="selected === option.value
            ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
            : 'border-white/[0.08] bg-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'"
        >
          <span class="text-lg mr-1">{{ option.emoji }}</span>
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- 感谢信息 -->
    <transition name="fade">
      <div v-if="submitted" class="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
        <p class="text-green-400 text-sm">🙏 感谢你的反馈！这会帮助我们改进内容质量。</p>
      </div>
    </transition>

    <!-- GitHub 反馈链接 -->
    <div class="mt-6 text-center">
      <a
        :href="githubIssueUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 transition-colors"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        在 GitHub 上提交建议或报告问题
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pagePath: string
}>()

const selected = ref<string | null>(null)
const submitted = ref(false)

const feedbackOptions = [
  { emoji: '🤩', label: '非常有帮助', value: 'very_helpful' },
  { emoji: '🙂', label: '有帮助', value: 'helpful' },
  { emoji: '😐', label: '一般', value: 'neutral' },
  { emoji: '😕', label: '需要改进', value: 'needs_work' }
]

const githubIssueUrl = computed(() => {
  const title = encodeURIComponent(`内容反馈: ${props.pagePath}`)
  const body = encodeURIComponent(`页面路径: ${props.pagePath}\n\n反馈内容:\n`)
  return `https://github.com/ASFKING/ai-programming-site/issues/new?title=${title}&body=${body}`
})

function submitFeedback(value: string) {
  selected.value = value
  submitted.value = true
  // 5秒后隐藏感谢信息
  setTimeout(() => { submitted.value = false }, 5000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
