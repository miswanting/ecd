# 强制配置项目

> 翻译自原文档：https://osdn.net/projects/emuera/wiki/exconfig

如果`CSV/`文件夹中存在名为`_fixed.config`和/或`_default.config`的文件，Emuera将读取这些文件。

每个.config文件的格式与`emuera.config`相同。每个项目的含义见配置部分。

每个文件的优先级取决于Emuera读取配置文件的顺序。

Emuera读取配置文件的顺序是：

1. csv/_default.config
2. emuera.config
3. csv/_fixed.config

它将被后来的配置读数所覆盖。也就是说，`_default.config`中的设置将被`emuera.config`覆盖，而`emuera.config`中的设置将被`_fixed.config`覆盖。注意，这些文件只有在存在上述路径和文件名的情况下才会被加载。

这意味着，如果你在`CSV/`文件夹中创建一个子文件夹，并把`_fixed.config`或`_default.config`放在它下面，或使用一个没有下划线的文件名，如`default.config`，它将不会被加载。

## _fixed.config

在`_fixed.config`中设置的选项优先于`emuera.config`中的选项。

另外，`_fixed.config`中指定的选项不能被Emuera配置对话框所改变。

`_fixed.config`只有在某些选项对预期行为有要求的情况下才可以使用。

对于依赖Emuera的换行功能的脚本，必须将`不要在按钮中间换行`选项设置为`YES`。

另外，如果你需要使用`_Replace.csv`和`_Rename.csv`，这些选项是必须的。

如果你使用`SETCOLOR`，你将需要固定背景和文本的颜色。

然而，如果你对非必要的选项使用`_fixed.config`，你将无法对其进行自定义。

请尽量减少`_fixed.config`中选项的数量。

## _default.config

如果有些选项不是强制性的，但建议使用，则使用`_default.config`而不是`fixed`。

如果`emuera.config`不存在，`_default.config`将作为默认设置。

如果`emuera.config`存在，`emuera.config`中设置的选项将优先于`_default.config`中设置的选项，并且不会覆盖任何用户设置的选项。

