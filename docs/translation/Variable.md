# 常量与变量

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exvar

## 常量的表示

Emuera 使用的常量符号与 Kirikiri 中可以使用的符号相同，但八进制的符号除外。

例如，以下几行都有相同的含义：

```
X = 32
X = 0b100000
X = 0x20
X = 1p5
```

从上到下的顺序是：普通十进制符号、二进制、十六进制、1 x 2到5次方。

当你想获得或设置每一个比特时，像1p5这样的符号在与位操作符的结合中很有用。

例如，如果A的底部第0位或第3位成立，下面的条件语句将为真。

```
IF (A & 1p0)||(A & 1p3)
```

你也可以用e代替p来表示n x 10的m次方。

例如，13e3等于13000。

上述符号仅用于常量，不能用于表达式。

诸如以下的记号将导致一个错误：

```
X = 13e(A + 1)
```

由于与 Eramaker 的兼容性问题，八进制符号没有被采用。

数字` 012 `将被解释为`12`，而不是`10`。

## 指定变量大小

在 Emuera 中，你可以通过在`CSV/`文件夹中放置一个名为`VariableSize.csv`的文件来指定一个现有变量的元素数。

如果你为元素数指定-1，你可以禁止在ERB中使用该变量。

如果你试图在ERB中赋值或引用一个被禁止的变量，将会发生错误。如果系统需要一个被禁止的变量，赋值过程将被忽略，其值将始终被视为-1。

(这是当`MONEY`或`NEXTCOM`被禁用时出现的情况）。

## 本地变量

### LOCAL & LOCALS

::: warning 该方法已弃用

请考虑使用`#DIM`和`#DIMS`代替。

:::

欲了解更多信息，请参见[用户定义的变量]()。

`LOCAL`变量是局部变量。

`LOCAL`是一个整数，`LOCALS`是一个字符串

`LOCAL`的基本规模为1000，`LOCALS`为100。

你也可以通过`#LOCALSIZE <要设置的元素数>`和`#LOCALSSIZE <要设置的元素数>`为每个函数分别设置元素数。

允许你单独改变每个函数的元素数量。 (然而，你只能将其设置为一个大于0的整数）。

这是不被保存的。

```
@EVENTFIRST
  LOCAL:10 = 123
  CALL FUNC001
  PRINTV LOCAL:10
  WAIT
@FUNC001
  LOCAL:10 = 567
  RETURN
```

在上述代码中，`PRINTV`的结果是`123`。

`FUNC001`中的`LOCAL:10`被改变，但`EVENTFIRST`中的`LOCAL`没有被改变。

与许多语言中的局部变量不同，`LOCAL`在调用函数时不被初始化。

在内部，我们创建了一个名为`LOCAL@函数名`的变量。

因此，如果有多个同名的函数，例如事件函数，它们是共享的。 另外，如果函数被递归调用，它将使用同一个变量。

可以调用其他函数的变量，如`LOCAL@EVENTFIRST:10 = 567`，但不建议这样做（这是一个调试功能）。

(这只是为了调试的目的。)如果你从另一个函数中调用一个变量，而你所调用的函数的名称包含一个运算符，将导致一个错误。

### ARG & ARGS

本地变量。

`ARG`是一个整数，`ARGS`是一个字符串。

`ARG`的大小基本上是1000，`ARGS`是100，可以在`VariableSize.csv`中改变。

此外，该函数会自动分配足够的元素，以便毫无问题地使用函数参数中定义的数量。 (它永远不会小于`VariableSize.csv`中指定的数字）。)

```
@FUNC002, ARG:0, ARG:1, ARG,1100
  LOCAL = ARG:0 * ARG:1 / 100
  RETURN LOCAL
```

在这种情况下，`ARG`中的元素数原本是1000，但在`@FUNC002`中，`ARG`中的元素数是1101，从0到1100。

它的目的是用于指定函数中的参数，对于其他用途来说，可读性可能较差。

### (用户定义的私有变量)

在特定函数中使用`#DIM`或`#DIMS`定义的变量是私有变量，可以用与局部变量相同的方式处理。

更多信息见用户定义的变量。

## 保存数据之间共享的变量

### GLOBAL & GLOBALS

这些是可以在不同保存数据之间共享的变量。

`GLOBAL`是一个整数，`GLOBALS`是一个字符串

`GLOBAL`的基本尺寸是1000，`GLOBALS`是100，可以在`VariableSize.csv`中改变。

它们不与其他数据一起保存和加载。

要保存一个全局变量，使用`SAVEGLOBAL`指令。

当你做`SAVEGLOBAL`时，`GLOBAL`和`GLOBALS`被保存在`Global.sav`中。

如果`Global.sav`在编写时已经存在，它将被覆盖。

`LOADGLOBAL`指令允许你从`Global.sav`加载`GLOBAL`和`GLOBAL`。

`LOADGLOBAL`被推荐与`@EVENTFIRST`和`@EVENTLOAD`一起使用。

可以通过`GLOBAL`和`GLOBAL`在不同的保存之间共享数据。

### (用户定义的全局变量)

在ERH中使用`#DIM GLOBAL`或`#DIMS GLOBAL`定义的变量是全局变量。

另外，通过使用`#DIM SAVEDATA GLOBAL`，该变量成为一个保存的全局变量。

详情请参考[头文件（ERH）]()。

## 角色变量

### NICKNAME & MASTERNAME

这是一个保存的字符串变量，类似于`NAME`和`CALLNAME`。

在`CharaXX.csv`中，你可以指定为`NICKNAME`、`MASTERNAME`、`绰号`或`主人的名字`。

### CSTR

一个要保存的字符串数组变量。

它是`CFLAG`的一个字符串版本。

在`CharaXX.csv`中，它被指定为`CSTR`。

### CUP & CDOWN & DOWNBASE & TCVAR

这些是数字数组变量。

它们旨在分别作为`UP`、`DOWN`、`LOSEBASE`和`TFLAG`的字符变量版本使用。

因此，它们具有与这些变量相同的初始化时间和保存可用性。

然而，对于`CUP`和`CDOWN`，使用`CUPCHECK`指令而不是`UPCHECK`指令。

### CDFLAG

数值角色的三维阵列变量。

```
CDFLAG:MASTER:0:2
```

第一个参数是角色的注册号，就像在传统的角色变量中一样，但第二个和第三个参数是必需的。

### (用户定义的角色变量)

在ERH中使用`#DIM CHARADATA`或`#DIMS CHARADATA`定义的变量是字符变量，可以自由处理，就像`CFLAG`。
详见[头文件（ERH）]()。

## csv相关

### csv变量

这个变量用于参考每个csv中定义的值。

使用方法类似于例如`TALENTNAME`和`Talent.csv`之间的关系。

所有这些都是一维数组变量，不能被分配，也不能被保存。

如果它没有在csv中定义，它将返回0或空字符串。

|   变量名    |    文件     |  类型  | 长度  |
| :---------: | :---------: | :----: | :---: |
|  ITEMPRICE  |  Item.csv   |  整数  | 1000  |
|  TRAINNAME  |  Train.csv  | 字符串 | 1000  |
|  BASENAME   |  Base.csv   | 字符串 |  100  |
|  EQUIPNAME  |  equip.csv  | 字符串 |  100  |
| TEQUIPNAME  | tequip.csv  | 字符串 |  100  |
|  STAINNAME  |  stain.csv  | 字符串 | 1000  |
|   EXNAME    |   ex.csv    | 字符串 |  100  |
| SOURCENAME  | source.csv  | 字符串 |  100  |
|  FLAGNAME   |  flag.csv   | 字符串 | 10000 |
|  TFLAGNAME  |  tflag.csv  | 字符串 | 1000  |
|  CFLAGNAME  |  cflag.csv  | 字符串 | 1000  |
|  TCVARNAME  |  tcvar.csv  | 字符串 |  100  |
|   STRNAME   | strname.csv | 字符串 | 20000 |
|  TSTRNAME   |  tstr.csv   | 字符串 |  100  |
|  CSTRNAME   |  cstr.csv   | 字符串 |  100  |
| SAVESTRNAME | savestr.csv | 字符串 |  100  |
| CDFLAGNAME1 | cdflag1.csv | 字符串 |   1   |
| CDFLAGNAME2 | cdflag2.csv | 字符串 |   1   |
| GLOBALNAME  | global.csv  | 字符串 |  100  |
| GLOBALSNAME | globals.csv | 字符串 |  100  |

请不要混淆`str.csv`和`cstr.csv`等的作用。

`str.csv`是决定分配给变量`STR`的值的文件，而`cstr.csv`是决定`CSTRNAME`的文件。

决定`STRNAME`的文件是`strname.csv`，所以要注意如何使用`str.csv`和`strname.csv`。

### GameBase.csv 変数

参考`GameBase.csv`中定义的数值的变量。

所有的变量都是非数组，不可分配和不可保存的。

|        变量名         |   关键词   |  类型  |
| :-------------------: | :--------: | :----: |
|    GAMEBASE_AUTHOR    |    作者    | 字符串 |
|     GAMEBASE_INFO     |  追加信息  | 字符串 |
|     GAMEBASE_YEAR     |  制作年份  | 字符串 |
|    GAMEBASE_TITLE     |    标题    | 字符串 |
|   GAMEBASE_GAMECODE   |  游戏代码  |  整数  |
|   GAMEBASE_VERSION    |    版本    |  整数  |
| GAMEBASE_ALLOWVERSION |  兼容版本  |  整数  |
| GAMEBASE_DEFAULTCHARA |  默认人物  |  整数  |
|    GAMEBASE_NOITEM    | 无物品模式 |  整数  |

### WINDOW_TITLE

这是显示在 Emuera 窗口标题栏的字符串。

它是一个非数组字符串变量。 初始值是`GameBase.csv`的`窗口标题`字段中设置的值。

如果没有设置`窗口标题`，它将由`标题`和`版本`生成。

如果`标题`也没有设置，它将是 Emuera。

### 与csv有关的其他变量

#### MONEYLABEL

记录货币单位的一个变量。

它是一个非数组、字符串类型的变量，不能被分配，也不能被保存。

初始值是`_Replace.csv`中`货币单位`字段设置的值。

如果没有设置`货币单位`，它将是`$`，就像 Eramaker 中一样。

#### DRAWLINESTR

这是一个变量，其中记录了执行DRAWLINE指令时要显示的字符串。

它是一个非数组字符串类型的变量，不能被分配，也不能被保存。

初始值是在`_Replace.csv`中为`DRAWLINE字符`设置的数值的重复。

`_Replace.csv`中`DRAWLINE字符`设置的重复值，所以它不包含`DRAWLINE字符`中设置的准确值。

如果没有设置`DRAWLINE字符`，结果将与 Eramaker 中一样，例如：

```
---------------
```

## 保存和加载相关

### LASTLOAD_*

这是最后一个被加载的变量，用来参考数据信息。

它们可以被引用，但不能被分配到。

所有变量的初始值都是-1或空字符串。

它们在加载时将被更新，并在执行`RESETDATA`或菜单项`返回标题`时返回其初始值。

- LASTLOAD_VERSION：最后加载的数据的版本（将在`GameBase.csv`中定义的值）
- LASTLOAD_NO：最后载入的数据的编号（与`save*.sav`中的`*`相对应的数字）
- LASTLOAD_TEXT：文本（将由`PUTFORM`添加的文本，`SAVEDATA_TEXT`）

### SAVEDATA_TEXT

这是保存在保存数据中并在保存/加载屏幕上显示的文本。

它也是加载后可以被`LASTLOAD_TEXT`引用的文本。

它可以被引用或分配。

当`@SAVEINFO`被调用时，当前时间被分配给这个字符串，可以使用`PUTFORM`附加到这个字符串上。

你也可以通过直接指定给`@SAVEINFO`中的这个字符串来定制时间显示。

如果你不使用`SAVEGAME`和`PUTFORM`（你使用`SAVELOAD.ERB`），你就不需要这个。

### (用户定义的可保存的广域变量)

使用ERH中`#DIM SAVEDATA`或`#DIMS SAVEDATA`定义的变量是可保存的广域变量。

然而，当使用`#DIMS SAVEDATA`定义一个可保存的多维广域变量时，必须启用`以二进制格式保存保存的数据`选项。

更多信息请参考[头文件（ERH）]()。

## 多维数组变量

### DITEMTYPE & DA ～ DE

::: warning 该方法已弃用

请考虑使用`#DIM`或`#DIMS`来代替。

:::

更多信息见[用户定义的变量]()。

一个固定长度的二维整数阵列。

调用为`DITEMTYPE:1:2`。不能省略任何参数。

在 Eramaker 的双数组中，第一个参数是字符注册号，所以数组的大小取决于`CHARANUM`。

二维数组，如`DITEMTYPE`，不改变其在`VariableSize.csv`中指定的大小。

如果它们是`VARSIZE`指令的主题，元素的数量将分别分配给`RESULT:0`和`RESULT:1`。

如果你在`VariableSize.csv`中使用`DITEMTYPE,100,200`，你最多可以使用`DITEMTYPE:99:199`，`VARSIZE`指令将把100和200分配给`RESULT:0`和`RESULT:1`。

### TA & TB

::: warning 该方法已弃用

请考虑使用`#DIM`或`#DIMS`来代替。

:::

更多信息见[用户定义的变量]()。

固定长度的整数三维阵列。

它被称为`TA:1:2:3`。不能省略任何参数。

标准尺寸为100x100x100。 所以你最多可以使用`TA:99:99:99`。

可以改变`VariableSize.csv`中的大小，但不可能指定一个大于100万的大小。

当受制于`VARSIZE`指令时，`RESULT:0`，`RESULT:1`和`RESULT:2`将分别被赋予元素的数量。

### (用户定义的多维数组变量)

从1.808版开始，使用`#DIM`或`#DIMS`定义的变量可以成为多维变量。

更多信息见[用户定义的变量]()。

## 调试变量

调试变量是一个为调试目的提供信息的变量。

一个调试变量只有在调试模式下被调用时才会返回一个有意义的值。

当在正常模式下调用时，它们返回一个空字符串或0。

他们的名字前后都有两个下划线`_`。

### `__FILE__`

一维的只读变量。

返回当前运行的脚本的文件名。

文件名与错误信息的格式相同，包括文件夹结构和扩展名。

如果当前没有脚本在运行，那么这个变量就是空的，例如，在等待系统输入时，从调试命令或变量观察中引用它。

如果当前没有脚本在运行，例如，在等待系统输入时从调试命令或变量观察中引用，则返回一个空字符串。

### `__LINE__`

一维的只读变量。

返回当前执行的脚本的行号。

行号是一个从1开始的数字，像错误信息一样。

如果当前没有运行的脚本，则返回-1。

### `__FUNCTION__`

一维的只读变量。

返回当前执行的函数的名称。

函数名称不包含`@`和参数列表。

如果当前没有运行的脚本，将返回一个空字符串。

## 其他

### TSTR

一个字符串类型的一维数组。 它是一个一维数组，不被保存。

它与`TFLAG`同时被初始化。

### RANDDATA

一个数组，用于存储随机数的状态。 它是一个数字类型的一维数组，可分配和保存。

它由`DUMPRAND`记录，由`INITRAND`读取。

### LINECOUNT

该变量返回到目前为止已被`PRINT`的行数。

每增加一行，`LINECOUNT`就增加+1（不包括由于窗口宽度造成的换行），并减去启动以来的`CLEARLINES`数量。

它不会受到由于日志缓冲区溢出而导致的删除的影响（标准5000）。

它是一个非数组的数字变量，不能被分配到或保存。

行数的计算方法与`CLEARLINE`相同。

### ISTIMEOUT

以下是私人修改过的1809+v2版本所附的readme中的内容：

```
变量ISTIMEOUT的加入是为了检查TINPUT系统是否已经超时。
当TINPUT系统被调用时，这个变量被初始化为0，当它超时时被设置为1。
```

从ver1815起，这个变量可能无法使用。

### `__INT_MAX__` & `__INT_MIN__`

它是一个非数组的数字变量，有一个定义的最大和最小值范围，不能被分配或保存。

它不是一个调试变量，所以它可以在正常启动时使用。

### (用户定义的广域变量)

ERH中使用`#DIM`或`#DIMS`定义的变量是广域变量，可以像单字母变量（如A）一样自由处理。

详见[头文件（ERH）]()。

### (用户定义的常数)

在ERH和某些函数中使用`#DIM`或`#DIMS`定义的变量成为一维数组中的常量，可以被视为不可分配的变量。

欲了解更多信息，请参见[用户定义的变量]()。

### (用户定义的参考变量)

在特定函数中使用`#DIM REF`或`#DIMS REF`定义的变量是引用型变量。

欲了解更多信息，请参见[用户定义的变量]()。

## 与 Eramaker 在行为上的差异

### NAME & CALLNAME

Eramaker 不允许分配。

在 Emuera，这是有可能的。

### RAND & CHARANUM

在 Eramaker 中，你可以分配数值，它们将被保存和加载，但没有办法使用它们。

Emuera 不允许指派任务。

## 暂定行为表

### Eramaker 中也存在的变量

|   变量名   |  类型  | 维度 | 代替 | 可保存 | 禁用 |                 默认值                  |                初始化时机                |                             备注                             |
| :--------: | :----: | :--: | :--: | :----: | :--: | :-------------------------------------: | :--------------------------------------: | :----------------------------------------------------------: |
|   RESULT   |  整数  |  1   | :o:  |  :o:   | :x:  |                    -                    |                    -                     |                              -                               |
|  RESULTS   | 字符串 |  1   | :o:  |  :x:   | :x:  |                    -                    |                    -                     |                              -                               |
|   A ~ Z    |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                              -                               |
|   COUNT    |  整数  |  1   | :o:  |  :o:   | :x:  |                    -                    |                    -                     |            `COUNT:0`在`REPEAT`中作为计数器使用。             |
|    DAY     |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                              -                               |
|    TIME    |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                              -                               |
|   MONEY    |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                              -                               |
|   MASTER   |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                              -                               |
|   TARGET   |  整数  |  1   | :o:  |  :o:   | :x:  |                `:0 = 1`                 |                    -                     |                              -                               |
|    ASSI    |  整数  |  1   | :o:  |  :o:   | :o:  |                `:0 = -1`                |                    -                     |                              -                               |
|   PLAYER   |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                              -                               |
|  ASSIPLAY  |  整数  |  1   | :o:  |  :o:   | :o:  |                `:0 = 0`                 |              `BEGIN TRAIN`               |                              -                               |
| SELECTCOM  |  整数  |  1   | :o:  |  :o:   | :x:  |                    -                    |                    -                     |                              -                               |
|  PREVCOM   |  整数  |  1   | :o:  |  :o:   | :o:  |                `:0 = -1`                |              `BEGIN TRAIN`               |                              -                               |
|  NEXTCOM   |  整数  |  1   | :o:  |  :o:   | :o:  |                `:0 = -1`                |              `BEGIN TRAIN`               |                              -                               |
|  LOSEBASE  |  整数  |  1   | :o:  |  :o:   | :o:  |                  全为0                  |           `SHOW_USERCOM`结束时           |                 元素可以通过`BASENAME`来指定                 |
|     UP     |  整数  |  1   | :o:  |  :o:   | :o:  |                  全为0                  |  `SHOW_USERCOM`结束时<br />`UPCHECK`时   |                元素可以通过`PALAMNAME`来指定                 |
|    DOWN    |  整数  |  1   | :o:  |  :o:   | :o:  |                  全为0                  |  `SHOW_USERCOM`结束时<br />`UPCHECK`时   |                元素可以通过`PALAMNAME`来指定                 |
|  PALAMLV   |  整数  |  1   | :o:  |  :o:   | :x:  |       `_replace.csv`<br />PalamLv       |                    -                     |                              -                               |
|   EXPLV    |  整数  |  1   | :o:  |  :o:   | :x:  |        `_replace.csv`<br />ExpLv        |                    -                     |                              -                               |
|    EJAC    |  整数  |  1   | :o:  |  :o:   | :o:  |              `:0 = 10000`               |                    -                     |                              -                               |
|    FLAG    |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                 元素可以通过`FLAGNAME`来指定                 |
|   TFLAG    |  整数  |  1   | :o:  |  :o:   | :o:  |                  全为0                  |              `BEGIN TRAIN`               |                元素可以通过`TFLAGNAME`来指定                 |
|    ITEM    |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                 元素可以通过`ITEMNAME`来指定                 |
| ITEMSALES  |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                 元素可以通过`ITEMNAME`来指定                 |
|   BOUGHT   |  整数  |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |                              -                               |
|   PBAND    |  整数  |  1   | :o:  |  :o:   | :o:  | `:0 = `<br />`_replace.csv`<br />PBand  |                    -                     |                              -                               |
|  CHARANUM  |  整数  |  0   | :x:  |  :x:   | :x:  |                    -                    |                    -                     |           当指定任何元素时，将返回角色注册的数量。           |
|    RAND    |  整数  |  0   | :x:  |  :x:   | :x:  |                    -                    |                    -                     | 这样，如果`RAND:X`中的X是0或负值，就是一个错误。<br/>否则会返回一个从0到`元素数-1`的随机值。 |
|    STR     | 字符串 |  1   | :o:  |  :x:   | :o:  |                `Str.csv`                |                    -                     |                 该元素可以通过`STRNAME`指定                  |
|  SAVESTR   | 字符串 |  1   | :o:  |  :o:   | :o:  |                    -                    |                    -                     |               该元素可以通过`SAVESTRNAME`指定                |
|     NO     |  数字  |  C0  | :o:  |  :o:   | :x:  |                    -                    |                    -                     |              在`CharaXX.csv`中以`番号,**`指定。              |
|   ISASSI   |  数字  |  C0  | :o:  |  :o:   | :x:  |                    -                    |                    -                     |  在`CharaXX.csv`中指定`助手,1`，你将从初始状态被视为助理。   |
|    NAME    | 字符串 |  C0  | :o:  |  :o:   | :x:  |                    -                    |                    -                     |             在`CharaXX.csv`中以`名前，**`指定。              |
|  CALLNAME  | 字符串 |  C0  | :o:  |  :o:   | :x:  |                    -                    |                    -                     |            在`CharaXX.csv`中以`呼び名，**`指定。             |
|    BASE    |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 当`ADDCHARA`时，所有元素的值与`MAXBASE`相同。<br/>元素可以通过`BASENAME`来指定。 |
|  MAXBASE   |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中以`基礎,*,**`指定。元素可以通过`BASENAME`来指定。 |
|    ABL     |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中用`能力,*,**`指定。<br/>该元素可以通过`ABLNAME`指定 |
|   TALENT   |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中用`素質,*`指定。<br/>这样，第三个值也可以被指定，如`素質,*,**`。<br/>元素可以通过`TALENTNAME`指定 |
|    EXP     |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中用`経験,*,**`指定。<br/>元素可以通过`EXPNAME`指定 |
|    MARK    |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中用`刻印,*,**`指定。<br/>元素可以通过`MARKNAME`指定 |
|  RELATION  |  数字  |  C1  | :o:  |  :o:   | :o:  |      `_replace.csv`<br />Relation       |                    -                     | 在`CharaXX.csv`中用`相性,*,**`指定。<br/>元素可以通过`NAME`和`CALLNAME`指定 |
|    JUEL    |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中用`珠,*,**`指定。<br/>元素可以通过`PALAMNAME`指定 |
|   CFLAG    |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中用`フラグ,*,**`指定。<br/>元素可以通过`CFLAGNAME`指定 |
|   EQUIP    |  数字  |  C1  | :o:  |  :o:   | :o:  |                    -                    |                    -                     | 在`CharaXX.csv`中用`装着物,*,**`指定。<br/>元素可以通过`EQUIPNAME`指定 |
|   TEQUIP   |  数字  |  C1  | :o:  |  :o:   | :o:  |                  全为0                  |              `BEGIN TRAIN`               |                 元素可以通过`TEQUIPNAME`指定                 |
|   PALAM    |  数字  |  C1  | :o:  |  :o:   | :o:  |                  全为0                  |              `BEGIN TRAIN`               |                 元素可以通过`PALAMNAME`指定                  |
|   STAIN    |  数字  |  C1  | :o:  |  :o:   | :x:  |        `_replace.csv`<br />汚れ         |              `BEGIN TRAIN`               |                 元素可以通过`STAINNAME`指定                  |
|     EX     |  数字  |  C1  | :o:  |  :o:   | :o:  |                  全为0                  |              `BEGIN TRAIN`               |                   元素可以通过`EXNAME`指定                   |
|   SOURCE   |  数字  |  C1  | :o:  |  :o:   | :o:  |                  全为0                  | `BEGIN TRAIN`<br />`@SOURCE_CHECK`结束时 |                 元素可以通过`SOURCENAME`指定                 |
|   NOWEX    |  数字  |  C1  | :o:  |  :o:   | :o:  |                  全为0                  |           就在`@EVENTCOM`之前            |     `@USERCOM`之前不会更新<br />元素可以通过`EXNAME`指定     |
|  GOTJUEL   |  数字  |  C1  | :o:  |  :o:   | :o:  |                  全为0                  |              `BEGIN TRAIN`               |                 元素可以通过`PALAMNAME`指定                  |
|  ABLNAME   | 字符串 |  1   | :x:  |  :x:   | :o:  |                `Abl.csv`                |                    -                     |                              -                               |
| TALENTNAME | 字符串 |  1   | :x:  |  :x:   | :o:  |              `Talent.csv`               |                    -                     |                              -                               |
|  EXPNAME   | 字符串 |  1   | :x:  |  :x:   | :o:  |                `Exp.csv`                |                    -                     |                              -                               |
|  MARKNAME  | 字符串 |  1   | :x:  |  :x:   | :o:  |               `Mark.csv`                |                    -                     |                              -                               |
| PALAMNAME  | 字符串 |  1   | :x:  |  :x:   | :o:  |               `Palam.csv`               |                    -                     |                              -                               |
|  ITEMNAME  | 字符串 |  1   | :x:  |  :x:   | :o:  |               `Item.csv`                |                    -                     |                              -                               |
|   NOITEM   |  整数  |  1   | :o:  |  :o:   | :o:  | `:0 = `<br />`GameBase.csv`<br />无Item |                    -                     |                    可以是0和1以外的其他值                    |

下划线部分显示了 Eramaker 和 Emuera 规格之间的差异。

### Emuera 的专用变量

|        变量名         |  类型  | 维度 | 代入 | 可保存 | 禁用 |                   默认值                    |             初始化时机             |                             备注                             |
| :-------------------: | :----: | :--: | :--: | :----: | :--: | :-----------------------------------------: | :--------------------------------: | :----------------------------------------------------------: |
|         LOCAL         |  整数  |  1   | :o:  |  :x:   | :o:  |                      -                      |                 -                  |               #LOCALSIZE改变每个函数的元素数量               |
|        LOCALS         | 字符串 |  1   | :o:  |  :x:   | :o:  |                      -                      |                 -                  |              #LOCALSSIZE改变每个函数的元素数量               |
|          ARG          |  整数  |  1   | :o:  |  :x:   | :o:  |                    任意                     |         当该函数被调用时※          | ※只有当该参数被设置时<br/>每个函数只分配参数中定义的元素数量 |
|         ARGS          | 字符串 |  1   | :o:  |  :x:   | :o:  |                    任意                     |         当该函数被调用时※          | ※只有当该参数被设置时<br/>每个函数只分配参数中定义的元素数量 |
|       (Private)       |  任意  | 任意 | 任意 |  :x:   | :x:  |                    任意                     |  游戏开始<br />当该函数被调用时※   |  ※只有当该参数被设置为<br/>在一个函数中由#DIM或#DIMS定义的   |
|        (Refer)        |  任意  | 任意 |  ※   |   ※    | :x:  |                      -                      |                 -                  |    ※取决于参考文献<br/>由函数中的#DIM REF或#DIMS REF 定义    |
|      (Wide_area)      |  任意  | 任意 | 任意 |  任意  | :x:  |                    任意                     |              游戏开始              |                   由ERH中的#DIM或#DIMS定义                   |
|        GLOBAL         |  整数  |  1   | :o:  |   ※    | :x:  |                      -                      |                 -                  | 用SAVEGLOBAL保存，用LOADGLOBAL加载。<br/>该元素可以由GLOBALNAME指定 |
|        GLOBALS        | 字符串 |  1   | :o:  |   ※    | :x:  |                      -                      |                 -                  | 用SAVEGLOBAL保存，用LOADGLOBAL加载。<br/>GLOBALSNAME可以用来指定一个元素 |
|       LINECOUNT       |  整数  |  0   | :x:  |  :x:   | :x:  |                      -                      |                 -                  |                              -                               |
|       ISTIMEOUT       |  整数  |  0   | :x:  |  :x:   | :x:  |                      0                      |          TInput命令执行时          |               当一个TInput指令超时，1被分配。                |
|     `__INT_MAX__`     |  整数  |  0   | :x:  |  :x:   | :x:  |             9223372036854775807             |                 -                  |                              -                               |
|     `__INT_MIN__`     |  整数  |  0   | :x:  |  :x:   | :x:  |            -9223372036854775808             |                 -                  |                              -                               |
|       RANDDATA        |  整数  |  1   | :o:  |  :o:   | :x:  |                      -                      |                 -                  |                              -                               |
|         TSTR          | 字符串 |  1   | :o:  |  :x:   | :o:  |                 全空字符串                  |            BEGIN TRAIN             |                   该元素可以由TSTRNAME指定                   |
|          DA           |  整数  |  2   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|          DB           |  整数  |  2   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|          DC           |  整数  |  2   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|          DD           |  整数  |  2   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|          DE           |  整数  |  2   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|       DITEMTYPE       |  整数  |  2   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|          TA           |  整数  |  3   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|          TB           |  整数  |  3   | :o:  |  :o:   | :o:  |                      -                      |                 -                  |                              -                               |
|       NICKNAME        | 字符串 |  C0  | :o:  |  :o:   | :x:  |                      -                      |                 -                  |             在`CharaXX.csv`中以`あだ名,**`指定。             |
|      MASTERNAME       | 字符串 |  C0  | :o:  |  :o:   | :x:  |                      -                      |                 --                 |          在`CharaXX.csv`中以`主人の呼び方,**`指定。          |
|       DOWNBASE        |  整数  |  C1  | :o:  |  :o:   | :o:  |                    全为0                    |        @SHOW_USERCOM结束时         |                  元素可以通过BASENAME来指定                  |
|          CUP          |  整数  |  C1  | :o:  |  :o:   | :o:  |                    全为0                    | @SHOW_USERCOM结束时<br />UPCHECK时 |                 元素可以通过PALAMNAME来指定                  |
|         CDOWN         |  整数  |  C1  | :o:  |  :o:   | :o:  |                    全为0                    | @SHOW_USERCOM结束时<br />UPCHECK时 |                 元素可以通过PALAMNAME来指定                  |
|         TCVAR         |  整数  |  C1  | :o:  |  :o:   | :o:  |                    全为0                    |            BEGIN TRAIN             |                 元素可以通过TCVARNAME来指定                  |
|         CSTR          | 字符串 |  C1  | :o:  |  :o:   | :o:  |                      -                      |                 -                  | 用`CharaXX.csv`中的`CSTR,*,**`进行规范<br/>该元素可以由CSTRNAME指定 |
|        CDFLAG         |  整数  |  C2  | :o:  |  :o:   | :o:  |                      -                      |                 -                  | 元素可由CFDLAGNAME1和CDFLAGNAME2指定<br/>注意，元素数量的默认值是1.1 |
|       ITEMPRICE       |  整数  |  1   | :x:  |  :x:   | :o:  |                  Item.csv                   |                 -                  |               一个元素可以通过其ITEMNAME来指定               |
|       TRAINNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                  Train.csv                  |                 -                  |                              -                               |
|       BASENAME        | 字符串 |  1   | :x:  |  :x:   | :o:  |                  Base.csv                   |                 -                  |                              -                               |
|       EQUIPNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                  Equip.csv                  |                 -                  |                              -                               |
|      TEQUIPNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                 TEquip.csv                  |                 -                  |                              -                               |
|       STAINNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                  Stain.csv                  |                 -                  |                              -                               |
|        EXNAME         | 字符串 |  1   | :x:  |  :x:   | :o:  |                   EX.csv                    |                 -                  |                              -                               |
|      SOURCENAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                 Source.csv                  |                 -                  |                              -                               |
|       FLAGNAME        | 字符串 |  1   | :x:  |  :x:   | :o:  |                  Flag.csv                   |                 -                  |                              -                               |
|       TFLAGNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                  TFlag.csv                  |                 -                  |                              -                               |
|       CFLAGNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                  CFlag.csv                  |                 -                  |                              -                               |
|       TCVARNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                  TCVar.csv                  |                 -                  |                              -                               |
|        STRNAME        | 字符串 |  1   | :x:  |  :x:   | :o:  |                 StrName.csv                 |                 -                  |         `Str.csv`指定的是STR的内容，而不是元素的名称         |
|       TSTRNAME        | 字符串 |  1   | :x:  |  :x:   | :o:  |                  TEtr.csv                   |                 -                  |                              -                               |
|       CSTRNAME        | 字符串 |  1   | :x:  |  :x:   | :o:  |                  CStr.csv                   |                 -                  |                              -                               |
|      SAVESTRNAME      | 字符串 |  1   | :x:  |  :x:   | :o:  |                 SaveStr.csv                 |                 -                  |                              -                               |
|      CDFLAGNAME1      | 字符串 |  1   | :x:  |  :x:   | :o:  |                 CdFlag1.csv                 |                 -                  |                              -                               |
|      CDFLAGNAME2      | 字符串 |  1   | :x:  |  :x:   | :o:  |                 CdFlag2.csv                 |                 -                  |                              -                               |
|      GLOBALNAME       | 字符串 |  1   | :x:  |  :x:   | :o:  |                 Global.csv                  |                 -                  |                              -                               |
|      GLOBALSNAME      | 字符串 |  1   | :x:  |  :x:   | :o:  |                 Globals.csv                 |                 -                  |                              -                               |
|    GAMEBASE_AUTHOR    | 字符串 |  0   | :x:  |  :x:   | :x:  |           GameBase.csv<br />作者            |                 -                  |                              -                               |
|     GAMEBASE_INFO     | 字符串 |  0   | :x:  |  :x:   | :x:  |         GameBase.csv<br />追加情報          |                 -                  |                              -                               |
|     GAMEBASE_YEAR     | 字符串 |  0   | :x:  |  :x:   | :x:  |          GameBase.csv<br />製作年           |                 -                  |                              -                               |
|    GAMEBASE_TITLE     | 字符串 |  0   | :x:  |  :x:   | :x:  |         GameBase.csv<br />タイトル          |                 -                  |                              -                               |
|   GAMEBASE_GAMECODE   |  整数  |  0   | :x:  |  :x:   | :x:  |          GameBase.csv<br />コード           |                 -                  |                              -                               |
|   GAMEBASE_VERSION    |  整数  |  0   | :x:  |  :x:   | :x:  |        GameBase.csv<br />バージョン         |                 -                  |                              -                               |
| GAMEBASE_ALLOWVERSION |  整数  |  0   | :x:  |  :x:   | :x:  |   GameBase.csv<br />バージョン違い認める    |                 -                  |                              -                               |
| GAMEBASE_DEFAULTCHARA |  整数  |  0   | :x:  |  :x:   | :x:  |    GameBase.csv<br />最初からいるキャラ     |                 -                  |                              -                               |
|    GAMEBASE_NOITEM    |  整数  |  0   | :x:  |  :x:   | :x:  |       GameBase.csv<br />アイテムなし        |                 -                  |                              -                               |
|     WINDOW_TITLE      | 字符串 |  0   | :o:  |  :x:   | :x:  | GameBase.csv<br />ウィンドウタイトル<br />※ |                 -                  | 如果没有，则由`タイトル`和`バージョン`生成。<br/>如果没有`タイトル`，则为`Emuera`。 |
|      MONEYLABEL       | 字符串 |  0   | :x:  |  :x:   | :x:  |    `_replace.csv`<br />お金の単位<br />※    |                 -                  |                          默认为`$`                           |
|      DRAWLINESTR      | 字符串 |  0   | :x:  |  :x:   | :x:  |   `_replace.csv`<br />DRAWLINE文字<br />※   |                 -                  |                       默认为`-`的重复                        |
|   LASTLOAD_VERSION    |  整数  |  0   | :x:  |  :x:   | :x:  |                     -1                      |     游戏开始<br />RESETDATA时      |                      该值在加载时被更新                      |
|      LASTLOAD_NO      |  整数  |  0   | :x:  |  :x:   | :x:  |                     -1                      |     游戏开始<br />RESETDATA时      |                      该值在加载时被更新                      |
|     LASTLOAD_TEXT     | 字符串 |  0   | :x:  |  :x:   | :x:  |                  空字符串                   |     游戏开始<br />RESETDATA时      |                      该值在加载时被更新                      |
|     SAVEDATA_TEXT     | 字符串 |  0   | :o:  |   ※    | :x:  |                     ※※                      |          @SAVEINFO开始时           |      ※保存为保存数据的标题<br />※※代表当前时间的字符串       |

