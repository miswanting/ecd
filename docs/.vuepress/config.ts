import { defineUserConfig } from "vuepress";
import { resolve } from "node:path";
import { defaultTheme } from "@vuepress/theme-default";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { markdownChartPlugin } from "@vuepress/plugin-markdown-chart";
import { searchPlugin } from "@vuepress/plugin-search";
import erb from './grammars/erb.tmlanguage.json'
import { navbar, sidebar } from "./configs";

const EraBasic = {
  ...erb,
  name: "erabasic",
  aliases: ["erb"],
}

const CSV = {
  name: "csv",
  scopeName: "source.csv",
  patterns: [
    {
      "name": "comment.line.semicolon.erb",
      "begin": ";",
      "end": "$"
    },
    {
      "name": "entity.name.function.erb",
      "begin": "@",
      "end": "$"
    },
    {
      "name": "keyword.operator.erb",
      "begin": "PrintVL",
      "end": "$"
    }
  ]
}

export default defineUserConfig({
  base: '/ecd/',
  lang: "zh-CN",
  title: 'Era 中文文档',
  description: 'Eramaker + Emuera + EraBasic 中文文档',
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  port: 80,
  theme: defaultTheme({
    logo: "/favicon.svg",
    repo: "miswanting/ecd",
    navbar,
    sidebar,
    // Shiki is used for syntax highlighting, so disable the theme's
    // built-in prismjs highlighter to avoid double processing
    // ("data-highlighter=prismjs" wrappers and duplicated line numbers).
    themePlugins: {
      prismjs: false
    }
  }),
  plugins: [
    markdownChartPlugin({
      flowchart: true,
      // 与 VitePress 并存：Flow.md 已改用 mermaid 语法，两个框架都能渲染
      mermaid: true,
    }),
    shikiPlugin({
      theme: 'slack-dark',
      langs: [EraBasic, CSV, 'html']
    }),
    registerComponentsPlugin({
      componentsDir: resolve(__dirname, '../../src/components')
    }),
    googleAnalyticsPlugin({
      id: 'G-G6WWR5BRFG'
    }),
    // 本地全文搜索（无需外部服务）
    searchPlugin({}),
  ]
})
