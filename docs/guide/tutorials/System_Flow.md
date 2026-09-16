# 内置流程

## 前言与确认

学了这么多，你可能会问：我写的一堆函数，引擎到底什么时候来调用它们？答案是——Emuera 内部有一套**固定的流程**，它在合适的时机自动调用名字特定的函数。我们要做的，就是把内容填进这些“框架函数”里。

::: warning 教程依赖

本教程假设您已学习过[快速开始](../Quick_Start)、[函数的定义与用法](Function)、[复合语句](Compound_Statement)和[游戏的保存与加载](Save_Load)。若您尚未学习过，我们强烈推荐您首先学习相应教程。

:::

先确认一下我们现有的工程文件夹结构：

```
root/
 ├─ emuera.config
 ├─ Emuera1824.exe
 ├─ CSV/
 └─ ERB/
     └─ System.erb
```

其中，`System.erb`的代码为：

```erb
@EventFirst
  Print Hello World!
  Quit
```

## 引擎会自动调用的函数

Emuera 会在特定时机去脚本里找这些函数，找到就调用，找不到就用默认行为（或跳过）。它们就像舞台上的“固定角色”：

| 函数 | 调用时机 | 用途 |
| --- | --- | --- |
| `@SYSTEM_TITLE` | 所有 CSV 加载完毕、以及执行 `BEGIN TITLE` 时 | 标题画面 |
| `@TITLE_LOADGAME` | 在标准标题画面选择“读取存档”时 | 自定义读取画面 |
| `@EVENTFIRST` | 新游戏开始（`BEGIN FIRST`）时 | 游戏初始化、开场 |
| `@SHOW_SHOP` | 进入商店/主循环时 | 主界面、玩家操作菜单 |
| `@EVENTTRAIN` | 开始训练时 | 训练前的准备 |
| `@SHOW_STATUS` | 需要显示状态时 | 状态栏 |
| `@SHOW_USERCOM` | 显示指令菜单时 | 列出可选指令 |
| `@USERCOM` | 玩家选择指令后 | 处理选择 |
| `@EVENTCOM` | 执行指令时 | 指令的具体效果 |
| `@EVENTCOMEND` | 指令结束后 | 收尾处理 |
| `@EVENTEND` | 游戏结束时 | 结算画面 |
| `@SYSTEM_AUTOSAVE` | 自动保存时 | 自定义自动存档内容 |
| `@EVENTLOAD` | 存档读取完毕后 | 读档后的处理 |
| `@CALLTRAINEND` | `CALLTRAIN` 自动执行结束后 | 收尾 |

> 其中 `@SYSTEM_TITLE`、`@EVENTFIRST`、`@SHOW_SHOP` 等是最常打交道的几个；`@EVENTTRAIN`、`@EVENTCOM` 系列则是一套完整的“训练”流程，等你做养成类玩法时再深入了解也不迟。

## 最小可玩流程

我们把前面几节的内容串起来，做一个“能进能出”的最小游戏：

```erb
; 不定义 @SYSTEM_TITLE，就直接使用引擎自带的标题画面

@EVENTFIRST
  CLEARLINE LINECOUNT
  PRINTL 欢迎来到我的第一个游戏！
  PRINTL 在这里，你已经开始了一段冒险。
  PRINTL
  PRINTL 按回车键回到标题画面。
  WAIT
  BEGIN TITLE
```

运行后你会发现：

1. 启动时，引擎显示自带的标题画面；
2. 点击“从头开始”，引擎调用 `@EVENTFIRST`；
3. 我们打印了几行欢迎语，等玩家按下回车；
4. `BEGIN TITLE` 让引擎回到标题画面。

一个“进得去、出得来”的循环就完成了。

## 串起来看

把流程画成图，大致是这样（节点可以点击，会跳到对应的文档）：

<FlowNav />

完整的流程图（含训练流程等细节）可以参阅[程序流程](../../translation/Flow)。

## 小结与结语

- Emuera 有一套固定的流程，会在特定时机自动调用名字特定的函数；
- 我们不是“从头写流程”，而是**把内容填进这些框架函数**；
- `@SYSTEM_TITLE`、`@EVENTFIRST`、`@SHOW_SHOP` 是最常用的入口；
- 完整的流程图见[程序流程](../../translation/Flow)。

到这里，“入门篇”就告一段落了。你已经掌握了变量、类型、输入输出、运算、表达式、语句、函数、存档、排错和流程——这些是继续深入的全部地基。

接下来，可以去看看 [Era 系列历史](../History) 了解这些引擎从何而来，也可以直接进入进阶篇，开始做真正的角色系统。祝你玩得开心！
