import { defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";
import { mdEnhance } from "vuepress-plugin-md-enhance";
import type { DefaultThemeOptions } from "vuepress";
import erb from './grammars/erb.tmlanguage.json'
import { navbar, sidebar } from "./configs";
import yaml from 'js-yaml'

const EraBasic = {
  id: "erabasic",
  scopeName: "source.erb",
  aliases: ["erb", "erabasic"],
  grammar: erb
}

const CSV = {
  id: "csv",
  scopeName: "source.csv",
  aliases: ["csv"],
  grammar: {
    "name": "CSV",
    "scopeName": "source.csv",
    "fileTypes": [
      "csv"
    ],
    "patterns": [
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
}

export default defineUserConfig<DefaultThemeOptions>({
  base: '/ecd/',
  lang: "zh-CN",
  title: 'Era 中文文档',
  description: 'Eramaker + Emuera + EraBasic 中文文档',
  theme: "@vuepress/theme-default",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  port: 80,
  themeConfig: {
    logo: "/favicon.svg",
    repo: "miswanting/ecd",
    navbar,
    sidebar
  },
  plugins: [
    mdEnhance({
      flowchart: true,
      tasklist: true,
    }), [
      '@vuepress/plugin-shiki',
      {
        theme: 'slack-dark',
        langs: [EraBasic, CSV, 'html']
      }
    ], [
      '@vuepress/register-components',
      { componentsDir: path.resolve(__dirname, '../../src/components') }
    ], [
      '@vuepress/plugin-google-analytics',
      { id: 'G-G6WWR5BRFG' }
    ],
  ]
})
