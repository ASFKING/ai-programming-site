<template>
  <div class="space-y-12">
    <!-- 标题区 -->
    <div>
      <h1 class="text-3xl font-bold mb-4">方法论</h1>
      <p class="text-lg">从日常对话到工程化实践，选择适合你的 AI 编程工作方式</p>
    </div>

    <!-- 第一层：日常协作 -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="text-2xl">🚀</span>
        <div>
          <h2 class="text-xl font-bold">日常协作</h2>
          <p class="text-sm text-gray-500">打开即用 · 自然语言对话</p>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="item in tier1"
          :key="item.id"
          :to="`/methodology/${item.id}`"
          class="card group"
        >
          <div class="flex items-start justify-between mb-4">
            <span class="text-3xl">{{ item.icon }}</span>
            <span class="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
              {{ item.difficulty }}
            </span>
          </div>
          <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
            {{ item.name }}
          </h3>
          <p class="text-sm mb-4">{{ item.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ item.readTime }}</span>
            <span class="text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {{ item.cta }} →
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- 第二层：规则配置 -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="text-2xl">⚙️</span>
        <div>
          <h2 class="text-xl font-bold">规则配置</h2>
          <p class="text-sm text-gray-500">一次配置 · 跨会话生效</p>
        </div>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="item in tier2"
          :key="item.id"
          :to="`/methodology/${item.id}`"
          class="card group"
        >
          <div class="flex items-start justify-between mb-4">
            <span class="text-3xl">{{ item.icon }}</span>
            <span
              class="px-2 py-1 text-xs rounded-full"
              :class="item.difficulty === '入门' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'"
            >
              {{ item.difficulty }}
            </span>
          </div>
          <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
            {{ item.name }}
          </h3>
          <p class="text-sm mb-4">{{ item.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ item.readTime }}</span>
            <span class="text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {{ item.cta }} →
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- 第三层：工程方法论 -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="text-2xl">🏗️</span>
        <div>
          <h2 class="text-xl font-bold">工程方法论</h2>
          <p class="text-sm text-gray-500">规范驱动 · 人机协同</p>
        </div>
      </div>
      <div class="grid md:grid-cols-1 gap-6">
        <NuxtLink
          v-for="item in tier3"
          :key="item.id"
          :to="`/methodology/${item.id}`"
          class="card group"
        >
          <div class="flex items-start gap-6">
            <span class="text-5xl">{{ item.icon }}</span>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                  {{ item.name }}
                </h3>
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="item.difficulty === '进阶' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'"
                >
                  {{ item.difficulty }}
                </span>
              </div>
              <p class="text-sm mb-4">{{ item.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in item.tags" :key="tag" class="px-2 py-1 rounded text-xs" style="background: var(--color-bg-surface); color: var(--color-text-muted)">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0 self-center">
              <span class="text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {{ item.cta }} →
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- 推荐提示条 -->
    <section class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
      <p class="text-sm text-blue-300">
        💡 <strong>新手建议</strong>：Chat 模式 → 个人规则 → Spec 驱动开发
      </p>
    </section>

    <!-- Spec 流程图 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-xl font-semibold mb-6">Spec-Driven Development 流程</h2>
      <div class="space-y-4">
        <div v-for="(step, index) in specSteps" :key="index" class="flex gap-4">
          <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
            {{ index + 1 }}
          </div>
          <div>
            <h3 class="font-medium">{{ step.name }}</h3>
            <p class="text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const tier1 = [
  {
    id: 'chat-mode',
    name: 'Chat 模式',
    icon: '💬',
    difficulty: '入门',
    description: '通过对话与 AI 协作，获取代码建议、调试帮助、技术解答。零配置，打开就能用。',
    readTime: '5 分钟',
    cta: '试试 Chat'
  },
  {
    id: 'plan-mode',
    name: 'Plan 模式',
    icon: '📝',
    difficulty: '入门',
    description: '让 AI 先输出计划再执行，减少返工。适合中等复杂度的多步骤任务。',
    readTime: '5 分钟',
    cta: '了解 Plan'
  }
]

const tier2 = [
  {
    id: 'personal-rules',
    name: '个人规则',
    icon: '👤',
    difficulty: '入门',
    description: '配置你的编码偏好，让 AI 生成符合你习惯的代码。',
    readTime: '3 分钟',
    cta: '配置规则'
  },
  {
    id: 'project-rules',
    name: '项目规则',
    icon: '📁',
    difficulty: '入门',
    description: '为项目设置统一规范，团队成员共享一致的 AI 行为。',
    readTime: '5 分钟',
    cta: '了解项目规则'
  },
  {
    id: 'agents-claude-md',
    name: 'AGENTS.md',
    icon: '📄',
    difficulty: '进阶',
    description: '理解和编写 AI 编程的项目指令文件，掌握上下文注入与行为约束。',
    readTime: '8 分钟',
    cta: '深入理解'
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: '⚡',
    difficulty: '进阶',
    description: '封装可复用的 AI 工作流，将常用流程一键触发。',
    readTime: '5 分钟',
    cta: '创建 Skill'
  }
]

const tier3 = [
  {
    id: 'spec-driven',
    name: 'Spec 驱动开发',
    icon: '📋',
    difficulty: '进阶',
    description: '用结构化文档约束 AI 生成边界，解决幻觉问题。含 SpecKit 工具链详解与 Trae Spec 实战。',
    tags: ['SpecKit', 'Trae Spec', '人工评审', '测试策略'],
    readTime: '15 分钟',
    cta: '查看 Spec'
  }
]

const specSteps = [
  { name: '需求拆解', description: '与 AI 协作，明确需求边界、验收标准和技术栈' },
  { name: 'Spec 编写', description: '编写结构化的 spec 文档，包含功能描述、数据模型、接口定义等' },
  { name: 'AI 生成', description: '将 spec 文档输入 AI 工具，生成代码、测试用例、文档等' },
  { name: '人工评审', description: '评审 AI 生成的代码，检查逻辑正确性、安全漏洞、性能瓶颈' },
  { name: '测试调试', description: '运行测试用例，定位并修复问题' },
  { name: '迭代优化', description: '根据测试结果或业务需求，迭代 spec 文档与代码' }
]
</script>
