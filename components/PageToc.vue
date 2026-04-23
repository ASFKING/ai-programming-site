<template>
  <nav v-if="toc && toc.length > 0" class="toc-container">
    <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
      目录
    </h4>
    <ul class="space-y-0.5">
      <li v-for="item in flatToc" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="toc-link"
          :class="[
            item.depth === 3 ? 'depth-3' : '',
            { active: activeId === item.id }
          ]"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
  children?: TocItem[]
}

const props = defineProps<{
  toc: TocItem[]
}>()

const activeId = ref('')

// 扁平化 TOC 树
const flatToc = computed(() => {
  const result: TocItem[] = []
  const walk = (items: TocItem[]) => {
    for (const item of items) {
      if (item.depth >= 2 && item.depth <= 3) {
        result.push(item)
      }
      if (item.children) walk(item.children)
    }
  }
  if (props.toc) walk(props.toc)
  return result
})

// 平滑滚动到目标
const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80 // 顶部导航高度 + 间距
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// 监听滚动，高亮当前章节
let observer: IntersectionObserver | null = null

onMounted(() => {
  const headings = flatToc.value
    .map(item => document.getElementById(item.id))
    .filter(Boolean) as HTMLElement[]

  if (headings.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    }
  )

  headings.forEach(el => observer!.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
