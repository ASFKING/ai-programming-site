// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    // ⚠️ 安装依赖: npm install @nuxtjs/sitemap
    // sitemap 模块会自动根据 pages/ 和 content/ 生成 sitemap.xml
    // 注意：需要放在其他模块之后
    '@nuxtjs/sitemap'
  ],

  // GitHub Pages deployment
  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: {
      failOnError: false,
      ignore: [
        '/api/**'
      ],
      // 显式声明所有动态路由，确保 SSG 能生成所有页面
      // Nuxt Content 的 [slug].vue 动态路由可能无法被爬虫完全发现
      routes: [
        // === 概念入门 ===
        '/concepts/history',
        '/concepts/core',

        // === 工具详情 ===
        '/tools/cursor',
        '/tools/trae',
        '/tools/claude-code',
        '/tools/github-copilot',
        '/tools/codex',
        '/tools/antigravity',
        '/tools/qoder',
        '/tools/codebuddy',
        '/tools/windsurf',
        '/tools/aider',
        '/tools/compare',
        '/tools/picker',

        // === 编程范式 ===
        '/paradigms/vibe-coding',
        '/paradigms/code-completion',
        '/paradigms/spec-coding',
        '/paradigms/agentic-coding',

        // === 方法论 ===
        '/methodology/spec-driven',
        '/methodology/chat-mode',
        '/methodology/plan-mode',
        '/methodology/agents-claude-md',
        '/methodology/personal-rules',
        '/methodology/project-rules',
        '/methodology/skills',

        // === 工具箱 ===
        '/toolbox',
        '/toolbox/context-lost',
        '/toolbox/token-estimator',
        '/toolbox/prompt-bloat',
        '/toolbox/paradigm-picker',

        // === 关于 ===
        '/about'
      ]
    }
  },

  app: {
    baseURL: '/ai-programming-site/',
    buildAssetsDir: 'assets',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'AI编程完全指南：从代码补全到智能体开发 | 工具对比 + 方法论',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI编程完全指南：覆盖 Cursor、Claude Code、GitHub Copilot 等 10+ 主流工具对比，Code Completion / Vibe Coding / Spec Coding / Agentic Coding 四大范式详解，Spec 驱动开发方法论。2026 年最全 AI 编程学习资源。' },
        { name: 'keywords', content: 'AI编程, AI编程工具, 代码补全, Vibe Coding, Spec Coding, Agentic Coding, Cursor, Trae, Claude Code, GitHub Copilot, Codex, Windsurf, Aider, AI开发工具, AI编程方法论, Spec驱动开发, 工具选型, Token估算器, 上下文可视化, Prompt优化' },

        // Open Graph
        { property: 'og:title', content: 'AI编程完全指南：从代码补全到智能体开发 | 10+ 工具对比 + 方法论' },
        { property: 'og:description', content: '覆盖 10+ 主流 AI 编程工具对比，4 大编程范式详解，Spec 驱动开发方法论。2026 年最全 AI 编程学习资源。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:site_name', content: 'AI编程完全指南' },
        { property: 'og:image', content: 'https://asfking.github.io/ai-programming-site/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'AI编程完全指南 - 从代码补全到智能体开发' },
        { property: 'og:image:type', content: 'image/png' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AI编程完全指南：从代码补全到智能体开发 | 工具对比 + 方法论' },
        { name: 'twitter:description', content: '覆盖 10+ 主流 AI 编程工具对比，4 大编程范式详解，Spec 驱动开发方法论。' },
        { name: 'twitter:image', content: 'https://asfking.github.io/ai-programming-site/og-image.png' },

        { name: 'theme-color', content: '#0f172a' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/ai-programming-site/favicon.svg' }
      ]
    }
  },

  // Sitemap 配置
  // 自动从 pages/ 目录收集所有路由
  sitemap: {
    hostname: 'https://asfking.github.io/ai-programming-site',
    gzip: true,
    // 自动生成，无需手动维护
    // 如果需要排除某些页面，可以在这里配置
    // exclude: ['/secret-page']
  },

  content: {
    highlight: {
      theme: 'github-dark'
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css'
  }
})
