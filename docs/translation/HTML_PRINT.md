# HTML_PRINT 相关

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exhtml

本节介绍`HTML_PRINT`和其他与`html`相关的命令。

通过使用相关命令，你可以用类似于`html`的语法来指定显示内容。

## HTML_PRINT

这是一个使用类似`html`标签的`PRINT`指令。

参数不是像`PRINT`那样的字符串，而是像`PRINTS`那样的字符串表达式，并且自动断行，所以它实际上类似于`PRINTSL`。

用`HTML_PRINT`绘图不受`ALIGNMENT`、`SETFONT`、`COLOR`、`FONTSTYLE`和类似指令的影响。

所有这些效果都必须在标签中指定。

使用\<tagname attribute='属性值'\>Text\</tagname\>的形式。

属性值必须用"~"或"~"括起来。

为了区别于 Emuera 中的字符串，建议用'~'括住它们。

### p

```html
<p align='～'>测试文本</p>
```

`p` Tag 只能放在一个字符串之前，`</p>`只能放在最后。

`</p>`可以被省略。

- align
  - 必要
  - 与`ALIGNMENT`指令相对应，可以指定为`left`、`right`或`center`。

### nobr

```html
<nobr>测试文本</nobr>
```

相当于用`PRINTSINGLE`指令绘图。

如果添加了这个标签，由于超出绘图区域而导致的隐式换行将不会被执行（可以通过`<br>`进行显式换行）。

然而，与浏览器不同，Emuera 不能水平滚动，所以你不会看到超出窗口宽度的东西。

`<nobr>`只能放在第一个文本之前，`</nobr>`只能放在最后一个文本之后。

`</nobr>`可以省略。

### br

换行。

其效果是在显示行上出现断行，因此在`CLEARLINE`和`LINECOUT`中，任何数量的`<br>`都将被视为断行。

### button & nonbutton

```html
<button value='～' title='～' pos='～'>测试按钮</button>
<nonbutton title='～' pos='～'>测试按钮</nonbutton>
```

`button`使所包围的文本成为可点击的按钮。

`nonbutton`将所包含的文本渲染为非按钮文本。

- value
  - 只能为按钮指定。
  - 如果没有指定值，该按钮会被渲染成一个非按钮，就像`<nonbutton>`一样，是不能点击的。
- title
  - 指定按钮被指向时显示的工具提示的内容。
- pos
  - 只有在对齐方式为左且使用了`nobr`标签时才可用。
  - 它指定了工具提示距离屏幕左边缘的位置，是字体大小的一个百分比。
  - 例如，`<button pos='300'>Button</button>`将把按钮放在与 "button "大致相同的位置。

### font

```html
<font face='～' color='～' bcolor='～'>测试文本</font>
```

改变封闭区域的字体、显示颜色和按钮选择颜色。

这个标签可以嵌套。

- face
  - 指定字体名称。 如果指定了一个空字符串，字体将是配置中指定的字体。
  - 如果指定的字体不存在或不被支持，将使用`Microsoft Sans Serif`代替（.Net框架的字体类）。
- color
  - 指定文本的显示颜色。
  - 颜色可以指定为十六进制数字，如`#FF0080`，也可以指定为一个词，如`red`或`blue`。
  - 颜色名称是基于.Net框架的颜色结构中定义的颜色。
  - 然而，透明不能被指定为一个颜色名称。
- bcolor
  - 指定按钮被选中时的颜色。

### b & i & u & s

```html
<b>加粗</b>, <i>斜体</i>, <u>下划线</u>, <s>删除线</s>
```

封闭区域内的粗体、斜体、下划线和删除线文本。

### img

```html
<img src='～～' srcb='～～' height='～～'>
```

在一行中显示一个图像。

关于如何准备图像的信息，见[资源设置]()。

- `src`属性
  - 需要
  - 资源文件夹中指定的资源名称 csv
  - 如果没有指定高度或宽度，图像将被缩小或放大，使其高度和宽度与字体大小一致，同时保持长宽比。
  - 如果绘图接口是WINAPI，将不执行alpha混合。
- srcb属性
  - 指定资源文件夹中指定的资源名称 csv
  - srcb是选择按钮时应显示的资源的名称。
  - 如果不指定，则使用与src相同的图像。
  - 图像将被缩小或放大到与src相同的大小。
- 高度属性
  - 指定显示尺寸的高度为字体大小的百分比。 如果省略，值为100。
  - 如果指定了一个负值，图像将被垂直翻转。
- 宽度属性
  - 显示尺寸的宽度，占字体大小的百分比。 如果省略，值为0。
  - 如果是0，则保持原始图像的长宽比。
  - 如果是否定的，图像将被水平翻转。
- ypos属性
  - 指定显示位置的垂直轴位置为字体大小的百分比。 如果省略，值为0。
  - "注意，这个位置是基于字体大小，而不是行高。
  - 使用`<shape type='space'>`或按钮的pos属性来调整水平轴的位置。

### shape

```html
<shape type='rect' param='～～' color='～～' bcolor='～～'>
<shape type='space' param='～～'>
```

在一条线上画出指定的形状。

- 类型属性
  - 需要
  - 要画的形状的类型。
  - 可以使用矩形或空间。
    - type='rect'
    - 绘制一个矩形。
    - 参数可以是1或4个数字。
    - 如果param为1，则指定矩形的宽度。
    - `<shape type='rect' param='400'>` 绘制一个宽度为字体大小400%的矩形。
      如果参数是4，那么x、y、宽度和高度将按这个顺序指定。
    - `<shape type='rect' param='0,25,400,50'>` 绘制一个高度为字体大小50%的矩形，在行的上方和下方居中。
    - `param='400'`相当于`param='0、0、400、100'`。
    - `type='space'`
    - 对于`param`指定的宽度，不显示任何东西。
    - 例如，`<shape type='space' param='400'>`对于字体大小的400%将不画任何东西。
    - 这大致相当于四个全宽的空间。
- param Attributes
  - 需要
  - 这是一个参数，用于以字体大小的百分比来绘制形状。
  - 要指定多个值，请用逗号分开。
- 颜色属性
  - 指定形状的颜色。 规范的格式与`<font>`标签的格式相同。
- bcolor属性
  - 指定形状上所选按钮的颜色。 规范的格式与`<font>`标签相同。

### 字符实体引用

> https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML

如果一个词被包含在`&`和`;`中，它将被视为一个字符实体引用。

支持的字符参考是`&amp;` `&gt;` `&lt;` `&quot;` `&apos;` 和 `&#nn;` `&#xnn;`。

### 注释

```
<!-- 注释 -->
```

用`<!--`，`-->`括起来的字符。

## 相关命令

### HTML_TAGSPLIT

```erb
HTML_TAGSPLIT <字符串表达式>(, <数值变量>, <字符串变量>)
```

目标字符串被解释为 HTML 字符串，被分割成标签和纯文本，分割的数量被分配给`RESULT`，分割后的字符串被分配给`RESULTS`。

如果指定了第二个或第三个参数，它将被分配给指定的变量而不是`RESULT`或`RESULTS`。

如果在分割过程中发生错误，`RESULT`将被分配为`-1`。

`HTML_TAGSPLIT`并不验证标签的内容或对应的适当性。

如果分割的数量超过了`RESULTS`数组的大小，多余的部分将不会被分配给`RESULTS`。

```
HTML_TAGSPLIT "<p align='right'>A<! --comment-->B<font color='red'>C</font></p>"
RESULTS:0 = <p align='right'>
RESULTS:1 = A
RESULTS:2 = <! --comment-->
RESULTS:3 = B
RESULTS:4 = <font color='red'>
RESULTS:5 = C
RESULTS:6 = </font>
RESULTS:7 = </p>
RESULT = 8
```

## 相关函数

### str HTML_POPPRINTINGSTR()

检索当前在PRINT等待换行的Html格式的字符串缓冲区，并清空缓冲区。

因为p标签没有被附加，所以`ALIGNMENT`指令的对齐方式没有被反映出来。

### str HTML_GETPRINTEDSTR(int lineNo)

检索显示的行中由lineNo指定的行的内容，作为html格式的字符串。

对行的计数与`LINECOUNT`和`CLEARLINE`指令相同。

### str HTML_ESCAPE(str value)

将目标字符串转为Html格式（转换为字符参考）。

使用`HTML_TOPLAINTEXT`函数来取消注释。

### str HTML_TOPLAINTEXT(str value)

将目标html字符串转换为纯文本。

具体来说，html标签被从字符串中删除，字符参考被扩展。
