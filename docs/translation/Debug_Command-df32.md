# 调试命令（风飏@df32翻译版）

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/debugcom

译者：[风飏@df32](https://github.com/df32)

也可跳转至：[原版](Debug_Command)

> 在默认情况下，调试命令是被禁用的。
> 你需要在设置对话框中勾选`启用调试命令`，并重新启动Emuera，才能使用调试命令。

当脚本运行时（游戏过程中），输入以`@`开头的文本将被Emuera识别为**调试命令**。

调试命令键入后，Emuera会立即执行这些代码，就像在ERB脚本文件中运行代码一样。

- 是否大小写敏感取决于设置中的`忽略大小写`（`大文字小文字の違いを無視する`）。
- 建议在调试模式下运行游戏来调试当前的版本。
- 调试命令的格式必须与ERB相同。

示例：
```
;调试模式下
@MONEY = 10000
@PRINTV FLAG:200
@PRINTFORM %NAME:MASTER%的CFAG(1) = {CFLAG:MASTER:1}
@ADDCHARA 1
```

如果只输入变量或表达式，则将返回这些值
```
@ FLAG:200
@ @"%NAME:MASTER%的CFLAG(1) = {CFLAG:MASTER:1}"
```

注意，调试命令无法使用控制流的指令，例如`IF`或`CALL`。
此外请求输入的指令也无法使用，例如`INPUT`或`WAIT`。

下面是一些特殊的调试命令：
- @REBOOT
	- 重新启动，读取并加载emuera.config、csv、erb。
- @OUTPUT 
	- 将窗口当前的日志输出到emuera.log中。若文件已经存在则覆盖。
	- 这与`OUTPUTLOG`指令的动作相同。
- @EXIT 
	- 结束并关闭Emuera。与`QUIT`指令动作相同。
- @CONFIG 
	- 打开设置对话框。
- @DEBUG 
	- 打开调试对话框。仅在调试模式下有效。

除了上述的这些命令，也就是直接执行脚本代码的情况下，玩家的名字将强制变更为`欺诈师`（`イカサマ`）。

这是因为调试命令可以很方便的用来作弊，是防止调试命令被滥用的措施。
