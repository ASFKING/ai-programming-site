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
    tools: ['Cursor(基础模式)', 'GitHub Copilot', 'Trae(Builder模式)']
  },
  'agentic-coding': {
    icon: '🧠',
    name: 'Agentic Coding',
    enName: '智能体编程',
    definition: 'AI编程的高阶范式，核心是将AI从"被动响应的助手"升级为"主动执行的智能体"。AI能自主理解需求、拆解任务、调用工具、执行代码，并根据环境反馈完成闭环迭代。',
    concepts: [
      '自主决策：AI不仅能生成代码，还能像人类工程师一样思考和规划',
      '全流程执行：从需求分析到代码生成、测试、部署的完整流程',
      '工程化能力：结构化审查、多层级验证，错误修复成功率达85%以上'
    ],
    scenes: ['企业级项目', '团队开发', '复杂系统重构', '全项目交付'],
    tools: ['Trae SOLO', 'Claude Code', 'Cursor Composer']
  }
}

const currentParadigm = computed(() => paradigmsData[slug])
</script>