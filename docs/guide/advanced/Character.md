# 角色的定义、注册、使用与注销

## 前言与确认

Era 系列游戏的核心是“角色”。无论是养成、冒险还是经营，玩家操作的对象、数值的载体，最终都是一个个角色。这一节，我们正式和角色打交道。

::: warning 教程依赖

本教程假设您已学习过[快速开始](../Quick_Start)、[入门教程](../tutorials/)（尤其是[函数的定义与用法](../tutorials/Function)）。若您尚未学习过，我们强烈推荐您首先学习相应教程。

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

## 用 CSV 定义角色

角色不是凭空写出来的，而是先在 `CSV/` 里定义好，再由脚本“注册”进游戏。

在 `CSV/` 中新建一个 `Chara01.csv`，内容如下：

```csv
番号,1
名前,小明
呼び名,小明
基礎,0,2000
基礎,1,1000
能力,0,10
```

逐行看：

| 行 | 含义 |
| --- | --- |
| `番号,1` | 这个角色的编号是 1 |
| `名前,小明` | 名字叫“小明”（`NAME`） |
| `呼び名,小明` | 称呼叫“小明”（`CALLNAME`） |
| `基礎,0,2000` | 基础属性 0 号（体力）的初始值为 2000 |
| `基礎,1,1000` | 基础属性 1 号（精力）的初始值为 1000 |
| `能力,0,10` | 能力 0 号的初始值为 10 |

角色在 CSV 里可以定义名字、基础数据、能力、素质、经验、相性等一大堆属性。现在先了解这些，用不到的先放着。

## 注册角色：ADDCHARA

定义好 CSV 之后，脚本里用 `ADDCHARA` 把角色“请”进游戏：

```erb
@EVENTFIRST
  ADDCHARA 1
  QUIT
```

`ADDCHARA 1` 里的 `1` 是 CSV 里的**角色编号**（也就是 `番号,1` 的那个 1）。执行后，游戏里就多了一个角色。

## 认识三个“身份”

Emuera 用几个内置变量来指代角色，初学者最容易被它们绕晕，这里一次说清：

| 变量 | 含义 |
| --- | --- |
| `MASTER` | 主角（玩家），通常是编号 0 |
| `TARGET` | 当前被操作的对象 |
| `CHARANUM` | 当前游戏里一共有多少个角色 |
| `NO:角色` | 某个角色的 CSV 编号 |

此外，每个角色都有一个**登录编号**（0、1、2……），用来在脚本里定位它。角色变量（如 `NAME`、`BASE`）不写编号时，默认指 `TARGET`。

## 使用角色

### 读取属性

```erb
@EVENTFIRST
  ADDCHARA 1
  #Dim Index = 0
  Index = CHARANUM - 1

  PRINTL 最后一个角色的名字是：
  PRINTS NAME:Index
  PRINTL
  PRINTL 它的体力是：
  PRINTV BASE:Index:0
  PRINTL
  QUIT
```

`NAME:Index` 是“登录编号为 Index 的角色”的名字；`BASE:Index:0` 是它的 0 号基础属性（体力）。数组下标可以从 0 开始，所以最后一个角色的下标是 `CHARANUM - 1`。

### 修改属性

角色变量也能像普通变量一样直接赋值：

```erb
@EVENTFIRST
  ADDCHARA 1
  #Dim Index = 0
  Index = CHARANUM - 1

  BASE:Index:0 = 2500
  PRINTL 体力被改成了：
  PRINTV BASE:Index:0
  PRINTL
  QUIT
```

习惯上，人物关系、好感之类的自定义数据会存在 `CFLAG`（角色标志）里，比如 `CFLAG:Index:0 = 50`。它就像挂在角色身上的、你自己定义的一排抽屉。

## 注销角色：DELCHARA

把角色从游戏中移除，用 `DELCHARA`：

```erb
DELCHARA 1        ; 移除登录编号为 1 的角色
```

如果想清空所有角色，可以用：

```erb
DELALLCHARA
```

> `DELALLCHARA` 会连主角一起删掉，通常配合 `RESETDATA`（重置全部数据）使用。真要用时，记得再补上必要的角色。

## 小结

- 角色先在 `CSV/CharaXX.csv` 里定义，再用 `ADDCHARA <CSV编号>` 注册进游戏；
- `MASTER` 是主角，`TARGET` 是当前对象，`CHARANUM` 是角色总数；
- 角色变量用 `变量名:登录编号[:元素]` 访问，如 `NAME:0`、`BASE:0:0`；
- `CFLAG` 常用于存放自定义的关系、好感等数据；
- `DELCHARA` 注销单个角色，`DELALLCHARA` 清空全部。

角色有了，接下来就是给游戏加上玩法循环。请进入[开发实战经验与技巧](Experience)，或者回到[入门教程](../tutorials/)继续打基础。
