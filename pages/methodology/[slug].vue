<template>
  <div class="space-y-8">
    <!-- 面包屑导航 -->
    <Breadcrumb :items="breadcrumbItems" />

    <ContentDoc :path="`/methodology/${slug}`" v-slot="{ doc }">
      <div v-if="doc" class="space-y-12">
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

const nextItemsMap: Record<string, any[]> = {
  'chat-mode': [
    { title: 'Plan 模式', path: '/methodology/plan-mode', icon: '📝', description: '让 AI 先输出计划再执行，减少返工' },
    { title: '个人规则', path: '/methodology/personal-rules', icon: '👤', description: '配置你的编码偏好' }
  ],
  'plan-mode': [
    { title: 'Spec 驱动开发', path: '/methodology/spec-driven', icon: '📋', description: '用结构化文档约束 AI 生成边界' },
    { title: '项目规则', path: '/methodology/project-rules', icon: '📁', description: '为项目设置统一规范' }
  ],
  'spec-driven': [
    { title: 'Trae 工具实战', path: '/tools/trae', icon: '🔥', description: '在 Trae 中体验最强的 Spec 模式实现' },
    { title: '编程范式', path: '/paradigms', icon: '🧩', description: '学习如何针对不同场景选择编程方式' }
  ]
}

const nextItems = computed(() => {
  if (nextItemsMap[slug]) return nextItemsMap[slug]
  return [
    { title: '方法论概览', path: '/methodology', icon: '📖', description: '回到导航页，查看更多工作流' },
    { title: 'Spec 驱动开发', path: '/methodology/spec-driven', icon: '📋', description: '深度解析 Spec 驱动开发的完整流程' }
  ]
})
</script>
