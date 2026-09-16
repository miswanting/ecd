# 输入与输出

## 前言与确认

游戏要求玩家与作品之间存在必要的互动，而对于文字相关的游戏来说，文本的输入输出就是最为关键的一环。如何处理玩家的输入、并输出相应的内容呢？我们可以使用一些命令来实现。

::: warning 教程依赖

本教程假设您已学习过[快速开始](../Quick_Start)和[数值与文本](Type)。若您尚未学习过，我们强烈推荐您首先学习相应教程。

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

## 输出：换行还是不换行

我们早就用过 `Print` 了，但它有个小脾气：**它不会自动换行**。

```erb
@EventFirst
  Print 第一行
  Print 还是第一行
  Quit
```

输出：

```
第一行还是第一行
```

要想换行，可以在命令的末尾加一个 `L`（Line，行）：

```erb
@EventFirst
  Print 第一行
  PrintL 还是第一行
  Quit
```

输出：

```
第一行
还是第一行
```

这套规则对 `Print` 全家都适用：`PrintV` 不换行，`PrintVL` 换行；`PrintS` 不换行，`PrintSL` 换行。`PrintL` 自己单独写一行时，就只是单纯地换一行。

## 输入：让玩家说话

### 数值输入

`Input` 命令会停下来等待玩家输入一个数字，并把结果放进一个叫 `RESULT` 的内置变量里：

```erb
@EventFirst
  Print 请输入一个数字：
  Input
  Print 你输入的数字是：
  PrintV RESULT
  PrintL
  Quit
```

运行效果：

```
请输入一个数字：3
你输入的数字是：3
```

其中 `3` 是玩家敲进去的。另外，`PrintL` 单独占一行，是为了让最后输出完能换一行，界面清爽一点。

### 字符串输入

想要接收一段文本（比如名字），就用带 `S` 的 `InputS`，结果会放进 `RESULTS`：

```erb
@EventFirst
  Print 请输入你的名字：
  InputS
  Print 你好，
  PrintS RESULTS
  PrintL
  Quit
```

运行效果：

```
请输入你的名字：小明
你好，小明
```

> 如果玩家直接按回车什么都不输入：`Input` 会要求重新输入；`InputS` 则会把空文本 `""` 当作输入，继续往下走。

## 综合练习：做个自我介绍

把输入和输出拼起来，我们就能做一个简单的互动：

```erb
@EventFirst
  #DimS Name = ""
  #Dim Age = 0

  Print 请输入你的名字：
  InputS
  Name = RESULTS

  Print 请输入你的年龄：
  Input
  Age = RESULT

  PrintL
  Print 大家好，我叫
  PrintS Name
  Print ，今年
  PrintV Age
  PrintL 岁。
  Quit
```

运行效果：

```
请输入你的名字：小明
请输入你的年龄：18

大家好，我叫小明，今年18岁。
```

## 小结

- `Print` 系命令默认**不换行**，名字末尾加 `L` 才会换行；
- `Print` 输出字面文本，`PrintV` 输出数值变量，`PrintS` 输出字符串变量；
- `Input` 读取一个数字，结果在 `RESULT`；
- `InputS` 读取一段文本，结果在 `RESULTS`；
- 把输入和输出组合起来，游戏就能和玩家对话了。

下一步，我们来看看这些数字到底能怎么算：[基本运算](Operation)。
