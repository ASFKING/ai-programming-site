/**
 * JSON-LD 结构化数据插件
 * 为每个页面自动注入 Schema.org 结构化数据，提升 SEO
 */
export default defineNuxtPlugin(() => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const baseURL = 'https://asfking.github.io/ai-programming-site'

  // 根据路由生成不同的 JSON-LD
  const getJsonLd = computed(() => {
    const path = route.path
    const fullURL = `${baseURL}${path}`

    // 基础 WebSite schema（全站共享）
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'AI编程完全指南',
      url: baseURL,
      description: '覆盖 10+ 主流 AI 编程工具对比，4 大编程范式详解，Spec 驱动开发方法论。2026 年最全 AI 编程学习资源。',
      inLanguage: 'zh-CN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseURL}/tools?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }

    // 首页
    if (path === '/' || path === '/ai-programming-site/') {
      return [
        websiteSchema,
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'AI编程完全指南：从代码补全到智能体开发',
          description: '覆盖 10+ 主流 AI 编程工具对比，4 大编程范式详解，Spec 驱动开发方法论。',
          url: fullURL,
          isPartOf: { '@id': `${baseURL}#website` },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [{
              '@type': 'ListItem',
              position: 1,
              name: '首页',
              item: baseURL
            }]
          }
        }
      ]
    }

    // 工具页面
    if (path.startsWith('/tools')) {
      const toolNames: Record<string, string> = {
        cursor: 'Cursor',
        'claude-code': 'Claude Code',
        'github-copilot': 'GitHub Copilot',
        trae: 'Trae',
        windsurf: 'Windsurf',
        codex: 'Codex',
        aider: 'Aider',
        antigravity: 'Antigravity',
        qoder: 'Qoder',
        codebuddy: 'CodeBuddy'
      }

      const slug = path.split('/').filter(Boolean).pop()
      const toolName = slug && toolNames[slug]

      if (toolName) {
        return [
          websiteSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${toolName} - AI编程工具评测`,
            description: `${toolName} 的详细评测、功能特性和使用指南。`,
            url: fullURL,
            author: {
              '@type': 'Organization',
              name: 'AI编程完全指南'
            },
            publisher: {
              '@type': 'Organization',
              name: 'AI编程完全指南',
              logo: {
                '@type': 'ImageObject',
                url: `${baseURL}/favicon.svg`
              }
            },
            datePublished: '2026-04-01',
            dateModified: '2026-04-24',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: '首页', item: baseURL },
                { '@type': 'ListItem', position: 2, name: '工具', item: `${baseURL}/tools` },
                { '@type': 'ListItem', position: 3, name: toolName, item: fullURL }
              ]
            }
          }
        ]
      }
    }

    // 范式页面
    if (path.startsWith('/paradigms')) {
      const paradigmNames: Record<string, string> = {
        'code-completion': 'Code Completion',
        'vibe-coding': 'Vibe Coding',
        'spec-coding': 'Spec Coding',
        'agentic-coding': 'Agentic Coding'
      }

      const slug = path.split('/').filter(Boolean).pop()
      const paradigmName = slug && paradigmNames[slug]

      if (paradigmName) {
        return [
          websiteSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${paradigmName} - AI编程范式详解`,
            description: `${paradigmName} 的核心概念、适用场景和最佳实践。`,
            url: fullURL,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: '首页', item: baseURL },
                { '@type': 'ListItem', position: 2, name: '范式', item: `${baseURL}/paradigms` },
                { '@type': 'ListItem', position: 3, name: paradigmName, item: fullURL }
              ]
            }
          }
        ]
      }
    }

    // 默认返回网站 schema
    return [websiteSchema]
  })

  // 注入到 head
  useHead({
    script: computed(() =>
      getJsonLd.value.map(schema => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }))
    )
  })
})
