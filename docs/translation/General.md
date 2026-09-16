# Emuera 扩展语法

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exetc

## 行末注释

```erb
A = B ;将 B 赋值给 A
```

Emuera 允许在行的末尾插入注释。

但 `PRINT` 系指令是例外：由于 `PRINT` 指令的参数是一段文本，注释文本会被视作参数的一部分。

```erb
PRINT foobar	;一种播放器
```

这种情况下会输出 `foobar	;一种播放器`。

## 行连接

```erb
{
  #DIM CONST HOGE =
    1,2,3,4
}
```

上面的代码会被解释为 `#DIM CONST HOGE = 1,2,3,4`。

- `{` 与 `}` 必须单独成行，除空白以外不能包含其他字符。
- 换行符所在的位置会被补上一个半角空格。也就是说，不能在函数名或变量名的中间断行；如果把 `PRINT` 等指令拆行，换行处的半角空格也会进入显示字符串。
- Emuera 在语法解释上，会先进行行连接处理，再解释注释。

也就是说：

```erb
{
  #DIM CONST HOGE =
    1,2,3,4 ;注释
    ,5,6,7,8
}
```

会变成 `#DIM CONST HOGE = 1,2,3,4 ;注释 ,5,6,7,8`，其中 `,5,6,7,8` 会被视为行末注释的一部分而忽略。

## 特殊注释行

### ;!;

Emuera 和 Eramaker 都会把以 `;` 开头的行视为注释行，但 Emuera 会把以 `;!;` 开头的行视为有效行，而不是注释。

可以用它来书写不希望在 Eramaker 中执行的语句。

例如，在 `@SHOWSHOP` 中加入以下脚本，就可以禁止在 Emuera 中运行：

```erb
;!;PRINTW 这个脚本不能在 Emuera 上运行
;!;QUIT
```

另外，与 `[SKIPSTART]`、`[SKIPEND]` 一起使用时，还可以像下面这样禁止在 Emuera 以外的环境中运行。在书写只希望 Emuera 执行的语句时可以使用：

```erb
;!;[SKIPSTART]
PRINTW 这个脚本只能在 Emuera 上运行
QUIT
;!;[SKIPEND]
```

### ;#;

以 `;#;` 开头的行只在调试模式下执行。

在非调试模式下，它会被视为注释行，不会被执行。

不过，`DEBUG` 系指令在非调试模式下原本就会被忽略，因此没有必要给这些行加上 `;#;`。同样，调试变量在非调试模式下是空字符串或 0，所以不必担心出错。

关于调试模式的详情，请参阅[调试模式](Debug_Mode)。

## 角色 CSV

Eramaker 大概只准备了 100 个用于创建角色的数组。

因此，即使在 `chara3.csv`、`chara03.csv`、`chara3B.csv` 中定义了不同的角色，也只有其中一个有效。

在 Emuera 中，只要内存允许，就可以定义任意多个角色。

另外，只要符合 `chara*.csv` 的命名，像 `chara101.csv`、`charaABC.csv` 这样的文件也会被读取。

如果角色编号重复，`ADDCHARA` 或 `ADDSPCHARA` 存在多个候选项时，只有最先读取到的那个有效。

## 整数类型的数值范围

Eramaker 能处理的整数是 32 位有符号整数，即 -2147483648 到 2147483647 的范围。

Emuera 与吉里吉里一样，能处理 64 位有符号整数，即 -9223372036854775808 到 9223372036854775807 的范围。

## 对数组变量的批量赋值

```erb
A:10 = 1,2,3
DA:0:0 = 1,2,3
```

如上书写时，`A:10` 到 `A:12` 会被分别赋值为 `1`、`2`、`3`。

对于多维数组，`DA:0:0` 到 `DA:0:2` 会被分别赋值为 `1`、`2`、`3`。

从 `DA:0:0` 到 `DA:0:99` 之后并不会继续对 `DA:1:0` 赋值，因此会发生数组越界引用错误。

另外，它不能用于复合赋值（不允许 `A += 1,2,3` 这样的写法）。

对字符串型数组变量进行批量赋值时，必须使用字符串赋值（`'=`）。

```erb
;把「草莓,蜜瓜,蓝色夏威夷」这个字符串赋值给 STR:20
STR:20 = 草莓,蜜瓜,蓝色夏威夷
;把「草莓」「蜜瓜」「蓝色夏威夷」分别赋值给 STR:20～STR:22
STR:20 '= "草莓", "蜜瓜", "蓝色夏威夷"
```

## 使用 FORM 语法为字符串变量赋值

为字符串变量赋值时，可以直接使用带 FORM 语法的文本。

```erb
SAVESTR:0 = %RESULTS%
```

这条语句会把 `RESULTS` 的值赋值给 `SAVESTR:0`。

在 Eramaker 中，同一条语句会把 `%RESULTS%` 这个字面文本本身赋值给 `SAVESTR:0`。

如果你希望在 Emuera 中赋值 `%RESULTS%` 这个字面文本本身，需要像下面这样转义：

```erb
SAVESTR:0 = \%RESULTS\%
```

紧跟在 `\` 之后的字符不会被当作系统符号处理。

如果想让 `\` 符号本身包含在字符串中，请使用 `\\`。

在少数情况下，如果希望 Eramaker 和 Emuera 具有相同的行为，需要这样书写：

```erb
;!;SAVESTR:0 = \%RESULTS\%
;!;[SKIPSTART]
SAVESTR:0 = %RESULTS%
;!;[SKIPEND]
```

## 使用字符串表达式为字符串变量赋值

在 ver1813 之后的 Emuera 中，可以使用赋值运算符 `'=` 和字符串表达式来为字符串变量赋值。

```erb
;等同于「STR = 暮雪」
STR '= "暮雪"
;等同于「STR = %TSTR:0%非雪」
STR '= TSTR:0 + "非雪"
```

## 用字符串指定数组变量的元素

对于以下变量，可以通过在 `*.csv` 中定义的字符串来指定其参数。

关于 Emuera 新增变量的详情，请参阅[常量与变量](Variable)。

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
;以下为 Emuera 追加的变量
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

例如，如果 `abl.csv` 中定义了 `2,技巧`，那么以下四行具有相同的含义：

```erb
ABL:技巧 += 1
ABL:2 += 1
ABL:"技巧" += 1
ABL:(ABLNAME:2) += 1
```

对于 `RELATION`，可以指定 `NAME` 或 `CALLNAME`。

如果有多个同名的定义，则最先定义的那个会被引用。

例如，如果 `abl.csv` 中定义了 `2,技巧` 和 `4,技巧`，且 `2,技巧` 定义在更前面的行，那么 `ABL:技巧` 就会变成 `ABL:2`。

字符串也可以是表达式或变量。这种情况下，需要像下面这样加上 `()`：

```erb
ABL:(RESULTS:0) = ABL:(RESULTS:0) + 1
```

如果省略 `()`，当项目名与变量名相同时，会优先解释为变量。

例如，如果 `abl.csv` 中定义了 `0,ローター`：

```erb
@HOGE
#DIM ローター, 0
ローター = 1
PRINTFORML {ABL:ローター}
```

这种情况下，它会被解释为第 1 个 `ABL`，而不是第 0 个 `ABL`。

同样地，当项目名是数字时，会优先按数字解释。

例如，如果 `abl.csv` 中定义了 `0,10`，那么引用 `ABL:10` 时不会被解释为第 0 个 `ABL`，而是第 10 个 `ABL`。

这也可以在 `chara*.csv` 的定义中使用。

例如，如果 `abl.csv` 中定义了 `2,技巧`，那么以下两行的含义相同：

```
能力,2,2
能力,技巧,2
```

但是，它不能用于**相性（RELATION）**。

这是因为在读取 `chara*.csv` 的阶段，系统还不知道角色名与编号（NO）之间的对应关系。

## 格式化字符串（FORM 语法）的扩展

在 `PRINTFORM` 等使用的格式化字符串中，可以指定 `{}` 和 `%%` 要显示的字符数。

格式为：

```erb
{数值变量或表达式, 显示位数, 对齐方向（LEFT 或 RIGHT）}
%字符串变量或字符串表达式, 显示位数, 对齐方向（LEFT 或 RIGHT）%
```

全角（日文）字符按 2 个字符计算。

显示位数不足时会补上半角空格。

默认是右对齐，指定关键字 `LEFT` 后则为左对齐。

如果原本的位数大于指定的显示位数，则按原样显示。

```erb
A = 123456
STR:0 = あいう
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
[あいう]
[    あいう]
[あいう    ]
[123456]
[あいう]
```

## 在字符串表达式中使用格式化的字符串（FORM 语法）

在字符串表达式中直接使用 FORM 语法（例如作为 `PRINTS` 的参数，或作为式中用户定义函数的参数）会导致错误。

因此，在字符串表达式中使用格式化字符串时，可以像在字符串表达式中使用字符串常量那样，用 `@"～"` 来书写。

如果 `@"～"` 中的字符串只是用 `\@～\@` 的三元运算符描述的，还可以省略 `@"～"`，直接写成 `\@～\@`。

::: tip 正确示例

```erb
;赋值使用的是 FORM 语法
STR:0 = あいう
;加法右侧是字符串表达式
RESULTS += STR:0
;在字符串表达式中使用字符串常量的例子
RESULTS += "えお"
;在字符串表达式中使用 FORM 语法的例子
PRINTS @"%RESULTS%甲乙丙丁戊"

;以下四行完全相同
PRINTS STR:0 + "！"
PRINTFORM %STR:0%！
PRINTS @"%STR:0%！"
PRINTFORM %STR:0 + "！"%
```

:::

::: danger 错误示例

```erb
;内容会变成 RESULTS
STR:0 = RESULTS
;会出错
RESULTS += えお
;会出错
RESULTS += %STR:0%
;会连同 "@ 和 " 一起显示出来
PRINTFORM @"%RESULTS%甲乙丙丁戊"
```

:::

## 在 INPUTS 系指令中使用宏语法

`INPUTS` 等输入接收指令可以使用宏表达式。

宏的格式请参阅使用指南中的宏相关章节。

如果不使用宏语法，而想把 `(` `)` 当作简单的字符串使用，请用 `\` 进行转义。
