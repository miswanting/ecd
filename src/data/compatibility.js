// 兼容性矩阵数据，供 <CompatibilityMatrix /> 使用。
//
// status 取值：
//   'yes'  —— 支持
//   'no'   —— 不支持
//   'diff' —— 行为与另一引擎不同（详见备注 / translation/Difference）
//
// 说明：Eramaker 与 Emuera 的差异主要依据 translation/Difference 与各功能页；
// 「改造版」通常继承 Emuera，并在此基础上额外提供图片、动画等能力，故默认与
// Emuera 同栏，个别差异在备注中说明。

export const compatibility = [
  // ---- 基本语法 ----
  { category: '基本语法', name: '函数定义 `@名称`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '基本语法', name: '注释 `;`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '基本语法', name: '标签 `$名称` 与 `GOTO`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '基本语法', name: '行连接 `{ }`', eramaker: 'no', emuera: 'yes', note: 'Emuera 扩展' },
  { category: '基本语法', name: '特殊注释 `;!;`', eramaker: 'no', emuera: 'yes', note: 'Emuera 中有效，Eramaker 中视为注释' },
  { category: '基本语法', name: '特殊注释 `;#;`', eramaker: 'no', emuera: 'yes', note: '仅在调试模式执行' },
  { category: '基本语法', name: '文件最后一行（无换行符）', eramaker: 'no', emuera: 'yes', note: 'Eramaker 会忽略最后一行' },

  // ---- 变量 ----
  { category: '变量', name: '系统变量 `A`~`Z`、`DAY`、`MONEY` 等', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '变量', name: '数组变量 `FLAG`、`CFLAG`、`ABL` 等', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '变量', name: '`#DIM` / `#DIMS` 用户自定义变量', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '变量', name: '私有变量', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '变量', name: '引用型变量 `REF`', eramaker: 'no', emuera: 'yes', note: 'ver1.810 起支持按引用传参' },
  { category: '变量', name: '常量 `CONST`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '变量', name: '广域变量（ERH 中定义）', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '变量', name: '`GLOBAL` / `GLOBALS`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '变量', name: '`CDFLAG`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '变量', name: '数组越界访问', eramaker: 'diff', emuera: 'diff', note: 'Eramaker 静默忽略，Emuera 报错' },
  { category: '变量', name: '数组最后一个元素', eramaker: 'diff', emuera: 'diff', note: 'Eramaker 会在读档时破坏数据' },

  // ---- 表达式与运算 ----
  { category: '表达式与运算', name: '四则运算与整数除法', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '表达式与运算', name: '比较、逻辑、位运算', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '表达式与运算', name: '字符串比较（`==`、`<` 等）', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '表达式与运算', name: '字符串拼接 `+`、重复 `*`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '表达式与运算', name: '三元运算 `? ～ #`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '表达式与运算', name: '`RAND` 的取值范围与偏差', eramaker: 'diff', emuera: 'diff', note: '可用兼容开关让 Emuera 模仿 Eramaker' },
  { category: '表达式与运算', name: '单目运算符 `-`', eramaker: 'diff', emuera: 'diff', note: 'Eramaker 中 `-100 < 0` 为假' },

  // ---- 复合语句 ----
  { category: '复合语句', name: '`IF` / `ELSEIF` / `ELSE` / `ENDIF`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '复合语句', name: '`REPEAT` / `REND`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '复合语句', name: '`FOR` / `NEXT`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '复合语句', name: '`WHILE` / `WEND`、`DO` / `LOOP`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '复合语句', name: '`SELECTCASE` / `CASE` / `ENDSELECT`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '复合语句', name: '`BREAK` / `CONTINUE`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '复合语句', name: '`TRYC` 系 / `CATCH` / `ENDCATCH`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '复合语句', name: '`TRYCALLLIST` / `FUNC` / `ENDFUNC`', eramaker: 'no', emuera: 'yes', note: '' },

  // ---- 函数与预处理 ----
  { category: '函数与预处理', name: '用户函数 `CALL` / `RETURN`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '函数与预处理', name: '参数 `ARG` / `ARGS`、返回值 `RESULT`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '函数与预处理', name: '参数初始值', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '函数与预处理', name: '参数按引用传递', eramaker: 'no', emuera: 'yes', note: 'ver1.810 起' },
  { category: '函数与预处理', name: '`#FUNCTION` / `#FUNCTIONS`（表达式内函数）', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '函数与预处理', name: '`#PRI` / `#LATER` / `#SINGLE` / `#ONLY`', eramaker: 'yes', emuera: 'yes', note: '`#SINGLE` 的中断条件在 1.752 修正' },
  { category: '函数与预处理', name: '`#DEFINE` 宏与头文件 `ERH`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '函数与预处理', name: '函数名中的符号', eramaker: 'diff', emuera: 'diff', note: 'Eramaker 允许任意符号，Emuera 只允许 `_`' },
  { category: '函数与预处理', name: '事件函数可被 `CALL`', eramaker: 'yes', emuera: 'no', note: '可用兼容开关恢复' },

  // ---- 输入与显示 ----
  { category: '输入与显示', name: '`PRINT` 系输出', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '输入与显示', name: '`INPUT` / `INPUTS`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '输入与显示', name: '`PRINTBUTTON`、`PRINTDATA`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '输入与显示', name: '`TINPUT` 系（限时输入）', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '输入与显示', name: '`HTML_PRINT` 与标签', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '输入与显示', name: '图片、精灵、动画', eramaker: 'no', emuera: 'yes', note: '需绘制接口支持；改造版通常提供更多' },
  { category: '输入与显示', name: '`DRAWLINE` 的换行规格', eramaker: 'diff', emuera: 'diff', note: 'ver1.739 前后行为不同' },

  // ---- CSV 与数据 ----
  { category: 'CSV 与数据', name: '`GameBase` / `Str` / `CharaXX` / `Abl` 等', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: 'CSV 与数据', name: '`VariableSize.csv`', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: 'CSV 与数据', name: '`_replace.csv`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: 'CSV 与数据', name: '`_rename.csv`', eramaker: 'no', emuera: 'yes', note: '来自 EraMakerEx；默认关闭，可用开关启用' },
  { category: 'CSV 与数据', name: 'CSV 中的异常数字（如 `0xFF`）', eramaker: 'diff', emuera: 'diff', note: 'Eramaker 按 0 处理，Emuera 报错' },

  // ---- 存档 ----
  { category: '存档', name: '标准存档 / 读取界面', eramaker: 'yes', emuera: 'yes', note: '' },
  { category: '存档', name: '`SAVEDATA` / `LOADDATA` / `CHKDATA`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '存档', name: '全局存档 `SAVEGLOBAL` / `LOADGLOBAL`', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '存档', name: '存档以 UTF-8 / 二进制保存', eramaker: 'no', emuera: 'yes', note: '' },
  { category: '存档', name: '`CALLNAME` 为空时返回 `NAME`', eramaker: 'diff', emuera: 'diff', note: '可用兼容开关恢复' },
  { category: '存档', name: 'SP 角色', eramaker: 'yes', emuera: 'no', note: 'Emuera 1.816 起默认不支持，可用兼容开关恢复' },
];
