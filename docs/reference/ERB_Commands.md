# ERB 的命令

命令是让引擎“做事”的语句。EraBasic 的命令非常多，本页按用途分类整理成索引，并给出常用命令。每个命令的完整签名、参数与示例，请点击分类标题进入[命令](../translation/Command)详解。

## 输出与显示

| 命令 | 说明 |
| --- | --- |
| `PRINT` | 输出一行（不换行） |
| `PRINTL` | 输出并换行 |
| `PRINTS` / `PRINTV` / `PRINTFORM` | 输出字符串 / 数值 / 格式化字符串 |
| `PRINTC` | 按指定宽度对齐输出 |
| `PRINTBUTTON` | 生成可点击按钮 |
| `PRINTDATA` | 随机显示一组文本 |
| `CLEARLINE` | 删除若干行 |
| `DRAWLINE` | 绘制分隔线 |

→ [PRINT 系列](../translation/Command#print系列)

## 显示、字体与颜色

| 命令 | 说明 |
| --- | --- |
| `SETCOLOR` / `RESETCOLOR` | 设置 / 重置文字颜色 |
| `SETBGCOLOR` / `RESETBGCOLOR` | 设置 / 重置背景颜色 |
| `SETCOLORBYNAME` | 用颜色名设置文字颜色 |
| `FONTBOLD` / `FONTITALIC` / `FONTREGULAR` | 加粗 / 倾斜 / 恢复 |
| `FONTSTYLE` | 设置文字样式 |
| `SETFONT` / `CHKFONT` | 设置 / 检查字体 |
| `ALIGNMENT` | 设置对齐方式 |
| `REDRAW` | 控制重绘 |

→ [显示处理](../translation/Command#显示处理·字体处理·显示方式参考)

## 字符串操作

| 命令 | 说明 |
| --- | --- |
| `TOSTR` / `TOINT` | 数值与字符串互转 |
| `STRLEN` / `STRLENS` | 求字符串长度 |
| `SUBSTRING` / `CHARATU` | 截取子串 / 取字符 |
| `STRFIND` / `STRCOUNT` | 查找 / 统计 |
| `SPLIT` / `REPLACE` | 分割 / 替换 |
| `UNICODE` / `ENCODETOUNI` | Unicode 与编码 |

→ [字符串操作](../translation/Command#字符串操作·引用)

## 算术

| 命令 | 说明 |
| --- | --- |
| `ABS` / `SIGN` / `SQRT` | 绝对值 / 符号 / 平方根 |
| `MAX` / `MIN` / `LIMIT` / `INRANGE` | 最大 / 最小 / 限制 / 区间判断 |
| `GETBIT` / `SETBIT` / `CLEARBIT` / `INVERTBIT` | 位操作 |
| `POWER` | 乘方 |

→ [算术](../translation/Command#算术)

## 角色操作

| 命令 | 说明 |
| --- | --- |
| `ADDCHARA` | 添加角色 |
| `DELCHARA` / `DELALLCHARA` | 删除单个 / 全部角色 |
| `SWAPCHARA` / `SORTCHARA` | 交换 / 排序 |
| `GETCHARA` / `FINDCHARA` | 查找角色 |
| `COPYCHARA` / `ADDCOPYCHARA` | 复制角色 |
| `EXISTCSV` | 判断角色是否已定义 |

→ [角色操作](../translation/Command#角色操作·引用)

## 变量与 CSV 引用

| 命令 | 说明 |
| --- | --- |
| `VARSIZE` | 取数组大小 |
| `VARSET` / `CVARSET` | 批量赋值 |
| `ARRAYSHIFT` / `ARRAYREMOVE` / `ARRAYSORT` / `ARRAYCOPY` | 数组操作 |
| `RESETDATA` / `RESETGLOBAL` | 初始化数据 |
| `CSVNAME` / `CSVBASE` / `CSVABL` 等 | 直接读取 CSV 数据 |
| `GETNUM` | 由名称取编号 |

→ [变量操作](../translation/Command#变量操作·变量引用·csv引用)

## 存档

| 命令 | 说明 |
| --- | --- |
| `SAVEDATA` / `LOADDATA` | 直接保存 / 读取指定槽位 |
| `SAVEGAME` / `LOADGAME` | 呼出标准存档 / 读取界面 |
| `CHKDATA` / `DELDATA` | 检查 / 删除存档 |
| `SAVEGLOBAL` / `LOADGLOBAL` | 保存 / 读取全局变量 |
| `OUTPUTLOG` | 输出日志 |

→ [游戏存档](../translation/Command#游戏存档的操作)

## 输入与等待

| 命令 | 说明 |
| --- | --- |
| `INPUT` / `INPUTS` | 读取数值 / 字符串 |
| `TINPUT` / `TINPUTS` | 带时间限制的输入 |
| `ONEINPUT` / `ONEINPUTS` | 只接受一个字符 |
| `TWAIT` / `WAITANYKEY` | 等待 / 任意键 |

→ [输入与等待](../translation/Command#输入·等待)

## 流程控制

| 命令 | 说明 |
| --- | --- |
| `IF` / `ELSEIF` / `ELSE` / `ENDIF` | 条件分支 |
| `REPEAT` / `REND`、`FOR` / `NEXT`、`WHILE` / `WEND`、`DO` / `LOOP` | 循环 |
| `SELECTCASE` / `CASE` / `CASEELSE` / `ENDSELECT` | 多路分支 |
| `CONTINUE` / `BREAK` | 继续 / 跳出循环 |
| `GOTO` / `JUMP` / `CALL` | 跳转 / 调用 |
| `RETURN` / `RETURNFORM` / `RETURNF` | 返回 |

→ [循环·分支语法](../translation/Command#循环·分支语法)、[CALL·JUMP·GOTO 系](../translation/Command#call·jump·goto系)、[RETURN 系](../translation/Command#return系)

## 随机数

| 命令 | 说明 |
| --- | --- |
| `RANDOMIZE` | 以指定值初始化随机数 |
| `DUMPRAND` / `INITRAND` | 保存 / 恢复随机数状态 |

→ [随机数的控制](../translation/Command#随机数的控制)

## 系统与调试

| 命令 | 说明 |
| --- | --- |
| `BEGIN` | 切换游戏流程 |
| `DOTRAIN` / `CALLTRAIN` | 强制训练 / 连续训练 |
| `THROW` / `ASSERT` | 主动报错 |
| `DEBUGPRINT` 等 | 调试输出 |

→ [调试辅助](../translation/Command#调试辅助·系统流的控制)、[DEBUG 系](../translation/Command#debug系)

## 其他

| 分类 | 链接 |
| --- | --- |
| 日期与时间 | [日期·时间的获取](../translation/Command#日期·时间的获取) |
| HTML | [HTML 系](../translation/Command#html系) |
| 工具提示 | [工具提示系](../translation/Command#工具提示系) |
| 图像处理 | [图像处理相关](../translation/Command#图像处理相关) |

> 各命令的参数类型（`<数式>`、`<字符串表达式>` 等）见[值类型规范](../translation/Command#值类型规范)。
