<template>
  <div class="space-y-8">
    <!-- 面包屑 -->
    <Breadcrumb :items="[
      { label: '首页', path: '/' },
      { label: 'AI工具', path: '/tools' },
      { label: '工具对比' }
    ]" />

    <!-- 标题 -->
    <div>
      <h1 class="text-3xl font-bold mb-2" style="color: var(--color-text-primary)">📊 工具对比</h1>
      <p style="color: var(--color-text-muted)">选择 2-3 个工具进行详细对比</p>
    </div>

    <!-- 工具选择器 -->
    <div class="flex flex-wrap gap-3">
      <button
        v-for="tool in allTools"
        :key="tool.id"
        @click="toggleTool(tool.id)"
        class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all"
        :class="selectedIds.includes(tool.id)
          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
          : 'border-white/10 bg-white/5 hover:border-white/20'"
        :style="selectedIds.includes(tool.id) ? '' : { color: 'var(--color-text-muted)' }"
      >
        <span>{{ tool.icon }}</span>
        <span>{{ tool.name }}</span>
        <span v-if="selectedIds.includes(tool.id)" class="text-xs">✓</span>
      </button>
    </div>

    <!-- 对比表 -->
    <div v-if="selectedTools.length >= 2" class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr style="border-bottom: 2px solid var(--color-border)">
            <th class="text-left py-3 px-4 font-semibold" style="color: var(--color-text-muted); min-width: 140px">维度</th>
            <th
              v-for="tool in selectedTools"
              :key="tool.id"
              class="text-center py-3 px-4 font-semibold"
              style="color: var(--color-text-primary)"
            >
              <NuxtLink :to="`/tools/${tool.id}`" class="hover:text-blue-400 transition-colors">
                {{ tool.icon }} {{ tool.name }}
              </NuxtLink>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- 基本信息 -->
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">形态</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center" style="color: var(--color-text-secondary)">
              {{ tool.form }}
            </td>
          </tr>
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">地区</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center">
              <span class="text-xs px-2 py-0.5 rounded-full" :class="tool.region === '国内' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'">
                {{ tool.region }}
              </span>
            </td>
          </tr>
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">开发商</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center" style="color: var(--color-text-secondary)">
              {{ tool.vendor }}
            </td>
          </tr>
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">平台</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center text-xs" style="color: var(--color-text-secondary)">
              {{ tool.platform }}
            </td>
          </tr>
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">网络要求</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center text-xs" style="color: var(--color-text-secondary)">
              {{ tool.network }}
            </td>
          </tr>

          <!-- 分隔行 -->
          <tr>
            <td :colspan="selectedTools.length + 1" class="py-2" style="background: var(--color-bg-surface)"></td>
          </tr>

          <!-- 能力光谱 -->
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">能力光谱</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <div class="w-24 h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.08)">
                  <div
                    class="h-full rounded-full transition-all"
                    :style="{
                      width: `${tool.capability.position}%`,
                      background: `linear-gradient(90deg, #22d3ee, ${getCapabilityColor(tool.capability.level)})`
                    }"
                  ></div>
                </div>
                <span class="text-xs font-medium" :style="{ color: getCapabilityColor(tool.capability.level) }">
                  {{ tool.capability.label }}
                </span>
              </div>
            </td>
          </tr>

          <!-- 评分维度 -->
          <tr v-for="dim in scoreDimensions" :key="dim.key" class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">
              <div>{{ dim.label }}</div>
              <div class="text-xs opacity-60">{{ dim.desc }}</div>
            </td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center">
              <div class="flex justify-center gap-0.5">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-sm"
                  :style="{ color: i <= (tool.scores as any)[dim.key] ? dim.color : 'rgba(255,255,255,0.15)' }"
                >●</span>
              </div>
            </td>
          </tr>

          <!-- 分隔行 -->
          <tr>
            <td :colspan="selectedTools.length + 1" class="py-2" style="background: var(--color-bg-surface)"></td>
          </tr>

          <!-- 定价 -->
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">定价</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center">
              <div class="text-xs" style="color: var(--color-text-secondary)">
                <div v-if="tool.pricing.free" class="text-green-400 font-medium">免费</div>
                <div v-if="tool.pricing.freeDetails" class="mt-0.5 opacity-60">{{ tool.pricing.freeDetails }}</div>
                <div v-if="tool.pricing.paid" class="mt-0.5">{{ tool.pricing.paid }}</div>
              </div>
            </td>
          </tr>

          <!-- 模型 -->
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">底层模型</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4 text-center text-xs" style="color: var(--color-text-secondary)">
              {{ tool.models }}
            </td>
          </tr>

          <!-- 核心功能 -->
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">核心功能</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4">
              <ul class="text-xs space-y-1" style="color: var(--color-text-secondary)">
                <li v-for="f in tool.features.slice(0, 4)" :key="f" class="flex items-start gap-1">
                  <span class="text-blue-400 shrink-0">•</span>
                  <span>{{ f }}</span>
                </li>
              </ul>
            </td>
          </tr>

          <!-- 优缺点 -->
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">优点</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4">
              <ul class="text-xs space-y-1" style="color: var(--color-text-secondary)">
                <li v-for="p in tool.pros.slice(0, 3)" :key="p" class="flex items-start gap-1">
                  <span class="text-green-400 shrink-0">✓</span>
                  <span>{{ p }}</span>
                </li>
              </ul>
            </td>
          </tr>
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">缺点</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4">
              <ul class="text-xs space-y-1" style="color: var(--color-text-secondary)">
                <li v-for="c in tool.cons.slice(0, 3)" :key="c" class="flex items-start gap-1">
                  <span class="text-red-400 shrink-0">✗</span>
                  <span>{{ c }}</span>
                </li>
              </ul>
            </td>
          </tr>

          <!-- 常见陷阱 -->
          <tr class="border-b" style="border-color: var(--color-border-subtle)">
            <td class="py-3 px-4 font-medium" style="color: var(--color-text-muted)">⚠️ 常见陷阱</td>
            <td v-for="tool in selectedTools" :key="tool.id" class="py-3 px-4">
              <ul class="text-xs space-y-1" style="color: var(--color-text-secondary)">
                <li v-for="p in tool.pitfalls.slice(0, 2)" :key="p" class="flex items-start gap-1">
                  <span class="text-amber-400 shrink-0">⚠</span>
                  <span>{{ p }}</span>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 结论 -->
      <div class="mt-6 p-4 rounded-lg" style="background: rgba(96, 165, 250, 0.08); border: 1px solid rgba(96, 165, 250, 0.2)">
        <h3 class="font-semibold mb-2 text-blue-400">🏆 快速结论</h3>
        <div class="space-y-1 text-sm" style="color: var(--color-text-secondary)">
          <p v-for="conclusion in conclusions" :key="conclusion">• {{ conclusion }}</p>
        </div>
      </div>
    </div>

    <!-- 未选择提示 -->
    <div v-else class="text-center py-16">
      <div class="text-5xl mb-4">👆</div>
      <p class="text-lg" style="color: var(--color-text-muted)">请至少选择 2 个工具开始对比</p>
      <p class="text-sm mt-2" style="color: var(--color-text-muted)">点击上方的工具卡片进行选择</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tools, getToolById, getCapabilityColor } from '~/composables/useToolsData'
import type { Tool } from '~/composables/useToolsData'

const allTools = tools

const selectedIds = ref<string[]>(['cursor', 'trae'])

const selectedTools = computed(() => {
  return selectedIds.value.map(id => getToolById(id)).filter(Boolean) as Tool[]
})

const scoreDimensions = [
  { key: 'autonomy', label: '自主性', desc: 'AI 能独立完成多少工作', color: '#f87171' },
  { key: 'contextDepth', label: '上下文深度', desc: '能理解多大的代码库', color: '#60a5fa' },
  { key: 'engineering', label: '工程化能力', desc: '是否支持 spec/测试/CI', color: '#a78bfa' },
  { key: 'easeOfUse', label: '上手成本', desc: '安装到产出的时间', color: '#34d399' },
  { key: 'costEfficiency', label: '成本效率', desc: '每元能完成多少工作量', color: '#fbbf24' }
]

function toggleTool(id: string) {
  const index = selectedIds.value.indexOf(id)
  if (index >= 0) {
    selectedIds.value.splice(index, 1)
  } else if (selectedIds.value.length < 3) {
    selectedIds.value.push(id)
  }
}

const conclusions = computed(() => {
  if (selectedTools.value.length < 2) return []

  const result: string[] = []
  const sorted = [...selectedTools.value].sort((a, b) => b.capability.level - a.capability.level)

  // 找最强 Agent
  const bestAgent = sorted[0]
  result.push(`最强 Agent 能力：${bestAgent.icon} ${bestAgent.name}（${bestAgent.capability.label} 级）`)

  // 找最便宜
  const freeTools = selectedTools.value.filter(t => t.pricing.free)
  if (freeTools.length > 0) {
    result.push(`免费选项：${freeTools.map(t => `${t.icon} ${t.name}`).join('、')}`)
  }

  // 找国内可用
  const domesticTools = selectedTools.value.filter(t => t.region === '国内')
  if (domesticTools.length > 0) {
    result.push(`国内直连：${domesticTools.map(t => `${t.icon} ${t.name}`).join('、')}`)
  }

  // 找最易上手
  const easiest = [...selectedTools.value].sort((a, b) => b.scores.easeOfUse - a.scores.easeOfUse)[0]
  result.push(`最易上手：${easiest.icon} ${easiest.name}`)

  return result
})

// SEO
useHead({
  title: 'AI 编程工具对比 - Cursor / Trae / Claude Code / Copilot 详细对比',
  meta: [
    { name: 'description', content: '对比主流 AI 编程工具的能力光谱、评分维度、定价和核心功能，帮你做出最佳选择。' }
  ]
})
</script>
