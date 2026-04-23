<template>
  <div class="space-y-8">
    <div class="flex items-center gap-4">
      <NuxtLink to="/methodology" class="text-gray-400 hover:text-white">
        ← 返回方法论
      </NuxtLink>
    </div>

    <ContentDoc :path="`/methodology/${slug}`" v-slot="{ doc }">
      <article v-if="doc" class="prose prose-invert max-w-none">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
      </article>
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">📋</div>
        <h2 class="text-2xl font-bold text-gray-300 mb-2">内容不存在</h2>
        <p class="text-gray-500">抱歉，指定的方法论文档暂未找到。</p>
        <NuxtLink to="/methodology" class="inline-block mt-6 text-blue-400 hover:text-blue-300">
          ← 返回方法论列表
        </NuxtLink>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
</script>
