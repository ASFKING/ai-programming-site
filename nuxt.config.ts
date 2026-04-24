// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  // GitHub Pages deployment
  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: {
      failOnError: false,
      ignore: [
        '/api/**'
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
        { name: 'keywords', content: 'AI编程, AI编程工具, 代码补全, Vibe Coding, Spec Coding, Agentic Coding, Cursor, Trae, Claude Code, GitHub Copilot, Codex, Windsurf, Aider, AI开发工具, AI编程方法论, Spec驱动开发, 工具选型' },
        { property: 'og:title', content: 'AI编程完全指南：从代码补全到智能体开发 | 10+ 工具对比 + 方法论' },
        { property: 'og:description', content: '覆盖 10+ 主流 AI 编程工具对比，4 大编程范式详解，Spec 驱动开发方法论。2026 年最全 AI 编程学习资源。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AI编程完全指南：从代码补全到智能体开发 | 工具对比 + 方法论' },
        { name: 'twitter:description', content: '覆盖 8+ 主流 AI 编程工具对比，4 大编程范式详解，Spec 驱动开发方法论。' },
        { name: 'theme-color', content: '#0f172a' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/ai-programming-site/favicon.svg' }
      ]
    }
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
