# Emuera 源码分析

> 本文以仓库中的只读参考工程 `.ref/Emuera/` 为准。文中的路径都相对于 `.ref/Emuera/Emuera/`。

## 技术栈

| 项目 | 内容 |
| --- | --- |
| 语言 | C#（停留在 C# 5 时代的写法） |
| 框架 | .NET Framework 4.5，WinForms（`OutputType=WinExe`） |
| 工程 | 旧式 `.csproj`（非 SDK 风格，逐文件 `<Compile Include>`） |
| 根命名空间 | `MinorShift.Emuera`，底层库 `MinorShift._Library` |
| 源码编码 | Shift-JIS / CP932（只读，切勿用 UTF-8 覆盖） |

## 总体结构

```
Program.cs
  └─ MainWindow（Forms/）
       ├─ EmueraConsole（GameView/）   输入输出与渲染
       └─ Process（GameProc/）          脚本执行与流程调度
            ├─ ConstantData（GameData/）  CSV 数据
            ├─ GameBase（GameData/）      游戏全局状态
            ├─ VariableEvaluator（GameData/Variable/）  变量求值
            └─ ErbLoader（GameProc/）     读取并解析 ERB
```

一句话概括：**`Process` 负责“读脚本、跑脚本”，`MainWindow` / `EmueraConsole` 负责输入输出，`ConstantData` 负责 CSV 常量，`Variable*` 负责变量管理。**

## 启动流程

### Program.Main

`Program.cs` 是入口，它做的是“准备环境”：

1. 确定各目录：`csv/`、`erb/`、`dat/`、`resources/`、`debug/`；
2. 解析命令行：`-DEBUG` 进入调试模式，其余参数视为**解析模式**（拖入的 ERB 文件）；
3. `ConfigData.Instance.LoadConfig()` 读取 `emuera.config`；
4. 检查 `csv/`、`erb/` 是否存在，不存在则弹框退出；
5. 进入 `MainWindow` 的 `Application.Run` 循环——注意这是一个 **while 循环**，支持 `Reboot` 重启。

### MainWindow → Process

`Forms/MainWindow.cs` 中创建 `EmueraConsole`，再由它驱动 `Process`。真正的“加载游戏”发生在 `Process.Initialize()`（`GameProc/Process.cs`），顺序大致是：

| 步骤 | 涉及的类/文件 |
| --- | --- |
| 初始化告警收集器 | `ParserMediator` |
| 加载 `resources/` 资源 | `Content/AppContents.cs` |
| 加载键盘宏 `macro.txt` | `Domain/Config/KeyMacro.cs` |
| 加载 `_Replace.csv` | `ConfigData.LoadReplaceFile` |
| 加载 `_Rename.csv` | `ParserMediator.LoadEraExRenameFile` |
| 加载 CSV 数据 | `ConstantData.LoadData` |
| 构建游戏状态 | `new GameBase()` |
| 构建变量求值器 | `new VariableEvaluator(gamebase, constant)` |
| 初始化变量解析器 | `VariableParser.Initialize()` |
| 读取并解析 ERB | `ErbLoader.LoadErbFiles` |

> ERB 在 CSV **之后**加载：这解释了为什么 ERH/ERB 能引用 CSV 里定义的名称，而反过来不行。

## 从 ERB 到执行

### 1. 读取与预处理

`GameProc/ErbLoader.cs` 负责遍历 `erb/` 目录、读取文件，并在 `ErbLoader.PPState` 中处理预处理指令（`#DIM`、`#DEFINE`、`[SKIPSTART]` 等）。读取完成后会做一遍**静态检查**（`checkScript`、`nestCheck`），比如检查函数是否未定义、复合语句是否闭合。

### 2. 分行与解析

`GameProc/LogicalLineParser.cs` 把每一行文本解析为一个 `LogicalLine` 对象。`LogicalLine` 的子类对应不同的行类型：

| 类 | 对应 |
| --- | --- |
| `FunctionLabelLine` | `@函数名` |
| `InstructionLine` | 一条普通指令 |
| `GotoLabelLine` | `$标签` |
| `NullLine` | 空行 |
| `InvalidLine` | 非法行 |

也就是说，**脚本在运行前就已经被“编译”成了对象树**，而不是运行时逐行解释。

### 3. 表达式：从词到树

表达式相关的代码在 `GameData/Expression/`：

- `ExpressionParser.cs`：核心入口 `ReduceExpressionTerm` / `ReduceIntegerTerm`，内部用 `TermStack` 把词序列归约成表达式树；
- `OperatorCode.cs` / `OperatorMethod.cs`：运算符的编号与实现；
- `Term.cs` / `IOperandTerm.cs`：表达式树的节点；
- `CaseExpression.cs`：`CASE` 分支的求值。

生成的结果是一棵 `IOperandTerm` 树，之后每次求值只需遍历这棵树。

### 4. 变量系统

变量相关的代码集中在 `GameData/Variable/`：

| 文件 | 职责 |
| --- | --- |
| `VariableCode.cs` | 变量编号枚举（每个变量一个 code） |
| `VariableData.cs` | 变量的实际存储 |
| `VariableEvaluator.cs` | 变量项的求值 |
| `VariableParser.cs` | 把标识符解析为变量项 |
| `VariableToken.cs` | 与词法/语法层对接 |
| `CharacterData.cs` | 角色变量（`NAME`、`CFLAG` 等） |
| `VariableLocal.cs` | `LOCAL` / `LOCALS` / `ARG` / `ARGS` |

`VariableCode` 这个枚举值得一读——它相当于整个变量体系的“总目录”。

### 5. 执行引擎

`GameProc/Process.ScriptProc.cs` 的 `runScriptProc()` 是**主执行循环**：

```
while (true) {
  state.ShiftNextLine();          // 取下一行
  if (lineCount % 10000 == 0)     // 每 1 万行检查一次死循环
    checkInfiniteLoop();
  func = line as InstructionLine;
  ...
  ArgumentParser.SetArgumentTo(func);              // 解析参数
  if (func.Function.Instruction != null)           // 有原生实现，直接执行
    func.Function.Instruction.DoInstruction(...);
  else if (func.Function.IsFlowContorol())         // 流程控制
    doFlowControlFunction(func);
  else                                             // 用户函数 / 其他
    doNormalFunction(func);
}
```

它把指令分成三类：**原生指令**（`Instruction` 对象）、**流程控制**（`doFlowControlFunction`）和**普通函数调用**（`doNormalFunction`）。指令表在 `GameProc/Function/` 下。

### 6. 渲染

`GameView/` 负责把内容画到屏幕上：

| 文件 | 职责 |
| --- | --- |
| `EmueraConsole.cs` | 控制台主体，输入输出 |
| `ConsoleButtonString.cs` | 可点击按钮的字符串 |
| `StringMeasure.cs` | 文本度量与换行 |
| `HtmlManager.cs` | `HTML_PRINT` 的标签处理 |

## 如何追踪一条命令的实现

想搞清楚某个命令到底做了什么，可以按下面的路子走：

1. 在 `GameProc/Function/` 里搜索命令名（或它在 `BuiltInFunctionCode.cs` / `Instraction.Child.cs` 中的枚举）；
2. 找到对应的 `Instruction` 实现；
3. 如果它涉及变量，再跳到 `GameData/Variable/` 看求值；
4. 如果是纯 C# 逻辑，函数体本身通常就是答案。

例如追踪 `ARRAYSHIFT`：先在 `GameProc/Function/Instraction.Child.cs` 里找到实现，再对照 `GameData/Variable/VariableData.cs` 看数组是怎么移动的。

## 阅读建议

- **先读 `Program.cs` 和 `Process.Initialize`**：建立“谁创建谁”的全局观；
- **再读 `runScriptProc`**：理解执行循环；
- **然后挑一条你熟悉的命令**，用上面的方法追到底；
- 遇到乱码时，说明用了 CP932；读取时先按 Shift-JIS 解码。

## 相关链接

- [Eramaker 源码分析](EraMaker)
- [ERB 的内置流程](../reference/ERB_Internal_Process)
- [ERB 的变量](../reference/ERB_Variables)
- [ERB 的表达式](../reference/ERB_Expressions)
