<template>
  <div class="space-y-8">
    <div class="flex items-center gap-4">
      <NuxtLink to="/tools" class="text-gray-400 hover:text-white">
        ← 返回工具列表
      </NuxtLink>
    </div>

    <ContentDoc :path="`/tools/${slug}`" v-slot="{ doc }">
      <article class="prose prose-invert max-w-none">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <!-- 如果没有内容，显示静态内容 -->
    <div v-if="!hasContent" class="space-y-8">
      <div class="flex items-center gap-4">
        <span class="text-5xl">{{ currentTool?.icon }}</span>
        <div>
          <h1 class="text-3xl font-bold">{{ currentTool?.name }}</h1>
          <p class="text-gray-400">{{ currentTool?.vendor }}</p>
        </div>
      </div>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">核心功能</h2>
        <ul class="space-y-2">
          <li v-for="feature in currentTool?.features" :key="feature" class="flex items-center gap-2">
            <span class="text-blue-400">✓</span>
            {{ feature }}
          </li>
        </ul>
      </section>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">定价</h2>
        <p class="text-gray-300">{{ currentTool?.pricing }}</p>
      </section>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">网络要求</h2>
        <p class="text-gray-300">{{ currentTool?.network }}</p>
      </section>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">适用场景</h2>
        <p class="text-gray-300">{{ currentTool?.useCases }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const hasContent = ref(false)

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
</script>