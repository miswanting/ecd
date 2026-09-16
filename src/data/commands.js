// 命令速查数据，供 <HoverCard kind="cmd" name="..." /> 使用。
//
// 这是一份人工维护的精简子集，只收录文档中出现频率最高、最需要“随手查一下”的命令。
// 字段含义：
//   desc     一句话说明
//   sig      签名（省略也能显示，仅作提示）
//   category 所属分类（与 translation/Command.md 的分组一致）
//   link     详情链接（站内路径，组件会自动补上 base）
//
// 注意：新增命令时请与 translation/Command.md 保持一致。

export const commands = {
  // ---- PRINT 系列 ----
  PRINT: { desc: '原样输出文本，不换行。', sig: 'PRINT <字符串>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTL: { desc: '输出文本并换行。', sig: 'PRINTL <字符串>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTS: { desc: '输出字符串表达式的值，不换行。', sig: 'PRINTS <字符串表达式>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTSL: { desc: '输出字符串表达式的值并换行。', sig: 'PRINTSL <字符串表达式>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTV: { desc: '输出数值表达式的值，不换行。', sig: 'PRINTV <数值表达式>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTVL: { desc: '输出数值表达式的值并换行。', sig: 'PRINTVL <数值表达式>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTFORM: { desc: '按 FORM 语法输出，不换行。', sig: 'PRINTFORM <FORM格式文本>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTFORML: { desc: '按 FORM 语法输出并换行。', sig: 'PRINTFORML <FORM格式文本>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  PRINTBUTTON: { desc: '生成一个可点击的按钮。', sig: 'PRINTBUTTON(<C|LC>) <字符串表达式>, <数值/字符串表达式>', category: 'PRINT 系列', link: '/translation/Command#print系列' },
  CLEARLINE: { desc: '删除指定行数的文本。', sig: 'CLEARLINE <行数>', category: 'PRINT 系列', link: '/translation/Command#print系列' },

  // ---- 显示与字体 ----
  SETCOLOR: { desc: '设置文字颜色。', sig: 'SETCOLOR <红>,<绿>,<蓝> 或 <RGB>', category: '显示处理', link: '/translation/Command#显示处理·字体处理·显示方式参考' },
  RESETCOLOR: { desc: '恢复默认文字颜色。', category: '显示处理', link: '/translation/Command#显示处理·字体处理·显示方式参考' },
  SETBGCOLOR: { desc: '设置背景颜色。', category: '显示处理', link: '/translation/Command#显示处理·字体处理·显示方式参考' },
  FONTBOLD: { desc: '之后的文字加粗。', category: '显示处理', link: '/translation/Command#显示处理·字体处理·显示方式参考' },
  FONTREGULAR: { desc: '恢复普通文字样式。', category: '显示处理', link: '/translation/Command#显示处理·字体处理·显示方式参考' },
  ALIGNMENT: { desc: '设置文字对齐方式（LEFT / CENTER / RIGHT）。', sig: 'ALIGNMENT <关键字>', category: '显示处理', link: '/translation/Command#显示处理·字体处理·显示方式参考' },

  // ---- 字符串 ----
  TOSTR: { desc: '把数值转换为字符串。', sig: 'TOSTR <数值表达式>, <格式指示符>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  TOINT: { desc: '把字符串转换为数值。', sig: 'TOINT <字符串表达式>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  STRLEN: { desc: '求字符串的字节长度（全角算 2）。', sig: 'STRLEN <字符串>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  STRLENS: { desc: '求字符串表达式的字节长度。', sig: 'STRLENS <字符串表达式>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  SUBSTRING: { desc: '截取子串。', sig: 'SUBSTRING <字符串表达式>, <开始>, <长度>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  STRFIND: { desc: '查找子串，返回索引。', sig: 'STRFIND <字符串表达式>, <字符串表达式>(, <开始>)', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  REPLACE: { desc: '用正则表达式替换字符串。', sig: 'REPLACE <原始字符串>, <查找模式>, <替换字符串>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  SPLIT: { desc: '按分隔符分割字符串到数组。', sig: 'SPLIT <字符串表达式>, <字符串表达式>, <字符串变量>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },
  ESCAPE: { desc: '把字符串转义为可安全用于正则的文本。', sig: 'ESCAPE <字符串>', category: '字符串操作', link: '/translation/Command#字符串操作·引用' },

  // ---- 算术 ----
  ABS: { desc: '绝对值。', sig: 'ABS <数值表达式>', category: '算术', link: '/translation/Command#算术' },
  SIGN: { desc: '符号（负 -1 / 零 0 / 正 1）。', sig: 'SIGN <数值表达式>', category: '算术', link: '/translation/Command#算术' },
  SQRT: { desc: '平方根。', sig: 'SQRT <数值表达式>', category: '算术', link: '/translation/Command#算术' },
  MAX: { desc: '取最大值。', sig: 'MAX <数值表达式>(, <数值表达式>...)', category: '算术', link: '/translation/Command#算术' },
  MIN: { desc: '取最小值。', sig: 'MIN <数值表达式>(, <数值表达式>...)', category: '算术', link: '/translation/Command#算术' },
  LIMIT: { desc: '把值限制在某个区间内。', sig: 'LIMIT <值>, <下限>, <上限>', category: '算术', link: '/translation/Command#算术' },
  INRANGE: { desc: '判断值是否在区间内。', sig: 'INRANGE <值>, <下限>, <上限>', category: '算术', link: '/translation/Command#算术' },
  GETBIT: { desc: '取出指定位置的位。', sig: 'GETBIT <数值表达式>, <位位置>', category: '算术', link: '/translation/Command#算术' },
  SETBIT: { desc: '把指定位置的位设为 1。', sig: 'SETBIT <数值型变量>, <位位置>{, ...}', category: '算术', link: '/translation/Command#算术' },
  CLEARBIT: { desc: '把指定位置的位设为 0。', sig: 'CLEARBIT <数值型变量>, <位位置>{, ...}', category: '算术', link: '/translation/Command#算术' },

  // ---- 输入 ----
  INPUT: { desc: '等待玩家输入一个数值，结果在 `RESULT`。', sig: 'INPUT {<默认值>}', category: '输入与等待', link: '/translation/Command#输入·等待' },
  INPUTS: { desc: '等待玩家输入一段文本，结果在 `RESULTS`。', sig: 'INPUTS {<默认值>}', category: '输入与等待', link: '/translation/Command#输入·等待' },
  TINPUT: { desc: '带时间限制的数值输入。', sig: 'TINPUT <限时>, <超时值>{, <显示>, <超时文本>}', category: '输入与等待', link: '/translation/Command#输入·等待' },
  TINPUTS: { desc: '带时间限制的字符串输入。', sig: 'TINPUTS <限时>, <文本式>{, <显示>, <超时文本>}', category: '输入与等待', link: '/translation/Command#输入·等待' },
  ONEINPUT: { desc: '只接受一个字符的数值输入。', category: '输入与等待', link: '/translation/Command#输入·等待' },
  WAITANYKEY: { desc: '等待任意按键或鼠标点击。', category: '输入与等待', link: '/translation/Command#输入·等待' },

  // ---- 角色 ----
  ADDCHARA: { desc: '按 CSV 编号添加角色。', sig: 'ADDCHARA <编号>(, <编号>...)', category: '角色操作', link: '/translation/Command#角色操作·引用' },
  DELCHARA: { desc: '删除角色。', sig: 'DELCHARA <登录编号>(, ...)', category: '角色操作', link: '/translation/Command#角色操作·引用' },
  DELALLCHARA: { desc: '删除所有角色。', category: '角色操作', link: '/translation/Command#角色操作·引用' },
  SORTCHARA: { desc: '按指定键对角色排序。', sig: 'SORTCHARA <角色变量> {, <FORWARD/BACK>}', category: '角色操作', link: '/translation/Command#角色操作·引用' },
  ADDVOIDCHARA: { desc: '添加一个所有变量为 0 的空角色。', category: '角色操作', link: '/translation/Command#角色操作·引用' },

  // ---- 变量与数组 ----
  VARSET: { desc: '批量给数组赋值。', sig: 'VARSET <变量名>{, <值>, <起始>, <结束+1>}', category: '变量操作', link: '/translation/Command#变量操作·变量引用·csv引用' },
  CVARSET: { desc: '批量给角色变量赋值。', sig: 'CVARSET <角色变量>{, <元素>, <值>, <起始角色>, <结束角色+1>}', category: '变量操作', link: '/translation/Command#变量操作·变量引用·csv引用' },
  ARRAYCOPY: { desc: '复制数组。', sig: 'ARRAYCOPY <源变量名>, <目标变量名>', category: '变量操作', link: '/translation/Command#变量操作·变量引用·csv引用' },
  ARRAYSORT: { desc: '对数组排序。', sig: 'ARRAYSORT <变量>{, <FORWARD/BACK>, <起始>, <数量>}', category: '变量操作', link: '/translation/Command#变量操作·变量引用·csv引用' },
  RESETDATA: { desc: '初始化除 GLOBAL 外的所有数据。', category: '变量操作', link: '/translation/Command#变量操作·变量引用·csv引用' },

  // ---- 存档 ----
  SAVEDATA: { desc: '保存到指定编号的存档槽。', sig: 'SAVEDATA <编号>, <简介>', category: '游戏存档', link: '/translation/Command#游戏存档的操作' },
  LOADDATA: { desc: '读取指定编号的存档槽。', sig: 'LOADDATA <编号>', category: '游戏存档', link: '/translation/Command#游戏存档的操作' },
  CHKDATA: { desc: '检查存档槽是否可读取。', sig: 'CHKDATA <编号>', category: '游戏存档', link: '/translation/Command#游戏存档的操作' },
  SAVEGAME: { desc: '呼出标准存档界面（仅 SHOP 中可用）。', category: '游戏存档', link: '/translation/Command#游戏存档的操作' },
  LOADGAME: { desc: '呼出标准读取界面（仅 SHOP 中可用）。', category: '游戏存档', link: '/translation/Command#游戏存档的操作' },

  // ---- 流程与随机 ----
  CALL: { desc: '调用函数，执行完返回。', sig: 'CALL <函数名>{, <参数>...}', category: 'CALL·JUMP·GOTO 系', link: '/translation/Command#call·jump·goto系' },
  JUMP: { desc: '跳转到函数，不返回。', sig: 'JUMP <函数名>{, <参数>...}', category: 'CALL·JUMP·GOTO 系', link: '/translation/Command#call·jump·goto系' },
  TRYCALL: { desc: '调用函数，函数不存在也不报错。', sig: 'TRYCALL <函数名>{, <参数>...}', category: 'CALL·JUMP·GOTO 系', link: '/translation/Command#call·jump·goto系' },
  RETURN: { desc: '从函数返回，可指定返回值。', sig: 'RETURN <数值表达式>(, ...)', category: 'RETURN 系', link: '/translation/Command#return系' },
  RETURNF: { desc: '式中函数专用返回。', sig: 'RETURNF <表达式>', category: 'RETURN 系', link: '/translation/Command#return系' },
  RANDOMIZE: { desc: '用指定值初始化随机数。', category: '随机数', link: '/translation/Command#随机数的控制' },
  DUMPRAND: { desc: '把随机数状态保存到 `RANDDATA`。', category: '随机数', link: '/translation/Command#随机数的控制' },
  INITRAND: { desc: '从 `RANDDATA` 恢复随机数状态。', category: '随机数', link: '/translation/Command#随机数的控制' },

  // ---- 系统 ----
  BEGIN: { desc: '切换游戏流程（FIRST / TITLE / TRAIN ...）。', sig: 'BEGIN <关键字>', category: '调试辅助·系统流', link: '/translation/Command#调试辅助·系统流的控制' },
  DOTRAIN: { desc: '强制进行指定的训练命令。', sig: 'DOTRAIN <命令编号>', category: '调试辅助·系统流', link: '/translation/Command#调试辅助·系统流的控制' },
  THROW: { desc: '输出自定义错误并停止。', sig: 'THROW <FORM格式文本>', category: '调试辅助·系统流', link: '/translation/Command#调试辅助·系统流的控制' },
  ASSERT: { desc: '断言，条件为假时报错停止。', sig: 'ASSERT <数值表达式>', category: '调试辅助·系统流', link: '/translation/Command#调试辅助·系统流的控制' },
  QUIT: { desc: '退出游戏。', category: '系统', link: '/translation/Command' },
};
