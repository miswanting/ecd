# 数值与文本

## 前言与确认

前面，我们已经学过了变量。如果说有什么需要复习的话，那么实际只有一句话：

> 变量由两部分组成，变量名和值。

仅此而已。但关于**值**，我们有一些话要说。

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

## 

在 Erabasic 中，**值**的类型大致有两种：**数值**和**字符串**。

所谓字符串，其实就是文本啦。

字符串，英文是 String，缩写是 **S**。

这很重要。

前面学到的变量定义`#Dim`语句，是定义**数值**的。

后面加个 **S**，就是定义字符串的了，比如：

```basic
@EventFirst
#DimS Text = "Hello World!"
  Quit
```

