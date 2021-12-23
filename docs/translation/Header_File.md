# 头文件（ERH）

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/ERH

除了扩展名为`ERB`的文件外，ERB文件夹还可以包含扩展名为`ERH`的文件。

ERH文件中包含需要在ERB文件之前处理的信息，即用`#DIM`和`#DIMS`声明的广域变量和用`#DEFINE`定义的宏。

除了`#DIM`、`#DIMS`和`#DEFINE`之外，ERH文件中不应当包含其他内容。

Emuera 读取放在`ERB`文件夹中的所有`*.ERH`文件，
其读取顺序是`csv文件夹中的文件`-> `*.ERH` -> `*.ERB`。

因此ERH中的定义无法作用于CSV，而CSV中的定义可以作用于ERH文件。
比如由`_rename.csv`定义的替换也将适用于`*.ERH`。

> 由于eramakerEX没有对ERH应用`_rename.csv`，所以Emuera与eramakerEx在ERH文件上不兼容。

## 广域变量的声明

另请参见[用户定义的变量](Custom_Variable#广域变量的书写格式)。

在ERH文件中声明的变量为广域变量，可以在任何ERB的任何地方引用。

与私有变量不同，广域变量不存在`DYNAMIC`和`STATIC`的区别，也不能用`REF`来定义引用类型的变量，但广域变量仍然可以用`CONST`来定义常量。

声明变量最高三维。

如果没有指定元素的数量，该变量就会变成一个有一个元素的数组，所以它可以像非数组变量一样使用。

变量可以用`#DIM`或`#DIMS`来声明，如下所示。

如果使用`#DIM HOGE,1,2`，它就会变成一个二维数组。

```
;<*.ERH>
  #DIM MY_INT
  #DIM MY_INT_ARRAY, 100
  #DIMS MY_STR
  #DIMS MY_STR_ARRAY, 100
```

在ERH文件中声明上述内容后，ERB文件中即可使用声明的变量：

```
;<*.ERB>
	MY_INT = 100
	MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45
	MY_STR = あああ
	PRINTFORML {MY_INT_ARRAY:10} %MY_STR%
```

可以作为一个变量使用。

在使用`#DIM`的变量声明中，元素的数量可以被指定为一个数字或一个常量表达式。

> 注意，与`*.ERB`中的`#DIM`不同，ERH声明变量时不会扩展宏。

### SAVEDATA 关键字

声明变量时加入`SAVEDATA`关键字，以使该变量可以被保存在存档中。

当使用`SAVEDATA`关键字保存的多维变量时，必须在设置中启用`以二进制形式保存存档`选项。

```
;<*.ERH>
  #DIM SAVEDATA MY_INT_ARRAY, 100
  #DIMS SAVEDATA MY_STR_ARRAY, 100
```

通过这样的声明，`MY_INT_ARRAY`和`MY_STR_ARRAY`将以与内置变量（如`DAY`和`MONEY`）相同的方式保存和加载。

反之，没有用`SAVEDATA`关键字声明的变量将不会被保存到游戏存档，并在加载游戏时会被初始化。

### CHARADATA 关键字

可以通过在变量声明中添加`CHARADATA`关键字来声明角色变量。

`CHARADATA`可以和`SAVEDATA`关键字一起使用。

```
;<*.ERH>
  #DIM CHARADATA C_INT_ARRAY, 100
  #DIMS CHARADATA C_STR_ARRAY, 100
  #DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100
```

在上面的例子中，`C_INT_ARRAY`和`C_STR_ARRAY`是角色变量，但不会被游戏存档保存或加载。

`CS_INT_ARRAY`是一个角色变量，可以被游戏存档保存和加载。

### GLOBAL 关键字

你可以通过在变量声明中加入`GLOBAL`关键字来声明一个全局变量。

`GLOBAL`可以和`SAVEDATA`关键字一起使用。

```
;<*.ERH>
  #DIM GLOBAL G_INT_ARRAY, 100
  #DIMS GLOBAL G_STR_ARRAY, 100
  #DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100
```

全局变量不会随游戏存档的保存加载而变化。

由于这一特性，全局变量被用来在不同的存档之间共享数据。

如果同时使用`GLOBAL`和`SAVEDATA`关键字，变量将被`SAVEGLOBAL`和`LOADGLOBAL`指令读写到`global.sav`文件。

关于其他细节，如初始值和常量化，请参见[用户定义的变量]()。

## 宏的定义

宏用于将ERB代码中的一串文本替换为另一个预先定义的文本。

这里说的宏不是Emuera运行中按下F1~F12按键的键盘宏。
宏的概念可以参考C和C++中的#define指令。

通过在 ERH 文件中定义宏，它适用于所有 ERB 文件中的代码。

### 基本用法

一个宏通常定义如下：

```
<*.ERH>
	#DEFINE <替换源标识符> <替换目标表达式>
```

这将把ERB中的`<替换源标识符>`替换为`<替换目标表达式>`。例如：

```
;<*.ERH>
	#DEFINE FIVE 5

;<*.ERB>
	X = FIVE

;(宏展开后)
	X = 5
```

一个宏也可以有行末注释。
分号后的任何内容都会作为注释被忽略，不会被包括在宏中，也不会被展开。

```
;<*.ERH>
	#DEFINE FIVE 5 ;定义宏

;<*.ERB>
	X = FIVE + FIVE

;(展开后)
	X = 5 + 5
```

请注意，宏的展开几乎等同于文本替换。

```
;<*.ERH>
  #DEFINE SIX           1 + 5
  #DEFINE NINE          8 + 1

;<*.ERB>
  X = SIX * NINE

;(展开后)
	X = 1 + 5 * 8 + 1
```

因为乘法优先，得到`X=42`。

宏可以展开为一个字符串常量，如`~~`，或展开为一个变量、函数或表达式。
因此可以把宏看作是扩展`#DEFINE`右边的文本。

```
;<*.ERH>
	#DEFINE HOGE        "ほげほげ"
	#DEFINE PIYO        A
	#DEFINE FUGA        DA:10
	#DEFINE HOGERA      LOCAL + MY_FUNC(X, Y)

;<*.ERB>
	X = STRLEN(HOGE)
	Y = PIYO + 5
	FUGA:20 += PIYO
	LOCAL = HOGERA

	@MY_FUNC(ARG, ARG:1)
	#FUNCTION
		;～略～

;(展开后)
	X = STRLEN("ほげほげ")
	Y = A + 5
	DA:10:20 += A
	LOCAL = LOCAL + MY_FUNC(X, Y)

	@MY_FUNC(ARG, ARG:1)
	#FUNCTION
		;～略～
```

宏在展开时，可能替换的是运算符或表达式的一部分，而不是一个完整的表达式。

这种宏的定义严重影响代码的可读性，不建议这种定义方式。

```
;<*.ERH>
	#DEFINE PLUS       +
	#DEFINE FIVEPLUS   5 +

;<*.ERB>
	X = 1 PLUS 2
	Y = FIVEPLUS 2

;(展开后)
	X = 1 + 2
	Y = 5 + 2
```

### 宏的多重展开

宏的定义可以嵌套。

```
;<.ERH>
	#DEFINE FIVE_1 5
	#DEFINE FIVE_2 FIVE_1 + FIVE_1
	#DEFINE FIVE_3 FIVE_2 + FIVE_2

;<.ERB>
	X = FIVE_3

;(展开后)
	X = 5 + 5 + 5 + 5
```

如果宏在多次展开后仍未展开完毕，Emuera会将其视作一个疑似自引用或循环引用的宏终止进程，并抛出错误。

注意避免自我引用和循环引用，如以下内容。

```
;<.ERH>
	#DEFINE HOGE HOGE
	#DEFINE PIYO FUGA + 1
	#DEFINE FUGA PIYO + 2

;<.ERB>
;会抛出错误
	X = HOGE
	Y = PIYO
```

### 预处理指令

可以根据是否定义了某一名称的宏，来执行不同的代码。

只有当XXX被定义时，`[IF XXX]`和`[ENDIF]`行之间的行才会被执行。例如，你可以使用以下方法：

```
;<*.ERB>
	[IF HOGE]
		PRINTL HOGE被定义
	[ELSEIF PUYO]
		PRINTL HOGE没有被定义
		PRINTL PUYO被定义
	[ELSE]
		PRINTL HOGE和PUYO都没有被定义
	[ENDIF]
```

为此，你也可以定义空宏（没有替换目标的宏）。

```
;<*.ERH>
	#DEFINE HOGE
```

### 宏的限制条件

宏基本上只在表达式中展开。

```
;<*.ERH>
	#DEFINE FIVE 5

;<*.ERB>
	PRINT FIVE
```
PRINT结果为文本`FIVE`。
这与`PRINT X`相同，它只打印字母X，而不是X的值。

宏替换不能是一个赋值运算符或包含赋值运算符的表达式。
下面的宏定义将导致一个错误：

```
;<*.ERH>
;会发生错误
	#DEFINE HOGE =
	#DEFINE PUGE X = 1
```

上面提到，宏可以在表达式中替换，但宏的定义必须完成括号的对应。
下面的宏定义将导致一个错误：

```
;<*.ERH>
;会发生错误
	#DEFINE HOGE ( X +
	#DEFINE PUGE Y )

;<*.ERB>
	Z = HOGE PUGE
```

不可能将一个宏替换成命令。
下面的宏定义将导致一个错误：

```
;<*.ERH>
	#DEFINE MY_PRINTL     PRINTL

;<*.ERB>
	MY_PRINTL 执行PRINTL中

;(展开后)
	;会发生错误
```

此外，ERB脚本中的也预处理指令、属性名称或行头标记等关键字都无法适用于宏。

例如，`#DEFINE HOGE SKIPSTART`并不能将`[HOGE]`展开为`[SKIPSTART]`。

但其后的文本可以被宏展开，如ERB脚本中`#DIM`后声明的变量名，可以被宏替换。
例如，下面的代码：

```
;<*.ERH>
	#DEFINE HOGE MY_INT
	#DEFINE FIVE 5

;<*.ERB>
	@FUNC
	#DIM HOGE, FIVE
	HOGE:0 = 10

;(展开后)
	@FUNC
	#DIM MY_INT, 5
	MY_INT:0 = 10
```

上面的代码可以正常工作。
