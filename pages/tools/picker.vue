<template>
  <div class="space-y-8">
    <!-- 面包屑 -->
    <Breadcrumb :items="[
      { label: '首页', path: '/' },
      { label: 'AI工具', path: '/tools' },
      { label: '工具选型器' }
    ]" />

    <!-- Hero -->
    <div class="text-center py-8">
      <div class="text-5xl mb-4">🧭</div>
      <h1 class="text-3xl font-bold mb-3" style="color: var(--color-text-primary)">AI 编程工具选型器</h1>
      <p class="text-lg" style="color: var(--color-text-muted)">3 步找到最适合你的 AI 编程工具</p>
    </div>

    <!-- 进度条 -->
    <div class="flex items-center justify-center gap-2 mb-8">
      <div v-for="i in 3" :key="i" class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
          :class="step >= i
            ? 'bg-blue-500 text-white'
            : 'bg-gray-700 text-gray-400'"
        >
          {{ i }}
        </div>
        <div v-if="i < 3" class="w-16 h-0.5" :class="step > i ? 'bg-blue-500' : 'bg-gray-700'"></div>
      </div>
    </div>

    <!-- Step 1: 角色 -->
    <section v-if="step === 1" class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold mb-6 text-center" style="color: var(--color-text-primary)">你是谁？</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="role in roles"
          :key="role.key"
          @click="selectedRole = role.key; step = 2"
          class="p-6 rounded-xl border text-center transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          :class="selectedRole === role.key
            ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/20'
            : 'border-white/10 bg-white/5 hover:border-white/20'"
        >
          <div class="text-4xl mb-3">{{ role.icon }}</div>
          <div class="font-semibold" style="color: var(--color-text-primary)">{{ role.label }}</div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">{{ role.desc }}</div>
        </button>
      </div>
    </section>

    <!-- Step 2: 目标 -->
    <section v-if="step === 2" class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold mb-6 text-center" style="color: var(--color-text-primary)">你想做什么？</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="goal in goals"
          :key="goal.key"
          @click="selectedGoal = goal.key; step = 3"
          class="p-6 rounded-xl border text-center transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          :class="selectedGoal === goal.key
            ? 'border-purple-500 bg-purple-500/10 shadow-purple-500/20'
            : 'border-white/10 bg-white/5 hover:border-white/20'"
        >
          <div class="text-3xl mb-3">{{ goal.icon }}</div>
          <div class="font-semibold" style="color: var(--color-text-primary)">{{ goal.label }}</div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">{{ goal.desc }}</div>
        </button>
      </div>
      <div class="text-center mt-4">
        <button @click="step = 1" class="text-sm text-blue-400 hover:text-blue-300">← 返回上一步</button>
      </div>
    </section>

    <!-- Step 3: 网络环境 -->
    <section v-if="step === 3" class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold mb-6 text-center" style="color: var(--color-text-primary)">你的网络环境？</h2>
      <div class="grid grid-cols-3 gap-4">
        <button
          v-for="net in networks"
          :key="net.key"
          @click="selectedNetwork = net.key; step = 4"
          class="p-6 rounded-xl border text-center transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          :class="selectedNetwork === net.key
            ? 'border-green-500 bg-green-500/10 shadow-green-500/20'
            : 'border-white/10 bg-white/5 hover:border-white/20'"
        >
          <div class="text-3xl mb-3">{{ net.icon }}</div>
          <div class="font-semibold" style="color: var(--color-text-primary)">{{ net.label }}</div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">{{ net.desc }}</div>
        </button>
      </div>
      <div class="text-center mt-4">
        <button @click="step = 2" class="text-sm text-blue-400 hover:text-blue-300">← 返回上一步</button>
      </div>
    </section>

    <!-- 结果页 -->
    <section v-if="step === 4" class="max-w-3xl mx-auto">
      <!-- 推荐结果 -->
      <div class="p-6 rounded-xl glass mb-6" style="border: 1px solid var(--color-border)">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">🎯</span>
          <h2 class="text-xl font-semibold" style="color: var(--color-text-primary)">推荐方案</h2>
        </div>

        <!-- 推荐理由 -->
        <div class="p-4 rounded-lg mb-6" style="background: rgba(96, 165, 250, 0.08); border: 1px solid rgba(96, 165, 250, 0.2)">
          <p class="text-sm" style="color: var(--color-text-secondary)">
            <strong class="text-blue-400">💡 推荐理由：</strong>
            {{ result.reason }}
          </p>
        </div>

        <!-- 主力工具 -->
        <h3 class="text-sm font-semibold mb-3" style="color: var(--color-text-muted)">🏆 主力工具</h3>
        <div class="space-y-3 mb-6">
          <NuxtLink
            v-for="toolId in result.primary"
            :key="toolId"
            :to="`/tools/${toolId}`"
            class="flex items-center gap-4 p-4 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style="border-color: rgba(96, 165, 250, 0.3); background: rgba(96, 165, 250, 0.05)"
          >
            <span class="text-3xl">{{ getTool(toolId)?.icon }}</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold" style="color: var(--color-text-primary)">{{ getTool(toolId)?.name }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full" :class="getTool(toolId)?.region === '国内' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'">
                  {{ getTool(toolId)?.region }}
                </span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                  {{ getTool(toolId)?.capability.label }}
                </span>
              </div>
              <p class="text-sm mt-1" style="color: var(--color-text-muted)">{{ getTool(toolId)?.description }}</p>
              <div class="flex items-center gap-4 mt-2 text-xs" style="color: var(--color-text-muted)">
                <span>{{ getTool(toolId)?.form }}</span>
                <span>{{ getTool(toolId)?.pricing.free ? '免费' : getTool(toolId)?.pricing.paid }}</span>
                <span>{{ getTool(toolId)?.platform }}</span>
              </div>
            </div>
            <span class="text-blue-400 text-sm shrink-0">查看详情 →</span>
          </NuxtLink>
        </div>

        <!-- 备选工具 -->
        <div v-if="result.alternative.length > 0">
          <h3 class="text-sm font-semibold mb-3" style="color: var(--color-text-muted)">🔄 备选方案</h3>
          <div class="space-y-2">
            <NuxtLink
              v-for="toolId in result.alternative"
              :key="toolId"
              :to="`/tools/${toolId}`"
              class="flex items-center gap-3 p-3 rounded-lg border transition-all hover:bg-white/5"
              style="border-color: var(--color-border); background: var(--color-bg-surface)"
            >
              <span class="text-xl">{{ getTool(toolId)?.icon }}</span>
              <div class="flex-1 min-w-0">
                <span class="font-medium text-sm" style="color: var(--color-text-primary)">{{ getTool(toolId)?.name }}</span>
                <span class="text-xs ml-2" style="color: var(--color-text-muted)">{{ getTool(toolId)?.description }}</span>
              </div>
              <span class="text-xs" style="color: var(--color-text-muted)">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 能力光谱定位 -->
      <div class="p-6 rounded-xl glass mb-6" style="border: 1px solid var(--color-border)">
        <h3 class="text-sm font-semibold mb-4" style="color: var(--color-text-primary)">📊 推荐工具在能力光谱上的位置</h3>
        <CapabilitySpectrum :highlight-ids="result.primary" />
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row justify-center gap-3">
        <button @click="resetPicker" class="px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
          🔄 重新选择
        </button>
        <NuxtLink to="/tools/compare" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all text-center hover:-translate-y-0.5">
          📊 查看详细对比
        </NuxtLink>
        <NuxtLink to="/tools" class="px-6 py-3 rounded-xl font-semibold transition-all text-center hover:-translate-y-0.5" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
          🛠️ 浏览全部工具
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getPickerResult, getToolById } from '~/composables/useToolsData'
import type { Tool } from '~/composables/useToolsData'

const step = ref(1)
const selectedRole = ref('')
const selectedGoal = ref('')
const selectedNetwork = ref('')

const roles = [
  { key: 'beginner', icon: '🐣', label: '编程新手', desc: '刚接触编程' },
  { key: 'developer', icon: '🧑‍💻', label: '有经验开发者', desc: '1年以上经验' },
  { key: 'lead', icon: '🏗️', label: '团队负责人', desc: '管理团队' },
  { key: 'enterprise', icon: '🏢', label: '企业开发者', desc: '企业级需求' }
]

const goals = [
  { key: 'project', icon: '🚀', label: '写项目', desc: '从零构建或维护项目' },
  { key: 'efficiency', icon: '⚡', label: '提高效率', desc: '加速日常开发' },
  { key: 'automation', icon: '🤖', label: '自动化开发', desc: '让 AI 自主完成任务' },
  { key: 'learning', icon: '📚', label: '学习 AI 编程', desc: '了解和掌握 AI 编程' }
]

const networks = [
  { key: 'domestic', icon: '🇨🇳', label: '国内直连', desc: '无法科学上网' },
  { key: 'overseas', icon: '🌍', label: '海外网络', desc: '可以科学上网' },
  { key: 'both', icon: '🌐', label: '都可以', desc: '不限网络环境' }
]

const result = computed(() => {
  return getPickerResult(
    selectedRole.value,
    selectedGoal.value as any,
    selectedNetwork.value as any
  )
})

function getTool(id: string): Tool | undefined {
  return getToolById(id)
}

function resetPicker() {
  step.value = 1
  selectedRole.value = ''
  selectedGoal.value = ''
  selectedNetwork.value = ''
}

// SEO
useHead({
  title: 'AI 编程工具选型器 - 3 步找到最适合你的工具',
  meta: [
    { name: 'description', content: '根据你的角色、目标和网络环境，智能推荐最适合的 AI 编程工具。支持 Cursor、Trae、Claude Code、Copilot 等 10+ 主流工具。' }
  ]
})
</script>
