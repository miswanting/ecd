# Eramaker 源码分析

> **说明**：本仓库的只读参考工程 `.ref/Emuera/` 只包含 **Emuera** 的源码，并不包含 Eramaker 的源码。因此本文不是在“读 EraMaker 的代码”，而是从 **Emuera 的兼容层、配置开关与官方文档**出发，反推 EraMaker 的架构与行为。文中的推断部分已明确标注。

## EraMaker 的定位

EraMaker 是 Era 系列游戏最早的引擎。它确立了用 `CSV` 描述数据、用 `ERB` 编写脚本的基本范式，今天我们在 Emuera 里用到的大部分概念——函数、变量、`PRINT` 命令、固定的游戏流程——都能追溯到它。

它后来停止维护，功能与兼容性上的局限，正是 Emuera 诞生的原因。

## 从“兼容开关”看 EraMaker

Emuera 为了运行老脚本，保留了一批兼容性开关（见[Config 文件参考](../reference/Config_File#兼容性开关)）。**每一个开关，本质上都是在描述 EraMaker 当年的行为**：

| 兼容性开关 | 反推出的 EraMaker 行为 |
| --- | --- |
| `擬似変数RANDの仕様をeramakerに合わせる` | `RAND` 使用 0～32767 的随机数、`X` 为 0 时返回 0、且存在偏差 |
| `ver1739以前の非ボタン折り返しを再現する` | 按钮折行规则与后来的版本不同 |
| `TIMESの計算をeramakerにあわせる` | `TIMES` 的计数方式不同 |
| `SPキャラを使用する` | `CFLAG:0` 非零的角色是特殊角色，必须用 `ADDSPCHARA` 注册 |
| `CALLNAMEが空文字列の時にNAMEを代入する` | 引用空的 `CALLNAME` 时返回 `NAME` |
| `セーブデータをsavフォルダ内に作成する` | 存档位置与后来不同 |
| `ユーザー関数の全ての引数の省略を許可する` | 参数省略规则更宽松 |

更系统的差异清单，可以看[与 Eramaker 的差异](../translation/Difference)——那篇文档里的每一条，几乎都对应 EraMaker 的一个具体行为。

## 架构反推

结合上表与[程序流程](../translation/Flow)，可以大致还原 EraMaker 的架构：

### 1. 解释执行，而非编译

EraMaker 直接逐行解释 `ERB`。这与 Emuera 有本质区别：Emuera 会先把脚本解析成 `LogicalLine` 对象树（见 [Emuera 源码分析](Emuera#从-erb-到执行)），而 EraMaker 更接近“读到一行、解析一行、执行一行”。

### 2. 单一全局变量表

EraMaker 的变量数量是**固定**的：`A`～`Z`、`FLAG`、`CFLAG`、`ABL`、`TALENT`……数组大小由引擎写死，脚本无法定义新变量。这正是 Emuera 引入 `#DIM` / `#DIMS` 的原因。

### 3. 全局函数表，按名字调用

`@函数名` 定义、`CALL` / `JUMP` / `GOTO` 调用的模型一脉相承。EraMaker 没有私有变量、没有头文件、没有宏，一切都在一个扁平的命名空间里。

### 4. 固定流程

从 `@EVENTFIRST`、`@SHOW_SHOP` 到 `@EVENTCOM`、`@EVENTEND`，这套由引擎在特定时机自动调用的“框架函数”，是 EraMaker 定下的规矩。Emuera 完整继承并扩展了它。

### 5. CSV 驱动

`GameBase.csv`、`Str.csv`、`CharaXX.csv`、`Abl.csv`……数据与逻辑分离的设计也来自 EraMaker，格式至今基本未变。

## EraMaker 的局限

从 Emuera 的修正清单可以清楚看到它当年的问题：

- 数组最后一个元素会破坏存档；
- 单目运算符 `-` 的异常（`-100 < 0` 为假）；
- 文件最后一行不被读取；
- 数组越界被静默忽略；
- 函数名可以使用任意符号；
- ……

这些在[与 Eramaker 的差异](../translation/Difference)中都有逐条说明。

## 如何进一步研究

虽然源码不在本仓库，仍有几条路可以走：

1. **读 Emuera 的兼容代码**：`Config` 里与 `eramaker` 相关的分支，本身就是对老行为的说明书；
2. **读官方文档的差异页**：[与 Eramaker 的差异](../translation/Difference)；
3. **对照历史版本**：Emuera 的更新履历里，很多条目都是在“修正与 EraMaker 的差异”；
4. **运行老脚本对照**：开启/关闭兼容开关，观察行为差异。

## 相关链接

- [Emuera 源码分析](Emuera)
- [与 Eramaker 的差异](../translation/Difference)
- [程序流程](../translation/Flow)
- [Era 系列历史](../guide/History)
