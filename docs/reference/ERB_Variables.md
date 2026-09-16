# ERB 的变量

变量是存放值的“有名字的容器”。本页按**作用域**和**形态**梳理 EraBasic 的变量体系，并附常用变量速查。完整的变量表请参阅[常量与变量](../translation/Variable)。

## 按作用域分类

| 作用域 | 说明 | 定义方式 |
| --- | --- | --- |
| 私有变量 | 只能在该函数内使用 | 函数中 `#DIM` / `#DIMS` |
| 局部变量 | <HoverCard kind="var" name="LOCAL" />、<HoverCard kind="var" name="LOCALS" />、<HoverCard kind="var" name="ARG" />、<HoverCard kind="var" name="ARGS" />，按函数区分 | 内置，或 `#LOCALSIZE` 调整大小 |
| 广域变量 | 所有函数共享 | `ERH` 中 `#DIM` / `#DIMS` |
| 全局变量 | 跨存档共享 | `#DIM GLOBAL` / `SAVEGLOBAL` |

> `LOCAL`、`LOCALS` 实际上是以 `LOCAL@函数名` 为名的公共静态变量，离开函数后值仍会保留——这一点和一般编程语言的局部变量不同。

## 按值的类型分类

| 类型 | 说明 | 定义前缀 |
| --- | --- | --- |
| 数值型 | 64 位整数 | `#DIM` |
| 字符串型 | 文本 | `#DIMS` |

## 按形态分类

| 形态 | 说明 | 例子 |
| --- | --- | --- |
| 非数组变量 | 只有一个值 | `A`、<HoverCard kind="var" name="MONEY" /> |
| 一维数组 | `变量:下标` | `FLAG:0`、`STR:10` |
| 多维数组 | `变量:下标:下标[:下标]` | `DA:0:1`、`TA:1:2:3` |
| 角色变量 | 第一维是角色编号 | `NAME:0`、`CFLAG:0:5` |
| 伪变量 | 写成变量、实为函数 | `RAND:100`、<HoverCard kind="var" name="CHARANUM" /> |

## 常用内置变量速查

### 流程与控制

| 变量 | 说明 |
| --- | --- |
| <HoverCard kind="var" name="RESULT" /> / <HoverCard kind="var" name="RESULTS" /> | 命令的数值 / 字符串结果 |
| <HoverCard kind="var" name="COUNT" /> | `REPEAT` 的计数器 |
| <HoverCard kind="var" name="MASTER" /> | 主角的登录编号 |
| <HoverCard kind="var" name="TARGET" /> | 当前目标的登录编号 |
| <HoverCard kind="var" name="ASSI" /> | 助手的登录编号 |
| <HoverCard kind="var" name="CHARANUM" /> | 当前角色总数 |
| <HoverCard kind="var" name="SELECTCOM" /> | 当前选择的训练命令编号 |
| <HoverCard kind="var" name="DAY" /> / <HoverCard kind="var" name="TIME" /> / <HoverCard kind="var" name="MONEY" /> | 天数 / 时间 / 金钱 |

### 显示与输入

| 变量 | 说明 |
| --- | --- |
| <HoverCard kind="var" name="LINECOUNT" /> | 当前已显示的行数 |
| <HoverCard kind="var" name="ISTIMEOUT" /> | `TINPUT` 系是否超时（1 为超时） |
| `SAVEDATA_TEXT` | 存档的标题文本 |
| <HoverCard kind="var" name="RANDDATA" /> | 随机数状态（配合 `DUMPRAND` / `INITRAND`） |

### 系统常量

| 变量 | 说明 |
| --- | --- |
| `__INT_MAX__` | 64 位有符号整数最大值 |
| `__INT_MIN__` | 64 位有符号整数最小值 |
| `__FILE__` / `__LINE__` / `__FUNCTION__` | 当前文件名 / 行号 / 函数名（调试用） |

## 常用的角色变量

| 变量 | 说明 |
| --- | --- |
| <HoverCard kind="var" name="NO" /> | 角色的 CSV 编号 |
| <HoverCard kind="var" name="NAME" /> / <HoverCard kind="var" name="CALLNAME" /> / <HoverCard kind="var" name="NICKNAME" /> | 名字 / 称呼 / 昵称 |
| <HoverCard kind="var" name="BASE" /> / <HoverCard kind="var" name="MAXBASE" /> | 基础值 / 基础最大值 |
| <HoverCard kind="var" name="ABL" /> / <HoverCard kind="var" name="TALENT" /> / <HoverCard kind="var" name="EXP" /> / <HoverCard kind="var" name="MARK" /> | 能力 / 素质 / 经验 / 刻印 |
| <HoverCard kind="var" name="CFLAG" /> | 角色标志（自定义数据常用） |
| <HoverCard kind="var" name="PALAM" /> / <HoverCard kind="var" name="STAIN" /> / <HoverCard kind="var" name="EX" /> / `JUEL` | 参数 / 污渍 / 经验 / 珠 |
| <HoverCard kind="var" name="RELATION" /> | 相性（对其他角色的关系） |

## CSV 派生的名称变量

这些变量保存了 CSV 中定义的**名称**，常用于显示或作为字符串索引：

| 变量 | 对应 CSV |
| --- | --- |
| <HoverCard kind="var" name="ABLNAME" /> / <HoverCard kind="var" name="TALENTNAME" /> / <HoverCard kind="var" name="EXPNAME" /> / <HoverCard kind="var" name="MARKNAME" /> | `Abl.csv` / `Talent.csv` / `Exp.csv` / `Mark.csv` |
| <HoverCard kind="var" name="PALAMNAME" /> / `STAINNAME` / <HoverCard kind="var" name="ITEMNAME" /> | `Palam.csv` / `Stain.csv` / `Item.csv` |
| <HoverCard kind="var" name="BASENAME" /> / <HoverCard kind="var" name="CFLAGNAME" /> / `STRNAME` / <HoverCard kind="var" name="TRAINNAME" /> | 基础 / 标志 / 文本 / 训练 |

例如 `ABLNAME:3` 就是 `Abl.csv` 中编号 3 对应的名称。

## 相关链接

- [常量与变量](../translation/Variable)
- [用户自定义变量](../translation/Custom_Variable)
- [头文件（ERH）](../translation/Header_File)
- [CSV 文件参考](CSV_File)
- [ERB 的表达式](ERB_Expressions)
