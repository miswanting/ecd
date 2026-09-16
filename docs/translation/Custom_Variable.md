# 用户自定义变量

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/UserVars

使用预处理指令 `#DIM` 和 `#DIMS` 可以定义任意变量。

在函数中定义的变量是私有变量，只能在该函数中使用；而在[头文件（ERH）](Header_File)中定义的变量是广域变量，可以从 `ERB` 的任何位置引用。

## 私有变量的书写格式

在想要定义变量的函数声明之下，按下面的格式书写：

```erb
#DIM(S) <变量名>, <元素数> {, <元素数> {, <元素数>}}
```

- `<变量名>` 与函数名一样，是不以数字开头、除 `_` 以外不含其他符号的任意字符串。
- `<元素数>` 是 1 到 1000000 范围内的任意整数或常数表达式，省略时为 1。
- 根据给出的 `<元素数>` 的个数，变量会被定义为不同的维度，最高为 3 维，不能定义超过 4 维的变量。
- 变量可以按 `<元素数>` 指定的数量进行赋值，并且不会被保存。初始值为 0 或空字符串。

在一个函数中可以定义多个 `#DIM(S)` 私有变量。

用 `#DIM` 定义的是数值型变量，用 `#DIMS` 定义的是字符串型变量。

用 `#DIM(S)` 定义的变量还可以作为函数的参数使用，也可以为其指定初始值。

```erb
@FIND_CSTR(KEY, VALUE)
#FUNCTION
#DIM LCOUNT
#DIM KEY
#DIMS VALUE
SIF KEY < 0 || KEY >= VARSIZE("CSTR")
  RETURNF -1
FOR LCOUNT, 0, CHARANUM
  SIF LCOUNT == MASTER
    CONTINUE
  SIF CSTR:LCOUNT:KEY == VALUE
    RETURNF LCOUNT
NEXT
```

如上例所示，根据变量的用途来命名，并设置合适的元素数量，可以代替不连续的 `LOCAL` 使用，从而提高可读性。

## 初始值的设定

声明一维数组变量时，可以同时定义初始值。

如果省略了数组的元素数，则初始值的个数会自动成为数组的元素数。

如果没有省略数组的元素数，则该数字就是数组的元素数。

如果没有省略元素数，而初始值的个数大于元素数，则会发生错误。

```erb
;省略了元素数，因此 HOGE 的元素数为 3
#DIM HOGE = 1,2,3

;没有省略元素数，因此 PUGE 的元素数为 100
#DIM PUGE,100 = 4,5,6

;错误（初始值的个数大于指定的元素数）
#DIM HIGE,1 = 7,8,9

;字符串变量也可以（用字符串表达式指定）
#DIMS SHOGE = "A", "B", "C"
```

注意，多维数组不能定义初始值。

## 动态变量

像 `#DIM(S) DYNAMIC <变量名>, <元素数>` 这样在变量名前加上 `DYNAMIC`，定义的变量就会被动态分配。

具体来说，变量在函数被调用时分配，在函数结束时变量及其值都会消失。

（由于 `RESTART` 指令是「返回到函数开头」的指令，即使是动态分配的变量也不会被重置。）

即使在函数中调用自己（递归），变量也会按递归的次数分别分配，因此递归处理的行为是稳定的。

不过，它比不加 `DYNAMIC`（静态变量）时运行得更慢。

## 常量

声明一维数组变量时，在变量名前加上 `CONST` 可以定义一维数组常量。

与初始值一样，只能定义一维数组变量。

常量在声明时必须给出初始值，并且不能通过赋值来改变。

由于其性质，`CONST` 不能与 `GLOBAL`、`SAVEDATA`、`REF`、`DYNAMIC` 关键字同时使用。

数组的元素数也可以不省略，但如果元素数与初始值的个数不一致，就会发生错误。

```erb
;定义一维常量数组
#DIM CONST HOGE = 1,2,3

;错误（初始值的个数与元素数不一致）
#DIM CONST PUGE,100 = 4,5,6

;字符串变量也可以（用字符串表达式指定）
#DIMS CONST SHOGE = "A", "B", "C"
```

## 引用型变量

在变量名前使用 `REF` 关键字可以定义引用型变量。

1 到 3 维的数值型和字符串型数组分别声明如下：

```erb
#DIM REF HOGE1DIM,0
#DIM REF HOGE2DIM,0,0
#DIM REF HOGE3DIM,0,0,0
#DIMS REF PUGE1DIM,0
#DIMS REF PUGE2DIM,0,0
#DIMS REF PUGE3DIM,0,0,0
```

有逗号时 `0` 可以省略，一维数组连逗号也可以省略。

引用型变量没有实体，操作引用型变量实际上就是操作通过 `REF` 指令（从 ver1.815 起不可用）或按引用传递进来的变量。

关于按引用传递的详情，请参阅[函数与预处理器](Function_and_Preprocessor)中的「按引用传递参数」。

## 广域变量的书写格式

在[头文件（ERH）](Header_File)中书写 `#DIM(S)` 时，它不再是在 `ERB` 中定义的私有变量，而是可以从 `ERB` 任何位置引用的广域变量。

与私有变量不同，广域变量没有 `DYNAMIC` 与 `STATIC` 的区别，也不能用 `REF` 定义引用型变量，但可以用 `CONST` 以同样的方式定义常量。

在 ERH 中还可以定义 `DIM` 所没有的、面向函数的保存变量、广域变量和角色变量。

详情请参阅[头文件（ERH）](Header_File)。

## 限制条件

### 不能使用与指令相同的名称

不能定义与指令同名的变量，如下所示：

```erb
;报错
#DIM PRINTFORM
#DIM SELECTCASE
#DIM CALL
#DIM RETURN
#DIM GOTO
#DIM SQRT
#DIM DATAFORM
#DIM NOSKIP
#DIM FUNC
#DIM ENDFUNC
```

可以定义与函数、预处理器同名的变量，但不推荐这样做。

```erb
;不推荐
#DIM EVENTFIRST
#DIM COMF32
#DIM COMABLE15
#DIM SHOW_ABLUP_SELECT
#DIM DIM
#DIM PRI
#DIM ONLY
#DIM SKIPSTART
```

### 函数外部的访问

与 `LOCAL@HOGE` 中的 `LOCAL` 不同，没有任何方法可以引用或赋值其他函数的私有变量。
