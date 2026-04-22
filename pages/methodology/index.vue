<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">方法论</h1>
      <p class="text-gray-400">学习规范的AI编程方法和最佳实践</p>
    </div>

    <!-- 方法论列表 -->
    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="method in methods"
        :key="method.id"
        :to="`/methodology/${method.id}`"
        class="card group"
      >
        <div class="flex items-start justify-between mb-4">
          <span class="text-3xl">{{ method.icon }}</span>
          <span
            class="px-2 py-1 text-xs rounded-full"
            :class="method.difficulty === '入门' ? 'bg-green-500/20 text-green-400' :
                   method.difficulty === '进阶' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'"
          >
            {{ method.difficulty }}
          </span>
        </div>
        <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {{ method.name }}
        </h3>
        <p class="text-gray-400 text-sm mb-4">{{ method.description }}</p>
        <div class="text-sm text-gray-500">
          预计阅读时间: {{ method.readTime }}
        </div>
      </NuxtLink>
    </div>

    <!-- Spec-Driven 开发流程 -->
    <section class="mt-12 p-6 rounded-xl bg-[#1f2937] border border-[#334155]">
      <h2 class="text-xl font-semibold mb-6">Spec-Driven Development 流程</h2>
      <div class="space-y-4">
        <div v-for="(step, index) in specSteps" :key="index" class="flex gap-4">
          <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
            {{ index + 1 }}
          </div>
          <div>
            <h3 class="font-medium">{{ step.name }}</h3>
            <p class="text-gray-400 text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const methods = [
  {
    id: 'spec-driven',
    name: 'Spec驱动开发',
    icon: '📋',
    difficulty: '入门',
    description: '用结构化的Spec文档约束AI生成的边界，解决AI的"幻觉"问题',
    readTime: '5分钟'
  },
  {
    id: 'personal-rules',
    name: '个人规则配置',
    icon: '👤',
    difficulty: '入门',
    description: '配置个人化的AI编程规则，提升代码质量和一致性',
    readTime: '3分钟'
  },
  {
    id: 'project-rules',
    name: '项目规则配置',
    icon: '📁',
    difficulty: '进阶',
    description: '为项目设置专属规则，团队成员共享统一的编码规范',
    readTime: '5分钟'
  },
  {
    id: 'skills',
    name: 'Skills自定义',
    icon: '⚡',
    difficulty: '进阶',
    description: '创建自定义Skills，封装常用的AI编程工作流程',
    readTime: '8分钟'
  },
  {
    id: 'plan-mode',
    name: 'Plan模式',
    icon: '📝',
    difficulty: '进阶',
    description: '使用Plan模式让AI先规划再执行，减少返工和修改',
    readTime: '5分钟'
  },
  {
    id: 'chat-mode',
    name: 'Chat模式',
    icon: '💬',
    difficulty: '入门',
    description: '通过对话方式与AI协作，适合快速咨询和调试',
    readTime: '3分钟'
  }
]

const specSteps = [
  { name: '需求拆解', description: '与AI协作，明确需求边界、验收标准和技术栈' },
  { name: 'Spec编写', description: '编写结构化的spec文档，包含功能描述、数据模型、接口定义等' },
  { name: 'AI生成', description: '将spec文档输入AI工具，生成代码、测试用例、文档等' },
  { name: '人工评审', description: '评审AI生成的代码，检查逻辑正确性、安全漏洞、性能瓶颈' },
  { name: '测试调试', description: '运行测试用例，定位并修复问题' },
  { name: '迭代优化', description: '根据测试结果或业务需求，迭代spec文档与代码' }
]
</script>