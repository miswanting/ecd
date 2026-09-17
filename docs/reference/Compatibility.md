# 兼容性矩阵

同一份脚本，在不同引擎里的表现可能完全不同。本页用一张表汇总常见功能在 **Eramaker** 与 **Emuera** 中的支持情况，帮你快速判断：

- 这个功能我的引擎支持吗？
- 这个行为为什么在两个引擎里不一样？

标记含义：**✓ 支持**、**✗ 不支持**、**△ 行为与另一引擎不同**。

<CompatibilityMatrix />

## 关于「改造版」

社区里的各种**改造版**（私家版、EM+EE 等）通常以 Emuera 为基础，因此本表默认把改造版与 Emuera 同栏。它们在 Emuera 之上**额外**提供了一些能力，常见的有：

- 更多图片、精灵、动画相关指令；
- 工具提示（`TOOLTIP_*`）；
- 更多内置函数与变量。

如果你的游戏要用到这些，请先确认目标玩家使用的是哪一款引擎——**特性在标准 Emuera 里可能并不存在**。

## 关于「行为不同」

标记为 △ 的项目，可以通过 Emuera 的**兼容性开关**让它的行为靠近 Eramaker。例如：

| 现象 | 可尝试的开关 |
| --- | --- |
| `RAND` 的取值范围 / 偏差不同 | `擬似変数RANDの仕様をeramakerに合わせる` |
| 显示在升级版本后错乱 | `ver1739以前の非ボタン折り返しを再現する` |
| 函数参数报“类型不符” | `ユーザー関数の引数に自動的にTOSTRを補完する` |
| 使用了 SP 角色 | `SPキャラを使用する` |

逐项说明见[配置项详解](../translation/Config_Settings#兼容性)，行为差异的完整清单见[与 Eramaker 的差异](../translation/Difference)。

## 相关链接

- [与 Eramaker 的差异](../translation/Difference)
- [配置项详解](../translation/Config_Settings)
- [Eramaker 源码分析](../development/EraMaker)
- [版本特性索引](Version_Index)
