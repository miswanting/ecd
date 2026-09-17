# 常见问题（FAQ）

这里汇总新手最常遇到的问题。如果没找到答案，可以到[参考](../reference/)区按主题查阅，或到[参与编写文档](../contribute/)了解如何提问。

## 起步

### Q：Emuera 在哪里下载？

A：Emuera 的官方发布页在 OSDN（见[快速开始](Quick_Start)）。由于原始项目已停止维护，社区也有若干改造版（EM+EE 等）可用。下载后把 `exe` 单独放进一个空文件夹即可。

### Q：启动就报「找不到 csv 文件夹 / erb 文件夹」？

A：在 `exe` 同目录下手动新建 `CSV` 和 `ERB` 两个文件夹（大小写不敏感，但建议照写）。详见[快速开始](Quick_Start)。

### Q：点了「从头开始」报 `関数"@EVENTFIRST"が見つかりません`？

A：`ERB/` 里还没有定义 `@EVENTFIRST` 函数。新建一个 `System.erb` 并写下：

```erb
@EVENTFIRST
  QUIT
```

## 报错

### Q：怎么读懂报错信息？

A：报错一般会告诉你**在哪出错**和**出了什么错**。看不懂时，打开根目录下的 `emuera.log`，里面有更详细的记录。常见错误的含义见[错误索引表](../reference/Error_Index)，排错方法见[错误与异常](tutorials/Error)。

### Q：报 `IFに対応するENDIFが設定されていない`？

A：复合语句必须成对闭合。检查 `IF`…`ENDIF`、`REPEAT`…`REND`、`FOR`…`NEXT` 是否配对，用编辑器的折叠功能最容易发现。

### Q：报 `'='の前後で型が一致しません`？

A：赋值号两边类型不同。字符串变量要用 `#DIMS` 定义，值要加双引号；数值变量不能装文本。

### Q：报 `配列の範囲外です`？

A：数组下标从 0 开始，访问了不存在的元素。检查下标是否越界或为负。

## 脚本

### Q：`Print` 和 `PrintS` 有什么区别？

A：`Print` 打印后面的**字面文本**，`PrintS` 打印**字符串变量里的值**。还有 `PrintV` 用于数值变量。详见[数值与文本](tutorials/Type)。

### Q：为什么 `5/3` 等于 1 而不是 1.66？

A：EraBasic 的数值是整数，`/` 是整除。想保留小数，通常用「先乘 100 再除」的办法。

### Q：函数怎么传参数、怎么返回值？

A：参数用 `ARG`（数值）/ `ARGS`（字符串），返回值放在 `RESULT` 里。详见[函数的定义与用法](tutorials/Function)。

### Q：事件函数是什么？为什么引擎会自己调用它们？

A：`@EVENTFIRST`、`@SHOW_SHOP` 等是引擎在固定时机自动调用的「框架函数」。完整清单见[内置流程](tutorials/System_Flow)。

## 存档

### Q：`SAVEDATA` 和 `SAVEGAME` 有什么区别？

A：`SAVEDATA` 直接存到指定编号的槽位，可以在脚本任何位置调用；`SAVEGAME` 呼出引擎自带存档界面，只能在 `SHOP` 流程中调用。详见[游戏的保存与加载](tutorials/Save_Load)。

### Q：读档前为什么要先 `CHKDATA`？

A：`LOADDATA` 读取失败会直接报错。先用 `CHKDATA` 检查，`RESULT` 为 0 时才读取。

### Q：存档是乱码 / 换台电脑读不了？

A：存档默认使用 Shift-JIS 编码。可以在配置中改为 UTF-8 或二进制格式保存，但这会影响与旧版 Eramaker/Emuera 的兼容性。详见[配置项详解](../translation/Config_Settings)。

## 兼容性

### Q：同一个脚本在不同引擎里表现不一样？

A：不同引擎/改造版支持的特性不同。Emuera 与 Eramaker 的差异见[与 Eramaker 的差异](../translation/Difference)；配置里还有一组「兼容性开关」可以让 Emuera 模仿旧行为。

### Q：升级 Emuera 后脚本报错 / 显示错乱怎么办？

A：多与兼容性开关有关。例如显示错乱可以尝试`ver1739以前の非ボタン折り返しを再現する`，函数参数报错可以尝试`ユーザー関数の引数に自動的にTOSTRを補完する`。逐项说明见[配置项详解](../translation/Config_Settings#兼容性)。

## 性能

### Q：游戏很卡怎么办？

A：常见瓶颈在循环。能一次算完的不要每次输入都重算；批量赋值用 `VARSET` 等内置指令，比手写 `FOR` 循环快得多。详见[开发实战经验与技巧](advanced/Experience)。

### Q：脚本陷入死循环了？

A：Emuera 会在超过「无限循环警告的毫秒数」且期间没有执行 `WAIT` 时弹出警告。把该值与 `WAIT` 配合使用即可。

## 发布

### Q：怎么把游戏交给别人玩？

A：把 `exe`、`CSV/`、`ERB/`（以及 `resources/` 等资源）一起打包即可。注意**不要**把 `emuera.config` 里的个人设置强加给玩家，除非确有需要（此时用 `_fixed.config`）。同时确认目标玩家使用的引擎版本支持你用到的特性。

## 相关链接

- [快速开始](Quick_Start)
- [入门教程](tutorials/)
- [参考](../reference/)
- [错误索引表](../reference/Error_Index)
