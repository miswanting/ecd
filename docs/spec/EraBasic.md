# EraBasic 语言参考手册

> 本手册给出 EraBasic 的形式化参考。面向**实现者与进阶使用者**，与[指南](../guide/)的教程风格不同。
> 语言的实际行为以只读参考工程 `.ref/Emuera/` 的源码为准。

## 概述

**EraBasic** 是 Era 系列游戏使用的脚本语言，最初由 Eramaker 定义，由 Emuera 兼容并扩展。

设计目标：

- **低门槛**：面向非专业开发者，语法简单、无类型标注负担；
- **文本与数值驱动**：核心是字符串输出、整数运算与角色数据；
- **固定流程**：由引擎在特定时机调用约定名称的函数（事件函数）。

执行方式是**解释执行**：Emuera 在启动时把 `ERB` 解析为行对象（`LogicalLine`），运行时逐行执行。

## 词法分析

### 字符与编码

- 脚本文件为纯文本，Emuera 环境下通常为 **Shift-JIS**；
- 一行以 `LF` / `CRLF` 结束；没有换行符的最后一行会被忽略（Eramaker 行为）；
- 行首空白（缩进）不影响语义，仅用于阅读。

### 行的种类

| 首字符 | 类别 |
| --- | --- |
| `@` | 函数定义行 |
| `#` | 预处理指令行 |
| `$` | 标签行 |
| `[` | 特殊区块行（如 `[SKIPSTART]`、`[IF XXX]`） |
| `;` | 注释行（`;!;`、`;#;` 例外，见下） |
| 其他 | 普通语句行 |

### 注释

- `;` 之后到行尾为注释；
- `;!;`：在 Emuera 中为有效行，在 Eramaker 中被当作注释；
- `;#;`：仅在调试模式下为有效行。

### 标识符

- 变量名、函数名、标签名由非空白、非运算符的字符组成；
- 函数名建议只使用字母、数字与 `_`，且不以数字开头；
- 配置 `大文字小文字の違いを無視する` 决定是否区分大小写；函数名与属性另有独立开关。

### 字面量

| 种类 | 形式 |
| --- | --- |
| 十进制整数 | `123`、`-5` |
| 十六进制整数 | `0x1F` |
| 二进制整数 | `0b1010` |
| 字符串 | `"..."` |
| 格式化字符串 | `@"..."` |

### 运算符

见[表达式](#表达式)与[运算](../translation/Operator)。

## 数据模型

### 值类型

只有两种值类型：

- **整数**：64 位有符号整数（`-9223372036854775808` ～ `9223372036854775807`）；
- **字符串**：文本。

两者**不会隐式转换**，需用 `TOSTR` / `TOINT`。

### 变量

变量由**作用域**、**形态**、**值类型**三个维度决定：

| 作用域 | 定义位置 | 可见性 |
| --- | --- | --- |
| 私有变量 | 函数内 `#DIM` / `#DIMS` | 仅该函数 |
| 局部变量 | `LOCAL` / `LOCALS` / `ARG` / `ARGS` | 按函数区分（实为 `LOCAL@函数名` 静态变量） |
| 广域变量 | `ERH` 中 `#DIM` / `#DIMS` | 所有函数 |
| 全局变量 | `#DIM GLOBAL` | 跨存档共享 |

形态上分为：非数组、一维数组、多维数组、角色变量、伪变量。数组下标从 `0` 开始。

### 角色变量

第一维是**登录编号**（0、1、2……），如 `NAME:0`、`CFLAG:0:5`。省略时默认指 `TARGET`。

## 执行模型

### 函数

```
@函数名{, 参数}
  ; 函数体
  RETURN
```

- 函数从 `@` 行开始，到下一个 `@` 行或文件末尾结束；
- `CALL` 调用后返回，`JUMP` 跳转后不返回；
- `RETURN` 可带返回值，结果放入 `RESULT` / `RESULTS`。

### 事件函数

名称以 `EVENT` 开头（以及 `@SYSTEM_TITLE`、`@SHOW_SHOP` 等约定名称）的函数，由引擎在固定时机调用。多个同名事件函数**全部**会被调用（除非带 `#ONLY`）。

### 执行循环

引擎的主循环按顺序取下一行并执行：

1. 取行（`ShiftNextLine`）；
2. 若为指令行，解析参数；
3. 分派给原生指令、流程控制或用户函数；
4. 每若干行检查一次死循环。

### 错误

加载期错误（语法）会使引擎终止；运行期错误会打印信息、写出 `emuera.log` 并终止脚本。`ASSERT` / `THROW` 可主动报错。

## 导入系统

- 引擎读取 `ERB/` 下所有 `*.ERB`，以及头文件 `*.ERH`；
- 处理顺序：`CSV` → `*.ERH` → `*.ERB`；
- 头文件中通过 `#DIM` / `#DIMS` 定义广域变量，通过 `#DEFINE` 定义宏；
- 宏在 `ERB` 加载时按字符串替换，支持多重展开；
- 文件读取顺序默认依赖文件系统，可用 `読み込み順をファイル名順にソートする` 固定。

## 表达式

优先级由高到低：单目 → 算术 → 位移 → 比较 → 位 → 逻辑 → 三元 → 赋值。

- 比较结果为 `1`（真）/ `0`（假）；
- `&&` / `||` 短路求值；
- 三元：`条件 ? 真值 # 假值`，字符串版套 `\@ … \@`；
- FORM：`{数值表达式}`、`%字符串表达式%`，可指定宽度与对齐。

详见[ERB 的表达式](../reference/ERB_Expressions)。

## 简单语句

- 赋值：`变量 = 值`、`变量 '= 字符串表达式`、复合赋值 `+=` 等；
- 命令：`PRINTL …`、`INPUT …` 等；
- 单行条件：`SIF 条件`（只作用于下一行）；
- 跳转：`GOTO 标签`、`JUMP 函数`、`CALL 函数`、`RETURN`；
- 注释：`;`。

详见[ERB 的语句](../reference/ERB_Statements)。

## 复合语句

| 结构 | 用途 |
| --- | --- |
| `IF` / `ELSEIF` / `ELSE` / `ENDIF` | 条件分支 |
| `REPEAT` / `REND` | 计数循环（`COUNT`） |
| `FOR` / `NEXT` | 自定义变量的循环 |
| `WHILE` / `WEND`、`DO` / `LOOP` | 条件循环 |
| `SELECTCASE` / `CASE` / `CASEELSE` / `ENDSELECT` | 多路分支 |
| `TRYC…` / `CATCH` / `ENDCATCH` | 捕获“函数不存在” |
| `TRYCALLLIST` / `FUNC` / `ENDFUNC` | 列表调用 |
| `BREAK` / `CONTINUE` | 循环控制 |

详见[ERB 的复合语句](../reference/ERB_Compound_Statements)。

## 顶级组件

一个 `ERB` 文件由若干顶级组件构成：

- **函数定义**：`@名称{, 参数}` 开始，到下一个函数定义或文件末尾结束；
- **头文件内容**（仅 `ERH`）：`#DIM` / `#DIMS` / `#DEFINE`，不得包含其它内容；
- 函数可带属性（`#FUNCTION`、`#FUNCTIONS`、`#PRI`、`#LATER`、`#SINGLE`、`#ONLY`）与定义（`#LOCALSIZE` 等），必须紧跟在函数定义之下。

## 完整的语法规范

以下为简化的 EBNF 描述（`{}` 表示可重复，`[]` 表示可选）：

```ebnf
program       = { top_level } ;

top_level     = function | header_directive | comment | blank ;

function      = "@" ident [ "," param_list ] NEWLINE
                { attribute }
                { statement } ;

attribute     = "#" ident [ argument ] NEWLINE ;

param_list    = param { "," param } ;
param         = [ "#DIM" | "#DIMS" ] ident [ "=" literal ] ;

statement     = label
              | assignment
              | command
              | sif_statement
              | jump_statement
              | if_statement
              | loop_statement
              | select_statement
              | try_statement
              | comment
              | blank ;

label         = "$" ident NEWLINE ;
assignment    = lvalue assign_op expression NEWLINE ;
assign_op     = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "'=" ;

sif_statement = "SIF" expression NEWLINE statement ;
jump_statement= ( "GOTO" | "JUMP" | "CALL" ) ident [ "," arg_list ] NEWLINE
              | "RETURN" [ expression { "," expression } ] NEWLINE
              | "RETURNF" expression NEWLINE ;

if_statement  = "IF" expression NEWLINE
                { statement }
                { "ELSEIF" expression NEWLINE { statement } }
                [ "ELSE" NEWLINE { statement } ]
                "ENDIF" NEWLINE ;

loop_statement= "REPEAT" expression NEWLINE { statement } "REND" NEWLINE
              | "FOR" ident "," expression "," expression [ "," expression ] NEWLINE
                { statement } "NEXT" NEWLINE
              | "WHILE" expression NEWLINE { statement } "WEND" NEWLINE
              | "DO" NEWLINE { statement } "LOOP" expression NEWLINE ;

select_statement = "SELECTCASE" expression NEWLINE
                   { "CASE" case_expr { "," case_expr } NEWLINE { statement } }
                   [ "CASEELSE" NEWLINE { statement } ]
                   "ENDSELECT" NEWLINE ;
case_expr     = expression [ "TO" expression ] | "IS" operator expression ;

try_statement = ( "TRYCALL" | "TRYCJUMP" | "TRYCGOTO" ) ident [ "," arg_list ] NEWLINE
                { statement }
                "CATCH" NEWLINE { statement } "ENDCATCH" NEWLINE ;

expression    = ternary ;
ternary       = logical [ "?" expression "#" expression ] ;
logical       = compare { ( "&&" | "||" | "^^" | "!&" | "!|" ) compare } ;
compare       = bitwise { ( "==" | "!=" | "<" | ">" | "<=" | ">=" ) bitwise } ;
bitwise       = shift { ( "&" | "|" | "^" ) shift } ;
shift         = additive { ( "<<" | ">>" ) additive } ;
additive      = multiplicative { ( "+" | "-" ) multiplicative } ;
multiplicative= unary { ( "*" | "/" | "%" ) unary } ;
unary         = [ "+" | "-" | "!" | "~" ] primary ;
primary       = literal | variable | function_call | "(" expression ")" ;
```

> 这是一个便于理解的近似描述，未覆盖 `FORM` 语法、三连符号、行连接 `{}`、预处理宏展开等细节。完整行为请以源码与[参考](../reference/)为准。
