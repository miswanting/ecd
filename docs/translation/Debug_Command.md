# 调试命令

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/debugcom

调试命令默认处于禁用状态。

如果你想使用它，请在设置对话框中勾选`启用调试命令`，然后重新启动 Emuera。

该功能是没有调试模式的版本所提供的简易功能，建议使用[调试模式](Debug_Mode)进行调试。

在脚本运行过程中（游戏过程中），输入以 `@` 开头的文本，就会被识别为**调试命令**。

调试命令的格式与 `ERB` 相同，Emuera 会立即执行这些代码，就像在 `ERB` 脚本文件中运行代码一样。

是否区分大小写取决于 `emuera.config` 中的`忽略大小写`选项。

示例：

```erb
;调试模式下
@MONEY = 10000
@PRINTV FLAG:200
@PRINTFORM %NAME:MASTER%的CFLAG(1) = {CFLAG:MASTER:1}
@ADDCHARA 1
```

另外，直接输入变量或表达式也可以输出其值（`@` 后面的空格不是必需的）。

```erb
@ FLAG:200
@ @"%NAME:MASTER%的CFLAG(1) = {CFLAG:MASTER:1}"
```

但是，像 `IF`、`CALL` 这样会改变执行流程的指令，以及像 `INPUT`、`WAIT` 这样需要输入的指令无法使用。

以下是一些 `ERB` 中没有的指令：

- `@REBOOT`：重新启动，并重新读取 `emuera.config`、`csv` 和 `erb` 文件。
- `@OUTPUT`：把当前窗口的日志输出到 `emuera.log`。如果文件已存在则覆盖。与 `OUTPUTLOG` 指令行为相同。
- `@EXIT`：退出 Emuera。与 `QUIT` 指令行为相同。
- `@CONFIG`：打开设置对话框。
- `@DEBUG`：打开调试对话框。仅在以[调试模式](Debug_Mode)启动时有效。

除上述命令之外，也就是直接执行普通 `ERB` 指令时，`MASTER` 的 `NAME` 和 `CALLNAME` 会被强制改为`作弊者`（`イカサマ`）。

这是因为调试命令本身就是一种作弊手段，所以采取了防止滥用的措施。
