---
home: true
title: 首页
heroText: Era 中文文档
tagline: 做最好用的 Emuera + Eramaker + Erabasic 文档
actions:
  - text: 快速开始
    link: /guide/Quick_Start
    type: primary
  - text: 了解更多
    link: /guide/
    type: secondary
features:
  - title: 更简单
    details: 提供学习曲线更加平滑的快速开始和入门教程，让上手更加容易。
  - title: 更高效
    details: 参考现代脚本文档重新组织文档结构。让使用者能够更快更精确地定位到需要的内容。
  - title: 更完善
    details: 本文档不仅含有 Eramaker 与 Emuera 的全部官方文档的翻译，还有额外的指南、参考等原创内容。
  - title: 更深入
    details: 从最简单的 Emuera 游戏脚本开始，一直深入到对 Eramaker 和 Emuera 的源码分析。
  - title: 更快速
    details: 本文档的部署使用了最新的文档框架 vuepress-vite。在文档表现力、交互复杂度、页面导航、内容编写和部署自动化方面都表现出了简便和敏捷的特性。能够为文档提供一流的基础支持。
  - title: 更通用
    details: Emuera 引擎本身设计定位存在特殊性。本文档在翻译与创作时对相关的描述进行了脱敏。
footer: GPL-3.0+ Licensed | Copyright © 2021-Present Miswanting
---

::: warning 提示

本文档正在**加急**制作中。

无论您是通过何种途径了解到本项目，在您希望提出帮助、意见或建议时，都推荐您优先移步至[讨论](contribute/#讨论)或[勘误](contribute/#勘误)条目，以得到第一时间的支持。

让我们共同将这个项目做好！

:::

# 项目进度

[![Deploy GitHub Pages](https://github.com/miswanting/ecd/actions/workflows/deploy.yml/badge.svg)](https://github.com/miswanting/ecd/actions/workflows/deploy.yml)

## 第一步：翻译部分

1. EraMaker 部分
   - :green_circle:`直译`[CSV 文件格式](translation/CSV_File_Format)
   - :green_circle:`直译`[ERB 文件格式](translation/ERB_File_Format)
   - :green_circle:`直译`[EraBasic 的结构](translation/EraBasic_Structure)
   - :green_circle:`直译`[EraBasic 的变量](translation/EraBasic_Variables)
2. Emuera 部分
   - :green_circle:`直译`[术语表](translation/Glossary)
   - :green_circle:`直译`[调试命令](translation/Debug_Command)
   - :green_circle:`直译`[调试模式](translation/Debug_Mode)
   - :green_circle:`直译`[\_replace.csv](translation/Replace_CSV)
   - :green_circle:`直译`[强制配置项目](translation/Config)
   - :green_circle:`直译`[程序流程](translation/Flow)
   - :yellow_circle:`直译`[与 EraMaker 的差异](translation/Difference)
   - :yellow_circle:`直译`新增的扩展语法
     - :yellow_circle:`直译`[常规](translation/General)
     - :yellow_circle:`直译`[运算符](translation/Operator)
     - :yellow_circle:`直译`[常量与变量](translation/Variable)
     - :yellow_circle:`直译`[用户自定义变量](translation/Custom_Variable)
     - :yellow_circle:`直译`[命令](translation/Command)
     - :yellow_circle:`直译`[函数与预处理器](translation/Function_and_Preprocessor)
     - :yellow_circle:`直译`[表达式函数](translation/Expression)
     - :yellow_circle:`直译`[自定义表达式内函数](translation/Custom_Expression)
     - :yellow_circle:`直译`[头文件](translation/Header_File)
     - :yellow_circle:`直译`[HTML_PRINT 相关](translation/HTML_PRINT)
     - :yellow_circle:`直译`[资源](translation/Resource)

## 第二步：指南部分

- :green_circle:`教程`[快速开始](guide/Quick_Start)
- :yellow_circle:`教程`[入门教程](guide/tutorials/)
  - :black_circle:`教程`Emuera 引擎的使用
  - :green_circle:`教程`[常量与变量](guide/tutorials/Variable)
  - :yellow_circle:`教程`[数值与文本](guide/tutorials/Type)
  - :yellow_circle:`教程`[输入与输出](guide/tutorials/IO)
  - :black_circle:`教程`基本运算
  - :black_circle:`教程`表达式
  - :black_circle:`教程`简单语句
  - :black_circle:`教程`复合语句
  - :black_circle:`教程`函数的定义与用法
  - :black_circle:`教程`游戏的保存与加载
  - :black_circle:`教程`错误与异常
  - :black_circle:`教程`内置流程
- :black_circle:`教程`进阶教程
  - :black_circle:`教程`角色的定义、注册、使用与注销
- :black_circle:`教程`高级教程
  - :black_circle:`教程`开发实战经验与技巧
- :black_circle:`指南`MCS 代码风格介绍
- :black_circle:`指南`Era 系列历史

## 第三步：参考部分

- :black_circle:`参考`CSV 文件
  - :black_circle:`参考`GameBase.csv
  - :black_circle:`参考`Str.csv
  - :black_circle:`参考`CharaXX.csv
  - :black_circle:`参考`其他
- :black_circle:`参考`ERB 文件
  - :black_circle:`参考`文件结构
  - :black_circle:`参考`变量
  - :black_circle:`参考`表达式
  - :black_circle:`参考`语句
  - :black_circle:`参考`复合语句
  - :black_circle:`参考`内置流程

## 第四步：开发部分

- :black_circle:`开发`EraMaker 源码分析
- :black_circle:`开发`Emuera 源码分析
