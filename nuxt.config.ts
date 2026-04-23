// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  // GitHub Pages deployment - 关键修改
  ssr: false,                      // 静态站点建议关闭 SSR
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
    baseURL: '/ai-programming-site/',   // 正确设置子路径
    buildAssetsDir: 'assets',           // 避免 _ 开头的文件夹（GitHub Pages 忽略）
    head: {
      title: 'AI编程介绍网站',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI编程技术介绍网站 - 了解AI编程工具、方法和未来趋势' }
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