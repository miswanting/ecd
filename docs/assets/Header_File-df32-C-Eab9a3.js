import{o as e,s as t,t as n,u as r}from"./app--qkcJxTK.js";var i=JSON.parse(`{"path":"/translation/Header_File-df32.html","title":"头文件（ERH）（风飏@df32翻译版）","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1789556905000,"contributors":[{"name":"Miswanting","username":"Miswanting","email":"ihex@foxmail.com","commits":1,"url":"https://github.com/Miswanting"}],"changelog":[{"hash":"f4aaaa665dd6d7cbce434ec5e6682b3aee19b711","time":1789556905000,"email":"ihex@foxmail.com","author":"Miswanting","message":"ci: bump toolchain to Node 24 and pnpm 12"}]},"filePathRelative":"translation/Header_File-df32.md"}`),a={name:`Header_File-df32.md`};function o(n,i,a,o,s,c){return r(),e(`div`,null,[...i[0]||=[t(`<h1 id="头文件-erh-风飏-df32翻译版" tabindex="-1"><a class="header-anchor" href="#头文件-erh-风飏-df32翻译版"><span>头文件（ERH）（风飏@df32翻译版）</span></a></h1><blockquote><p>翻译自原文档：https://osdn.net/projects/emuera/wiki/ERH</p></blockquote><p>译者：<a href="https://github.com/df32" target="_blank" rel="noopener noreferrer">风飏@df32</a></p><p>也可跳转至：<a href="Header_File">原版</a></p><p>除了扩展名为<code>ERB</code>的文件外，ERB文件夹还可以包含扩展名为<code>ERH</code>的文件。</p><p>ERH文件中包含需要在ERB文件之前处理的信息，即用<code>#DIM</code>和<code>#DIMS</code>声明的广域变量和用<code>#DEFINE</code>定义的宏。</p><p>除了<code>#DIM</code>、<code>#DIMS</code>和<code>#DEFINE</code>之外，ERH文件中不应当包含其他内容。</p><p>Emuera 读取放在<code>ERB</code>文件夹中的所有<code>*.ERH</code>文件， 其读取顺序是<code>csv文件夹中的文件</code>-&gt; <code>*.ERH</code> -&gt; <code>*.ERB</code>。</p><p>因此ERH中的定义无法作用于CSV，而CSV中的定义可以作用于ERH文件。 比如由<code>_rename.csv</code>定义的替换也将适用于<code>*.ERH</code>。</p><blockquote><p>由于eramakerEX没有对ERH应用<code>_rename.csv</code>，所以Emuera与eramakerEx在ERH文件上不兼容。</p></blockquote><h2 id="广域变量的声明" tabindex="-1"><a class="header-anchor" href="#广域变量的声明"><span>广域变量的声明</span></a></h2><p>另请参见<a href="Custom_Variable#%E5%B9%BF%E5%9F%9F%E5%8F%98%E9%87%8F%E7%9A%84%E4%B9%A6%E5%86%99%E6%A0%BC%E5%BC%8F">用户定义的变量</a>。</p><p>在ERH文件中声明的变量为广域变量，可以在任何ERB的任何地方引用。</p><p>与私有变量不同，广域变量不存在<code>DYNAMIC</code>和<code>STATIC</code>的区别，也不能用<code>REF</code>来定义引用类型的变量，但广域变量仍然可以用<code>CONST</code>来定义常量。</p><p>声明变量最高三维。</p><p>如果没有指定元素的数量，该变量就会变成一个有一个元素的数组，所以它可以像非数组变量一样使用。</p><p>变量可以用<code>#DIM</code>或<code>#DIMS</code>来声明，如下所示。</p><p>如果使用<code>#DIM HOGE,1,2</code>，它就会变成一个二维数组。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>  #DIM MY_INT</span></span></span>
<span class="line"><span class="line"><span>  #DIM MY_INT_ARRAY, 100</span></span></span>
<span class="line"><span class="line"><span>  #DIMS MY_STR</span></span></span>
<span class="line"><span class="line"><span>  #DIMS MY_STR_ARRAY, 100</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在ERH文件中声明上述内容后，ERB文件中即可使用声明的变量：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	MY_INT = 100</span></span></span>
<span class="line"><span class="line"><span>	MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45</span></span></span>
<span class="line"><span class="line"><span>	MY_STR = あああ</span></span></span>
<span class="line"><span class="line"><span>	PRINTFORML {MY_INT_ARRAY:10} %MY_STR%</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>可以作为一个变量使用。</p><p>在使用<code>#DIM</code>的变量声明中，元素的数量可以被指定为一个数字或一个常量表达式。</p><blockquote><p>注意，与<code>*.ERB</code>中的<code>#DIM</code>不同，ERH声明变量时不会扩展宏。</p></blockquote><h3 id="savedata-关键字" tabindex="-1"><a class="header-anchor" href="#savedata-关键字"><span>SAVEDATA 关键字</span></a></h3><p>声明变量时加入<code>SAVEDATA</code>关键字，以使该变量可以被保存在存档中。</p><p>当使用<code>SAVEDATA</code>关键字保存的多维变量时，必须在设置中启用<code>以二进制形式保存存档</code>选项。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>  #DIM SAVEDATA MY_INT_ARRAY, 100</span></span></span>
<span class="line"><span class="line"><span>  #DIMS SAVEDATA MY_STR_ARRAY, 100</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>通过这样的声明，<code>MY_INT_ARRAY</code>和<code>MY_STR_ARRAY</code>将以与内置变量（如<code>DAY</code>和<code>MONEY</code>）相同的方式保存和加载。</p><p>反之，没有用<code>SAVEDATA</code>关键字声明的变量将不会被保存到游戏存档，并在加载游戏时会被初始化。</p><h3 id="charadata-关键字" tabindex="-1"><a class="header-anchor" href="#charadata-关键字"><span>CHARADATA 关键字</span></a></h3><p>可以通过在变量声明中添加<code>CHARADATA</code>关键字来声明角色变量。</p><p><code>CHARADATA</code>可以和<code>SAVEDATA</code>关键字一起使用。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>  #DIM CHARADATA C_INT_ARRAY, 100</span></span></span>
<span class="line"><span class="line"><span>  #DIMS CHARADATA C_STR_ARRAY, 100</span></span></span>
<span class="line"><span class="line"><span>  #DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在上面的例子中，<code>C_INT_ARRAY</code>和<code>C_STR_ARRAY</code>是角色变量，但不会被游戏存档保存或加载。</p><p><code>CS_INT_ARRAY</code>是一个角色变量，可以被游戏存档保存和加载。</p><h3 id="global-关键字" tabindex="-1"><a class="header-anchor" href="#global-关键字"><span>GLOBAL 关键字</span></a></h3><p>你可以通过在变量声明中加入<code>GLOBAL</code>关键字来声明一个全局变量。</p><p><code>GLOBAL</code>可以和<code>SAVEDATA</code>关键字一起使用。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>  #DIM GLOBAL G_INT_ARRAY, 100</span></span></span>
<span class="line"><span class="line"><span>  #DIMS GLOBAL G_STR_ARRAY, 100</span></span></span>
<span class="line"><span class="line"><span>  #DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>全局变量不会随游戏存档的保存加载而变化。</p><p>由于这一特性，全局变量被用来在不同的存档之间共享数据。</p><p>如果同时使用<code>GLOBAL</code>和<code>SAVEDATA</code>关键字，变量将被<code>SAVEGLOBAL</code>和<code>LOADGLOBAL</code>指令读写到<code>global.sav</code>文件。</p><p>关于其他细节，如初始值和常量化，请参见<a href="">用户定义的变量</a>。</p><h2 id="宏的定义" tabindex="-1"><a class="header-anchor" href="#宏的定义"><span>宏的定义</span></a></h2><p>宏用于将ERB代码中的一串文本替换为另一个预先定义的文本。</p><p>这里说的宏不是Emuera运行中按下F1~F12按键的键盘宏。 宏的概念可以参考C和C++中的#define指令。</p><p>通过在 ERH 文件中定义宏，它适用于所有 ERB 文件中的代码。</p><h3 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法"><span>基本用法</span></a></h3><p>一个宏通常定义如下：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE &lt;替换源标识符&gt; &lt;替换目标表达式&gt;</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这将把ERB中的<code>&lt;替换源标识符&gt;</code>替换为<code>&lt;替换目标表达式&gt;</code>。例如：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVE 5</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	X = FIVE</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(宏展开后)</span></span></span>
<span class="line"><span class="line"><span>	X = 5</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>一个宏也可以有行末注释。 分号后的任何内容都会作为注释被忽略，不会被包括在宏中，也不会被展开。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVE 5 ;定义宏</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	X = FIVE + FIVE</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(展开后)</span></span></span>
<span class="line"><span class="line"><span>	X = 5 + 5</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>请注意，宏的展开几乎等同于文本替换。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>  #DEFINE SIX           1 + 5</span></span></span>
<span class="line"><span class="line"><span>  #DEFINE NINE          8 + 1</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>  X = SIX * NINE</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(展开后)</span></span></span>
<span class="line"><span class="line"><span>	X = 1 + 5 * 8 + 1</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>因为乘法优先，得到<code>X=42</code>。</p><p>宏可以展开为一个字符串常量，如<code>~~</code>，或展开为一个变量、函数或表达式。 因此可以把宏看作是扩展<code>#DEFINE</code>右边的文本。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE HOGE        &quot;ほげほげ&quot;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE PIYO        A</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FUGA        DA:10</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE HOGERA      LOCAL + MY_FUNC(X, Y)</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	X = STRLEN(HOGE)</span></span></span>
<span class="line"><span class="line"><span>	Y = PIYO + 5</span></span></span>
<span class="line"><span class="line"><span>	FUGA:20 += PIYO</span></span></span>
<span class="line"><span class="line"><span>	LOCAL = HOGERA</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>	@MY_FUNC(ARG, ARG:1)</span></span></span>
<span class="line"><span class="line"><span>	#FUNCTION</span></span></span>
<span class="line"><span class="line"><span>		;～略～</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(展开后)</span></span></span>
<span class="line"><span class="line"><span>	X = STRLEN(&quot;ほげほげ&quot;)</span></span></span>
<span class="line"><span class="line"><span>	Y = A + 5</span></span></span>
<span class="line"><span class="line"><span>	DA:10:20 += A</span></span></span>
<span class="line"><span class="line"><span>	LOCAL = LOCAL + MY_FUNC(X, Y)</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>	@MY_FUNC(ARG, ARG:1)</span></span></span>
<span class="line"><span class="line"><span>	#FUNCTION</span></span></span>
<span class="line"><span class="line"><span>		;～略～</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>宏在展开时，可能替换的是运算符或表达式的一部分，而不是一个完整的表达式。</p><p>这种宏的定义严重影响代码的可读性，不建议这种定义方式。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE PLUS       +</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVEPLUS   5 +</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	X = 1 PLUS 2</span></span></span>
<span class="line"><span class="line"><span>	Y = FIVEPLUS 2</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(展开后)</span></span></span>
<span class="line"><span class="line"><span>	X = 1 + 2</span></span></span>
<span class="line"><span class="line"><span>	Y = 5 + 2</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="宏的多重展开" tabindex="-1"><a class="header-anchor" href="#宏的多重展开"><span>宏的多重展开</span></a></h3><p>宏的定义可以嵌套。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVE_1 5</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVE_2 FIVE_1 + FIVE_1</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVE_3 FIVE_2 + FIVE_2</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	X = FIVE_3</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(展开后)</span></span></span>
<span class="line"><span class="line"><span>	X = 5 + 5 + 5 + 5</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>如果宏在多次展开后仍未展开完毕，Emuera会将其视作一个疑似自引用或循环引用的宏终止进程，并抛出错误。</p><p>注意避免自我引用和循环引用，如以下内容。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE HOGE HOGE</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE PIYO FUGA + 1</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FUGA PIYO + 2</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>;会抛出错误</span></span></span>
<span class="line"><span class="line"><span>	X = HOGE</span></span></span>
<span class="line"><span class="line"><span>	Y = PIYO</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="预处理指令" tabindex="-1"><a class="header-anchor" href="#预处理指令"><span>预处理指令</span></a></h3><p>可以根据是否定义了某一名称的宏，来执行不同的代码。</p><p>只有当XXX被定义时，<code>[IF XXX]</code>和<code>[ENDIF]</code>行之间的行才会被执行。例如，你可以使用以下方法：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	[IF HOGE]</span></span></span>
<span class="line"><span class="line"><span>		PRINTL HOGE被定义</span></span></span>
<span class="line"><span class="line"><span>	[ELSEIF PUYO]</span></span></span>
<span class="line"><span class="line"><span>		PRINTL HOGE没有被定义</span></span></span>
<span class="line"><span class="line"><span>		PRINTL PUYO被定义</span></span></span>
<span class="line"><span class="line"><span>	[ELSE]</span></span></span>
<span class="line"><span class="line"><span>		PRINTL HOGE和PUYO都没有被定义</span></span></span>
<span class="line"><span class="line"><span>	[ENDIF]</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>为此，你也可以定义空宏（没有替换目标的宏）。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE HOGE</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="宏的限制条件" tabindex="-1"><a class="header-anchor" href="#宏的限制条件"><span>宏的限制条件</span></a></h3><p>宏基本上只在表达式中展开。</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVE 5</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	PRINT FIVE</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>PRINT结果为文本<code>FIVE</code>。 这与<code>PRINT X</code>相同，它只打印字母X，而不是X的值。</p><p>宏替换不能是一个赋值运算符或包含赋值运算符的表达式。 下面的宏定义将导致一个错误：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>;会发生错误</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE HOGE =</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE PUGE X = 1</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>上面提到，宏可以在表达式中替换，但宏的定义必须完成括号的对应。 下面的宏定义将导致一个错误：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>;会发生错误</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE HOGE ( X +</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE PUGE Y )</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	Z = HOGE PUGE</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>不可能将一个宏替换成命令。 下面的宏定义将导致一个错误：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE MY_PRINTL     PRINTL</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	MY_PRINTL 执行PRINTL中</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(展开后)</span></span></span>
<span class="line"><span class="line"><span>	;会发生错误</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>此外，ERB脚本中的也预处理指令、属性名称或行头标记等关键字都无法适用于宏。</p><p>例如，<code>#DEFINE HOGE SKIPSTART</code>并不能将<code>[HOGE]</code>展开为<code>[SKIPSTART]</code>。</p><p>但其后的文本可以被宏展开，如ERB脚本中<code>#DIM</code>后声明的变量名，可以被宏替换。 例如，下面的代码：</p><div class="language-text line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre class="shiki slack-dark vp-code" style="background-color:#222222;color:#E6E6E6;"><code><span class="line"><span class="line"><span>;&lt;*.ERH&gt;</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE HOGE MY_INT</span></span></span>
<span class="line"><span class="line"><span>	#DEFINE FIVE 5</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;&lt;*.ERB&gt;</span></span></span>
<span class="line"><span class="line"><span>	@FUNC</span></span></span>
<span class="line"><span class="line"><span>	#DIM HOGE, FIVE</span></span></span>
<span class="line"><span class="line"><span>	HOGE:0 = 10</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>;(展开后)</span></span></span>
<span class="line"><span class="line"><span>	@FUNC</span></span></span>
<span class="line"><span class="line"><span>	#DIM MY_INT, 5</span></span></span>
<span class="line"><span class="line"><span>	MY_INT:0 = 10</span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>上面的代码可以正常工作。</p>`,90)]])}var s=n(a,[[`render`,o]]);export{i as _pageData,s as default};