<!-- <script setup>
import FlowTitle from './FlowTitle.vue'
</script> -->
# 流程图

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/flow

流程图是用DiagramDesigner创建的。

数据文件在[这里]()。

在以下描述中，除非另有说明，否则句子的主语是`Emuera.exe`。

## TITLE

在启动和读取`ERB`后，并在运行`BEGIN TITLE`后。

<!-- <FlowTitle /> -->

![](https://osdn.net/projects/emuera/wiki/flow/attach/title.gif)

如果`@SYSTEM_TITLE`被定义了，它就会被调用，其他的就不做了。

如果`@SYSTEM_TITLE`在没有`BEGIN`或`LOADDATA`指令的情况下被`RETURN`，就没有下一个操作要执行，错误终止。

如果没有定义`@SYSTEM_TITLE`，就会使用标准的标题程序。

标准标题屏幕上的文字，如`[0]从头开始`，可以被改变。

详见[_replace.csv]()。

如果选择`[0]从头开始`，首先要做的是初始化数据。

具体来说，`STR`和`PRINTLV`的初始值被设置（与`RESETDATA`指令相同），`ADDCHARA 0`，等等。

接下来，`BEGIN FIRST`被执行，并过渡到`FIRST`。

如果选择了`[1]加载和启动`，如果定义了，就会调用`@TITLE_LOADGAME`。

如果没有定义，就会显示标准加载屏幕。

这与`@LOADGAME`所调用的屏幕略有不同。

## FIRST

当在标题屏幕上选择了`[0]从头开始`，并且在执行了`BEGIN FIRST`之后。

![](https://osdn.net/projects/emuera/wiki/flow/attach/first.gif)

如果在`@EVENTFIRST`中没有执行`BEGIN`指令，就没有下一个要执行的进程，错误结束。

## SHOP

在加载和运行`BEGIN SHOP`后。

![](https://osdn.net/projects/emuera/wiki/flow/attach/shop.gif)

如果在加载后，`@EVENTSHOP`未被处理。

在`@SHOW_SHOP`调用之后，要求输入。如果输入是0-99，则处理购买，否则就调用`@USERSHOP`。
这个范围可以在`_replace.csv`中改变。 详见[_replace.csv]()。

请注意，`@PRINT_ITEMSHOP`指令显示的项目范围是`ITEMNAME`或`ITEMSALES`中的元素数，以小者为准（标准是1000）。

当购买过程被调用时，要确定相应的`ITEMSALES`是否为非零，或者MONEY是否大于`ITEMPRICE`。

如果购买决策失败，则要求再次输入。

在 Eramaker 中，如果购买失败，用户必须从`@SHOW_SHOP`重新开始。

如果购买决策成功，将`ITEM`编号分配给`BOUGHT`变量，将`ITEM:BOUGHT`增加1，并通过`ITEMPRICE:BOUGHT`减少`MONEY`。

呼叫`@EVENTBUY`，返回`@SHOW_SHOP`。

除非在某个地方发出`BEGIN`指令，否则你永远不会离开`SHOP`。

## TRAIN

在执行`BEGIN TRAIN`后。

![](https://osdn.net/projects/emuera/wiki/flow/attach/train.gif)

首先，一些变量会被初始化。

具体来说，将0分配给`ASSIPLAY:0`，-1分配给`PREVCOM:0`，-1分配给`NEXTCOM:0`。

此外，`TFLAG`被设置为0，`GOTJUEL`、`TEQUIP`、`EX`、`PALAM`和`SOURCE`的所有字符都被设置为0。

最后，为所有字符的`STAIN:2`分配2，为`STAIN:3`分配1，为`STAIN:4`分配8，为其他分配0。

当你离开训练流程时，这些值不会被初始化，所以如果你在商店里保存，这些值会保留在你的保存数据中。

你可以通过`@SAVEINFO`或其他方法将角色的`GOTJUEL`、`TEQUIP`、`EX`、`PALAM`等指定为0来保存保存数据的大小。

这里不解释`NEXTCOM`的非负值的行为，因为它有一个严重的错误。

Emuera的`NEXTCOM`是为了重现旧代码的行为而实施的，包括上述的缺陷，并不打算用于新的用途。

关于`CALLTRAIN`指令，见[扩展]()。

显示调用`@SHOW_STATUS`后可执行的`TRAIN`。

搜索`@COM_ABLExx`，寻找那些有定义的`TRAINNAME`。

搜索范围（图中的`MAX_TRAIN`）对于Emuera来说是到`VariableSize.csv`中指定的`TRAINNAME`范围，对于 Eramaker 来说是到2147483647。

如果`@COM_ABLExx`没有被定义或返回非零值，那么它就是可执行的，`TRAINNAME`被打印出来。

如果`@COM_ABLExx`返回0，则不能执行，不显示`TRAINNAME`。

在这个时候，它记住了是否可执行。 (这并不意味着`@COM_ABLExx`在运行时被再次调用）。

显示`TRAINNAME`后，调用`@SHOW_USERCOM`。

在`@SHOW_USERCOM`之后，输入前初始化`UP`、`DOWN`和`LOSEBASE`。

之后，要求输入。

输入的结果与`@COM_ABLExx`的结果进行核对，如果该命令是可执行的，则调用相应的`@COMxx`。

首先，`TRAIN`号被分配给`SELECTCOM`变量，所有字符的`NOWEX`的所有元素被设置为0。

接下来，`@EVENTCOM`被调用，接着是相应的`@COM`。

如果`@COM`返回一个非零值，则调用`@SOURCE_CHECK`、`@EVENTCOMEND`并返回`@SHOW_STATUS`。

在`@SOURCE_CHECK`完成后，在调用`@EVENTCOMEND`前，将所有字符的`SOURCE`的所有元素设置为0。

如果在`@SOURCE_CHECK`之后，`@EVENTCOMEND`不存在或者在`@EVENTCOMEND`中没有给出WAIT指令，那么在`@SHOW_STATUS`之前就会产生一个`WAIT`。

如果`@COM`返回0，则返回到`@SHOW_STATUS`。

注意，当`UPCHECK`指令被执行时，`UP`和`DOWN`的值与`TARGET`的`PALAM`相加和相减，并且`UP`和`DOWN`的值都被分配为0。

如果输入的结果不是可执行的命令，则调用`@USERCOM`并返回`@SHOW_STATUS`。

除非在某个地方发出`BEGIN`命令，否则你永远不会离开`TRAIN`。

## ABLUP

在执行了`BEGIN ABLUP`之后。

![](https://osdn.net/projects/emuera/wiki/flow/attach/ablup.gif)

调用`@SHOW_JUEL`和`@SHOW_ABLUP_SELECT`来请求输入。

如果输入的范围是0-99，找到相应的`@ABLUP`。

如果定义了相应的`@ABLUP`，则调用`@ABLUP`并返回到`@SHOW_JUEL`。

如果没有定义，就会再次要求输入。

在 Eramaker 中，如果没有定义，就从`@SHOW_JUEL`重新开始。

如果输入值在0-99范围之外，则调用`@USERABLUP`并返回`@SHOW_JUEL`。

从Emuera 1.705开始，没有办法改变这个范围。

除非在某处给出`BEGIN`指令，否则你永远无法从`ABLUP`中出来。

## AFTERTRAIN

在执行`BEGIN AFTERTRAIN`后。

![](https://osdn.net/projects/emuera/wiki/flow/attach/aftertrain.gif)

如果在`@EVENTEND`内没有执行`BEGIN`指令，就没有下一个进程可以执行，错误结束。

## TURNEND

在执行了`@BEGIN TURNEND`之后。

![](https://osdn.net/projects/emuera/wiki/flow/attach/turnend.gif)

如果在`@EVENTTURNEND`内没有执行`BEGIN`指令，就没有下一个进程可以执行，错误结束。

## LOADGAME

当执行`LOADGAME`指令时。

![](https://osdn.net/projects/emuera/wiki/flow/attach/loadgame.gif)

`BEGIN`指令包含`RETURN`指令，`BEGIN`下面的语句从不执行，但`LOADDATA`和`SAVEDATA`指令与`CALL`指令一样返回原处。

然而，当`LOAD`被执行时，它就会忘记原来的位置并过渡到`LOADDATAEND`。

## SAVEGAME

当`@SAVEGAME`指令被执行时。

![](https://osdn.net/projects/emuera/wiki/flow/attach/savegame.gif)

调用`@SAVEINFO`的时机是在实际写完之前。

## LOADDATAEND

在`LOADGAME`中执行了`LOAD`后，在执行了`LOADDATA`指令后。

![](https://osdn.net/projects/emuera/wiki/flow/attach/loaddataend1821.gif)

当执行`LOAD`时，所有以前的状态，包括被调用的函数，都被擦除。

Eramaker 在这里什么都不做，就过渡到`@SHOW_SHOP`。

在 Emuera 中，如果`@SYSTEM_LOADEND`被定义，`@SYSTEM_LOADEND`将被执行。

如果`BEGIN`指令在`@SYSTEM_LOADEND`结束之前被执行，它就会过渡到那里。

否则，如果定义了`@EVENTLOAD`，`就会执行@EVENTLOAD`。

如果`BEGIN`指令在`@EVENTLOAD`结束前被执行，它就会向该方向移动。

如果`BEGIN`指令没有被执行，则照常过渡到`@SHOW_SHOP`。