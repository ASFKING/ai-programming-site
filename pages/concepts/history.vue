<template>
  <div class="space-y-8 relative">
    <!-- 浮动导航栏 - 桌面端右侧 -->
    <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
      <!-- 阶段导航按钮 -->
      <button @click="scrollToSection('stage1')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeStage === 'stage1'
          ? 'bg-blue-500/30 border-blue-500/50 text-blue-400 scale-110'
          : 'theme-bg-surface border-white/10 theme-text-muted hover:bg-blue-500/10 hover:border-blue-500/30'
      ]" title="第一阶段：辅助时代">
        ⌨️
      </button>
      <button @click="scrollToSection('stage2')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeStage === 'stage2'
          ? 'bg-purple-500/30 border-purple-500/50 text-purple-400 scale-110'
          : 'theme-bg-surface border-white/10 theme-text-muted hover:bg-purple-500/10 hover:border-purple-500/30'
      ]" title="第二阶段：对话时代">
        💬
      </button>
      <button @click="scrollToSection('stage3')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeStage === 'stage3'
          ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-400 scale-110'
          : 'theme-bg-surface border-white/10 theme-text-muted hover:bg-cyan-500/10 hover:border-cyan-500/30'
      ]" title="第三阶段：智能体时代">
        🤖
      </button>
      <button @click="scrollToSection('milestones')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeStage === 'milestones'
          ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-white/30 text-white scale-110'
          : 'theme-bg-surface border-white/10 theme-text-muted hover:bg-white/5 hover:border-white/20'
      ]" title="里程碑总表">
        📋
      </button>

      <!-- 分隔线 -->
      <div class="w-8 h-px theme-border mx-auto my-1"></div>

      <!-- 回到顶部按钮 -->
      <button @click="scrollToTop"
        class="w-12 h-12 rounded-xl flex items-center justify-center text-lg theme-bg-surface border border-white/10 theme-text-muted hover:theme-border hover:border-white/30 hover:text-white transition-all duration-300"
        title="回到顶部">
        ⬆️
      </button>
    </nav>

    <!-- 浮动导航栏 - 移动端底部 -->
    <nav class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden">
      <div
        class="flex items-center gap-1 p-2 bg-[#111827]/95 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
        <button @click="scrollToSection('stage1')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeStage === 'stage1'
            ? 'bg-blue-500/20 text-blue-400'
            : 'theme-text-muted hover:bg-white/5'
        ]">
          <span class="text-lg">⌨️</span>
          <span class="text-[10px]">辅助</span>
        </button>
        <button @click="scrollToSection('stage2')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeStage === 'stage2'
            ? 'bg-purple-500/20 text-purple-400'
            : 'theme-text-muted hover:bg-white/5'
        ]">
          <span class="text-lg">💬</span>
          <span class="text-[10px]">对话</span>
        </button>
        <button @click="scrollToSection('stage3')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeStage === 'stage3'
            ? 'bg-cyan-500/20 text-cyan-400'
            : 'theme-text-muted hover:bg-white/5'
        ]">
          <span class="text-lg">🤖</span>
          <span class="text-[10px]">智能</span>
        </button>
        <button @click="scrollToSection('milestones')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeStage === 'milestones'
            ? 'theme-border text-white'
            : 'theme-text-muted hover:bg-white/5'
        ]">
          <span class="text-lg">📋</span>
          <span class="text-[10px]">总表</span>
        </button>
        <div class="w-px h-8 theme-border mx-1"></div>
        <button @click="scrollToTop"
          class="px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 theme-text-muted hover:bg-white/5 transition-all duration-300 min-w-[50px]">
          <span class="text-lg">⬆️</span>
          <span class="text-[10px]">顶部</span>
        </button>
      </div>
    </nav>

    <!-- 页面头部 -->
    <div
      class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 border border-white/10 p-8">
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50">
      </div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-4xl">🚀</span>
          <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">三次跃迁</span>
        </div>
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          AI编程发展历程
        </h1>
        <p class="text-xl theme-text-muted max-w-3xl">
          从辅助到自主的三次跃迁，2026年Agentic Engineering的变革意义
        </p>
        <div class="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <p class="theme-text-secondary italic">
            <span class="text-blue-400 font-semibold">核心洞察：</span>
            AI编程的演进不是渐进式改良，而是三次"能力跃迁"——每一次都重新定义了"写代码"的含义。2026年，我们正站在第三次跃迁的起点。
          </p>
        </div>
      </div>
    </div>

    <!-- 时间轴导航卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a href="#stage1"
        class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
        <div class="relative">
          <div class="text-3xl mb-3">⌨️</div>
          <h3 class="text-lg font-semibold text-blue-400 mb-1">第一阶段</h3>
          <p class="text-sm theme-text-muted">辅助时代（2018-2023）</p>
          <p class="text-xs theme-text-muted mt-2">AI是你的"智能输入法"</p>
        </div>
      </a>

      <a href="#stage2"
        class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300">
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
        <div class="relative">
          <div class="text-3xl mb-3">💬</div>
          <h3 class="text-lg font-semibold text-purple-400 mb-1">第二阶段</h3>
          <p class="text-sm theme-text-muted">对话时代（2024-2025）</p>
          <p class="text-xs theme-text-muted mt-2">AI是你的"结对程序员"</p>
        </div>
      </a>

      <a href="#stage3"
        class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all duration-300">
        <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
        <div class="relative">
          <div class="text-3xl mb-3">🤖</div>
          <h3 class="text-lg font-semibold text-cyan-400 mb-1">第三阶段</h3>
          <p class="text-sm theme-text-muted">智能体时代（2026-至今）</p>
          <p class="text-xs theme-text-muted mt-2">AI是你的"全栈工程师团队"</p>
        </div>
      </a>
    </div>

    <!-- 阶段一：辅助时代 -->
    <section id="stage1" class="scroll-mt-24">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">⌨️</div>
        <div>
          <h2 class="text-2xl font-bold text-blue-400">阶段一：辅助时代（2018-2023）</h2>
          <p class="theme-text-muted italic">AI是你的"智能输入法"</p>
        </div>
      </div>

      <!-- 核心特征卡片 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm">📊</span>
          核心特征
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-blue-400 font-medium">交互模式</span>
            <p class="theme-text-muted text-sm mt-1">被动补全：写代码时按Tab键触发建议</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-blue-400 font-medium">能力边界</span>
            <p class="theme-text-muted text-sm mt-1">单行/代码块级别，缺乏上下文理解</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-blue-400 font-medium">用户角色</span>
            <p class="theme-text-muted text-sm mt-1">完全主导，AI是"加速键盘"</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-blue-400 font-medium">技术基础</span>
            <p class="theme-text-muted text-sm mt-1">基于统计的代码补全模型（n-gram、LSTM）</p>
          </div>
        </div>
      </div>

      <!-- 里程碑时间轴 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm">🎯</span>
          关键里程碑
        </h3>

        <!-- 2018 TabNine -->
        <div class="relative pl-8 border-l-2 border-blue-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-blue-500 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">2018年</span>
              <h4 class="text-lg font-semibold">TabNine发布</h4>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="text-green-400">意义：</span><span class="theme-text-secondary">首个基于深度学习的代码补全工具</span></p>
              <p><span class="text-blue-400">突破：</span><span class="theme-text-secondary">使用神经网络预测下一行代码，超越传统IDE规则补全</span></p>
              <p><span class="text-red-400">局限：</span><span class="theme-text-secondary">仅支持局部上下文，无法理解项目整体架构</span></p>
            </div>
          </div>
        </div>

        <!-- 2021 Copilot -->
        <div class="relative pl-8 border-l-2 border-blue-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-blue-500 border-4 border-[#111827]">
          </div>
          <div class="card border-blue-500/30">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">2021年6月</span>
              <h4 class="text-lg font-semibold">GitHub Copilot发布</h4>
              <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs">⭐ iPhone时刻</span>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="text-green-400">意义：</span><span
                  class="theme-text-secondary">AI编程的"iPhone时刻"，标志着AI编程正式进入工业化应用阶段</span></p>
              <div class="p-3 bg-white/5 rounded-lg">
                <p class="text-blue-400 mb-2">核心突破：</p>
                <ul class="space-y-1 theme-text-secondary list-disc list-inside">
                  <li>基于OpenAI Codex模型（GPT-3微调）</li>
                  <li>支持整函数生成、注释转代码</li>
                  <li>集成GitHub全库训练数据</li>
                </ul>
              </div>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">生成30%+新代码</span>
                <span class="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">1200万+用户</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2022 Copilot商业化 -->
        <div class="relative pl-8 border-l-2 border-blue-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-blue-500/50 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">2022年</span>
              <h4 class="text-lg font-semibold">Copilot商业化</h4>
            </div>
            <p class="text-sm theme-text-secondary">个人版$10/月，企业版$19/月 —— 证明AI编程工具的付费可行性</p>
          </div>
        </div>
      </div>

      <!-- 时代局限 -->
      <div class="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
        <h4 class="text-red-400 font-semibold mb-2 flex items-center gap-2">
          <span>⚠️</span> 时代局限
        </h4>
        <blockquote class="theme-text-muted italic border-l-2 border-red-500/30 pl-4 mb-3">
          "Copilot就像一个有经验的初级开发者坐在你旁边——它能帮你写循环，但无法理解你为什么要写这个循环。"
        </blockquote>
        <ul class="space-y-1 text-sm theme-text-muted">
          <li class="flex items-center gap-2"><span class="text-red-400">❌</span> 无法处理跨文件依赖</li>
          <li class="flex items-center gap-2"><span class="text-red-400">❌</span> 不能理解自然语言需求文档</li>
          <li class="flex items-center gap-2"><span class="text-red-400">❌</span> 生成代码后需要人工验证和集成</li>
        </ul>
      </div>

      <!-- 下一节导航 -->
      <div class="mt-8 flex justify-center">
        <button @click="scrollToSection('stage2')"
          class="group flex items-center gap-3 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
          <span class="theme-text-muted group-hover:text-purple-400 transition-colors">查看下一阶段</span>
          <span class="text-xl group-hover:translate-y-1 transition-transform">💬</span>
          <span class="text-purple-400 font-medium">对话时代</span>
          <svg class="w-5 h-5 text-purple-400 group-hover:translate-y-1 transition-transform" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- 阶段二：对话时代 -->
    <section id="stage2" class="scroll-mt-24">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">💬</div>
        <div>
          <h2 class="text-2xl font-bold text-purple-400">阶段二：对话时代（2024-2025）</h2>
          <p class="theme-text-muted italic">AI是你的"结对程序员"</p>
        </div>
      </div>

      <!-- 核心特征卡片 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm">📊</span>
          核心特征
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-purple-400 font-medium">交互模式</span>
            <p class="theme-text-muted text-sm mt-1">主动对话：用自然语言描述需求，AI生成完整模块</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-purple-400 font-medium">能力边界</span>
            <p class="theme-text-muted text-sm mt-1">文件/模块级别，支持多轮迭代</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-purple-400 font-medium">用户角色</span>
            <p class="theme-text-muted text-sm mt-1">架构师+审阅者，AI是"执行者"</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-purple-400 font-medium">技术基础</span>
            <p class="theme-text-muted text-sm mt-1">大语言模型（GPT-4、Claude 3）+ 代码专用优化</p>
          </div>
        </div>
      </div>

      <!-- 里程碑时间轴 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm">🎯</span>
          关键里程碑
        </h3>

        <!-- 2023 GPT-4 -->
        <div class="relative pl-8 border-l-2 border-purple-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-purple-500 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">2023年3月</span>
              <h4 class="text-lg font-semibold">GPT-4发布</h4>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="text-green-400">意义：</span><span class="theme-text-secondary">首次具备"理解复杂需求并生成可运行代码"的能力</span></p>
              <div class="p-3 bg-white/5 rounded-lg">
                <p class="text-purple-400 mb-2">核心突破：</p>
                <ul class="space-y-1 theme-text-secondary list-disc list-inside">
                  <li>通过LeetCode困难题测试</li>
                  <li>能理解伪代码并转换为多种编程语言</li>
                  <li>支持代码解释、调试、优化建议</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 2024 Cursor -->
        <div class="relative pl-8 border-l-2 border-purple-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-purple-500 border-4 border-[#111827]">
          </div>
          <div class="card border-purple-500/30">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">2024年1月</span>
              <h4 class="text-lg font-semibold">Cursor崛起</h4>
              <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs">🔥 用户增长10倍</span>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="text-green-400">意义：</span><span class="theme-text-secondary">重新定义AI编程的交互范式，成为开发者首选AI工具</span></p>
              <div class="p-3 bg-white/5 rounded-lg">
                <p class="text-purple-400 mb-2">核心突破：</p>
                <ul class="space-y-1 theme-text-secondary list-disc list-inside">
                  <li>基于VS Code深度集成，无缝替代传统IDE</li>
                  <li><strong>Composer功能</strong>：AI直接读写多个文件</li>
                  <li><strong>Agent模式</strong>：AI可自主执行终端命令、修复错误</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 2024 Claude 3 -->
        <div class="relative pl-8 border-l-2 border-purple-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-purple-500 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">2024年3月</span>
              <h4 class="text-lg font-semibold">Claude 3发布</h4>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="text-green-400">意义：</span><span class="theme-text-secondary">代码理解能力质的飞跃，支持代码库级分析</span></p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs">20万token上下文</span>
                <span class="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs">后扩展至200万</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2024 Vibe Coding -->
        <div class="relative pl-8 border-l-2 border-purple-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-purple-500 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">2024年</span>
              <h4 class="text-lg font-semibold">Vibe Coding概念兴起</h4>
            </div>
            <div class="space-y-2 text-sm theme-text-secondary">
              <p><span class="text-purple-400">定义：</span>由Andrej Karpathy提出，指"完全用自然语言描述需求，AI负责全部编码"</p>
              <p><span class="text-purple-400">特征：</span>开发者不再手写代码，而是通过对话"vibe"出产品</p>
            </div>
          </div>
        </div>

        <!-- 2025 多模型竞争 -->
        <div class="relative pl-8 border-l-2 border-purple-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-purple-500/50 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">2025年</span>
              <h4 class="text-lg font-semibold">多模型竞争格局形成</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div class="p-3 bg-white/5 rounded-lg text-center">
                <p class="font-semibold text-purple-400">Cursor</p>
                <p class="text-xs theme-text-muted">深度IDE集成</p>
              </div>
              <div class="p-3 bg-white/5 rounded-lg text-center">
                <p class="font-semibold text-purple-400">Windsurf</p>
                <p class="text-xs theme-text-muted">实时协作</p>
              </div>
              <div class="p-3 bg-white/5 rounded-lg text-center">
                <p class="font-semibold text-purple-400">Claude Code</p>
                <p class="text-xs theme-text-muted">代码库级理解</p>
              </div>
              <div class="p-3 bg-white/5 rounded-lg text-center">
                <p class="font-semibold text-purple-400">Trae</p>
                <p class="text-xs theme-text-muted">中文优化</p>
              </div>
              <div class="p-3 bg-white/5 rounded-lg text-center">
                <p class="font-semibold text-purple-400">Copilot Chat</p>
                <p class="text-xs theme-text-muted">生态整合</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 时代局限 -->
      <div class="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
        <h4 class="text-red-400 font-semibold mb-2 flex items-center gap-2">
          <span>⚠️</span> 时代局限
        </h4>
        <blockquote class="theme-text-muted italic border-l-2 border-red-500/30 pl-4 mb-3">
          "Vibe Coding能帮你快速搭建原型，但当项目超过5000行代码，AI就会'失忆'——它不记得三周前写的那个工具函数。"
        </blockquote>
        <ul class="space-y-1 text-sm theme-text-muted">
          <li class="flex items-center gap-2"><span class="text-red-400">❌</span> 长期记忆缺失：无法持续维护大型项目</li>
          <li class="flex items-center gap-2"><span class="text-red-400">❌</span> 架构设计薄弱：擅长实现细节，不擅长系统架构</li>
          <li class="flex items-center gap-2"><span class="text-red-400">❌</span> 自主执行受限：需要人类确认每一步操作</li>
        </ul>
      </div>

      <!-- 下一节导航 -->
      <div class="mt-8 flex justify-center">
        <button @click="scrollToSection('stage3')"
          class="group flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
          <span class="theme-text-muted group-hover:text-cyan-400 transition-colors">查看下一阶段</span>
          <span class="text-xl group-hover:translate-y-1 transition-transform">🤖</span>
          <span class="text-cyan-400 font-medium">智能体时代</span>
          <svg class="w-5 h-5 text-cyan-400 group-hover:translate-y-1 transition-transform" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- 阶段三：智能体时代 -->
    <section id="stage3" class="scroll-mt-24">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl">🤖</div>
        <div>
          <h2 class="text-2xl font-bold text-cyan-400">阶段三：智能体时代（2026-至今）</h2>
          <p class="theme-text-muted italic">AI是你的"全栈工程师团队"</p>
        </div>
      </div>

      <!-- 2026标志事件 -->
      <div class="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-2xl">🚀</span>
          <span class="text-cyan-400 font-bold">2026年标志事件</span>
        </div>
        <p class="theme-text-secondary">Anthropic提出"Agentic Engineering"概念，AI编程从"工具"进化为"代理"。</p>
      </div>

      <!-- 核心特征卡片 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm">📊</span>
          核心特征
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-cyan-400 font-medium">交互模式</span>
            <p class="theme-text-muted text-sm mt-1">目标驱动：描述业务目标，AI自主拆解、执行、交付</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-cyan-400 font-medium">能力边界</span>
            <p class="theme-text-muted text-sm mt-1">项目/系统级别，支持端到端交付</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-cyan-400 font-medium">用户角色</span>
            <p class="theme-text-muted text-sm mt-1">产品经理+验收者，AI是"自组织团队"</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <span class="text-cyan-400 font-medium">技术基础</span>
            <p class="theme-text-muted text-sm mt-1">智能体架构 + 多模型协作 + 长期记忆</p>
          </div>
        </div>
      </div>

      <!-- 里程碑时间轴 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm">🎯</span>
          关键里程碑
        </h3>

        <!-- 2026 Claude Code -->
        <div class="relative pl-8 border-l-2 border-cyan-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-cyan-500 border-4 border-[#111827]">
          </div>
          <div class="card border-cyan-500/30">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium">2026年Q1</span>
              <h4 class="text-lg font-semibold">Claude Code正式发布</h4>
              <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs">⭐ 首个代码库级AI智能体</span>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="text-green-400">意义：</span><span class="theme-text-secondary">首个"代码库级"AI智能体，支持长期会话和项目记忆</span></p>
              <div class="p-3 bg-white/5 rounded-lg">
                <p class="text-cyan-400 mb-2">场景示例：</p>
                <div class="theme-text-secondary text-xs space-y-1">
                  <p><span class="text-cyan-400">人类：</span>"把这个Python项目迁移到TypeScript，保持所有测试通过"</p>
                  <p><span class="text-cyan-400">AI：</span></p>
                  <ol class="list-decimal list-inside ml-4 space-y-0.5">
                    <li>分析项目结构</li>
                    <li>制定迁移计划</li>
                    <li>逐文件转换</li>
                    <li>运行测试并修复错误</li>
                    <li>提交PR并撰写说明文档</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2026 多智能体协作 -->
        <div class="relative pl-8 border-l-2 border-cyan-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-cyan-500 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium">2026年</span>
              <h4 class="text-lg font-semibold">多智能体协作架构成熟</h4>
            </div>
            <p class="text-sm theme-text-secondary mb-3"><span class="text-cyan-400">范式转变：</span>从"一个AI帮你写代码"到"AI团队协作开发"</p>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div class="p-2 bg-cyan-500/10 rounded text-center">
                <p class="text-xs font-semibold text-cyan-400">架构师Agent</p>
                <p class="text-[10px] theme-text-muted">系统设计</p>
              </div>
              <div class="p-2 bg-cyan-500/10 rounded text-center">
                <p class="text-xs font-semibold text-cyan-400">前端Agent</p>
                <p class="text-[10px] theme-text-muted">UI实现</p>
              </div>
              <div class="p-2 bg-cyan-500/10 rounded text-center">
                <p class="text-xs font-semibold text-cyan-400">后端Agent</p>
                <p class="text-[10px] theme-text-muted">API开发</p>
              </div>
              <div class="p-2 bg-cyan-500/10 rounded text-center">
                <p class="text-xs font-semibold text-cyan-400">测试Agent</p>
                <p class="text-[10px] theme-text-muted">自动化测试</p>
              </div>
              <div class="p-2 bg-cyan-500/10 rounded text-center">
                <p class="text-xs font-semibold text-cyan-400">DevOps Agent</p>
                <p class="text-[10px] theme-text-muted">部署监控</p>
              </div>
            </div>
          </div>
        </div>

        <!-- L4-L5级自动化 -->
        <div class="relative pl-8 border-l-2 border-cyan-500/30">
          <div
            class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-cyan-500/50 border-4 border-[#111827]">
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium">2026年</span>
              <h4 class="text-lg font-semibold">L4-L5级自动化实现</h4>
            </div>
            <p class="text-sm theme-text-muted mb-3">根据行业分级标准，2026年正式进入<span class="text-cyan-400">项目级自动化</span>阶段：</p>
            <div class="grid grid-cols-5 gap-2 text-center text-xs">
              <div class="p-2 bg-green-500/10 rounded">
                <p class="text-green-400 font-semibold">L1</p>
                <p class="theme-text-muted">代码补全</p>
                <p class="text-green-400">✓ 2018</p>
              </div>
              <div class="p-2 bg-green-500/10 rounded">
                <p class="text-green-400 font-semibold">L2</p>
                <p class="theme-text-muted">任务级</p>
                <p class="text-green-400">✓ 2024</p>
              </div>
              <div class="p-2 bg-green-500/10 rounded">
                <p class="text-green-400 font-semibold">L3</p>
                <p class="theme-text-muted">项目级</p>
                <p class="text-green-400">✓ 2026</p>
              </div>
              <div class="p-2 bg-yellow-500/10 rounded">
                <p class="text-yellow-400 font-semibold">L4</p>
                <p class="theme-text-muted">全流程</p>
                <p class="text-yellow-400">🔄 2026</p>
              </div>
              <div class="p-2 bg-blue-500/10 rounded">
                <p class="text-blue-400 font-semibold">L5</p>
                <p class="theme-text-muted">AI团队</p>
                <p class="text-blue-400">🆕 新兴</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Agentic Engineering核心特征 -->
      <div class="mt-6 card">
        <h3 class="text-lg font-semibold mb-4 text-cyan-400">Agentic Engineering核心特征</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold text-cyan-400 mb-2">1. 自主任务拆解</h4>
            <p class="text-sm theme-text-muted">AI不再等待人类指令，而是主动规划多阶段任务并执行</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold text-cyan-400 mb-2">2. 长期运行能力</h4>
            <p class="text-sm theme-text-muted">可持续工作数小时甚至数天，支持"断点续传"</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold text-cyan-400 mb-2">3. 工具链深度集成</h4>
            <p class="text-sm theme-text-muted">操作终端、数据库、云服务、协作工具等</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold text-cyan-400 mb-2">4. 人机协作新模式</h4>
            <p class="text-sm theme-text-muted">自动驾驶/副驾驶/评审三种模式灵活切换</p>
          </div>
        </div>
      </div>

      <!-- 下一节导航 -->
      <div class="mt-8 flex justify-center">
        <button @click="scrollToSection('milestones')"
          class="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/20 rounded-xl hover:bg-white/5 hover:border-white/40 transition-all duration-300">
          <span class="theme-text-muted group-hover:text-white transition-colors">查看完整</span>
          <span class="text-xl group-hover:translate-y-1 transition-transform">📋</span>
          <span class="text-white font-medium">里程碑总表</span>
          <svg class="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- 里程碑总表 -->
    <section id="milestones" class="scroll-mt-24">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
        <span
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-xl">📋</span>
        里程碑总表
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-3 px-4 theme-text-muted font-medium">年份</th>
              <th class="text-left py-3 px-4 theme-text-muted font-medium">事件</th>
              <th class="text-left py-3 px-4 theme-text-muted font-medium">阶段</th>
              <th class="text-left py-3 px-4 theme-text-muted font-medium">意义</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr class="hover:bg-white/5">
              <td class="py-3 px-4 text-blue-400">2018</td>
              <td class="py-3 px-4 theme-text-secondary">TabNine发布</td>
              <td class="py-3 px-4"><span class="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">辅助时代</span>
              </td>
              <td class="py-3 px-4 theme-text-muted">深度学习首次用于代码补全</td>
            </tr>
            <tr class="hover:bg-white/5">
              <td class="py-3 px-4 text-blue-400">2021</td>
              <td class="py-3 px-4 theme-text-secondary">GitHub Copilot发布</td>
              <td class="py-3 px-4"><span class="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">辅助时代</span>
              </td>
              <td class="py-3 px-4 theme-text-muted">AI编程商业化起点</td>
            </tr>
            <tr class="hover:bg-white/5">
              <td class="py-3 px-4 text-purple-400">2023</td>
              <td class="py-3 px-4 theme-text-secondary">GPT-4发布</td>
              <td class="py-3 px-4"><span class="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs">对话时代</span>
              </td>
              <td class="py-3 px-4 theme-text-muted">大模型具备复杂代码能力</td>
            </tr>
            <tr class="hover:bg-white/5">
              <td class="py-3 px-4 text-purple-400">2024</td>
              <td class="py-3 px-4 theme-text-secondary">Cursor/Claude 3崛起</td>
              <td class="py-3 px-4"><span class="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs">对话时代</span>
              </td>
              <td class="py-3 px-4 theme-text-muted">Vibe Coding范式确立</td>
            </tr>
            <tr class="hover:bg-white/5">
              <td class="py-3 px-4 text-purple-400">2025</td>
              <td class="py-3 px-4 theme-text-secondary">多模型竞争</td>
              <td class="py-3 px-4"><span class="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs">对话时代</span>
              </td>
              <td class="py-3 px-4 theme-text-muted">工具生态爆发</td>
            </tr>
            <tr class="hover:bg-white/5 bg-cyan-500/5">
              <td class="py-3 px-4 text-cyan-400 font-bold">2026</td>
              <td class="py-3 px-4 theme-text-secondary font-semibold">Agentic Engineering元年</td>
              <td class="py-3 px-4"><span class="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs">智能体时代</span>
              </td>
              <td class="py-3 px-4 text-cyan-400">AI从工具进化为代理</td>
            </tr>
            <tr class="hover:bg-white/5">
              <td class="py-3 px-4 text-cyan-400">2026</td>
              <td class="py-3 px-4 theme-text-secondary">Claude Code正式发布</td>
              <td class="py-3 px-4"><span class="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs">智能体时代</span>
              </td>
              <td class="py-3 px-4 theme-text-muted">首个代码库级AI智能体</td>
            </tr>
            <tr class="hover:bg-white/5">
              <td class="py-3 px-4 text-cyan-400">2027+</td>
              <td class="py-3 px-4 theme-text-secondary">L5级自主开发</td>
              <td class="py-3 px-4"><span
                  class="px-2 py-1 rounded bg-gradient-to-r from-purple-500/10 to-cyan-500/10 theme-text-secondary text-xs">未来</span>
              </td>
              <td class="py-3 px-4 theme-text-muted">AI完全自主的软件开发</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 给开发者的建议 -->
    <section class="card bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
        <span class="text-2xl">💡</span>
        给开发者的建议
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="p-4 bg-white/5 rounded-lg">
          <h4 class="font-semibold text-blue-400 mb-2">还在用传统IDE?</h4>
          <p class="text-sm theme-text-muted">立即尝试Cursor/Windsurf，体验L2级能力</p>
        </div>
        <div class="p-4 bg-white/5 rounded-lg">
          <h4 class="font-semibold text-purple-400 mb-2">熟练使用Copilot?</h4>
          <p class="text-sm theme-text-muted">探索Composer/Agent模式，进入L3级</p>
        </div>
        <div class="p-4 bg-white/5 rounded-lg">
          <h4 class="font-semibold text-cyan-400 mb-2">已在使用AI对话编程?</h4>
          <p class="text-sm theme-text-muted">学习Agentic Engineering，掌握多智能体协作</p>
        </div>
        <div class="p-4 bg-white/5 rounded-lg">
          <h4 class="font-semibold text-green-400 mb-2">想保持竞争力?</h4>
          <p class="text-sm theme-text-muted">从"写代码"转向"定义问题"和"验收结果"</p>
        </div>
      </div>
      <div class="p-4 bg-white/5 rounded-lg">
        <h4 class="font-semibold mb-3 theme-text-secondary">核心竞争力转移</h4>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-3">
            <span class="theme-text-muted w-16">2018</span>
            <span class="theme-text-muted">语法熟练度、算法刷题</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-blue-400 w-16">2024</span>
            <span class="theme-text-secondary">提示词工程、代码审查</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-cyan-400 w-16">2026</span>
            <span class="theme-text-secondary">需求拆解、架构设计、AI协作管理</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-purple-400 w-16">2030</span>
            <span class="text-white">业务洞察、创新定义、价值判断</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 结语 -->
    <div
      class="p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl border border-white/10">
      <blockquote class="text-lg theme-text-secondary italic text-center">
        "三次跃迁，三次重新定义'程序员'的角色。2026年的Agentic Engineering不是终点，而是人机协作新范式的起点。最好的开发者不是那些写代码最快的人，而是最懂得如何与AI协作、如何定义有价值问题的人。"
      </blockquote>
    </div>
  </div>
</template>

<script setup lang="ts">

// 面包屑数据
const breadcrumbItems = computed(() => [
  { label: '首页', path: '/' },
  { label: '概念入门', path: '/concepts' },
  { label: '发展历程' }
])

// 页面特定的样式和交互可以在这里添加
import { ref, onMounted } from 'vue'

// 当前激活的阶段
const activeStage = ref('')

// 监听滚动，更新当前激活的阶段
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeStage.value = entry.target.id
        }
      })
    },
    { threshold: 0.3 }
  )

  // 观察所有阶段section
  const stageIds: string[] = ['stage1', 'stage2', 'stage3', 'milestones']
  stageIds.forEach((id: string) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

// 平滑滚动到指定元素
const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 阶段锚点偏移，避免被固定导航遮挡 */
.scroll-mt-24 {
  scroll-margin-top: 6rem;
}
</style>
