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
type Node = { children?: Node[]; [key: string]: unknown }

const toItems = (node: Node): Record<string, unknown> => {
  const { children, ...rest } = node
  return children
    ? { ...rest, items: (children as Node[]).map(toItems) }
    : rest
}

const mapNav = (nav: unknown): any => (nav as Node[]).map(toItems)

const mapSidebar = (sb: unknown): any =>
  Array.isArray(sb)
    ? (sb as Node[]).map(toItems)
    : Object.fromEntries(
        Object.entries(sb as Record<string, Node[]>).map(([key, value]) => [
          key,
          value.map(toItems),
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

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'Era 中文文档',
  description: 'Eramaker + Emuera + EraBasic 中文文档',
  // VitePress 的 head 不会自动加 base，这里显式拼上
  head: [['link', { rel: 'icon', href: `${base}favicon.svg` }]],
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
})
