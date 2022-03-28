import { defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";
import { mdEnhance } from "vuepress-plugin-md-enhance";
import type { DefaultThemeOptions } from "vuepress";

import { navbar, sidebar } from "./configs";

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
    }),
    [
      '@vuepress/register-components',
      { componentsDir: path.resolve(__dirname, '../../src/components') }
    ],
    [
      '@vuepress/plugin-google-analytics',
      { id: 'G-G6WWR5BRFG' }
    ],
  ]
})
