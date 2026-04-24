<template>
  <!-- 搜索按钮触发器（保持在父容器内，响应式生效） -->
  <button
    v-if="!isOpen"
    @click="open"
    class="search-trigger"
    title="搜索 (⌘K)"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span class="hidden sm:inline">搜索</span>
    <kbd class="search-kbd hidden sm:inline">⌘K</kbd>
  </button>

  <!-- 遮罩 + 弹窗 Teleport 到 body -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="search-overlay" @click="close" />
    </Transition>

    <!-- 搜索弹窗 -->
    <Transition name="modal">
      <div v-if="isOpen" class="search-modal" @keydown.escape="close">
        <!-- 搜索输入框 -->
        <div class="search-input-wrapper">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref="searchInput"
            v-model="query"
            type="text"
            placeholder="搜索内容、工具、概念..."
            class="search-input"
            @keydown.enter="goToFirst"
            @keydown.down.prevent="moveSelection(1)"
            @keydown.up.prevent="moveSelection(-1)"
          />
          <kbd class="search-esc">ESC</kbd>
        </div>

        <!-- 搜索结果 -->
        <div v-if="query.length >= 2" class="search-results">
          <div v-if="loading" class="search-status">
            <span class="animate-pulse">搜索中...</span>
          </div>
          <div v-else-if="results.length === 0" class="search-status">
            没有找到 "{{ query }}" 的相关结果
          </div>
          <template v-else>
            <div class="search-status">
              找到 {{ results.length }} 个结果
            </div>
            <NuxtLink
              v-for="(result, index) in results"
              :key="result._path"
              :to="result._path"
              class="search-result-item"
              :class="{ active: selectedIndex === index }"
              @click="close"
              @mouseenter="selectedIndex = index"
            >
              <div class="search-result-icon">
                {{ getIcon(result._path) }}
              </div>
              <div class="search-result-content">
                <div class="search-result-title">{{ result.title }}</div>
                <div class="search-result-desc">{{ result.description }}</div>
                <div class="search-result-path">{{ getPathLabel(result._path) }}</div>
              </div>
              <svg class="search-result-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </template>
        </div>

        <!-- 快捷入口（无搜索时） -->
        <div v-else class="search-shortcuts">
          <div class="search-shortcut-title">快捷入口</div>
          <NuxtLink
            v-for="item in shortcuts"
            :key="item.path"
            :to="item.path"
            class="search-result-item"
            @click="close"
          >
            <div class="search-result-icon">{{ item.icon }}</div>
            <div class="search-result-content">
              <div class="search-result-title">{{ item.label }}</div>
              <div class="search-result-desc">{{ item.desc }}</div>
            </div>
          </NuxtLink>
        </div>

        <!-- 底部提示 -->
        <div class="search-footer">
          <span><kbd>↑↓</kbd> 导航</span>
          <span><kbd>Enter</kbd> 打开</span>
          <span><kbd>ESC</kbd> 关闭</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const query = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const selectedIndex = ref(0)
const searchInput = ref<HTMLInputElement>()

const shortcuts = [
  { icon: '📚', label: '概念入门', desc: '了解 AI 编程全貌', path: '/concepts' },
  { icon: '🛠️', label: '工具选型', desc: '10+ 工具对比', path: '/tools' },
  { icon: '🧩', label: '编程范式', desc: '四大范式详解', path: '/paradigms' },
  { icon: '📋', label: '方法论', desc: 'Spec 驱动开发', path: '/methodology' },
]

const open = () => {
  isOpen.value = true
  query.value = ''
  results.value = []
  selectedIndex.value = 0
  nextTick(() => searchInput.value?.focus())
}

const close = () => {
  isOpen.value = false
  query.value = ''
}

const getIcon = (path: string) => {
  if (path?.includes('/tools/')) return '🛠️'
  if (path?.includes('/concepts/')) return '📚'
  if (path?.includes('/paradigms/')) return '🧩'
  if (path?.includes('/methodology/')) return '📋'
  if (path?.includes('/about')) return '📖'
  return '📄'
}

const getPathLabel = (path: string) => {
  const parts = path?.split('/').filter(Boolean) || []
  const labels: Record<string, string> = {
    tools: '工具',
    concepts: '概念',
    paradigms: '范式',
    methodology: '方法论',
    about: '关于'
  }
  return parts.map(p => labels[p] || p).join(' / ')
}

const moveSelection = (delta: number) => {
  const max = results.value.length - 1
  selectedIndex.value = Math.max(0, Math.min(max, selectedIndex.value + delta))
}

const goToFirst = () => {
  if (results.value.length > 0) {
    const item = results.value[selectedIndex.value]
    if (item?._path) {
      navigateTo(item._path)
      close()
    }
  }
}

// 防抖搜索
let searchTimeout: ReturnType<typeof setTimeout>
watch(query, (val) => {
  clearTimeout(searchTimeout)
  if (val.length < 2) {
    results.value = []
    return
  }
  loading.value = true
  searchTimeout = setTimeout(async () => {
    try {
      const data = await queryContent()
        .where({
          $or: [
            { title: { $icontains: val } },
            { description: { $icontains: val } },
            { body: { $icontains: val } }
          ]
        })
        .only(['_path', 'title', 'description'])
        .limit(10)
        .find()
      results.value = data
      selectedIndex.value = 0
    } catch (e) {
      results.value = []
    } finally {
      loading.value = false
    }
  }, 300)
})

// 全局快捷键 ⌘K / Ctrl+K
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      if (isOpen.value) close()
      else open()
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<style scoped>
/* ─── 触发按钮 ─── */
.search-trigger {
  position: fixed;
  top: 0.5rem;
  right: 6.5rem;
  z-index: 51;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-trigger:hover {
  color: var(--color-text-secondary);
  border-color: var(--color-border-hover);
  background: var(--color-bg-elevated);
}

@media (max-width: 768px) {
  .search-trigger {
    right: 4.5rem;
  }
}

.search-kbd {
  padding: 0.1rem 0.35rem;
  font-size: 0.65rem;
  font-family: inherit;
  color: var(--color-text-muted);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
}

/* ─── 遮罩 ─── */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* ─── 弹窗 ─── */
.search-modal {
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 90%;
  max-width: 580px;
  background: var(--color-bg-base);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* ─── 输入区 ─── */
.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--color-text-primary);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-esc {
  padding: 0.125rem 0.375rem;
  font-size: 0.65rem;
  font-family: inherit;
  color: var(--color-text-muted);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
}

/* ─── 结果列表 ─── */
.search-results {
  max-height: 50vh;
  overflow-y: auto;
}

.search-status {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border-subtle);
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: background 0.15s ease;
  border-bottom: 1px solid var(--color-border-subtle);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover,
.search-result-item.active {
  background: var(--color-bg-surface);
}

.search-result-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  width: 2rem;
  text-align: center;
}

.search-result-content {
  flex: 1;
  min-width: 0;
}

.search-result-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 0.125rem;
}

.search-result-desc {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-result-path {
  font-size: 0.7rem;
  color: var(--color-accent-primary);
  opacity: 0.7;
  margin-top: 0.125rem;
}

.search-result-arrow {
  width: 1rem;
  height: 1rem;
  color: var(--color-text-muted);
  opacity: 0;
  flex-shrink: 0;
}

.search-result-item.active .search-result-arrow,
.search-result-item:hover .search-result-arrow {
  opacity: 1;
}

/* ─── 快捷入口 ─── */
.search-shortcuts {
  max-height: 50vh;
  overflow-y: auto;
}

.search-shortcut-title {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ─── 底部 ─── */
.search-footer {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-surface);
}

.search-footer kbd {
  padding: 0.0625rem 0.25rem;
  font-size: 0.65rem;
  font-family: inherit;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.2rem;
}

/* ─── 动画 ─── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.modal-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.modal-enter-from { opacity: 0; transform: translateX(-50%) scale(0.96); }
.modal-leave-to { opacity: 0; transform: translateX(-50%) scale(0.96); }
.modal-enter-to, .modal-leave-from { opacity: 1; transform: translateX(-50%) scale(1); }

/* ─── 移动端适配 ─── */
@media (max-width: 640px) {
  .search-modal {
    top: 10vh;
    width: 95%;
  }
  .search-footer {
    gap: 0.5rem;
    font-size: 0.65rem;
  }
}
</style>
