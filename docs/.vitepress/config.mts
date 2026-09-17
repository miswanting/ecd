/**
 * VitePress 并行配置（与 VuePress 共存）。
 *
 * 设计原则：
 * - 本文件及 `.vitepress/` 目录是纯增量，VuePress 那条线（`.vuepress/`、
 *   `configs/*`、`index.md`、`styles/`）保持原样不动。
 * - 导航 / 侧边栏直接复用 `.vuepress/configs` 作为唯一数据源，仅在这里
 *   把 VuePress 的 `children` 适配成 VitePress 的 `items`。
 * - 首页 frontmatter 通过 `transformPageData` 在构建期注入，绝不能让
 *   `layout: home` 出现在共享的 `index.md` 里 —— VuePress 的
 *   `resolvePageLayout` 遇未知 layout 会直接抛错。
 */
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-mermaid-plugin'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve as pathResolve } from 'node:path'
import { navbar, sidebar } from '../.vuepress/configs'
import erb from '../.vuepress/grammars/erb.tmlanguage.json'

const base = process.env.VP_BASE || '/ecd/'

const EraBasic = {
  ...erb,
  name: 'erabasic',
  aliases: ['erb'],
}

const CSV = {
  name: 'csv',
  scopeName: 'source.csv',
  patterns: [
    {
      name: 'comment.line.semicolon.erb',
      begin: ';',
      end: '$',
    },
    {
      name: 'entity.name.function.erb',
      begin: '@',
      end: '$',
    },
    {
      name: 'keyword.operator.erb',
      begin: 'PrintVL',
      end: '$',
    },
  ],
}

// ---- children -> items 适配（不修改 .vuepress 源文件）----------------------
//
// VuePress 的 sidebar 子项可以是「字符串路径」，而 VitePress 的 sidebar 项必须
// 是 `{ text, link }` 或 `{ text, items }` 对象。这里把字符串转成对象，并根据
// 目标页面的 H1 推断出显示文字（否则侧边栏只剩分组标题、内容全空）。

const CONFIG_DIR = dirname(fileURLToPath(import.meta.url))

// 配置会被 Vite 打包到临时文件，`import.meta.url` 并不指向 docs/.vitepress，
// 因此这里按「当前工作目录 + docs」等方式依次探测文档根目录。
function resolveDocsDir(): string {
  const candidates = [
    pathResolve(process.cwd(), 'docs'),
    pathResolve(process.cwd()),
    pathResolve(CONFIG_DIR, '..'),
  ]
  return (
    candidates.find((dir) => existsSync(pathResolve(dir, 'index.md'))) ??
    candidates[0]
  )
}

const DOCS_DIR = resolveDocsDir()

const titleCache = new Map<string, string>()

function titleOf(route: string): string {
  const cached = titleCache.get(route)
  if (cached !== undefined) return cached

  const clean = route.split('#')[0].replace(/\/+$/, '')
  const rel = clean.replace(/^\//, '')
  const candidates = rel === ''
    ? [pathResolve(DOCS_DIR, 'index.md')]
    : [
        pathResolve(DOCS_DIR, `${rel}.md`),
        pathResolve(DOCS_DIR, rel, 'index.md'),
      ]
  const file = candidates.find((p) => existsSync(p))

  let title = ''
  try {
    const md = readFileSync(file!, 'utf8')
    const m = /^#\s+(.+)$/m.exec(md)
    if (m) title = m[1].replace(/`/g, '').trim()
  } catch {
    // 文件不存在时回退到路径片段
  }
  if (!title) {
    title = clean.split('/').filter(Boolean).pop() || '首页'
  }

  titleCache.set(route, title)
  return title
}

type Node = { children?: unknown[]; [key: string]: unknown }
type VPItem = Record<string, unknown> | null

const toItems = (node: unknown): VPItem => {
  // 字符串子项 = 链接，补上从页面标题推断的 text
  if (typeof node === 'string') {
    return { text: titleOf(node), link: node }
  }
  if (!node || typeof node !== 'object') return null

  const { children, ...rest } = node as Node
  if (Array.isArray(children)) {
    return { ...rest, items: children.map(toItems).filter(Boolean) }
  }
  // 既没有子项、也没有链接的空分组直接丢弃，避免渲染成空标题
  if (!rest.link) return null
  return rest
}

const mapNav = (nav: unknown): any =>
  (nav as unknown[]).map(toItems).filter(Boolean)

const mapSidebar = (sb: unknown): any =>
  Array.isArray(sb)
    ? (sb as unknown[]).map(toItems).filter(Boolean)
    : Object.fromEntries(
        Object.entries(sb as Record<string, unknown[]>).map(([key, value]) => [
          key,
          value.map(toItems).filter(Boolean),
        ]),
      )

// ---- 首页 hero（VitePress 专用，VuePress 看不到）----------------------------
const homeHero = {
  name: 'Era 中文文档',
  text: 'Eramaker + Emuera + EraBasic 中文文档',
  tagline: '做最好用的 Emuera + Eramaker + Erabasic 文档',
  actions: [
    { theme: 'brand', text: '快速开始', link: '/guide/Quick_Start' },
    { theme: 'alt', text: '了解更多', link: '/guide/' },
  ],
}

export default withMermaid(
  defineConfig({
  base,
  lang: 'zh-CN',
  title: 'Era 中文文档',
  description: 'Eramaker + Emuera + EraBasic 中文文档',
  // VitePress 的 head 不会自动加 base，这里显式拼上
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    // Google Analytics（VitePress 无插件，按官方文档用 head 注入 gtag）
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-G6WWR5BRFG' },
    ],
    [
      'script',
      {},
      `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-G6WWR5BRFG');`,
    ],
  ],
  // 并行期先放宽死链，避免游离页面（spec/、*-df32 等）挡住构建
  ignoreDeadLinks: true,

  markdown: {
    theme: 'slack-dark',
    // 自定义 TextMate 语法直接作为 LanguageInput 传入；
    // EraBasic 自身声明了 aliases: ['erb']，无需再配 languageAlias。
    // 注意：不能再把 'erabasic' 放进 languages（Shiki v4 会把它当内置语言加载而报错）。
    languages: [EraBasic, CSV, 'html'] as any,
  },

  themeConfig: {
    // themeConfig.logo 会走 withBase，无需手动加 base
    logo: '/favicon.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/miswanting/ecd' },
    ],
    nav: mapNav(navbar),
    sidebar: mapSidebar(sidebar),
    // VuePress 的 index.md 用 frontmatter `footer`；VitePress 没有该字段，
    // 这里用 themeConfig 补齐（默认主题仅在无侧边栏页面显示 footer）
    footer: {
      message: 'GPL-3.0+ Licensed',
      copyright: 'Copyright © 2021-Present Miswanting',
    },
  },

  transformPageData(pageData) {
    if (pageData.relativePath === 'index.md') {
      // 只影响 VitePress 构建；VuePress 的 `home: true` 与 `footer` 保持原样
      pageData.frontmatter.layout = 'home'
      pageData.frontmatter.hero = homeHero
      // features 复用 index.md 中已存在的 frontmatter，无需处理
    }
  },

  vite: {
    // 直接复用 VuePress 的 public 目录，favicon 零复制
    // （VitePress 解析为 path.resolve(srcDir, publicDir)）
    publicDir: '.vuepress/public',
    server: { port: 8080 },
  },
}),
)
