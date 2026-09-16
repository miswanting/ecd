# 与 Eramaker 的差异

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/diff

## 修复的 Bug 与不自然的行为

### 数组的最后一个元素无法使用

在 Eramaker 中，如果数组的最后一个元素不为 0，读取存档时数据会被**破坏**。

Emuera 不存在这个问题。

这个问题源于 Eramaker 没有统一保存与读取的规范，而 Emuera 以保存时的规范为准。
因此，用 Eramaker 保存、用 Emuera 读取不会重现该问题；但用 Emuera 保存、用 Eramaker 读取时，问题会重现。

### 单目运算符 `-` 的异常

在 Eramaker 中，存在诸如 `-100 < 0` 结果为`假`等问题。

Emuera 不存在这个问题。

### 文件的最后一行不会被读取

Eramaker 会忽略没有换行符的行。

也就是说，无论 `CSV` 还是 `ERB` 文件，其最后一行都会被忽略。

Emuera 不会重现该行为。

### 数组中存在多余的元素时会被忽略

```erb
A:1:2 = 34
```

在 Eramaker 中，上述表达式会把 `34` 赋值给 `A:1`。

而在 Emuera 中，这会报错。

### 无法以特定格式调用数组

在 Eramaker 中，可以使用 `A:0`、`A:(COUNT+1)` 这样的变量写法。

但在二重数组变量中写成 `ABL:0:2` 或 `TALENT:(COUNT+1):2` 时就会出错。

此外，调用字符串变量时若省略参数，也可能出错。

Emuera 不存在这个问题。

二重数组的参数无论是常量还是表达式都不会出错，字符串变量的参数也可以省略。

### CSV 中的异常数字被当作整数处理

```csv
0,ローター,200
0xFF,ルーター,200
```

如果在 `Item.csv` 中出现上述内容，Eramaker 会把 `0xFF` 解释为 0，于是 `TALENT:0` 被定义为`路由器`。

Emuera 不会重现该行为，而是报错并使该定义无效，`TALENT:0` 被定义为`转子`。

### 不自然的写法也能工作

```erb
A:0:1:99999 +-RESULTS:0=@=+123|*?=Y
```

上述表达式在 Eramaker 中可以工作。

在 Emuera 中则会报错。

## 与 Eramaker 的其他差异

### `SIF` 的下一行是空行、注释行等的情况

```erb
SIF 条件式
  ;注释
  PRINT hogehoge
```

对于上述脚本，Eramaker 总是会执行 `PRINT` 行，因为它不认为 `SIF` 的下一行是 `;注释`。

Emuera 与吉里吉里（Kirikiri）等一样，只有在条件式为真时才执行 `PRINT` 行。

Emuera 会把空行和注释行视为完全不存在，因此把 `SIF` 的下一行识别为 `PRINT hogehoge`。

另外，Eramaker 允许在 `SIF` 的下一行放置 `IF` 或 `REPEAT` 语句，但这在许多情况下并非作者的意图，因此 Emuera 限制了可以紧跟在 `SIF` 后面的行。

### 省略 `IF`、`ELSEIF` 等参数时的行为

在 Eramaker 中，如果省略 `IF`、`ELSEIF` 或赋值语句的参数，行为是未定义的。

不过，如果省略 `RETURN` 的参数，则相当于 `RETURN 0`。

Emuera 总是把省略的参数解释为 0，因此 `IF` 以下的语句永远不会执行，但会给出警告。

### 函数名允许使用的字符

在 Eramaker 中，包括符号和双字节字符在内的所有字符都可以使用。

Emuera 也允许双字节字符，但不允许除 `_`（下划线）以外的符号。

此外，Emuera 不建议以半角数字作为函数名的开头。

下面的脚本在 Eramaker 中可以工作，但在 Emuera 中会报错。

```erb
CALL \.,)(][+-%* 　@&$

@\.,)(][+-%* 　@&$
  PRINTL 函数@\.,)(][+-%* 　@&$被调用了。
  RETURN 0
```

在 Emuera 中，如果函数名包含 `,` 或 `(`，会被误认为是函数参数。

另外，如果函数名中包含 `@` 或运算符符号，`LOCAL@函数名` 这样的调用将无法正常工作。

如果函数名包含 `{}` 或 `%`，`CALLFORM` 调用会受到影响。

因此，Emuera 与 `C#`、吉里吉里（Kirikiri）等许多编程语言一样，禁止在函数名中使用符号。

从 ver 1.721 起，这是一个`警告 Lv 1`，而不会立即作为错误终止，但它仍可能在某处引发非预期的行为。

另外，如果函数名以半角数字开头，就无法作为`表达式中可用的函数`来调用。

这是因为表达式会查看单个字符，来判断它是数字、变量还是函数。

### `RAND` 的行为

```erb
A = RAND:X
```

对于上面的表达式，当 `X` 为 0 时，Eramaker 返回 0。

否则，它返回（0 到 32767 之间的随机数）%（`X` 的绝对值）。

这种方式在 `X` 为负数时也能工作，永远不会返回大于 32767 的值，而且在 `X` 大于 1000 时偏差不可忽视。

Emuera 没有重现这些特征。

Emuera 返回（0 到 18446744073709551615 之间的随机数）%（`X`）。

当 `X` 为 0 或负数时，Emuera 会报错。

（这是为了统一返回值，依据官方说明「`RAND:A` 的返回值是 0 到 A-1 之间的整数」。）

另外，`X` 的有效范围是 1 到 9223372036854775807（64 位有符号整数的正数范围）。

如果 `X` 在 100 万亿左右以下，则偏差小到无法察觉。

### `WAIT` 的行为

在 Eramaker 中，执行 `WAIT` 指令时不会换行，而是在按下 `Enter` 键时换行。

在 Emuera 中，如果执行 `WAIT` 指令时光标位于一行中间，则会换行；而在`按下 Enter 键`、`左键点击`时不会换行。

### `JUMP` 的行为

在 Eramaker 中，无法从通过 `CALL` 调用的函数中 `JUMP` 出去。

在 Emuera 中，即使是通过 `CALL` 调用的函数也可以 `JUMP`。

在 `JUMP` 的目标中 `RETURN`，与在 `JUMP` 的来源函数中 `RETURN` 的行为相同。

```erb
CALL FOOBAR

@FOO
  PRINTL 函数@FOO
  JUMP BAR
@BAR
  PRINTL 函数@BAR
  RETURN 0
@FOOBAR
  PRINTL 函数@FOOBAR
  CALL FOO
  PRINTW 回到了函数@FOOBAR
```

Eramaker 输出：

```
试图用 JUMP 调用一个通过 CALL 调用的函数。
```

Emuera 输出：

```
函数@FOOBAR
函数@FOO
函数@BAR
回到了函数@FOOBAR
```

### `CALLNAME` 的行为

在 Eramaker 中，引用 `CALLNAME` 时，如果 `CALLNAME` 是空字符串，会返回 `NAME` 的值来代替。

在 Emuera 中，如果 `CALLNAME` 是空字符串，则返回空字符串。

为了弥补这一差异，Emuera 提供了`当 CALLNAME 是空字符串时使用 NAME`的选项。

当该选项为 `YES` 时，如果在 `CharaXX.csv` 中未设置 `CALLNAME`，或将其设置为空字符串，就会被视为设置成了与 `NAME` 相同的字符串。

然而，即使使用该选项也无法完全重现。

例如，用 Eramaker 添加角色后用 Emuera 读取存档时，行为可能不同。

### `PRINTFORM` 等 `FORM` 的展开

Eramaker 会反复进行展开，直到没有可展开的内容为止。

如果存在自我引用或循环引用，就会冻结。

Emuera 只展开一次。

Eramaker 的展开可能如下所示：

```
str = 想要展开的字符串
while(str 中存在 {～～})
  展开最左边的 {～～}
while(str 中存在 %～～%)
  展开最左边的 %～～%
while(str 中存在 ***)
  展开最左边的 ***
while(str 中存在 $$$)
  展开最左边的 $$$
while(str 中存在 +++)
  展开最左边的 +++
while(str 中存在 ///)
  展开最左边的 ///
while(str 中存在 ===)
  展开最左边的 ===
```

由于这种行为，Eramaker 还允许如下写法：

```erb
STR:1 = S1%STR:2%3%4%
STR:2 = S2%STR:
STR:3 = S3%STR:
STR:4 = S4
PRINTFORMSL STR:1
PRINTFORML %STR:1%
DRAWLINE
;结果
;S1S2S3S4
;S1S2S3S4
```

Emuera 不会重现这种情况。

### EVENT 函数的属性

在 Eramaker 中，事件函数的调用方式如下：

```
foreach(带有 #PRI 的函数)
{
  函数调用
  if(#SINGLE 且返回值为 1)
    break;
}
foreach(没有 #PRI 也没有 #LATER 的函数)
{
  函数调用
  if(#SINGLE 且返回值为 1)
    break;
}
foreach(带有 #LATER 的函数)
{
  函数调用
  if(#SINGLE 且返回值为 1)
    break;
}
```

同时带有 `#PRI` 和 `#LATER` 的事件函数会被调用两次。

`#SINGLE` 只在返回值为 1 时中断后续的函数调用。

另外，`#SINGLE` 对基于 `#PRI` 或 `#LATER` 的每一组函数调用分别生效。

ver 1.800（包含开发版则为 1.756alpha018）之后的 Emuera 完全重现了该行为。

在那之前的 Emuera 中，事件函数的调用方式如下。

根据 `#PRI`、`#LATER` 对函数列表排序：

```
foreach(所有函数)
{
  函数调用
  if(#SINGLE 且返回值为 1)
    break;
}
```

如果同时带有 `#PRI` 和 `#LATER`，则视为两者都没有。

如果函数调用被 `#SINGLE` 中断，则不论是否存在 `#PRI`、`#LATER`，该事件函数的调用都会结束。

另外，在 Emuera 1.751b 之前，`#SINGLE` 会在返回值不为 0 时中断后续的函数调用。

这在 1.752 中得到修复，当前版本与 Eramaker 一样，只在返回值为 1 时中断后续的函数调用。

### `gamebase.csv` 中「代码」的读取方法

如果在 `gamebase.csv` 的代码中写入超出 Eramaker 可处理范围（`-2147483648` 到 `2147483647`）的数值，Eramaker 会把 `csv` 中写的值转换为十六进制，并取低 8 位作为游戏代码。

例如`代码,08231000181818110`这种情况，游戏代码为 `301712126`，处于 Eramaker 可处理的范围内。

Emuera 不会重现该行为。

在 ver 1.803 及更早版本的 Emuera 中，诸如`代码,08231000181818110`的情况，游戏代码会变为 0。

Emuera 可以处理 `-9223372036854775808` 到 `9223372036854775807` 范围内的数字，但

`GAMEBASE_GAMECODE` 与 Eramaker 一样只能处理 `-2147483648` 到 `2147483647` 范围内的数字，超出该范围时会被设为 0。

此外，在 ver 1.804 之后的 Emuera 中，即使是`代码,08231000181818110`这种情况，游戏代码也会如所写的那样变为 `8231000181818110`。

（`GAMEBASE_GAMECODE` 也被修改为与其他变量处理相同的范围。）

这种情况下，如果像`代码,98231000181818110110`这样超出 Emuera 可处理的数值范围，游戏代码也会变为 0。

另外，在 ver 1.805 之后的 Emuera 中，如果存档数据的游戏代码为 0，则不论游戏本体的游戏代码如何，都可以读取。

### `abl.csv` 等的读取方法

在 Eramaker 中，可以为索引指定负值或非常大的值，例如`99999:技巧`。

不过，这里指定的编号会被 `PRINT_ABL` 等使用，因此在 `PRINT_ABL` 时（在 Eramaker 内部）会引用 `ABL:99999`，从而发生错误。

因此，实际可用的值与 `ABL`、`TALENT` 的数组数量相同。

在 `item.csv` 中，当在 `SHOP` 中引用 `ITEM` 或 `ITEMSALES` 时也会发生错误。

Emuera 不允许指定 `ABL` 等数组范围之外的值。

这样的行会被忽略。

作为替代，可以通过 `VariableSize.csv` 改变数组的范围。

### `train.csv` 的读取方法

基本上与其他 `csv` 文件相同，但情况稍有不同。

例如，在 Eramaker 中，即使定义`XXX,99999`，只要定义了 `@COM99999`，命令就能正常执行。

另一方面，如果定义负值，例如`YYY,-2`，命令会显示出来，但选择它时什么也不会发生。

Emuera 不会重现该行为。

可定义的范围到 `VariableSize.csv` 中指定的 `TRAINNAME` 的大小为止，超出则被忽略。

如果没有改变 `TRAINNAME` 的大小，则 0 到 999 有效。

### `CharaXX.csv` 的读取方法

在 Eramaker 中，即使`编号`小于 0 或大于等于 1000，也能正常 `ADDCHARA`。

这在 Emuera 中也是相同的行为。

在 Eramaker 中，像`基础,0`这样需要第三个值却省略它时，会被当作 0。

另外，像`素质,0,100`这样不需要第三个值却指定了它时，会被忽略并变为 1。

Emuera 不会重现该行为。

如果写成`基础,0`，则 `MAXBASE:0` 变为 1；如果写成`素质,0,100`，则 `TALENT:0` 变为 100。

### 文件的换行符

在 Eramaker 中，换行符为 `CR` `LF` 和 `LF` 时视为换行，但只有 `CR` 时不会被视为换行，并会发生各种故障。

Emuera 不会重现该行为，只有 `CR` 时也视为换行。

## 未修复的 Bug 与不自然的行为

### 文件读取顺序取决于文件系统

在 Eramaker basic 中，有些情况下的行为取决于文件的读取顺序，例如 `CALL` 多重定义的函数时。

然而，在 Eramaker 中，文件读取顺序取决于文件系统，因此可能无法按预期工作。

这个问题在 Emuera 中同样会重现。

目前公开的许多脚本都假定文件系统为 NTFS，如果文件系统是 FAT 则无法正常工作。

### `REPEAT`-`REND` 结束时 `COUNT` 会增加

在 Eramaker 中，退出 `REPEAT`-`REND` 时 `COUNT` 会 +1。

用 `BREAK` 退出时也会 +1。

Emuera 重现了该行为。

在 `FOR`-`NEXT` 语法中，循环变量同样会 +1。

请注意，该行为与一般编程语言中的 `for` 语法和 `break` 语句不同。

### `NEXTCOM` 的行为

在 Eramaker 中，`NEXTCOM` 的初始值是 -1，但 `NEXTCOM` 被执行后赋予的值不是 -1 而是 0。

因此，除非在 ERB 中重新赋值，否则会不断重复 `COM0`。

另外，Eramaker 的官方说明中没有提到 `NEXTCOM` 的存在。

Emuera 也重现了该行为。

`NEXTCOM` 的功能只是为了与 Eramaker 兼容而复制的，不建议使用。

如果代码不打算在 Eramaker 中运行，请考虑使用 `DOTRAIN` 或 `CALLTRAIN` 指令。

## 变更的特性

### SP 角色

在 Eramaker 中，`csv` 中 `CFLAG:0` 被设置为非 0 的角色是 SP 角色。

它无法通过 `ADDCHARA` 注册，必须通过 `ADDSPCHARA` 注册，这是一个稍显晦涩的规范。

同时，它也是 bug 的来源：例如在无意中将 `CFLAG:0` 设为非 0 后，就无法再用 `ADDCHARA` 注册。

Emuera 从 ver 1.816 开始决定不再默认支持该功能。

`CFLAG:0` 不再被特殊对待，所有角色都可以通过 `ADDCHARA` 注册。

兼容性选项「使用 SP 角色」可以重现 Eramaker 的行为，但除了让旧脚本运行之外，不建议将其用于任何目的。

## 新增的功能

参见 Emuera [新增的扩展语法](General)。
