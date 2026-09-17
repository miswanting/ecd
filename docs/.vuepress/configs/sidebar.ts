import type { SidebarOptions } from '@vuepress/theme-default'

export const sidebar: SidebarOptions = {
  '/guide/': [
    {
      text: '基础篇',
      children: [
        '/guide/',
        '/guide/Quick_Start',
        '/guide/Emuera_Engine',
        '/guide/FAQ',
        {
          text: '入门教程',
          children: [
            '/guide/tutorials/Variable',
            '/guide/tutorials/Type',
            '/guide/tutorials/IO',
            '/guide/tutorials/Summary1',
            '/guide/tutorials/Operation',
            '/guide/tutorials/Expression',
            '/guide/tutorials/Statement',
            '/guide/tutorials/Compound_Statement',
            '/guide/tutorials/Function',
            '/guide/tutorials/Save_Load',
            '/guide/tutorials/Error',
            '/guide/tutorials/System_Flow',
          ]
        },
        {
          text: '进阶教程',
          children: [
            '/guide/advanced/Character',
          ]
        },
        {
          text: '高级教程',
          children: [
            '/guide/advanced/Experience',
            '/guide/advanced/Case_Study',
            '/guide/advanced/Publishing',
            '/guide/advanced/Performance',
            '/guide/advanced/Debugging',
          ]
        },
      ]
    },
    {
      text: '附录',
      children: [
        '/guide/MCS',
        '/guide/History',
      ]
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
        '/reference/ERB_Commands',
        '/reference/ERB_Statements',
        '/reference/ERB_Compound_Statements',
        '/reference/ERB_Internal_Process',
      ]
    },
    {
      text: '速查',
      children: [
        '/reference/Compatibility',
        '/reference/Terminology',
      ]
    },
    '/reference/Error_Index',
    '/reference/Version_Index',
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
        '/translation/Usage',
        '/translation/Config_Settings',
        '/translation/Shortcut',
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
  '/ecosystem/': [
    '/ecosystem/',
  ],
  '/spec/': [
    '/spec/EraBasic',
  ],
  '/development/': [
    '/development/',
    '/development/Emuera',
    '/development/EraMaker',
  ],
  '/contribute/': [
    '/contribute/',
    '/contribute/Documentation_Standard',
  ],
}