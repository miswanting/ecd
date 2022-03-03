# 函数与预处理指令（风飏@df32翻译版）

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exfunc

译者：[风飏@df32](https://github.com/df32)

也可跳转至：[原版](Function_and_Preprocessor)

## 函数

### @SYSTEM_TITLE

在Emuera启动后，所有csv文件加载结束后立即被调用。

这之后，当脚本执行<code>BEGIN TITLE</code>时再次调用此函数。

<code>@SYSTEM_TITLE</code>通常定义了游戏启动时的[[标题界面]]。

当这个函数没有在脚本中定义时，Emuera将使用一个内置的标题界面作为代替。

### @TITLE_LOADGAME

当玩家在Emuera内置标题界面中选择了“加载游戏”时被调用。

<code>@TITLE_LOADGAME</code>通常用来绘制选择游戏存档加载的界面，并实现之后的逻辑处理。

当这个函数没有在脚本中定义时，Emuera将使用一个内置的加载界面作为代替，并实现之后的处理。

在定义了<code>@SYSTEM_TITLE</code>的情况下，除非使用<code>CALL</code>明文调用，否则<code>@TITLE_LOADGAME</code>不会执行。

### @EVENTLOAD

当存档加载完毕后立即被调用。

由于是一个事件函数，它可以被重复定义。

若<code>@EVENTLOAD</code>没有定义，则会立即跳转到<code>@SHOW_SHOP</code>。

### @SYSTEM_AUTOSAVE

在系统进行自动保存时被调用。

你可以定义你自己的自动保存内容。

如果没有定义，就会使用标准的保存功能。

### @CALLTRAINEND

使用<code>CALLTRAIN</code>自动执行结束后被调用。

注意，它不是一个事件函数，不能被多重定义。

### 用户定义函数的参数说明

> 在1.54u和1.60及以后的版本中，格式标准是不同的。此处只记录ver1.819以后的情况

#### 格式

**函数声明：**

```
@<函数名>, <参数> {,<参数2> ...}
@<函数名>(<参数> {,<参数2> ...})
```

函数声明的参数（形参）只能使用<code>ARG</code>、<code>ARGS</code>以及函数中<code>#DIM(S)</code>声明的私有变量。

`ARG`和`ARGS`是两个专门用来函数传递参数的变量，不需要<code>#DIM(S)</code>声明即可直接使用
前者传递数值，后者传递字符串。

**函数调用：**

```
CALL <函数名>, <参数> {,<参数2> ...}
CALL <函数名>(<参数> {,<参数2> ...})
```

实际参数可以是数值表达式或字符串表达式。

当向函数传递字符串时，字符串常量必须使用`"`封闭起来。
若要对字符串格式化，可以使用`@"~~"`。

除了`CALL`以外，`JUMP`、`CALLFORM`、`TRYCALL`等指令也可以调用函数。

> 从ver1.808开始，如果形参与实参的值类型不同，Emuera不会再自动进行数值与字符串的转换，而会抛出错误。
>
> 如果你想像ver1.807或更早的版本那样传如不同值类型，请改变Emuera设置或使用`TOSTR``TOINT`函数。

你可以为函数指定任何数量的参数。
调用函数时参数可以省略，即实际的参数（实参）可以少于声明的参数（形参）。
当参数省略时，Emuera将使用数字0或空字符串填充，或者使用参数的默认值来填充。

调用函数的参数传值可以[参考`ARG`和`ARGS`中传递的值]()。

请注意，函数传参本质上是一个传递值的的过程，因此在函数中改变参数的值不会改变原始变量的值。
（除非使用[传递参数的引用](#传递参数的引用)。）

```
;<声明>
  @FOOBAR, ARG:0, ARGS:0
    ;～～
  @HOGEHOGE, ARG:0, ARG:1, ARG:2
    ;～～
  @FOO_5(L_ID, L_STR)
  #DIM L_ID
  #DIMS L_STR
    ;～～

;<调用>
 	;传递变量值
 		CALL FOOBAR, X , STR:0
 	;传递常量
 		CALL FOOBAR, 123 , "啊啊啊"
 	;传递带格式的字符串
 		CALL FOOBAR, 123 , @"[{COUNT}] 啊啊啊"
 	;指定表达式
 		CALL FOOBAR, X + 10, "啊啊啊" * 10
 	;参数省略-全部
 		CALL FOOBAR
 	;参数省略-第１参数
 		CALL FOOBAR, , "啊啊啊"
 	;参数省略-第２参数
 		CALL FOOBAR, 123
```

```
;<错误的示例>
 	;错误（参数过多）
 		CALL FOOBAR, X , STR:0, Y
 	;错误（参数类型不符-试图为数值类型的第1参数代入字符串）
 		CALL FOOBAR, "あいう", "かきく"
 	;错误（参数类型不符-试图为字符串类型的第2参数代入数值）
 		CALL FOOBAR, 123 , 456
 ;<不规范的写法>
 	;不应当使用广域变量
 		@FOOBAR, X, Y
 	;形参会随X、Y变化，降低了代码的可读性和可靠性
 		@FOOBAR, ARG:X, ARG:Y
 	;同理，可读性差
 		@FOOBAR, ARG:0, ARG:(ARG:0)
```

#### 参数默认值

可以在声明函数时声明参数的默认值。调用函数省略参数时将使用参数的默认值。

当设置初始值时，函数声明为如下格式：

```
@<函数名>{, <参数>=<初始值>, <参数2>=<初始值2> ...}
```

参数默认值只能指定常量，包括数值常量和字符串常量，不能使用变量。
字符串常量必须用`"`封闭。

```
;声明参数默认值（部分参数没有默认值）
@FUNCTION, ARGS:0 = "啊", ARG:0 = 111, ARG:1, ARG:2 = 200
  ;～～

;<错误的示例>
;错误（参数默认值只能使用常量）
@FOOBAR, ARG:0 = MASTER, ARG:1 = TARGET

;当函数参数为ARG、ARGS、函数内声明的私有变量以外的情况下参数默认值声明会被忽略。
@FOOBAR, X = 5, Y = 4
```

#### 传递参数的引用

从ver1.810开始，你可以通过使用引用型变量来为函数传递参数的引用而非传递参数的值。

关于引用型变量详见[引用型变量](Custom_Varaible#引用型变量)。

```
;<xxx.ERB>
 	@SYSTEM_TITLE
 	A = 0
 	CALL TEST(A)
 	B = 1
 	CALL TEST(B)
 	PRINTFORML A == {A}
 	PRINTFORML B == {B}
 	WAIT
 
 	@TEST(HOGE)
 	#DIM REF HOGE
 	HOGE = 100
 	RETURN
 
;<运行结果>
 	A == 100
 	B == 100
```

上面的例子中函数<code>@TEST</code>的形参<code>HOGE</code>为引用型变量。

<code>@TEST</code>第一次被调用时，形参<code>HOGE</code>实际上为实参<code>A</code>的引用。

当函数执行<code>HOGE = 100</code>时实际执行的操作是将<code>100</code>赋值给变量<code>A</code>。
因此之后第一个<code>PRINTFORML</code>输出的结果为100。

<code>@TEST</code>的第二次调用与这相同，将变量<code>B</code>赋值100，之后第二个<code>PRINTFORML</code>的结果为100。

## 属性

属性是指用来定义函数的样式和动作的<code>#</code>起始的行。

函数所有以`#`开头的预处理器，必须紧跟着函数声明来书写。

### #ONLY

[事件函数]()专用的属性。

如果一个事件函数的定义声明了`#ONLY`，则只有这个定义会被执行，其他重复定义将会被忽略。

若同一事件函数存在多个声明了<code>#ONLY</code>的定义，则只有“最初的第一个”会被执行。

### #FUNCTION

声明数值类型的[式中函数]()的属性。

声明<code>#FUNCTION</code>的函数不能`RETURN`来结束，而必须通过`RETURNF <数值表达式>`来返回一个数值。

更多信息见[用户定义式中函数]()。

### #FUNCTIONS

声明字符串类型的[式中函数]()的属性。

声明<code>#FUNCTIONS</code>的函数不能`RETURN`来结束，而必须通过`RETURNF <字符串表达式>`来返回一个字符串。

更多信息见[用户定义式中函数]()。

## 定义

定义是指用来定义变量名字和大小的<code>#</code>起始的行。

函数所有以`#`开头的预处理器，必须紧跟着函数声明来书写。

### #LOCAL(S)SIZE

```
#LOCALSIZE <常数表达式>
#LOCALSSIZE <常数表达式>
```

函数内用于声明局部变量LOCAL和LOCALS的元素数量的指令。

其中参数<code><常数表达式></code>的结果应当为大于0的整数，不应当包含任何变量。
包含变量或不可解释的标识符的声明将被忽略。

没有<code>#LOCAL(S)SIZE</code>声明的函数将默认使用VariableSize.csv中的设定值。

若在事件函数中使用<code>#LOCAL(S)SIZE</code>声明，则最先被执行的函数的声明会生效（从ver1800开始）。

### #DIM

用来声明数值类型变量的指令。

在ERB脚本中函数内使用时，声明的变量为只能在该函数内使用的私有变量。
详见[用户定义变量](Custom_Variable)。

在ERH头文件中使用时，声明的变量为所有函数公用的广域变量。
详见[广域变量的声明](Header_File#广域变量的声明)。

### #DIMS

用来声明字符串类型变量的指令。

在ERB脚本中函数内使用时，声明的变量为只能在该函数内使用的私有变量。
详见[用户定义变量](Custom_Variable)。

在ERH头文件中使用时，声明的变量为所有函数公用的广域变量。
详见[广域变量的声明](Header_File#广域变量的声明)。

### #DEFINE

用来在ERH头文件中声明宏的指令。
详见[宏的定义](Header_File#宏的定义)。


## 特殊区块行

这些是预处理的行。

在你写它们的同一行中，你不能立即在它们后面加上另一个指令、功能或评论。

Eramaker并不支持这一功能，所以在某些情况下你可能需要使用`;!;`。

### [SKIPSTART] ~ [SKIPEND]

<code>[SKIPSTART] ~ [SKIPEND]</code>之间的行Emuera不会读取和执行。

当需要在Emuera 和 Eramaker之间实现不同的行为时，就可以到这个功能。

<code>[SKIPSTART] ~ [SKIPEND]</code>也可以与`;!;`一起使用，用来编写你不希望 Emuera 执行的语句。

详见[特殊注释行](General#特殊注释行)。

### [IF XXX] ~ [ELSEIF XXX] ~ [ELSE] ~ [ENDIF]

判断名为<code>XXX</code>的宏是否被定义，进而执行不同的区块。

详见[宏的定义](Header_File#宏的定义)。

### [IF_DEBUG] ~ [ENDIF]

当Emuera为调试模式时执行的区块。

非调试模式时会被作为注释而忽略。

关于调试模式请参考[调试模式]()。

### [IF_NDEBUG] ~ [ENDIF]

当Emuera为非调试模式时执行的区块。

调试模式时会被作为注释而忽略，与`[IF_DEBUG]`正相反。

关于调试模式请参考[调试模式]()。