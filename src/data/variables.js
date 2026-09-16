// 变量速查数据，供 <HoverCard kind="var" name="..." /> 使用。
//
// 这是一份人工维护的精简子集，只收录文档中出现频率最高、最需要“随手查一下”的变量。
// 字段含义：
//   desc  一句话说明
//   type  值类型（数值 / 字符串）
//   scope 作用域（内置 / 角色变量 / 局部 / 广域 / 全局）
//   dim   维度（0 表示非数组）
//   link  详情链接（站内路径，组件会自动补上 base）
//
// 注意：新增变量时请与 reference/ERB_Variables.md 保持一致。

export const variables = {
  // ---- 流程与控制 ----
  RESULT: { desc: '命令的数值结果。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  RESULTS: { desc: '命令的字符串结果。', type: '字符串', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  COUNT: { desc: '`REPEAT` 的计数器，从 0 开始。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  MASTER: { desc: '主角（玩家）的登录编号。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  TARGET: { desc: '当前被操作对象的登录编号。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  ASSI: { desc: '助手的登录编号。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  CHARANUM: { desc: '当前游戏中的角色总数。', type: '数值', scope: '伪变量', dim: '0', link: '/reference/ERB_Variables' },
  SELECTCOM: { desc: '当前选择的训练命令编号。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  PREVCOM: { desc: '上一个训练命令编号。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  NEXTCOM: { desc: '下一个训练命令编号（不建议使用）。', type: '数值', scope: '内置', dim: '1', link: '/reference/ERB_Variables' },
  DAY: { desc: '当前天数。', type: '数值', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  TIME: { desc: '当前时间。', type: '数值', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  MONEY: { desc: '当前金钱。', type: '数值', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  LINECOUNT: { desc: '当前已显示的行数。', type: '数值', scope: '伪变量', dim: '0', link: '/reference/ERB_Variables' },
  ISTIMEOUT: { desc: '`TINPUT` 系是否已超时（1 为超时）。', type: '数值', scope: '伪变量', dim: '0', link: '/reference/ERB_Variables' },
  RANDDATA: { desc: '随机数状态，配合 `DUMPRAND` / `INITRAND` 使用。', type: '数值', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },

  // ---- 角色 ----
  NO: { desc: '角色的 CSV 编号。', type: '数值', scope: '角色变量', dim: 'C0', link: '/reference/ERB_Variables#常用的角色变量' },
  NAME: { desc: '角色名字，对应 `CharaXX.csv` 的 `名前`。', type: '字符串', scope: '角色变量', dim: 'C0', link: '/reference/ERB_Variables#常用的角色变量' },
  CALLNAME: { desc: '角色称呼，对应 `呼び名`；为空时可用 `NAME` 代替。', type: '字符串', scope: '角色变量', dim: 'C0', link: '/reference/ERB_Variables#常用的角色变量' },
  NICKNAME: { desc: '角色昵称，对应 `あだ名`。', type: '字符串', scope: '角色变量', dim: 'C0', link: '/reference/ERB_Variables#常用的角色变量' },
  BASE: { desc: '角色的基础值（体力、精力等）。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  MAXBASE: { desc: '角色基础值的上限。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  ABL: { desc: '角色能力值，编号对应 `Abl.csv`。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  TALENT: { desc: '角色素质（天赋），编号对应 `Talent.csv`。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  EXP: { desc: '角色经验，编号对应 `Exp.csv`。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  MARK: { desc: '角色刻印，编号对应 `Mark.csv`。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  CFLAG: { desc: '角色标志。每位角色一套，常用来存放好感、关系等自定义数据。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  RELATION: { desc: '相性，即该角色对其他角色的关系值。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  PALAM: { desc: '角色参数，编号对应 `Palam.csv`。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  STAIN: { desc: '角色污渍，编号对应 `Stain.csv`。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  EX: { desc: '角色经验值，编号对应 `Ex.csv`。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  TEQUIP: { desc: '临时装备。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },
  EQUIP: { desc: '永久装备。', type: '数值', scope: '角色变量', dim: 'C1', link: '/reference/ERB_Variables#常用的角色变量' },

  // ---- 非角色数组 ----
  FLAG: { desc: '全局标志数组，常用于记录剧情进度。', type: '数值', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  TFLAG: { desc: '每回合重置的标志数组。', type: '数值', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  ITEM: { desc: '角色持有的物品数量。', type: '数值', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  STR: { desc: '全局字符串数组，初值来自 `Str.csv`。', type: '字符串', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  SAVESTR: { desc: '可保存的字符串数组。', type: '字符串', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },
  TSTR: { desc: '临时字符串数组，`BEGIN TRAIN` 时重置。', type: '字符串', scope: '存档变量', dim: '1', link: '/reference/ERB_Variables' },

  // ---- 作用域 ----
  LOCAL: { desc: '按函数区分的数值数组。', type: '数值', scope: '局部', dim: '1', link: '/reference/ERB_Variables' },
  LOCALS: { desc: '按函数区分的字符串数组。', type: '字符串', scope: '局部', dim: '1', link: '/reference/ERB_Variables' },
  ARG: { desc: '函数接收的数值参数。', type: '数值', scope: '局部', dim: '1', link: '/reference/ERB_Variables' },
  ARGS: { desc: '函数接收的字符串参数。', type: '字符串', scope: '局部', dim: '1', link: '/reference/ERB_Variables' },
  GLOBAL: { desc: '跨存档共享的数值数组，用 `SAVEGLOBAL` 保存。', type: '数值', scope: '全局', dim: '1', link: '/reference/ERB_Variables' },
  GLOBALS: { desc: '跨存档共享的字符串数组。', type: '字符串', scope: '全局', dim: '1', link: '/reference/ERB_Variables' },

  // ---- 名称变量 ----
  ABLNAME: { desc: '`Abl.csv` 中定义的能力名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  TALENTNAME: { desc: '`Talent.csv` 中定义的素质名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  EXPNAME: { desc: '`Exp.csv` 中定义的经验名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  MARKNAME: { desc: '`Mark.csv` 中定义的刻印名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  PALAMNAME: { desc: '`Palam.csv` 中定义的参数名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  ITEMNAME: { desc: '`Item.csv` 中定义的物品名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  BASENAME: { desc: '`Base.csv` 中定义的基础属性名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  CFLAGNAME: { desc: '`Cflag.csv` 中定义的角色标志名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
  TRAINNAME: { desc: '`Train.csv` 中定义的训练命令名称。', type: '字符串', scope: '名称变量', dim: '1', link: '/reference/ERB_Variables#csv-派生的名称变量' },
};
