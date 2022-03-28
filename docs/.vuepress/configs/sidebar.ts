import { SidebarConfig } from '@vuepress/theme-default'

export const sidebar: SidebarConfig = {
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
            '/guide/tutorials/Summary1',
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
        '/reference/ERB_Commands',
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
}