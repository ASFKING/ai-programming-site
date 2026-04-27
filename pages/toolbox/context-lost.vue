<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div class="text-center py-6">
      <div class="text-5xl mb-4">🧠</div>
      <h1 class="text-2xl md:text-3xl font-bold mb-3" style="color: var(--color-text-primary)">
        上下文丢失可视化
      </h1>
      <p class="text-base max-w-lg mx-auto" style="color: var(--color-text-muted)">
        滑动调整上下文长度，观察 AI 注意力如何随窗口扩大而衰减——理解「Lost in the Middle」现象
      </p>
    </div>

    <!-- 控制面板 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <div class="flex flex-col md:flex-row md:items-center gap-6">
        <!-- 上下文长度滑块 -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium" style="color: var(--color-text-secondary)">上下文窗口长度</label>
            <span class="text-sm font-mono px-2 py-0.5 rounded" style="background: var(--color-bg-surface); color: var(--color-accent-primary)">
              {{ contextLabel }}
            </span>
          </div>
          <input
            type="range"
            v-model.number="contextIndex"
            min="0"
            :max="contextSizes.length - 1"
            step="1"
            class="w-full h-2 rounded-full appearance-none cursor-pointer"
            style="background: var(--color-bg-surface)"
          />
          <div class="flex justify-between mt-1">
            <span v-for="(size, i) in contextSizes" :key="i" class="text-xs" :style="{ color: i === contextIndex ? 'var(--color-accent-primary)' : 'var(--color-text-muted)' }">
              {{ size.label }}
            </span>
          </div>
        </div>

        <!-- 信息密度 -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium" style="color: var(--color-text-secondary)">中间填充内容量</label>
            <span class="text-sm font-mono px-2 py-0.5 rounded" style="background: var(--color-bg-surface); color: var(--color-accent-secondary)">
              {{ fillLevel }}%
            </span>
          </div>
          <input
            type="range"
            v-model.number="fillLevel"
            min="10"
            max="90"
            step="5"
            class="w-full h-2 rounded-full appearance-none cursor-pointer"
            style="background: var(--color-bg-surface)"
          />
          <div class="flex justify-between mt-1">
            <span class="text-xs" style="color: var(--color-text-muted)">少（10%）</span>
            <span class="text-xs" style="color: var(--color-text-muted)">多（90%）</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 热力图可视化 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🔥 注意力热力图</h2>
      <p class="text-sm mb-4" style="color: var(--color-text-muted)">
        颜色越暖（橙/红）= 注意力越高 · 颜色越冷（蓝/紫）= 注意力越低
      </p>

      <!-- 热力图块 -->
      <div class="space-y-1.5">
        <div
          v-for="(block, i) in heatmapBlocks"
          :key="i"
          class="flex items-center gap-3 p-3 rounded-lg transition-all duration-300"
          :style="{
            background: block.color,
            borderLeft: `4px solid ${block.borderColor}`
          }"
        >
          <span class="text-xs font-mono w-12 shrink-0" style="color: var(--color-text-muted)">
            {{ block.range }}
          </span>
          <span class="text-sm flex-1" :style="{ color: block.textColor }">
            {{ block.label }}
          </span>
          <span class="text-xs font-mono shrink-0" :style="{ color: block.borderColor }">
            {{ block.attention }}%
          </span>
        </div>
      </div>
    </section>

    <!-- 注意力曲线图 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">📈 注意力分布曲线</h2>
      <p class="text-sm mb-4" style="color: var(--color-text-muted)">
        典型的 U 形分布：开头和结尾注意力高，中间急剧下降
      </p>

      <!-- SVG 曲线图 -->
      <div class="w-full overflow-x-auto">
        <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" class="w-full" style="max-height: 220px">
          <!-- 网格线 -->
          <line v-for="i in 4" :key="'grid-'+i"
            :x1="padding" :y1="padding + (i-1) * (chartHeight / 3)"
            :x2="svgWidth - padding" :y2="padding + (i-1) * (chartHeight / 3)"
            stroke="rgba(255,255,255,0.06)" stroke-width="1"
          />

          <!-- 渐变填充区域 -->
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.02"/>
            </linearGradient>
          </defs>
          <path :d="areaPath" fill="url(#areaGradient)" />

          <!-- 曲线 -->
          <path :d="linePath" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

          <!-- 数据点 -->
          <circle
            v-for="(point, i) in curvePoints"
            :key="'dot-'+i"
            :cx="point.x" :cy="point.y" r="3"
            :fill="point.y < padding + chartHeight * 0.4 ? '#f87171' : point.y < padding + chartHeight * 0.7 ? '#fbbf24' : '#60a5fa'"
          />

          <!-- X 轴标签 -->
          <text :x="padding" :y="svgHeight - 4" fill="currentColor" font-size="11" style="color: var(--color-text-muted)">开头</text>
          <text :x="svgWidth / 2" :y="svgHeight - 4" fill="currentColor" font-size="11" text-anchor="middle" style="color: var(--color-text-muted)">中间</text>
          <text :x="svgWidth - padding" :y="svgHeight - 4" fill="currentColor" font-size="11" text-anchor="end" style="color: var(--color-text-muted)">结尾</text>

          <!-- Y 轴标签 -->
          <text :x="padding - 6" :y="padding + 4" fill="currentColor" font-size="10" text-anchor="end" style="color: var(--color-text-muted)">高</text>
          <text :x="padding - 6" :y="padding + chartHeight + 4" fill="currentColor" font-size="10" text-anchor="end" style="color: var(--color-text-muted)">低</text>
        </svg>
      </div>
    </section>

    <!-- 对比模式：旧模型 vs 新模型 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🔄 模型代际对比</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 rounded-lg" style="background: rgba(248,113,113,0.04); border: 1px solid rgba(248,113,113,0.15)">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">📟</span>
            <span class="font-medium text-red-400">2023 模型（如 GPT-3.5）</span>
          </div>
          <div class="space-y-2 text-sm" style="color: var(--color-text-secondary)">
            <p>• 上下文窗口：<strong>4K - 8K</strong> tokens</p>
            <p>• 中间内容丢失率：<strong class="text-red-400">40-60%</strong></p>
            <p>• 有效利用长度：<strong>~60%</strong> 的窗口</p>
          </div>
          <div class="mt-3 h-3 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.06)">
            <div class="h-full rounded-full" style="width: 60%; background: linear-gradient(90deg, #f87171, #fbbf24)"></div>
          </div>
        </div>
        <div class="p-4 rounded-lg" style="background: rgba(52,211,153,0.04); border: 1px solid rgba(52,211,153,0.15)">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">🧠</span>
            <span class="font-medium text-green-400">2026 模型（如 Claude Opus 4）</span>
          </div>
          <div class="space-y-2 text-sm" style="color: var(--color-text-secondary)">
            <p>• 上下文窗口：<strong>200K</strong> tokens</p>
            <p>• 中间内容丢失率：<strong class="text-green-400">10-20%</strong></p>
            <p>• 有效利用长度：<strong>~85%</strong> 的窗口</p>
          </div>
          <div class="mt-3 h-3 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.06)">
            <div class="h-full rounded-full" style="width: 85%; background: linear-gradient(90deg, #34d399, #22d3ee)"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 解决方案 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">💡 如何应对上下文丢失？</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div v-for="tip in tips" :key="tip.title" class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">{{ tip.icon }}</span>
            <span class="font-medium" style="color: var(--color-text-primary)">{{ tip.title }}</span>
          </div>
          <p class="text-sm" style="color: var(--color-text-secondary)">{{ tip.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 学术来源 -->
    <section class="p-4 rounded-xl text-center text-xs" style="background: var(--color-bg-surface); border: 1px solid var(--color-border); color: var(--color-text-muted)">
      📖 本工具基于论文 <a href="https://arxiv.org/abs/2307.03172" target="_blank" class="text-blue-400 hover:underline">"Lost in the Middle: How Language Models Use Long Contexts"</a>（Liu et al., 2023）的发现设计
    </section>
  </div>
</template>

<script setup lang="ts">
const contextIndex = ref(3) // 默认 128K
const fillLevel = ref(50)

const contextSizes = [
  { label: '4K', tokens: 4096 },
  { label: '8K', tokens: 8192 },
  { label: '32K', tokens: 32768 },
  { label: '128K', tokens: 131072 },
  { label: '200K', tokens: 200000 }
]

const contextLabel = computed(() => contextSizes[contextIndex.value].label)
const currentTokens = computed(() => contextSizes[contextIndex.value].tokens)

// 生成热力图块
const heatmapBlocks = computed(() => {
  const blockCount = 10
  const blocks = []
  const fill = fillLevel.value / 100

  for (let i = 0; i < blockCount; i++) {
    const pos = i / (blockCount - 1) // 0 到 1
    // U 形注意力曲线：开头和结尾高，中间低
    const baseAttention = 1 - 4 * (pos - 0.5) ** 2 // 抛物线
    // 填充内容越多，中间衰减越严重
    const decayFactor = 1 - fill * 0.6 * Math.sin(pos * Math.PI)
    const attention = Math.round(Math.max(10, Math.min(100, baseAttention * decayFactor * 100)))

    // 根据注意力值选颜色
    let color, borderColor, textColor
    if (attention >= 75) {
      color = 'rgba(248,113,113,0.12)'
      borderColor = '#f87171'
      textColor = '#fca5a5'
    } else if (attention >= 50) {
      color = 'rgba(251,191,36,0.10)'
      borderColor = '#fbbf24'
      textColor = '#fcd34d'
    } else if (attention >= 30) {
      color = 'rgba(96,165,250,0.08)'
      borderColor = '#60a5fa'
      textColor = '#93c5fd'
    } else {
      color = 'rgba(167,139,250,0.06)'
      borderColor = '#a78bfa'
      textColor = '#c4b5fd'
    }

    const tokenStart = Math.round(currentTokens.value * (i / blockCount))
    const tokenEnd = Math.round(currentTokens.value * ((i + 1) / blockCount))

    let label
    if (i === 0) label = '系统提示 + 用户指令'
    else if (i === blockCount - 1) label = '关键问题 + 输出格式要求'
    else label = `填充内容（文档/代码/对话记录）`

    blocks.push({
      range: `${(tokenStart / 1000).toFixed(0)}K-${(tokenEnd / 1000).toFixed(0)}K`,
      label,
      attention,
      color,
      borderColor,
      textColor
    })
  }
  return blocks
})

// SVG 曲线图
const svgWidth = 600
const svgHeight = 200
const padding = 40
const chartWidth = svgWidth - padding * 2
const chartHeight = svgHeight - padding * 2 - 20

const curvePoints = computed(() => {
  const points = []
  const steps = 20
  const fill = fillLevel.value / 100

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    // U 形曲线 + 填充影响
    const base = 1 - 4 * (t - 0.5) ** 2
    const decay = 1 - fill * 0.6 * Math.sin(t * Math.PI)
    const value = Math.max(0.05, base * decay)

    const x = padding + t * chartWidth
    const y = padding + (1 - value) * chartHeight
    points.push({ x, y, value })
  }
  return points
})

const linePath = computed(() => {
  return curvePoints.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

const areaPath = computed(() => {
  const bottom = padding + chartHeight
  const line = curvePoints.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const lastX = curvePoints.value[curvePoints.value.length - 1].x
  const firstX = curvePoints.value[0].x
  return `${line} L ${lastX} ${bottom} L ${firstX} ${bottom} Z`
})

const tips = [
  { icon: '📌', title: '重要信息前置', desc: '把关键指令、输出格式要求放在 prompt 的开头或结尾，避免被"淹没"在中间。' },
  { icon: '📋', title: '结构化格式', desc: '使用 Markdown 标题、列表、分隔符等结构化格式，帮助模型定位信息。' },
  { icon: '✂️', title: '分段处理', desc: '超长文档拆分为多个子任务，每次只喂相关片段，而非一次性灌入全文。' },
  { icon: '🔁', title: '关键信息重复', desc: '在 prompt 末尾重复强调核心要求（如"必须用 TypeScript"），对抗注意力衰减。' }
]

useHead({
  title: '上下文丢失可视化 - AI 编程工具箱 | Lost in the Middle',
  meta: [
    { name: 'description', content: '交互式可视化 LLM 的 Lost in the Middle 现象：滑动调整上下文长度，热力图展示注意力衰减，理解为什么长上下文不等于好上下文。' }
  ]
})
</script>
