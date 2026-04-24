<template>
  <div class="capability-spectrum">
    <!-- 光谱标签 -->
    <div class="flex justify-between mb-2 text-xs font-medium" style="color: var(--color-text-muted)">
      <span class="text-center flex-1">补全</span>
      <span class="text-center flex-1">辅助</span>
      <span class="text-center flex-1">协作</span>
      <span class="text-center flex-1">Agent</span>
      <span class="text-center flex-1">自主</span>
    </div>

    <!-- 光谱条 -->
    <div class="relative h-3 rounded-full overflow-hidden mb-4" style="background: rgba(255,255,255,0.08)">
      <div class="absolute inset-0 flex">
        <div class="flex-1" style="background: linear-gradient(90deg, #22d3ee, #22d3ee)"></div>
        <div class="flex-1" style="background: linear-gradient(90deg, #22d3ee, #34d399)"></div>
        <div class="flex-1" style="background: linear-gradient(90deg, #34d399, #a78bfa)"></div>
        <div class="flex-1" style="background: linear-gradient(90deg, #a78bfa, #60a5fa)"></div>
        <div class="flex-1" style="background: linear-gradient(90deg, #60a5fa, #f87171)"></div>
      </div>
      <!-- 分割线 -->
      <div class="absolute top-0 bottom-0 w-px" style="left: 20%; background: rgba(0,0,0,0.3)"></div>
      <div class="absolute top-0 bottom-0 w-px" style="left: 40%; background: rgba(0,0,0,0.3)"></div>
      <div class="absolute top-0 bottom-0 w-px" style="left: 60%; background: rgba(0,0,0,0.3)"></div>
      <div class="absolute top-0 bottom-0 w-px" style="left: 80%; background: rgba(0,0,0,0.3)"></div>
    </div>

    <!-- 工具标记点 -->
    <div class="relative" :style="{ height: `${sortedTools.length * 28 + 8}px` }">
      <div
        v-for="(tool, index) in sortedTools"
        :key="tool.id"
        class="absolute flex items-center gap-2 transition-all duration-500"
        :style="{
          left: `${tool.capability.position}%`,
          top: `${index * 28}px`,
          transform: 'translateX(-50%)'
        }"
      >
        <!-- 标记点（可点击） -->
        <button
          @click="$emit('select', tool.id)"
          class="w-3 h-3 rounded-full border-2 transition-all shrink-0 cursor-pointer hover:scale-150"
          :class="isHighlighted(tool.id) ? 'scale-150 shadow-lg' : 'opacity-60'"
          :style="{
            borderColor: getCapabilityColor(tool.capability.level),
            backgroundColor: isHighlighted(tool.id) ? getCapabilityColor(tool.capability.level) : 'transparent',
            boxShadow: isHighlighted(tool.id) ? `0 0 12px ${getCapabilityColor(tool.capability.level)}` : 'none'
          }"
          :title="tool.name"
        ></button>
        <!-- 名称 -->
        <NuxtLink
          :to="`/tools/${tool.id}`"
          class="text-xs whitespace-nowrap transition-all"
          :class="isHighlighted(tool.id)
            ? 'font-bold'
            : 'opacity-60 hover:opacity-100'"
          :style="{
            color: isHighlighted(tool.id) ? getCapabilityColor(tool.capability.level) : 'var(--color-text-muted)'
          }"
        >
          {{ tool.icon }} {{ tool.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tools, getCapabilityColor } from '~/composables/useToolsData'

const props = defineProps<{
  highlightIds?: string[]
  selectedId?: string
}>()

const emit = defineEmits<{
  select: [toolId: string]
}>()

const sortedTools = computed(() => {
  return [...tools].sort((a, b) => a.capability.position - b.capability.position)
})

function isHighlighted(id: string): boolean {
  // 如果有 selectedId，优先用 selectedId
  if (props.selectedId) return props.selectedId === id
  if (!props.highlightIds || props.highlightIds.length === 0) return true
  return props.highlightIds.includes(id)
}
</script>
