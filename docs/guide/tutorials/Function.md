# 函数的定义与用法

## 前言与确认

写到现在，我们所有的代码都挤在 `@EventFirst` 里。可游戏一旦复杂起来，几百上千行堆在一起，改一行都要找半天。**函数**就是解决这个问题的：它把一段逻辑打包起来，起个名字，之后想用就“叫”它一次。

::: warning 教程依赖

本教程假设您已学习过[快速开始](../Quick_Start)、[简单语句](Statement)和[复合语句](Compound_Statement)。若您尚未学习过，我们强烈推荐您首先学习相应教程。

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

## 定义函数

定义一个函数，就是给一段代码起个名字。名字前要加 `@`：

```erb
@EventFirst
  CALL Greet
  CALL Greet
  Quit

@Greet
  PrintL 你好呀！
  RETURN
```

`@Greet` 这一行表示“下面开始是 Greet 函数的内容”，`RETURN` 表示“函数到此结束”。运行上面的脚本，会输出两遍：

```
你好呀！
你好呀！
```

在这里，`@EventFirst` 和 `@Greet` 都是函数。区别只是：`@EventFirst` 由引擎在“新游戏开始”时自动调用，而 `@Greet` 由我们自己用 `CALL` 叫出来。

## 调用函数

调用函数用 `CALL`，后面跟函数名：

```erb
CALL Greet
```

## 给函数传参数

函数可以接收“材料”，这叫**参数**。传进来的数值放在 `ARG` 里，字符串放在 `ARGS` 里：

```erb
@EventFirst
  CALL Greet, "小明"
  CALL Greet, "小红"
  Quit

@Greet, ARGS:0
  Print 你好，
  PrintS ARGS:0
  PrintL ！
  RETURN
```

输出：

```
你好，小明！
你好，小红！
```

- 定义时写 `@Greet, ARGS:0`，表示这个函数接收一个字符串参数；
- 调用时写 `CALL Greet, "小明"`，把 `"小明"` 传进去；
- 函数内部就能通过 `ARGS:0` 拿到它。

如果参数是数值，就用 `ARG:0`、`ARG:1`……：

```erb
@EventFirst
  CALL Add, 3, 4
  Quit

@Add, ARG:0, ARG:1
  PrintV ARG:0 + ARG:1
  PrintL
  RETURN
```

## 函数的返回值

函数还能把结果“交回来”，这就是**返回值**。用 `RETURN` 返回，调用方从内置变量 `RESULT` 里取：

```erb
@EventFirst
  #Dim Sum = 0
  CALL Add, 3, 4
  Sum = RESULT
  PrintL 3 + 4 = 
  PrintV Sum
  PrintL
  Quit

@Add, ARG:0, ARG:1
  RETURN ARG:0 + ARG:1
```

输出：

```
3 + 4 = 7
```

> 可以一次返回多个值，也可以用 `RETURNF` 专门返回表达式；这些属于进阶用法，现在知道有这回事就好。

## 事件函数：引擎自动调用的函数

前面反复出现的 `@EventFirst`，其实也是一种函数，只不过它是**由引擎在特定时机自动调用**的。这类函数叫**事件函数**。

常见的还有：

- `@SYSTEM_TITLE`：标题画面；
- `@SHOW_SHOP`、`@EVENTTRAIN`、`@EVENTCOM`：游戏流程中的各个环节。

事件函数是“游戏的骨架”，我们会在[内置流程](System_Flow)一节里专门认识它们。这里先记住一句话：**写函数，就是在给引擎或自己准备一段随时可以调用的代码。**

## 小结

- 函数用 `@名称` 定义，用 `RETURN` 结束；
- 用 `CALL 名称` 调用函数；
- 参数通过 `ARG`（数值）和 `ARGS`（字符串）传递；
- 返回值放在 `RESULT` 里；
- 事件函数是引擎在特定时机自动调用的特殊函数。

下一步，我们让游戏能保存进度：[游戏的保存与加载](Save_Load)。
