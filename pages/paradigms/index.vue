<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">编程范式</h1>
      <p class="text-gray-400">了解AI编程的两种核心范式：Vibe Coding 与 Agentic Coding</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="paradigm in paradigms"
        :key="paradigm.id"
        :to="`/paradigms/${paradigm.id}`"
        class="card group"
      >
        <div class="text-4xl mb-4">{{ paradigm.icon }}</div>
        <h2 class="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {{ paradigm.name }}
        </h2>
        <p class="text-gray-400 text-sm mb-4">{{ paradigm.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in paradigm.tags" :key="tag" class="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
            {{ tag }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- 范式对比 -->
    <section class="mt-12 p-6 rounded-xl bg-[#12121a] border border-[#27272a]">
      <h2 class="text-xl font-semibold mb-6">范式对比</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-[#27272a]">
              <th class="text-left py-3 px-4 text-gray-400 font-medium">维度</th>
              <th class="text-left py-3 px-4 text-blue-400 font-medium">Vibe Coding</th>
              <th class="text-left py-3 px-4 text-purple-400 font-medium">Agentic Coding</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-[#27272a]/50">
              <td class="py-3 px-4 text-gray-400">人类角色</td>
              <td class="py-3 px-4">乘客/提示者</td>
              <td class="py-3 px-4">指挥官/监督者</td>
            </tr>
            <tr class="border-b border-[#27272a]/50">
              <td class="py-3 px-4 text-gray-400">AI角色</td>
              <td class="py-3 px-4">代码生成器</td>
              <td class="py-3 px-4">自主执行智能体</td>
            </tr>
            <tr class="border-b border-[#27272a]/50">
              <td class="py-3 px-4 text-gray-400">核心优势</td>
              <td class="py-3 px-4">快速、灵活、低门槛</td>
              <td class="py-3 px-4">规范、可靠、可扩展</td>
            </tr>
            <tr class="border-b border-[#27272a]/50">
              <td class="py-3 px-4 text-gray-400">适用场景</td>
              <td class="py-3 px-4">个人项目、原型验证</td>
              <td class="py-3 px-4">企业级项目、团队开发</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const paradigms = [
  {
    id: 'vibe-coding',
    name: 'Vibe Coding',
    icon: '🎵',
    description: '氛围编程 - 意图驱动的沉浸式编程，开发者只需描述"做什么"，AI负责"怎么做"',
    tags: ['快速验证', '创意优先', '反细节导向']
  },
  {
    id: 'agentic-coding',
    name: 'Agentic Coding',
    icon: '🧠',
    description: '智能体编程 - AI自主理解需求、拆解任务、执行代码并完成闭环迭代',
    tags: ['工程化', '自主决策', '端到端']
  }
]
</script>