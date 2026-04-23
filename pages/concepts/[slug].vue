<template>
  <div class="space-y-8">
    <ContentDoc :path="`/concepts/${slug}`" v-slot="{ doc }">
      <div v-if="doc" class="flex gap-8">
        <article :class="[proseClass, 'max-w-none flex-1 min-w-0']">
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </article>
        <aside class="hidden xl:block w-56 shrink-0">
          <PageToc :toc="doc.body?.toc?.links || []" />
        </aside>
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
</script>
