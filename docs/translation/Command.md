<!-- <script setup>
import PrintCommandChooser from './PrintCommandChooser.vue'
</script> -->
# 命令

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/excom



## 值类型规范

* <数值> - 64位整型的数字。
* <文本> - 没有以`"`封闭的文字。
* <字符串> - 以`"`封闭的文字。
* <数值表达式> - 返回结果为数值的表达式
* <字符串表达式> - 返回结果为字符串的表达式。
* <FORM格式文本> - 内容带有FORM语法的文本。
* <FORM格式字符串表达式> - 返回结果带有FORM语法字符串的表达式。

> 注意，有些指令以变量而非变量值为参数。

## PRINT系列

### PRINT系列指令辅助选择器

<PrintCommandChooser />

### PRINT(|V|S|FORM|FORMS)(|K|D)(|L|W)

PRINT系列指令最基本的指令。

第1个括号内的关键字指定了**参数类型**：
- `(无)`		-	(<文本>)
- `V`		-	(<数值表达式>, <数值表达式>, <数值表达式> ...)
- `S`		-	<字符串表达式>
- `FORM`		-	(<FORM格式文本>)
- `FORMS`	-	<FORM格式字符串表达式>

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
例如`PRINTSDW`表示，参数`<字符串表达式>`，默认字体颜色，PRINT后执行`WAIT`指令。

### PRINTSINGLE(|V|S|FORM|FORMS)(|K|D)

PRINTSINGLE系列指令与`PRINTL`指令大致相同，
不同点在于`PRINTSINGLE`绘制文本超出画面宽度时不会自动换行。

* 超出画面的文字不会被绘制。
* 因为在输出后会换行，所以没有(|L|W)关键字。
* 其他关键字与PRINT的关键字意义相同。

### PRINT(|FORM)(C|LC)(|K|D)

PRINTC系列指令绘制文本时，若文本没有到达指定长度，则会用半角空格来补充。

Emuera 设置中的「PRINTC 文字长度」（默认 25）指定了文本的长度。

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
	随机显示DATA、DATAFORM、DATALIST~ENDLIST指定的文本。
	不使用IF和RAND就能实现显示随机文本的功能。
	当指定数值变量参数时，将根据变量值进入指定编号的DATA。
	DATALIST~ENDLIST中每个DATA或DATAFORM都相当于一行。
```
如上所述。

此外，`K`, `D`, `L`, `W`关键字与PRINT系列指令的关键字意义相同。

请在使用`PRINTDATA`前就已经确定要显示的文本。

`PRINTDATA~ENDDATA`内没有任何DATA系列指令的话，程序会直接继续执行下一步。

`PRINTDATA~ENDDATA`以及`DATALIST~ENDLIST`内不能使用上述以外的语法。


### PRINTBUTTON(|C|LC) `<字符串表达式>`, `<数值表达式或字符串表达式>`

`PRINTBUTTON`指令用于生成可以鼠标点击的按钮。

格式与`PRINTS`接近，但第 2 参数指定了单击时输入的数值或字符串。

第 1 参数中的换行符会被忽略。

Emuera会将`[300] 存档`这样的用`[]`封闭数字后跟文字这样的文本在绘制时自动转换成按钮。

`PRINTBUTTON`指令用来避免自动生成而是强制生成按钮。

这个指令在下面的示例中格外有用：
```erb
	PRINT 是要这样么？ [0] 是    [1] 否
	INPUT
```

这种情况下Emuera并不能正确的识别应当被按钮化的部分，
会形成按钮`是要这样么？ [0] 是`与按钮`[1] 否`。

可以使用`PRINTBUTTON`来重写这种情况：
```erb
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

### CUSTOMDRAWLINE `<文本>`
### DRAWLINEFORM `<FORM格式文本>`
使用指定的文本填满一整行。DRAWLINEFORM是支持FORM格式文本的版本。

### REUSELASTLINE `<FORM格式文本>`

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

### CLEARLINE `<行数>`
删除指定行数的文本。

行数的计算方法与`LINECOUNT`相同。

行数在使用诸如`PRINTL`之类会引起换行操作的指令时会加`1`。

此外，请务必注意，如果显示的文本过长被自动换行，这种情况下行数也会加`1`。


### PRINT_IMG `<字符串表达式>`

在行中显示指定的图像。

相当于 `HTML_PRINT` 指令的 `<img>` 标签。

### PRINT_RECT `<数值表达式>`

在行中显示一个宽度为字号参数百分之多少的长方形。

可以通过 `SETCOLOR` 指令像改变字体颜色一样改变其颜色。

相当于 `HTML_PRINT` 指令的 `<shape type='rect'>` 标签。

### PRINT_RECT `<数值表达式>`, `<数值表达式>`, `<数值表达式>`, `<数值表达式>`

在行中显示一个 x、y、宽度、高度分别为参数百分之多少的长方形。

可以通过 `SETCOLOR` 指令像改变字体颜色一样改变其颜色。

相当于 `HTML_PRINT` 指令的 `<shape type='rect'>` 标签。

### PRINT_SPACE `<数值表达式>`

创建一个大小为字号参数百分之多少的空白。

相当于 `HTML_PRINT` 指令的 `<shape type='space'>` 标签。

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

出于安全原因，颜色变更后的0.2秒内若出现再次变更的指令的话会被强制等待 0.2 秒后再执行。

当前的背景色可以使用`GETBGCOLOR`获得。默认背景色可以使用`GETDEFBGCOLOR`获得。

### SETCOLORBYNAME `<文本>`
### SETBGCOLORBYNAME `<文本>`

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

### FONTSTYLE `<数值表达式>`

改变当前的文字样式。

* 0 - 默认
* 1 - 加粗
* 2 - 倾斜
* 4 - 添加删除线
* 8 - 添加下划线

可以将参数通过位或运算组合以表示复合样式。

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

### CHKFONT `<字符串表达式>`

检查系统是否已经安装了指定名称的字体。

若已经安装，则返回数值`1`到`RESULT:0`中，反则返回`0`。

### SETFONT `<字符串表达式>`

将当前使用的字体设为指定的字体。

当省略参数时，或以空字符串为参数时，将使用设置中指定的默认字体。

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

### FORCEKANA `<数值表达式>`

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

### REDRAW `<数值表达式>`

控制画面绘制的指令。

参数值包括
* 0 - 暂停画面自动绘制，只在需要用户输入时更新画面。
* 1 - 进行画面自动绘制，画面更新的频率为设置中的每秒帧数。
* 2 - 与0相同，并在执行REDRAW时强制更新画面一次。
* 3 - 与1相同，并在执行REDRAW时强制更新画面一次。

这个指令通常用来绘制不会“晃动”的界面。

使用`CURRENTREDRAW`指令可以获取当前画面绘制方式。返回值为0或1。

### CURRENTREDRAW

将当前画面的绘制方式返回到`RESULT:0`中。

默认情况下返回`1`。当使用`REDRAW`暂停画面绘制时返回`0`。

### PRINTCPERLINE

将设置中的 PRINTC 并列数量，即当前每行能够并列 `PRINTC` 的数量，返回到 `RESULT:0` 中。

该设置的默认值为`3`。

### LINEISEMPTY

判断当前行是否为空行，并返回到`RESULT:0`中。

若是空行，则返回`1`；否则，返回`0`。

这个指令通常使用在`PRINTL`指令前，检查是否有必要换行。

### BARSTR `<变量>`, `<最大值>`, `<长度>`

绘制一个BAR（条、槽），将绘制的字符串返回到`RESULTS:0`中。

与 `BAR` 指令类似。

### MONEYSTR `<数值>`{, `<格式指示符>`}

将数值参数转换为表示金钱的字符串，并返回到`RESULTS:0`中。

转换过程中会根据设置将[金钱单位](Replace_CSV#金钱单位)添加在数字前或数字后。

第 2 参数是一个字符串，用于指定格式化数值的格式，与 `TOSTR <数值表达式>, <格式指示符>` 指令的参数类似。

### SKIPDISP `<数值>`

设置是否忽略画面输出指令的开关。

- `0`：不忽略。
- `0` 以外的值：忽略。

打开该开关后，`PRINT` 等输出将完全不进行。

此外，在开关打开期间执行到 `INPUT`、`INPUTS` 时，用户将无从得知该做什么，而且直接跳过很可能进入无限循环，因此会显示警告与处理方法，并产生错误。

在当今常见的`口上`实现中，如果要实现口上的不显示，显示与不显示可能会改变指令结果或动作。因此，在打开该开关的状态下调用口上，就能在不显示的同时完成其余处理，从而让显示与不显示时的行为保持一致。

如果会与 `INPUT`、`INPUTS` 冲突，可以用 `NOSKIP`～`ENDNOSKIP` 包围，或者先 `SKIPDISP 0`，待输入处理结束后再 `SKIPDISP 1`（推荐前者）。

当前是否处于忽略状态，可以用 `ISSKIP()` 获取。

从 ver1.808 开始，放在 `SIF` 语句之后也能正常工作。另外，执行 `SKIPDISP` 后，无论参数如何都会把 `RESULT:0` 重置为 0，这是规格。

### NOSKIP

与 `ENDNOSKIP` 一起，指定一个忽略`显示忽略开关`的区间。

被这两个指令包围的区间，即使处于 `SKIPDISP 1` 状态也会正常显示。主要用于需要 `INPUT` 的场合。

该指令不会影响 `SKIPDISP` 的状态，因此在可能打开 `SKIPDISP` 开关的代码（例如有显示/不显示的`口上`相关代码）中，用它就能确保必须显示的地方正常显示。
### ENDNOSKIP

结束由 `NOSKIP` 开始的、忽略`显示忽略开关`的区间。
### ISSKIP

当 `SKIPDISP` 的开关为 0 以外（即忽略 `PRINT` 等输出）时返回 `1`，否则返回 `0`。
### MOUSESKIP

当正在通过右键进入 `WAIT` 跳过状态时返回 `1`，否则返回 `0`。

宏处理时的跳过返回 `0`。当宏处理的跳过与右键同时发生时，优先宏处理，返回 `0`。

## 字符串操作·引用

### TOUPPER `<字符串表达式>`

将参数的字母转换为大写后赋值给 `RESULTS:0`。
### TOLOWER `<字符串表达式>`

将参数的字母转换为小写后赋值给 `RESULTS:0`。
### TOHALF `<字符串表达式>`

将参数的全角字符转换为半角后赋值给 `RESULTS:0`。没有对应半角字符的全角字符保持原样。
### TOFULL `<字符串表达式>`

将参数的半角字符转换为全角后赋值给 `RESULTS:0`。
### TOSTR `<数值表达式>`, `<格式指示符>`

把数值转换为字符串。

第 1 参数是要转换的数值，第 2 参数是以字符串指定的转换格式。

第 2 参数可以省略，省略时会与 `PRINTFORM` 的 `{}` 内一样，转换为普通字符串。

该指令内部调用的是 C# 的 `Int64.ToString()`，因此可以使用与 C# 相同的格式指定。第 2 参数不合适时会出错。
### ISNUMERIC `<字符串表达式>`

判断字符串能否被解析为数值（能否用 `TOINT` 取出值）。

参数能按数值解释时返回 `1`，否则返回 `0`。
### TOINT `<字符串表达式>`

把参数字符串数值化后赋值给 `RESULT:0`。

不过，只有由半角数字组成的字符串才能数值化。无法按数值解释时，以及全角数字时，都会赋值 `0`。
### STRLEN `<文本>`

测量字符串的长度并赋值给 `RESULT:0`。

长度以 Shift-JIS 的字节数为准，也就是说全角字符算作 2 个字符。
### STRLENS `<字符串表达式>`

`STRLEN` 的字符串表达式版。以 Shift-JIS 的字节数测量字符串表达式的长度并赋值给 `RESULT:0`。
### STRLENFORM `<FORM格式文本>`

`STRLEN` 的 FORM 格式文本版。先展开 FORM 语法，再以 Shift-JIS 的字节数测量长度并赋值给 `RESULT:0`。
### STRLENU `<文本>`

`STRLEN` 的 Unicode 版。区别在于全角字符也按 1 个字符计算。
### STRLENSU `<字符串表达式>`

`STRLENS` 的 Unicode 版。区别在于全角字符也按 1 个字符计算。
### STRLENFORMU `<FORM格式文本>`

`STRLENFORM` 的 Unicode 版。区别在于全角字符也按 1 个字符计算。
### SUBSTRING `<字符串表达式>`, `<数值表达式>`, `<数值表达式>`

取出指定字符串表达式的子串并赋值给 `RESULTS:0`。

起始位置从字符串开头算起，为 0。指定到超过原字符串长度的位置时，返回空字符串 `""`。

字符数以 Shift-JIS 的字节数指定，也就是说全角字符算作 2 个字符。

字符数为负值，或指定到超过原字符串末尾的位置时，返回从起始位置到末尾的字符串。

当起始位置或结束位置无法在字符边界切开时（即指向全角字符中间），会被判断为向后偏移 1 个位置，因此可能返回比指定字符数多 1 个字符的字符串，请注意。
### SUBSTRINGU `<字符串表达式>`, `<数值表达式>`, `<数值表达式>`

`SUBSTRING` 的 Unicode 版。区别在于全角字符也按 1 个字符计算。
### CHARATU `<字符串表达式>`, `<文字位置>`

取出字符串中指定序号位置的字符。

处理体系为 Unicode。
### STRFIND `<字符串表达式>`, `<字符串表达式>`(, `<数值表达式>`)

字符串查找指令。

第 1 参数是以字符串表达式给出的被查找字符串，第 2 参数是以字符串表达式给出的要查找的字符串。

把不区分全角/半角、按全角字符算 2 个字符、从 0 开始的索引赋值给 `RESULT:0`。未找到时为 `-1`。

从 1.712 开始，可以指定第 3 参数，用于以从 0 开始的索引指定查找的起始位置。
### STRFINDU `<检索对象>`, `<检索字符串>`{, `<起始位置>`}

`STRFIND` 的 Unicode 版。

返回值的字符位置与起始索引都以 Unicode 计数。
### STRCOUNT `<检索对象字符串>`, `<检索字符串>`

获取字符串中指定子串出现的次数，并把命中次数赋值给 `RESULT:0`。

查找字符串的格式遵循 C# 的正则表达式规范。
### SPLIT `<字符串表达式>`, `<字符串表达式>`, `<字符串变量>`

以第 2 参数指定的字符串为分隔符，分割第 1 参数指定的字符串，并赋值给第 3 参数指定的字符串数组变量。

同时把分割出的数量赋值给 `RESULT`。

第 3 参数指定的变量必须是数组变量。

```erb
SPLIT "あい,うえ,,お", ",", LOCALS
```

上述脚本的结果是：`LOCALS:0` 为 `"あい"`、`LOCALS:1` 为 `"うえ"`、`LOCALS:2` 为 `""`（空字符串）、`LOCALS:3` 为 `"お"`，`RESULT` 为 4。

分割后元素数超过第 3 参数可赋值的数量的部分不会被赋值。`RESULT` 中存入的是实际的分割数，请据此判断。
### REPLACE `<原始字符串>`, `<查找字符串>`, `<替换字符串>`

字符串替换指令。

在第 1 参数的原始字符串中，用第 2 参数的查找模式进行查找，命中后替换为第 3 参数并赋值给 `RESULTS`。

内部处理完全使用正则表达式，第 2 参数遵循 C# 的正则表达式规范。因此，`(`、`)`、`[`、`]`、`$`、`.、*、+` 等正则表达式用的符号必须转义。
### ESCAPE `<字符串>`

对字符串进行正则表达式转义。

把参数中的正则表达式元字符转义后返回，使该字符串在正则表达式中作为普通文本处理。
### UNICODE `<数值表达式>`

把与参数值对应的 Unicode 字符赋值给 `RESULTS:0`。

例如下面的脚本会显示空心爱心符号。

不过，该函数无法处理代理对（surrogate pair），而且字体不支持时也无法显示。

```erb
UNICODE 0x2661
PRINTFORMW %RESULTS%
```

另外请注意，Emuera 对 Unicode 的支持并不完整。例如使用代理对时，Emuera 无法保证准确动作。
### ENCODETOUNI `<对象字符串(FORM格式字符串)>`

把给定的字符串编码为 Unicode，并将其字节作为数值返回。

- `RESULT:0`：字符数
- `RESULT:1` 起：各字节的数值

## 算术

### POWER `<变量>`, `<数值表达式>`, `<数值表达式>`

把幂赋值给指定变量。

例如 `POWER A, X, Y` 就是把 X 的 Y 次幂赋值给 A。

运算结果溢出时会出错。
### ABS `<数值表达式>`

把参数的绝对值赋值给 `RESULT:0`。
### SIGN `<数值表达式>`

把参数的符号赋值给 `RESULT:0`：负值为 `-1`，0 为 `0`，正值为 `1`。
### SQRT `<数值表达式>`

把参数的平方根赋值给 `RESULT:0`。
### GETBIT `<数值表达式>`, `<数值表达式>`

取出参数的指定位，赋值给 `RESULT:0`。

第 1 参数是目标数值，第 2 参数是要取出的位的位置。第 2 参数可指定 0～63，超出范围会出错。

当第 2 参数是常量时，例如 5，下面两行结果相同：

```erb
GETBIT X, 5
RESULT = (X & 1p5) != 0
```
### MAX `<数值表达式>`(, `<数值表达式>`...)

把参数中的最大值赋值给 `RESULT:0`。
### MIN `<数值表达式>`(, `<数值表达式>`...)

把参数中的最小值赋值给 `RESULT:0`。
### LIMIT `<数值表达式>`, `<数值表达式>`, `<数值表达式>`

把第 1 参数的值赋值给 `RESULT:0`，但第 1 参数小于第 2 参数时返回第 2 参数的值，大于第 3 参数时返回第 3 参数的值。

例如想把 `X - Y` 赋值给 A，同时希望赋值后在 0 以上 100 以下，通常要这样写：

```erb
A = X - Y
SIF A < 0
  A = 0
SIF A > 100
  A = 100
```

使用 `LIMIT` 可以压缩为两行：

```erb
LIMIT X - Y, 0, 100
A = RESULT
```
### INRANGE `<数值表达式>`, `<数值表达式>`, `<数值表达式>`

第 1 参数在大于等于第 2 参数且小于等于第 3 参数时返回 `1`，第 1 参数小于第 2 参数或大于第 3 参数时返回 `0`。
### SETBIT `<数值型变量>`, `<数值表达式>`{, `<数值表达式>`,...}

位操作指令。把第 1 参数指定的变量中、第 2 参数及之后指定位置的位设为 1。
### CLEARBIT `<数值型变量>`, `<数值表达式>`{, `<数值表达式>`,...}

位操作指令。把第 1 参数指定的变量中、第 2 参数及之后指定位置的位设为 0。
### INVERTBIT `<数值型变量>`, `<数值表达式>`{, `<数值表达式>`,...}

位操作指令。把第 1 参数指定的变量中、第 2 参数及之后指定位置的位反转。

```erb
SETBIT X, A
CLEARBIT Y, B
INVERTBIT Z, C
```

上述结果与下面相同：

```erb
X |= 1 << A
Y &= ~(1 << B)
Z ^= 1 << C
```

这些位操作指令的格式与 `GETBIT` 函数对应：用 `SETBIT X, A` 修改过的位，可以用 `GETBIT(X, A)` 读取。

## 角色操作·引用

### ADDCHARA `<数值表达式>`(, `<数值表达式>`, `<数值表达式>`, ...)

添加角色。

虽然这是 Eramaker 就有的指令，但 Emuera 允许一次添加多个角色。

第 1 参数是角色的 CSV 编号。给出多个参数时，会一次添加多个角色。
### ADDSPCHARA `<数值表达式>`(, `<数值表达式>`, `<数值表达式>`, ...)

添加 SP 角色。

从 ver1.816 起，Emuera 不再默认支持 SP 角色，`CFLAG:0` 不再被特殊对待，所有角色都可以通过 `ADDCHARA` 添加。仅在启用兼容性选项`使用 SP 角色`时才会用到该指令。
### DELCHARA `<数值表达式>`(, `<数值表达式>`, `<数值表达式>`, ...)

删除角色。

虽然这是 Eramaker 就有的指令，但 Emuera 允许一次删除多个角色。参数是角色的登录编号。
### SWAPCHARA `<数值表达式>`, `<数值表达式>`

交换指定两个角色的登录编号。

```erb
;假设只有 MASTER
ADDCHARA 10
ADDCHARA 11
PRINTFORML NO:1 = {NO:1}, NO:2 = {NO:2}
SWAPCHARA 1,2
PRINTFORML NO:1 = {NO:1}, NO:2 = {NO:2}
```

结果：

```
NO:1 = 10, NO:2 = 11
NO:1 = 11, NO:2 = 10
```
### SORTCHARA `<角色变量>` {, `<FORWARD or BACK>`}

按任意键对角色列表排序。

排序键可以是 `NAME` 这样的字符串变量、`NO` 这样的数值型变量，或 `CFLAG` 这样的数值数组变量。

`<角色变量>` 可以省略，省略时按角色编号（`NO:XX`）排序。

`FORWARD` 为升序，`BACK` 为降序，省略时为升序。

`MASTER` 不参与排序。

另外，`TARGET:0`、`ASSI:0` 会自动追随，使用后无需手动处理。但使用 `TARGET:1` 等的改造版需要自行让它们追随。

```erb
;按 NO 升序
SORTCHARA
;按 NO 降序
SORTCHARA BACK
;按 CFLAG:2 升序
SORTCHARA CFLAG:2
;按 NAME 降序
SORTCHARA NAME, BACK
```

另外，即使 `TARGET == -1`，由于并不会实际引用 `CFLAG:2` 等的值，也不会出错。
### GETCHARA `<角色编号>`, (`<0 或 0 以外>`，可省略)

判断当前拥有的角色中是否存在该角色，存在则返回其在列表中的位置，不存在则返回 `-1`。

在需要从整个列表中确认某个角色是否存在时可以使用。
### GETSPCHARA `<角色编号>`

判断当前拥有的 SP 角色中是否存在该角色，存在则返回其在列表中的位置，不存在则返回 `-1`。
### ADDDEFCHARA

执行游戏开始时的系统性角色添加处理的指令。

会添加 `chara0*.csv` 中定义的角色，以及在 `gamebase.csv` 中指定的初始角色。

`ADDCHARA 0` 会查找并添加角色编号为 0 的角色，而 `ADDDEFCHARA` 则按 CSV 的编号添加角色。

如果对应的 CSV 不存在，就会与 `ADDVOIDCHARA` 一样创建空角色。

这是为了重现 Eramaker 初始化处理的指令，不能在 `@SYSTEM_TITLE` 以外使用。
### ADDVOIDCHARA

不依赖 CSV 地添加角色的指令。

用 `ADDVOIDCHARA` 添加的角色，其所有变量都被赋值为 0 或 `""`（空字符串）。
### DELALLCHARA

删除所有已登录的角色。等同于下面的脚本：

```erb
REPEAT CHARANUM
  DELCHARA 0
REND
```
### PICKUPCHARA `<目标角色>`(, `<目标角色>`, ....)

只保留参数中指定的角色，删除其他所有角色。

`MASTER:0`、`TARGET:0`、`ASSI:0` 等会自动追随，指令结束后无需手动重新设置。

目标角色指定负值时会出错，但如果把 `MASTER`、`TARGET`、`ASSI` 等设为目标、而这些变量中的内容恰好是负值，则是例外，不会出错（会被忽略）。
### EXISTCSV `<数值表达式>`, `<数值表达式>`

检查对应的角色是否已定义，并把结果赋值给 `RESULT:0`：已定义返回 `1`，未定义返回 `0`。

可以用来判断 `ADDCHARA no` 能否在不报错的情况下执行。
### FINDCHARA `<角色变量>`, `<式>`(, `<数值表达式>`, `<数值表达式>`)

指定角色变量和值，把该变量等于该值的角色的登录编号返回给 `RESULT:0`。

存在多个时，`FINDCHARA` 返回最先命中的角色，`FINDLASTCHARA` 返回最后命中的角色。未找到时返回 `-1`。

第 3 参数可指定查找的起始位置，第 4 参数可指定查找的结束位置。但查找范围超过角色数量范围时会出错。

```erb
X = -1
WHILE 1
  FINDCHARA CFLAG:10, 123, X + 1
  X = RESULT
  SIF X < 0
    BREAK
  PRINTFORML %NAME:X%
WEND
```
### FINDLASTCHARA `<角色变量>`, `<式>`(, `<数值表达式>`, `<数值表达式>`)

与 `FINDCHARA` 相同，但存在多个命中时返回最后命中的角色。
### COPYCHARA `<数值表达式>`, `<数值表达式>`

把第 1 参数指定登录编号的角色的所有数据，复制到第 2 参数指定登录编号的角色上。
### ADDCOPYCHARA `<数值表达式>`

新添加一个与参数指定登录编号的角色数据完全相同的角色。也就是说，它是 `ADDCHARA` 的变种。

## 变量操作·变量引用·CSV引用

### VARSIZE `<变量名>`

将一个[数组变量](Glossary#数组变量)的大小返回到 `RESULT` 中。

[多维数组变量](Glossary#多维数组变量)每个维的大小将会从左到右依次存入 `RESULT:0`、`RESULT:1`、`RESULT:2` 等。

CSV变量的大小通常是在VariableSize.csv中指定的。
```
 	VARSIZE FLAG
 	PRINTFORML <TEST1> = {RESULT:0}
 	VARSIZE SAVESTR
 	PRINTFORML <TEST2> = {RESULT:0}
 	VARSIZE TALENT
 	PRINTFORML <TEST3> = {RESULT:0}
 	WAIT
 	
 	;结果（未修改大小的情况下）
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

具体为将`GLOBAL`所有元素赋值为0，`GLOBALS`所有元素赋值为空字符串。

### RESET_STAIN `<数值表达式>`

将参数所指定角色的`STAIN`变量进行初始化。

初始化与 `BEGIN TRAIN` 行为类似，根据 `_replace.csv` 中 `汚れの初期値` 的设置来赋值。

### SWAP `<变量1>`, `<变量2>`

交换两个变量中的值。

两个变量的值类型必须一致。
（数值类型与数值类型，字符串类型与字符串类型）

### CSVNAME `<数值表达式>`(, `<数值表达式>`)
### CSVCALLNAME `<数值表达式>`(, `<数值表达式>`)
### CSVNICKNAME `<数值表达式>`(, `<数值表达式>`)
### CSVMASTERNAME `<数值表达式>`(, `<数值表达式>`)

从CSV中读取指定角色的`NAME`、`CALLNAME`、`NICKNAME`、`MASTERNAME`。

当需要获取未加载角色的信息或已加载角色的初始信息时可以使用这些指令。

第1参数为角色编号，第2参数指定是否为SP角色。

当第2参数为`0`（默认值）时，读取一般角色的信息；
为1时，读取SP角色的信息。

### CSVBASE `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVCSTR `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVABL `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVTALENT `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVMARK `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVEXP `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVRELATION `<数值表达式>`, `<数值表达式>`, `<数值表达式>`
### CSVJULE `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVEQUIP `<数值表达式>`, `<数值表达式>`(, `<数值表达式>`)
### CSVCFLAG `<数值表达式>`, `<数值表达式>`,(, `<数值表达式>`)

从CSV中读取指定角色的特定变量的值。

第1参数为角色编号，第2参数为变量数组的索引，第3参数指定是否为SP角色。

除了`CSVCSTR`的返回值为字符串返回到`RESULTS`中，其他指令返回值为数值返回到`RESULT`中。

### GETNUM `<变量名>`, `<字符串表达式>`

将 CSV 变量的[文本索引](General#用字符串指定数组变量的元素)转换为对应的数值索引，返回到 `RESULT:0` 中。

例如，若 `abl.csv` 中定义了 `2,技巧`，则 `GETNUM ABL, "技巧"` 的返回值为 `2`。

当文本索引没有定义时，返回`-1`。

### GETPALAMLV `<数值表达式>`, `<判断的 LV 上限>`

把给定值与 `PALAMLV` 比较，返回该值至少达到了 `PALAMLV` 的哪一级，赋值给 `RESULT:0`。

第 2 参数表示要调查的最大 LV。请先设置好 `PALAMLV` 的值再使用。
### GETEXPLV `<数值表达式>`, `<判断的 LV 上限>`

把给定值与 `EXPLV` 比较，返回该值至少达到了 `EXPLV` 的哪一级，赋值给 `RESULT:0`。

第 2 参数表示要调查的最大 LV。请先设置好 `EXPLV` 的值再使用。



### FINDELEMENT `<一元数组>`, `<检索值>`, `<初始索引>`, `<终止索引>`, `<全词匹配>`
### FINDLASTELEMENT `<一元数组>`, `<检索值>`, `<初始索引>`, `<终止索引>`, `<全词匹配>`

在数组内特定范围内检索指定的元素，返回索引到`RESULT:0`中。

指令`FINDELEMENT`为正向检索，`FINDLASTELEMENT`为反向检索。

第1参数指定了要检索的数组，检索只发生在数组的第一维上。例如`TA:2:1:0`中`0`所标识的维上。

第2参数指定了要检索的值，应当与数组元素的数据类型一致。

当检索字符串时，第2参数与`REPLACE`指令类似允许使用正则表达式。

第3、4参数指定了检索的范围，默认将检索第一维的全部元素。

第5参数指定了字符串检索时的精度。默认值为`0`，表示部分匹配。除此以外的值表示全词匹配。

当遇到第一个匹配项时检索终止。


### VARSET `<变量名>`{, `<数值表达式 or 字符串表达式>`, `<初始索引>`, `<终止索引+1>`}

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

三维数组`TA`的全部元素被赋值为`5678`。

虽然`VARSET`的操作可以使用在ERB脚本中通过`FOR~NEXT`循环实现，
但后者循环数万次乃至数百万次的系统性能消耗是不可忽略的。

相比之下`VARSET`指令更加快捷。

当使用`VARSET`指令处理角色变量时，只有指定的角色的数组会被赋值。
```
 	VARSET CFLAG:MASTER:0, 0
 	VARSET CSTR, ""
```
示例中，MASTER的所有`CFLAG`被赋值为0，`TARGET`的`CSTR`全部被赋值为空字符串。

对于非一维数组或[双重数组变量](Glossary#双重数组变量)，即[多维数组变量](Glossary#多维数组变量)，
第3、4参数将被忽略。指令将为数组的全部元素赋值。

### CVARSET `<角色变量>`{, `<数值表达式>`, `<表达式>`, `<初始角色编号>`, `<终止角色编号+1>`}

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

### ARRAYSHIFT `<目标变量>`, `<移动数量>`, `<移动产生的空白区域的初始值>`{, `<移动范围的初始值>`, `<移动的元素范围数量>`}

把数组平移指定数量。

正值向索引较大的方向移动，负值向较小的方向移动。移出数组范围的值会被舍弃，移动后产生的空白区域用第 3 参数指定的值填充。

使用可省略的第 4、第 5 参数，可以只移动一部分范围。

只支持一维数组以及数组型角色变量，不能用于 `DITEMTYPE`、`TA` 等。
### ARRAYREMOVE `<目标变量>`, `<删除范围的初始值>`, `<删除的元素数>`

部分删除数组元素。

从指定的初始值开始删除指定元素数个元素，并把后面的值向前填补。

把删除元素数设为 0 或更小时，会删除从初始值到末尾的全部元素。

只支持一维数组以及数组型角色变量，不能用于 `DITEMTYPE`、`TA` 等。
### ARRAYSORT `<目标变量>`{, `<排序方式（FORWARD 或 BACK）>`, `<起始索引>`, `<目标元素数>`}

对数组变量排序。

从起始索引开始，对目标元素数个数组数据排序。

`FORWARD` 为升序，`BACK` 为降序。
### ARRAYCOPY `<复制源变量名>`, `<复制目标变量名>`

不加判断地复制数组。

把复制源变量的值复制到复制目标变量。

两个变量的类型必须相同、维数也必须相同，且不支持角色变量。

元素数不同时，只复制能够复制的部分。

格式示例：`ARRAYCOPY "A", "B"`
### CUPCHECK `<已登录角色编号>`

对参数指定的角色执行与 `CUP`、`CDOWN` 对应的 `UPCHECK`。

当然不会受 `UP`、`DOWN` 的影响。另外，`UPCHECK` 会显示结果，而 `CUPCHECK` 不会显示结果。

## 游戏存档的操作

### SAVEDATA `<数值表达式>`, `<字符串表达式>`

把当前状态保存到第 1 参数所示编号的文件中。

`SAVEDATA` 不会调用 `@SAVEINFO`，因此不能用 `PUTFORM` 写入注释，取而代之的是用第 2 参数的字符串式指定注释（从 1.704 起不仅可以传字符串变量，也可以传字符串表达式）。

```erb
GETTIME
STR:0 = %RESULTS:0% {DAY+1}日目
SAVEDATA 14, STR:0
SAVEDATA 15, RESULTS:0 + " " + @"{DAY+1}日目"
```

它不会进行覆盖确认等处理，如有需要请在 ERB 侧自行实现。

是否已有数据可以用 `CHKDATA` 查询。

与 `SAVEGAME` 不同，`SAVEDATA` 可以在脚本的任何位置调用。
### LOADDATA `<数值表达式>`

读取第 1 参数所示编号的文件中的数据。

读取失败时会出错终止，因此请务必先用 `CHKDATA` 检查能否读取。

与 `LOADGAME` 不同，`LOADDATA` 可以在脚本的任何位置调用。
### DELDATA `<数值表达式>`

删除第 1 参数所示编号的文件中的数据。

文件不存在也不会出错。
### CHKDATA `<数值表达式>`

把第 1 参数所示编号的文件的信息赋值给 `RESULT:0` 和 `RESULTS:0`。

`RESULT:0` 的取值如下，只有为 0 时才能读取该文件：

- `0`：该文件可以读取。
- `1`：指定的文件不存在。
- `2`：游戏代码不同（`gamebase.csv` 中`代码`的值不同）。
- `3`：版本不同（`gamebase.csv` 中`版本`的值不同，且不是允许的版本）。
- `4`：存在上述以外问题的文件。

`RESULT:0` 为 0 时，`RESULTS:0` 中会存入存档数据的注释（`@SAVEINFO` 的 `PUTFORM` 输入的字符串，或 `SAVEDATA` 的第 2 参数）。

`RESULT:0` 不为 0 时，`RESULTS:0` 中会存入诸如`存档版本不同`之类的错误信息。
### SAVENOS `<数值变量>`

获取配置中`显示的存档数量`指定的数值并赋值给指定的数值变量。

默认是 20。数值变量不能省略。
### SAVEGLOBAL

保存变量 `GLOBAL` 和 `GLOBALS`。保存位置为 `global.sav`。

如果 `ERH` 文件中定义了带有 `GLOBAL` 和 `SAVEDATA` 标志的变量，也会一并保存。
### LOADGLOBAL

读取 `GLOBAL` 和 `GLOBALS`。保存位置为 `global.sav`。

读取失败也不会出错。读取成功时把 `1`、失败时把 `0` 赋值给 `RESULT`。

与普通存档一样，`gamebase.csv` 中设置的代码、版本不合适的文件无法读取。

关于变量 `GLOBAL` 的详情，请参阅变量相关章节。
### OUTPUTLOG

把当前日志输出到 `emuera.log`。

日志的文字编码为 Unicode。

过度使用会缩短磁盘寿命，请适可而止。

## 日期·时间的获取

### GETTIME

把计算机当前的日期时间信息赋值给 `RESULT:0` 和 `RESULTS:0`。

如果当前是 2009 年 3 月 28 日 13 时 5 分 23 秒 678 毫秒，则 `RESULT:0` 为 `"20090328130523678"`，`RESULTS:0` 为 `"2009年03月28日 13:05:23"`。

`RESULTS:0` 主要设想用于存档注释。如需自定义年月日的表示方式，请分解使用 `RESULT:0`。

另外，`RESULT:0` 的精度取决于运行环境，约为十几到几十毫秒（只经过数毫秒时可能返回相同的值）。以性能测量为目的时请注意。
### GETMILLISECOND

获取自公元 0001 年 1 月 1 日起经过的毫秒数，赋值给 `RESULT:0`。

由于可以直接加减，比 `GETTIME` 更适合测量经过时间等。

精度同样约为十几到几十毫秒。以性能测量为目的时请注意。
### GETSECOND

获取自公元 0001 年 1 月 1 日起经过的秒数，赋值给 `RESULT:0`。

由于可以直接加减，比 `GETTIME` 更适合测量经过时间等。

## 输入·等待

### FORCEWAIT

无法通过右键或宏跳过跳过的 `WAIT` 指令。

执行到该指令时，这些跳过状态会被解除。
### INPUT {`<数值>`}

等待用户输入数值。

与 Eramaker 基本相同的指令，但可以通过参数设置输入空字符串时的默认输入值。

省略参数并输入空字符串时，与以往一样会重新输入。
### INPUTS {`<字符串>`}

等待用户输入字符串。

与 Eramaker 基本相同的指令，但可以通过参数设置输入空字符串时的默认输入值。

省略参数并输入空字符串时，与以往一样会把空字符串赋值给 `RESULTS` 并继续处理。
### TINPUT `<数值>`, `<数值>`{, `<数值>`, `<字符串>`}

带时间限制的数值输入指令。

- 第 1 参数：限制时间（毫秒）。设置得比 100 毫秒更细也无法准确动作。
- 第 2 参数：超时时的默认返回值。
- 第 3 参数：是否显示剩余时间。0 为不显示，其他为显示，省略时为 1（显示）。
- 第 4 参数：超时时显示的字符串。为空字符串时会清除计时器显示并进入下一步处理。

另外，设置了第 4 参数时，第 3 参数不能省略。
### TINPUTS `<数值>`, `<字符串表达式>`{, `<数值>`, `<字符串>`}

带时间限制的字符串输入指令，参数与 `TINPUT` 相同。

与 `INPUTS` 一样可以使用宏表达式。要把 `(` `)` 作为字符串使用，请用 `\` 转义。
### TWAIT `<数值>`, `<数值>`

第 1 参数是限制时间，第 2 参数是输入接收标志。

在限制时间经过之前停止运行，实际行为随输入接收标志而变化：

- 输入接收标志 = 0：接收输入，一旦有输入，即使未到限制时间也会继续下一步。
- 输入接收标志 ≠ 0：不接收输入（可以强制等待到限制时间）。
### ONEINPUT {`<数值>`}

仅接受一个字符的自动输入指令，输入后自动进入下一步处理。

用粘贴等方式一次贴入多位数字（多个字符）时，只会把第一位（字符）视为输入。

与 `INPUT`、`INPUTS` 一样，可以通过参数设置输入空字符串时的默认输入值。

不过，`ONEINPUT` 指定负值、`ONEINPUTS` 指定空字符串时，参数无效，行为与无参数相同。另外，以多位数字（多个字符）为参数时，只有第一位（字符）会成为默认输入值。

省略参数并输入空字符串时，与通常一样：`ONEINPUT` 会重新输入，`ONEINPUTS` 会把空字符串赋值给 `RESULTS` 并继续处理。

`ONEINPUTS` 的情况下，即使保持空字符串按回车，也会被视为输入了空字符串。

另外，使用这些指令时，即使 Emuera 的 CONFIG 设置为使用键盘宏，也可能无法正常工作，这是规格。

`ONEINPUTS` 与 `INPUTS` 一样可以使用宏表达式。要把 `(` `)` 作为字符串使用，请用 `\` 转义。
### ONEINPUTS {`<字符串>`}

仅接受一个字符的自动字符串输入指令，输入后自动进入下一步处理。

其余规格与 `ONEINPUT` 相同。
### TONEINPUT `<数值>`, `<数值>`{, `<数值>`, `<字符串>`}

同时具备 `ONEINPUT` 与 `TINPUT` 性质、带时间限制的单字符输入指令。

参数分别与 `TINPUT` 相同。

使用这些指令时，即使 Emuera 的 CONFIG 设置为使用键盘宏，也可能无法正常工作，这是规格。
### TONEINPUTS `<数值>`, `<字符串表达式>`{, `<数值>`, `<字符串>`}

同时具备 `ONEINPUTS` 与 `TINPUTS` 性质、带时间限制的单字符字符串输入指令。

参数分别与 `TINPUTS` 相同。

使用这些指令时，即使 Emuera 的 CONFIG 设置为使用键盘宏，也可能无法正常工作，这是规格。

与 `INPUTS` 一样可以使用宏表达式。要把 `(` `)` 作为字符串使用，请用 `\` 转义。
### WAITANYKEY

等待任意按键输入或鼠标点击的 `WAIT` 指令。

也可以说是 `WAIT` 的 `ONEINPUT` 版。

## 循环·分支语法

### FOR `<数值型变量>`, `<数值表达式>`, `<数值表达式>`{, `<数值表达式>`}

`FOR`～`NEXT` 是 `REPEAT`～`REND` 的增强版。

1. 用于计数的变量名（`REPEAT` 固定为 `COUNT:0`）。
2. 循环开始计数的初始值（`REPEAT` 固定为 0）。
3. 终止循环的值。
4. 每次循环增加的值（`REPEAT` 固定为 1）。

```erb
FOR COUNT, 0, X
  ～～
NEXT
REPEAT X
  ～～
REND
```

上面两个循环几乎相同：都把内部内容重复 X 次，也都可以用 `CONTINUE`、`BREAK` 中断。

区别在于可以改变初始值和步长的变量。另外 `FOR`～`NEXT` 可以嵌套：

```erb
FOR Y, 0, 100
  FOR X, 0, 100
    ～～
  NEXT
NEXT
```

`<变量名>` 必须与当前循环内层使用的其他循环变量名不同。

第 4 参数`<步长>`不指定时默认为 1。

- `<步长>`为正：每次把 `<步长>` 加到 `<变量名>` 上，直到超过第 3 参数`<终止值>`。
- `<步长>`为负：每次从 `<变量名>` 减去 `<步长>`，直到小于等于 `<终止值>`。
- `<步长>`为 0：无限循环。在循环内使用 `BREAK` 可以退出。

除步长外，各值在循环内固定，不能更改。

用 `GOTO` 等指令直接跳入 `FOR`～`NEXT` 内部时，与 `REPEAT`～`REND` 一样，会执行到 `NEXT` 之前，然后忽略 `NEXT` 并从下一行继续处理。
### NEXT

结束由 `FOR` 开始的循环。
### WHILE `<数值表达式>`

`WHILE`～`WEND` 是循环语法：只要 `<数值表达式>` 不为 0 就重复循环。

条件始终满足时会成为无限循环，直到能用 `BREAK` 退出为止。循环过长时 Emuera 会发出警告。

用 `GOTO` 等指令直接跳入 `WHILE`～`WEND` 内部时，读到 `WEND` 后会像通常一样回到 `WHILE`。
### WEND

结束由 `WHILE` 开始的循环。
### DO

`DO`～`LOOP` 是类似于 do～while 的循环语法。

只要 `<数值表达式>` 不为 0 就重复循环。与 `WHILE`～`WEND` 不同，其特点是至少会执行一次。

另外，执行 `CONTINUE` 时如果 `LOOP` 的条件不满足，会直接退出 `LOOP`。

用 `GOTO` 等指令直接跳入 `DO`～`LOOP` 内部时，到达 `LOOP` 后会像通常一样回到 `DO`。
### LOOP `<数值表达式>`

结束由 `DO` 开始的循环，并在 `<数值表达式>` 不为 0 时继续循环。
### SELECTCASE `<式>`

`SELECTCASE`～`CASE`～`CASEELSE`～`ENDSELECT` 是与 Visual Basic 同名同语法的分支语法。

与 `IF` 类似，`SELECTCASE` 根据一个值分支到多行。分支取决于参数的单一取值。

最简单的用法如下：

```erb
SELECTCASE X
  CASE 1
    PRINTL X is 1.
  CASE 3
    PRINTL X is 3.
  CASEELSE
    PRINTL X is not 1 or 3.
ENDSELECT
```

根据 X 的值进行分支。执行 `SELECTCASE` 后，如果 X 为 1，则执行 `CASE 1` 之下、下一个 `CASE` 或 `CASEELSE` 之上的行。`CASE 3` 同理。

如果 X 不对应任何 `CASE`，则执行 `CASEELSE` 之下、`ENDSELECT` 之上的行。

与 `switch` 不同，不会从 `CASE` 顺序落到下一个 `CASE`，也不能用 `BREAK` 跳入 `ENDSELECT`。

用 `GOTO` 直接跳入 `SELECTCASE`～`CASE`～`CASEELSE`～`ENDSELECT` 分支内部时，会像 `IF`～`ELSEIF`～`ELSE`～`ENDIF` 一样，执行到下一个 `CASE`、`CASEELSE` 或 `ENDSELECT` 为止，然后从 `ENDSELECT` 之后继续。

`CASE` 有三种格式：

1. 像上面那样使用单个值。
2. `<起始值> TO <结束值>` 的范围。
3. 用逗号分隔的值列表。

- `IS <运算符> <数值表达式>`：例如 `IS <= 30`，则 X 为 30 以下时执行该 `CASE` 以下。
- `<数值表达式> TO <数值表达式>`：例如 `10 TO 20`，则 X 为 10 以上 20 以下时执行该 `CASE` 以下。

`CASE` 还可以用逗号指定多个条件式。

```erb
SELECTCASE X
  CASE 1
    PRINTL X is 1.
  CASE 2,3
    PRINTL X is not 1.
    PRINTL X is 2 or 3.
  CASE 10 TO 20
    PRINTL X 不是 1、2、3 中的任何一个。
    PRINTL X 在 10 以上 20 以下。
  CASE IS <= 30
    PRINTL X 不是 1、2、3，也不在 10 以上 20 以下。
    PRINTL X 在 30 以下。
  CASE 40, 5 * 10 TO 6 * 10, IS >= 10 * 10
    PRINTL X 不在 30 以下。
    PRINTL X 是 40、50 以上 60 以下、100 以上中的某一个。
  CASEELSE
    PRINTL X 不符合以上任何条件。
ENDSELECT
```

注意 `IS` 和 `TO` 必须写成 `IS <运算符> <数值表达式>`、`<数值表达式> TO <数值表达式>` 的形式。不能写成 `30 < IS` 或 `(10 TO 20) || (30 TO 40)` 这样。

另外，`<数值表达式> TO <数值表达式>` 仅在左边以上、右边以下时为真。右边小于左边时，该 `CASE` 永远不会被执行。

一个 `CASE` 有多个条件式时会发生短路求值：条件从左到右依次检查，一旦找到满足的条件，剩余条件就不再求值。

`SELECTCASE` 也可以使用字符串表达式。对 `SELECTCASE` 指定字符串时，`CASE` 的条件式也必须是字符串表达式。
### CASE `<CASE条件式>`(, `<CASE条件式>`, `<CASE条件式>` ……)

`SELECTCASE` 的分支条件。可用 `<值>`、`<起始值> TO <结束值>`、`IS <运算符> <数值表达式>` 以及用逗号分隔的多个条件。
### CASEELSE

当 `SELECTCASE` 的值不符合任何 `CASE` 时执行的分支。
### ENDSELECT

结束由 `SELECTCASE` 开始的分支。

## 随机数的控制

### RANDOMIZE `<数值表达式>`

用指定值初始化随机数。

用相同的值初始化时，`RAND` 必定返回相同的结果。
### DUMPRAND

把当前的随机数状态保存到 `RANDDATA` 变量。
### INITRAND

读取保存到 `RANDDATA` 变量中的随机数状态。

注意不要在 `DUMPRAND` 之前执行 `INITRAND`。`RANDDATA` 变量的内容不合适时，`RAND` 会无法正常工作。

`RANDDATA` 是会保存的变量，因此在保存前执行 `DUMPRAND`、读取存档后立即执行 `INITRAND`，就可以延续使用相同的随机数状态。

## 调试辅助·系统流的控制

### BEGIN `<关键字>`

`BEGIN` 是 Eramaker 就有的指令，但新增了 `FIRST` 和 `TITLE` 两个关键字。

`BEGIN FIRST` 与在标题画面选择`[0]从头开始`具有相同的效果，会执行事件函数 `@EVENTFIRST`。

`BEGIN TITLE` 会返回标题画面。

两者都不会进行变量初始化等处理，请按需执行 `RESETDATA` 指令。
### CALLTRAIN `<命令数>`

连续执行命令的指令。

事先把命令编号赋值给 `SELECTCOM:(1～)`，并以要执行的命令数量作为参数执行。

```erb
SELECTCOM:1 = XXX
SELECTCOM:2 = YYY
　　・
　　・
SELECTCOM:N = ZZZ

CALLTRAIN (设置好的命令数量)
```

与普通的命令执行一样，也会调用 `SHOW_STATUS` 和 `SHOW_USERCOM`，但不会显示 TRAIN 命令和 USERCOM。如果无论如何都想显示 USERCOM，可以使用 `NOSKIP`～`ENDNOSKIP`。

`CALLTRAIN` 的自动执行结束后，会调用系统函数 `@CALLTRAINEND`。不过 `@CALLTRAINEND` 不是事件函数，不能多重定义，请注意。

另外，用于指定命令的命令编号不是游戏中的值，而是 `TRAIN.CSV` 中指定的值。
### DOTRAIN `<数值表达式>`

强制进行 `TRAIN` 的指令。

只能在 `@EVENTTRAIN`、`@SHOW_STATUS`、`@SHOW_USERCOM`、`@USERCOM`、`@EVENTCOMEND` 及从这些函数中调用的函数内使用。

参数指定的编号对应 `train.csv` 中定义的编号。动作与命令被选中时相同：初始化 `UP`、`DOWN` 等变量，把参数赋值给 `SELECTCOM`，调用 `@EVENTCOM`，调用 `@COM{SELECTCOM}`……

参数小于 0 或大于等于 `TRAINNAME` 的元素数时会出错，但除此之外不做检查。即使参数是 `train.csv` 中未定义的编号，也会强制尝试执行。另外不会调用 `@COM_ABLE`，而是强制执行。

必要时请像下面这样在 `DOTRAIN` 之前进行检查：

```erb
SIF ( X < 0 || X >= VARSIZE("TRAINNAME") || TRAINNAME:X == "" )
  RETURN
RESULT = 1
TRYCALLFORM COM_ABLE{X}
SIF RESULT == 0
  RETURN
DOTRAIN X
```

反过来，也可以利用 `DOTRAIN` 自行实现 TRAIN 命令。例如把 `train.csv` 留空，在 `@SHOW_USERCOM` 中自行显示，在 `@USERCOM` 中执行 `DOTRAIN`。

另外，在 `CALLTRAIN` 的处理途中执行 `DOTRAIN` 时，`CALLTRAIN` 的剩余部分会失效。
### THROW `<FORM 格式文本>`

强制出错，并以参数给出的字符串显示错误。

## CALL·JUMP·GOTO系

### TRYJUMP `<字符串>` (, 参数1, 参数2……)

与 `JUMP` 相同，但指定的函数不存在时也不会出错，而是什么都不做。

`TRYJUMP` 与 `TRYCALL` 可以指定参数。详情请参阅[函数与预处理指令](Function_and_Preprocessor#自制函数中的参数指定)中的「自制函数中的参数指定」。
### TRYCALL `<字符串>` (, 参数1, 参数2……)

与 `CALL` 相同，但指定的函数不存在时也不会出错，而是什么都不做。

`TRYJUMP` 与 `TRYCALL` 可以指定参数。详情请参阅[函数与预处理指令](Function_and_Preprocessor#自制函数中的参数指定)中的「自制函数中的参数指定」。
### TRYGOTO `<字符串>`

与 `GOTO` 相同，但指定的标签不存在时也不会出错，而是什么都不做。

用 `TRYGOTO` 直接跳入 `IF`～`ELSEIF`～`ELSE`～`ENDIF` 内时，会像通常一样执行到 `ELSEIF`、`ELSE`、`ENDIF` 之前，然后跳到 `ENDIF` 的下一行继续处理。

直接跳入 `REPEAT`～`REND` 内时，会像通常一样执行到 `REND` 之前，然后忽略 `REND` 并从下一行继续处理。

这些处理与 `GOTO` 及其他 `GOTO` 系指令相同。
### JUMPFORM `<FORM格式文本>` (, 参数1, 参数2……)

与 `JUMP` 相同，但可以像 `PRINTFORM` 等一样用带格式的字符串指定函数名。

```erb
CALLFORM KOJO_{NO:TARGET}_{SELECTCOM}
```

`JUMPFORM` 与 `CALLFORM` 可以指定参数。详情请参阅[函数与预处理指令](Function_and_Preprocessor#自制函数中的参数指定)中的「自制函数中的参数指定」。
### CALLFORM `<FORM格式文本>` (, 参数1, 参数2……)

与 `CALL` 相同，但可以像 `PRINTFORM` 等一样用带格式的字符串指定函数名。用法示例见 `JUMPFORM`。
### GOTOFORM `<FORM格式文本>`

与 `GOTO` 相同，但可以像 `PRINTFORM` 等一样用带格式的字符串指定标签名。

用 `GOTOFORM` 直接跳入循环、分支语法内时的行为，请参阅 `TRYGOTO` 及「循环·分支语法」相关章节。
### TRYJUMPFORM `<FORM格式文本>` (, 参数1, 参数2……)

与 `JUMP` 相同，但可以用带格式的字符串指定函数名，且函数不存在时也不会出错。
### TRYCALLFORM `<FORM格式文本>` (, 参数1, 参数2……)

与 `CALL` 相同，但可以用带格式的字符串指定函数名，且函数不存在时也不会出错。
### TRYGOTOFORM `<FORM格式文本>`

与 `GOTO` 相同，但可以用带格式的字符串指定标签名，且标签不存在时也不会出错。

用 `TRYGOTOFORM` 直接跳入循环、分支语法内时的行为，请参阅 `TRYGOTO` 及「循环·分支语法」相关章节。
### CALLF `<字符串>` (, 参数1, 参数2……)

以忽略返回值的方式调用表达式内函数的指令。

```erb
CALLF 函数名, 参数1, ....
```

虽然目标是表达式内函数，但请用普通函数的参数格式调用。返回值会被丢弃。

当然，除非被调用的表达式内函数内部修改了 `RESULT` 或 `RESULTS`，否则它们不会变化。
### CALLFORMF `<FORM格式文本>` (, 参数1, 参数2……)

`CALLF` 的带格式字符串版，可以用带格式的字符串指定表达式内函数名。
### CALL·JUMP·GOTO系2 (TRYC-CATCH-ENDCATCH)

用于控制 `TRYC` 系函数调用在找不到函数时行为的扩展语法。

语法上与 `IF`～`ELSE`～`ENDIF` 类似（区别在于没有函数存在时的处理也可以）。

```erb
TRYCCALL UNKNOWN_FUNC ;不存在的函数
  函数存在时、函数处理之后执行的处理（有则写，没有可省略直接到 CATCH）
CATCH
  函数不存在时执行的处理
ENDCATCH
```

可以嵌套使用。

用 `GOTO` 等指令直接跳入 `TRYC` 系～`CATCH`～`ENDCATCH` 内时，会与 `IF`～`ELSEIF`～`ELSE`～`ENDIF` 一样，执行到 `CATCH`、`ENDCATCH` 之前，然后跳到 `ENDCATCH` 的下一行继续。
### TRYCJUMP `<字符串>` (, 参数1, 参数2……)

与 `TRYJUMP` 对应的 `TRYC` 系版本，函数不存在时可以由 `CATCH` ～ `ENDCATCH` 捕获。
### TRYCCALL `<字符串>` (, 参数1, 参数2……)

与 `TRYCALL` 对应的 `TRYC` 系版本，函数不存在时可以由 `CATCH` ～ `ENDCATCH` 捕获。
### TRYCGOTO `<字符串>`

与 `TRYGOTO` 对应的 `TRYC` 系版本，标签不存在时可以由 `CATCH` ～ `ENDCATCH` 捕获。
### TRYCJUMPFORM `<FORM格式文本>` (, 参数1, 参数2……)

与 `TRYJUMPFORM` 对应的 `TRYC` 系版本。
### TRYCCALLFORM `<FORM格式文本>` (, 参数1, 参数2……)

与 `TRYCALLFORM` 对应的 `TRYC` 系版本。
### TRYCGOTOFORM `<FORM格式文本>`

与 `TRYGOTOFORM` 对应的 `TRYC` 系版本。
### CATCH

`TRYC` 系函数调用失败（函数或标签不存在）时转入的分支。
### ENDCATCH

结束由 `CATCH` 开始的分支。
### TRYCALLLIST

与 `FUNC`～`ENDFUNC` 配合，按顺序尝试调用多个函数中的第一个存在的函数。
### TRYJUMPLIST

与 `FUNC`～`ENDFUNC` 配合，按顺序尝试跳转到多个标签中的第一个存在的标签。
### TRYGOTOLIST

与 `FUNC`～`ENDFUNC` 配合，按顺序尝试跳转到多个标签中的第一个存在的标签。
### FUNC `<字符串>` (, 参数1, 参数2……)

指定多个函数（标签），只调用其中最先找到的那一个的语法。

`TRYLIST` 系～`ENDFUNC` 内不能书写上述语法以外的内容。

```erb
TRYCALLLIST
  FUNC 函数1
  FUNC 函数2
ENDFUNC
```

它会依次尝试调用 `FUNC` 指定的函数，成功则调用后转到 `ENDFUNC`，失败则移到下一行的 `FUNC`（或 `ENDFUNC`）。

这与下面的脚本等价：

```erb
TRYCCALL 函数1
CATCH
  TRYCCALL 函数2
  CATCH
  ENDCATCH
ENDCATCH
```
### ENDFUNC

结束由 `TRYCALLLIST`、`TRYJUMPLIST`、`TRYGOTOLIST` 开始的列表调用。

## RETURN系

### RETURN `<数值表达式>`(, `<数值表达式>`, `<数值表达式>`, ...)

从函数返回。

虽然这是 Eramaker 就有的指令，但返回值现在可以指定非常量的变量或表达式，并且支持多个返回值。

指定多个返回值时，会从前往后依次赋值给 `RESULT:0`、`RESULT:1`……
### RETURNFORM `<FORM格式文本>`(, `<FORM格式文本>`, `<FORM格式文本>`, ...)

`RETURN` 的变种。

把参数指定的带格式字符串作为数值表达式解析，然后执行 `RETURN`。

例如可以这样使用：

```erb
A = 100
CALL TEST
PRINTFORMW RESULT == {RESULT}

@TEST
  STR = A * 10
  RETURNFORM %STR%
```

与 `RETURN` 不同，`%` 不会被当作取余运算符，而是被视为字符串表达式的开始，请注意。

```erb
;OK。返回 A 的后两位。
RETURN A % 100

;出错。会把 % 之后当作字符串表达式来读。
RETURNFORM A % 100
```

它也支持多个返回值，会从前往后依次赋值给 `RESULT:0`、`RESULT:1`……
### RETURNF `<式>`

带有 `#FUNCTION` 或 `#FUNCTIONS` 属性的函数专用的指令。

详情请参阅[用户自定义表达式内函数](Custom_Expression)。

不支持多个返回值。

## DEBUG系

### DEBUGPRINT `<字符串>`

只在以调试模式启动时动作，输出到调试控制台。

非调试模式下什么都不做，也不会解析参数，因此即使带格式字符串有问题也不会出错。

与 `PRINT` 基本相同，区别在于输出目标是调试控制台而非主控制台，且不受 `SKIPDISP` 指令影响，也不能使用 `n`。
### DEBUGPRINTL `<字符串>`

`DEBUGPRINT` 的换行版，输出后换行。
### DEBUGPRINTFORM `<FORM格式文本>`

`DEBUGPRINT` 的 FORM 格式版，先展开 FORM 语法再输出。
### DEBUGPRINTFORML `<FORM格式文本>`

`DEBUGPRINTFORM` 的换行版，输出后换行。
### ASSERT `<数值表达式>`

参数为真（非 0）时什么都不做。

参数为假（0）时输出错误并停止脚本执行。

`DEBUG` 系指令只在调试模式下动作，非调试模式下什么都不做。

## HTML系

### HTML_PRINT `<字符串表达式>`

利用类似 HTML 的标签进行 `PRINT` 的指令。

详情请参阅 [HTML_PRINT 相关](HTML_PRINT)。

参数不是 `PRINT` 那样的字符串，而是与 `PRINTS` 相同的字符串表达式，并且会自动换行，因此实际上更接近 `PRINTSL` 的动作。

`HTML_PRINT` 的绘制不受 `ALIGNMENT`、`SETFONT`、`COLOR`、`FONTSTYLE` 及类似指令影响，要获得这些效果必须全部用标签指定。
### HTML_TAGSPLIT `<字符串表达式>`

把目标字符串按 HTML 字符串解释，分割为标签和平文，并把分割数赋值给 `RESULT`、分割后的字符串赋值给 `RESULTS`。

指定了第 2、第 3 参数时，会赋值给指定的变量而不是 `RESULT`、`RESULTS`。

分割处理中发生错误时，`RESULT` 会被赋值为 `-1`。

`HTML_TAGSPLIT` 不会验证标签内容或对应关系是否合适。

分割数超过 `RESULTS` 的数组大小时，超出部分不会赋值给 `RESULTS`。

## 工具提示系

这些是用于控制把鼠标光标放在按钮上时显示的工具提示的指令。

工具提示的设置方法请参阅 [HTML_PRINT 相关](HTML_PRINT)。

### TOOLTIP_SETCOLOR `<数值表达式>`, `<数值表达式>`

以 `0xRRGGBB` 形式的数值设置工具提示的前景色和背景色。

如果想用 R、G、B 值或字符串来指定，请使用 `COLOR_FROMRGB`、`COLOR_FROMNAME` 函数。

### TOOLTIP_SETDELAY `<数值表达式>`

以毫秒为单位设置工具提示显示之前的等待时间。

默认是 500（毫秒），最大值为 32767。

### TOOLTIP_SETDURATION `<数值表达式>`

设置工具提示的最大显示时间。

参数为 0 以上的整数，为 0 时使用默认行为。受计时器特性的影响，极短的时间可能无法按预期工作。

## AWAIT 相关

这些是用于不经由文本框进行输入等的指令、函数群。

### AWAIT {`<时间>`}

暂停 ERB 的执行，并进行 Windows 的处理。

指定参数时，会等待指定的毫秒数后再继续执行。

`AWAIT` 指令会中断 Emuera 的无限循环警告，防止 Emuera 进程变为「无响应」。在进行耗时处理时请使用它。

不过 `AWAIT` 指令本身也需要相当的执行时间，过于频繁反而会变慢。

另外，为了不让用户感到不安，建议如下面这样逐次显示处理进度：

```erb
REDRAW 0
FOR LCNT, 0, 100
  PRINTSL "处理中…… " + TOSTR(LCNT) + "％ 完成"
  AWAIT
  CLEARLINE 1
  ;耗时处理
NEXT
```

### GETKEY `<键码>`

返回键盘及鼠标按键的状态。参数指定的键被按下时返回 `1`，否则返回 `0`。

该函数只在 Emuera 窗口处于活动状态时返回 `1`；非活动状态时无论按键状态如何都返回 `0`。

键码数值与实际按键的对应关系请参考微软提供的 MSDN 中 `GetKeyState()` 一节。

### GETKEYTRIGGERED `<键码>`

与 `GETKEY` 一样返回键盘及鼠标按键的状态。

`GETKEY` 获取的是当前是否按下，而 `GETKEYTRIGGERED` 只在刚按下的瞬间返回 `1`。也就是说，持续按住时 `GETKEY` 返回 `1`，而 `GETKEYTRIGGERED` 只在最初返回 `1`，之后返回 `0`。

该函数只在 Emuera 窗口处于活动状态时返回 `1`；非活动状态时无论按键状态如何都返回 `0`。

### MOUSEX

获取鼠标光标当前的 X 坐标。

坐标以客户端区域左下角为 `(0,0)` 的相对位置，右方向为 x 轴正方向。鼠标在客户端区域外时也正常动作。

### MOUSEY

获取鼠标光标当前的 Y 坐标。

坐标以客户端区域左下角为 `(0,0)` 的相对位置，下方向为 y 轴正方向。因此光标在客户端区域内时 `MOUSEY` 返回负值，请注意。

客户端区域的大小可以用 `CLIENTWIDTH`、`CLIENTHEIGHT` 函数获取。如果需要以客户端区域左上角为基准的 Y 坐标，可以用 `MOUSEY() + CLIENTHEIGHT()` 获取。

### ISACTIVE

返回 Emuera 窗口的状态：活动时返回 `1`，非活动时返回 `0`。

## 图像处理相关

图像处理相关的指令。

以 `G` 开头的 Graphics 系指令用于操作可修改的绘制区域。使用 G 系指令需要把绘制方式指定为 `GRAPHICS` 或 `TEXTRENDERER`。绘制方式为 `WINAPI` 时不能使用 G 系指令，会出错。

以 `SPRITE` 开头的 Sprite 系指令与精灵（sprite）相关。精灵与在 `resources` 文件夹中声明的资源一样，可以用 `PRINT_IMG` 指令等在行中显示。

以 `CBG` 开头的 ClientBackground 系指令与客户端区域的背景图像相关。

注意，图像处理系指令的颜色指定不是 RGB，而是包含透明度（alpha 值）的 ARGB 形式。ARGB 型用十六进制表示为 `0xAARRGGBB`。

图像处理系指令的大部分也可以在表达式中作为函数调用。作为函数调用时，结果不会赋值给 `RESULT`，而是作为返回值。

### GCREATE `<ID>`, `<宽度>`, `<高度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

以指定的尺寸创建指定 ID 的 Graphics。

Graphics 的 ID 必须是 0 以上的整数，width、height 必须是 1 以上 8192 以下的整数。参数超出这些范围会出错。

创建成功时返回非 0。指定 ID 的 Graphics 已创建时返回 0。

要重建 Graphics，请先用 `GDISPOSE` 指令废弃已有的 Graphics。

### GCREATEFROMFILE `<ID>`, `<文件路径>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

以相对路径指定 `resources` 文件夹内的图像文件，打开该图像并创建 Graphics。

与在 `resources` 文件夹内的 CSV 中声明资源不同，图像文件不会被锁定。

创建成功时返回非 0。指定 ID 的 Graphics 已创建时会创建失败，该指令什么都不做并返回 0。

文件不存在、无法识别为图像、文件过大等导致失败时也返回 0。

### GDISPOSE `<ID>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

废弃指定 ID 的 Graphics。

废弃成功时返回非 0。指定 ID 的 Graphics 未创建（包括已废弃）时返回 0。

### GCLEAR `<ID>`, `<颜色>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

用指定颜色替换指定 ID 的 Graphics 的全部区域。

处理成功时返回非 0。ID 或颜色指定不合适时会出错。

### GFILLRECTANGLE `<ID>`, `<x>`, `<y>`, `<宽度>`, `<高度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

在指定 ID 的 Graphics 上绘制由 `(x, y, width, height)` 指定的矩形。

处理成功时返回非 0。

绘制颜色需要事先用 `GSETBRUSH` 指令指定，否则使用 Emuera 配置中的字体颜色绘制。

### GDRAWG `<目标ID>`, `<源ID>`, `<目标X>`, `<目标Y>`, `<目标宽度>`, `<目标高度>`, `<源X>`, `<源Y>`, `<源宽度>`, `<源高度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

把指定 `srcID` 的 Graphics 绘制到指定 `destID` 的 Graphics 上。

用 4 个整数指定绘制目标 dest 的 Graphics 的位置及尺寸，用 4 个整数指定绘制源 src 的 Graphics 的位置及尺寸。

处理成功时返回非 0。绘制目标或绘制源的 Graphics 未创建等情况下返回 0。

绘制目标与绘制源的 Graphics 即使相同也可以执行。

### GDRAWG `<目标ID>`, `<源ID>`, `<目标X>`, `<目标Y>`, `<目标宽度>`, `<目标高度>`, `<源X>`, `<源Y>`, `<源宽度>`, `<源高度>`, `<颜色矩阵>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

在 `GDRAWG` 的基础上，作为可选项指定 5x5 以上的二维数值数组作为 `cm`，即可应用颜色矩阵进行绘制。

colorMatrix 会先把所有元素除以 256，再传给 .Net Framework 的 `ColorMatrix` 类。也就是说，对角线全为 256 的 5x5 矩阵就是单位矩阵。

### GDRAWGWITHMASK `<目标ID>`, `<源ID>`, `<掩码ID>`, `<目标X>`, `<目标Y>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

把 `srcID` 的 Graphics 以 `maskID` 的 Graphics 为掩码绘制到指定 `destID` 的 Graphics 上。绘制位置由 destID 的 Graphics 内的 `destX`、`destY` 指定。

处理成功时返回非 0。成功的条件是 srcID 与 maskID 的宽高完全一致、且绘制区域不超出 destID。

以掩码方式绘制，具体来说就是把掩码图像的蓝色值作为不透明度应用到源图像上绘制。例如掩码图像为纯白（即所有位置蓝色均为最大）时，源图像与无掩码时一样原样绘制；掩码图像为纯黑（即所有位置蓝色均为 0）时，源图像被视为完全透明，什么都不发生。

该指令的处理不在 GPU 上进行，而是由 CPU 单线程完成，请不要对速度抱有期待。

### GDRAWSPRITE `<ID>`, `<精灵名>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

把指定 `sprName` 的精灵绘制到指定 ID 的 Graphics 上。

作为可选项，可以用 `destX`、`destY` 指定 Graphics 内部的位置，从而把精灵绘制到该位置。

此外，用 `destWidth`、`destHeight` 指定绘制宽高，即可把精灵放大或缩小到该尺寸后绘制。

还可以通过给 `cm` 指定 5x5 矩阵来应用颜色矩阵绘制。

精灵的尺寸可以用 `SPRITEWIDTH(str imgName)`、`SPRITEHEIGHT(str imgName)` 函数获取。

处理成功时返回非 0。

指定动画精灵时，会绘制运行时的其中一帧。

### GDRAWSPRITE `<ID>`, `<精灵名>`, `<目标X>`, `<目标Y>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

指定绘制位置的 `GDRAWSPRITE`。

### GDRAWSPRITE `<ID>`, `<精灵名>`, `<目标X>`, `<目标Y>`, `<目标宽度>`, `<目标高度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

可放大、缩小绘制的 `GDRAWSPRITE`。

### GDRAWSPRITE `<ID>`, `<精灵名>`, `<目标X>`, `<目标Y>`, `<目标宽度>`, `<目标高度>`, `<颜色矩阵>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

可应用颜色矩阵的 `GDRAWSPRITE`。

### GSETCOLOR `<ID>`, `<颜色>`, `<x>`, `<y>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

把指定 ID 的 Graphics 中指定位置的像素替换为指定颜色。

处理成功时返回非 0。

该指令并不很快。与 `GGETCOLOR` 指令配合尝试改写整张大图，无法在实用时间内完成。

### GSETBRUSH `<ID>`, `<颜色>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

为指定 ID 的 Graphics 设置指定颜色的画刷。

设置的画刷会被记忆，直到用 `GDISPOSE` 指令废弃该 Graphics。

处理成功时返回非 0。

这里设置的颜色的画刷会被 `GFILLRECTANGLE` 指令使用。

### GSETFONT `<ID>`, `<字体名>`, `<字号>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

为指定 ID 的 Graphics 设置指定名称和字号的字体。

设置的字体会被记忆，直到用 `GDISPOSE` 指令废弃该 Graphics。

处理成功时返回非 0。

截至 1.824 版，尚不存在使用所设置字体的指令或函数。

### GSETPEN `<ID>`, `<颜色>`, `<笔宽>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

为指定 ID 的 Graphics 设置指定颜色和宽度的画笔。

设置的画笔会被记忆，直到用 `GDISPOSE` 指令废弃该 Graphics。

处理成功时返回非 0。

截至 1.824 版，尚不存在使用所设置画笔的指令或函数。

### GCREATED `<ID>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

指定 ID 的 Graphics 已创建时获取 `1`，未创建（包括已废弃）时获取 `0`。

### GWIDTH `<ID>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

获取指定 ID 的 Graphics 的宽度。未创建（包括已废弃）时返回 0。

### GHEIGHT `<ID>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

获取指定 ID 的 Graphics 的高度。未创建（包括已废弃）时返回 0。

### GGETCOLOR `<ID>`, `<x>`, `<y>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

以 `0xAARRGGBB` 形式的整数值获取指定 ID 的 Graphics 中指定位置的颜色。

Graphics 未创建或已废弃，或者 x、y 在图像之外时返回 `-1`。

请注意，只有该指令在失败时返回 `-1` 而不是 0。当获取黑色且完全透明位置的颜色时，该指令返回 0。

### GSAVE `<ID>`, `<文件编号>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

把指定 ID 的 Graphics 的图像以附加 `fileNo` 编号的文件名、按 png 格式输出保存。

处理成功时返回非 0。

### GLOAD `<ID>`, `<文件编号>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

打开附加 `fileNo` 编号的文件名的图像，创建 Graphics。

动作与 `GCREATEFROMFILE` 指令基本相同，区别在于不是从 `resources` 文件夹中的图像创建，而是从 `GSAVE` 指令保存的图像创建。

处理成功时返回非 0。指定 ID 的 Graphics 已创建时会创建失败，该指令什么都不做并返回 0。

### SPRITECREATE `<精灵名>`, `<Graphics ID>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

以 `gID` 的 Graphics 的一部分或全部为基础，创建具有 `spriteName` 指定资源名的精灵。

指定 `(x, y, width, height)` 即可把 Graphics 的该部分切出来作为精灵。

创建成功时返回非 0。因同名资源已存在等失败时返回 0。

精灵只记忆父 Graphics 的 ID 和切取位置，因此父 Graphics 变化时精灵也会变化。父 Graphics 被废弃时，精灵也会被视为已废弃。

创建的精灵可以与 `resources` 文件夹内 CSV 中声明的资源几乎同样地使用。例如可以用 `PRINT_IMG` 指令或 `HTML_PRINT` 的 img 标签等。

### SPRITECREATE `<精灵名>`, `<Graphics ID>`, `<x>`, `<y>`, `<宽度>`, `<高度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

指定切取范围的 `SPRITECREATE`。

### SPRITEANIMECREATE `<精灵名>`, `<宽度>`, `<高度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

创建具有 `spriteName` 指定资源名、尺寸由 `width`、`height` 指定的动画精灵。创建成功时返回非 0。

因同名资源已存在等失败时返回 0。

要使其动画化，需要用 `SPRITEANIMEADDFRAME` 指令添加帧。

关于动画精灵的注意事项，请参阅 [资源文件](Resource)。

### SPRITEANIMEADDFRAME `<精灵名>`, `<Graphics ID>`, `<x>`, `<y>`, `<宽度>`, `<高度>`, `<偏移X>`, `<偏移Y>`, `<延迟>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

为 `spriteName` 指定资源名的动画精灵添加一帧。

把 `gID` 指定 Graphics 的 `(x, y, width, height)` 指定的矩形作为帧，放置在从精灵左上角算起 `offsetx`、`offsety` 的位置。超出动画精灵创建时设定尺寸范围的部分不会被绘制。

`delay` 指定该帧显示的毫秒数。

`spriteName` 的资源名不存在或不是动画精灵时，该指令失败，什么都不做。

添加帧成功时返回 `1`，失败时返回 0。

### SPRITEDISPOSE `<精灵名>`

废弃 `spriteName` 指定资源名的精灵。

废弃成功时返回非 0。

该指令不会影响精灵所基于的 Graphics 等。要释放 Graphics 占用的内存，请使用 `GDISPOSE` 指令。

### SPRITEGETCOLOR `<精灵名>`, `<x>`, `<y>`

以 `0xAARRGGBB` 形式的整数值获取 `spriteName` 指定资源名的精灵中指定位置的颜色。

`spriteName` 未创建或已废弃，或者 x、y 在图像之外时返回 `-1`。

请注意，只有该指令在失败时返回 `-1` 而不是 0。当获取黑色且完全透明位置的颜色时，该指令返回 0。

### SPRITECREATED `<精灵名>`

指定名称的精灵已创建时返回 `1`，未创建或已废弃时返回 0。

### SPRITEWIDTH `<精灵名>`

获取指定名称的精灵的宽度。精灵未创建或已废弃时返回 0。

### SPRITEHEIGHT `<精灵名>`

获取指定名称的精灵的高度。精灵未创建或已废弃时返回 0。

### SPRITEPOSX `<精灵名>`

获取指定名称的精灵的相对位置的 X。精灵未创建或已废弃时返回 0。

要区分相对位置 X 为 0 与未创建或已废弃，请另外调用 `SPRITECREATED`。

### SPRITEPOSY `<精灵名>`

获取指定名称的精灵的相对位置的 Y。精灵未创建或已废弃时返回 0。

### SPRITESETPOS `<精灵名>`, `<位置X>`, `<位置Y>`

设置指定名称的精灵的相对位置的 X、Y。

### SPRITEMOVE `<精灵名>`, `<移动X>`, `<移动Y>`

把指定名称的精灵的相对位置的 X、Y 加上指定的值。也就是说，等同于：

```erb
SPRITESETPOS spriteName, SPRITEPOSX(spriteName) + movex, SPRITEPOSY(spriteName) + movey
```

### CBGSETG `<Graphics ID>`, `<x>`, `<y>`, `<z深度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

把 `ID` 指定的 Graphics 设置为显示在客户端区域。

`(x, y)` 指定 0 时，客户端区域的左下角与图像的左下角对齐显示。

x 以右方向为正，y 以下方向为正，zdepth 以画面纵深方向为正。

zdepth 要指定 0 以外的值。普通文字绘制相当于 `zdepth == 0`，zdepth 为负时会绘制在文字之前（更靠前）。

### CBGSETSPRITE `<精灵名>`, `<x>`, `<y>`, `<z深度>`

把 `spriteName` 指定资源名的精灵设置为显示在客户端区域。

`(x, y)` 指定 0 时，客户端区域的左下角与图像的左下角对齐显示。

x 以右方向为正，y 以下方向为正，zdepth 以画面纵深方向为正。

zdepth 要指定 0 以外的值。普通文字绘制相当于 `zdepth == 0`，zdepth 为负时会绘制在文字之前。

### CBGCLEAR

解除由 `CBG` 系各指令设置的全部背景图像设置。

### CBGCLEARBUTTON

解除由 `CBGSETBUTTONSPRITE` 指令设置的按钮。

### CBGREMOVERANGE `<z最小值>`, `<z最大值>`

在由 `CBGSETG`、`CBGSETSPRITE`、`CBGSETBUTTONSPRITE` 指令设置的图像中，解除 Z 深度在 `zmin` 以上 `zmax` 以下的图像。

### CBGREMOVEBMAP

解除由 `CBGSETBMAPG` 指令设置的按钮映射。

### CBGSETBMAPG `<Graphics ID>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

把 `ID` 指定的 Graphics 设置为客户端区域的按钮映射。

这里设置的按钮映射会影响 `CBGSETBUTTONSPRITE` 指令和 `INPUTMOUSEKEY` 指令。

按钮映射图像不会被显示，但与 `CBGSETG` 指令设置的图像一样，会按画面左下角与图像左下角对齐的位置配置。

鼠标光标正下方的按钮映射图像的颜色会被识别为按钮的值。不过，当颜色的 alpha 值不是 255（透明或半透明）时，不会被识别为按钮的值。

### CBGSETBUTTONSPRITE `<按钮值>`, `<精灵名>`, `<选中精灵名>`, `<x>`, `<y>`, `<z深度>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

与 `CBGSETBMAPG` 指令设置的按钮映射联动，设置可选择按钮。

鼠标正下方的按钮映射图像颜色的 `0xRRGGBB` 值等于参数 `button` 时显示 `spriteNameB`，否则显示 `spriteName`。

`spriteName` 或 `spriteNameB` 可以指定空字符串，此时未选中或选中时不显示任何内容。

x、y、zdepth 与 `CBGSETSPRITE` 相同。注意基准位置 `(x,y) = (0,0)` 是画面左下角与图像左下角对齐的位置。

可以通过可选的 `tooltipmes` 指定选中该按钮时显示的工具提示字符串。

同一个 `button` 值可以分配多个 `CBGSETBUTTONSPRITE`，也不必与按钮位置一致。此时，工具提示与图像的 xy 位置无关，优先显示设置了工具提示字符串中 zdepth 最大（最先绘制、看起来最靠里）的那个。

### CBGSETBUTTONSPRITE `<按钮值>`, `<精灵名>`, `<选中精灵名>`, `<x>`, `<y>`, `<z深度>`, `<工具提示>`

（※仅当绘制方式为 `GRAPHICS` 或 `TEXTRENDERER` 时可用）

带工具提示字符串的 `CBGSETBUTTONSPRITE`。

### SETANIMETIMER `<时间>`

为动画精灵以毫秒为单位指定重绘间隔。

Emuera 通常不会在 `INPUT` 等输入等待期间重绘。通过该指令设置重绘间隔，就可以在 `INPUT` 等输入等待期间让图像动起来。

另外，在 `TINPUT` 等带超时处理的指令中不会重绘。

实际重绘间隔会受计算机状态影响，比指定时间略晚。因此如果把重绘间隔设成与动画 delay 相同的值，会频繁掉帧，请指定比 delay 足够小的间隔。

该指令与配置中的`每秒帧数`项目无关，也不受 `REDRAW` 指令抑制重绘的效果影响。

## 未整理项目

### CLEARTEXTBOX

清空最下方输入栏中的全部文本。

### STRDATA `<赋值目标字符串变量>`

`PRINTDATA` 的不显示、返回所选字符串版。

```erb
STRDATA <赋值目标字符串变量>
  DATA、DATAFORM、DATALIST～ENDLIST
ENDDATA
```

从 `DATA` 语法指定的字符串中随机返回一个。`DATALIST` 语法中的 `DATA` 系会用换行符连接后返回。

### STOPCALLTRAIN

强制结束 `CALLTRAIN` 指令流程的指令。

在 `CALLTRAIN` 指令运行期间被调用时，会在该时点结束 `CALLTRAIN` 的处理；其他情况下什么都不做。

