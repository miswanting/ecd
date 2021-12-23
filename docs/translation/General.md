# Emuera扩展语法

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exetc

## 行末注释

```
A = B ;将B赋值给A
```

Emuera允许在行的末尾插入注释。

PRINT系列指令除外。由于`PRINT`指令的参数是一段文本，注释文本将被视作参数的一部分。

```
PRINT foobar	;一种播放器
```

这种情况下，会输出`foobar	;一种播放器`。

## 行连接

```
{
  #DIM CONST HOGE =
    1,2,3,4
}
```

上面的代码将等同于<code>#DIM CONST HOGE = 1,2,3,4</code>。

* 注意：
  * <code>{</code>与<code>}</code>必须单独成行，不能包含注释等内容
  * 第二行会被直接连接在第一行的末尾，包括行首的制表符
  * 不应当用换行来分割任何变量名、函数名
  * 应当避免对PRINT系列指令使用行连接
  * 应当避免在行连接内使用注释

```
{
  #DIM CONST HOGE =
    1,2,3,4 ;注释
    ,5,6,7,8
}
```
上面的代码将等同于<code>#DIM CONST HOGE = 1,2,3,4 ;注释 ,5,6,7,8</code>。
<code>,5,6,7,8</code>会被识别为注释而忽略。

## 特殊注释行

### ;!;

Emuera和Eramaker将`;`起始的行视为注释行。
而`;!;`起始的行，Emuera会将其视为有效行，而非注释。

这可以用来标记不希望在Eramaker中执行的语句。

例如，可以在`@SHOWSHOP`中加入以下代码，以禁止游戏在Emuera中运行。

```
;!;PRINTW 这个脚本不能在Emuera上运行
;!;QUIT
```

另外，当与`[SKIPSTART]`和`[SKIPEND]`一起使用时，你禁止游戏在Emuera以外运行。添加如以下代码：

```
;!;[SKIPSTART]
PRINTW 这个脚本只能在Emuera上运行
QUIT
;!;[SKIPEND]
```

### ;#;

以`;#;`起始的行只在调试模式下执行，非调试模式下会被作为注释而忽略。

> `DEBUG`系列的指令在非调试模式下是被忽略的，因此没有必要添加`;#;`。
> 此外[调试变量]()在非调试模式下是空字符串或零，所以不需要担心错误。

关于调试模式的更多信息，请看[这里]()。

## 角色CSV

Eramaker只提供100个数组用于创建角色。

因此，如果你在`chara3.csv`、`chara03.csv`和`chara3B.csv`中定义不同的角色，只有一个角色有效。

在 Emuera 中，你可以在内存允许的范围内定义尽可能多的角色。

另外，Emuera 将读取任何与`CharaXX.csv`对应的文件，如`Chara101.csv`、`CharaABC.csv`等。

如果角色号重复，`ADDCHARA`或`ADDSPCHARA`有多个候选项时，则只有第一个读取的才是有效的。

## 整数类型的数值范围

Eramaker使用Int32来存储数值，即范围在-2147483648到2147483647的值。

Emuera使用Int64来存储数值，可以处理范围在-9223372036854775808到9223372036854775807的64位有符号整数。

## 对数组变量的批量赋值

```
A:10 = 1,2,3
DA:0:0 = 1,2,3
```

上面代码执行后，<code>A:10</code>~<code>A:12</code>被分别赋值为<code>1</code>、<code>2</code>、<code>3</code>；
<code>DA:0:0</code>~<code>DA:0:2</code>被分别赋值为<code>1</code>、<code>2</code>、<code>3</code>。

在`DA:0:0`到达`DA:0:99`之后，不会继续对`DA:1:0`的赋值，并会抛出数组索引引用错误。

此外不能用于复合赋值操作，`A += 1,2,3`是不允许的。

字符串类型的变量与之类似，但必须使用字符串赋值（<code>'=</code>）。

```
STR:20 = 草莓,蜜瓜,蓝色夏威夷
;STR:20被赋值为「草莓,蜜瓜,蓝色夏威夷」的字符串

STR:20 '= "草莓", "蜜瓜", "蓝色夏威夷"
;STR:20~STR:22被分别赋值为「草莓」「蜜瓜」「蓝色夏威夷」的字符串
```

## 使用FORM语法为字符串变量赋值

为字符串变量赋值时可以直接使用带FORM语法的文本。

```
SAVESTR:0 = %RESULTS%
```

上面的代码中，变量<code>RESULTS</code>中的值被赋予给变量<code>SAVESTR:0</code>。

同样的语句在Emuera中会把文本`%RESULTS%`本身赋值给`SAVESTR:0`。

若想要赋值文本`%RESULTS%`本身，而非<code>RESULTS</code>的值，则需要使用转义符号：

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

## 使用字符串表达式为字符串变量赋值

ver1813后的Emuera允许使用赋值运算符<code>'=</code>来为字符串变量赋值。

```
STR '= "暮雪"
;与「STR = 暮雪」等同
STR '= TSTR:0 + "非雪"
;与「STR = %TSTR:0%非雪」等同
```

## 用字符串指定一个数组变量的元素

下面变量的元素可以通过在`*.csv`中声明的文本索引来引用。

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
;以下为Emuera追加的变量
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

例如，若`abl.csv`中声明了<code>2, 技巧</code>，则以下四行代码的意义相同：

```
ABL:技巧 += 1
ABL:2 += 1
ABL:"技巧" += 1
ABL:(ABLNAME:2) += 1
```

`RELATION`的元素也可以通过NAME、CALLNAME来引用。

如果同一变量多个元素声明了相同的文本索引，则最先声明的元素会被引用。

例如，若`abl.csv`同时声明了<code>2, 技巧</code>和<code>4, 技巧</code>，
则所有<code>ABL:技巧</code>会被识别为<code>ABL:2</code>。

可以使用字符串值类型的变量作为文本索引，根据情况可能需要添加<code>()</code>。
```
ABL:(RESULTS:0) = ABL:(RESULTS:0) + 1
```

当<code>()</code>省略时，且文本索引与变量名称相同时，优先解释为变量名。

例如，abl.csv中声明了<code>0, ローター</code>的情况下
```
@HOGE
#DIM ローター, 0
ローター = 1
PRINTFORML {ABL:ローター}
```

在这种情况下，<code>ABL:ローター</code>将解释为<code>ABL:1</code>而非<code>ABL:0</code>。

类似的，当文本索引为数字时，将优先解析数值。

例如`abl.csv`中声明了<code>0, 10</code>，则<code>ABL:10</code>将解释为**编号10的ABL**而非**编号0的ABL**。

文本索引同样可以在`chara*.csv`中使用。

例如若`abl.csv`中声明了<code>2, 技巧</code>，则下面两行的意义相同。

```
能力,2,2
能力,技巧,2
```

但**相性（RELATION）**不可以这样使用，
这是因为在读取`chara*.csv`阶段中，Emuera尚未获得每个角色的名字与NO的对应关系。

## 格式化字符串（FORM语法）的扩展

你可以在`PRINTFORM`使用`{}`和`%%`格式化字符串时，指定显示的字符数。

格式为
```
{ 数值变量或表达式, 文字长度, 对齐方向（LEFT或RIGHT） }
% 字符串变量或表达式, 文字长度，对齐方向（LEFT或RIGHT） %
```

每个双字节字符的长度算作2。

指定文字长度超出实际字符数时，将增加相应数量的半角空格；
指定文字长度少于实际字符数时，字符串不会被截取，将按原样显示。

对齐方向默认为右对齐，指定关键字`LEFT`后则为左对齐。

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

## 在表达式中格式化字符串（FORM语法）

在字符串表达式中直接使用`FORM`语法，例如在`PRINTS`的参数中使用带FORM语法，将导致错误。

因此，若需要在字符串表达式中格式化字符串，可以使用`@"~"`。

类似`"~"`封闭一段文本形成字符串，`@"~"`封闭文本时会解析文本的FORM语法，并形成字符串。

此外，三元运算语句本身可以视作字符串，即三元运算语句`\@~\@`不需要被`@"~"`封闭，可以省略`@"~"`。

::: tip 正确

```
STR:0 = 嘿嘿嘿
;使用FORM语法赋值
RESULTS += STR:0
;自增运算的右侧必须是字符串表达式
RESULTS += "哈哈"
;在字符串表达式中使用常量字符串
PRINTS @"%RESULTS%甲乙丙丁戊"
;在字符串表达式中使用FORM语法

;以下四行是等同的
PRINTS STR:0 + "！"
PRINTFORM %STR:0%！
PRINTS @"%STR:0%！"
PRINTFORM %STR:0 + "！"%
```

:::

::: danger 错误

```
STR:0 = RESULTS
;内容将是RESULTS
RESULTS += 哈哈
;抛出错误：未能识别的标识符“哈哈”！
RESULTS += %STR:0%
;抛出错误：表达式异常
PRINTFORM @"%RESULTS%甲乙丙丁戊"
;“@"”和“"”也会被显示出来
```

:::

## 在INPUTS系列指令中使用宏语法

你可以在`INPUTS`等输入指令中使用宏表达式。

关于宏格式的更多信息，请参见使用指南中的宏部分。

如果你想把`()`作为一个没有宏语法的简单字符串使用，你必须用`\`转义。

