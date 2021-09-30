# 常规

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exetc

## 行末注释

```
A = B ;将B赋值给A
```

你可以像这样在一行的末尾插入一个注释。

有一些例外情况，例如`PRINT`指令，参数是一个简单的字符串，它被作为字符串的一部分进行评估，而不是被注释。

```
PRINT foobar;嘿嘿
```

这种情况下，会输出：

```
foobar;嘿嘿
```

## 行的连续

```
{
  DIM CONST HOGE =
    1,2,3,4
}
```

将被解释为'#DIM CONST HOGE = 1,2,3,4

'{'和'}'行不得包含任何其他字符，除了空白。

在有换行符的地方加一个空格。

这意味着你不能在一个函数或变量名称的中间分出一行，并且如果你分割行，如PRINT，空格将包括在显示的字符串中。

在Emuera的语法中，行连接是在注释解释之前完成的。

这意味着：

```
{
  #DIM CONST HOGE =
    1,2,3,4 ;コメント
    ,5,6,7,8
}
```

变成`#DIM CONST HOGE = 1,2,3,4 ;注释 ,5,6,7,8 `和",5,6,7,8 "被认为是行末注释的一部分而被忽略。

## 特殊注释

### ;!;

在 Emuera 和 Eramaker 中，以`;`开头的行被认为是注释行，而 Emuera 认为以`;! `但Emuera认为以`;`开头的行是有效的行，而不是注释。

用它来描述你不希望在 Eramaker 中执行的语句。

例如，可以在`@SHOWSHOP`中加入以下脚本，以便在 Emuera 中禁用它。

```
;!;PRINTW 这个脚本不能在Emuera上运行
;!;QUIT
```

另外，当与`[SKIPSTART]`和`[SKIPEND]`一起使用时，你可以禁止在 Emuera 之外执行，如以下脚本。

当你写一个你不希望被 Emuera 以外的人执行的语句时，请使用它。

```
;!;[SKIPSTART]
PRINTW 这个脚本只能在Emuera上运行
QUIT
;!;[SKIPEND]
```

### ;#;

以`;#;`开头的行只在调试模式下执行。

在非调试模式下，它被认为是一个注释行，不会被执行。

然而，`DEBUG`类型的指令在非调试模式下原本是被忽略的，所以没有必要在行前加上`;#;`。

同样地，调试变量在非调试模式下是空字符串或零，所以不需要担心错误。

关于调试模式的更多信息，请看这里。

## 角色阵列

Eramaker 可能只提供100个数组用于创建角色。

因此，如果你在`chara3.csv`、`chara03.csv`和`chara3B.csv`中定义不同的角色，只有一个角色有效。

在 Emuera 中，你可以在内存允许的范围内定义尽可能多的角色。

另外，Emuera 将读取任何与`CharaXX.csv`对应的文件，如`Chara101.csv`、`CharaABC.csv`等。

如果角色号重叠，并且有多个候选的`ADDCHARA`或`ADDSPCHARA`，那么只有先读到的那个角色才是有效的。

## 整数类型的数值范围

Eramaker 可以处理32位有符号的整数，即范围在-2147483648到2147483647的值。

Emuera 和 Kirikiri 一样，可以处理范围在-9223372036854775808到9223372036854775807的64位有符号整数。

## 对数组变量的批量赋值

```
A:10 = 1,2,3
DA:0:0 = 1,2,3
```

在像上面这样的多维数组中，`A:10`到`A:12`的值将分别被赋予1、2和3的值

在一个像下面这样的多维数组中，`DA:0:0`到`DA:0:2`的值将分别被赋予1、2和3的值

在`DA:0:0`到`DA:0:99`之后，没有对`DA:1:0`的赋值，导致了数组外引用错误。

然而，它不能用于复合赋值操作（`A += 1,2,3`等是不允许的）。

另外，当使用批量赋值向字符串数组变量赋值时，必须使用字符串表达式进行赋值：

```
;STR:20被分配为“草莓、甜瓜、蓝色夏威夷”字符串。
STR:20 = 草莓, 甜瓜, 蓝色夏威夷
;STR:20至STR:22将分别被分配到“草莓”、“甜瓜”和“蓝色夏威夷”等词。
STR:20 '= "草莓", "甜瓜", "蓝色夏威夷"
```

## 使用FORM语法向一个字符串变量赋值

当赋值给一个字符串变量时，可以用与`PRINTFORM`相同的方式指定要赋值的字符串。

```
SAVESTR:0 = %RESULTS%
```

该语句允许你将`RESULTS`的内容分配给`SAVESTR:0`。

同样的语句将把字符串`%RESULTS%`本身分配给 Eramaker 的`SAVESTR:0`。

如果你想在 Emuera 中赋值字符串`%RESULTS%`本身，请写如下：

```
SAVESTR:0 = \%RESULT\%
```

紧随`\`其后的字符不作为系统符号处理。
如果你想让`\`符号本身包含在字符串中，你应该使用 `\\`。
如果你想在 Eramaker 和 Emuera 中有同样的行为，你需要这样写：

```
;!;SAVESTR:0 = \%RESULT\%
;!;[SKIPSTART]
SAVESTR:0 = %RESULTS%
;!;[SKIPEND]
```

## 使用字符串表达式赋值给一个字符串变量

从ver1813开始，Emuera 现在允许你使用赋值运算符`=`和字符串表达式对字符串变量进行赋值。

```
;与“STR = 哈哈”相同
STR '= "哈哈"
;与“STR = %TSTR:0%嘿嘿”相同
STR '= TSTR:0 + "嘿嘿"
```

## 用字符串指定一个数组变量的元素

对于以下变量，你可以用`*.csv`中定义的字符串作为参数来调用它们。

关于 Emuera 中的新变量的更多信息，请参见[Emuera 中增加的扩展语法--常量和变量]()。

```
ITEM (item.csv)
ITEMSALES (item.csv)
LOSEBASE (base.csv)
BASE (base.csv)
MAXBASE (base.csv)
ABL (abl.csv)
TALENT (talent.csv)
EXP (exp.csv)
MARK (mark.csv)
RELATION (chara*.csv)
UP (palam.csv)
DOWN (palam.csv)
PALAM (palam.csv)
JUEL (palam.csv)
GOTJUEL (palam.csv)
STAIN (stain.csv)
SOURCE (source.csv)
EX (ex.csv)
NOWEX (ex.csv)
TEQUIP (tequip.csv)
EQUIP (equip.csv)
FLAG (flag.csv)
TFLAG (tflag.csv)
CFLAG (cflag.csv)
STR (strname.csv)
SAVESTR (savestr.csv)
Emuera添加了以下变量
ITEMPRICE (item.csv)
DOWNBASE (base.csv)
CUP (palam.csv)
CDOWN (palam.csv)
TCVAR (tcvar.csv)
TSTR (tstr.csv)
CSTR (cstr.csv)
CDFLAG (cdflag1.csv, cdflag2.csv)
GLOBAL (global.csv)
GLOBALS (globals.csv)
```

例如，如果`Abl.csv`包含定义`2,技巧`，以下四行将具有相同的含义：

```
ABL:技巧 += 1
ABL:2 += 1
ABL:"技巧" += 1
ABL:(ABLNAME:2) += 1
```

对于`RELATION`，可以指定`NAME`或`CALLNAME`。

如果有多个同名的定义，首先定义的那个将被调用。

例如，如果`Abl.csv`包含`2,技巧`和`4,技巧`，并且`2,技巧`在前一行被定义，那么`ABL:技巧`变成`ABL:2`。

字符串也可以是表达式或变量。 在这种情况下，添加`()`，如下所示：

```
ABL:(RESULTS:0) = ABL:(RESULTS:0) + 1
```

如果省略`()`，项目名称和变量名称可能是相同的。 在这种情况下，变量占优先地位。

例如，如果`Abl.csv`有一个`0,转子`的定义，那么：

```
@HOGE
#DIM Rotor, 0
Rotor = 1
PRINTFORML {ABL:rotor}
```

在这种情况下，它将被解释为第1个ABL，而不是第0个ABL。

同样地，如果项目名称是一个数字，它将被解释为一个数字。

例如，如果一个项目在`Abl.csv`中被定义为`0,10`，并且`ABL:10`被引用，它将不会被解释为第0个ABL，而是第10个ABL。

这也可以用于`CharaXX.csv`中的定义。

例如，如果你在`Abl.csv`中有`2,技巧`的定义，下面两行将有相同的含义：

```
能力,2,2
能力,技巧,2
```

然而，它不能用于相性`RELATION`。

这是因为在读取`CharaXX.csv`时，系统不知道chara的名字和NO之间的对应关系。

## 格式化字符串（FORM语法）扩展



你可以指定在`PRINTFORM`中使用的格式化字符串的`{}`和`%%`显示的字符数。格式为{变量、公式等，显示数字，对齐（LEFT或RIGHT）}，%变量、字符串表达式，显示数字，对齐（LEFT或RIGHT）%。

字符数将两个双字节字符算作两个字符。

如果字符数不够，就会增加一个半宽的空格。

通常是右对齐，但如果指定关键字LEFT，则是左对齐。

如果原来的数字大于指定的数字，将按原样显示。

```
A = 123456
STR:0 = 嘿嘿嘿
PRINTFORML [{A}]
PRINTFORML [{A,10}]
PRINTFORML [{A,10,LEFT}]
PRINTFORML [%STR:0%]
PRINTFORML [%STR:0,10%]
PRINTFORML [%STR:0,10,LEFT%]
PRINTFORML [{A,2}]
PRINTFORML [%STR:0,2%]
```

输出：

```
[123456]
[    123456]
[123456    ]
[嘿嘿嘿]
[    嘿嘿嘿]
[嘿嘿嘿    ]
[123456]
[嘿嘿嘿]
```

## 在字符串表达式中使用格式化的字符串（FORM语法）

在字符串表达式中使用`FORM`语法，如`PRINTS`或表达式中用户定义的函数的参数，将导致错误。

因此，如果你想在一个字符串表达式中使用一个格式化的字符串，你应该使用`@"~"`，就像你使用`"~"`在一个字符串表达式中使用一个确定的字符串一样。

`@"~"`另外，如果`@"~"`中的字符串只用三元运算符描述，使用`\@~\@`，你可以省略`@"~"`，直接写`\@~\@`

::: tip 正确

```
;使用FORM语法赋值
STR:0 = 嘿嘿嘿
;加法是一个字符串表达式
RESULTS += STR:0
;在字符串表达式中使用常量字符串的例子
RESULTS += "哈哈"
;对字符串表达式使用FORM语法的例子
PRINTS @"%RESULTS%甲乙丙丁戊"

;以下四行都是一样的
PRINTS STR:0 + "！"
PRINTFORM %STR:0%！
PRINTS @"%STR:0%！"
PRINTFORM %STR:0 + "！"%
```

:::

::: danger 错误

```
;内容将是RESULTS
STR:0 = RESULTS
;发生了一个错误
RESULTS += 哈哈
;发生了一个错误
RESULTS += %STR:0%
;“@"”和“"”也被显示出来
PRINTFORM @"%RESULTS%甲乙丙丁戊"
```

:::

## 在INPUTS系统中使用宏语法

你可以在`INPUTS`和类似的输入接受指令中使用宏表达式。

关于宏格式的更多信息，请参见使用指南中的宏部分。

如果你想把`()`作为一个没有宏语法的简单字符串使用，你必须用`\`转义。

