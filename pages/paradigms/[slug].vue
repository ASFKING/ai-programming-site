<template>
  <div class="space-y-8">
    <div class="flex items-center gap-4">
      <NuxtLink to="/paradigms" class="text-gray-400 hover:text-white">
        ← 返回编程范式
      </NuxtLink>
    </div>

    <ContentDoc :path="`/paradigms/${slug}`" v-slot="{ doc }">
      <article class="prose prose-invert max-w-none">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <div v-if="!hasContent" class="space-y-8">
      <div class="flex items-center gap-4">
        <span class="text-5xl">{{ currentParadigm?.icon }}</span>
        <div>
          <h1 class="text-3xl font-bold">{{ currentParadigm?.name }}</h1>
          <p class="text-gray-400">{{ currentParadigm?.enName }}</p>
        </div>
      </div>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">定义</h2>
        <p class="text-gray-300">{{ currentParadigm?.definition }}</p>
      </section>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">核心理念</h2>
        <ul class="space-y-3">
          <li v-for="(item, index) in currentParadigm?.concepts" :key="index" class="flex items-start gap-3">
            <span class="text-blue-400 mt-1">•</span>
            <span class="text-gray-300">{{ item }}</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">适用场景</h2>
        <ul class="space-y-2">
          <li v-for="(scene, index) in currentParadigm?.scenes" :key="index" class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            <span class="text-gray-300">{{ scene }}</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h2 class="text-xl font-semibold mb-4">代表工具</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="tool in currentParadigm?.tools" :key="tool" class="px-3 py-1 bg-white/5 rounded-lg text-sm">
            {{ tool }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const hasContent = ref(false)

const paradigmsData: Record<string, any> = {
  'code-completion': {
    icon: '⌨️',
    name: 'Code Completion',
    enName: '代码补全',
    definition: 'AI编程最基础的形态——AI根据光标周围的上下文，预测你下一步要写的代码，开发者按Tab接受。如果说传统IDE的自动补全是"查字典"，那AI代码补全就是"读心术"——它不只补全一个方法名，而是能补全整个函数体。',
    concepts: [
      '被动响应：AI不会主动介入，只在开发者输入时触发',
      '局部感知：通常只看当前文件/函数，不理解项目全貌',
      '逐块建议：从一行到一个函数，现代AI补全能生成完整函数实现'
    ],
    scenes: ['日常编码效率提升', '重复性代码', '学习新语言/API', '编写常见算法'],
    tools: ['GitHub Copilot', 'Tabnine', 'Codeium', 'JetBrains AI Assistant']
  },
  'vibe-coding': {
    icon: '🎵',
    name: 'Vibe Coding',
    enName: '氛围编程',
    definition: '由前OpenAI联合创始人Andrej Karpathy于2025年2月提出，核心是"意图驱动的沉浸式编程"——开发者无需关注"如何实现"的技术细节，只需通过自然语言精准描述需求的"氛围"，AI即可生成可运行的完整代码。',
    concepts: [
      '反细节导向：开发者无需编写循环、定义变量等底层代码，只需明确"做什么"',
      '沉浸式协作：AI实时响应自然语言指令，形成"描述→生成→反馈→迭代"的即时循环',
      '创意优先：核心目标是快速验证创意，而非追求代码的极致优化'
    ],
    scenes: ['个人项目', '原型验证', '前端UI实验', '快速概念验证'],
    tools: ['Cursor(基础模式)', 'Trae Builder', 'Bolt.new', 'v0.dev']
  },
  'spec-coding': {
    icon: '📋',
    name: 'Spec Coding',
    enName: '规格编程',
    definition: '规格先行的契约式开发——先用结构化文档定义"做什么"和"验收标准"，再让AI严格按照规格生成实现。规格是不可篡改的合同，代码必须服从规格。SpecKit（GitHub官方）是当前最成熟的工具链，支持30+ AI编程代理。',
    concepts: [
      'Spec as Source of Truth：规格文档取代代码成为首要产物',
      '可执行规格：规格不只描述需求，还能直接驱动AI生成实现',
      '结构化流程：Constitution → Specify → Plan → Tasks → Implement'
    ],
    scenes: ['团队协作项目', '企业级开发', '复杂业务逻辑', '遗留系统改造', '合规场景'],
    tools: ['SpecKit（GitHub官方）', 'OpenSpec']
  },
  'agentic-coding': {
    icon: '🧠',
    name: 'Agentic Coding',
    enName: '智能体编程',
    definition: 'AI编程的高阶范式，核心是将AI从"被动响应的助手"升级为"主动执行的智能体"。AI能自主理解需求、拆解任务、调用工具、执行代码，并根据环境反馈完成闭环迭代。配合Harness工程控制（指令系统、验证门禁、状态追踪），实现AI-Native的开发流程。',
    concepts: [
      '自主决策：AI不仅能生成代码，还能像人类工程师一样思考和规划',
      '全流程执行：从需求分析到代码生成、测试、部署的完整流程',
      '工程化能力：AGENTS.md指令系统、Hooks验证门禁、人类审查点'
    ],
    scenes: ['企业级项目', '团队开发', '复杂系统重构', '全项目交付'],
    tools: ['Claude Code', 'Cursor Composer', 'Trae SOLO', 'Codex CLI']
  }
}

const currentParadigm = computed(() => paradigmsData[slug])
</script>