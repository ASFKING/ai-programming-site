<template>
  <div class="space-y-8">
    <!-- 面包屑导航 -->
    <Breadcrumb :items="breadcrumbItems" />

    <ContentDoc :path="`/methodology/${slug}`" v-slot="{ doc }">
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
        <div class="text-6xl mb-4">📋</div>
        <h2 class="text-2xl font-bold text-gray-300 mb-2">内容不存在</h2>
        <p class="text-gray-500">抱歉，指定的方法论文档暂未找到。</p>
        <NuxtLink to="/methodology" class="inline-block mt-6 text-blue-400 hover:text-blue-300">
          ← 返回方法论列表
        </NuxtLink>
      </div>

      <!-- Prompt 工坊（仅 Spec 驱动开发页面显示） -->
      <div v-if="slug === 'spec-driven'" class="mt-12">
        <InteractivePromptTool />
      </div>

      <!-- 社区入口 -->
      <div class="mt-8">
        <CommunityLinks />
      </div>

      <!-- 反馈组件 -->
      <FeedbackWidget :page-path="`/methodology/${slug}`" />
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { proseClass } = useTheme()

const nameMap: Record<string, string> = {
  'chat-mode': 'Chat 模式',
  'plan-mode': 'Plan 模式',
  'personal-rules': '个人规则',
  'project-rules': '项目规则',
  'agents-claude-md': 'AGENTS.md',
  'skills': 'Skills',
  'spec-driven': 'Spec 驱动开发'
}

const breadcrumbItems = computed(() => [
  { label: '首页', path: '/' },
  { label: '方法论', path: '/methodology' },
  { label: nameMap[slug] || slug }
])
</script>
