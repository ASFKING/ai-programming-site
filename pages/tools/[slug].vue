<template>
  <div class="space-y-8">
    <!-- 面包屑导航 -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- 统一页眉（始终显示） -->
    <div class="flex items-center gap-4 mb-8">
      <span class="text-5xl shrink-0">{{ currentTool?.icon }}</span>
      <div>
        <h1 class="text-3xl font-bold" style="color: var(--color-text-primary)">{{ currentTool?.name }}</h1>
        <div class="flex items-center gap-3 mt-1 text-sm">
          <span style="color: var(--color-text-muted)">{{ currentTool?.vendor }}</span>
          <span class="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs">{{ currentTool?.pricing }}</span>
        </div>
      </div>
    </div>

    <!-- 详细内容：优先使用 Markdown -->
    <ContentDoc :path="`/tools/${slug}`">
      <template v-slot="{ doc }">
        <div class="flex gap-8">
          <article :class="[proseClass, 'max-w-none flex-1 min-w-0']">
            <ContentRenderer :value="doc" />
          </article>
          <aside class="hidden xl:block w-56 shrink-0">
            <PageToc :toc="doc.body?.toc?.links || []" />
          </aside>
        </div>
      </template>

      <!-- 如果没有详细 Markdown，显示结构化的卡片布局 -->
      <template #not-found>
        <div class="grid md:grid-cols-2 gap-6">
          <!-- 左侧：核心功能 -->
          <section class="card">
            <h2 class="text-xl font-semibold mb-4">核心功能</h2>
            <ul class="space-y-2">
              <li v-for="feature in currentTool?.features" :key="feature" class="flex items-center gap-2">
                <span class="text-blue-400">✓</span>
                {{ feature }}
              </li>
            </ul>
          </section>

          <!-- 右侧：网络要求 + 适用场景 -->
          <div class="space-y-6">
            <section class="card">
              <h2 class="text-xl font-semibold mb-4">网络要求</h2>
              <p style="color: var(--color-text-secondary)">{{ currentTool?.network }}</p>
            </section>

            <section class="card">
              <h2 class="text-xl font-semibold mb-4">适用场景</h2>
              <p style="color: var(--color-text-secondary)">{{ currentTool?.useCases }}</p>
            </section>
          </div>
        </div>
      </template>
    </ContentDoc>

    <!-- 推荐阅读 -->
    <ReadNext :items="nextItems" />
    <CommunityLinks class="mt-8" />
    <FeedbackWidget :page-path="`/tools/${slug}`" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { proseClass } = useTheme()

const toolsData: Record<string, any> = {
  trae: {
    icon: '🔥',
    name: 'Trae',
    vendor: '字节跳动',
    features: ['SOLO智能体模式', 'Builder模式', '中文深度适配', '上下文记忆', '自动重构', '错误修复'],
    pricing: '基础功能免费，高级功能需登录解锁',
    network: '无需科学上网，国内网络直连',
    useCases: '全流程AI开发，国内项目首选'
  },
  cursor: {
    icon: '💻',
    name: 'Cursor',
    vendor: 'Anysphere',
    features: ['8个智能体并行', 'Composer多文件协同', '自定义模型端点', '前端友好'],
    pricing: '基础版免费（每月2000次），Pro版20美元/月',
    network: '需要科学上网',
    useCases: '前端开发，快速原型构建'
  },
  'claude-code': {
    icon: '🤖',
    name: 'Claude Code',
    vendor: 'Anthropic',
    features: ['200K tokens上下文', '多智能体并行', '深度推理', '终端原生'],
    pricing: 'API按量付费，新用户有免费额度',
    network: '需要科学上网或合规中转',
    useCases: '大型代码库理解，复杂任务处理'
  },
  'github-copilot': {
    icon: '🐙',
    name: 'GitHub Copilot',
    vendor: 'GitHub + OpenAI',
    features: ['实时代码补全', 'IntelliSense增强', '单元测试生成', '跨文件上下文感知'],
    pricing: '个人版10美元/月，企业版19美元/人/月',
    network: '需要科学上网',
    useCases: '日常编码辅助，主流IDE集成'
  },
  codex: {
    icon: '⚡',
    name: 'Codex',
    vendor: 'OpenAI',
    features: ['端到端代码生成', '自主执行', '复杂任务分解', 'GPT-5系列模型'],
    pricing: 'API按量付费',
    network: '需要科学上网',
    useCases: '复杂编程任务，全流程执行'
  },
  antigravity: {
    icon: '🚀',
    name: 'Antigravity',
    vendor: '开源项目',
    features: ['本地模型接入', '多模型切换', '开源免费', '可自定义'],
    pricing: '开源免费',
    network: '可选本地部署，无需科学上网',
    useCases: '私有化部署，本地开发'
  },
  qoder: {
    icon: '⚡',
    name: 'Qoder',
    vendor: '字节跳动',
    features: ['快速代码补全', '轻量级', '免费使用', '国内网络直连'],
    pricing: '基础功能免费',
    network: '无需科学上网',
    useCases: '快速原型开发，个人项目'
  },
  codebuddy: {
    icon: '🦊',
    name: 'CodeBuddy',
    vendor: '腾讯云',
    features: ['腾讯云生态集成', '混元大模型', '免费使用', 'MCP协议支持'],
    pricing: '个人版免费',
    network: '无需科学上网',
    useCases: '腾讯云生态项目，全栈开发'
  }
}

const currentTool = computed(() => toolsData[slug])

const breadcrumbItems = computed(() => {
  const name = currentTool.value?.name || slug
  return [
    { label: '首页', path: '/' },
    { label: 'AI工具', path: '/tools' },
    { label: name }
  ]
})

const nextItemsMap: Record<string, any[]> = {
  'trae': [
    { title: 'Spec 驱动开发实战', path: '/methodology/spec-driven', icon: '📋', description: '学习如何在 Trae 中使用 Spec 模式' },
    { title: 'Cursor 工具对比', path: '/tools/cursor', icon: '💻', description: '看看 Cursor 与 Trae 的异同' }
  ],
  'cursor': [
    { title: 'Vibe Coding 范式', path: '/paradigms/vibe-coding', icon: '🎵', description: 'Cursor 是 Vibe Coding 的最佳载体' },
    { title: 'Trae 工具对比', path: '/tools/trae', icon: '🔥', description: '字节跳动出品的 AI 原生 IDE' }
  ],
  'claude-code': [
    { title: 'Agentic Coding', path: '/paradigms/agentic-coding', icon: '🧠', description: 'Claude Code 是最强的智能体编程工具' },
    { title: 'AGENTS.md 指南', path: '/methodology/agents-claude-md', icon: '📄', description: '学习如何为 Claude 设置指令文件' }
  ],
  'github-copilot': [
    { title: '代码补全范式', path: '/paradigms/code-completion', icon: '⌨️', description: '了解最基础的 AI 编程辅助方式' },
    { title: 'Cursor 分流', path: '/tools/cursor', icon: '💻', description: '体验更智能的 AI 原生开发环境' }
  ]
}

const nextItems = computed(() => {
  // 如果当前工具有特定的推荐，使用它
  if (nextItemsMap[slug]) return nextItemsMap[slug]
  // 否则默认推荐工具列表或方法论
  return [
    { title: '工具选择指南', path: '/tools', icon: '🛠️', description: '回到工具库，对比更多 AI 编程利器' },
    { title: '方法论概览', path: '/methodology', icon: '📖', description: '如何更好地使用这些工具？' }
  ]
})
</script>