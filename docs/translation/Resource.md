# 资源文件

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/resources

本节说明如何准备资源文件，以便在Emuera中显示图像。

资源文件被放置在可执行文件夹的资源文件夹中。

这些文件可以在资源文件夹的任何子文件夹中（自1.823起）。

## 资源索引文件（csv）。

如果你把csv格式的文本放在资源文件夹中，它将被当作资源规范文件来阅读。格式如下：

```
;注释行
リソース名A, 元ファイル名, x, y, width, height, posx, posy
リソース名B, 元ファイル名, x, y, width, height, posx, posy

リソース名C, ANIME, width, height
リソース名C, 元ファイル名, x, y, width, height, posx, posy, delay
リソース名C, 元ファイル名, x, y, width, height, posx, posy, delay
```

- 注释行

  - 以分号开头的行作为注释行会被忽略。

- 图元（sprite）

  ```
  资源名称A, 原始文件名, x, y, width, height, posx, posy
  ```

使用上述格式可以创建一个`资源名称A`的精灵。

资源名称是指作为`<img src='资源名称A'>`的src属性值的名称。

它也可以以`SPRITECREATED("资源名称A")`的形式使用。

资源名称不得与任何其他资源的名称重复。

源文件名是指图像文件的名称。 它应该包括文件扩展名，并且是相对于csv文件的。

不可能指定一个比csv文件在层次上更高的图像文件。

不可能指定比csv文件更高的图像文件，它必须与csv文件在同一文件夹或其子文件夹中。

x、y、宽度和高度字段指定了要使用的原始图像的部分，单位为像素。

x、y、宽度和高度可以省略，在这种情况下，将使用整个图像。

`posx`和`posy`指定图像的相对位置。 这些值可以通过`SPRITEPOS`和`SPRITEMOVE`指令动态地改变。

`posx`和`posy`可以省略，在这种情况下，使用0,0。

- 动画精灵（Animate Sprite）

  ```
  资源名称C, ANIME, width, height
  资源名称C, 原始文件名, x, y, width, height, offsetx, offsety, delay
  资源名称C, 原始文件名, x, y, width, height, offsetx, offsety, delay
  ……
  ```

你可以使用上述格式来创建一个资源名为 "C "的动画精灵。

要创建一个动画精灵，用`ANIME`代替文件名创建一行，并指定整个精灵的大小。

这个宽度和高度必须是正整数。 它们不能被省略。

下一行，以此类推，指定将作为动画的每一帧的图像。

每一帧的定义与普通精灵的定义方式相同。

延迟是指该帧将被显示的时间，以毫秒计。 如果不指定，则为1000ms。

需要注意的是，Emuera 默认不会在`INPUT`等的等待时间内重绘，所以动画精灵会在某一帧看起来是静态的。

你可以通过执行`SETANIMETIMER`指令告诉 Emuera 在`INPUT`期间重绘。

关于`SETANIMETIMER`指令的更多信息，请参见[指令说明]()。

## 图像文件

为了显示图像，你需要一个图像文件。

图片文件可以是bmp、jpg或png格式，并放在资源文件夹中。

在Emuera 1.823中，图像文件不能直接在ERB脚本中指定。

它们只能通过资源规范文件中指定的资源名称进行访问。

## 需要注意的几点

所有在csv文件中指定的图像文件在 Emuera 启动时被提取到内存中，并占据内存直到完成。

与其加载大量的图像文件，不如将图像合并成一个文件并作为一个范围使用。

如果在配置中指定WINAPI为绘图接口，则图像由GDI处理，不进行alpha混合。

如果绘图接口是Graphics或TextRenderer，它将由GDI+处理，并进行alpha混合。

WINAPI（GDI）和Graphics或TextRenderer（GDI+）之间的缩放也略有不同。
