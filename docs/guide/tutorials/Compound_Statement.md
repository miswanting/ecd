# 复合语句

## 前言与确认

`SIF` 只能管一行，实在不够用。现实里的游戏充满“如果……就……”“重复 N 次”“一直做直到……”这样的逻辑，这就需要**复合语句**——能一次控制很多行的语句。

::: warning 教程依赖

本教程假设您已学习过[快速开始](../Quick_Start)、[简单语句](Statement)和[表达式](Expression)。若您尚未学习过，我们强烈推荐您首先学习相应教程。

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

## IF：根据条件选择分支

`IF` 会从多个分支里挑一个执行：

```erb
@EventFirst
  #Dim Age = 18
  IF Age < 6
    PrintL 你是小朋友
  ELSEIF Age < 18
    PrintL 你是少年
  ELSE
    PrintL 你是大人
  ENDIF
  Quit
```

- `IF 条件`：条件成立时，执行到下一个 `ELSEIF`/`ELSE`/`ENDIF` 为止；
- `ELSEIF 条件`：前面的条件都不成立时，再判断这个；
- `ELSE`：前面都不成立时执行；
- `ENDIF`：整个分支结束。

**每一个 `IF` 都必须有对应的 `ENDIF`**，否则会报错：

::: danger 错误信息<a href="javascript:alert('TODO')">索引</a>

> IFに対応するENDIFが設定されていない

找不到与 IF 对应的 ENDIF。

:::

## REPEAT：简单的重复

`REPEAT` 到 `REND` 之间的内容会重复执行若干次。次数写在 `REPEAT` 后面：

```erb
@EventFirst
  REPEAT 3
    Print 第
    PrintV COUNT
    PrintL 次循环
  REND
  Quit
```

输出：

```
第0次循环
第1次循环
第2次循环
```

注意计数的内置变量叫 `COUNT`，它是**从 0 开始**的。

## FOR：更灵活的循环

`FOR` 也能循环，但可以自定义计数的变量、起点和终点：

```erb
@EventFirst
  FOR I, 1, 4
    PrintV I
    PrintL
  NEXT
  Quit
```

输出：

```
1
2
3
```

`FOR I, 1, 4` 的意思是：让 `I` 从 `1` 开始，每轮加 1，直到 `I` 达到 `4` 之前停下来（所以不包含 4）。

## WHILE：条件成立就一直做

`WHILE` 会在条件成立时不断重复，直到条件不再成立：

```erb
@EventFirst
  #Dim I = 0
  WHILE I < 3
    PrintV I
    PrintL
    I += 1
  WEND
  Quit
```

输出：

```
0
1
2
```

> 如果循环里忘了让 `I` 变大，条件就永远成立，程序会陷入**死循环**。写到 `WHILE` 时，记得检查“这个条件最终会变假吗”。

## BREAK 与 CONTINUE

在循环里，我们还能用两个小开关：

- `BREAK`：立刻跳出整个循环；
- `CONTINUE`：跳过本轮剩下的内容，直接进入下一轮。

```erb
@EventFirst
  FOR I, 1, 10
    SIF I == 3
      CONTINUE   ; 3 不打印，直接下一轮
    SIF I == 6
      BREAK      ; 到 6 就整个结束
    PrintV I
    PrintL
  NEXT
  Quit
```

输出：

```
1
2
4
5
```

## SELECTCASE：多路分支

当一个值有很多种可能时，`IF` 会写得很啰嗦，这时用 `SELECTCASE` 更清爽：

```erb
@EventFirst
  #Dim Command = 2
  SELECTCASE Command
    CASE 1
      PrintL 执行第一项
    CASE 2, 3
      PrintL 执行第二或第三项
    CASE 10 TO 20
      PrintL 执行第 10 到 20 项
    CASEELSE
      PrintL 其他情况
  ENDSELECT
  Quit
```

`CASE` 支持多种写法：单个值（`CASE 1`）、多个值（`CASE 2, 3`）、范围（`CASE 10 TO 20`）。都不匹配时执行 `CASEELSE`。

## 嵌套

复合语句可以互相嵌套，比如在循环里写判断：

```erb
@EventFirst
  FOR I, 1, 6
    IF I % 2 == 0
      PrintL 偶数
    ELSE
      PrintL 奇数
    ENDIF
  NEXT
  Quit
```

只要记住**每一层都要完整地闭合**（`IF`…`ENDIF`、`REPEAT`…`REND`），缩进对齐，就不容易出错。

## 小结

- `IF/ELSEIF/ELSE/ENDIF` 做条件分支；
- `REPEAT/REND`、`FOR/NEXT`、`WHILE/WEND` 做循环；
- `BREAK` 跳出循环，`CONTINUE` 进入下一轮；
- `SELECTCASE/CASE/CASEELSE/ENDSELECT` 做多路分支；
- 复合语句可以嵌套，但每层都要闭合。

下一步，我们学习如何把一段逻辑打包成可以重复使用的**函数**：[函数的定义与用法](Function)。
