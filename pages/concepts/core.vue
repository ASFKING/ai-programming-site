<template>
  <div class="space-y-8 relative">
    <!-- 浮动导航栏 - 桌面端右侧 -->
    <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
      <button @click="scrollToSection('basics')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeSection === 'basics'
          ? 'bg-blue-500/30 border-blue-500/50 text-blue-400 scale-110'
          : 'bg-gray-900/80 border-white/10 text-gray-500 hover:bg-blue-500/10 hover:border-blue-500/30'
      ]" title="基础术语">
        📚
      </button>
      <button @click="scrollToSection('prompt-skills')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeSection === 'prompt-skills'
          ? 'bg-purple-500/30 border-purple-500/50 text-purple-400 scale-110'
          : 'bg-gray-900/80 border-white/10 text-gray-500 hover:bg-purple-500/10 hover:border-purple-500/30'
      ]" title="提示词技巧">
        ✍️
      </button>
      <button @click="scrollToSection('principles')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeSection === 'principles'
          ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-400 scale-110'
          : 'bg-gray-900/80 border-white/10 text-gray-500 hover:bg-cyan-500/10 hover:border-cyan-500/30'
      ]" title="核心原理">
        ⚙️
      </button>
      <button @click="scrollToSection('practice')" :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border',
        activeSection === 'practice'
          ? 'bg-green-500/30 border-green-500/50 text-green-400 scale-110'
          : 'bg-gray-900/80 border-white/10 text-gray-500 hover:bg-green-500/10 hover:border-green-500/30'
      ]" title="实战应用">
        🚀
      </button>
      <div class="w-8 h-px bg-white/10 mx-auto my-1"></div>
      <button @click="scrollToTop"
        class="w-12 h-12 rounded-xl flex items-center justify-center text-lg bg-gray-900/80 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
        title="回到顶部">
        ⬆️
      </button>
    </nav>

    <!-- 浮动导航栏 - 移动端底部 -->
    <nav class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden">
      <div
        class="flex items-center gap-1 p-2 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
        <button @click="scrollToSection('basics')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeSection === 'basics'
            ? 'bg-blue-500/20 text-blue-400'
            : 'text-gray-500 hover:bg-white/5'
        ]">
          <span class="text-lg">📚</span>
          <span class="text-[10px]">术语</span>
        </button>
        <button @click="scrollToSection('prompt-skills')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeSection === 'prompt-skills'
            ? 'bg-purple-500/20 text-purple-400'
            : 'text-gray-500 hover:bg-white/5'
        ]">
          <span class="text-lg">✍️</span>
          <span class="text-[10px]">提示词</span>
        </button>
        <button @click="scrollToSection('principles')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeSection === 'principles'
            ? 'bg-cyan-500/20 text-cyan-400'
            : 'text-gray-500 hover:bg-white/5'
        ]">
          <span class="text-lg">⚙️</span>
          <span class="text-[10px]">原理</span>
        </button>
        <button @click="scrollToSection('practice')" :class="[
          'px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-300 min-w-[60px]',
          activeSection === 'practice'
            ? 'bg-green-500/20 text-green-400'
            : 'text-gray-500 hover:bg-white/5'
        ]">
          <span class="text-lg">🚀</span>
          <span class="text-[10px]">实战</span>
        </button>
        <div class="w-px h-8 bg-white/10 mx-1"></div>
        <button @click="scrollToTop"
          class="px-3 py-2 rounded-xl flex flex-col items-center gap-0.5 text-gray-500 hover:bg-white/5 transition-all duration-300 min-w-[50px]">
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
          <span class="text-4xl">📚</span>
          <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">核心概念</span>
        </div>
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          AI编程核心概念
        </h1>
        <p class="text-xl text-gray-400 max-w-3xl">
          掌握AI编程的关键术语和核心原理，为高效使用AI编程工具打下坚实基础
        </p>
        <div class="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <p class="text-gray-300 italic">
            <span class="text-blue-400 font-semibold">学习路径：</span>
            基础术语 → 提示词技巧 → 核心原理 → 实战应用
          </p>
        </div>
      </div>
    </div>

    <!-- 基础术语 -->
    <section id="basics" class="scroll-mt-24">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">📚</div>
        <div>
          <h2 class="text-2xl font-bold text-blue-400">AI编程基础术语</h2>
          <p class="text-gray-500 italic">掌握这些术语，是理解AI编程的第一步</p>
        </div>
      </div>

      <!-- 提示词 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">1. 提示词（Prompt）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          提示词是你向AI下达的编程指令或需求描述。它不是什么神秘的咒语，而是你与AI沟通的桥梁。提示词的质量直接决定了AI生成代码的准确性。
        </p>
        <div class="space-y-3">
          <div class="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
            <p class="text-red-400 font-medium mb-2">❌ 模糊的提示词</p>
            <code class="text-sm text-gray-400">"生成一个接口"</code>
            <p class="text-gray-500 text-sm mt-2">AI不知道你要什么类型的接口，用什么框架，返回什么数据...</p>
          </div>
          <div class="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p class="text-green-400 font-medium mb-2">✓ 精准的提示词</p>
            <code class="text-sm text-gray-400">"生成一个基于Go Gin框架的用户登录接口，接收JSON格式的用户名和密码，返回包含token的JSON响应"</code>
            <p class="text-gray-500 text-sm mt-2">AI清楚知道要生成什么，直接输出可用的代码</p>
          </div>
        </div>
      </div>

      <!-- 提示词工程 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">2. 提示词工程（Prompt Engineering）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          提示词工程就是优化提示词的方法。你不需要懂AI的底层技术，只要掌握一些简单的优化技巧，就能让AI生成更贴合你需求的代码。
        </p>
        <div class="p-4 bg-white/5 rounded-lg mb-4">
          <p class="text-blue-400 font-medium mb-2">核心技巧</p>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-blue-400">•</span>
              <span><strong>明确需求</strong>：清楚告诉AI你要做什么</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400">•</span>
              <span><strong>补充约束</strong>：指定技术栈、版本、风格等限制</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400">•</span>
              <span><strong>给出示例</strong>：提供参考代码或期望的输出格式</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 生成式AI -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">3. 生成式AI（Generative AI）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          生成式AI是能自主生成代码、文本等内容的AI模型。它不需要你手动编写全部代码，而是根据你的描述自动生成。这是AI编程的核心支撑，也是区别于传统编程的关键。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-white/5 rounded-lg text-center">
            <span class="text-2xl">📝</span>
            <p class="text-sm text-gray-300 mt-2">代码生成</p>
          </div>
          <div class="p-3 bg-white/5 rounded-lg text-center">
            <span class="text-2xl">🐛</span>
            <p class="text-sm text-gray-300 mt-2">Bug修复</p>
          </div>
          <div class="p-3 bg-white/5 rounded-lg text-center">
            <span class="text-2xl">⚡</span>
            <p class="text-sm text-gray-300 mt-2">代码优化</p>
          </div>
        </div>
      </div>

      <!-- 代码补全 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">4. 代码补全（Code Completion）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          代码补全是AI编程最基础、最常用的功能。当你输入代码时，AI会自动补充后续的代码片段。这能大幅提升编码效率，减少重复劳动。
        </p>
        <div class="p-4 bg-white/5 rounded-lg">
          <p class="text-gray-400 text-sm mb-2">例如，当你输入：</p>
          <pre class="text-sm text-gray-300 bg-black/30 p-3 rounded overflow-x-auto"><code>def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return</code></pre>
          <p class="text-gray-400 text-sm mt-2">AI会自动补全为：</p>
          <pre class="text-sm text-green-400 bg-black/30 p-3 rounded overflow-x-auto"><code>def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total</code></pre>
        </div>
      </div>

      <!-- 代码重构 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">5. 代码重构（Code Refactoring）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          代码重构是指AI在不改变代码原有功能的前提下，对代码进行优化，让代码更简洁、可读性更强、可维护性更高。
        </p>
        <div class="p-4 bg-white/5 rounded-lg">
          <p class="text-blue-400 font-medium mb-2">常见应用场景</p>
          <ul class="space-y-1 text-sm text-gray-300">
            <li>• 简化冗余代码</li>
            <li>• 优化变量命名</li>
            <li>• 提取重复逻辑为函数</li>
            <li>• 改进代码结构</li>
          </ul>
        </div>
      </div>

      <!-- 上下文 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">6. 上下文（Context）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          上下文是你提供给AI的所有相关信息，包括需求描述、已有的代码、对话历史等。清晰的上下文能帮AI精准理解你的编程需求，避免输出偏离预期。
        </p>
        <div class="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
          <p class="text-yellow-400 font-medium mb-2">💡 实用建议</p>
          <p class="text-gray-300 text-sm">在让AI生成代码前，先提供相关的代码片段、项目结构、依赖配置等信息，这样AI生成的代码会更贴合你的项目实际。</p>
        </div>
      </div>

      <!-- 模型适配 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">7. 模型适配（Model Adaptation）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          不同的AI模型擅长的编程语言和应用场景不同。选择合适的模型能大幅提升编程效率。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-purple-400 font-medium mb-2">通用模型</p>
            <p class="text-sm text-gray-400">适配多场景，通用性强，如GPT-4、Claude 3</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-cyan-400 font-medium mb-2">编程专用模型</p>
            <p class="text-sm text-gray-400">聚焦编程场景，输出更精准，如Codex、StarCoder</p>
          </div>
        </div>
      </div>

      <!-- Token -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">8. Token（令牌）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          Token是AI阅读和处理文本（包括代码）的最小单元。它既不是单个汉字，也不是完整词语，而是AI计费和控制输出的核心依据。
        </p>
        <div class="p-4 bg-white/5 rounded-lg mb-4">
          <p class="text-blue-400 font-medium mb-2">Token换算</p>
          <ul class="space-y-1 text-sm text-gray-300">
            <li>• 英文：1个Token ≈ 0.75个词</li>
            <li>• 中文：1个汉字 ≈ 1.5-2个Token</li>
            <li>• 代码：空格、缩进、换行都会占用Token</li>
          </ul>
        </div>
        <div class="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
          <p class="text-yellow-400 font-medium mb-2">💡 为什么重要？</p>
          <p class="text-gray-300 text-sm">Token直接关联AI工具的计费逻辑。超出额度会触发截断警告，掌握这一点能更好控制成本和输出长度。</p>
        </div>
      </div>

      <!-- 上下文窗口 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="text-blue-400">9. 上下文窗口（Context Window）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          上下文窗口可以理解为AI的"即时工作记忆"容量。就像把你的代码和相关文档摊在桌面上，桌面的大小决定了能同时摆放的内容多少。
        </p>
        <div class="p-4 bg-red-500/5 border border-red-500/20 rounded-lg mb-4">
          <p class="text-red-400 font-medium mb-2">⚠️ "中间丢失"现象</p>
          <p class="text-gray-300 text-sm">在长对话、长代码场景中，AI最容易忽略中间部分的信息。这就是AI有时会"忘记"前文内容的核心原因。</p>
        </div>
        <div class="p-4 bg-white/5 rounded-lg">
          <p class="text-blue-400 font-medium mb-2">实用技巧</p>
          <p class="text-gray-300 text-sm">学会简单估算自己的项目代码是否超过上下文限制，能有效规避记忆溢出、输出偏离的问题。</p>
        </div>
      </div>

      <!-- 下一节导航 -->
      <div class="mt-8 flex justify-center">
        <button @click="scrollToSection('prompt-skills')"
          class="group flex items-center gap-3 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
          <span class="text-gray-400 group-hover:text-purple-400 transition-colors">掌握基础术语后</span>
          <span class="text-xl group-hover:translate-y-1 transition-transform">✍️</span>
          <span class="text-purple-400 font-medium">学习提示词技巧</span>
          <svg class="w-5 h-5 text-purple-400 group-hover:translate-y-1 transition-transform" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- 提示词技巧 -->
    <section id="prompt-skills" class="scroll-mt-24">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">✍️</div>
        <div>
          <h2 class="text-2xl font-bold text-purple-400">提示词的核心技巧</h2>
          <p class="text-gray-500 italic">掌握这些技巧，让AI生成更精准的代码</p>
        </div>
      </div>

      <!-- 系统提示词 vs 用户提示词 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-purple-400">系统提示词 vs 用户提示词</span>
        </h3>
        <p class="text-gray-300 mb-4">
          理解这两者的区别，能帮你更好地控制AI的输出行为。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-purple-400 font-medium mb-2">系统提示词</p>
            <p class="text-sm text-gray-400 mb-3">给AI"定规矩、划边界"，设定AI的角色和行为准则</p>
            <pre
              class="text-xs text-gray-300 bg-black/30 p-3 rounded overflow-x-auto"><code>"你是一个严谨的Go后端工程师，代码需符合Go 1.21版本规范，遵循项目代码风格"</code></pre>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-purple-400 font-medium mb-2">用户提示词</p>
            <p class="text-sm text-gray-400 mb-3">你给AI的具体编程任务指令</p>
            <pre
              class="text-xs text-gray-300 bg-black/30 p-3 rounded overflow-x-auto"><code>"生成一个基于Gin框架的用户登录接口代码"</code></pre>
          </div>
        </div>
        <div class="mt-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <p class="text-blue-400 font-medium mb-2">💡 实际应用</p>
          <p class="text-gray-300 text-sm">IDE AI插件（如Cursor Rules）的核心逻辑就是提前预设好系统提示词，规范AI的输出风格，再结合你输入的用户提示词，高效完成编程任务。</p>
        </div>
      </div>

      <!-- CRI模型 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-purple-400">结构化指令三要素（CRI模型）</span>
        </h3>
        <p class="text-gray-300 mb-4">
          一个好的提示词应该包含这三个核心要素，让AI能够准确理解你的需求。
        </p>
        <div class="space-y-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-sm font-bold">C</span>
              <span class="text-purple-400 font-medium">Context（上下文）</span>
            </div>
            <p class="text-sm text-gray-400 mb-3">给AI提供完成任务所需的相关信息</p>
            <pre
              class="text-xs text-gray-300 bg-black/30 p-3 rounded overflow-x-auto"><code>项目使用React 18 + TypeScript，组件位于src/components目录</code></pre>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-sm font-bold">R</span>
              <span class="text-purple-400 font-medium">Role（角色约束）</span>
            </div>
            <p class="text-sm text-gray-400 mb-3">明确指定AI的技术栈版本和代码风格偏好</p>
            <pre
              class="text-xs text-gray-300 bg-black/30 p-3 rounded overflow-x-auto"><code>使用Python 3.10语法，遵循PEP 8规范，添加类型注解</code></pre>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-sm font-bold">I</span>
              <span class="text-purple-400 font-medium">Intent（意图明确）</span>
            </div>
            <p class="text-sm text-gray-400 mb-3">清晰告诉AI你的核心需求，明确区分任务类型</p>
            <pre
              class="text-xs text-gray-300 bg-black/30 p-3 rounded overflow-x-auto"><code>生成一个用户认证组件，包含登录表单和错误处理</code></pre>
          </div>
        </div>
      </div>

      <!-- 负面约束 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-purple-400">负面约束的力量</span>
        </h3>
        <p class="text-gray-300 mb-4">
          有时"告诉AI不要做什么"，比"告诉它做什么"更能精准把控输出结果。
        </p>
        <div class="p-4 bg-white/5 rounded-lg mb-4">
          <p class="text-purple-400 font-medium mb-2">示例</p>
          <pre
            class="text-sm text-gray-300 bg-black/30 p-3 rounded overflow-x-auto"><code>生成一个用户登录函数，不要引入新的第三方库，不要使用废弃的语法，不要在代码中硬编码密码</code></pre>
        </div>
        <div class="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
          <p class="text-green-400 font-medium mb-2">✓ 优势</p>
          <p class="text-gray-300 text-sm">能有效避免AI生成不符合项目约束的代码，大幅减少人工优化成本，提升编程效率。</p>
        </div>
      </div>

      <!-- 下一节导航 -->
      <div class="mt-8 flex justify-center">
        <button @click="scrollToSection('principles')"
          class="group flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
          <span class="text-gray-400 group-hover:text-cyan-400 transition-colors">理解了提示词技巧</span>
          <span class="text-xl group-hover:translate-y-1 transition-transform">⚙️</span>
          <span class="text-cyan-400 font-medium">深入核心原理</span>
          <svg class="w-5 h-5 text-cyan-400 group-hover:translate-y-1 transition-transform" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- 核心原理 -->
    <section id="principles" class="scroll-mt-24">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl">⚙️</div>
        <div>
          <h2 class="text-2xl font-bold text-cyan-400">AI编程的核心原理</h2>
          <p class="text-gray-500 italic">理解这些原理，让你知其然更知其所以然</p>
        </div>
      </div>

      <!-- AI编程的完整链路 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-cyan-400">AI编程的完整链路</span>
        </h3>
        <p class="text-gray-300 mb-4">
          AI编程的本质是"AI辅助人类完成编程任务"，而非替代人类。让我们看看完整的流程：
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2 text-sm">
          <div class="px-4 py-2 bg-blue-500/20 rounded-lg text-blue-400">输入需求</div>
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <div class="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-400">AI理解</div>
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <div class="px-4 py-2 bg-cyan-500/20 rounded-lg text-cyan-400">生成代码</div>
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <div class="px-4 py-2 bg-green-500/20 rounded-lg text-green-400">结果校验</div>
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <div class="px-4 py-2 bg-yellow-500/20 rounded-lg text-yellow-400">人工优化</div>
        </div>
        <div class="mt-4 p-4 bg-white/5 rounded-lg">
          <p class="text-cyan-400 font-medium mb-2">核心认知</p>
          <p class="text-gray-300 text-sm">人工校验和优化仍是关键环节。AI是强大的助手，但最终的代码质量还需要你来把控。</p>
        </div>
      </div>

      <!-- 提示词与输出的关联 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-cyan-400">提示词与输出结果的关联原理</span>
        </h3>
        <p class="text-gray-300 mb-4">
          提示词的清晰度、约束性，直接决定了AI生成代码的质量。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
            <p class="text-red-400 font-medium mb-2">模糊提示词</p>
            <pre class="text-xs text-gray-300 bg-black/30 p-3 rounded overflow-x-auto mb-2"><code>"生成一个接口"</code></pre>
            <p class="text-gray-500 text-sm">AI可能生成各种类型的接口，需要你大量修改</p>
          </div>
          <div class="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p class="text-green-400 font-medium mb-2">精准提示词</p>
            <pre
              class="text-xs text-gray-300 bg-black/30 p-3 rounded overflow-x-auto mb-2"><code>"生成一个基于Go Gin的用户登录接口，返回JSON格式"</code></pre>
            <p class="text-gray-500 text-sm">AI直接生成符合需求的代码，减少修改成本</p>
          </div>
        </div>
      </div>

      <!-- AI代码生成的边界 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-cyan-400">AI代码生成的合理性边界</span>
        </h3>
        <p class="text-gray-300 mb-4">
          客观认识AI的优势与局限，建立正确的使用认知。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p class="text-green-400 font-medium mb-2">✓ 优势</p>
            <ul class="space-y-1 text-sm text-gray-300">
              <li>• 高效、快速</li>
              <li>• 能轻松处理重复编程任务</li>
              <li>• 提供多种实现方案</li>
            </ul>
          </div>
          <div class="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
            <p class="text-red-400 font-medium mb-2">⚠️ 局限</p>
            <ul class="space-y-1 text-sm text-gray-300">
              <li>• 可能存在bug</li>
              <li>• 不贴合复杂业务需求</li>
              <li>• 缺乏业务逻辑考量</li>
            </ul>
          </div>
        </div>
        <div class="mt-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
          <p class="text-yellow-400 font-medium mb-2">💡 正确认知</p>
          <p class="text-gray-300 text-sm">建立"AI辅助+人工校验"的正确认知，避免过度依赖AI，确保代码质量。</p>
        </div>
      </div>

      <!-- AI的角色定位 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-cyan-400">AI的角色定位：从Copilot到顶级执行者</span>
        </h3>
        <p class="text-gray-300 mb-4">
          流行的说法是"AI是你的Copilot"，这个比喻在日常补全层面成立。但在实际编程实践中，AI更像一个极度服从、无限耐心、但没有内部业务知识常识的"顶级执行者"。
        </p>
        <div class="space-y-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">🎯</span>
              <p class="text-cyan-400 font-medium">极度服从</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">AI会一字不差地执行你写的规范，不会主动质疑"这样做合理吗"。</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div class="p-2 bg-green-500/5 rounded">
                <p class="text-green-400">优势</p>
                <p class="text-gray-400">规范写得越准确，执行越可靠</p>
              </div>
              <div class="p-2 bg-red-500/5 rounded">
                <p class="text-red-400">风险</p>
                <p class="text-gray-400">规范有歧义时，AI会选一个"看起来合理"的解释</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">♾️</span>
              <p class="text-cyan-400 font-medium">无限耐心</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">34次重构、9组联调任务、跨会话的上下文恢复——这些在人类身上需要消耗大量意志力的事情，AI做起来没有摩擦成本。</p>
            <p class="text-gray-400 text-sm">AI会持续更新进度状态，从不嫌烦，这是处理重复性任务的巨大优势。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">📦</span>
              <p class="text-cyan-400 font-medium">没有内部业务常识</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">AI不知道你们公司的部署环境是什么样的，不知道这个接口上周刚换过版本，不知道"这个交互做成这样用户会抱怨"。</p>
            <p class="text-gray-400 text-sm">它只知道你告诉它的。这也是生产构建排障花了大量时间的根本原因。</p>
          </div>
        </div>
      </div>

      <!-- AI的能力边界框架 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-cyan-400">AI的能力边界框架</span>
        </h3>
        <p class="text-gray-300 mb-4">
          AI的能力边界不是简单的"能做/不能做"，而是根据需求颗粒度选择不同的协作模式。
        </p>

        <!-- 能力边界矩阵图 -->
        <div class="mb-6 text-center">
          <img src="/assets/img/image.png" alt="AI能力边界矩阵" class="max-w-full md:max-w-2xl mx-auto rounded-lg shadow-lg">
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-bold">小颗粒</span>
              <p class="text-blue-400 font-medium">对话框即扫即改</p>
            </div>
            <p class="text-gray-300 text-sm mb-2"><strong>场景：</strong>改个文案、修个显隐逻辑、调整CSS间距</p>
            <p class="text-gray-300 text-sm mb-2"><strong>策略：</strong>直接在AI Chat中对话</p>
            <p class="text-gray-400 text-sm"><strong>理由：</strong>沟通成本低于编写规范的成本，AI的即时反馈效率最高</p>
          </div>
          <div class="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs font-bold">中颗粒标准化</span>
              <p class="text-purple-400 font-medium">基于Rules或Skills预设规范生成</p>
            </div>
            <p class="text-gray-300 text-sm mb-2"><strong>场景：</strong>增加一个标准的CRUD页面、创建一个简单的业务组件</p>
            <p class="text-gray-300 text-sm mb-2"><strong>策略：</strong>利用预设的Cursor Rules或Skills（如pro-table.mdc）</p>
            <p class="text-gray-400 text-sm"><strong>理由：</strong>这类需求有强烈的"模式感"。只要规则定义清晰（如"执行流程：识别场景 → 读取示例 → 生成类型 →
              完成UI"），AI就能基于标准化模板高质量输出</p>
          </div>
          <div class="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs font-bold">中大颗粒复杂</span>
              <p class="text-cyan-400 font-medium">OpenSpec深度协作</p>
            </div>
            <p class="text-gray-300 text-sm mb-2"><strong>场景：</strong>重构核心逻辑、新增带有复杂业务逻辑的模块、无参考代码的新功能</p>
            <p class="text-gray-300 text-sm mb-2"><strong>策略：</strong>OpenSpec标准流（SDD）</p>
            <p class="text-gray-400 text-sm">
              <strong>理由：</strong>业务逻辑复杂时，AI极易产生幻觉或需求偏移。通过Spec强制进行"先设计后编码"，可以确保AI的每一步都在既定轨道上，且Spec记录了设计的决策过程，对于后期维护价值巨大
            </p>
          </div>
        </div>
      </div>

      <!-- 上下文关联原理 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-cyan-400">上下文关联的核心原理</span>
        </h3>
        <p class="text-gray-300 mb-4">
          AI会暂时"记住"当前对话或输入的上下文信息，逐步优化输出结果。
        </p>
        <div class="p-4 bg-white/5 rounded-lg">
          <p class="text-cyan-400 font-medium mb-2">应用场景</p>
          <p class="text-gray-300 text-sm mb-3">适合多步骤编程任务，AI能结合前文信息，保证输出的连贯性和一致性。</p>
          <p class="text-gray-400 text-sm">例如：先生成函数 → 再优化函数 → 最后补充注释，AI会记住之前的上下文，确保每一步都基于前一步的结果。</p>
        </div>
      </div>

      <!-- Token与上下文窗口的关联 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-cyan-400">Token与上下文窗口的关联原理</span>
        </h3>
        <p class="text-gray-300 mb-4">
          Token是上下文窗口的"容量单位"，上下文窗口的大小决定了AI可同时处理的Token总量。
        </p>
        <div class="p-4 bg-red-500/5 border border-red-500/20 rounded-lg mb-4">
          <p class="text-red-400 font-medium mb-2">⚠️ 超限后果</p>
          <p class="text-gray-300 text-sm">当你输入的代码、对话内容占用的Token超过了上下文窗口的容量限制，AI就会出现"忘记"前文信息、截断输出的情况。</p>
        </div>
        <div class="p-4 bg-white/5 rounded-lg">
          <p class="text-cyan-400 font-medium mb-2">实用价值</p>
          <p class="text-gray-300 text-sm">掌握这一原理，能帮你更好地控制成本、规避输出异常。</p>
        </div>
      </div>

      <!-- 下一节导航 -->
      <div class="mt-8 flex justify-center">
        <button @click="scrollToSection('practice')"
          class="group flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-xl hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300">
          <span class="text-gray-400 group-hover:text-green-400 transition-colors">明白了核心原理</span>
          <span class="text-xl group-hover:translate-y-1 transition-transform">🚀</span>
          <span class="text-green-400 font-medium">看看实战应用</span>
          <svg class="w-5 h-5 text-green-400 group-hover:translate-y-1 transition-transform" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- 实战应用 -->
    <section id="practice" class="scroll-mt-24">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">🚀</div>
        <div>
          <h2 class="text-2xl font-bold text-green-400">实战应用场景</h2>
          <p class="text-gray-500 italic">将所学知识应用到实际项目中</p>
        </div>
      </div>

      <!-- 工具操作中的应用 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-green-400">工具操作中的应用</span>
        </h3>
        <p class="text-gray-300 mb-4">
          在使用AI编程工具时，这些概念会帮助你更高效地完成任务。
        </p>
        <div class="space-y-3">
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-green-400 font-medium mb-2">编写精准提示词</p>
            <p class="text-gray-300 text-sm">运用提示词工程技巧，明确需求、补充约束、给出示例，让AI生成更贴合需求的代码。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-green-400 font-medium mb-2">选择合适的模型</p>
            <p class="text-gray-300 text-sm">根据编程任务选择通用模型或编程专用模型，提升输出质量。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-green-400 font-medium mb-2">关注Token消耗</p>
            <p class="text-gray-300 text-sm">了解Token计费逻辑，合理控制输入长度，避免超出额度。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-green-400 font-medium mb-2">规避上下文限制</p>
            <p class="text-gray-300 text-sm">估算项目代码是否超限，必要时分批处理，避免"忘记"前文信息。</p>
          </div>
        </div>
      </div>

      <!-- 范式对比中的应用 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-green-400">范式对比中的应用</span>
        </h3>
        <p class="text-gray-300 mb-4">
          理解传统编程与AI辅助编程的核心差异。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-gray-400 font-medium mb-2">传统编程</p>
            <p class="text-gray-300 text-sm">人工编写全部代码，从零开始构建功能。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <p class="text-green-400 font-medium mb-2">AI辅助编程</p>
            <p class="text-gray-300 text-sm">AI生成代码 + 人工优化，大幅提升效率。</p>
          </div>
        </div>
        <div class="mt-4 p-4 bg-white/5 rounded-lg">
          <p class="text-green-400 font-medium mb-2">核心前提</p>
          <p class="text-gray-300 text-sm">高质量提示词和AI生成能力是AI辅助编程的核心前提。</p>
        </div>
      </div>

      <!-- 工作流实践中的应用 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-green-400">工作流实践中的应用</span>
        </h3>
        <p class="text-gray-300 mb-4">
          在AI编程工作流中每个环节的应用。
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2 text-sm">
          <div class="px-3 py-2 bg-blue-500/20 rounded-lg text-blue-400">编写结构化提示词</div>
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <div class="px-3 py-2 bg-purple-500/20 rounded-lg text-purple-400">AI生成代码</div>
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <div class="px-3 py-2 bg-cyan-500/20 rounded-lg text-cyan-400">AI重构优化</div>
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <div class="px-3 py-2 bg-green-500/20 rounded-lg text-green-400">人工校验结果</div>
        </div>
        <div class="mt-4 p-4 bg-white/5 rounded-lg">
          <p class="text-green-400 font-medium mb-2">关键环节</p>
          <p class="text-gray-300 text-sm">管控Token消耗、规避上下文限制是高效开展AI编程工作、提升实操效率的关键。</p>
        </div>
      </div>

      <!-- AI失效的三种模式 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-green-400">AI失效的三种模式</span>
        </h3>
        <p class="text-gray-300 mb-4">
          经过实践发现，AI Coding的失效不是随机的，而是可归类的。识别这些模式，能帮助你提前预防。
        </p>
        <div class="space-y-4">
          <div class="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">模式一</span>
              <p class="text-red-400 font-medium">规范真空</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">
              <strong>表现：</strong>任务涉及的领域没有规范约束，AI自行填充"合理默认值"。生成的代码功能正确，但风格/结构偏离团队约定。
            </p>
            <p class="text-gray-300 text-sm mb-2"><strong>发生频率：</strong>高（尤其在新功能开发初期）</p>
            <p class="text-gray-400 text-sm"><strong>应对：</strong>在CLAUDE.md或code-design中补充对应规范，一次修复，全局生效</p>
          </div>
          <div class="p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-orange-500/20 text-orange-400 text-xs font-bold">模式二</span>
              <p class="text-orange-400 font-medium">信息孤岛</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">
              <strong>表现：</strong>AI掌握的信息是当前会话的快照，看不到系统外的状态。本地正常，CI失败；AI分析每次都对，但解的都是当前暴露的问题。
            </p>
            <p class="text-gray-300 text-sm mb-2"><strong>发生频率：</strong>低，但代价高</p>
            <p class="text-gray-400 text-sm"><strong>应对：</strong>跨平台、跨环境的依赖要在架构设计阶段提前锁定；环境差异要写成规范前置处理</p>
          </div>
          <div class="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold">模式三</span>
              <p class="text-yellow-400 font-medium">任务目标模糊</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">
              <strong>表现：</strong>AI把"该问人的问题"当成"执行问题"来解决。用户说"优化一下首页"，AI悄悄改了组件结构，而不是先澄清目标。
            </p>
            <p class="text-gray-300 text-sm mb-2"><strong>发生频率：</strong>中</p>
            <p class="text-gray-400 text-sm"><strong>应对：</strong>Spec工作流的proposal阶段强制要求先描述"Why"，避免AI自行填充目标</p>
          </div>
        </div>
      </div>

      <!-- 开发者角色的重构 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-green-400">开发者角色的重构</span>
        </h3>
        <p class="text-gray-300 mb-4">
          AI Coding不是让开发者"消失"，而是让开发者的工作向上迁移。
        </p>

        <!-- 开发者职责重构对比图 -->
        <div class="mb-6 text-center">
          <img src="/assets/img/aicode.webp" alt="开发者职责重构对比"
            class="max-w-full md:max-w-2xl mx-auto rounded-lg shadow-lg">
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">📝</span>
              <p class="text-green-400 font-medium">规范设计能力成为核心竞争力</p>
            </div>
            <p class="text-gray-300 text-sm">能写出让AI可靠执行的规范，价值比能写出同等功能代码更高。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">🔍</span>
              <p class="text-green-400 font-medium">系统性思维变得更重要</p>
            </div>
            <p class="text-gray-300 text-sm">生产构建问题的排障经历说明，AI可以帮你解决每一个局部问题，但无法帮你看到真实业务全局。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">✅</span>
              <p class="text-green-400 font-medium">质量意识前移</p>
            </div>
            <p class="text-gray-300 text-sm">过去Code Review在代码写完后进行，现在需要在方案设计/任务执行阶段就介入，而不是等AI执行完再纠错。</p>
          </div>
        </div>
      </div>

      <!-- 值得期待的方向 -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <span class="text-green-400">值得期待的方向</span>
        </h3>
        <p class="text-gray-300 mb-4">
          基于实践数据和经验，后续在以下方向可作深入探索。
        </p>
        <div class="space-y-4">
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">📚</span>
              <p class="text-green-400 font-medium">规范体系的结构化积累</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">每次踩坑后补充到CLAUDE.md/rules，形成团队共享的"AI执行约束库"。</p>
            <p class="text-gray-400 text-sm">下一步可以建立"踩坑→提炼规范→自动追加"的闭环，目前7条规范文件是手动维护的。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">🔗</span>
              <p class="text-green-400 font-medium">MCP工具链的纵向延伸</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">本项目MCP仅覆盖了接口文档、飞书文档。</p>
            <p class="text-gray-400 text-sm">后续针对设计稿、测试用例、发布平台、日志平台接入，可以进一步形成完整的AI Coding链路。</p>
          </div>
          <div class="p-4 bg-white/5 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">🤖</span>
              <p class="text-green-400 font-medium">多Agent并行开发</p>
            </div>
            <p class="text-gray-300 text-sm mb-2">本项目开发过程中，发现大型任务执行等待时间较长。</p>
            <p class="text-gray-400 text-sm">下一步可以尝试多Agent并行生成，同时开发不同功能模块。</p>
          </div>
        </div>
      </div>

      <!-- 总结 -->
      <div
        class="p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl border border-white/10">
        <h3 class="text-xl font-bold mb-4 text-white">🎯 核心与其他</h3>
        <p class="text-gray-300 mb-4">
          AI Coding的本质不仅仅是用AI写代码，而是用结构化的规范和工作流把不确定性消除在执行之前——AI负责在确定性空间里高速执行，人负责维护和扩展那个确定性空间的边界。
        </p>
        <div class="p-4 bg-white/5 rounded-lg">
          <p class="text-green-400 font-medium mb-2">关键要点</p>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>• <strong>规范质量决定执行质量</strong>：AI会一字不差地执行你写的规范，规范写得越准确，执行越可靠</li>
            <li>• <strong>根据颗粒度选择策略</strong>：小颗粒直接对话，中颗粒用Rules/Skills，大颗粒用OpenSpec</li>
            <li>• <strong>识别失效模式</strong>：规范真空、信息孤岛、任务目标模糊，提前预防</li>
            <li>• <strong>角色向上迁移</strong>：从"写代码"到"写规范"，从"解决问题"到"定义问题"</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 当前激活的section
const activeSection = ref('')

// 监听滚动，更新当前激活的section
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.3 }
  )

  // 观察所有section
  const sectionIds: string[] = ['basics', 'prompt-skills', 'principles', 'practice']
  sectionIds.forEach((id: string) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

// 平滑滚动到指定元素
const scrollToSection = (id: string) => {
  activeSection.value = id
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

/* section锚点偏移，避免被固定导航遮挡 */
.scroll-mt-24 {
  scroll-margin-top: 6rem;
}
</style>
