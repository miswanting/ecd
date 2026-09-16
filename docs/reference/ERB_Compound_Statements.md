# ERB 的复合语句

**复合语句**会跨越多行，控制程序“分支”或“重复”。它们都成对出现，写的时候一定要注意闭合。教程版见[复合语句](../guide/tutorials/Compound_Statement)。

## 条件分支：IF

```erb
IF 条件
  ; 条件成立时执行
ELSEIF 另一条件
  ; 前面的条件都不成立、且此条成立时执行
ELSE
  ; 都不成立时执行
ENDIF
```

- `ELSEIF` 可以有多个，也可以没有；
- `ELSE` 可以没有；
- `ENDIF` 必须有。

## 计数循环：REPEAT

```erb
REPEAT 次数
  ; 重复执行
REND
```

计数器是内置变量 `COUNT`，**从 0 开始**。

## 增强循环：FOR

```erb
FOR 变量, 初始值, 终止值{, 步长}
  ; 重复执行
NEXT
```

- `变量` 从 `初始值` 开始，每轮加 `步长`（默认 1），直到达到 `终止值` 之前停止；
- 终止值不包含在内；
- 循环变量不能与其他嵌套循环重名。

## 条件循环：WHILE

```erb
WHILE 条件
  ; 条件成立时重复
WEND
```

## 后置条件循环：DO

```erb
DO
  ; 至少执行一次
LOOP 条件
```

与 `WHILE` 不同，`DO…LOOP` 至少执行一次。

## 多路分支：SELECTCASE

```erb
SELECTCASE 表达式
  CASE 值
    ; 匹配时执行
  CASE 值1, 值2
    ; 匹配其中任意一个时执行
  CASE 起始值 TO 终止值
    ; 在范围内时执行
  CASE IS <= 值
    ; 满足比较时执行
  CASEELSE
    ; 都不匹配时执行
ENDSELECT
```

`CASE` 的条件从左到右依次判断，命中即停。

## 循环控制

| 语句 | 作用 |
| --- | --- |
| `BREAK` | 立即跳出当前循环 |
| `CONTINUE` | 跳过本轮剩余内容，进入下一轮 |

## 异常分支：TRYC / CATCH / ENDCATCH

用于捕获“函数不存在”的情况：

```erb
TRYCCALL 可能不存在的函数
  ; 函数存在时，调用后执行
CATCH
  ; 函数不存在时执行
ENDCATCH
```

相关命令还有 `TRYCJUMP`、`TRYCGOTO`、`TRYCJUMPFORM` 等。

## 函数列表调用：TRYCALLLIST / FUNC / ENDFUNC

依次尝试多个函数，调用最先找到的那个：

```erb
TRYCALLLIST
  FUNC 函数1
  FUNC 函数2
ENDFUNC
```

对应地还有 `TRYJUMPLIST`、`TRYGOTOLIST`。

## 嵌套与注意事项

- 复合语句可以任意嵌套，但**每一层都要完整闭合**；
- 漏写 `ENDIF` / `REND` / `NEXT` / `WEND` 会直接报错；
- `REPEAT` 嵌套时若使用不当可能出现无限循环，注意计数器；
- 建议每层缩进两个空格，避免“找不到配对”。

## 相关链接

- [复合语句](../guide/tutorials/Compound_Statement)（教程）
- [循环·分支语法](../translation/Command#循环·分支语法)（命令详解）
- [CALL·JUMP·GOTO 系](../translation/Command#call·jump·goto系)
- [ERB 的语句](ERB_Statements)
