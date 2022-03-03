<!-- <script setup>
import PrintCommandChooser from './PrintCommandChooser.vue'
</script> -->
# 命令（风飏@df32翻译版）

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/excom

译者：[风飏@df32](https://github.com/df32)

也可跳转至：[原版](Custom_Variable)

## 值类型规范

* <数值> - 64位整型的数字。
* <文本> - 没有以`"`封闭的文字。
* <字符串> - 以`"`封闭的文字。
* <数式> - 数值表达式，返回结果为数值的表达式
* <文本式> - 字符串表达式，返回结果为字符串的表达式。
* <FORM格式文本> - 内容带有FORM语法的文本。
* <FORM格式文本式> - 返回结果带有FORM语法字符串的表达式。

> 注意，有些指令以变量而非变量值为参数。

## PRINT系列

### PRINT系列指令辅助选择器

<PrintCommandChooser />

### PRINT(|V|S|FORM|FORMS)(|K|D)(|L|W)

PRINT系列指令最基本的指令。

第1个括号内的关键字指定了**参数类型**：
- `(无)`		-	(<文本>)
- `V`		-	(<数式>, <数式>, <数式> ...)
- `S`		-	<文本式>
- `FORM`		-	(<FORM格式文本>)
- `FORMS`	-	<FORM格式文本式>

第二个括号中的关键字`K`指定应用`ForceKana`指令，关键字`D`指定忽略`SetColor`指令。 

第2个括号内的关键字控制绘制方式：

- `(无)`		-	忽略`FORCEKANA`指令，应用`SETCOLOR`指令指定的颜色来绘制。
- `K`		-	应用`FORCEKANA`指令来绘制。
- `D`		-	忽略`SETCOLOR`指令，使用设置文件指定的默认颜色来绘制。

> 注：`SETCOLOR`指令用来指定字体颜色，`FORCEKANA`指令与日文平假转换有关。

> 从1.736版本开始，关键词`K`和`D`不能同时指定。

第3个括号内的关键字控制绘制文字后的**是否换行**，以及是否执行`WAIT`

- `(无)`		-	输出文本后不换行也不执行WAIT
- `L`		-	输出文本后换行
- `W`		-	输出文本后执行WAIT

> 注：`WAIT`指令用于等待用户键入回车符。

以上关键字可以组合使用，
例如`PRINTSDW`表示，参数`<文本式>`，默认字体颜色，PRINT后执行`WAIT`指令。

### PRINTSINGLE(|V|S|FORM|FORMS)(|K|D)

PRINTSIGLE系列指令与`PRINTL`指令大致相同，
不同点在于`PRINTSIGLE`绘制文本超出画面宽度时不会自动换行。

* 超出画面的文字不会被绘制。
* 因为在输出后会换行，所以没有(|L|W)关键字。
* 其他关键字与PRINT的关键字意义相同。

### PRINT(|FORM)(C|LC)(|K|D)

PRINTC系列指令绘制文本时，若文本没有到达指定长度，则会用半角空格来补充。

Emuera设置[设置#PRINTC文字长度]()（默认25）指定了文本的长度。

在脚本中绘制文本按钮时建议考虑使用PRINTC指令。

第1个括号内的关键字指定了**参数类型**：

- `(无)`		-	<文本>
- `FORM`		-	<FORM格式文本>

第2个括号内的参数指定了**文字对齐方式**：

- `C`		-	文字右对齐（左侧填充空格）
- `LC`		-	文字左对齐

第3个括号内的关键字（`K`、`D`）与PRINT系列指令的关键字意义相同。

### PRINTDATA(|K|D)(|L|W)

PRINTDATA系列指令。根据私家改造版Readme：
```
书写格式：
	PRINTDATA (数值变量，可省略)
		DATA (文本)
		DATAFORM (FORM格式文本)
		DATALIST
			(DATA 或 DATAFORM 序列)
		ENDLIST
	ENDDATA
内容：
	随机显示DATA, DATAFORM, DATATLIST~ENDLIST指定的文本。
	不使用IF和RAND就能实现显示随机文本的功能。
	当指定数值变量参数时，将根据变量值进入指定编号的DATA。
	DATALIST~ENDLIST中每个DATA或DATAFORM都相当于一行。
```
如上所述。

此外，`K`, `D`, `L`, `W`关键字与PRINT系列指令的关键字意义相同。

请在使用`PRINTDATA`前就已经确定要显示的文本。

`PRINTDATA~ENDDTA`内没有任何DATA系列指令的话，程序会直接继续执行下一步。

`PRINTDATA~ENDDATA`以及`DATALIST~ENDLIST`内不能使用上述以外的语法。


### PRINTBUTTON(|C|LC) <文本式>, <数式或文本式>

`PRINTBUTTON`指令用于生成可以鼠标点击的按钮。

格式与`PRINTS`接近，但第二参数制定了单击时输入的数值或字符串。

第一参数中的换行符会被忽略。

Emuera会将`[300] 存档`这样的用`[]`封闭数字后跟文字这样的文本在绘制时自动转换成按钮。

`PRINTBUTTON`指令用来避免自动生成而是强制生成按钮。

这个指令在下面的示例中格外有用：
``` erb
	PRINT 是要这样么？ [0] 是    [1] 否
	INPUT
```

这种情况下Emuera并不能正确的识别应当被按钮化的部分，
会形成按钮`是要这样么？ [0] 是`与按钮`[1] 否`。

可以使用`PRINTBUTTON`来重写这种情况：
``` erb
 	PRINTS "是要这样么？ "
 	PRINTBUTTON "[0] 是", 0
 	PRINTS "    "
 	PRINTBUTTON "[1] 否", 1
 	INPUT
```

（这里使用`PRINTS`而非`PRINT`是为了清晰的显示出来空格的数量）

这样就可以正确绘制文本和按钮了。

此外，`PRINTBUTTON`指令显示的文本并不需要包含`[0]`和`[1]`，

但仍然建议标注`[0]`和`[1]`来提示玩家这是按钮。

`PRINTBUTTON`指令不仅可以生成输入数值的按钮，也可以产生输入字符串的按钮。

但字符串应当使用`INPUTS`指令而非`INPUT`指令。
```
 	PRINTL 请输入名字
 	PRINTBUTTON "[穗月]", "穗月"
 	PRINTBUTTON "[美穗]", "美穗"
 	PRINTBUTTON "[其他]", "其他"
 	INPUTS
```

括号内的关键字与`PRINTC`相同，设置了对齐方向。


### PRINTPLAIN (|FORM）

输出纯文本。不会转化成按钮。

### CUSTOMDRAWLINE <文本>
### DRAWLINEFORM <FORM格式文本>
使用指定的文本填满一整行。DRAWLINEFORM是支持FORM格式文本的版本。

### REUSELASTLINE <FORM格式文本>

将带FORM格式的文本输出到屏幕的最后一行。

当紧接着用户输入了内容时，将刚才输出的一行替换为用户当前输入的内容。

REUSELASTLINE通常使用在INPUT、INPUTS的循环处理之中，处理用户的无效输入。

参数与`PRINTFORML`一样的格式。
```
 	$INPUT_LOOP
 	INPUT
 			; 令用户输入一个数值
 	IF RESULT != 0
 			; 判断这个值不等于零，是无效值
 		CLEARLINE 1 
 			; 清除刚才用户输入的这一行
 		REUSELASTLINE 无效的输入
 			; 在屏幕上输出一行『无效的输入』
 		GOTO INPUT_LOOP
 			; 返回刚才的INPUT指令，令用户重新输入数值
 			; 用户输入时会“重用”刚才输出的『无效的输入』行
 	ENDIF
```

因为清除了用户的输入行，并且使用的`REUSELASTLINE`会在下次用户输入时“重用”，
因此即使连续多次无效输入行数也不会增加。

这样就可以防止选择项被顶到画面之外的事情发生了……大概吧。 

同理在`@USERXXX`系函数的条件分支的最后，也可以同样使用`REUSELASTLINE`来处理用户的无效输入。
```
 	IF ...
 		...
 		...
 	ELSE
 		REUSELASTLINE 
 	ENDIF
```

### CLEARLINE <行数>
删除指定行数的文本。

行数的计算方法与`LINECOUNT`相同。

行数在使用诸如`PRINTL`之类会引起换行操作的指令时会加`1`。

此外，请务必注意，如果显示的文本过长被自动换行，这种情况下行数也会加`1`。

## 显示处理·字体处理·显示方式参考

### SETCOLOR `<红>`, `<绿>`, `<蓝>`
### SETCOLOR `<RGB>`
### RESETCOLOR

将文字颜色换为指定的颜色，直至使用`RESETCOLOR`指令还原。

当前文字颜色可以使用`GETCOLOR`指令获取。默认文字颜色可以使用`GETDEFCOLOR`指令获取。

SETCOLOR指令参数可以使用形如`0xRRGGBB`的16进制数值。
```
 	SETCOLOR 255, 128, 0
 	SETCOLOR 0xFF8000
```
上面两行代码效果相同。使用`GETCOLOR`指令获取的值为后者的形式。 

### SETBGCOLOR `<红>`, `<绿>`, `<蓝>`
### SETBGCOLOR `<RGB>`
### RESETBGCOLOR

将背景色变为指定颜色的指令。 

基本作用与`SETCOLOR`、`RESETCOLOR`类似。

处于安全原因，颜色变更后的0.2秒内若出现再次变更的指令的话会被强制`WAIT`（等待）过0.2秒后再执行。

当前的背景色可以使用`GETBGCOLOR`获得。默认背景色可以使用`GETDEFBGCOLOR`获得。

### SETCOLORBYNAME <文本>
### SETBGCOLORBYNAME <文本>

通过预设的颜色名称来设置文字颜色和背景颜色的指令。

除了参数是颜色的名称之外，其他与`SETCOLOR`、`SETBGCOLOR`相同。

> 预设的颜色名称参见[颜色枚举](https://msdn.microsoft.com/zh-cn/library/system.drawing.knowncolor(v=vs.80).aspx)。

### GETCOLOR

将当前使用的文字颜色返回到`RESULT:0`中。

返回的数值若以16进制表示则为`0xRRGGBB`的格式。

例如若当前文字颜色为橙色，以RGB表示为`255,128,0`，则返回的数值为`16744448`，以16进制表示为`0xFF8000`。

### GETDEFCOLOR

将设置指定的默认文字颜色返回到`RESULT:0`中。

与`GETCOLOR`类似。

### GETBGCOLOR

将当前使用的背景颜色返回到`RESULT:0`中。

与`GETCOLOR`类似。

### GETDEFBGCOLOR

将设置指定的默认背景颜色返回到`RESULT:0`中。

与`GETCOLOR`类似。

### GETFOCUSCOLOR

将设置指定的被选中文字颜色返回到`RESULT:0`中。

与`GETCOLOR`类似。

### FONTBOLD
### FONTITALIC
### FONTREGULAR

改变当前的文字样式。

`BOLD`（加粗）与`ITALIC`（倾斜）可以同时使用。

调用`REGULAR`指令后会取消文字的加粗倾斜。

### FONTSTYLE <数式>

改变当前的文字样式。

* 0 - 默认
* 1 - 加粗
* 2 - 倾斜
* 4 - 添加删除线
* 8 - 添加下划线

可以将参数通过[运算#位运算|位或运算]()组合以表示复合样式。

例如，`FONTSTYLE 3`表示将文字设为加粗倾斜。

这与同时使用`FONTBOLD`、`FONTITALIC`指令的效果相同。

`FONTSTYLE 0`则与`FONTREGULAR`的效果相同。

示例：
```
 	FONTSTYLE 1 + 2
 	PRINTL 加粗＋倾斜
 	FONTSTYLE 5
 	PRINTL 加粗＋删除线
 	FONTITALIC
 	PRINTL 加粗＋倾斜＋删除线
 	FONTSTYLE 0
 	PRINTL 通常
```

### GETSTYLE

将当前文字样式返回到`RESULT:0`中。

返回值与`SETSTYLE`指令的参数格式相同。

若没有使用过`FONTSTYLE`、`FONTBOLD`或`FONTITALIC`指令，则会返回`0`。

### CHKFONT <文本式>

检查系统是否已经安装了指定名称的字体。

若已经安装，则返回数值`1`到`RESULT:0`中，反则返回`0`。

### SETFONT <文本式>

将当前使用的字体设为指定的字体。

当省略参数时，或以空字符串为参数时，将使用设置中指定的[设置#字体名称|默认字体]()。

当指定字体不存在时，将替代为字体`Microsoft SansSerif`。

考虑到指定的字体有可能未被安装，建议在使用`SETFONT`指令之前先使用`CHKFONT`指令检查字体是否安装。 
```
 	PRINTL abc123啊哦呃(默认字体)
 	CHKFONT "ＭＳ Ｐゴシック"
 	IF RESULT
 		SETFONT "ＭＳ Ｐゴシック"
 		PRINTL abc123啊哦呃(ＭＳ Ｐゴシック)
 	ENDIF
 	CHKFONT "ＭＳ 明朝"
 	IF RESULT
 		SETFONT "ＭＳ 明朝"
 		PRINTL abc123啊哦呃(ＭＳ 明朝)
 	ENDIF
 	STR:0 = ＭＳ Ｐ明朝
 	CHKFONT STR:0
 	IF RESULT
 		SETFONT STR:0
 		PRINTL abc123啊哦呃(ＭＳ Ｐ明朝)
 	ENDIF
 	SETFONT
```

### GETFONT

将当前使用的字体名称返回到`RESULT:0`中。

返回值与`SETFONT`指令参数格式相同。

若没有使用过`SETFONT`指令，则会返回设置中的默认字体。

### FORCEKANA <数式>

指定显示指令输出平假名还是片假名。
对各种含有关键字`K`的PRINT系列指令有效。 

参数为数值，具体如下：

* 0:无变化
* 1:平假名→片假名
* 2:片假名→平假名（只有全角）
* 3:片假名→平假名（全角半角都有）

### ALIGNMENT `<LEFT or CENTER or RIGHT>`

改变当前文字的对齐方式。

有效参数为`LEFT`、`CENTER`、`RIGHT`的文本。

默认文字的显示为左端对齐，即`ALIGNMENT LEFT`。

居中对齐`ALIGNMENT CENTER`可以帮助制作文字居中的标题画面。

`ALIGNMENT`将对齐方式应用于当前正在处理的行。
```
 	ALIGNMENT RIGHT
 	PRINT 啊啊啊
 	ALIGNMENT CENTER
 	PRINTL 噢噢噢
 	ALIGNMENT LEFT
```
上面的示例中`啊啊啊``噢噢噢`将会居中对齐。

### CURRENTALIGN

将当前文字对齐方式返回到`RESULTS:0`中。

返回值与`ALIGNMENT`指令参数格式相同，是大写的字符串。

若没有使用过`ALIGNMENT`指令则会返回默认对齐方式`"LEFT"`。

### REDRAW <数式>

控制画面绘制的指令。

参数值包括
* 0 - 暂停画面自动绘制，只在需要用户输入时更新画面。
* 1 - 进行画面自动绘制，画面更新的频率为设置中的[设置#每秒帧数|每秒帧数]()。
* 2 - 与0相同，并在执行REDRAW时强制更新画面一次。
* 3 - 与1相同，并在执行REDRAW时强制更新画面一次。

这个指令通常用来绘制不会“晃动”的界面。

使用`CURRENTREDRAW`指令可以获取当前画面绘制方式。返回值为0或1。

### CURRENTREDRAW

将当前画面的绘制方式返回到`RESULT:0`中。

默认情况下返回`1`。当使用`REDRAW`暂停画面绘制时返回`0`。

### PRINTCPERLINE

将设置中的[设置#PRINTC并列数量|PRINTC并列数量]()，即当前每行能够并列`PRINTC`的数量，返回到`RESULT:0`中。

该设置的默认值为`3`。

### LINEISEMPTY

判断当前行是否为空行，并返回到`RESULT:0`中。

若是空行，则返回`1`；否则，返回`0`。

这个指令通常使用在`PRINTL`指令前，检查是否有必要换行。

### BARSTR <变量>, <最大值>, <长度>

绘制一个BAR（条、槽），将绘制的字符串返回到`RESULTS:0`中。

与[BAR指令]()类似。

### MONEYSTR <数值>{, <格式指示符>}

将数值参数转换为表示金钱的字符串，并返回到`RESULTS:0`中。

转换过程中会根据设置将[设置#金钱单位|金钱单位]()添加在数字前或数字后。

第2参数是一个字符串，用于指定格式化数值的格式，与[#TOSTR <数式>, <格式指示符> |TOSTR]()指令参数类似。

### SKIPDISP <数值>

### NOSKIP
### ENDNOSKIP
### ISSKIP
### MOUSESKIP

## 字符串操作·引用

### TOUPPER <文本式>
### TOLOWER <文本式>
### TOHALF <文本式>
### TOFULL <文本式>
### TOSTR <数式>, <格式指示符>
### ISNUMERIC <文本式>
### TOINT <文本式>
### STRLEN <文本>
### STRLENS <文本式>
### STRLENFORM <FORM格式文本>
### STRLENU <文本>
### STRLENSU <文本式>
### STRLENFORMU <FORM格式文本>
### SUBSTRING <文本式>, <数式>, <数式>
### SUBSTRINGU <文本式>, <数式>, <数式>
### CHARATU <文本式>, <文字位置>
### STRFIND <文本式>, <文本式>(, <数式>)
### STRFINDU <检索对象>, <检索字符串>{, <起始位置>}
### STRCOUNT <检索对象字符串>, <检索字符串>
### SPLIT <文本式>, <文本式>, <字符串变量>
### REPLACE <原始字符串>, <查找字符串>, <替换字符串>
### ESCAPE <字符串>
### UNICODE <数式>
### ENCODETOUNI <对象字符串(FORM格式字符串)>

## 算术

### POWER <变量>, <数式>, <数式>
### ABS <数式>
### SIGN <数式>
### SQRT <数式>
### GETBIT <数式>, <数式>
### MAX <数式>(, <数式>...)
### MIN <数式>(, <数式>...)
### LIMIT <数式>, <数式>, <数式>
### INRANGE <数式>, <数式>, <数式>
### SETBIT <数值型变量>, <数式>{, <数式>,...}
### CLEARBIT <数值型变量>, <数式>{, <数式>,...}
### NVERTBIT <数值型变量>, <数式>{, <数式>,...}

## 角色操作·引用

### ADDCHARA <数式>(, <数式>, <数式>, ...)
### ADDSPCHARA <数式>(, <数式>, <数式>, ...)
### DELCHARA <数式>(, <数式>, <数式>, ...)
### SWAPCHARA <数式>, <数式>
### SORTCHARA <角色变量> {, `<FORWARD or BACK>`}
### GETCHARA <角色编号(NO:XXXの方)>, (<0 or 0以外>省略可)
### GETSPCHARA <角色编号(NO:XXXの方)>
### ADDDEFCHARA
### ADDVOIDCHARA
### DELALLCHARA
### PICKUPCHARA <目标角色>(, <目标角色>, ....)
### EXISTCSV <数式>, <数式>
### FINDCHARA <角色变量>, <式>(, <数式>, <数式>)
### FINDLASTCHARA <角色变量>, <式>(, <数式>, <数式>)
### COPYCHARA <数式>, <数式>
### ADDCOPYCHARA <数式>

## 变量操作·变量引用·CSV引用

### VARSIZE <变量名>

将一个[Emuera用语集#数组变量|数组变量]()的大小返回到`RESULT`中。

[Emuera用语集#多元数组变量|多元数组变量]()每个维的大小将会从左到右依次存入`RESULT:0`、`RESULT:1`、`RESULT:2`等。

CSV变量的大小通常是在VariableSize.csv中指定的。
```
 	VARSIZE FLAG
 	PRINTFORML <TEST1> = {RESULT:0}
 	VARSIZE SAVESTR
 	PRINTFORML <TEST2> = {RESULT:0}
 	VARSIZE TALENT
 	PRINTFORML <TEST3> = {RESULT:0}
 	WAIT
 	
 	;結果(サイズを変更していない場合)
 	;<TEST1> = 10000
 	;<TEST2> = 100
 	;<TEST3> = 1000
```
指令参数用于引用数组变量自身，而非引用数组中的元素，
因此即使参数中包含了数组的索引，甚至索引超出数组范围，
也不会引发错误。

例如`VARSIZE FLAG:-1`等同于`VARSIZE FLAG`。
	
### RESETDATA

初始化除了`GLOBAL`与`GLOBALS`以外的所有变量。

具体为删除所有角色，将局部变量与通常的变量全部以数值0或空字符串填充。

而像`PALAMLV`和`STR`等已经被设定了初始值的变量会变为其初始值。

### RESETGLOBAL

初始化全局变量。

具体为将`GLOABL`所有元素赋值为0，`GLOABLS`所有元素赋值为空字符串。

### RESET_STAIN <数式>

将参数所指定角色的`STAIN`变量进行初始化。

初始化与`BEGIN TRAIN`行为类似，根据过_replace.csv中`汚れの初期値`设置来赋值。

### SWAP <变量1>, <变量2>

交换两个变量中的值。

两个变量的值类型必须一致。
（数值类型与数值类型，字符串类型与字符串类型）

### CSVNAME <数式>(, <数式>)
### CSVCALLNAME <数式>(, <数式>)
### CSVNICKNAME <数式>(, <数式>)
### CSVMASTERNAME <数式>(, <数式>)

从CSV中读取指定角色的`NAME`、`CALLNAME`、`NICKNAME`、`MASTERNAME`。

当需要获取未加载角色的信息或已加载角色的初始信息时可以使用这些指令。

第1参数为角色编号，第2参数指定是否为SP角色。

当第2参数为`0`（默认值）时，读取一般角色的信息；
为1时，读取SP角色的信息。

### CSVBASE <数式>, <数式>(, <数式>)
### CSVCSTR <数式>, <数式>(, <数式>)
### CSVABL <数式>, <数式>(, <数式>)
### CSVTALENT <数式>, <数式>(, <数式>)
### CSVMARK <数式>, <数式>(, <数式>)
### CSVEXP <数式>, <数式>(, <数式>)
### CSVRELATION <数式>, <数式>, <数式>
### CSVJULE <数式>, <数式>(, <数式>)
### CSVEQUIP <数式>, <数式>(, <数式>)
### CSVCFLAG <数式>, <数式>,(, <数式>)

从CSV中读取指定角色的特定变量的值。

第1参数为角色编号，第2参数为变量数组的索引，第3参数指定是否为SP角色。

除了`CSVCSTR`的返回值为字符串返回到`RESULTS`中，其他指令返回值为数值返回到`RESULT`中。

### GETNUM <变量名>, <文本式>

将CSV变量的[文本索引]()转换为对应的数值索引，返回到RESULT:0中。

例如，若`abl.csv`中定义了`2,技巧`，则`GETNUM?ABL,?"技巧"`的返回值为`2`。

当文本索引没有定义时，返回`-1`。

### GETPALAMLV <数式>, <判定するLVの上限>
### GETEXPLV <数式>, <判定するLVの上限>



### FINDELEMENT <一元数组>, <检索值>, <初始索引>, <终止索引>, <全词匹配>
### FINDLASTELEMENT <一元数组>, <检索值>, <初始索引>, <终止索引>, <全词匹配>

在数组内特定范围内检索指定的元素，返回索引到`RESULT:0`中。

指令`FINDELEMENT`为正向检索，`FINDLASTELEMENT`为反向检索。

第1参数指定了要检索的数组，检索只发生在数组的第一维上。例如`TA:2:1:0`中`0`所标识的维上。

第2参数指定了要检索的值，应当与数组元素的数据类型一致。

当检索字符串时，第2参数与`REPLACE`指令类似允许使用正则表达式。

第3、4参数指定了检索的范围，默认将检索第一维的全部元素。

第5参数指定了字符串检索时的精度。默认值为`0`，表示部分匹配。除此以外的值表示全词匹配。

当遇到第一个匹配项时检索终止。


### VARSET <变量名>{, <数式 or 文本式>, <初始索引>, <终止索引+1>}

将变量数组内特定范围的元素以指定的值赋值。

第2参数指定了用于填充的值，默认为数值0或空字符串。

第3、4参数指定了数组内要填充的元素，省略时会填充整个数组。

例如：
```
 	VARSET FLAG, 0
 	VARSET STR, "啊啊啊", 0, 10
 	VARSET TA:0:0:0,5678
```
示例中，`FLAG`的全部元素被赋值为0；

`STR:0`~`STR:9`被赋值为`"啊啊啊"`；

三元数组`TA`的全部元素被赋值为`5678`。

虽然`VARSET`的操作可以使用在ERB脚本中通过`FOR~NEXT`循环实现，
但后者循环数万次乃至数百万次的系统性能消耗是不可忽略的。

相比之下`VARSET`指令更加快捷。

当使用`VARSET`指令处理角色变量时，只有指定的角色的数组会被赋值。
```
 	VARSET CFLAG:MASTER:0, 0
 	VARSET CSTR, ""
```
示例中，MASTER的所有`CFLAG`被赋值为0，`TARGET`的`CSTR`全部被赋值为空字符串。

对于非一元数组或[Emuera用语集#双重数组变量|双重数组变量]()，即[Emuera用语集#多元数组变量|多元数组变量]()，
第3、4参数将被忽略。指令将为数组的全部元素赋值。

### CVARSET <角色变量>{, <数式>, <表达式>, <初始角色编号>, <终止角色编号+1>}

将特定序号范围内的登录角色的某个角色变量中特定元素以指定的值赋值。

第2参数指定了角色变量中的元素，默认为0号元素。

对于`NAME`、`ISASSI`等一次元的角色变量，第2参数将被忽略。

第3参数指定了用于填充的值，默认为数值`0`或空字符串。

第4、5参数指定了要填充的登录角色，省略时会填充所有角色。

示例：
```
 	CVARSET CFLAG, 10, 123
```
等同于：
```
 	REPEAT CHARANUM
 		CFLAG:COUNT:10 = 123
 	REND
```

### ARRAYSHIFT <目标变量>, <ずらす数>, <ずらしてできた空白領域の初期値>{, <ずらす配列範囲の初値>, <ずらす配列要素の範囲の数>}
### ARRAYREMOVE <目标变量>, <消す範囲初値>, <消す要素数>
### ARRAYSORT <目标变量>{, <ソート方式(FORWARD or BACK)>, <開始インデックス>, <目标要素数>}
### ARRAYCOPY <コピー元变量名>, <コピー先变量名>
### CUPCHECK <登録キャラクター番号>

## 游戏存档的操作

### SAVEDATA <数式>, <文本式>
### LOADDATA <数式>
### DELDATA <数式>
### CHKDATA <数式>
### SAVENOS <数值变量>
### SAVEGLOBAL
### LOADGLOBAL
### OUTPUTLOG

## 日期·时间的获取

### GETTIME
### GETMILLISECOND
### ETSECOND

## 输入·等待

### FORCEWAIT
### INPUT {<数值>}
### INPUTS {<字符串>}
### TINPUT <数值>, <数值>{, <数值>, <字符串>}
### TINPUTS <数值>, <文本式>{, <数值>, <字符串>}
### TWAIT <数值>, <数值>
### ONEINPUT {<数值>}
### ONEINPUTS {<字符串>}
### TONEINPUT <数值>, <数值>{, <数值>, <字符串>}
### TONEINPUTS <数值>, <文本式>{, <数值>, <字符串>}
### WAITANYKEY

## 循环·分支语法

### FOR <数值型变量>, <数式>, <数式>{, <数式>}
### NEXT
### WHILE <数式>
### WEND
### DO
### LOOP <数式>
### SELECTCASE <式>
### CASE <CASE条件式>(, <CASE条件式>, <CASE条件式> ……)
### CASEELSE
### ENDSELECT

## 随机数的控制

### RANDOMIZE <数式>
### DUMPRAND
### INITRAND

## 调试辅助·系统流的控制

### BEGIN <关键字>
### CALLTRAIN <コマンド数>
### DOTRAIN <数式>
### THROW <FORM構文>

## CALL·JUMP·GOTO系

### TRYJUMP <字符串> (, 参数1, 参数2……)
### TRYCALL <字符串> (, 参数1, 参数2……)
### TRYGOTO <字符串>
### JUMPFORM <FORM格式文本> (, 参数1, 参数2……)
### CALLFORM <FORM格式文本> (, 参数1, 参数2……)
### GOTOFORM <FORM格式文本>
### TRYJUMPFORM <FORM格式文本> (, 参数1, 参数2……)
### TRYCALLFORM <FORM格式文本> (, 参数1, 参数2……)
### TRYGOTOFORM <FORM格式文本>
### CALLF <字符串> (, 参数1, 参数2……)
### CALLFORMF <FORM格式文本> (, 参数1, 参数2……)
### CALL·JUMP·GOTO系2 (TRYC-CATCH-ENDCATCH)
### TRYCJUMP <字符串> (, 参数1, 参数2……)
### TRYCCALL <字符串> (, 参数1, 参数2……)
### TRYCGOTO <字符串>
### TRYCJUMPFORM <FORM格式文本> (, 参数1, 参数2……)
### TRYCCALLFORM <FORM格式文本> (, 参数1, 参数2……)
### TRYCGOTOFORM <FORM格式文本>
### CATCH
### ENDCATCH
### TRYCALLLIST
### TRYJUMPLIST
### TRYGOTOLIST
### FUNC <字符串> (, 参数1, 参数2……)
### ENDFUNC

## RETURN系

### RETURN <数式>(, <数式>, <数式>, ...)
### RETURNFORM <FORM格式文本>(, <FORM格式文本>, <FORM格式文本>, ...)
### RETURNF <式>

## DEBUG系

### DEBUGPRINT <字符串>
### DEBUGPRINTL <字符串>
### DEBUGPRINTFORM <FORM格式文本>
### DEBUGPRINTFORML <FORM格式文本>
### ASSERT <数式>

## HTML系

### HTML_PRINT <文本式>
### TML_TAGSPLIT <文本式>

