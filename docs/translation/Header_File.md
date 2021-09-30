# 头文件（ERH）

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/ERH

除了扩展名为`ERB`的文件外，ERB文件夹还可以包含扩展名为`ERH`的文件。

`ERH`文件包含必须在`ERB`之前处理的信息，即用`#DIM`和`#DIMS`定义广域变量，用`#DEFINE`定义宏。

除了`#DIM`、`#DIMS`和`#DEFINE`之外，标题中不应该有其他行。

Emuera 读取所有放在`ERB`文件夹中的`*.ERH`文件。

处理的顺序是`csv文件夹中的文件`-> `*.ERH` -> `*.ERB`，所以ERH的效果与CSV文件夹中的描述不一样。

反之，由`_rename.csv`进行的替换也将适用于`*.ERH`。

由于eramakerEX没有对ERH应用_rename.csv，所以 EramakerEX 与 ERH 不兼容。

## 广域变量的定义

另请参见[用户定义的变量]()。

在头文件中，可以声明新的变量。

与在`ERB`中声明的私有变量不同，这将是一个广域变量，可以从`ERB`的所有点引用。

与私有变量不同，`DYNAMIC`和`STATIC`变量之间没有区别，不可能使用`REF`来声明引用类型的变量，但是使用`CONST`的常量可以以同样的方式声明。

你可以声明多达三个维度的变量。

如果没有指定元素的数量，该变量就会变成一个有一个元素的数组，所以它可以像非数组变量一样使用。

变量可以用`#DIM`或`#DIMS`来声明，如下所示。

如果使用`#DIM HOGE,1,2`，它就会变成一个二维数组。

在`*.erh`中：

```
#DIM MY_INT
#DIM MY_INT_ARRAY, 100
#DIMS MY_STR
#DIMS MY_STR_ARRAY, 100
```

通过在`ERH`中定义上述内容，就有可能在`ERB`中定义：

```
MY_INT = 100
MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45
MY_STR = AAA
PRINTFORML {MY_INT_ARRAY:10} %MY_STR%
```

可以作为一个变量使用。

在使用`#DIM`的变量声明中，元素的数量可以被指定为一个数字或一个常量表达。

然而，请注意，与`*.ERB`中的`#DIM`不同，该宏没有被扩展。

### SAVEDATA 关键字

你可以在声明一个变量时加入`SAVEDATA`关键字来声明该变量被保存。

然而，当声明一个可以使用`SAVEDATA`关键字保存的多维变量时，必须启用`以二进制格式保存保存的数据`选项。

在ERH中：

```
#DIM SAVEDATA MY_INT_ARRAY, 100
#DIMS SAVEDATA MY_STR_ARRAY, 100
```

通过这样的声明，`MY_INT_ARRAY`和`MY_STR_ARRAY`的内容将以与现有变量（如`DAY`和`MONEY`）相同的方式保存和加载。

反之，没有`SAVEDATA`关键字的变量声明将不会被保存，而在加载时将被初始化。

### CHARADATA 关键字

可以通过在变量声明中添加`CHARADATA`关键字来声明字符变量。

`CHARADATA`可以和`SAVEDATA`关键字一起使用。

在 ERH 中：

```
#DIM CHARADATA C_INT_ARRAY, 100
#DIMS CHARADATA C_STR_ARRAY, 100
#DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100
```

在上面的例子中，`C_INT_ARRAY`和`C_STR_ARRAY`是字符变量，但没有被保存和加载。

`CS_INT_ARRAY`是一个字符变量，可以被保存和加载。

### GLOBAL 关键字

你可以通过在变量声明中加入`GLOBAL`关键字来声明一个全局变量。

`GLOBAL`可以和`SAVEDATA`关键字一起使用。

在 ERH 中：

```
#DIM GLOBAL G_INT_ARRAY, 100
#DIMS GLOBAL G_STR_ARRAY, 100
#DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100
```

在正常的保存加载过程中，全局变量不被加载或初始化。

由于这一特性，它们可以被用来在不同的保存数据之间共享数据。

如果同时使用`GLOBAL`和`SAVEDATA`关键字，变量将被`SAVEGLOBAL`和`LOADGLOBAL`指令读写到`global.sav`文件。

关于其他细节，如初始值和常量化，请参见[用户定义的变量]()。

## 宏的定义

宏是一个函数，它将 ERB 代码中的一串字符替换为另一个预先定义的字符串。

虽然它被称为宏，但它与 Emuera 运行时可使用`F1`-`F12`键的键盘宏没有关系。

这个函数是基于 C 和 C++ 的`#define`。

通过在 ERH 文件中定义宏，它适用于所有 ERB 文件中的代码。

### 基本用法

一个宏通常定义如下：

```
#DEFINE <替换源标识符> <替换目标表达式>
```

这将用 ERB 中的\<替换源标识符\>替换\<替换目标表达式\>。例如，在 ERH 中：

```
#DEFINE FIVE 5
```

那么 ERB 中的字符串`FIVE`将被替换成`5`。例如，如果你定义：

```
X = FIVE
```

替换后：

```
X = 5
```

一个宏也可以有行末注释。

分号后的任何内容都会作为注释被忽略。

分号之后的内容不包括在宏中，也不会被展开。

```
;ERH
#DEFINE FIVE 5 ;注释

;ERB
X = FIVE + FIVE

;运行时
X = 5 + 5
```

请注意，宏的扩展几乎是作为一个字符串来完成的。

```
;ERH
#DEFINE SIX           1 + 5
#DEFINE NINE          8 + 1

;ERB
X = SIX * NINE
```

你可能认为6*9或36将被分配给X，但事实上：

```
X = 1 + 5 * 8 + 1
```

所以乘法优先，得到X=42。

宏可以扩展为一个常数字符串，如`~~`，或扩展为一个变量、函数或表达式。

这个宏也可以扩展成一个常量字符串，比如`~~`，或者扩展成一个变量、函数或表达式，所以如果你把它看作是扩展`#DEFINE`右边的字符串，你就会明白这个意思。

```
;ERH
#DEFINE HOGE        "嘿嘿嘿嘿"
#DEFINE PIYO        A
#DEFINE FUGA        DA:10
#DEFINE HOGERA      LOCAL + MY_FUNC(X, Y)

;ERB
X = STRLEN(HOGE)
Y = PIYO + 5
FUGA:20 += PIYO
LOCAL = HOGERA

@MY_FUNC(ARG, ARG:1)
#FUNCTION

;运行时
X = STRLEN("嘿嘿嘿嘿")
Y = A + 5
DA:10:20 += A
LOCAL = LOCAL + MY_FUNC(X, Y)

@MY_FUNC(ARG, ARG:1)
#FUNCTION
```

由于宏被扩展为字符串，因此替换有可能是运算符或表达式的一部分，而不是一个完整的表达式。

然而，不建议使用这种方法。

如果不仔细使用，会严重破坏代码的可读性。

```
;ERH
#DEFINE PLUS       +
#DEFINE FIVEPLUS   5 +

;ERB
X = 1 PLUS 2
Y = FIVEPLUS 2

;运行时
X = 1 + 2
Y = 5 + 2
```

### 多重宏替换

可以定义包含巨集的宏。这样的宏将被倍数展开，直到加载 ERB 时宏不能再被应用。

```
;ERH
#DEFINE FIVE_1 5
#DEFINE FIVE_2 FIVE_1 + FIVE_1
#DEFINE FIVE_3 FIVE_2 + FIVE_2

;ERB
X = FIVE_3

;运行时
X = 5 + 5 + 5 + 5
```

如果该宏在一定数量的扩展后仍然存在，Emuera 将作为一个疑似自引用或循环引用的宏终止进程，并以错误退出。

请注意不要创建自我参照或循环的宏，如以下内容。

```
;ERH
#DEFINE HOGE HOGE
#DEFINE PIYO FUGA + 1
#DEFINE FUGA PIYO + 2

;ERB(会报错)
X = HOGE
Y = PIYO
```

### 预处理程序

可以根据是否定义了某一名称的宏，分割执行多行。

只有当XXX是`DEFINE`时，`[IF XXX]`和`[ENDIF]`行之间的行才会被执行。例如，你可以使用以下方法：

```
;ERB
[IF HOGE]
  PRINTL HOGEが定義されている
[ELSEIF PUYO]
  PRINTL HOGEが定義されていない
  PRINTL PUYOが定義されている
[ELSE]
  PRINTL HOGEもPUYOも定義されていない
[ENDIF]
```

为此，你也可以定义空宏（没有替换目标的宏）。

```
;ERH
#DEFINE HOGE
```

### 宏的限制条件

宏基本上只在表达式中部署。

```
;ERH
#DEFINE FIVE 5

;ERB
PRINT FIVE
```

简单地打印出字符`FIVE`。

这与`PRINT X`相同，它只打印字母X，而不是X的值。

宏替换不能是一个赋值运算符或包含赋值运算符的表达式。

下面的宏定义将导致一个错误：

```
;ERH(会报错)
#DEFINE HOGE =
#DEFINE PUGE X = 1
```

我提到，宏可以在表达式中替换，但在宏中只需完成括号对应。下面的宏定义将导致一个错误：

```
;ERH(会报错)
#DEFINE HOGE ( X +
#DEFINE PUGE Y )

;ERB
Z = HOGE PUGE
```

不可能将一个宏替换成一条指令。

下面的宏定义将导致一个错误：

```
;ERH
#DEFINE MY_PRINTL     PRINTL

;ERB
MY_PRINTL 这是PRINTL

;运行时
;会报错
```

如上所述，该宏只适用于`*.ERB`，不适用于`*.csv`和`*.ERH`。

ERB，但不包括`*.csv`或`*.ERH`，也不包括预处理程序、属性名称或行首。

`[SKIPSTART]`等，`#DIM`、`#FUNCTION`等，以及`@EVENTFIRST`的`@`部分等，都不被替换。

例如，`#DEFINE HOGE SKIPSTART`并不以`[HOGE]`开始注释。

然而，即使是`#`后面的字符串，如`#DIM`的变量名，也可以被替换。

例如，下面的代码：

```
;ERH
#DEFINE HOGE MY_INT
#DEFINE FIVE 5

;ERB
@FUNC
#DIM HOGE, FIVE
HOGE:0 = 10

;运行时
@FUNC
#DIM MY_INT, 5
MY_INT:0 = 10
```

就工作正常。
