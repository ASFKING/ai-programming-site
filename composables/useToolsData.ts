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
    description: '阿里巴巴推出的新一代 Agentic 编程平台，支持 Ask/Agent/Experts/Quest 四种模式',
    longDescription: 'Qoder 是阿里巴巴于 2025 年 8 月正式发布的新一代 Agentic 编程平台，基于 VSCode 开源代码深度定制并内置 AI 能力。核心是四种对话模式：Ask（只读问答）、Agent（自主编码）、Experts（多智能体协作）、Quest（全自主编程——描述目标即可端到端交付）。上下文引擎结合代码仓库分析与自适应记忆机制，最多支持约 10 万文件规模的代码库分析。同时提供 IDE、CLI 和 JetBrains 插件三种形态。已接入阿里云百炼 Coding Plan，支持 Qwen 3.5、GLM-5、Kimi-K2.5 等多款模型。',
    capability: { level: 4, label: 'Agent', position: 80 },
    tags: ['Quest自主编程', 'Experts多智能体', '免费使用'],
    allTags: ['IDE', 'CLI', 'JetBrains', 'Agent', '自主', '国内', '免费', '中文', 'Quest', 'Experts', 'Spec驱动', 'MCP', '多模型'],
    platform: 'Mac / Win / Linux',
    pricing: {
      free: true,
      freeDetails: '个人版免费试用（Pro Trial 赠 300 Credits）',
      paid: 'Pro / Pro+ / Ultra 多档付费',
      enterprise: 'Teams 版按需定价'
    },
    network: '无需科学上网，国内网络直连',
    scores: {
      autonomy: 5,
      contextDepth: 5,
      engineering: 4,
      easeOfUse: 4,
      costEfficiency: 5
    },
    features: [
      'Quest 全自主编程（描述目标 → 自主澄清需求 → 规划方案 → 执行代码 → 验证结果）',
      'Experts 多智能体协作（Team Lead 自动拆解任务、组建专家团队并行执行）',
      'Ask / Agent / Experts / Quest 四种对话模式自由切换',
      'NEXT 智能代码预测（基于上下文预测下一步编辑）',
      '上下文引擎（支持约 10 万文件规模代码库分析）',
      'Repo Wiki 自动生成代码库架构文档',
      'Browser Agent / Code Review Agent 专项智能体',
      'MCP 协议 + Skills 扩展 + Hooks 自定义',
      'IDE + CLI + JetBrains 三形态'
    ],
    useCases: [
      'Quest 模式端到端自主开发（复杂功能、原型验证、工具构建）',
      'Experts 模式多专家协作（全栈开发、复杂调试、技术调研）',
      'Spec 驱动的工程化开发（Code with Spec 场景）',
      '快速原型验证（Prototype Demos 场景）',
      '国内开发者的 Agentic 编程首选'
    ],
    pros: [
      'Quest 模式全自主编程，真正「定义目标、审查结果」',
      '上下文引擎支持 10 万文件级代码库，理解能力强',
      '免费使用，国内直连',
      '四种模式覆盖从问答到全自主的全场景',
      '阿里云百炼 Coding Plan 接入，多模型调用不消耗 Credits'
    ],
    cons: [
      '生态相对较新，社区规模较小',
      'Quest 模式长时间运行可能消耗大量 Credits',
      'JetBrains 插件和团队版部分功能仍在接入中',
      '基于 VSCode，对非 VSCode 用户有切换成本'
    ],
    pitfalls: [
      'Quest 模式虽然自主性强，但长时间并行任务会消耗大量 Credits——注意监控用量',
      'Experts 模式适合复杂任务，日常补全用 Ask 或 Agent 模式即可',
      'Quest 的「Code with Spec」场景会先生成 Spec 文档再执行，适合需要可追溯性的项目；快速验证用 Prototype Demos 场景跳过 Spec'
    ],
    tips: [
      '日常编码用 Agent 模式，复杂任务切 Experts 或 Quest 模式',
      'Quest 模式的三种场景要选对：Code with Spec（复杂功能）、Prototype Demos（快速原型）、Create Tools（构建工具）',
      '用 Repo Wiki 功能自动生成代码库架构文档，帮助 AI 更好理解项目',
      '接入阿里云百炼 Coding Plan 后，调用 Qwen/GLM/Kimi 等模型不消耗 Credits',
      'CLI 版本用 `qoder .` 命令直接打开当前目录'
    ],
    competitors: ['trae', 'cursor', 'github-copilot'],
    models: 'Qwen 3.5 / GLM-5 / Kimi-K2.5 及多种主流大模型（通过百炼 Coding Plan 接入）',
    website: 'https://qoder.com',
    learningResources: [
      { title: 'Qoder 官方文档', url: 'https://docs.qoder.com/zh/quick-start' },
      { title: 'Qoder CLI 文档', url: 'https://docs.qoder.com/cli/quick-start' },
      { title: 'Quest 模式文档', url: 'https://docs.qoder.com/user-guide/quest-mode' }
    ]
  },
  {
    id: 'codebuddy',
    name: 'CodeBuddy',
    icon: '🦊',
    vendor: '腾讯云',
    region: '国内',
    form: 'IDE',
    description: '腾讯云推出的全流程智能编程工具，支持 IDE / 插件 / CLI 三种形态',
    longDescription: 'CodeBuddy 是腾讯云推出的 AI 全流程智能编程工具，致力于构建产品、设计、研发、部署无缝协作的共生环境。支持 IDE、插件和 CLI 三种形态，覆盖从专业开发者到零基础用户的全场景需求。核心亮点包括：智能需求分析（自然语言转 PRD）、设计稿智能生成（手绘草图/自然语言转高保真设计稿）、Figma 设计稿一键转代码、以及内置 Supabase 和腾讯 CloudBase 的 BaaS 服务集成，支持一键部署至 CloudStudio、EdgeOne Pages 等平台。',
    capability: { level: 4, label: 'Agent', position: 72 },
    tags: ['产设研一体', '多形态', '免费使用'],
    allTags: ['IDE', '插件', 'CLI', 'Agent', '国内', '免费', '腾讯云', '中文', 'Figma', '全流程', '设计转代码'],
    platform: 'Mac / Win / Linux',
    pricing: {
      free: true,
      freeDetails: '个人版免费使用',
      paid: '企业版按需定价'
    },
    network: '无需科学上网',
    scores: {
      autonomy: 4,
      contextDepth: 3,
      engineering: 4,
      easeOfUse: 5,
      costEfficiency: 5
    },
    features: [
      '产设研一体全流程（需求→设计→研发→部署）',
      'Figma 设计稿一键转代码',
      '智能需求分析（自然语言转 PRD）',
      '多形态支持（IDE / 插件 / CLI）',
      'BaaS 服务集成（Supabase / CloudBase）',
      '多模型支持（混元 / DeepSeek 等）',
      'MCP 协议支持'
    ],
    useCases: [
      '产设研一体化开发（产品/设计/开发协同）',
      '设计稿转代码（Figma 集成）',
      '腾讯云生态项目的全流程开发',
      '零基础用户的「对话即编程」体验',
      'DevOps / 运维场景（CLI 形态）'
    ],
    pros: [
      '免费使用',
      '三种形态覆盖全场景（IDE / 插件 / CLI）',
      '设计稿转代码能力独特（内置 Figma）',
      'BaaS 服务开箱即用（Supabase / CloudBase）',
      '中文支持好，国内直连'
    ],
    cons: [
      'IDE 版本仍在快速迭代，部分功能不够稳定',
      '独立编码能力不如 Cursor / Claude Code',
      '社区规模较小',
      '强绑定腾讯云生态，非腾讯云用户体验优势不明显'
    ],
    pitfalls: [
      'IDE 版本和插件版功能差异较大——IDE 版主打「对话即编程」全流程，插件版更偏传统补全',
      '设计稿转代码功能对复杂交互原型的还原度有限，仍需人工调整',
      '如果你不用腾讯云生态，核心差异化优势会大打折扣'
    ],
    tips: [
      '如果你是产品/设计/开发一体的全栈角色，优先试 IDE 版——它能从 PRD 到部署一站式完成',
      '插件版适合已有 VS Code / JetBrains 工作流的开发者，零切换成本',
      '用 CLI 版做 DevOps 自动化和批量任务处理',
      '配合 MCP 协议可以接入更多外部工具和知识库'
    ],
    competitors: ['trae', 'qoder', 'github-copilot'],
    models: '混元大模型 / DeepSeek 等多种对话大模型',
    website: 'https://www.codebuddy.cn',
    learningResources: [
      { title: 'CodeBuddy 官方文档', url: 'https://www.codebuddy.cn/docs/ide/Introduction' },
      { title: 'CodeBuddy IDE 下载', url: 'https://copilot.tencent.com/ide/' }
    ]
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: '🏄',
    vendor: 'Codeium',
    region: '国外',
    form: 'IDE',
    description: 'Codeium 出品的 AI 原生 IDE，以 Cascade 智能代理系统著称',
    longDescription: 'Windsurf（原 Codeium IDE）是 Codeium 推出的 AI 原生 IDE，核心是 Cascade 智能代理系统。Cascade 在 VS Code 中提供 Code/Plan/Ask 三种模式：Code 模式为全自动智能代理，可自主创建/编辑/删除文件、运行终端命令；Plan 模式先生成详细的 Markdown 实现计划再执行；Ask 模式为只读探索。支持语音输入、Turbo 自动执行模式、Fast Context 快速代码检索（20x 加速）、MCP 协议扩展、以及实时协作感知。在 JetBrains 中提供 Write/Chat 两种模式。',
    capability: { level: 4, label: 'Agent', position: 78 },
    tags: ['Cascade三模式', 'Plan模式', 'Turbo模式'],
    allTags: ['IDE', 'Agent', '协作', '自主', '国外', '付费', 'Cascade', 'Plan', 'Turbo', 'MCP', '语音输入', '全栈'],
    platform: 'Mac / Win / Linux',
    pricing: {
      free: true,
      freeDetails: 'Free 版可用',
      paid: 'Pro $15/月，Max 按需定价',
      enterprise: 'Teams / Enterprise 按需定价'
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
      'Cascade 三模式（Code 全自动 / Plan 规划 / Ask 只读）',
      'Plan 模式生成 Markdown 计划文件，点击 Implement 一键执行',
      'Turbo 自动执行模式（自动运行终端命令）',
      'Fast Context 快速代码检索（20x 加速）',
      '语音输入与 Cascade 交互',
      'MCP 协议扩展外部工具',
      'Autocomplete 单行/多行代码补全',
      '实时协作感知（Cascade 自动感知你的手动编辑）'
    ],
    useCases: [
      '复杂功能开发与重构（Code 模式）',
      '需要先规划再实现的复杂任务（Plan 模式）',
      '代码库学习与探索（Ask 模式）',
      '全栈开发',
      '需要流畅 AI 协作体验的开发者'
    ],
    pros: [
      'Cascade 三模式覆盖从探索到自主执行的全场景',
      'Plan 模式先规划后执行，减少返工',
      'Turbo 模式自动执行，效率极高',
      'Fast Context 20x 加速代码检索',
      '支持 VS Code + JetBrains 双平台'
    ],
    cons: [
      '需要科学上网',
      '社区规模不如 Cursor',
      '部分功能仍在迭代中',
      'VS Code 和 JetBrains 版本功能有差异（JetBrains 为 Write/Chat 两模式）'
    ],
    pitfalls: [
      'Turbo 模式会自动执行终端命令——务必配置好 deny list，避免危险操作',
      'Plan 模式生成的计划文件存在 ~/.windsurf/plans，记得定期清理旧计划',
      'VS Code 版（Code/Plan/Ask）和 JetBrains 版（Write/Chat）模式不同，别搞混'
    ],
    tips: [
      '日常开发用 Code 模式作为默认，复杂任务切 Plan 模式先规划',
      '用 ⌘+. 快速切换 Cascade 模式',
      'Plan 模式生成的计划文件可以通过 @mentions 在新会话中复用',
      '用 Ask 模式安全地探索不熟悉的代码库，不会修改任何文件',
      'Turbo 模式配合 allow/deny list 使用，兼顾效率和安全'
    ],
    competitors: ['cursor', 'trae', 'github-copilot'],
    models: 'Base Model / Windsurf Premier / GPT-4o / Claude 3.5 Sonnet',
    website: 'https://windsurf.com',
    learningResources: [
      { title: 'Windsurf 官方文档', url: 'https://docs.windsurf.com' },
      { title: 'Cascade 模式文档', url: 'https://docs.windsurf.com/zh/windsurf/cascade/modes' },
      { title: '定价说明', url: 'https://windsurf.com/pricing' }
    ]
  },
  {
    id: 'aider',
    name: 'Aider',
    icon: '🛠️',
    vendor: '开源社区',
    region: '国外',
    form: '终端',
    description: '开源终端 AI pair programming 工具，支持 20+ LLM 后端',
    longDescription: 'Aider 是一个开源的终端 AI pair programming 工具，能直接在 Git 仓库中工作，自动提交代码变更。支持四种聊天模式：code（默认编辑模式）、ask（只读问答）、architect（双模型架构——主模型规划 + 编辑模型执行）、help（工具使用帮助）。支持语音输入、图片/网页上下文、IDE 文件监听、浏览器运行、Prompt 缓存加速等能力。通过 Repository Map 自动分析代码库结构，支持 Linting/Testing 自动修复。在 aider.chat 提供 LLM 代码编辑与重构排行榜。',
    capability: { level: 4, label: 'Agent', position: 80 },
    tags: ['开源免费', 'Architect模式', '20+LLM'],
    allTags: ['终端', 'Agent', '开源', '免费', '国外', 'Git', '多模型', 'Architect', '语音输入', 'IDE监听', '浏览器', '重构', '后端'],
    platform: '终端（Mac / Win / Linux）+ 浏览器 + IDE 监听',
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
      '四种聊天模式（code / ask / architect / help）',
      'Architect 双模型模式（规划模型 + 编辑模型分离）',
      'Git 原生集成（自动 commit，/undo 回退）',
      '支持 20+ LLM 后端（OpenAI/Anthropic/Gemini/DeepSeek/Ollama 等）',
      'Repository Map 自动分析代码库结构',
      '语音输入（Voice-to-Code）',
      'IDE 文件监听模式（watch files，响应 AI 注释）',
      '浏览器运行模式',
      'Prompt 缓存加速',
      'Linting / Testing 自动修复'
    ],
    useCases: [
      '终端 AI pair programming',
      'Architect 模式处理复杂重构（o1 规划 + GPT-4o 执行）',
      '需要灵活切换 LLM 后端的开发者',
      '预算有限但想用 Agent 编程',
      '在 IDE 中通过 AI 注释驱动代码修改'
    ],
    pros: [
      '完全开源免费，代码透明',
      '支持几乎所有主流 LLM（20+ 后端）',
      'Git 集成最深入（自动 commit + /undo）',
      'Architect 模式让弱编辑模型也能高质量输出',
      '社区活跃，提供 LLM 排行榜'
    ],
    cons: [
      '需要自备 LLM API Key，成本取决于模型选择',
      '终端操作对新手有门槛',
      '没有原生 GUI（但支持浏览器模式）',
      '不同模型的代码编辑质量差异大'
    ],
    pitfalls: [
      '虽然工具免费，但 LLM API 调用还是要花钱——用 Prompt 缓存可降低成本',
      'Architect 模式用两个模型会消耗两倍 token，但质量更好——权衡成本与效果',
      '不要添加太多文件到上下文——LLM 会被淹没，只加需要编辑的文件，aider 会通过 Repo Map 自动补充上下文'
    ],
    tips: [
      '推荐模型：Claude 3.5 Sonnet、DeepSeek R1、o3-mini、GPT-4o',
      '用 /ask 先讨论方案，再切 /code 执行——比直接 /code 效果更好',
      'Architect 模式特别适合 o1/o3 系列模型（推理强但编辑弱）',
      '用 --watch 参数在 IDE 中监听文件，通过添加 AI 注释触发修改',
      '配合 .aider.conf.yml 做项目级配置，统一团队使用规范'
    ],
    competitors: ['claude-code', 'codex'],
    models: 'OpenAI (GPT-4o/o1/o3-mini) / Anthropic (Claude 3.5/3.7 Sonnet) / Gemini / DeepSeek / Ollama / GROQ / xAI / Azure / Cohere / OpenRouter / GitHub Copilot / Vertex AI / Amazon Bedrock 等 20+ 后端',
    website: 'https://aider.chat',
    learningResources: [
      { title: 'Aider 官方文档', url: 'https://aider.chat/docs' },
      { title: 'GitHub 仓库', url: 'https://github.com/Aider-AI/aider' },
      { title: 'LLM 代码编辑排行榜', url: 'https://aider.chat/docs/leaderboards/edit.html' },
      { title: 'LLM 重构排行榜', url: 'https://aider.chat/docs/leaderboards/refactor.html' }
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
