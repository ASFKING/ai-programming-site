/**
 * AI 编程工具数据（2026 年 4 月）
 * 
 * 叠加结构：工具 = 形态（Form）+ 能力（Capability）+ 模型（Model）
 * - 形态层：IDE / 终端 / 插件 / Web → 决定使用场景
 * - 能力层：补全 → 辅助 → 协作 → Agent → 自主 → 决定期望管理
 * - 模型层：隐藏在详情页，不作为分类维度
 */

// ========== 类型定义 ==========

export type ToolForm = 'IDE' | '终端' | '插件' | 'Web'
export type ToolRegion = '国内' | '国外'
export type CapabilityLevel = 1 | 2 | 3 | 4 | 5

/** 能力光谱位置（1=补全, 2=辅助, 3=协作, 4=Agent, 5=自主） */
export interface CapabilitySpectrum {
  level: CapabilityLevel
  label: string
  /** 0-100 的位置百分比，用于可视化 */
  position: number
}

export interface ToolPricing {
  free: boolean
  freeDetails?: string
  paid?: string
  enterprise?: string
}

export interface Tool {
  id: string
  name: string
  icon: string
  vendor: string
  region: ToolRegion
  form: ToolForm
  description: string
  longDescription: string
  /** 能力光谱 */
  capability: CapabilitySpectrum
  /** 核心功能标签（3 个以内） */
  tags: string[]
  /** 全部标签（用于筛选） */
  allTags: string[]
  platform: string
  pricing: ToolPricing
  network: string
  /** 评分维度（新版） */
  scores: {
    autonomy: CapabilityLevel        // 自主性：AI 能独立完成多少工作
    contextDepth: CapabilityLevel    // 上下文深度：能理解多大的代码库
    engineering: CapabilityLevel     // 工程化能力：是否支持 spec/测试/CI
    easeOfUse: CapabilityLevel       // 上手成本：安装到产出的时间（5=极低门槛）
    costEfficiency: CapabilityLevel  // 成本效率：每元能完成多少工作量（5=极低成本）
  }
  features: string[]
  useCases: string[]
  pros: string[]
  cons: string[]
  pitfalls: string[]
  tips: string[]
  /** 主要竞品 id 列表 */
  competitors: string[]
  /** 底层模型信息 */
  models: string
  /** 官网链接 */
  website: string
  /** 学习资源 */
  learningResources: { title: string, url: string }[]
}

// ========== 工具数据 ==========

export const tools: Tool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '💻',
    vendor: 'Anysphere',
    region: '国外',
    form: 'IDE',
    description: '基于 VS Code fork 的 AI 原生 IDE，支持 8 个智能体并行工作',
    longDescription: 'Cursor 是当前最流行的 AI 原生 IDE 之一，基于 VS Code 深度定制。它的核心优势在于 Composer 多文件协同编辑和 8 个 Agent 并行工作能力，能同时处理项目中的不同模块。支持自定义模型端点，可接入 Claude、GPT 等多种模型。',
    capability: { level: 4, label: 'Agent', position: 80 },
    tags: ['Agent强', '多文件', '前端友好'],
    allTags: ['IDE', 'Agent', '国外', '付费', '多文件', '前端', '全栈', '自定义模型', 'VS Code'],
    platform: 'Mac / Win / Linux',
    pricing: {
      free: true,
      freeDetails: '基础版免费（2000 次补全/月）',
      paid: 'Pro $20/月，Ultra $200/月',
      enterprise: 'Business $40/人/月'
    },
    network: '需要科学上网',
    scores: {
      autonomy: 4,
      contextDepth: 5,
      engineering: 4,
      easeOfUse: 4,
      costEfficiency: 3
    },
    features: [
      'Composer 多文件协同编辑',
      '8 个智能体并行工作',
      '自定义模型端点（可接入 Claude/GPT 等）',
      '.cursorrules 项目级 AI 行为配置',
      '上下文感知的代码补全',
      '内联编辑（Cmd+K）'
    ],
    useCases: [
      '前端开发（React、Vue、Svelte）',
      '快速原型构建',
      '多文件协同编辑',
      '需要深度 AI 集成的开发工作流'
    ],
    pros: [
      'Agent 模式强大，能自主完成复杂任务',
      '基于 VS Code，生态兼容性好',
      '支持自定义模型，灵活性高',
      '社区活跃，更新迭代快'
    ],
    cons: [
      '需要科学上网',
      'Pro 版价格较高（$20/月）',
      '部分 VS Code 扩展兼容性问题',
      'Agent 模式有时会过度修改文件'
    ],
    pitfalls: [
      'Agent 模式可能过度修改——先用 git commit 保存当前状态再操作',
      '免费额度 2000 次/月，重度使用需 Pro',
      '.cursorrules 写得不好会导致 AI 输出质量下降',
      '不要在 Agent 模式下同时修改太多文件，容易失控'
    ],
    tips: [
      '用 @file 引用特定文件作为上下文，比泛泛描述更精准',
      'Agent 模式下先让它"看"再让它"改"——先分析再执行',
      '写好 .cursorrules 比写好 prompt 更重要，它是项目级的 AI 配置',
      '大文件修改用 Composer，小修改用 Cmd+K 内联编辑',
      '用 .cursorignore 排除不需要 AI 分析的文件（如 node_modules、dist）'
    ],
    competitors: ['trae', 'claude-code', 'github-copilot'],
    models: '支持 Claude 3.5 Sonnet、GPT-4o、自定义模型端点',
    website: 'https://cursor.com',
    learningResources: [
      { title: 'Cursor 官方文档', url: 'https://cursor.com/docs' },
      { title: 'Cursor 社区论坛', url: 'https://forum.cursor.com' }
    ]
  },
  {
    id: 'trae',
    name: 'Trae',
    icon: '🔥',
    vendor: '字节跳动',
    region: '国内',
    form: 'IDE',
    description: '字节跳动出品的 AI 原生 IDE，支持 SOLO 全流程开发模式',
    longDescription: 'Trae 是字节跳动推出的国内首个 AI 原生 IDE，深度适配中文开发环境。核心亮点是 SOLO 智能体模式，能从需求分析到代码交付全流程自主完成。免费使用且国内直连，是国内开发者的首选 AI 编程工具。',
    capability: { level: 4, label: 'Agent', position: 80 },
    tags: ['SOLO智能体', '中文深度适配', '免费使用'],
    allTags: ['IDE', 'Agent', '国内', '免费', '中文', '全栈', 'SOLO', '前端', '后端'],
    platform: 'Mac / Win',
    pricing: {
      free: true,
      freeDetails: '基础功能免费',
      paid: '高级功能需登录解锁'
    },
    network: '无需科学上网，国内网络直连',
    scores: {
      autonomy: 4,
      contextDepth: 4,
      engineering: 4,
      easeOfUse: 5,
      costEfficiency: 5
    },
    features: [
      'SOLO 智能体模式（全流程自主开发）',
      'Builder 模式（可视化构建）',
      '中文深度适配',
      '上下文记忆',
      '自动重构与错误修复'
    ],
    useCases: [
      '国内开发者的首选 AI 编程工具',
      '全流程 AI 开发',
      '中文项目开发',
      '不想翻墙的开发者'
    ],
    pros: [
      '完全免费使用',
      '国内直连，无需科学上网',
      '中文支持最好',
      'SOLO 模式能端到端交付'
    ],
    cons: [
      '生态相对 Cursor 较新',
      '社区规模较小',
      '部分高级功能仍在迭代中',
      '仅支持 Mac 和 Windows'
    ],
    pitfalls: [
      'SOLO 模式生成的代码需要人工 Review，不要盲目信任',
      '中文 prompt 有时效果不如英文，复杂任务建议用英文描述',
      '免费版本可能有使用频率限制'
    ],
    tips: [
      'SOLO 模式适合从零开始的项目，不适合在大型已有项目中使用',
      '用中文描述需求效果更好，但技术术语建议用英文',
      'Builder 模式适合快速搭建 UI 原型',
      '配合 Spec 驱动开发，让 SOLO 按规格执行'
    ],
    competitors: ['cursor', 'qoder', 'github-copilot'],
    models: '字节跳动自研大模型',
    website: 'https://trae.ai',
    learningResources: [
      { title: 'Trae 官方文档', url: 'https://docs.trae.ai' }
    ]
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: '🤖',
    vendor: 'Anthropic',
    region: '国外',
    form: '终端',
    description: 'Anthropic 推出的终端原生智能体，200K tokens 超长上下文',
    longDescription: 'Claude Code 是 Anthropic 推出的终端原生 AI 编程智能体。它没有 GUI 界面，完全在终端中运行，但拥有当前最强的代码推理能力和 200K tokens 的超长上下文窗口。在 SWE-bench 基准测试中排名第一，特别适合大型代码库的深度理解和复杂任务处理。',
    capability: { level: 5, label: '自主', position: 95 },
    tags: ['深度推理', '终端原生', 'SWE-bench第一'],
    allTags: ['终端', 'Agent', '自主', '国外', '付费', '深度推理', '大型代码库', '重构', '后端'],
    platform: '终端（Mac / Win / Linux）',
    pricing: {
      free: false,
      freeDetails: '新用户有免费额度',
      paid: 'Sonnet $3/$15 per MTok，Opus $15/$75 per MTok',
      enterprise: 'Claude Enterprise 按需定价'
    },
    network: '需要科学上网或合规中转',
    scores: {
      autonomy: 5,
      contextDepth: 5,
      engineering: 5,
      easeOfUse: 2,
      costEfficiency: 2
    },
    features: [
      '200K tokens 超长上下文',
      '多智能体并行',
      '终端原生，深度代码推理',
      'SWE-bench 第一',
      '支持 CLAUDE.md 项目配置',
      '自动 Git 操作'
    ],
    useCases: [
      '大型代码库理解与重构',
      '复杂架构设计与实现',
      '需要深度推理的编程任务',
      '端到端的自动化开发流程'
    ],
    pros: [
      '当前最强的代码推理能力',
      '200K 超长上下文，能理解整个项目',
      '终端原生，与现有工作流无缝集成',
      'SWE-bench 评分第一'
    ],
    cons: [
      '按 token 计费，重度使用成本高',
      '没有 GUI，学习曲线陡峭',
      '需要科学上网',
      '对新手不太友好'
    ],
    pitfalls: [
      'token 消耗很快——复杂任务可能一次烧掉几美元，注意监控用量',
      '不要让它同时处理太多文件，容易失控',
      'CLAUDE.md 写得太长会浪费上下文窗口',
      '网络不稳定时体验很差'
    ],
    tips: [
      '先写好 CLAUDE.md 项目配置文件，让 Claude 理解你的项目结构',
      '用 /cost 命令实时监控 token 消耗',
      '复杂任务先让它"plan"再让它"execute"',
      '用 sub-agent 并行处理独立任务，提升效率',
      '定期用 /compact 压缩上下文，避免窗口溢出'
    ],
    competitors: ['cursor', 'codex'],
    models: 'Claude 3.5 Sonnet / Claude 3.5 Opus',
    website: 'https://docs.anthropic.com/en/docs/claude-code',
    learningResources: [
      { title: 'Claude Code 官方文档', url: 'https://docs.anthropic.com/en/docs/claude-code' },
      { title: 'Anthropic 博客', url: 'https://www.anthropic.com/blog' }
    ]
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: '🐙',
    vendor: 'GitHub',
    region: '国外',
    form: '插件',
    description: '全球市场占有率第一的代码补全助手，集成于主流 IDE',
    longDescription: 'GitHub Copilot 是全球使用最广泛的 AI 编程助手，作为插件集成在 VS Code、JetBrains、Neovim 等主流 IDE 中。它的核心优势是实时代码补全和与 GitHub 生态的深度集成。2026 年已支持 Agent 模式（Copilot Workspace），能处理更复杂的任务。',
    capability: { level: 3, label: '协作', position: 60 },
    tags: ['代码补全', '全平台IDE', '企业安全'],
    allTags: ['插件', '补全', '协作', '国外', '付费', 'IDE插件', '企业', 'GitHub', '测试生成'],
    platform: '全平台 IDE（VS Code / JetBrains / Neovim）',
    pricing: {
      free: true,
      freeDetails: '个人版免费（有限功能）',
      paid: 'Individual $10/月，Business $19/人/月',
      enterprise: 'Enterprise $39/人/月'
    },
    network: '需要科学上网',
    scores: {
      autonomy: 3,
      contextDepth: 3,
      engineering: 3,
      easeOfUse: 5,
      costEfficiency: 4
    },
    features: [
      '实时代码补全（业界最快）',
      'IntelliSense 增强',
      '单元测试生成',
      '跨文件上下文感知',
      'Copilot Chat 多轮对话',
      'Copilot Workspace（Agent 模式）'
    ],
    useCases: [
      '日常编码辅助',
      '主流 IDE 集成',
      '企业团队统一管理',
      '学习新语言/框架'
    ],
    pros: [
      '市场占有率第一，生态最成熟',
      '集成在主流 IDE 中，零切换成本',
      '补全速度快，延迟低',
      '企业版安全合规'
    ],
    cons: [
      'Agent 能力相对较弱',
      '需要科学上网',
      '补全有时生成有安全漏洞的代码',
      '对中文注释的理解不如国产工具'
    ],
    pitfalls: [
      '补全的代码可能有安全漏洞——始终 Review 后再接受',
      '不要在包含敏感数据的项目中使用公共版',
      'Business 版和 Enterprise 版功能差异大，选型前仔细对比'
    ],
    tips: [
      '用 Tab 接受补全，Esc 拒绝——养成快速决策的习惯',
      '写好注释再让 Copilot 补全，效果比空文件好 10 倍',
      'Copilot Chat 里用 /fix 命令快速修复错误',
      '用 Copilot 生成单元测试，比手写快很多'
    ],
    competitors: ['cursor', 'trae', 'qoder'],
    models: 'GPT-4o / Claude 3.5 Sonnet（可选）',
    website: 'https://github.com/features/copilot',
    learningResources: [
      { title: 'GitHub Copilot 官方文档', url: 'https://docs.github.com/en/copilot' }
    ]
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: '⚡',
    vendor: 'OpenAI',
    region: '国外',
    form: 'Web',
    description: 'OpenAI 推出的云端 AI 编程智能体，基于 codex-1（o3 优化版）驱动',
    longDescription: 'Codex 是 OpenAI 推出的云端 AI 编程智能体，能在独立沙箱环境中自主执行编程任务。它由 codex-1 驱动——一个针对软件工程优化的 o3 版本，通过强化学习在真实编程任务上训练而成。支持并行处理多个任务，每个任务在独立的沙箱环境中运行，能自主规划、编码、测试、调试，直到交付可用的代码。',
    capability: { level: 5, label: '自主', position: 90 },
    tags: ['自主执行', '端到端', 'codex-1'],
    allTags: ['Web', 'Agent', '自主', '国外', '付费', '端到端', '沙箱', '自动化', '复杂任务'],
    platform: 'Web / 终端',
    pricing: {
      free: false,
      freeDetails: 'ChatGPT Plus 用户有使用额度',
      paid: 'ChatGPT Plus $20/月起',
      enterprise: 'API 按量计费'
    },
    network: '需要科学上网',
    scores: {
      autonomy: 5,
      contextDepth: 4,
      engineering: 4,
      easeOfUse: 3,
      costEfficiency: 3
    },
    features: [
      'codex-1 驱动（基于 o3 的软件工程优化版）',
      '云端沙箱自主执行',
      '多任务并行处理',
      '自动测试与调试',
      '支持 AGENTS.md 项目配置'
    ],
    useCases: [
      '端到端的编程任务交付',
      '复杂项目的自动化开发',
      '需要自主执行的批处理任务',
      '快速验证技术方案'
    ],
    pros: [
      '自主性最强，几乎不需要人工干预',
      '云端执行，不占用本地资源',
      'codex-1 针对软件工程深度优化',
      '多任务并行，效率高'
    ],
    cons: [
      '按 token 计费，成本不可控',
      '云端执行有延迟',
      '需要科学上网',
      '对本地项目环境的感知有限'
    ],
    pitfalls: [
      '云端沙箱环境与本地可能不一致——生成的代码需要本地验证',
      '复杂任务的 token 消耗可能远超预期',
      '不要把包含密钥的任务交给 Codex'
    ],
    tips: [
      '把任务描述得越具体越好——模糊的需求会导致模糊的输出',
      '先让它做小任务验证效果，再给大任务',
      '用 API 调用比 Web 界面更灵活',
      '配合 Codex CLI 在本地终端使用，体验更好'
    ],
    competitors: ['claude-code', 'cursor'],
    models: 'codex-1（基于 o3 优化的软件工程专用模型）',
    website: 'https://openai.com/index/introducing-codex/',
    learningResources: [
      { title: 'OpenAI Codex 文档', url: 'https://platform.openai.com/docs' }
    ]
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '🚀',
    vendor: 'Google',
    region: '国外',
    form: 'IDE',
    description: 'Google 推出的 AI 原生 IDE，随 Gemini 3.0 一同发布',
    longDescription: 'Antigravity 是 Google 于 2025 年 11 月随 Gemini 3.0 一同发布的全新 AI 原生集成开发环境。它不是传统编辑器的插件扩展，而是将 AI 深度融入开发流程的全新 IDE。定位为 AI 主动构建系统的协作平台，开发者角色从编码者转变为任务定义者和质量守门人。',
    capability: { level: 4, label: 'Agent', position: 78 },
    tags: ['Google出品', 'Gemini驱动', 'AI原生'],
    allTags: ['IDE', 'Agent', '国外', '免费', 'Google', 'Gemini', 'AI原生', '全栈'],
    platform: 'Mac / Win / Linux',
    pricing: {
      free: true,
      freeDetails: '免费使用（需 Google 账号）'
    },
    network: '需要科学上网',
    scores: {
      autonomy: 4,
      contextDepth: 4,
      engineering: 4,
      easeOfUse: 4,
      costEfficiency: 4
    },
    features: [
      'Gemini 3.0 深度集成',
      'AI 主动构建系统',
      '全流程智能体协作',
      '代码生成与自主执行'
    ],
    useCases: [
      'Google 生态开发者',
      '全流程 AI 辅助开发',
      '需要深度 AI 集成的项目',
      '探索 AI 原生 IDE 体验'
    ],
    pros: [
      'Google 出品，模型能力强',
      '免费使用',
      'AI 原生设计，非插件改造',
      '与 Google 生态深度集成'
    ],
    cons: [
      '需要科学上网',
      '生态相对较新',
      '社区和文档仍在完善中',
      '仅支持在线使用'
    ],
    pitfalls: [
      '作为较新的 IDE，部分功能可能不如 Cursor 成熟',
      '需要 Google 账号，对国内用户有门槛'
    ],
    tips: [
      '适合想体验 Google AI 开发生态的开发者',
      '可以与 Gemini API 配合使用',
      '关注 Google I/O 大会获取最新功能更新'
    ],
    competitors: ['cursor', 'trae', 'windsurf'],
    models: 'Gemini 3.0',
    website: 'https://antigravity.dev',
    learningResources: [
      { title: 'Google Antigravity 官方文档', url: 'https://developers.google.com/antigravity' }
    ]
  },
  {
    id: 'qoder',
    name: 'Qoder',
    icon: '⚡',
    vendor: '阿里巴巴',
    region: '国内',
    form: 'IDE',
    description: '阿里巴巴推出的 AI 编程平台，支持多模式协作开发',
    longDescription: 'Qoder 是阿里巴巴推出的 AI 编程平台，定位为 Agentic Coding 平台。支持编辑器模式（Tab 补全 + Agent 对话）和 Experts 模式（自动组建 AI 专家团队并行工作）。同时提供 IDE、CLI 和 JetBrains 插件三种形态，覆盖不同开发者的使用习惯。',
    capability: { level: 4, label: 'Agent', position: 75 },
    tags: ['多模式', '免费使用', '国内直连'],
    allTags: ['IDE', 'Agent', '国内', '免费', '中文', 'CLI', 'JetBrains', 'Spec驱动'],
    platform: 'Mac / Win / Linux',
    pricing: {
      free: true,
      freeDetails: '基础功能免费'
    },
    network: '无需科学上网，国内网络直连',
    scores: {
      autonomy: 4,
      contextDepth: 4,
      engineering: 4,
      easeOfUse: 4,
      costEfficiency: 5
    },
    features: [
      'Experts 模式（AI 专家团队并行）',
      'Tab 补全 + Agent 对话',
      'RepoWiki 自动文档生成',
      'Spec 驱动开发支持',
      'CLI + IDE + JetBrains 三形态'
    ],
    useCases: [
      '全流程 AI 开发',
      '需要多专家协作的复杂项目',
      '国内开发者的 Agent 编程',
      'Spec 驱动的工程化开发'
    ],
    pros: [
      '免费使用',
      '国内直连，速度快',
      'Experts 模式创新性强',
      '支持多形态（IDE/CLI/JetBrains）'
    ],
    cons: [
      '生态相对较新',
      '社区规模较小',
      '高级功能仍在迭代中'
    ],
    pitfalls: [
      'Experts 模式适合复杂任务，日常补全用普通模式即可',
      '作为较新的工具，部分功能可能不够稳定'
    ],
    tips: [
      'Experts 模式适合从零搭建项目，自动组建专家团队',
      '用 Spec 驱动开发可以提高代码质量',
      'CLI 版本适合终端重度用户'
    ],
    competitors: ['trae', 'cursor', 'github-copilot'],
    models: '支持多种主流大模型',
    website: 'https://qoder.com',
    learningResources: []
  },
  {
    id: 'codebuddy',
    name: 'CodeBuddy',
    icon: '🦊',
    vendor: '腾讯云',
    region: '国内',
    form: '插件',
    description: '腾讯云 AI 编程助手，与腾讯云生态深度集成',
    longDescription: 'CodeBuddy 是腾讯云推出的 AI 编程助手，与腾讯云生态深度集成。支持混元大模型，提供代码补全、对话、Agent 等功能。特别适合使用腾讯云服务的开发者，能直接在 IDE 中操作腾讯云资源。',
    capability: { level: 3, label: '协作', position: 60 },
    tags: ['腾讯云生态', '混元大模型', '免费使用'],
    allTags: ['插件', '补全', '协作', 'Agent', '国内', '免费', '腾讯云', '中文', '企业'],
    platform: 'Mac / Win',
    pricing: {
      free: true,
      freeDetails: '个人版免费',
      paid: '企业版按需定价'
    },
    network: '无需科学上网',
    scores: {
      autonomy: 3,
      contextDepth: 3,
      engineering: 3,
      easeOfUse: 5,
      costEfficiency: 5
    },
    features: [
      '腾讯云生态集成',
      '混元大模型驱动',
      '代码补全与对话',
      'MCP 协议支持',
      'Agent 模式'
    ],
    useCases: [
      '腾讯云生态项目',
      '全栈开发',
      '国内开发者的 AI 辅助',
      '企业团队协作'
    ],
    pros: [
      '免费使用',
      '与腾讯云生态深度集成',
      '中文支持好',
      'MCP 协议支持'
    ],
    cons: [
      '强绑定腾讯云生态',
      '独立能力不如 Cursor',
      '社区规模较小',
      '模型能力有提升空间'
    ],
    pitfalls: [
      '如果你不用腾讯云，它的核心优势就发挥不出来',
      'Agent 模式还在迭代中，不要期望太高'
    ],
    tips: [
      '如果你的项目部署在腾讯云上，CodeBuddy 是最佳选择',
      '用 MCP 协议可以接入更多工具和能力'
    ],
    competitors: ['trae', 'qoder', 'github-copilot'],
    models: '混元大模型',
    website: 'https://cloud.tencent.com/product/codebuddy',
    learningResources: [
      { title: 'CodeBuddy 官方文档', url: 'https://cloud.tencent.com/document/product/2509' }
    ]
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: '🏄',
    vendor: 'Codeium',
    region: '国外',
    form: 'IDE',
    description: 'Codeium 出品的 AI 原生 IDE，以 Flow 模式著称',
    longDescription: 'Windsurf（原 Codeium IDE）是 Codeium 推出的 AI 原生 IDE，核心特点是 Flow 模式——AI 能像 pair programmer 一样与开发者实时协作，自动理解项目上下文并提供建议。在 2025-2026 年获得了大量关注，是 Cursor 的有力竞争者。',
    capability: { level: 4, label: 'Agent', position: 75 },
    tags: ['Flow模式', '实时协作', '性价比高'],
    allTags: ['IDE', 'Agent', '协作', '国外', '付费', 'Flow', '实时', '全栈', '性价比'],
    platform: 'Mac / Win / Linux',
    pricing: {
      free: true,
      freeDetails: '基础版免费',
      paid: 'Pro $15/月',
      enterprise: 'Enterprise 按需定价'
    },
    network: '需要科学上网',
    scores: {
      autonomy: 4,
      contextDepth: 4,
      engineering: 4,
      easeOfUse: 4,
      costEfficiency: 4
    },
    features: [
      'Flow 模式（实时 pair programming）',
      'Cascade 多步推理',
      '上下文感知的代码建议',
      '终端集成',
      '多模型支持'
    ],
    useCases: [
      '实时 pair programming',
      '全栈开发',
      '需要流畅 AI 协作体验的开发者',
      '预算敏感的开发者（比 Cursor 便宜）'
    ],
    pros: [
      'Flow 模式体验流畅',
      '价格比 Cursor 便宜（$15 vs $20）',
      '上下文理解能力强',
      '界面简洁'
    ],
    cons: [
      '需要科学上网',
      '社区规模不如 Cursor',
      '部分功能仍在迭代中',
      '插件生态不如 VS Code 原版'
    ],
    pitfalls: [
      'Flow 模式有时会"过于主动"——学会适时关闭自动建议',
      '与 Cursor 相比，Agent 模式的自主性稍弱'
    ],
    tips: [
      'Flow 模式适合 pair programming 场景，Agent 模式适合独立任务',
      '用 Cascade 功能处理多步骤的复杂任务',
      '价格比 Cursor 低 25%，适合预算敏感的开发者'
    ],
    competitors: ['cursor', 'trae', 'github-copilot'],
    models: '支持多种模型（GPT-4o、Claude 等）',
    website: 'https://windsurf.com',
    learningResources: [
      { title: 'Windsurf 官方文档', url: 'https://docs.windsurf.com' }
    ]
  },
  {
    id: 'aider',
    name: 'Aider',
    icon: '🛠️',
    vendor: '开源社区',
    region: '国外',
    form: '终端',
    description: '开源终端 AI 编程工具，与 Claude Code 直接竞争',
    longDescription: 'Aider 是一个开源的终端 AI 编程工具，能直接在 Git 仓库中工作，自动提交代码变更。它支持多种 LLM 后端，可以使用 Claude、GPT、本地模型等。与 Claude Code 的定位类似，但完全开源免费，且对 Git 工作流的支持更深入。',
    capability: { level: 4, label: 'Agent', position: 80 },
    tags: ['开源免费', 'Git原生', '多模型'],
    allTags: ['终端', 'Agent', '开源', '免费', '国外', 'Git', '多模型', '后端', '重构'],
    platform: '终端（Mac / Win / Linux）',
    pricing: {
      free: true,
      freeDetails: '完全开源免费（需自备 LLM API Key）'
    },
    network: '取决于所用模型（云端需翻墙，本地无需）',
    scores: {
      autonomy: 4,
      contextDepth: 4,
      engineering: 4,
      easeOfUse: 3,
      costEfficiency: 4
    },
    features: [
      'Git 原生集成（自动 commit）',
      '支持多种 LLM 后端',
      '终端原生',
      '多文件协同编辑',
      '代码审查模式'
    ],
    useCases: [
      '终端 AI 编程（Claude Code 的开源替代）',
      'Git 工作流深度集成',
      '需要自定义模型的开发者',
      '预算有限但想用 Agent 编程'
    ],
    pros: [
      '完全开源免费',
      'Git 集成最深入',
      '支持几乎所有主流 LLM',
      '社区活跃'
    ],
    cons: [
      '需要自备 LLM API Key',
      '配置有一定门槛',
      '没有 GUI',
      '依赖终端环境'
    ],
    pitfalls: [
      '虽然工具免费，但 LLM API 调用还是要花钱的',
      '不同模型的代码生成质量差异很大——推荐用 Claude Sonnet',
      '首次配置需要了解 API Key 管理'
    ],
    tips: [
      '用 --model claude-3.5-sonnet 指定模型效果最好',
      '用 /add 命令添加文件到上下文，比自动检测更精准',
      'aider 的 auto-commit 功能很方便，但记得 Review 后再 push',
      '配合 .aider.conf.yml 做项目级配置'
    ],
    competitors: ['claude-code', 'codex'],
    models: '支持 Claude、GPT-4o、Gemini、本地模型等',
    website: 'https://aider.chat',
    learningResources: [
      { title: 'Aider 官方文档', url: 'https://aider.chat/docs' },
      { title: 'GitHub 仓库', url: 'https://github.com/Aider-AI/aider' }
    ]
  }
]

// ========== 辅助函数 ==========

/** 根据 id 获取工具 */
export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id)
}

/** 获取能力光谱标签 */
export function getCapabilityLabel(level: CapabilityLevel): string {
  const labels: Record<CapabilityLevel, string> = {
    1: '补全',
    2: '辅助',
    3: '协作',
    4: 'Agent',
    5: '自主'
  }
  return labels[level]
}

/** 获取能力光谱颜色 */
export function getCapabilityColor(level: CapabilityLevel): string {
  const colors: Record<CapabilityLevel, string> = {
    1: '#22d3ee', // cyan
    2: '#34d399', // emerald
    3: '#a78bfa', // purple
    4: '#60a5fa', // blue
    5: '#f87171'  // red
  }
  return colors[level]
}

/** 按地区筛选 */
export function filterByRegion(region: ToolRegion): Tool[] {
  return tools.filter(t => t.region === region)
}

/** 按形态筛选 */
export function filterByForm(form: ToolForm): Tool[] {
  return tools.filter(t => t.form === form)
}

/** 按标签筛选 */
export function filterByTag(tag: string): Tool[] {
  return tools.filter(t => t.allTags.includes(tag))
}

/** 按能力等级筛选 */
export function filterByCapability(minLevel: CapabilityLevel): Tool[] {
  return tools.filter(t => t.capability.level >= minLevel)
}

/** 获取所有唯一标签 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  tools.forEach(t => t.allTags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

// ========== Tool Picker 决策树 ==========

export interface PickerResult {
  primary: string[]
  alternative: string[]
  reason: string
}

type GoalKey = 'project' | 'efficiency' | 'automation' | 'learning'
type NetworkKey = 'domestic' | 'overseas' | 'both'

const decisionTree: Record<string, Record<GoalKey, Record<NetworkKey, PickerResult>>> = {
  beginner: {
    project: {
      domestic: { primary: ['trae'], alternative: ['qoder'], reason: 'Trae 免费 + 国内直连 + SOLO 模式能帮你从零搭建项目' },
      overseas: { primary: ['cursor'], alternative: ['windsurf'], reason: 'Cursor 的 Agent 模式能手把手教你构建项目' },
      both: { primary: ['cursor', 'trae'], alternative: ['windsurf'], reason: 'Cursor Agent 强，Trae 免费且中文好——可以都试试' }
    },
    efficiency: {
      domestic: { primary: ['trae', 'qoder'], alternative: ['codebuddy'], reason: 'Trae 和 Qoder 都免费且国内直连，日常补全足够' },
      overseas: { primary: ['github-copilot'], alternative: ['cursor'], reason: 'Copilot 集成在 IDE 里，零切换成本' },
      both: { primary: ['github-copilot', 'trae'], alternative: ['cursor'], reason: 'Copilot 做日常补全，Trae 做复杂任务' }
    },
    automation: {
      domestic: { primary: ['trae'], alternative: [], reason: 'Trae SOLO 模式是国内最强的自动化方案' },
      overseas: { primary: ['cursor'], alternative: ['windsurf'], reason: 'Cursor Agent 能自主完成多步骤任务' },
      both: { primary: ['cursor', 'trae'], alternative: [], reason: 'Cursor Agent 更强，Trae 免费——按需选择' }
    },
    learning: {
      domestic: { primary: ['trae'], alternative: ['qoder'], reason: 'Trae 中文支持最好，适合边学边用' },
      overseas: { primary: ['cursor'], alternative: ['github-copilot'], reason: 'Cursor 的 Chat 模式能解释代码' },
      both: { primary: ['trae', 'cursor'], alternative: [], reason: 'Trae 学中文资料，Cursor 看英文生态' }
    }
  },
  developer: {
    project: {
      domestic: { primary: ['trae'], alternative: ['codebuddy'], reason: 'Trae SOLO 能处理复杂项目，CodeBuddy 适合腾讯云生态' },
      overseas: { primary: ['cursor', 'claude-code'], alternative: ['windsurf'], reason: 'Cursor 做日常开发，Claude Code 做深度重构' },
      both: { primary: ['cursor', 'claude-code'], alternative: ['trae'], reason: 'Cursor + Claude Code 是目前最强的组合' }
    },
    efficiency: {
      domestic: { primary: ['trae', 'codebuddy'], alternative: ['qoder'], reason: 'Trae 和 CodeBuddy 都有 Agent 能力' },
      overseas: { primary: ['cursor', 'github-copilot'], alternative: ['windsurf'], reason: 'Cursor Agent + Copilot 补全，覆盖全场景' },
      both: { primary: ['cursor'], alternative: ['trae', 'github-copilot'], reason: 'Cursor 是效率最高的单一工具' }
    },
    automation: {
      domestic: { primary: ['trae'], alternative: [], reason: 'Trae SOLO 是国内最强自动化方案' },
      overseas: { primary: ['claude-code', 'codex'], alternative: ['cursor'], reason: 'Claude Code 推理最强，Codex 自主性最强' },
      both: { primary: ['claude-code', 'cursor'], alternative: ['codex'], reason: 'Claude Code 做复杂推理，Cursor 做日常开发' }
    },
    learning: {
      domestic: { primary: ['trae'], alternative: ['codebuddy'], reason: 'Trae 的中文文档和社区最活跃' },
      overseas: { primary: ['cursor'], alternative: ['claude-code'], reason: 'Cursor Chat 能解释代码，Claude Code 能深度分析架构' },
      both: { primary: ['cursor', 'trae'], alternative: [], reason: '两者结合覆盖中英文学习需求' }
    }
  },
  lead: {
    project: {
      domestic: { primary: ['trae'], alternative: ['codebuddy'], reason: 'Trae 适合快速交付，CodeBuddy 适合腾讯云团队' },
      overseas: { primary: ['cursor'], alternative: ['claude-code'], reason: 'Cursor Business 版支持团队管理' },
      both: { primary: ['cursor'], alternative: ['trae'], reason: 'Cursor 的团队管理功能更成熟' }
    },
    efficiency: {
      domestic: { primary: ['trae', 'codebuddy'], alternative: [], reason: '两者免费，适合团队统一使用' },
      overseas: { primary: ['cursor', 'github-copilot'], alternative: [], reason: 'Cursor Business + Copilot Business 是企业标配' },
      both: { primary: ['cursor', 'github-copilot'], alternative: ['trae'], reason: 'Cursor 做 Agent 任务，Copilot 做日常补全' }
    },
    automation: {
      domestic: { primary: ['trae'], alternative: [], reason: 'Trae SOLO 适合团队的自动化需求' },
      overseas: { primary: ['claude-code'], alternative: ['cursor'], reason: 'Claude Code 的 CLAUDE.md 能统一团队 AI 行为' },
      both: { primary: ['claude-code', 'cursor'], alternative: [], reason: '用 CLAUDE.md + .cursorrules 统一团队规范' }
    },
    learning: {
      domestic: { primary: ['trae'], alternative: ['codebuddy'], reason: '中文环境下的最佳选择' },
      overseas: { primary: ['cursor'], alternative: ['github-copilot'], reason: 'Cursor 的文档和社区资源最丰富' },
      both: { primary: ['cursor', 'trae'], alternative: [], reason: '覆盖中英文团队需求' }
    }
  },
  enterprise: {
    project: {
      domestic: { primary: ['codebuddy', 'trae'], alternative: [], reason: 'CodeBuddy 腾讯云生态 + Trae 免费，企业成本可控' },
      overseas: { primary: ['github-copilot', 'cursor'], alternative: [], reason: 'Copilot Enterprise + Cursor Business 是企业标配' },
      both: { primary: ['github-copilot'], alternative: ['cursor'], reason: 'Copilot Enterprise 的管理功能最完善' }
    },
    efficiency: {
      domestic: { primary: ['codebuddy'], alternative: ['trae'], reason: 'CodeBuddy 的企业版功能最完善' },
      overseas: { primary: ['github-copilot'], alternative: ['cursor'], reason: 'Copilot 的企业安全合规最成熟' },
      both: { primary: ['github-copilot'], alternative: [], reason: 'Copilot 的企业安全合规最成熟' }
    },
    automation: {
      domestic: { primary: ['codebuddy'], alternative: ['trae'], reason: 'CodeBuddy 的 MCP 协议支持企业级自动化' },
      overseas: { primary: ['github-copilot', 'codex'], alternative: [], reason: 'Copilot Workspace + Codex 覆盖企业自动化需求' },
      both: { primary: ['github-copilot'], alternative: ['codex'], reason: 'Copilot 的企业管理功能最完善' }
    },
    learning: {
      domestic: { primary: ['codebuddy', 'trae'], alternative: [], reason: '国内工具的中文培训资源更丰富' },
      overseas: { primary: ['github-copilot'], alternative: ['cursor'], reason: 'Copilot 的企业培训体系最成熟' },
      both: { primary: ['github-copilot'], alternative: [], reason: 'Copilot 的企业培训体系最成熟' }
    }
  }
}

/** 根据用户选择获取推荐结果 */
export function getPickerResult(role: string, goal: GoalKey, network: NetworkKey): PickerResult {
  return decisionTree[role]?.[goal]?.[network] ?? {
    primary: ['cursor', 'trae'],
    alternative: ['github-copilot'],
    reason: 'Cursor 和 Trae 是当前最均衡的选择，Copilot 作为日常补全的补充'
  }
}
