# ERB 的内置流程

Emuera 内部有一套固定的游戏流程。它会在特定时机自动调用名字特定的函数——我们要做的，就是把逻辑填进这些“框架函数”里。教程版见[内置流程](../guide/tutorials/System_Flow)，完整的流程图见[程序流程](../translation/Flow)。

## 引擎自动调用的函数

| 函数 | 调用时机 | 用途 |
| --- | --- | --- |
| `@SYSTEM_TITLE` | CSV 加载完毕、执行 `BEGIN TITLE` 时 | 标题画面 |
| `@TITLE_LOADGAME` | 标准标题画面选择“读取存档”时 | 自定义读取画面 |
| `@EVENTFIRST` | 新游戏开始（`BEGIN FIRST`）时 | 初始化、开场 |
| `@SHOW_SHOP` | 进入商店/主循环时 | 主界面与操作菜单 |
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

> `@CALLTRAINEND` 不是事件函数，不能多重定义。其余带 `EVENT` 前缀的多为事件函数，可以定义多个，全部都会被调用。

## 用 BEGIN 切换流程

`BEGIN` 是推进游戏流程的命令：

| 关键字 | 含义 |
| --- | --- |
| `BEGIN FIRST` | 从头开始 |
| `BEGIN TITLE` | 回到标题画面 |
| `BEGIN TRAIN` | 开始训练 |
| `BEGIN AFTERTRAIN` | 结束训练 |
| `BEGIN ABLUP` | 进入升级界面 |
| `BEGIN TURNEND` | 结束回合 |

调用 `BEGIN` 会终止当前函数的执行，且**不会返回**原来的函数。

## 流程概览

下面这张图是交互式的，点击节点即可跳到对应条目：

<FlowNav />

## 最小示例

```erb
; 不定义 @SYSTEM_TITLE，直接使用引擎自带的标题画面

@EVENTFIRST
  PRINTL 欢迎来到我的游戏！
  WAIT
  BEGIN TITLE
```

## 相关链接

- [内置流程](../guide/tutorials/System_Flow)（教程）
- [程序流程](../translation/Flow)
- [函数与预处理指令](../translation/Function_and_Preprocessor)
- [ERB 的复合语句](ERB_Compound_Statements)
