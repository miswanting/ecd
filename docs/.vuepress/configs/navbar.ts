import { NavbarConfig } from '@vuepress/theme-default'

export const navbar: NavbarConfig = [
  {
    text: '指南',
    children: [
      {
        text: '快速开始',
        link: '/guide/Quick_Start',
      },
      {
        text: '入门教程',
        link: '/guide/tutorials/',
      },
    ]
  },
  {
    text: '参考',
    link: '/reference/',
  },
  {
    text: '翻译',
    children: [
      {
        text: 'EraMaker文档翻译',
        link: '/translation/#eramaker-部分',
      },
      {
        text: 'Emuera文档翻译',
        link: '/translation/#emuera-部分',
      },
    ]
  },
  {
    text: '开发',
    link: '/development/',
  },
  {
    text: '生态',
    link: '/ecosystem/',
  },
  {
    text: '贡献',
    link: '/contribute/',
  },
  {
    text: '镜像',
    children: [
      {
        text: '全球',
        link: 'https://miswanting.github.io/ecd/',
      },
      {
        text: '中国大陆',
        link: 'https://miswanting.gitee.io/ecd/',
      },
    ]
  },
]