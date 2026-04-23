// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  // GitHub Pages deployment
  ssr: false,
  nitro: {
    preset: 'github-pages',
    prerender: {
      failOnError: false,
      ignore: ['/api/**']
    }
  },

  app: {
    baseURL: '/ai-programming-site/',
    buildAssetsDir: 'assets',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'AI编程：智能开发的未来 - 从代码补全到智能体编程',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '全面了解AI编程技术、工具和方法论。从代码补全到智能体编程，掌握AI时代的软件开发方式。' },
        { name: 'keywords', content: 'AI编程, 代码补全, Vibe Coding, Agentic Coding, Cursor, Claude Code, GitHub Copilot, AI开发工具' },
        { property: 'og:title', content: 'AI编程：智能开发的未来' },
        { property: 'og:description', content: '从代码补全到智能体编程，AI正在重塑软件开发的方式。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AI编程：智能开发的未来' },
        { name: 'twitter:description', content: '从代码补全到智能体编程，AI正在重塑软件开发的方式。' },
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
