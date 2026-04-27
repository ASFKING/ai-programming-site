<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div class="text-center py-6">
      <div class="text-5xl mb-4">🎯</div>
      <h1 class="text-2xl md:text-3xl font-bold mb-3" style="color: var(--color-text-primary)">
        需求→范式推荐器
      </h1>
      <p class="text-base max-w-lg mx-auto" style="color: var(--color-text-muted)">
        回答 5 个问题，找到最适合你的 AI 编程范式
      </p>
    </div>

    <!-- 问卷区 -->
    <section v-if="!showResult" class="space-y-6">
      <!-- 进度条 -->
      <div class="p-4 rounded-xl" style="background: var(--color-bg-card); border: 1px solid var(--color-border)">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm" style="color: var(--color-text-muted)">进度</span>
          <span class="text-sm font-mono" style="color: var(--color-accent-primary)">{{ currentStep + 1 }} / {{ questions.length }}</span>
        </div>
        <div class="h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.06)">
          <div class="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500" :style="{ width: ((currentStep + 1) / questions.length * 100) + '%' }"></div>
        </div>
      </div>

      <!-- 当前问题 -->
      <div class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">{{ questions[currentStep].icon }}</span>
          <h2 class="text-lg font-semibold" style="color: var(--color-text-primary)">{{ questions[currentStep].title }}</h2>
        </div>
        <p class="text-sm mb-6" style="color: var(--color-text-muted)">{{ questions[currentStep].desc }}</p>

        <div class="space-y-3">
          <button
            v-for="option in questions[currentStep].options"
            :key="option.value"
            @click="selectOption(currentStep, option.value)"
            class="w-full p-4 rounded-xl text-left transition-all duration-200"
            :class="answers[currentStep] === option.value
              ? 'bg-blue-500/15 border-blue-500/40 shadow-lg shadow-blue-500/5'
              : 'hover:border-white/20'"
            :style="{
              border: '1px solid ' + (answers[currentStep] === option.value ? 'rgba(96,165,250,0.4)' : 'var(--color-border)'),
              background: answers[currentStep] === option.value ? '' : 'var(--color-bg-surface)'
            }"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">{{ option.icon }}</span>
              <div>
                <div class="font-medium text-sm" style="color: var(--color-text-primary)">{{ option.label }}</div>
                <div class="text-xs mt-0.5" style="color: var(--color-text-muted)">{{ option.desc }}</div>
              </div>
            </div>
          </button>
        </div>

        <!-- 导航按钮 -->
        <div class="flex items-center justify-between mt-6">
          <button
            v-if="currentStep > 0"
            @click="currentStep--"
            class="px-4 py-2 rounded-lg text-sm transition-all"
            style="background: var(--color-bg-surface); border: 1px solid var(--color-border); color: var(--color-text-secondary)"
          >
            ← 上一步
          </button>
          <div v-else></div>
          <button
            v-if="currentStep < questions.length - 1"
            @click="currentStep++"
            :disabled="answers[currentStep] === null"
            class="px-6 py-2 rounded-lg text-sm font-medium transition-all"
            :class="answers[currentStep] !== null ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:-translate-y-0.5' : 'opacity-40 cursor-not-allowed'"
            :style="answers[currentStep] === null ? { background: 'var(--color-bg-surface)', color: 'var(--color-text-muted)' } : {}"
          >
            下一步 →
          </button>
          <button
            v-else
            @click="showResult = true"
            :disabled="answers[currentStep] === null"
            class="px-6 py-2 rounded-lg text-sm font-medium transition-all"
            :class="answers[currentStep] !== null ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:-translate-y-0.5' : 'opacity-40 cursor-not-allowed'"
            :style="answers[currentStep] === null ? { background: 'var(--color-bg-surface)', color: 'var(--color-text-muted)' } : {}"
          >
            查看推荐 →
          </button>
        </div>
      </div>
    </section>

    <!-- 结果区 -->
    <section v-else class="space-y-6">
      <!-- 推荐结果 -->
      <div class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
        <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">🏆 推荐范式</h2>

        <div class="p-5 rounded-xl mb-4" style="background: var(--color-bg-elevated); border: 1px solid var(--color-border)">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-3xl">{{ topPick.icon }}</span>
            <div>
              <h3 class="text-xl font-bold" style="color: var(--color-text-primary)">{{ topPick.name }}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full" :style="{ background: topPick.tagBg, color: topPick.tagColor }">最佳匹配</span>
            </div>
          </div>
          <p class="text-sm mb-3" style="color: var(--color-text-secondary)">{{ topPick.reason }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in topPick.tags" :key="tag" class="px-2 py-0.5 rounded text-xs" style="background: var(--color-bg-surface); color: var(--color-text-muted)">
              {{ tag }}
            </span>
          </div>
          <NuxtLink :to="topPick.link" class="inline-block mt-3 text-sm text-blue-400 hover:underline">
            了解更多 →
          </NuxtLink>
        </div>

        <!-- 辅助推荐 -->
        <p class="text-sm mb-3" style="color: var(--color-text-muted)">辅助推荐：</p>
        <div class="grid md:grid-cols-2 gap-3">
          <div v-for="pick in subPicks" :key="pick.name" class="p-4 rounded-lg" style="background: var(--color-bg-surface); border: 1px solid var(--color-border)">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">{{ pick.icon }}</span>
              <span class="font-medium text-sm" style="color: var(--color-text-primary)">{{ pick.name }}</span>
              <span class="text-xs font-mono px-1.5 py-0.5 rounded" style="background: var(--color-bg-card); color: var(--color-text-muted)">
                {{ pick.score }}%
              </span>
            </div>
            <p class="text-xs" style="color: var(--color-text-muted)">{{ pick.reason }}</p>
          </div>
        </div>
      </div>

      <!-- 匹配度雷达（简化为条形图） -->
      <div class="p-6 rounded-xl glass" style="border: 1px solid var(--color-border)">
        <h2 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary)">📊 四范式匹配度</h2>
        <div class="space-y-4">
          <div v-for="paradigm in paradigmScores" :key="paradigm.name">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <span>{{ paradigm.icon }}</span>
                <span class="text-sm font-medium" style="color: var(--color-text-primary)">{{ paradigm.name }}</span>
              </div>
              <span class="text-sm font-mono" :style="{ color: paradigm.color }">{{ paradigm.score }}%</span>
            </div>
            <div class="h-3 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.06)">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: paradigm.score + '%', background: paradigm.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 重新开始 -->
      <div class="text-center">
        <button @click="reset" class="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5" style="background: var(--color-bg-card); border: 1px solid var(--color-border); color: var(--color-text-primary)">
          🔄 重新测评
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const currentStep = ref(0)
const showResult = ref(false)
const answers = ref<(string | null)[]>([null, null, null, null, null])

const questions = [
  {
    icon: '🏗️',
    title: '你的项目类型是什么？',
    desc: '不同类型的项目适合不同的编程范式',
    options: [
      { value: 'prototype', icon: '🚀', label: '快速原型 / MVP', desc: '先做出来再说，验证想法优先' },
      { value: 'feature', icon: '🧩', label: '新功能开发', desc: '在已有项目中添加新功能' },
      { value: 'production', icon: '🏭', label: '生产级项目', desc: '需要高质量、可维护、可测试' },
      { value: 'system', icon: '⚙️', label: '复杂系统', desc: '多模块、多服务、端到端交付' }
    ]
  },
  {
    icon: '👥',
    title: '团队规模如何？',
    desc: '团队越大，越需要规范和协作流程',
    options: [
      { value: 'solo', icon: '🧑', label: '独立开发', desc: '一个人说了算' },
      { value: 'small', icon: '👥', label: '2-5 人小团队', desc: '需要基本的代码规范' },
      { value: 'medium', icon: '🏢', label: '5-20 人团队', desc: '需要统一的开发流程' },
      { value: 'large', icon: '🏗️', label: '20+ 人大团队', desc: '需要严格的规范和审查' }
    ]
  },
  {
    icon: '🎯',
    title: '质量要求如何？',
    desc: '质量要求越高，越需要结构化的开发方式',
    options: [
      { value: 'low', icon: '🏃', label: '能跑就行', desc: '快速验证，后续再优化' },
      { value: 'medium', icon: '✅', label: '基本可用', desc: '需要基本的错误处理和测试' },
      { value: 'high', icon: '🏆', label: '高质量', desc: '需要完整的测试、文档、代码审查' },
      { value: 'critical', icon: '🔒', label: '关键系统', desc: '需要形式化验证、安全审计' }
    ]
  },
  {
    icon: '⏰',
    title: '时间预算多少？',
    desc: '时间越紧，越需要 AI 承担更多工作',
    options: [
      { value: 'hours', icon: '⚡', label: '几小时内', desc: '今天就要，越快越好' },
      { value: 'days', icon: '📅', label: '1-3 天', desc: '有时间打磨，但不能拖' },
      { value: 'weeks', icon: '📆', label: '1-2 周', desc: '有充足时间做对' },
      { value: 'months', icon: '🗓️', label: '长期项目', desc: '可以投入时间建立规范' }
    ]
  },
  {
    icon: '🧠',
    title: '你的 AI 编程经验？',
    desc: '经验越丰富，越能驾驭高级范式',
    options: [
      { value: 'beginner', icon: '🐣', label: '刚入门', desc: '刚开始用 AI 辅助编程' },
      { value: 'intermediate', icon: '🧑‍💻', label: '有一定经验', desc: '用过 Cursor/Copilot，了解基本用法' },
      { value: 'advanced', icon: '🏗️', label: '熟练使用', desc: '写过 Prompt 规则，用过 Agent 模式' },
      { value: 'expert', icon: '🧙', label: '专家级', desc: 'Spec 驱动开发，自定义工作流' }
    ]
  }
]

function selectOption(step: number, value: string) {
  answers.value[step] = value
  if (step < questions.length - 1) {
    setTimeout(() => { currentStep.value++ }, 300)
  }
}

// 评分算法
const paradigmScores = computed(() => {
  const a = answers.value
  const scores = {
    completion: 0,
    vibe: 0,
    spec: 0,
    agentic: 0
  }

  // Q1: 项目类型
  if (a[0] === 'prototype') { scores.vibe += 30; scores.completion += 10 }
  else if (a[0] === 'feature') { scores.completion += 20; scores.spec += 15; scores.vibe += 10 }
  else if (a[0] === 'production') { scores.spec += 30; scores.agentic += 10 }
  else if (a[0] === 'system') { scores.agentic += 30; scores.spec += 20 }

  // Q2: 团队规模
  if (a[1] === 'solo') { scores.vibe += 20; scores.completion += 15 }
  else if (a[1] === 'small') { scores.spec += 15; scores.completion += 10 }
  else if (a[1] === 'medium') { scores.spec += 25; scores.agentic += 10 }
  else if (a[1] === 'large') { scores.spec += 30; scores.agentic += 20 }

  // Q3: 质量要求
  if (a[2] === 'low') { scores.vibe += 25; scores.completion += 5 }
  else if (a[2] === 'medium') { scores.completion += 15; scores.spec += 10 }
  else if (a[2] === 'high') { scores.spec += 25; scores.agentic += 10 }
  else if (a[2] === 'critical') { scores.spec += 30; scores.agentic += 25 }

  // Q4: 时间预算
  if (a[3] === 'hours') { scores.vibe += 25; scores.completion += 15 }
  else if (a[3] === 'days') { scores.completion += 15; scores.spec += 10 }
  else if (a[3] === 'weeks') { scores.spec += 20; scores.agentic += 15 }
  else if (a[3] === 'months') { scores.spec += 25; scores.agentic += 20 }

  // Q5: 经验水平
  if (a[4] === 'beginner') { scores.completion += 25; scores.vibe += 10 }
  else if (a[4] === 'intermediate') { scores.completion += 15; scores.vibe += 15; scores.spec += 5 }
  else if (a[4] === 'advanced') { scores.spec += 20; scores.agentic += 15 }
  else if (a[4] === 'expert') { scores.agentic += 25; scores.spec += 20 }

  // 归一化到 0-100
  const max = Math.max(scores.completion, scores.vibe, scores.spec, scores.agentic, 1)
  return [
    { name: 'Code Completion', icon: '⌨️', score: Math.round(scores.completion / max * 100), color: '#22d3ee' },
    { name: 'Vibe Coding', icon: '🎵', score: Math.round(scores.vibe / max * 100), color: '#a78bfa' },
    { name: 'Spec Coding', icon: '📋', score: Math.round(scores.spec / max * 100), color: '#fbbf24' },
    { name: 'Agentic Coding', icon: '🧠', score: Math.round(scores.agentic / max * 100), color: '#f87171' }
  ].sort((a, b) => b.score - a.score)
})

const paradigmDetails: Record<string, { name: string; icon: string; reason: string; tags: string[]; tagBg: string; tagColor: string; link: string }> = {
  'Code Completion': {
    name: 'Code Completion',
    icon: '⌨️',
    reason: 'AI 预测你下一步要写的代码，按 Tab 接受。零学习成本，立即提效。最适合你的当前场景。',
    tags: ['被动响应', '逐行建议', '低门槛'],
    tagBg: 'rgba(34,211,238,0.15)',
    tagColor: '#22d3ee',
    link: '/paradigms/code-completion'
  },
  'Vibe Coding': {
    name: 'Vibe Coding',
    icon: '🎵',
    reason: '描述意图，AI 实现，快速验证创意。适合"先做出来再说"的场景。你的项目特征很匹配。',
    tags: ['自然语言', '创意优先', '沉浸式'],
    tagBg: 'rgba(167,139,250,0.15)',
    tagColor: '#a78bfa',
    link: '/paradigms/vibe-coding'
  },
  'Spec Coding': {
    name: 'Spec Coding',
    icon: '📋',
    reason: '先写规格再实现，契约驱动的工程化开发。规格是合同，代码是执行。你的质量需求指向这里。',
    tags: ['规格先行', '可追溯', '质量保证'],
    tagBg: 'rgba(251,191,36,0.15)',
    tagColor: '#fbbf24',
    link: '/paradigms/spec-coding'
  },
  'Agentic Coding': {
    name: 'Agentic Coding',
    icon: '🧠',
    reason: 'AI 自主规划、执行、闭环的端到端开发。人是指挥官，AI 是执行者。最适合复杂系统交付。',
    tags: ['自主决策', '工具调用', '端到端'],
    tagBg: 'rgba(248,113,113,0.15)',
    tagColor: '#f87171',
    link: '/paradigms/agentic-coding'
  }
}

const topPick = computed(() => paradigmDetails[paradigmScores.value[0].name])

const subPicks = computed(() => {
  return paradigmScores.value.slice(1, 3).map(p => ({
    ...paradigmDetails[p.name],
    score: p.score,
    reason: paradigmDetails[p.name].reason.split('。')[0] + '。'
  }))
})

function reset() {
  answers.value = [null, null, null, null, null]
  currentStep.value = 0
  showResult.value = false
}

useHead({
  title: '需求→范式推荐器 - AI 编程工具箱 | 找到最适合你的编程范式',
  meta: [
    { name: 'description', content: '回答 5 个问题，AI 编程范式推荐器帮你找到最适合的编程方式：Code Completion / Vibe Coding / Spec Coding / Agentic Coding。' }
  ]
})
</script>
