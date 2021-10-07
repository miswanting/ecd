# 输入与输出

## 前言与确认

游戏要求玩家与作品之间存在必要的互动，而对于文字相关的游戏来说，文本的输入输出就是最为关键的一环。如何处理玩家的输入、并输出相应的内容呢？我们可以使用某些命令来实现。

::: warning 教程依赖

本教程假设您已学习过[快速开始](../Quick_Start)和[前置教程](./)。若您尚未学习过，我们强烈推荐您首先学习相应教程。

:::

工程文件夹结构：

```
root/
 ├─ emuera.config
 ├─ Emuera1824.exe
 ├─ CSV/
 └─ ERB/
     └─ System.erb
```

`System.erb`代码确认：

```basic
@EventFirst
  Print Hello World!
  Quit
```

## 数值输入


