<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">AI编程工具</h1>
      <p class="text-gray-400">了解国内外主流AI编程工具的特性和适用场景</p>
    </div>

    <!-- 工具卡片网格 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.id"
        :to="`/tools/${tool.id}`"
        class="card group hover:-translate-y-1 transition-all duration-300"
        :class="tool.category === '国内' ? 'hover:border-green-400/50 hover:shadow-green-500/10' : 'hover:border-blue-400/50 hover:shadow-blue-500/10'"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="text-3xl">{{ tool.icon }}</div>
          <span
            class="px-2 py-1 text-xs rounded-full"
            :class="tool.category === '国内' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'"
          >
            {{ tool.category }}
          </span>
        </div>
        <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {{ tool.name }}
        </h3>
        <p class="text-gray-400 text-sm mb-4">{{ tool.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="feature in tool.features.slice(0, 3)" :key="feature" class="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
            {{ feature }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- 对比说明 -->
    <section class="mt-12 p-6 rounded-xl glass border border-white/[0.08]">
      <h2 class="text-xl font-semibold mb-4">如何选择合适的工具？</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium mb-2 text-blue-400">国内开发者推荐</h3>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>• Trae - 字节跳动出品，中文支持好</li>
            <li>• Qoder - 轻量级，快速上手</li>
            <li>• CodeBuddy - 腾讯生态集成</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium mb-2 text-purple-400">国外工具推荐</h3>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>• Cursor - AI原生IDE，前端友好</li>
            <li>• Claude Code - 深度推理能力强</li>
            <li>• GitHub Copilot - 市场占有率第一</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const tools = [
  {
    id: 'trae',
    name: 'Trae',
    icon: '🔥',
    category: '国内',
    description: '字节跳动出品的AI原生IDE，国内首个AI编程工具，支持SOLO全流程开发模式',
    features: ['SOLO智能体', '中文深度适配', '免费使用']
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '💻',
    category: '国外',
    description: '基于VS Code fork的AI原生IDE，支持8个智能体并行工作',
    features: ['Composer多文件', '自定义模型', '前端友好']
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: '🤖',
    category: '国外',
    description: 'Anthropic推出的终端原生智能体，200K tokens超长上下文',
    features: ['深度推理', '多智能体并行', 'SWE-bench第一']
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: '🐙',
    category: '国外',
    description: '全球市场占有率第一的代码补全助手，集成于主流IDE',
    features: ['代码补全', '单元测试生成', '企业版安全']
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: '⚡',
    category: '国外',
    description: 'OpenAI推出的AI编程智能体，端到端代码生成与自主执行',
    features: ['自主执行', '复杂任务处理', 'GPT-5系列模型']
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '🚀',
    category: '国外',
    description: '开源AI编程环境，支持本地模型接入，数据完全本地处理',
    features: ['开源免费', '本地部署', '可自定义']
  },
  {
    id: 'qoder',
    name: 'Qoder',
    icon: '⚡',
    category: '国内',
    description: '字节跳动旗下轻量级AI代码助手，与Trae互补',
    features: ['快速补全', '免费使用', '国内网络直连']
  },
  {
    id: 'codebuddy',
    name: 'CodeBuddy',
    icon: '🦊',
    category: '国内',
    description: '腾讯云AI编程助手，与腾讯云生态深度集成',
    features: ['腾讯云生态', '混元大模型', '免费使用']
  }
]
</script>