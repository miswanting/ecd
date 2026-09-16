# 头文件（ERH）

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/ERH

除了扩展名为 `ERB` 的文件外，`ERB` 文件夹中还可以放置扩展名为 `ERH` 的文件。

`ERH` 文件用于记载需要先于 `ERB` 处理的内容，具体来说，就是用 `#DIM`、`#DIMS` 定义广域变量，用 `#DEFINE` 定义宏。

`ERH` 文件中不能书写 `#DIM`、`#DIMS` 和 `#DEFINE` 以外的行。

Emuera 会读取放在 `ERB` 文件夹中的所有 `*.ERH` 文件。

处理顺序为 `csv` 文件夹中的文件 → `*.ERH` → `*.ERB`，因此 `ERH` 的效果不会作用于 `CSV` 文件夹中的内容。

反过来说，由 `_rename.csv` 进行的替换也会适用于 `*.ERH`。

由于 EramakerEX 不会对 `*.ERH` 应用 `_rename.csv`，因此使用 `ERH` 文件会丧失与 EramakerEX 的兼容性。

## 广域变量的声明

另请参阅[用户自定义变量](Custom_Variable#广域变量的书写格式)。

在头文件中可以声明新的变量。

它不同于在 `ERB` 中声明的私有变量，而是可以从 `ERB` 的所有位置引用的广域变量。

与私有变量不同，广域变量没有 `DYNAMIC` 和 `STATIC` 的区别，也不能用 `REF` 声明引用型变量，但可以用 `CONST` 以同样的方式声明常量。

可以声明的变量最高为 3 维。

如果不指定元素数，就会成为元素数为 1 的数组，因此也可以当作非数组变量使用。

变量通过 `#DIM` 或 `#DIMS` 按如下方式声明。

另外，写成 `#DIM HOGE,1,2` 就会成为二维数组。

```
;<*.ERH>
  #DIM MY_INT
  #DIM MY_INT_ARRAY, 100
  #DIMS MY_STR
  #DIMS MY_STR_ARRAY, 100
```

在 `ERH` 中像上面这样定义后，在 `ERB` 中就可以像下面这样作为变量使用：

```
;<*.ERB>
  MY_INT = 100
  MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45
  MY_STR = あああ
  PRINTFORML {MY_INT_ARRAY:10} %MY_STR%
```

用 `#DIM` 声明变量时，元素数除了可以用数值指定外，也可以用常数表达式指定。

不过要注意，与 `*.ERB` 中的 `#DIM` 不同，这里不会展开宏。

### SAVEDATA 关键字

在声明变量时加上 `SAVEDATA` 关键字，就可以声明会被保存的变量。

不过，使用 `SAVEDATA` 关键字声明可保存的多维变量时，需要启用`以二进制格式保存存档`选项。

```
;<*.ERH>
  #DIM SAVEDATA MY_INT_ARRAY, 100
  #DIMS SAVEDATA MY_STR_ARRAY, 100
```

这样声明后，`MY_INT_ARRAY`、`MY_STR_ARRAY` 的内容就会像 `DAY`、`MONEY` 等既有变量一样被保存和读取。

反过来说，没有加 `SAVEDATA` 关键字的变量不会被保存，读取时会被初始化。

### CHARADATA 关键字

在声明变量时加上 `CHARADATA` 关键字，就可以声明角色变量。

`CHARADATA` 可以与 `SAVEDATA` 关键字同时使用。

```
;<*.ERH>
  #DIM CHARADATA C_INT_ARRAY, 100
  #DIMS CHARADATA C_STR_ARRAY, 100
  #DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100
```

在上面的例子中，`C_INT_ARRAY`、`C_STR_ARRAY` 是角色变量，但不会被保存和读取。

`CS_INT_ARRAY` 是角色变量，并且会被保存和读取。

### GLOBAL 关键字

在声明变量时加上 `GLOBAL` 关键字，就可以声明全局变量。

`GLOBAL` 可以与 `SAVEDATA` 关键字同时使用。

```
;<*.ERH>
  #DIM GLOBAL G_INT_ARRAY, 100
  #DIMS GLOBAL G_STR_ARRAY, 100
  #DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100
```

全局变量在通常的保存、读取时既不会被读取，也不会被初始化。

由于这一性质，它可以用于在不同的存档之间共享数据。

如果同时使用 `GLOBAL` 和 `SAVEDATA` 关键字，该变量就会由 `SAVEGLOBAL`、`LOADGLOBAL` 指令读写到 `global.sav` 文件。

其他关于初始值、常量化等的详情，请参阅[用户自定义变量](Custom_Variable)。

## 宏的定义

这里所说的宏，是把 `ERB` 代码中的字符串替换为预先定义好的另一个字符串的功能。

虽然名字叫宏，但它与 Emuera 运行时用 `F1`～`F12` 键使用的键盘宏没有关系。

该功能参考了 C、C++ 的 `#define`。

在 `ERH` 文件中定义宏后，它就会适用于所有 `ERB` 文件中的代码。

### 基本用法

宏的典型定义方式如下：

```
;<*.ERH>
  #DEFINE <替换源标识符> <替换目标表达式>
```

这样，`ERB` 中的 `<替换源标识符>` 就会被替换为 `<替换目标表达式>`。例如，在 `.ERH` 中定义：

```
;<*.ERH>
  #DEFINE FIVE 5
```

那么 `.ERB` 中的字符串 `FIVE` 就会被替换为 `5`。例如：

```
;<*.ERB>
  X = FIVE

;(展开后)
  X = 5
```

宏也可以加行末注释。

分号之后的内容会作为注释被忽略。

分号之后的内容不会包含在宏中，也不会被展开。

```
;<*.ERH>
  #DEFINE FIVE 5 ;注释

;<*.ERB>
  X = FIVE + FIVE

;(展开后)
  X = 5 + 5
```

请注意，宏的展开几乎是按字符串原样进行的。

```
;<*.ERH>
  #DEFINE SIX           1 + 5
  #DEFINE NINE          8 + 1

;<*.ERB>
  X = SIX * NINE
```

你也许会以为 `X` 会被赋值为 6*9 即 36，但实际上：

```
;(展开后)
  X = 1 + 5 * 8 + 1
```

由于乘法优先，结果为 `X = 42`。

宏可以展开为 `"～～"` 这样的字符串常量，也可以展开为变量、函数或表达式。

只要把它理解为「原样展开 `#DEFINE` 右侧的字符串」，大致上就能理解了。

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

由于宏是原样按字符串展开的，替换目标也可以不是完整的表达式，而是运算符或表达式的一部分。

不过，这种用法并不被推荐。

如果不格外谨慎地使用，会严重损害代码的可读性。

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

可以定义包含宏的宏。这样的宏会在加载 `ERB` 时被反复展开，直到宏无法再被应用为止。

```
;<*.ERH>
  #DEFINE FIVE_1 5
  #DEFINE FIVE_2 FIVE_1 + FIVE_1
  #DEFINE FIVE_3 FIVE_2 + FIVE_2

;<*.ERB>
  X = FIVE_3

;(展开后)
  X = 5 + 5 + 5 + 5
```

如果反复展开一定次数后宏仍然残留，Emuera 会认为它疑似自我引用或循环引用宏，从而终止处理并以错误结束。

请注意不要写出下面这样的自我引用或循环引用宏。

```
;<*.ERH>
  #DEFINE HOGE HOGE
  #DEFINE PIYO FUGA + 1
  #DEFINE FUGA PIYO + 2

;<*.ERB>
;会出错
  X = HOGE
  Y = PIYO
```

### 预处理指令

根据名为 `XXX` 的宏是否已定义，可以分支决定是否执行多行内容。

`[IF XXX]` 行与 `[ENDIF]` 行之间的行，只有在 `XXX` 被 `#DEFINE` 定义时才会执行。

例如，可以这样使用：

```
;<*.ERB>
  [IF HOGE]
    PRINTL HOGE 已被定义
  [ELSEIF PUYO]
    PRINTL HOGE 未被定义
    PRINTL PUYO 已被定义
  [ELSE]
    PRINTL HOGE 和 PUYO 都未被定义
  [ENDIF]
```

出于这一目的，也可以定义空宏（没有替换目标的宏）。

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

这样只会打印出文本 `FIVE`。

这与 `PRINT X` 只打印字母 X、而不是 X 的值是同样的道理。

宏的替换目标不能是赋值运算符，也不能是包含赋值运算符的表达式。

下面的宏定义会出错：

```
;<*.ERH>
;会出错
  #DEFINE HOGE =
  #DEFINE PUGE X = 1
```

前面说过宏可以替换表达式的部分，但括号的对应关系必须在宏内部闭合。下面的宏定义会出错：

```
;<*.ERH>
;会出错
  #DEFINE HOGE ( X +
  #DEFINE PUGE Y )

;<*.ERB>
  Z = HOGE PUGE
```

不能把宏替换为指令。

下面的宏定义会出错：

```
;<*.ERH>
  #DEFINE MY_PRINTL     PRINTL

;<*.ERB>
  MY_PRINTL 这是 PRINTL

;(展开后)
;会出错
```

如前所述，宏只适用于 `*.ERB`，不适用于 `*.csv` 和 `*.ERH`。

另外，即使在 `*.ERB` 内，也不会适用于预处理指令、属性名以及行首的记号。

`[SKIPSTART]` 等、`#DIM` 和 `#FUNCTION` 等、`@EVENTFIRST` 等中的 `@` 部分，都不是替换对象。

例如，即使写成 `#DEFINE HOGE SKIPSTART`，也不会由 `[HOGE]` 开始注释。

不过，即使是 `#` 之后的字符串，`#DIM` 的变量名等仍然是替换对象。

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

会像上面这样展开，因此可以正常工作。
