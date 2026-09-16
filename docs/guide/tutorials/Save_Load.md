# 游戏的保存与加载

## 前言与确认

玩家长时间培养的角色、攒下的金币、推进的剧情……如果关掉游戏就全没了，那也太惨了。所以，**存档**是任何一款游戏都绕不开的功能。这一节，我们让游戏学会“记住”和“想起来”。

::: warning 教程依赖

本教程假设您已学习过[快速开始](../Quick_Start)、[复合语句](Compound_Statement)和[函数的定义与用法](Function)。若您尚未学习过，我们强烈推荐您首先学习相应教程。

:::

先确认一下我们现有的工程文件夹结构：

```
root/
 ├─ emuera.config
 ├─ Emuera1824.exe
 ├─ CSV/
 └─ ERB/
     └─ System.erb
```

其中，`System.erb`的代码为：

```erb
@EventFirst
  Print Hello World!
  Quit
```

## 存档就是把“现在的状态”写下来

Emuera 会自动记录所有变量的值。所谓存档，就是把这套“当前状态”写进一个文件；读档则是把文件里的状态读回来，覆盖当前的状态。

Emuera 提供了两套做法：

- **直接存档**：自己给存档编号，用 `SAVEDATA` / `LOADDATA`，简单直接；
- **标准存档界面**：用 `SAVEGAME` / `LOADGAME` 呼出引擎自带的存档/读档画面。

先学第一套，它更好理解。

## 一个能存能读的小游戏

把下面的代码写进 `System.erb`：

```erb
@EventFirst
  #Dim Money = 100
  #Dim Day = 1
  #Dim QuitFlag = 0

  WHILE QuitFlag == 0
    CLEARLINE LINECOUNT
    PRINTL ==============================
    PRINTL 第
    PRINTV Day
    PRINTL 天
    PRINTL 金币：
    PRINTV Money
    PRINTL
    PRINTL [0] 打工赚 10 金币
    PRINTL [1] 保存游戏
    PRINTL [2] 读取游戏
    PRINTL [3] 退出
    INPUT

    SELECTCASE RESULT
      CASE 0
        Money += 10
        Day += 1
      CASE 1
        SAVEDATA 0, "第 " + TOSTR(Day) + " 天"
        PRINTL 保存成功！
        WAIT
      CASE 2
        CHKDATA 0
        IF RESULT == 0
          LOADDATA 0
          PRINTL 读取成功！
        ELSE
          PRINTL 存档不存在或无法读取。
        ENDIF
        WAIT
      CASE 3
        QuitFlag = 1
      CASEELSE
        ; 无效输入，什么都不做，重新循环
    ENDSELECT
  WEND
  QUIT
```

运行后，你可以打工攒金币、随时保存、退出再进来读取，进度都还在。

## 三个关键命令

### SAVEDATA：保存

```erb
SAVEDATA 0, "第 " + TOSTR(Day) + " 天"
```

- 第 1 个参数是**存档编号**（0 到 19 左右，取决于配置）；
- 第 2 个参数是**存档简介**，会显示在读取列表里。

第二个参数是字符串表达式，所以可以像上面那样把天数拼进去。如果写 `SAVEDATA 0` 而不给简介，也可以，只是读取列表里就看不到信息了。

### CHKDATA：先检查，再读取

```erb
CHKDATA 0
IF RESULT == 0
  ; 可以读取
ENDIF
```

`CHKDATA` 会检查指定编号的存档能不能读，把结果放进 `RESULT`：

- `0`：可以读取；
- 非 `0`：不存在、版本不符等原因导致不可读取。

**读取前一定要先检查**，因为 `LOADDATA` 失败是会直接报错的。

### LOADDATA：读取

```erb
LOADDATA 0
```

读档成功后，所有变量的值都会变成存档里的样子——包括我们用来控制循环的 `QuitFlag`。好在存档时它就是 0，所以读档后循环会自然继续。

## 另一种方式：标准存档界面

如果你希望玩家看到引擎自带的那个漂亮的存档列表，可以用：

- `SAVEGAME`：呼出保存界面；
- `LOADGAME`：呼出读取界面；
- `@SAVEINFO`：引擎在生成每条存档简介时自动调用的函数。

```erb
@SAVEINFO
  PUTFORM 第 {Day} 天　金币 {Money}
  RETURN
```

`PUTFORM` 会用与 `PRINTFORM` 类似的方式，把当前进度写进存档简介。这样玩家就能一眼看出每个存档里是什么情况。

> `SAVEGAME` 和 `LOADGAME` 只能在商店（`SHOP`）流程中调用，这一点和可以随处调用的 `SAVEDATA` / `LOADDATA` 不同。具体细节可以查阅[命令](../../translation/Command)中的相应条目。

## 小结

- 存档把“当前状态”写进文件，读档再读回来；
- `SAVEDATA <编号>, <简介>` 保存，`LOADDATA <编号>` 读取；
- 读取前先用 `CHKDATA` 检查，避免报错；
- 想使用引擎自带界面，就用 `SAVEGAME` / `LOADGAME`，并配合 `@SAVEINFO` 写简介。

下一步，我们来看看程序出错时该怎么办：[错误与异常](Error)。
