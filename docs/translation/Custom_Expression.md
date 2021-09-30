# 自定义表达式内函数

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/UserMeth

表达式内函数，即除了内置函数之外，还可以在表达式中调用`@~~`中定义的函数。

关于表达式内函数的更多信息，[请参见表达式内函数]()。

## 格式

被调用的函数必须有`#FUNCTION`或`#FUNCTIONS`标志，并且必须以`RETURNF`结束。

`#FUNCTION`表示该函数返回一个数字。

`#FUNCTION(S)`：返回一个字符串。

一个带有`#FUNCTION(S)`的函数不能用通常的`RETURN`来终止。 相反，它们是以`RETURNF`终止的。

`RETURNF`可以是一个公式或一个字符串表达式。 它必须符合`#FUNCTION(S)`中给出的类型。

如果省略`RETURNF`参数，或者在没有`RETURNF`的情况下到达函数的终点，则返回`0`或`""`。

```
X = GET_CFLAG(TARGET, Y)
STR = %GET_NAME(TARGET)%

@GET_CFLAG(ARG:0, ARG:1)
#FUNCTION
  SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
    RETURNF 0
  RETURNF CFLAG:(ARG:0):(ARG:1)

@GET_NAME(ARG:0)
#FUNCTIONS
  SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
    RETURNF ""
  RETURNF NAME:(ARG:0)
```

函数定义的参数用`()`括起来，但这不是定义的必要语法。

如果你想在表达式中调用一个函数，你需要使用带`()`的语法。

你也可以用逗号把函数名和参数分开，就像你对普通函数那样。

下面两行的意思是一样的：

```
@GET_CFLAG(ARG:0, ARG:1)
@GET_CFLAG, ARG, ARG:1
```

也可以为参数设置初始值。

关于初始值的语法的更多信息，请参阅在你自己的[函数中指定参数]()。

## 限制条件

### 不能从CALL中调用

带有`FUNCTION(S)`标志的函数不能以通常的方式调用，例如`CALL`。

它只能在一个表达式中被调用。

```
;错误
CALL GET_CFLAG, X, Y

@GET_CFLAG(ARG:0, ARG:1)
#FUNCTION
  SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
    RETURNF 0
  RETURNF CFLAG:(ARG:0):(ARG:1)
```

`#FUNCTION(S)`可以从`CALLF`和`CALLFORMF`中调用，它们是调用`FUNCTION(S)`的专用指令。

### 有些指令是不可用的

在带有`FUNCTION(S)`标志的函数中，不允许有输入的命令，如`WAIT`，和带有函数调用的命令，如`CALL`。

如果使用它们，就会发生错误。

不能使用`CALL`指令，但可以在表达式中调用带有`FUNCTION(S)`标志的函数。

也可以用`CALLF`和`CALLFORMF`指令调用`#FUNCTION(S)`。

### 不支持函数重载

不可能用不同数量或类型的参数调用一个以上的`#FUNCTION(S)`函数。

只能定义一个同名的函数，如果定义了多个同名的函数，只有第一个函数是有效的。

### 覆盖内置函数

如果你定义了一个与内置函数同名的函数，你将无法调用该内置函数。

例如，如果你定义了`@ABS`，你将无法调用原来的`ABS`。

如果一个内置函数被覆盖，Emuera 将在启动时显示一个警告。

如果一个内置函数被覆盖，它可能无法按预期工作，所以可以通过配置来禁止函数的覆盖。

对于故意覆盖的情况（不推荐），也有一个配置选项，如果一个函数被覆盖，则不发出警告。

## 注意事项

带有`FUNCTION(S)`标志的函数不应该改变除局部变量以外的任何变量。

改变非局部变量的函数（有副作用的函数）可能会由于短路评估或表达式评估的顺序而改变其行为，如下所述。

对这些函数的意外调用，例如从调试命令或从调试变量观察窗口，也可能导致非预期的行为。

### 短路逻辑导致调用省略

即使表达式中存在一个函数，也可能由于短路逻辑而无法调用。

例如，下面的脚本在`IF`语句中调用`GET_ASSI_CFLAG`，并改变`GET_ASSI_CFLAG`中的`ASSI`。

```
IF X || GET_ASSI_CFLAG(0)
  Y = CFLAG:ASSI:2
ENDIF

@GET_ASSI_CFLAG(ARG:0)
#FUNCTION
  SIF ASSI < 0
    ASSI = 0
  RETURNF CFLAG:ASSI:(ARG:0)
```

乍一看，执行`Y = CFLAG:ASSI:2`时，似乎不可能出现`ASSI < 0`。

然而，如果X非零，`GET_ASSI_CFLAG`由于短路评估而不被执行，当试图评估`CFLAG:ASSI:2`而`ASSI < 0`时可能发生错误。

### 其结果取决于方程的评估顺序

变量和函数在表达式中被评估的顺序是未定义的。

有副作用的函数可能取决于表达式中的函数被调用的顺序。

请不要写这样的代码。

对于同一版本的 Emuera，调用顺序将是相同的，但在未来可能会发生变化。

在下面的脚本中，`TARGET`在`ADDCHARA_CFLAG`中被改变：

```
X = CFLAG:TARGET:10 + ADDCHARA_CFLAG(0)

@ADDCHARA_CFLAG(ARG)
#FUNCTION
  ADDCHARA ARG
  TARGET = CHARANUM -1
  RETURNF CFLAG:TARGET:2
```

根据`CFLAG:TARGET:10`是在`ADDCHARA_CFLAG`之前还是之后被评估，`CFLAG:TARGET:10`所指向的变量将会改变。

因此，这个脚本取决于评价的顺序。

你不应该在带有`FUNCTION(S)`标志的函数中赋值给`ADDCHARA`或`TARGET`。

### 可由调试函数调用

`FUNCTION(S)`标记的函数不仅可以被`*.ERB`文件中的脚本动态调用，还可以被调试命令和调试变量观察窗口调用。

特别是，变量`watch`将试图频繁地更新其值，并在每次更新时调用该函数。

有副作用的功能可能会因为这种调用而发生故障。
