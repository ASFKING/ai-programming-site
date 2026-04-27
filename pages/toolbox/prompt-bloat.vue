<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div class="text-center py-6">
      <div class="text-5xl mb-4">📏</div>
      <h1 class="text-2xl md:text-3xl font-bold mb-3" style="color: var(--color-text-primary)">
        Prompt 膨胀计算器
      </h1>
      <p class="text-base max-w-lg mx-auto" style="color: var(--color-text-muted)">
        对比「朴素 prompt」vs「优化 prompt」的 token 消耗差异——看你能省多少钱
      </p>
    </div>

    <!-- 场景选择 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <label class="text-sm font-medium mb-3 block" style="color: var(--color-text-secondary)">选择场景</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="scene in scenes"
          :key="scene.id"
          @click="activeScene = scene.id"
          class="px-3 py-2 rounded-lg text-sm transition-all"
          :class="activeScene === scene.id
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            : 'border'"
          :style="activeScene === scene.id ? '' : { borderColor: 'var(--color-border)', background: 'var(--color-bg-surface)', color: 'var(--color-text-muted)' }"
        >
          {{ scene.icon }} {{ scene.name }}
        </button>
      </div>
    </section>

    <!-- 双栏对比 -->
    <div class="grid md:grid-cols-2 gap-4">
      <!-- 朴素版 -->
      <div class="rounded-xl overflow-hidden" style="border: 1px solid rgba(248,113,113,0.25)">
        <div class="px-4 py-3 flex items-center justify-between" style="background: rgba(248,113,113,0.08)">
          <span class="font-medium text-sm text-red-400">🪶 朴素版</span>
          <span class="text-xs font-mono px-2 py-0.5 rounded" style="background: rgba(248,113,113,0.15); color: #f87171">
            {{ naiveTokens }} tokens
          </span>
        </div>
        <textarea
          v-model="naivePrompt"
          rows="8"
          class="w-full p-4 text-sm font-mono resize-y focus:outline-none"
          style="background: var(--code-bg); color: var(--color-text-secondary); border: none"
        ></textarea>
      </div>

      <!-- 优化版 -->
      <div class="rounded-xl overflow-hidden" style="border: 1px solid rgba(52,211,153,0.25)">
        <div class="px-4 py-3 flex items-center justify-between" style="background: rgba(52,211,153,0.08)">
          <span class="font-medium text-sm text-green-400">📐 优化版</span>
          <span class="text-xs font-mono px-2 py-0.5 rounded" style="background: rgba(52,211,153,0.15); color: #34d399">
            {{ optimizedTokens }} tokens
          </span>
        </div>
        <textarea
          v-model="optimizedPrompt"
          rows="8"
          class="w-full p-4 text-sm font-mono resize-y focus:outline-none"
          style="background: var(--code-bg); color: var(--color-text-secondary); border: none"
        ></textarea>
      </div>
    </div>

    <!-- 对比结果 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">📊 对比结果</h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl font-bold" :style="{ color: savedPercent > 0 ? '#34d399' : '#f87171' }">
            {{ savedPercent > 0 ? '-' : '+' }}{{ Math.abs(savedPercent).toFixed(1) }}%
          </div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">Token 变化</div>
        </div>
        <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl font-bold" style="color: var(--color-accent-primary)">
            {{ savedTokens > 0 ? '-' : '+' }}{{ Math.abs(savedTokens) }}
          </div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">Token 差值</div>
        </div>
        <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl font-bold" style="color: var(--color-accent-secondary)">
            ${{ savedCostGPT4o.toFixed(6) }}
          </div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">省下（GPT-4o）</div>
        </div>
        <div class="p-4 rounded-xl text-center" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="text-2xl font-bold" style="color: var(--color-accent-tertiary)">
            {{ savedTokens > 0 ? Math.floor(1000000 / savedTokens) : '∞' }}
          </div>
          <div class="text-xs mt-1" style="color: var(--color-text-muted)">每百万次调用节省</div>
        </div>
      </div>

      <!-- 月度成本估算 -->
      <div class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
        <div class="flex items-center gap-4 mb-3">
          <label class="text-sm" style="color: var(--color-text-muted)">每日调用次数</label>
          <select v-model.number="dailyCalls" class="px-3 py-1.5 rounded-lg text-sm" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
            <option :value="10">10 次/天</option>
            <option :value="50">50 次/天</option>
            <option :value="100">100 次/天</option>
            <option :value="500">500 次/天</option>
            <option :value="1000">1000 次/天</option>
          </select>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-3 rounded-lg text-center" style="background: rgba(248,113,113,0.04); border: 1px solid rgba(248,113,113,0.12)">
            <div class="text-xs mb-1" style="color: var(--color-text-muted)">朴素版月成本（GPT-4o）</div>
            <div class="text-lg font-bold text-red-400">${{ monthlyCostNaive.toFixed(4) }}</div>
          </div>
          <div class="p-3 rounded-lg text-center" style="background: rgba(52,211,153,0.04); border: 1px solid rgba(52,211,153,0.12)">
            <div class="text-xs mb-1" style="color: var(--color-text-muted)">优化版月成本（GPT-4o）</div>
            <div class="text-lg font-bold text-green-400">${{ monthlyCostOptimized.toFixed(4) }}</div>
          </div>
          <div class="p-3 rounded-lg text-center" style="background: rgba(96,165,250,0.04); border: 1px solid rgba(96,165,250,0.12)">
            <div class="text-xs mb-1" style="color: var(--color-text-muted)">每月节省</div>
            <div class="text-lg font-bold text-blue-400">${{ monthlySaved.toFixed(4) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 优化技巧 -->
    <section class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">✂️ Prompt 瘦身技巧</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div v-for="tip in tips" :key="tip.title" class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
          <div class="flex items-center gap-2 mb-2">
            <span>{{ tip.icon }}</span>
            <span class="font-medium text-sm" style="color: var(--color-text-primary)">{{ tip.title }}</span>
          </div>
          <div class="text-xs" style="color: var(--color-text-muted)">
            <span class="line-through text-red-400/60">{{ tip.bad }}</span>
            <span class="mx-1">→</span>
            <span class="text-green-400">{{ tip.good }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const activeScene = ref('api')
const dailyCalls = ref(100)

const scenes = [
  {
    id: 'api',
    icon: '🔌',
    name: 'API 设计',
    naive: '帮我写一个用户注册的 API 接口',
    optimized: `设计 POST /api/auth/register 接口。

技术栈：Express.js + TypeScript + Prisma + Zod

数据模型：
- email: string（唯一，邮箱格式）
- password: string（≥8位，含大小写+数字）
- name: string（2-50字符）

响应规格：
- 201: { id, email, name, createdAt }
- 409: 邮箱已注册
- 422: 验证失败

要求：密码 bcrypt 加密（cost=12），含单元测试。`
  },
  {
    id: 'debug',
    icon: '🐛',
    name: 'Bug 调试',
    naive: '这段代码有 bug，帮我看看哪里出了问题，然后修复它',
    optimized: `## Bug 报告

现象：切换页码后列表数据不更新

复现：点击第2页 → UI显示页码2 → 数据仍为第1页

相关代码：
\`\`\`ts
const [page, setPage] = useState(1)
const [users, setUsers] = useState([])
useEffect(() => { fetchUsers(page).then(setUsers) }, [])
\`\`\`

请分析根因并给出修复方案。`
  },
  {
    id: 'refactor',
    icon: '🔧',
    name: '代码重构',
    naive: '帮我重构一下这个组件，它太乱了，代码可读性很差，而且有很多重复的逻辑',
    optimized: `重构目标：拆分 300 行组件为子组件 + 自定义 Hook

约束：
- 保持 API 和样式不变
- 每个文件 ≤100 行
- 不引入新依赖

步骤：UserList / UserCard / UserFilter 三组件 + useUsers Hook

（粘贴代码）`
  }
]

const naivePrompt = ref('')
const optimizedPrompt = ref('')

watch(activeScene, (id) => {
  const scene = scenes.find(s => s.id === id)
  if (scene) {
    naivePrompt.value = scene.naive
    optimizedPrompt.value = scene.optimized
  }
}, { immediate: true })

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

const naiveTokens = computed(() => estimateTokens(naivePrompt.value))
const optimizedTokens = computed(() => estimateTokens(optimizedPrompt.value))
const savedTokens = computed(() => naiveTokens.value - optimizedTokens.value)
const savedPercent = computed(() => naiveTokens.value === 0 ? 0 : (savedTokens.value / naiveTokens.value) * 100)

const savedCostGPT4o = computed(() => (savedTokens.value / 1_000_000) * 2.5)

const monthlyCostNaive = computed(() => (naiveTokens.value / 1_000_000) * 2.5 * dailyCalls.value * 30)
const monthlyCostOptimized = computed(() => (optimizedTokens.value / 1_000_000) * 2.5 * dailyCalls.value * 30)
const monthlySaved = computed(() => monthlyCostNaive.value - monthlyCostOptimized.value)

const tips = [
  { icon: '✂️', title: '删除客套话', bad: '请你帮我写一个非常好的、高质量的...', good: '写一个...' },
  { icon: '📌', title: '用名词代替形容词', bad: '一个很漂亮的、响应式的网页', good: '网页，Tailwind CSS，响应式' },
  { icon: '📋', title: '结构化替代描述', bad: '它应该支持增删改查，还要有搜索功能', good: '功能：CRUD + 搜索' },
  { icon: '🔢', title: '用代码替代自然语言', bad: '类型是字符串，长度在2到50之间', good: 'name: string(2-50)' }
]

useHead({
  title: 'Prompt 膨胀计算器 - AI 编程工具箱 | 朴素 vs 优化 Prompt 对比',
  meta: [
    { name: 'description', content: '对比朴素 prompt 和优化 prompt 的 token 消耗差异，计算每月可节省的 API 成本。附带 Prompt 瘦身技巧。' }
  ]
})
</script>
