<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">未来趋势</h1>
      <p class="text-gray-400">AI编程的未来发展方向和技术趋势</p>
    </div>

    <!-- 主要趋势 -->
    <div class="space-y-6">
      <section v-for="trend in trends" :key="trend.id" class="card">
        <div class="flex items-start gap-4">
          <span class="text-4xl">{{ trend.icon }}</span>
          <div>
            <h2 class="text-xl font-semibold mb-2">{{ trend.title }}</h2>
            <p class="text-gray-400 mb-4">{{ trend.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in trend.tags" :key="tag" class="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 时间线预测 -->
    <section class="mt-12 p-6 rounded-xl glass border border-white/[0.08]">
      <h2 class="text-xl font-semibold mb-6">2026-2030 年发展趋势</h2>
      <div class="space-y-6">
        <div class="flex gap-6">
          <div class="w-24 text-blue-400 font-medium">2026年</div>
          <div class="flex-1">
            <h3 class="font-medium mb-1">全链路智能化</h3>
            <p class="text-gray-400 text-sm">AI编程从代码生成延伸至需求分析、产品设计、UI设计、测试、部署、运维等全生命周期</p>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="w-24 text-purple-400 font-medium">2027年</div>
          <div class="flex-1">
            <h3 class="font-medium mb-1">物理世界交互</h3>
            <p class="text-gray-400 text-sm">AI编程与机器人、物联网设备深度融合，实现"数字指令→物理执行"的闭环</p>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="w-24 text-cyan-400 font-medium">2028年</div>
          <div class="flex-1">
            <h3 class="font-medium mb-1">多模态输入普及</h3>
            <p class="text-gray-400 text-sm">除自然语言外，支持语音、图像、流程图等多模态输入，AI可自动生成对应代码</p>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="w-24 text-green-400 font-medium">2029-2030</div>
          <div class="flex-1">
            <h3 class="font-medium mb-1">行业大模型定制</h3>
            <p class="text-gray-400 text-sm">针对金融、医疗、电商等垂直行业出现定制化AI编程大模型</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 开发者建议 -->
    <section class="mt-12 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
      <h2 class="text-xl font-semibold mb-6">对开发者的建议</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-3xl mb-3">🧠</div>
          <h3 class="font-medium mb-2">掌握AI编程思想</h3>
          <p class="text-gray-400 text-sm">理解Vibe Coding与Agentic Coding的差异，根据场景选择合适的范式</p>
        </div>
        <div class="text-center">
          <div class="text-3xl mb-3">📋</div>
          <h3 class="font-medium mb-2">工程化思维</h3>
          <p class="text-gray-400 text-sm">提升Spec编写能力，将模糊需求转化为结构化的验收标准</p>
        </div>
        <div class="text-center">
          <div class="text-3xl mb-3">🔍</div>
          <h3 class="font-medium mb-2">批判性思维</h3>
          <p class="text-gray-400 text-sm">对AI生成的代码进行审查和测试，关注安全、性能和业务逻辑</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const trends = [
  {
    id: 1,
    icon: '🔗',
    title: '全链路智能化',
    description: 'AI编程将从"代码生成"延伸至需求分析、产品设计、UI设计、测试、部署、运维等全生命周期环节。例如AI可根据用户调研数据自动生成PRD文档，根据设计稿自动生成前端代码。',
    tags: ['端到端', '自动化', '全流程']
  },
  {
    id: 2,
    icon: '🤖',
    title: '物理世界交互',
    description: 'AI编程将与机器人、物联网设备深度融合，实现"数字指令→物理执行"的闭环。用自然语言控制机器人移动，AI可自动生成控制代码并在物理环境中执行。',
    tags: ['物联网', '机器人', '数字孪生']
  },
  {
    id: 3,
    icon: '🎨',
    title: '多模态输入',
    description: '除自然语言外，还将支持语音、图像、流程图等多模态输入。上传UI设计稿AI可自动生成HTML/CSS代码，通过语音描述需求可实时生成代码原型。',
    tags: ['语音输入', '图像识别', '流程图']
  },
  {
    id: 4,
    icon: '🏭',
    title: '行业大模型定制',
    description: '针对金融、医疗、电商等垂直行业，将出现定制化的AI编程大模型。金融大模型可自动生成符合监管要求的代码，医疗大模型可处理合规的医疗系统代码。',
    tags: ['垂直领域', '行业定制', '合规性']
  }
]
</script>