# 版本特性索引

Emuera 的版本号形如 `1.XXX`，开发版可能带字母（如 `1.756alpha018`）。本页汇总文档中提到的、**与具体版本相关**的功能与行为变化，便于快速判断“我的版本支持这个特性吗 / 这个行为是什么时候变的”。

> 官方完整的更新履历（`history`）尚未包含在本仓库中，欢迎贡献翻译。本页只收录文档正文里出现过的版本信息。

## 一览

| 版本 | 变化 / 新增 | 出处 |
| --- | --- | --- |
| 1.700 | 新增 `WINAPI` 绘制接口（用 `TextOut` 绘制） | [配置项详解](../translation/Config_Settings) |
| 1.704 | `SAVEDATA` 的第 2 参数可以直接使用字符串表达式 | [命令](../translation/Command) |
| 1.705 | 商店可购买的物品范围不再能改变 | [程序流程](../translation/Flow) |
| 1.712 | 新增**表达式内函数**（方法）；`STRFIND` 可指定第 3 参数（查找起始位置） | [表达式内函数](../translation/Expression)、[命令](../translation/Command) |
| 1.721 | 函数名含符号从“立即报错”改为`警告 Lv 1` | [与 Eramaker 的差异](../translation/Difference) |
| 1.736 | `PRINT` 系的关键字 `K` 与 `D` 不能同时指定 | [命令](../translation/Command) |
| 1.739 | `DRAWLINE` 等换行规格发生变化（可用兼容开关重现旧行为） | [配置项详解](../translation/Config_Settings) |
| 1.750 | 新增**调试模式** | [调试模式](../translation/Debug_Mode) |
| 1.751b → 1.752 | `#SINGLE` 的中断条件修正为“返回值仅为 1 时” | [与 Eramaker 的差异](../translation/Difference) |
| 1.800 | 事件函数的 `#PRI` / `#LATER` / `#SINGLE` 调用顺序完全重现 Eramaker | [与 Eramaker 的差异](../translation/Difference) |
| 1.800 | `ロード時にFORM文字列を解析する` 选项被废除 | [配置项详解](../translation/Config_Settings) |
| 1.803 → 1.805 | `GAMEBASE_GAMECODE` 的数值范围与存档读取规则变化 | [与 Eramaker 的差异](../translation/Difference) |
| 1.806 | `DRAWLINEを常に新しい行で行う` 选项被废除 | [配置项详解](../translation/Config_Settings) |
| 1.807 → 1.808 | 函数参数类型不再自动转换；参数省略规则变化 | [配置项详解](../translation/Config_Settings) |
| 1.808 | `SKIPDISP` 可以紧跟在 `SIF` 之后；`SKIPDISP` 会把 `RESULT:0` 重置为 0 | [命令](../translation/Command) |
| 1.810 | 支持**参数引用传递**（形参用引用型变量） | [函数与预处理指令](../translation/Function_and_Preprocessor) |
| 1.813 | 支持用字符串表达式给字符串变量赋值（`'=`） | [常规](../translation/General) |
| 1.815 | `REF` 指令不再可用 | [用户自定义变量](../translation/Custom_Variable) |
| 1.816 | 不再默认支持 **SP 角色**（`CFLAG:0` 不再特殊） | [命令](../translation/Command) |
| 1.818 | `イメージバッファを使用する` 选项被废除 | [配置项详解](../translation/Config_Settings) |
| 1.820 | `ユーザー関数の引数に自動的にTOSTRを補完する` 的效果曾一度反转 | [配置项详解](../translation/Config_Settings) |
| 1.823 | 资源文件可以放在 `resources/` 的子文件夹中 | [资源](../translation/Resource) |
| 1.824 | 已有 `GSETFONT` / `GSETPEN` 设置，但尚无使用它们的指令 | [命令](../translation/Command) |
| 1738g | 解析模式下启用`加载时显示报告`可显示加载报告 | [术语表](../translation/Glossary) |
| 1800 | 对事件函数使用 `#LOCALSIZE` 时，采用最先执行的函数的设置 | [函数与预处理指令](../translation/Function_and_Preprocessor) |
| 1807 | 符合“角色多维数组变量”的只有 `CDFLAG` | [术语表](../translation/Glossary) |

## 相关链接

- [与 Eramaker 的差异](../translation/Difference)
- [配置项详解](../translation/Config_Settings)
- [Emuera 源码分析](../development/Emuera)
