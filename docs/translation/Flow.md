<!-- <script setup>
import FlowTitle from './FlowTitle.vue'
</script> -->
# 流程图

> 翻译自原文档：[https://osdn.net/projects/emuera/wiki/flow](https://osdn.net/projects/emuera/wiki/flow)

本章节所涉及的流程图是用 [DiagramDesigner](http://logicnet.dk/DiagramDesigner/) 编辑的。流程图源文件文件在[这里](https://osdn.net/projects/emuera/wiki/flow/attach/flow1821.ddd)。

后文除另有说明，否则句子的主语应是`Emuera.exe`。

## Title 标题流程

流程进入方式：

- 自动：游戏引擎启动后会读取`ERB`文件，文件全部读取完成后，自动进入；
- 手动：使用`Begin Title`语句手动进入。

![](https://osdn.net/projects/emuera/wiki/flow/attach/title.gif)

若`@System_Title`函数已定义，则调用它；若存在多个定义，则调用第一次读取到的定义。

如果`@System_Title`函数在`Return`之前，没有调用`Begin`或`LoadData`命令，则会报错退出。

若没有定义`@System_Title`，就会执行后续的默认标题流程。

默认标题中的文字，如标题、版本、介绍、命令按钮（如`[0]从头开始`）等，都可以被改变，详见 [_replace.csv](Replace_CSV#系统菜单0-系统菜单1)。

在这个界面中，若选择`[0]从头开始`，首先要做的就是初始化数据。如`Str`和`PrintLV`的初始值（与`ResetData`命令同理），`AddChara 0`等。

然后自动执行`Begin First`命令。进入`First`流程。

若选择`[1]加载存档`，若已定义`@Title_LoadGame`函数，则调用。

若未定义，则显示默认加载界面。该界面与`@LoadGame`所调用的界面略有不同。

## First 从头开始流程

流程进入方式：

- 自动：在标题界面选择了`[0]从头开始`后，自动进入；
- 手动：使用`Begin First`语句手动进入。

![](https://osdn.net/projects/emuera/wiki/flow/attach/first.gif)

如果`@EventFirst`函数在`Return`之前，没有调用`Begin`命令，则会报错退出。

## Shop 商店流程

::: warning 注意

此处流程的名称具有迷惑性，虽然名称是商店，但其实并不是指游戏中的物品购买流程，而是游戏的行动主界面，即行动按钮最多的那个界面。一般来说，可以理解为行动按钮分层排列就像商店里的商品一样的那种感觉。

:::

流程进入方式：

- 自动：加载存档后自动进入；
- 手动：使用`Begin Shop`语句手动进入。

![](https://osdn.net/projects/emuera/wiki/flow/attach/shop.gif)

如果该流程是从加载存档处进入，则不进行`@EventShop`处理。

在`@Show_Shop`执行完毕后，等待输入，若输入序号在0~99内，则执行内置购买逻辑，若不在内，则调用`@UserShop`函数。这个数值范围可被改变，详见 [_replace.csv](Replace_CSV)。

注意：`@Print_ItemShop`函数显示的项目范围是`ItemName`或`ItemSales`中的项目数，以小者为准（标准是1000）。

购买时，要确定相应的`ItemSales`是否为非零，或者`Money`是否大于`ItemPrice`。

若购买失败，则会要求再次输入。

在 Eramaker 中，如果购买失败，用户必须从`@Show_Shop`重新开始。

如果购买决策成功，将`Item`编号分配给`Bought`变量，将`Item:Bought`增加1，并通过`ItemPrice:Bought`减少`Money`。

调用`@EventBuy`，返回`@Show_Shop`。

除非调用`Begin`指令，否则你永远不会离开`Shop`流程。

## TRAIN

流程进入方式：

- 手动：使用`Begin Train`语句手动进入。

![](https://osdn.net/projects/emuera/wiki/flow/attach/train.gif)

进入流程后，首先一些变量会被初始化，如：

- `AssiPlay:0 = 0`
- `PrevCom:0 = -1`
- `NextCom:0 = -1`
- `TFlag = 0`
- `GotJuel`、`TEquip`、`EX`、`Palam`和`Source`中的所有角色都被设置为0。
- 最后，为所有角色的`STAIN:2`分配2，为`STAIN:3`分配1，为`STAIN:4`分配8，为其他分配0。

当你离开`Train`流程时，这些值不会被初始化，所以如果你在`Shop`里保存，这些值会保留在你的保存数据中。

你可以通过`@SaveInfo`或其他方法将角色的`GotJuel`、`TEquip`、`EX`、`Palam`等指定为0来保存保存数据的大小。

这里不解释`NextCom`的非负值的行为，因为它含有一个严重的 Bug。

Emuera 的`NextCom`是为了兼容旧代码而设计的，包括上述的 Bug，且并不打算用于新的用途。

关于`CallTrain`指令，见[命令](Command)。

调用`@Show_Status`后会显示可用的`Train`。

会搜索`@Com_AbleXX`，寻找那些有定义的`TrainName`。

搜索范围（图中的`Max_Train`）对于 Emuera 来说是`VariableSize.csv`中指定的`TrainName`范围，对于 Eramaker 来说是`2147483647`。

如果`@Com_AbleXX`没有被定义或返回非零值，那么它就是可用的，`TrainName`被打印出来。

如果`@Com_AbleXX`返回0，则不可用，不显示`TrainName`。

在这个时候，它记住了是否可用。 (这并不意味着`@Com_AbleXX`在运行时被再次调用）。

显示`TrainName`后，调用`@Show_UserCom`。

在`@Show_UserCom`之后，输入前初始化`Up`、`Down`和`LoseBase`。

然后等待用户输入。

输入的结果与`@Com_AbleXX`的结果进行核对，如果该命令是可执行的，则调用相应的`@ComXX`。

首先，`Train`号被分配给`SelectCom`变量，所有字符的`NowEX`的所有元素被设置为0。

接下来，`@EventCom`被调用，接着是相应的`@Com`。

如果`@Com`返回一个非零值，则调用`@Source_Check`、`@EventComEnd`并返回`@Show_Status`。

在`@Source_Check`完成后，在调用`@EventComEnd`前，将所有字符的`Source`的所有元素设置为0。

如果在`@Source_Check`之后，`@EventComEnd`不存在或者在`@EventComEnd`中没有给出WAIT指令，那么在`@Show_Status`之前就会执行一次`Wait`。

如果`@Com`返回0，则返回到`@Show_Status`。

注意，当`UpCheck`指令被执行时，`Up`和`Down`的值与`Target`的`Palam`相加和相减，并且`Up`和`Down`的值都被分配为0。

如果输入的结果不是可执行的命令，则调用`@UserCom`并返回`@Show_Status`。

除非调用`Begin`指令，否则你永远不会离开`Train`流程。

## AblUp 升级流程

流程进入方式：

- 手动：使用`Begin AblUp`语句手动进入。

![](https://osdn.net/projects/emuera/wiki/flow/attach/ablup.gif)

调用`@Show_Juel`和`@Show_AblUp_Select`后等待用户输入。

如果输入的范围是0~99，找到相应的`@AblUp`。

如果定义了相应的`@AblUp`，则调用`@AblUp`并返回到`@Show_Juel`。

如果没有定义，就会再次等待用户输入。

在 Eramaker 中，如果没有定义，就从`@Show_Juel`重新开始。

如果输入值在0-99范围之外，则调用`@UserAblUp`并返回`@Show_Juel`。

从 Emuera 1.705开始，没有办法改变这个范围。

除非调用`Begin`指令，否则你永远不会离开`AblUp`流程。

## AfterTrain 

流程进入方式：

- 手动：使用`Begin AfterTrain`语句手动进入。

如果`@EventEnd`函数在`Return`之前，没有调用`Begin`命令，则会报错退出。

![](https://osdn.net/projects/emuera/wiki/flow/attach/aftertrain.gif)

## TurnEnd

流程进入方式：

- 手动：使用`Begin TurnEnd`语句手动进入。

如果`@EventTurnEnd`函数在`Return`之前，没有调用`Begin`命令，则会报错退出。

![](https://osdn.net/projects/emuera/wiki/flow/attach/turnend.gif)

## LoadGame

流程进入方式：

- 手动：使用`LoadGame`语句手动进入。

![](https://osdn.net/projects/emuera/wiki/flow/attach/loadgame.gif)

`Begin`指令自带`Return`特性，`Begin`指令以下的语句从不执行，但`LoadData`和`SaveData`指令与`Call`指令一样，执行完毕后会返回原处。

然而，当`Load`命令被执行时，它就会注销原来的调用位置并进入到`LoadDataEnd`。

## SaveGame

流程进入方式：

- 手动：使用`SaveGame`语句手动进入。

![](https://osdn.net/projects/emuera/wiki/flow/attach/savegame.gif)

调用`@SaveInfo`的时机是在实际写完存档之前。

## LoadDataEnd

流程进入方式：

- 自动：`LoadData`命令执行完成后自动进入；
- 自动：`LoadGame`中`Load`命令执行完成后自动进入；

![](https://osdn.net/projects/emuera/wiki/flow/attach/loaddataend1821.gif)

当执行`Load`时，所有以前的状态，包括被调用的函数，都被擦除。

Eramaker 在这里直接过渡到`@SHOW_SHOP`。

在 Emuera 中，如果`@System_LoadEnd`被定义，则调用。

如果`Begin`指令在`@System_LoadEnd`结束之前被调用，它就会过渡到那里。

否则，如果定义了`@EventLoad`，就会执行`@EventLoad`。

如果`Begin`指令在`@EventLoad`结束前被执行，它就会向该方向移动。

如果`Begin`指令没有被执行，则照常过渡到`@Show_Shop`。