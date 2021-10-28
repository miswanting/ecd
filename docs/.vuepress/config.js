const { path } = require('@vuepress/utils')

module.exports = {
  base: '/ecd/',
  title: 'Era 中文文档',
  description: 'Eramaker + Emuera + EraBasic 中文文档',
  lang: 'zh-CN',
  themeConfig: {
    navbar: [
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
            text: 'EraMaker',
            link: '/translation/#eramaker-部分',
          },
          {
            text: 'Emuera',
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
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础篇',
          children: [
            '/guide/',
            '/guide/History',
            '/guide/Install',
            '/guide/Quick_Start',
            {
              text: '入门教程',
              children: [
                '/guide/tutorials/Variable',
                '/guide/tutorials/Type',
                '/guide/tutorials/IO',
              ]
            },
          ]
        },
        {
          text: '进阶篇',
        },
        {
          text: '高级篇',
        },
      ],
      '/reference/': [
        {
          text: '文件参考',
          children: [
            '/reference/Config_File',
            '/reference/CSV_File',
          ]
        },
        {
          text: 'EraBasic 语言参考',
          children: [
            '/reference/ERB_Structure',
            '/reference/ERB_Variables',
            '/reference/ERB_Expressions',
            '/reference/ERB_Statements',
            '/reference/ERB_Compound_Statements',
            '/reference/ERB_Internal_Process',
          ]
        },
        '/reference/Error_Index',
      ],
      '/translation/': [
        {
          text: 'EraMaker 部分',
          children: [
            '/translation/CSV_File_Format',
            '/translation/ERB_File_Format',
            '/translation/EraBasic_Structure',
            '/translation/EraBasic_Variables',
          ]
        },
        {
          text: 'Emuera 部分',
          children: [
            '/translation/Glossary',
            '/translation/Debug_Command',
            '/translation/Debug_Mode',
            '/translation/Replace_CSV',
            '/translation/Config',
            '/translation/Flow',
            '/translation/Difference',
            {
              text: '新增语法',
              children: [
                '/translation/General',
                '/translation/Operator',
                '/translation/Variable',
                '/translation/Custom_Variable',
                '/translation/Command',
                '/translation/Function_and_Preprocessor',
                '/translation/Expression',
                '/translation/Custom_Expression',
                '/translation/Header_File',
                '/translation/HTML_PRINT',
                '/translation/Resource',
              ]
            }
          ]
        },
      ],
      '/contribute/': [
        '/contribute/',
        '/contribute/Documentation_Standard',
      ],
    },
  },
  plugins: [
    [
      '@vuepress/register-components',
      { componentsDir: path.resolve(__dirname, '../../src/components') }
    ],
    [
      '@vuepress/plugin-google-analytics',
      { id: 'G-G6WWR5BRFG' }
    ]
  ]
}
