# 开发

本部分面向**想读懂引擎、甚至改造引擎**的读者。它不教你写游戏脚本，而是带你走进 Emuera 的内部：一个 `.erb` 文件是怎么被读取、解析、执行的？变量和 CSV 在内存里长什么样？

## 内容

1. [Emuera 源码分析](Emuera)
   - 技术栈与工程结构
   - 启动与初始化流程
   - 从 ERB 到执行的完整数据流
   - 变量系统、表达式求值、执行引擎
   - 如何追踪一条命令的实现
2. [Eramaker 源码分析](EraMaker)
   - EraMaker 的定位与架构
   - 从 Emuera 的兼容层反推它的行为

## 参考工程

本仓库的 `.ref/Emuera/` 是一份**只读的 Emuera 原始源码快照**，用于事实对照。它不参与构建，也不应被修改。

- 根命名空间：`MinorShift.Emuera`
- 语言/框架：C# / .NET Framework 4.5 / WinForms
- 阅读入口：`.ref/Emuera/AGENTS.md`

> 本部分的分析尽量以该源码为准，并标注对应的文件路径，方便你自行查阅。

## 相关链接

- [ERB 的内置流程](../reference/ERB_Internal_Process)
- [与 Eramaker 的差异](../translation/Difference)
- [程序流程](../translation/Flow)
