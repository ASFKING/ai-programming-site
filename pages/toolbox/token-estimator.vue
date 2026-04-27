<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div class="text-center py-6">
      <div class="text-5xl mb-4">🔢</div>
      <h1 class="text-2xl md:text-3xl font-bold mb-3" style="color: var(--color-text-primary)">
        Token 估算器
      </h1>
      <p class="text-base max-w-lg mx-auto" style="color: var(--color-text-muted)">
        输入文本，实时估算 token 数量，换算成各主流模型的调用成本
      </p>
    </div>

    <!-- 输入区 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <div class="flex items-center justify-between mb-3">
        <label class="text-sm font-medium" style="color: var(--color-text-secondary)">输入你的文本</label>
        <button @click="clearText" class="text-xs px-2 py-1 rounded transition-colors" style="background: var(--color-bg-surface); color: var(--color-text-muted)">
          清空
        </button>
      </div>
      <textarea
        v-model="inputText"
        rows="8"
        placeholder="在这里粘贴或输入文本...&#10;&#10;例如：帮我写一个用户注册的 API 接口，使用 Express.js + TypeScript，需要邮箱验证和密码加密。"
        class="w-full p-4 rounded-lg text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        style="background: var(--code-bg); color: var(--color-text-secondary); border: 1px solid var(--color-border)"
      ></textarea>
    </section>

    <!-- 实时统计 -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-card); border: 1px solid var(--color-border)">
        <div class="text-2xl font-bold" style="color: var(--color-accent-primary)">{{ charCount }}</div>
        <div class="text-xs mt-1" style="color: var(--color-text-muted)">字符数</div>
      </div>
      <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-card); border: 1px solid var(--color-border)">
        <div class="text-2xl font-bold" style="color: var(--color-accent-secondary)">{{ tokenCount }}</div>
        <div class="text-xs mt-1" style="color: var(--color-text-muted)">估算 Token</div>
      </div>
      <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-card); border: 1px solid var(--color-border)">
        <div class="text-2xl font-bold" style="color: var(--color-accent-tertiary)">{{ chineseCharCount }}</div>
        <div class="text-xs mt-1" style="color: var(--color-text-muted)">中文字符</div>
      </div>
      <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-card); border: 1px solid var(--color-border)">
        <div class="text-2xl font-bold" style="color: #fbbf24">{{ englishWordCount }}</div>
        <div class="text-xs mt-1" style="color: var(--color-text-muted)">英文单词</div>
      </div>
    </section>

    <!-- 模型成本换算 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">💰 各模型成本估算</h2>
      <p class="text-sm mb-4" style="color: var(--color-text-muted)">
        假设输入 {{ tokenCount }} tokens，按各模型输入价格计算（不含输出）
      </p>

      <div class="space-y-3">
        <div v-for="model in models" :key="model.name" class="flex items-center gap-4 p-3 rounded-lg transition-all" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <span class="text-xl w-8 text-center">{{ model.icon }}</span>
          <div class="flex-1 min-w-0">
            <div class="font-medium text-sm" style="color: var(--color-text-primary)">{{ model.name }}</div>
            <div class="text-xs" style="color: var(--color-text-muted)">{{ model.vendor }} · {{ model.context }}</div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-sm font-mono font-medium" :style="{ color: model.priceColor }">
              ${{ getInputCost(model).toFixed(6) }}
            </div>
            <div class="text-xs" style="color: var(--color-text-muted)">
              每 1M tokens: ${{ model.inputPricePer1M }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 上下文占比 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">📊 上下文窗口占比</h2>
      <p class="text-sm mb-4" style="color: var(--color-text-muted)">
        当前 {{ tokenCount }} tokens 在各模型上下文窗口中的占比
      </p>

      <div class="space-y-3">
        <div v-for="model in models" :key="'bar-'+model.name">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs" style="color: var(--color-text-muted)">{{ model.name }}</span>
            <span class="text-xs font-mono" :style="{ color: getContextPercent(model) > 80 ? '#f87171' : getContextPercent(model) > 50 ? '#fbbf24' : '#34d399' }">
              {{ getContextPercent(model).toFixed(2) }}%
            </span>
          </div>
          <div class="h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.06)">
            <div
              class="h-full rounded-full transition-all duration-300"
              :style="{
                width: Math.min(100, getContextPercent(model)) + '%',
                background: getContextPercent(model) > 80 ? '#f87171' : getContextPercent(model) > 50 ? '#fbbf24' : '#34d399'
              }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 免责说明 -->
    <section class="p-4 rounded-xl text-center text-xs" style="background: var(--color-bg-surface); border: 1px solid var(--color-border); color: var(--color-text-muted)">
      💡 Token 数为近似估算值（基于字符启发式算法），与实际 BPE 分词结果可能有 ±15% 偏差，仅供参考。
      <br>成本数据基于各厂商 2026 年 4 月公开定价，实际费用请以官方为准。
    </section>
  </div>
</template>

<script setup lang="ts">
const inputText = ref('')

// Token 估算函数（字符启发式）
function estimateTokens(text: string): number {
  if (!text.trim()) return 0
  const chineseChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length
  const englishWords = (text.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || []).length
  const numbers = (text.match(/\d+/g) || []).length
  const remaining = text.length - chineseChars -
    (text.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || []).join('').length -
    (text.match(/\d+/g) || []).join('').length
  const punctuation = Math.max(0, remaining)
  return Math.ceil(chineseChars * 2 + englishWords * 1.3 + numbers * 1 + punctuation * 0.4)
}

const charCount = computed(() => inputText.value.length)
const tokenCount = computed(() => estimateTokens(inputText.value))
const chineseCharCount = computed(() => (inputText.value.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length)
const englishWordCount = computed(() => (inputText.value.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || []).length)

interface ModelInfo {
  name: string
  vendor: string
  icon: string
  inputPricePer1M: number
  contextTokens: number
  context: string
  priceColor: string
}

const models: ModelInfo[] = [
  { name: 'GPT-4o', vendor: 'OpenAI', icon: '🟢', inputPricePer1M: 2.5, contextTokens: 128000, context: '128K', priceColor: '#34d399' },
  { name: 'Claude Sonnet 4', vendor: 'Anthropic', icon: '🟠', inputPricePer1M: 3, contextTokens: 200000, context: '200K', priceColor: '#fbbf24' },
  { name: 'Claude Opus 4', vendor: 'Anthropic', icon: '🔴', inputPricePer1M: 15, contextTokens: 200000, context: '200K', priceColor: '#f87171' },
  { name: 'Gemini 2.5 Pro', vendor: 'Google', icon: '🔵', inputPricePer1M: 1.25, contextTokens: 1000000, context: '1M', priceColor: '#60a5fa' },
  { name: 'DeepSeek V3', vendor: 'DeepSeek', icon: '🟣', inputPricePer1M: 0.27, contextTokens: 128000, context: '128K', priceColor: '#a78bfa' },
  { name: 'Qwen3', vendor: '阿里云', icon: '🟡', inputPricePer1M: 0.4, contextTokens: 128000, context: '128K', priceColor: '#fcd34d' }
]

function getInputCost(model: ModelInfo): number {
  return (tokenCount.value / 1_000_000) * model.inputPricePer1M
}

function getContextPercent(model: ModelInfo): number {
  return (tokenCount.value / model.contextTokens) * 100
}

function clearText() {
  inputText.value = ''
}

useHead({
  title: 'Token 估算器 - AI 编程工具箱 | 实时 Token 计数 + 成本换算',
  meta: [
    { name: 'description', content: 'AI 编程 Token 估算器：输入文本实时显示 token 数量，支持 GPT-4o、Claude、Gemini、DeepSeek 等主流模型成本换算。' }
  ]
})
</script>
