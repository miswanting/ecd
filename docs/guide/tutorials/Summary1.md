# 小结1

恭喜你，你现在已经学会了新手三大件：

- 变量
- 类型
- 输入与输出

前面的三篇仅仅是对相关概念进行了最基础的描述，但这还没有触及 ERB 代码的基准线，现在我们通过小结来融会贯通，让大家能够掌握这个部分中的常用知识。

```
;我是注释（注意左边的半角分号）。
;下面一行是内置的函数“第一事件”，是在玩家点击新的开始后执行的第一段代码。
@EventFirst ;注释也可以写在行末（但不适用于所有语句）。
  ;定义数值变量MyNumber
  #Dim MyNumber = 123
  ;定义字符串变量MyText
  #DimS MyText = "Hello World!"
  Print 数值变量的名称是：
  Print MyNumber
  Print 数值变量的值是：
  PrintV MyNumber
  ;可以使用PrintL指令手动换行
  PrintL 
  Print 字符串变量的名称是：
  Print MyText
  Print 字符串变量的值是：
  PrintS MyText
  Print 请输入数字：
  Input
  Print 输入的数字为：
  PrintVL Result ;注意这里使用的输出具有换行功能。
  Print 请输入文本：
  InputS
  Print 输入的文本为：
  PrintSL ResultS ;注意这里使用的输出也具有换行功能。
  Print 按任意键退出
  Quit
```

## 小测验

说出下列命令分别代表什么意思？

- `#Dim`
- `#DimS`
- `Print`
- `PrintV`
- `PrintS`
- `PrintL`
- `PrintVL`
- `PrintSL`
- `Input`
- `InputS`
- `Result`
- `ResultS`

好了，我们对最常用的简单语法已经心里有数了，接下来我们就可以加快学习的速度了！
