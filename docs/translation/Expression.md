> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exmeth

# 式中函数

Emuera 1.712追加了新的语法，被称为**式中函数**，或者叫“方法”（Method）。

ERB脚本中，**函数**是指以 `@ ~ ~` 的形式定义，通过`CALL`命令来调用的东西。
而**式中函数**则是同样以 `@ ~ ~` 形式定义，但直接在表达式中使用的东西。
简单的说，式中函数是可以在表达式中使用的**函数**。

下面演示了式中函数的使用：
```
A = ABS(A)
IF STRLENS(STR:0) > A
	LOCALS:0 = %SUBSTRING(STR:0, A, 1)%
ENDIF
```

在上面的脚本中，
令`A`为`A`的绝对值，
若`STR:0`的字符串长度比`A`大，
则令`LOCALS:0`为`STR:0`的`A`位置以后的截取内容。

若不使用式中函数，上面的脚本可以重写为下面：
```
ABS A
A = RESULT
STRLENS STR:0
IF RESULT > A
	SUBSTRING STR:0, A, 1
	LOCALS:0 = %RESULTS:0%
ENDIF
```

除了会产生中间值`RESULT`与`RESULTS`以外，这两段脚本效果完全相同。



## 示例

以下内容解释了本文用到的一些符号。
例如，
``` clike
	int STRLENS(str s)
	str SUBSTRING(str s, int start = 0, int length = -1)
```

行首的`int`和`str`是式中函数的返回值类型。
`int`是数值型，`str`是字符串型。
下面脚本第一行是正确的，第二行是错误的。
``` clike
	A = STRLENS("abc")
	A = SUBSTRING("abc", 0, 1)
	; 错误，试图为数值型变量赋予字符串型的值
```

接下来的`STRLENS`和`SUBSTRING`是式中函数的名字。

`( )`中的文字`str s`等表示式中函数的参数。
当有多个参数时，使用逗号分隔。
`STRLENS`有一个参数，`SUBSTRING`有3个参数。

参数的第一个单词表示参数的值类型。
`STRLENS`参数是字符串型`str`。
`SUBSTRING`的第一参数是字符串型`str`，第二、三参数是64位数值型`int`。

接下来的`str`、`start`、`length`的单词是参数的名字。
参数的名字通常为了方便理解参数的作用而起。

参数名字之后的 `=0` 表示这个参数可以省略，省略时使用的默认值。
下面脚本每一行的意思都相同：
``` clike
	STR = SUBSTRING(RESULTS)
	STR = SUBSTRING(RESULTS, 0)
	STR = SUBSTRING(RESULTS, , -1)
	STR = SUBSTRING(RESULTS, 0, -1)
```

也可以省略第一个参数。
``` clike
	;int RAND(int min = 0, int max)
	A = RAND(100)
	A = RAND( , 100)
	A = RAND(0, 100)
```

除此之外，式中函数也可以没有参数。
``` clike
	int GETTIME()
```

虽然`GETTIME`没有参数，但是`()`是必须的。（为了区分变量和式中函数）

``` clike
	int FINDCHARA(var key, ? value, int start = 0)
```
这段脚本中，`var`表示变量类型。这里应当输入的是`TALENT`等变量。
`?` 表示可以接受多种类型的值。

`FINDCHARA`中第二参数的类型是由第一参数决定的。

``` clike
	int MAX(int n，int m ...)
```
省略号表示不限制参数的数量。

``` clike
	M = MAX(A，B，C，E，D，F，G）
```
`M`将等于`A~G`中数值最大的变量。





## 内置式中函数一览

``` clike
int GETCHARA(int no, int flag = 0)
int GETSPCHARA(int no)
int FINDCHARA(var key, ? value, int start = 0, int end = ※)
int FINDLASTCHARA(var key, ? value, int start = 0, int end = ※)
str CSVNAME(int no, int flag = 0)
str CSVCALLNAME(int no, int flag = 0)
str CSVNICKNAME(int no, int flag = 0)
str CSVMASTERNAME(int no, int flag = 0)
str CSVCSTR(int no, int index, int flag = 0)
int CSVBASE(int no, int index, int flag = 0)
int CSVABL(int no, int index, int flag = 0)
int CSVTALENT(int no, int index, int flag = 0)
int CSVMARK(int no, int index, int flag = 0)
int CSVEXP(int no, int index, int flag = 0)
int CSVRELATION(int no, int index, int flag = 0)
int CSVJUEL(int no, int index, int flag = 0)
int CSVEQUIP(int no, int index, int flag = 0)
int CSVCFLAG(int no, int index, int flag = 0)
int EXISTCSV(int no, int flag = 0)
int GETNUM(var key, str name)
int STRLENS(str s)
int STRLENSU(str s)
str SUBSTRING(str s, int start = 0, int length = -1)
str SUBSTRINGU(str s, int start = 0, int length = -1)
str CHARATU(str s, int position = 0)
int STRFIND(str str, str find, int start = 0)
int STRFINDU(str str, str find, int start = 0)
int STRCOUNT(str input, str match)
str UNICODE(int value)
int ENCODETOUNI(str value, int position = 0)
str REPLACE(str source, str match, str newvalue)
str ESCAPE(str value)
int VARSIZE(str name, int dim = 0)
int GETTIME()
str GETTIMES()
int GETMILLISECOND()
int GETSECOND()
int CHKFONT(str fontname)
int POWER(int x, int y)
int RAND(int min = 0, int max)
int ABS(int n)
int SIGN(int n)
int MAX(int n, int m...)
int MIN(int n, int m...)
int LIMIT(int value, int min, int max)
int INRANGE(int value, int min, int max)
int SQRT(int n)
int GETBIT(int n, int m)
int CBRT(int value)
int LOG(int value)
int LOG10(int value)
int EXPONENT(int value)
str GETFONT()
int GETCOLOR()
int GETDEFCOLOR()
int GETBGCOLOR()
int GETDEFBGCOLOR()
int GETFOCUSCOLOR()
int GETSTYLE()
str CURRENTALIGN()
int CURRENTREDRAW()
str TOSTR(int value, str format = "")
int GETPALAMLV(int value, int maxLV)
int GETEXPLV(int value, int maxLV)
str TOUPPER(str value)
str TOLOWER(str value)
str TOHALF(str value)
str TOFULL(str value)
int SUMARRAY(var array, int start = 0, int end = ※)
int MATCH(var array, ? value, int start = 0, int end = ※)
int MAXARRAY(var array, int start = 0, int end = ※)
int MINARRAY(var array, int start = 0, int end = ※)
int SUMCARRAY(var carray, int start = 0, int end = CHARANUM)
int CMATCH(var carray, ? value, int start = 0, int end = CHARANUM)
int MAXCARRAY(var carray, int start = 0, int end = CHARANUM)
int MINCARRAY(var carray, int start = 0, int end = CHARANUM)
int ISNUMERIC(str value)
int TOINT(str value)
int CHKDATA(int value)
int SAVENOS()
int PRINTCPERLINE()
int LINEISEMPTY()
int GROUPMATCH(? key, ? value1, ? value2...)
int NOSAMES(? value1, ? value2...)
int ALLSAMES(? value1, ? value2...)
int ISSKIP()
int MOUSESKIP()
str CONVERT(int value, ※)
str MONEYSTR(int value, str format = "")
int FINDELEMENT(var array, ? value, int start = 0, int end = ※, int flag)
int FINDLASTELEMENT(var array, ? value, int start = 0, int end = ※, int flag)
str BARSTR(int value, int max, int length)
```