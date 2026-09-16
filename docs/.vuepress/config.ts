import { defineUserConfig } from "vuepress";
import { resolve } from "node:path";
import { defaultTheme } from "@vuepress/theme-default";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { markdownChartPlugin } from "@vuepress/plugin-markdown-chart";
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
    sidebar
  }),
  plugins: [
    markdownChartPlugin({
      flowchart: true,
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
  ]
})
