# 完整实战：从零做一个「打工养成」小游戏

## 前言

前面我们把 EraBasic 的零件都学了一遍，但它们散落在各处。这一篇，我们把这些零件拼成一个**能从头玩到尾的小游戏**——有角色、有主循环、有存档、有结局。

写完之后，你就拥有了一个可以继续扩展的「骨架」，之后所有内容都是往它上面加东西。

::: warning 教程依赖

本教程假设您已完成[入门教程](../tutorials/)，尤其是[函数的定义与用法](../tutorials/Function)、[游戏的保存与加载](../tutorials/Save_Load)和[内置流程](../tutorials/System_Flow)。

:::

## 游戏设计

我们做一个最简单的养成游戏：

- 主角是**小明**，有一项属性：**体力**（初始 100）；
- 每天可以选择**打工**（体力 -20、金钱 +100）或**休息**（体力 +50）；
- 一共进行 **10 天**，结束后结算攒下的金钱；
- 随时可以存档、读档。

工程结构：

```
root/
 ├─ emuera.config
 ├─ Emuera1824.exe
 ├─ CSV/
 │   └─ Chara01.csv
 └─ ERB/
     └─ System.erb
```

## 第一步：定义角色

在 `CSV/` 中新建 `Chara01.csv`：

```csv
番号,1
名前,小明
呼び名,小明
基礎,0,100
```

这定义了一个编号为 1 的角色「小明」，其 0 号基础属性（我们用**体力**）初始值为 100。

> 字段含义见 [CSV 文件参考](../../reference/CSV_File#charaxx-csv)。

## 第二步：新游戏初始化

在 `ERB/` 中新建 `System.erb`，先写新游戏的入口 `@EVENTFIRST`：

```erb
@EVENTFIRST
  DELALLCHARA       ; 清空所有角色，保证从头开始
  ADDCHARA 1        ; 添加 CSV 编号为 1 的小明（此时登录编号为 0）
  DAY = 1           ; 内置变量：天数
  MONEY = 0         ; 内置变量：金钱
  BASE:0:0 = 100    ; 小明的体力
  BEGIN SHOP        ; 进入主循环
  RETURN
```

`DAY`、`MONEY` 是 Emuera 的内置变量，不用定义就能用；`BASE:0:0` 是「登录编号 0 的角色的 0 号基础属性」。

## 第三步：主循环

主循环用 `@SHOW_SHOP`（引擎在进入商店流程时自动调用它）。

```erb
@SHOW_SHOP
  ; 结束条件
  IF DAY > 10
    CALL SHOW_ENDING
    BEGIN TITLE
    RETURN
  ENDIF

  ; 显示状态
  CLEARLINE LINECOUNT
  PRINTL ══════ 打工养成 ══════
  PRINTL 第
  PRINTV DAY
  PRINTL 天
  PRINTL 小明　体力：
  PRINTV BASE:0:0
  PRINTL 　金钱：
  PRINTV MONEY
  PRINTL

  ; 显示选项
  PRINTL [100] 打工（体力 -20，金钱 +100）
  PRINTL [101] 休息（体力 +50）
  PRINTL [102] 保存游戏
  PRINTL [103] 读取游戏
  PRINTL [104] 结束游戏
  RETURN
```

### 为什么选项编号从 100 开始？

这是 Emuera「商店流程」的一个约定：

- 输入 **0～99**：引擎当作「购买第 N 号物品」处理（我们这里没有物品，所以避开这段编号）；
- 输入 **100 及以上**（或负数）：引擎把它交给我们自己的 `@USERSHOP` 函数处理。

所以自定义按钮统一用 `[100]` 起步。这个分界值可以通过 `_replace.csv` 的`販売アイテム数`修改。

## 第四步：处理玩家的选择

`@USERSHOP` 会收到玩家输入的数字（放在 `RESULT` 里）：

```erb
@USERSHOP
  SELECTCASE RESULT
    CASE 100
      IF BASE:0:0 < 20
        PRINTL 体力不足，今天没法打工了。
        WAIT
      ELSE
        BASE:0:0 -= 20
        MONEY += 100
        DAY += 1
      ENDIF
    CASE 101
      LIMIT BASE:0:0 + 50, 0, 100
      BASE:0:0 = RESULT
      DAY += 1
    CASE 102
      SAVEGAME
    CASE 103
      LOADGAME
    CASE 104
      BEGIN TITLE
  ENDSELECT
  RETURN
```

几点说明：

- 打工前先判断体力是否足够，不够就给出提示、不消耗这一天；
- 休息用 `LIMIT` 把体力限制在 0～100 之间，不会超过上限；
- `SAVEGAME` / `LOADGAME` 会呼出引擎自带的存档 / 读取界面（它们只能在商店流程中使用，这里正好合适）。

## 第五步：给存档写简介

引擎在为每个存档槽生成简介时会调用 `@SAVEINFO`：

```erb
@SAVEINFO
  PUTFORM 第 {DAY} 天　金钱 {MONEY}
  RETURN
```

`PUTFORM` 会用与 `PRINTFORM` 类似的方式把当前进度写进存档简介，玩家就能一眼看出每个存档的情况。

## 第六步：结算画面

```erb
@SHOW_ENDING
  CLEARLINE LINECOUNT
  PRINTL 十天的打工结束了。
  PRINTL 小明一共攒下
  PRINTV MONEY
  PRINTL 枚金币。
  PRINTL
  PRINTL 按任意键回到标题画面。
  WAIT
  RETURN
```

## 完整代码

`ERB/System.erb` 全文：

```erb
; ========== 打工养成 · 主脚本 ==========

; ---------- 新游戏 ----------
@EVENTFIRST
  DELALLCHARA
  ADDCHARA 1
  DAY = 1
  MONEY = 0
  BASE:0:0 = 100
  BEGIN SHOP
  RETURN

; ---------- 主循环 ----------
@SHOW_SHOP
  IF DAY > 10
    CALL SHOW_ENDING
    BEGIN TITLE
    RETURN
  ENDIF

  CLEARLINE LINECOUNT
  PRINTL ══════ 打工养成 ══════
  PRINTL 第
  PRINTV DAY
  PRINTL 天
  PRINTL 小明　体力：
  PRINTV BASE:0:0
  PRINTL 　金钱：
  PRINTV MONEY
  PRINTL
  PRINTL [100] 打工（体力 -20，金钱 +100）
  PRINTL [101] 休息（体力 +50）
  PRINTL [102] 保存游戏
  PRINTL [103] 读取游戏
  PRINTL [104] 结束游戏
  RETURN

; ---------- 处理选择 ----------
@USERSHOP
  SELECTCASE RESULT
    CASE 100
      IF BASE:0:0 < 20
        PRINTL 体力不足，今天没法打工了。
        WAIT
      ELSE
        BASE:0:0 -= 20
        MONEY += 100
        DAY += 1
      ENDIF
    CASE 101
      LIMIT BASE:0:0 + 50, 0, 100
      BASE:0:0 = RESULT
      DAY += 1
    CASE 102
      SAVEGAME
    CASE 103
      LOADGAME
    CASE 104
      BEGIN TITLE
  ENDSELECT
  RETURN

; ---------- 存档简介 ----------
@SAVEINFO
  PUTFORM 第 {DAY} 天　金钱 {MONEY}
  RETURN

; ---------- 结算 ----------
@SHOW_ENDING
  CLEARLINE LINECOUNT
  PRINTL 十天的打工结束了。
  PRINTL 小明一共攒下
  PRINTV MONEY
  PRINTL 枚金币。
  PRINTL
  PRINTL 按任意键回到标题画面。
  WAIT
  RETURN
```

## 运行效果

```
══════ 打工养成 ══════
第1天
小明　体力：100　金钱：0

[100] 打工（体力 -20，金钱 +100）
[101] 休息（体力 +50）
[102] 保存游戏
[103] 读取游戏
[104] 结束游戏
```

点击 `[100]` 打工，体力变成 80、金钱变成 100、天数变成 2；天数超过 10 后自动进入结算。

## 你可以继续扩展的方向

这个骨架已经能跑，接下来可以往这些方向加内容：

- **更多属性**：给小明的 `CFLAG`（角色标志）加“心情”“技能”等自定义数值；
- **事件**：在 `@SHOW_SHOP` 开头用随机数触发随机事件（`RAND:100`）；
- **结尾流程**：把 `BEGIN TITLE` 换成 `BEGIN AFTERTRAIN`，让引擎调用 `@EVENTEND` 来做正式结算；
- **训练流程**：需要更复杂的养成玩法时，改为使用引擎的 `TRAIN` 流程（`@EVENTTRAIN` / `@SHOW_USERCOM` / `@EVENTCOM`）；
- **图片**：用 `PRINT_IMG` 或 `HTML_PRINT` 显示立绘，详见 [HTML_PRINT 相关](../../translation/HTML_PRINT)；
- **发布**：确认目标玩家使用的引擎版本，再打包 `exe` + `CSV` + `ERB`。

## 相关链接

- [入门教程](../tutorials/)
- [角色的定义、注册、使用与注销](Character)
- [开发实战经验与技巧](Experience)
- [ERB 的内置流程](../../reference/ERB_Internal_Process)
- [命令](../../translation/Command)
