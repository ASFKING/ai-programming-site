<template>
  <div class="space-y-8">
    <ContentDoc :path="`/concepts/${slug}`" v-slot="{ doc }">
      <div v-if="doc" class="space-y-12">
        <LastUpdated :date="doc.lastUpdated" />
        <div class="flex gap-8">
          <article :class="[proseClass, 'max-w-none flex-1 min-w-0']">
            <ContentRenderer :value="doc" />
          </article>
          <aside class="hidden xl:block w-56 shrink-0">
            <PageToc :toc="doc.body?.toc?.links || []" />
          </aside>
        </div>
        <ReadNext :items="nextItems" />
      </div>
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">📚</div>
        <h2 class="text-2xl font-bold text-gray-300 mb-2">内容不存在</h2>
        <p class="text-gray-500">抱歉，指定的概念文档暂未找到。</p>
        <NuxtLink to="/concepts" class="inline-block mt-6 text-blue-400 hover:text-blue-300">
          ← 返回概念列表
        </NuxtLink>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { proseClass } = useTheme()

const nextItemsMap: Record<string, any[]> = {
  'history': [
    { title: '核心概念', path: '/concepts/core', icon: '💡', description: '掌握 AI 编程的关键术语和核心原理' },
    { title: '工具对比', path: '/tools', icon: '🛠️', description: '看看哪些工具能实现当前的 AI 能力' }
  ],
  'core': [
    { title: '编程范式', path: '/paradigms', icon: '🧩', description: '学习如何针对不同场景选择编程方式' },
    { title: '方法论概览', path: '/methodology', icon: '📖', description: '从对话到工程化的完整工作流' }
  ]
}

const nextItems = computed(() => nextItemsMap[slug] || [])
</script>
