// 术语中英日对照数据，供 <TerminologyTable /> 使用。
// 字段：zh 中文 / en 英文 / ja 日文 / note 说明

export const terminology = [
  // ---- 引擎与模式 ----
  { zh: '普通模式', en: 'Normal Mode', ja: '通常モード', note: '直接双击 exe 启动的模式' },
  { zh: '解析模式', en: 'Analysis Mode', ja: '解析モード', note: '拖入文件启动，做语法检查' },
  { zh: '调试模式', en: 'Debug Mode', ja: 'デバッグモード', note: '以 `-debug` 参数启动' },
  { zh: '引擎', en: 'Engine', ja: 'エンジン', note: '运行游戏的程序本体' },
  { zh: '改造版', en: 'Modded build', ja: '私家改造版', note: '在 Emuera 基础上增加功能的版本' },

  // ---- 窗口与对话框 ----
  { zh: '主窗口', en: 'Main Window', ja: 'メインウィンドウ', note: '' },
  { zh: '主控制台', en: 'Main Console', ja: 'メインコンソール', note: '主窗口中输入输出的部分' },
  { zh: '调试窗口', en: 'Debug Window', ja: 'デバッグウィンドウ', note: '' },
  { zh: '调试控制台', en: 'Debug Console', ja: 'デバッグコンソール', note: '' },
  { zh: '设置对话框', en: 'Configuration Dialog', ja: '設定ダイアログ', note: '' },
  { zh: '剪贴板对话框', en: 'Clipboard Dialog', ja: 'クリップボードダイアログ', note: '`Ctrl+C` 打开' },

  // ---- 函数 ----
  { zh: '命令', en: 'Command', ja: '命令', note: '如 `PRINT`、`WAIT`' },
  { zh: '函数', en: 'Function', ja: '関数', note: '以 `@名称` 定义、用 `CALL` 调用' },
  { zh: '事件函数', en: 'Event Function', ja: 'イベント関数', note: '由引擎在特定时机调用' },
  { zh: '表达式内函数', en: 'In-expression function', ja: '式中関数', note: '可在表达式中直接调用' },
  { zh: '内置函数', en: 'Built-in function', ja: '組み込み関数', note: '引擎自带，无需定义' },
  { zh: '用户定义函数', en: 'User-defined function', ja: 'ユーザー定義関数', note: '' },
  { zh: '参数', en: 'Argument / Parameter', ja: '引数', note: '`ARG` / `ARGS`' },
  { zh: '返回值', en: 'Return value', ja: '返り値', note: '放在 `RESULT` / `RESULTS`' },
  { zh: '调用', en: 'Call', ja: '呼び出し', note: '' },

  // ---- 预处理 ----
  { zh: '预处理指令', en: 'Preprocessor', ja: 'プリプロセッサ', note: '以 `#` 开头的行' },
  { zh: '属性', en: 'Attribute', ja: '属性', note: '如 `#PRI`、`#FUNCTION`' },
  { zh: '定义', en: 'Definition', ja: '定義', note: '如 `#DIM`、`#DEFINE`' },
  { zh: '宏', en: 'Macro', ja: 'マクロ', note: '`#DEFINE` 的字符串替换' },
  { zh: '头文件', en: 'Header file', ja: 'ヘッダーファイル', note: '扩展名 `.ERH`' },

  // ---- 行・语句・表达式 ----
  { zh: '行', en: 'Line', ja: '行', note: '物理行' },
  { zh: '语句', en: 'Statement', ja: '文', note: '一个处理单位' },
  { zh: '表达式', en: 'Expression', ja: '式', note: '能算出结果的东西' },
  { zh: '数值表达式', en: 'Numeric expression', ja: '数式', note: '结果为数值' },
  { zh: '字符串表达式', en: 'String expression', ja: '文字列式', note: '结果为字符串' },
  { zh: '格式化字符串', en: 'Formatted string', ja: '書式付文字列', note: 'FORM 语法' },
  { zh: '赋值', en: 'Assignment', ja: '代入', note: '`变量 = 值`' },
  { zh: '注释', en: 'Comment', ja: 'コメント', note: '`;`' },
  { zh: '标签', en: 'Label', ja: 'ラベル', note: '`$名称`' },
  { zh: '行连接', en: 'Line continuation', ja: '行連結', note: '`{ }` 跨行' },

  // ---- 变量 ----
  { zh: '变量', en: 'Variable', ja: '変数', note: '' },
  { zh: '伪变量', en: 'Pseudo variable', ja: '擬似変数', note: '如 `RAND`、`CHARANUM`' },
  { zh: '数组变量', en: 'Array variable', ja: '配列変数', note: '如 `FLAG`、`STR`' },
  { zh: '角色变量', en: 'Character variable', ja: 'キャラクタ変数', note: '第一维是角色编号' },
  { zh: '双重数组变量', en: 'Double array variable', ja: '二重配列変数', note: '既是角色变量又是数组变量' },
  { zh: '多维数组变量', en: 'Multidimensional array', ja: '多次元配列変数', note: '如 `DA`、`TA`' },
  { zh: '局部变量', en: 'Local variable', ja: 'ローカル変数', note: '`LOCAL` / `LOCALS`' },
  { zh: '广域变量', en: 'Nonlocal variable', ja: '広域変数', note: '所有函数共享' },
  { zh: '全局变量', en: 'Global variable', ja: 'グローバル変数', note: '跨存档共享' },
  { zh: '私有变量', en: 'Private variable', ja: 'プライベート変数', note: '`#DIM` 定义，仅本函数可见' },
  { zh: '引用型变量', en: 'Reference variable', ja: '参照型変数', note: '`REF`' },
  { zh: '维度', en: 'Dimension', ja: '次元', note: '' },
  { zh: '元素数', en: 'Number of elements', ja: '要素数', note: '' },
  { zh: '索引 / 下标', en: 'Index', ja: '添字', note: '从 0 开始' },

  // ---- 值 ----
  { zh: '数值', en: 'Integer / Number', ja: '数値', note: '64 位有符号整数' },
  { zh: '字符串', en: 'String', ja: '文字列', note: '' },
  { zh: '文本', en: 'Text', ja: 'テキスト', note: '' },
  { zh: '全角 / 半角', en: 'Full-width / Half-width', ja: '全角 / 半角', note: '' },

  // ---- CSV 字段 ----
  { zh: '角色编号', en: 'Character number', ja: '番号', note: '`番号` → `NO`' },
  { zh: '名字', en: 'Name', ja: '名前', note: '`名前` → `NAME`' },
  { zh: '称呼', en: 'Call name', ja: '呼び名', note: '`呼び名` → `CALLNAME`' },
  { zh: '昵称', en: 'Nickname', ja: 'あだ名', note: '`あだ名` → `NICKNAME`' },
  { zh: '基础值', en: 'Base', ja: '基礎', note: '`基礎` → `BASE` / `MAXBASE`' },
  { zh: '能力', en: 'Ability', ja: '能力', note: '`能力` → `ABL`' },
  { zh: '素质 / 天赋', en: 'Talent', ja: '素質', note: '`素質` → `TALENT`' },
  { zh: '经验', en: 'Experience', ja: '経験', note: '`経験` → `EXP`' },
  { zh: '刻印', en: 'Mark', ja: '刻印', note: '`刻印` → `MARK`' },
  { zh: '相性 / 关系', en: 'Relation', ja: '相性', note: '`相性` → `RELATION`' },
  { zh: '角色标志', en: 'Character flag', ja: 'フラグ', note: '`フラグ` → `CFLAG`' },
  { zh: '助手', en: 'Assistant', ja: '助手', note: '`助手` → `ISASSI`' },
  { zh: '物品', en: 'Item', ja: 'アイテム', note: '`Item.csv` → `ITEM`' },
  { zh: '训练命令', en: 'Train command', ja: '調教コマンド', note: '`Train.csv` → `TRAINNAME`' },

  // ---- 显示 ----
  { zh: '字体名', en: 'Font name', ja: 'フォント名', note: '' },
  { zh: '字号', en: 'Font size', ja: 'フォントサイズ', note: '' },
  { zh: '行高', en: 'Line height', ja: '一行の高さ', note: '' },
  { zh: '文字色', en: 'Text color', ja: '文字色', note: '' },
  { zh: '背景色', en: 'Background color', ja: '背景色', note: '' },
  { zh: '对齐', en: 'Alignment', ja: '位置揃え', note: '`LEFT` / `CENTER` / `RIGHT`' },
  { zh: '绘制接口', en: 'Drawing interface', ja: '描画インターフェース', note: '`WINAPI` / `GRAPHICS` / `TEXTRENDERER`' },
  { zh: '按钮', en: 'Button', ja: 'ボタン', note: '`[0]` 形式，可点击' },
  { zh: '精灵', en: 'Sprite', ja: 'スプライト', note: '' },
  { zh: '资源', en: 'Resource', ja: 'リソース', note: '`resources/` 中的图片等' },

  // ---- 存档 ----
  { zh: '存档', en: 'Save', ja: 'セーブ', note: '' },
  { zh: '读档', en: 'Load', ja: 'ロード', note: '' },
  { zh: '存档槽', en: 'Save slot', ja: 'セーブデータ', note: '' },
  { zh: '全局存档', en: 'Global save', ja: 'グローバルセーブ', note: '`SAVEGLOBAL`' },
  { zh: '存档简介', en: 'Save comment', ja: 'セーブデータのコメント', note: '`@SAVEINFO` 生成' },

  // ---- 兼容性 ----
  { zh: '兼容性开关', en: 'Compatibility option', ja: '互換性オプション', note: '让 Emuera 模仿 Eramaker' },
  { zh: '警告等级', en: 'Warning level', ja: '警告レベル', note: '0～3' },
  { zh: '无限循环', en: 'Infinite loop', ja: '無限ループ', note: '超过时限且无 `WAIT` 时警告' },
];
