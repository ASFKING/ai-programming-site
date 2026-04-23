<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">AI编程工具</h1>
      <p style="color: var(--color-text-muted)">了解国内外主流AI编程工具的特性和适用场景</p>
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
        <p class="text-sm mb-4">{{ tool.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="feature in tool.features.slice(0, 3)" :key="feature" class="px-2 py-1 rounded text-xs" style="background: var(--color-bg-surface); color: var(--color-text-muted)">
            {{ feature }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- 工具对比矩阵 -->
    <section class="mt-8 p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-xl font-semibold mb-6">工具对比矩阵</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b" style="border-color: var(--color-border)">
              <th class="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap">工具</th>
              <th class="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap">开发商</th>
              <th class="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap">定价</th>
              <th class="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap">平台</th>
              <th class="text-center py-3 px-3 text-gray-400 font-medium whitespace-nowrap">代码补全</th>
              <th class="text-center py-3 px-3 text-gray-400 font-medium whitespace-nowrap">多文件编辑</th>
              <th class="text-center py-3 px-3 text-gray-400 font-medium whitespace-nowrap">智能体</th>
              <th class="text-center py-3 px-3 text-gray-400 font-medium whitespace-nowrap">中文支持</th>
              <th class="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap">适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tool in comparisonData" :key="tool.id" class="border-b border-white/[0.04] hover:bg-black/5 transition-colors">
              <td class="py-3 px-3">
                <NuxtLink :to="`/tools/${tool.id}`" class="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <span>{{ tool.icon }}</span>
                  <span class="font-medium">{{ tool.name }}</span>
                </NuxtLink>
              </td>
              <td class="py-3 px-3 text-gray-400">{{ tool.vendor }}</td>
              <td class="py-3 px-3 text-gray-400">{{ tool.pricing }}</td>
              <td class="py-3 px-3 text-gray-400">{{ tool.platform }}</td>
              <td class="py-3 px-3 text-center">{{ tool.completion }}</td>
              <td class="py-3 px-3 text-center">{{ tool.multiFile }}</td>
              <td class="py-3 px-3 text-center">{{ tool.agent }}</td>
              <td class="py-3 px-3 text-center">{{ tool.chinese }}</td>
              <td class="py-3 px-3 text-xs">{{ tool.bestFor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs mt-4">⭐ 评级为编辑评估，非严格 benchmark。数据基于各工具官方文档和公开信息，如有偏差欢迎反馈。定价和功能可能已更新，请以官网为准。</p>
    </section>

    <!-- 如何选择 -->
    <section class="mt-8 p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-xl font-semibold mb-4">如何选择合适的工具？</h2>
      <p class="text-sm mb-6">根据你的实际需求做决策，而非按身份标签选择</p>

      <!-- 决策维度 -->
      <div class="space-y-4 mb-8">
        <div class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <h3 class="font-medium mb-2 text-blue-400">💰 预算有限？</h3>
          <p class="text-sm">优先考虑免费工具：Trae、CodeBuddy、Qoder 均提供免费版本。Cursor 和 Copilot 有免费额度但功能受限。</p>
        </div>
        <div class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <h3 class="font-medium mb-2 text-green-400">🌐 网络环境受限？</h3>
          <p class="text-sm">国内直连：Trae、CodeBuddy、Qoder 无需科学上网。Cursor、Copilot、Claude Code 需要稳定的国际网络。</p>
        </div>
        <div class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <h3 class="font-medium mb-2 text-purple-400">🎯 需要深度推理？</h3>
          <p class="text-sm">处理复杂架构、大型代码库理解：Claude Code 的 200K 上下文和深度推理能力是当前最强。Cursor 的多 Agent 并行也适合复杂项目。</p>
        </div>
        <div class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <h3 class="font-medium mb-2 text-amber-400">👥 团队协作？</h3>
          <p class="text-sm">需要统一配置和管理：GitHub Copilot Business 和 Cursor Business 提供团队管理功能。也可通过项目规则文件（.cursorrules / CLAUDE.md）统一 AI 行为。</p>
        </div>
      </div>

      <!-- 建议 -->
      <div class="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
        <p class="text-sm text-gray-300">
          <strong class="text-blue-400">💡 实际建议：</strong>
          没有"最好的工具"，只有"最适合你的工具"。建议先用免费版本体验 2-3 款，再根据实际感受选择付费版本。AI 编程工具迭代很快，定期重新评估是有必要的。
        </p>
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

const comparisonData = [
  {
    id: 'trae',
    name: 'Trae',
    icon: '🔥',
    vendor: '字节跳动',
    pricing: '免费',
    platform: 'Mac / Win',
    completion: '⭐⭐⭐⭐',
    multiFile: '⭐⭐⭐⭐',
    agent: '⭐⭐⭐⭐⭐',
    chinese: '⭐⭐⭐⭐⭐',
    bestFor: '国内开发者首选，全流程AI开发'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '💻',
    vendor: 'Anysphere',
    pricing: '$20/月起',
    platform: 'Mac / Win / Linux',
    completion: '⭐⭐⭐⭐⭐',
    multiFile: '⭐⭐⭐⭐⭐',
    agent: '⭐⭐⭐⭐',
    chinese: '⭐⭐⭐',
    bestFor: '前端/全栈，多Agent并行'
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: '🤖',
    vendor: 'Anthropic',
    pricing: '按token计费',
    platform: '终端',
    completion: '⭐⭐⭐',
    multiFile: '⭐⭐⭐⭐',
    agent: '⭐⭐⭐⭐⭐',
    chinese: '⭐⭐⭐',
    bestFor: '复杂推理，大型代码库'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: '🐙',
    vendor: 'GitHub',
    pricing: '$10/月起',
    platform: '全平台IDE',
    completion: '⭐⭐⭐⭐⭐',
    multiFile: '⭐⭐⭐',
    agent: '⭐⭐⭐',
    chinese: '⭐⭐⭐',
    bestFor: '日常编码，企业团队'
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: '⚡',
    vendor: 'OpenAI',
    pricing: '按token计费',
    platform: 'Web / 终端',
    completion: '⭐⭐⭐⭐',
    multiFile: '⭐⭐⭐⭐',
    agent: '⭐⭐⭐⭐⭐',
    chinese: '⭐⭐⭐',
    bestFor: '端到端任务，复杂项目'
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '🚀',
    vendor: '开源社区',
    pricing: '免费',
    platform: 'Mac / Win / Linux',
    completion: '⭐⭐⭐',
    multiFile: '⭐⭐⭐',
    agent: '⭐⭐⭐',
    chinese: '⭐⭐',
    bestFor: '本地部署，隐私优先'
  },
  {
    id: 'qoder',
    name: 'Qoder',
    icon: '⚡',
    vendor: '字节跳动',
    pricing: '免费',
    platform: 'Mac / Win',
    completion: '⭐⭐⭐⭐',
    multiFile: '⭐⭐⭐',
    agent: '⭐⭐',
    chinese: '⭐⭐⭐⭐⭐',
    bestFor: '轻量快速，国内直连'
  },
  {
    id: 'codebuddy',
    name: 'CodeBuddy',
    icon: '🦊',
    vendor: '腾讯云',
    pricing: '免费',
    platform: 'Mac / Win',
    completion: '⭐⭐⭐⭐',
    multiFile: '⭐⭐⭐',
    agent: '⭐⭐⭐',
    chinese: '⭐⭐⭐⭐⭐',
    bestFor: '腾讯云生态项目'
  }
]

// SEO
useHead({
  title: 'AI编程工具对比 - Trae / Cursor / Claude Code / Copilot 等主流工具评测',
  meta: [
    { name: 'description', content: '全面对比国内外8款主流AI编程工具，包含功能、定价、平台、适用场景的详细对比矩阵，帮你选择最适合的AI编程工具。' }
  ]
})
</script>