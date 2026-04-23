<template>
  <nav class="py-4">
    <div class="px-4 mb-4">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {{ sectionTitle }}
      </h3>
    </div>
    <ul class="space-y-1">
      <li v-for="item in navItems" :key="item.path">
        <NuxtLink
          :to="item.path"
          class="flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-all duration-200"
          :class="isActive(item.path)
            ? 'bg-blue-500/20 text-blue-400'
            : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'"
        >
          <span v-if="item.icon" class="text-lg">{{ item.icon }}</span>
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
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
      { name: '工具列表', path: '/tools', icon: '🛠️' },
      { name: 'Trae', path: '/tools/trae', icon: '🔥' },
      { name: 'Cursor', path: '/tools/cursor', icon: '💻' },
      { name: 'Claude Code', path: '/tools/claude-code', icon: '🤖' }
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

  if (path.startsWith('/trends')) {
    return [
      { name: '未来趋势', path: '/trends', icon: '🔮' }
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
  if (path.startsWith('/trends')) return '未来趋势'
  return '导航'
})

const isActive = (path: string) => {
  return route.path === path || route.path === path + '/'
}
</script>