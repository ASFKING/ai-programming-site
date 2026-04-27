<template>
  <nav class="py-4 flex flex-col h-full">
    <div class="px-4 mb-4">
      <h3 class="text-xs font-semibold uppercase tracking-wider" style="color: var(--color-text-muted)">
        {{ sectionTitle }}
      </h3>
    </div>
    <ul class="space-y-1 flex-1">
      <li v-for="item in navItems" :key="item.path">
        <NuxtLink
          :to="item.path"
          class="flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-all duration-200"
          :class="isActive(item.path)
            ? 'bg-blue-500/20 text-blue-400'
            : 'hover:bg-black/5'"
          :style="isActive(item.path) ? '' : { color: 'var(--color-text-muted)' }"
        >
          <span v-if="item.icon" class="text-lg">{{ item.icon }}</span>
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>

    <!-- 相关推荐 -->
    <div v-if="relatedItems.length" class="mt-auto pt-4 px-4" style="border-top: 1px solid var(--color-border)">
      <p class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--color-text-secondary)">
        💡 相关推荐
      </p>
      <ul class="space-y-1">
        <li v-for="item in relatedItems" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all hover:bg-black/5 dark:hover:bg-white/5"
            style="color: var(--color-text-secondary)"
          >
            <span>{{ item.icon }}</span>
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const navItems = computed(() => {
  const path = route.path

  if (path.startsWith('/concepts')) {
    return [
      { name: '发展历程', path: '/concepts/history', icon: '📅' },
      { name: '核心概念', path: '/concepts/core', icon: '💡' }
    ]
  }

  if (path.startsWith('/tools')) {
    return [
      { name: '🧭 工具选型', path: '/tools', icon: '🧭' },
      { name: '🗺️ 工具选型器', path: '/tools/picker', icon: '🗺️' },
      { name: '📊 工具对比', path: '/tools/compare', icon: '📊' },
      { name: '🔥 Trae', path: '/tools/trae' },
      { name: '💻 Cursor', path: '/tools/cursor' },
      { name: '🤖 Claude Code', path: '/tools/claude-code' },
      { name: '🐙 GitHub Copilot', path: '/tools/github-copilot' },
      { name: '⚡ Codex', path: '/tools/codex' },
      { name: '🏄 Windsurf', path: '/tools/windsurf' },
      { name: '🛠️ Aider', path: '/tools/aider' },
      { name: '🚀 Antigravity', path: '/tools/antigravity' },
      { name: '⚡ Qoder', path: '/tools/qoder' },
      { name: '🦊 CodeBuddy', path: '/tools/codebuddy' }
    ]
  }

  if (path.startsWith('/paradigms')) {
    return [
      { name: 'Code Completion', path: '/paradigms/code-completion', icon: '⌨️' },
      { name: 'Vibe Coding', path: '/paradigms/vibe-coding', icon: '🎵' },
      { name: 'Spec Coding', path: '/paradigms/spec-coding', icon: '📋' },
      { name: 'Agentic Coding', path: '/paradigms/agentic-coding', icon: '🧠' }
    ]
  }

  if (path.startsWith('/methodology')) {
    return [
      { name: 'Chat 模式', path: '/methodology/chat-mode', icon: '💬' },
      { name: 'Plan 模式', path: '/methodology/plan-mode', icon: '📝' },
      { name: '个人规则', path: '/methodology/personal-rules', icon: '👤' },
      { name: '项目规则', path: '/methodology/project-rules', icon: '📁' },
      { name: 'AGENTS.md', path: '/methodology/agents-claude-md', icon: '📄' },
      { name: 'Skills', path: '/methodology/skills', icon: '⚡' },
      { name: 'Spec 驱动开发', path: '/methodology/spec-driven', icon: '📋' }
    ]
  }

  if (path.startsWith('/toolbox')) {
    return [
      { name: '🧠 上下文丢失可视化', path: '/toolbox/context-lost' },
      { name: '🔢 Token 估算器', path: '/toolbox/token-estimator' },
      { name: '📏 Prompt 膨胀计算器', path: '/toolbox/prompt-bloat' },
      { name: '🎯 范式推荐器', path: '/toolbox/paradigm-picker' }
    ]
  }

  if (path.startsWith('/trends')) {
    return [
      { name: '未来趋势', path: '/trends', icon: '🔮' }
    ]
  }

  return []
})

const relatedItems = computed(() => {
  const path = route.path
  if (path.startsWith('/concepts')) {
    return [
      { name: '工具对比', path: '/tools', icon: '🛠️' },
      { name: '编程范式', path: '/paradigms', icon: '🧩' }
    ]
  }
  if (path.startsWith('/tools')) {
    return [
      { name: '概念入门', path: '/concepts', icon: '📚' },
      { name: '编程范式', path: '/paradigms', icon: '🧩' }
    ]
  }
  if (path.startsWith('/paradigms')) {
    return [
      { name: '方法论', path: '/methodology', icon: '📋' },
      { name: '工具对比', path: '/tools', icon: '🛠️' }
    ]
  }
  if (path.startsWith('/methodology')) {
    return [
      { name: '编程范式', path: '/paradigms', icon: '🧩' },
      { name: '概念入门', path: '/concepts', icon: '📚' }
    ]
  }
  if (path.startsWith('/toolbox')) {
    return [
      { name: '概念入门', path: '/concepts', icon: '📚' },
      { name: '编程范式', path: '/paradigms', icon: '🧩' }
    ]
  }
  return []
})

const sectionTitle = computed(() => {
  const path = route.path
  if (path.startsWith('/concepts')) return '概念入门'
  if (path.startsWith('/tools')) return 'AI工具'
  if (path.startsWith('/paradigms')) return '编程范式'
  if (path.startsWith('/methodology')) return '方法论'
  if (path.startsWith('/toolbox')) return '工具箱'
  if (path.startsWith('/trends')) return '未来趋势'
  return '导航'
})

const isActive = (path: string) => {
  return route.path === path || route.path === path + '/'
}
</script>
