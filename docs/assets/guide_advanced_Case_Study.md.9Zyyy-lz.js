import{X as e,Y as t,ct as n,t as r}from"./chunks/framework.CaFWb3SA.js";var i=JSON.parse(`{"title":"完整实战：从零做一个「打工养成」小游戏","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/Case_Study.md","filePath":"guide/advanced/Case_Study.md"}`),a={name:`guide/advanced/Case_Study.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="完整实战-从零做一个「打工养成」小游戏" tabindex="-1">完整实战：从零做一个「打工养成」小游戏 <a class="header-anchor" href="#完整实战-从零做一个「打工养成」小游戏" aria-label="Permalink to “完整实战：从零做一个「打工养成」小游戏”">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to “前言”">​</a></h2><p>前面我们把 EraBasic 的零件都学了一遍，但它们散落在各处。这一篇，我们把这些零件拼成一个<strong>能从头玩到尾的小游戏</strong>——有角色、有主循环、有存档、有结局。</p><p>写完之后，你就拥有了一个可以继续扩展的「骨架」，之后所有内容都是往它上面加东西。</p><div class="warning custom-block"><p class="custom-block-title">教程依赖</p><p>本教程假设您已完成<a href="./../tutorials/">入门教程</a>，尤其是<a href="./../tutorials/Function.html">函数的定义与用法</a>、<a href="./../tutorials/Save_Load.html">游戏的保存与加载</a>和<a href="./../tutorials/System_Flow.html">内置流程</a>。</p></div><h2 id="游戏设计" tabindex="-1">游戏设计 <a class="header-anchor" href="#游戏设计" aria-label="Permalink to “游戏设计”">​</a></h2><p>我们做一个最简单的养成游戏：</p><ul><li>主角是<strong>小明</strong>，有一项属性：<strong>体力</strong>（初始 100）；</li><li>每天可以选择<strong>打工</strong>（体力 -20、金钱 +100）或<strong>休息</strong>（体力 +50）；</li><li>一共进行 <strong>10 天</strong>，结束后结算攒下的金钱；</li><li>随时可以存档、读档。</li></ul><p>工程结构：</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span>root/</span></span>
<span class="line"><span> ├─ emuera.config</span></span>
<span class="line"><span> ├─ Emuera1824.exe</span></span>
<span class="line"><span> ├─ CSV/</span></span>
<span class="line"><span> │   └─ Chara01.csv</span></span>
<span class="line"><span> └─ ERB/</span></span>
<span class="line"><span>     └─ System.erb</span></span></code></pre></div><h2 id="第一步-定义角色" tabindex="-1">第一步：定义角色 <a class="header-anchor" href="#第一步-定义角色" aria-label="Permalink to “第一步：定义角色”">​</a></h2><p>在 <code>CSV/</code> 中新建 <code>Chara01.csv</code>：</p><div class="language-csv"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">csv</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#E6E6E6;">番号,1</span></span>
<span class="line"><span style="color:#E6E6E6;">名前,小明</span></span>
<span class="line"><span style="color:#E6E6E6;">呼び名,小明</span></span>
<span class="line"><span style="color:#E6E6E6;">基礎,0,100</span></span></code></pre></div><p>这定义了一个编号为 1 的角色「小明」，其 0 号基础属性（我们用<strong>体力</strong>）初始值为 100。</p><blockquote><p>字段含义见 <a href="./../../reference/CSV_File.html#charaxx-csv">CSV 文件参考</a>。</p></blockquote><h2 id="第二步-新游戏初始化" tabindex="-1">第二步：新游戏初始化 <a class="header-anchor" href="#第二步-新游戏初始化" aria-label="Permalink to “第二步：新游戏初始化”">​</a></h2><p>在 <code>ERB/</code> 中新建 <code>System.erb</code>，先写新游戏的入口 <code>@EVENTFIRST</code>：</p><div class="language-erb"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">erb</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">EVENTFIRST</span></span>
<span class="line"><span style="color:#569CD6;">  DELALLCHARA</span><span style="color:#6A9955;">       ; 清空所有角色，保证从头开始</span></span>
<span class="line"><span style="color:#569CD6;">  ADDCHARA</span><span style="color:#B5CEA8;"> 1</span><span style="color:#6A9955;">        ; 添加 CSV 编号为 1 的小明（此时登录编号为 0）</span></span>
<span class="line"><span style="color:#9CDCFE;">  DAY</span><span style="color:#D4D4D4;"> =</span><span style="color:#B5CEA8;"> 1</span><span style="color:#6A9955;">           ; 内置变量：天数</span></span>
<span class="line"><span style="color:#9CDCFE;">  MONEY</span><span style="color:#D4D4D4;"> =</span><span style="color:#B5CEA8;"> 0</span><span style="color:#6A9955;">         ; 内置变量：金钱</span></span>
<span class="line"><span style="color:#9CDCFE;">  BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> =</span><span style="color:#B5CEA8;"> 100</span><span style="color:#6A9955;">    ; 小明的体力</span></span>
<span class="line"><span style="color:#C586C0;">  BEGIN</span><span style="color:#9CDCFE;"> SHOP</span><span style="color:#6A9955;">        ; 进入主循环</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span></code></pre></div><p><code>DAY</code>、<code>MONEY</code> 是 Emuera 的内置变量，不用定义就能用；<code>BASE:0:0</code> 是「登录编号 0 的角色的 0 号基础属性」。</p><h2 id="第三步-主循环" tabindex="-1">第三步：主循环 <a class="header-anchor" href="#第三步-主循环" aria-label="Permalink to “第三步：主循环”">​</a></h2><p>主循环用 <code>@SHOW_SHOP</code>（引擎在进入商店流程时自动调用它）。</p><div class="language-erb"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">erb</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">SHOW_SHOP</span></span>
<span class="line"><span style="color:#6A9955;">  ; 结束条件</span></span>
<span class="line"><span style="color:#C586C0;">  IF</span><span style="color:#9CDCFE;"> DAY</span><span style="color:#D4D4D4;"> &gt;</span><span style="color:#B5CEA8;"> 10</span></span>
<span class="line"><span style="color:#C586C0;">    CALL</span><span style="color:#DCDCAA;"> SHOW_ENDING</span></span>
<span class="line"><span style="color:#C586C0;">    BEGIN</span><span style="color:#9CDCFE;"> TITLE</span></span>
<span class="line"><span style="color:#C586C0;">    RETURN</span></span>
<span class="line"><span style="color:#C586C0;">  ENDIF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  ; 显示状态</span></span>
<span class="line"><span style="color:#569CD6;">  CLEARLINE</span><span style="color:#9CDCFE;"> LINECOUNT</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> ══════</span><span style="color:#9CDCFE;"> 打工养成</span><span style="color:#9CDCFE;"> ══════</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 第</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> DAY</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 天</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 小明</span><span style="color:#9CDCFE;">　体力：</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 　金钱：</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> MONEY</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  ; 显示选项</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">100</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">打工（体力</span><span style="color:#D4D4D4;"> -</span><span style="color:#B5CEA8;">20</span><span style="color:#9CDCFE;">，金钱</span><span style="color:#D4D4D4;"> +</span><span style="color:#B5CEA8;">100</span><span style="color:#9CDCFE;">）</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">101</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">休息（体力</span><span style="color:#D4D4D4;"> +</span><span style="color:#B5CEA8;">50</span><span style="color:#9CDCFE;">）</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">102</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">保存游戏</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">103</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">读取游戏</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">104</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">结束游戏</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span></code></pre></div><h3 id="为什么选项编号从-100-开始" tabindex="-1">为什么选项编号从 100 开始？ <a class="header-anchor" href="#为什么选项编号从-100-开始" aria-label="Permalink to “为什么选项编号从 100 开始？”">​</a></h3><p>这是 Emuera「商店流程」的一个约定：</p><ul><li>输入 <strong>0～99</strong>：引擎当作「购买第 N 号物品」处理（我们这里没有物品，所以避开这段编号）；</li><li>输入 <strong>100 及以上</strong>（或负数）：引擎把它交给我们自己的 <code>@USERSHOP</code> 函数处理。</li></ul><p>所以自定义按钮统一用 <code>[100]</code> 起步。这个分界值可以通过 <code>_replace.csv</code> 的<code>販売アイテム数</code>修改。</p><h2 id="第四步-处理玩家的选择" tabindex="-1">第四步：处理玩家的选择 <a class="header-anchor" href="#第四步-处理玩家的选择" aria-label="Permalink to “第四步：处理玩家的选择”">​</a></h2><p><code>@USERSHOP</code> 会收到玩家输入的数字（放在 <code>RESULT</code> 里）：</p><div class="language-erb"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">erb</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">USERSHOP</span></span>
<span class="line"><span style="color:#C586C0;">  SELECTCASE</span><span style="color:#9CDCFE;"> RESULT</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 100</span></span>
<span class="line"><span style="color:#C586C0;">      IF</span><span style="color:#9CDCFE;"> BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> &lt;</span><span style="color:#B5CEA8;"> 20</span></span>
<span class="line"><span style="color:#569CD6;">        PRINTL</span><span style="color:#9CDCFE;"> 体力不足，今天没法打工了。</span></span>
<span class="line"><span style="color:#569CD6;">        WAIT</span></span>
<span class="line"><span style="color:#C586C0;">      ELSE</span></span>
<span class="line"><span style="color:#9CDCFE;">        BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> -=</span><span style="color:#B5CEA8;"> 20</span></span>
<span class="line"><span style="color:#9CDCFE;">        MONEY</span><span style="color:#D4D4D4;"> +=</span><span style="color:#B5CEA8;"> 100</span></span>
<span class="line"><span style="color:#9CDCFE;">        DAY</span><span style="color:#D4D4D4;"> +=</span><span style="color:#B5CEA8;"> 1</span></span>
<span class="line"><span style="color:#C586C0;">      ENDIF</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 101</span></span>
<span class="line"><span style="color:#9CDCFE;">      LIMIT</span><span style="color:#9CDCFE;"> BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> +</span><span style="color:#B5CEA8;"> 50</span><span style="color:#E6E6E6;">, </span><span style="color:#B5CEA8;">0</span><span style="color:#E6E6E6;">, </span><span style="color:#B5CEA8;">100</span></span>
<span class="line"><span style="color:#9CDCFE;">      BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> =</span><span style="color:#9CDCFE;"> RESULT</span></span>
<span class="line"><span style="color:#9CDCFE;">      DAY</span><span style="color:#D4D4D4;"> +=</span><span style="color:#B5CEA8;"> 1</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 102</span></span>
<span class="line"><span style="color:#569CD6;">      SAVEGAME</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 103</span></span>
<span class="line"><span style="color:#569CD6;">      LOADGAME</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 104</span></span>
<span class="line"><span style="color:#C586C0;">      BEGIN</span><span style="color:#9CDCFE;"> TITLE</span></span>
<span class="line"><span style="color:#C586C0;">  ENDSELECT</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span></code></pre></div><p>几点说明：</p><ul><li>打工前先判断体力是否足够，不够就给出提示、不消耗这一天；</li><li>休息用 <code>LIMIT</code> 把体力限制在 0～100 之间，不会超过上限；</li><li><code>SAVEGAME</code> / <code>LOADGAME</code> 会呼出引擎自带的存档 / 读取界面（它们只能在商店流程中使用，这里正好合适）。</li></ul><h2 id="第五步-给存档写简介" tabindex="-1">第五步：给存档写简介 <a class="header-anchor" href="#第五步-给存档写简介" aria-label="Permalink to “第五步：给存档写简介”">​</a></h2><p>引擎在为每个存档槽生成简介时会调用 <code>@SAVEINFO</code>：</p><div class="language-erb"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">erb</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">SAVEINFO</span></span>
<span class="line"><span style="color:#569CD6;">  PUTFORM</span><span style="color:#E6E6E6;"> 第 </span><span style="color:#569CD6;">{</span><span style="color:#9CDCFE;">DAY</span><span style="color:#569CD6;">}</span><span style="color:#E6E6E6;"> 天　金钱 </span><span style="color:#569CD6;">{</span><span style="color:#9CDCFE;">MONEY</span><span style="color:#569CD6;">}</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span></code></pre></div><p><code>PUTFORM</code> 会用与 <code>PRINTFORM</code> 类似的方式把当前进度写进存档简介，玩家就能一眼看出每个存档的情况。</p><h2 id="第六步-结算画面" tabindex="-1">第六步：结算画面 <a class="header-anchor" href="#第六步-结算画面" aria-label="Permalink to “第六步：结算画面”">​</a></h2><div class="language-erb"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">erb</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">SHOW_ENDING</span></span>
<span class="line"><span style="color:#569CD6;">  CLEARLINE</span><span style="color:#9CDCFE;"> LINECOUNT</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 十天的打工结束了。</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 小明一共攒下</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> MONEY</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 枚金币。</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 按任意键回到标题画面。</span></span>
<span class="line"><span style="color:#569CD6;">  WAIT</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span></code></pre></div><h2 id="完整代码" tabindex="-1">完整代码 <a class="header-anchor" href="#完整代码" aria-label="Permalink to “完整代码”">​</a></h2><p><code>ERB/System.erb</code> 全文：</p><div class="language-erb"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">erb</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#6A9955;">; ========== 打工养成 · 主脚本 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">; ---------- 新游戏 ----------</span></span>
<span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">EVENTFIRST</span></span>
<span class="line"><span style="color:#569CD6;">  DELALLCHARA</span></span>
<span class="line"><span style="color:#569CD6;">  ADDCHARA</span><span style="color:#B5CEA8;"> 1</span></span>
<span class="line"><span style="color:#9CDCFE;">  DAY</span><span style="color:#D4D4D4;"> =</span><span style="color:#B5CEA8;"> 1</span></span>
<span class="line"><span style="color:#9CDCFE;">  MONEY</span><span style="color:#D4D4D4;"> =</span><span style="color:#B5CEA8;"> 0</span></span>
<span class="line"><span style="color:#9CDCFE;">  BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> =</span><span style="color:#B5CEA8;"> 100</span></span>
<span class="line"><span style="color:#C586C0;">  BEGIN</span><span style="color:#9CDCFE;"> SHOP</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">; ---------- 主循环 ----------</span></span>
<span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">SHOW_SHOP</span></span>
<span class="line"><span style="color:#C586C0;">  IF</span><span style="color:#9CDCFE;"> DAY</span><span style="color:#D4D4D4;"> &gt;</span><span style="color:#B5CEA8;"> 10</span></span>
<span class="line"><span style="color:#C586C0;">    CALL</span><span style="color:#DCDCAA;"> SHOW_ENDING</span></span>
<span class="line"><span style="color:#C586C0;">    BEGIN</span><span style="color:#9CDCFE;"> TITLE</span></span>
<span class="line"><span style="color:#C586C0;">    RETURN</span></span>
<span class="line"><span style="color:#C586C0;">  ENDIF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">  CLEARLINE</span><span style="color:#9CDCFE;"> LINECOUNT</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> ══════</span><span style="color:#9CDCFE;"> 打工养成</span><span style="color:#9CDCFE;"> ══════</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 第</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> DAY</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 天</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 小明</span><span style="color:#9CDCFE;">　体力：</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 　金钱：</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> MONEY</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">100</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">打工（体力</span><span style="color:#D4D4D4;"> -</span><span style="color:#B5CEA8;">20</span><span style="color:#9CDCFE;">，金钱</span><span style="color:#D4D4D4;"> +</span><span style="color:#B5CEA8;">100</span><span style="color:#9CDCFE;">）</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">101</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">休息（体力</span><span style="color:#D4D4D4;"> +</span><span style="color:#B5CEA8;">50</span><span style="color:#9CDCFE;">）</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">102</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">保存游戏</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">103</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">读取游戏</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#E6E6E6;"> [</span><span style="color:#B5CEA8;">104</span><span style="color:#E6E6E6;">] </span><span style="color:#9CDCFE;">结束游戏</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">; ---------- 处理选择 ----------</span></span>
<span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">USERSHOP</span></span>
<span class="line"><span style="color:#C586C0;">  SELECTCASE</span><span style="color:#9CDCFE;"> RESULT</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 100</span></span>
<span class="line"><span style="color:#C586C0;">      IF</span><span style="color:#9CDCFE;"> BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> &lt;</span><span style="color:#B5CEA8;"> 20</span></span>
<span class="line"><span style="color:#569CD6;">        PRINTL</span><span style="color:#9CDCFE;"> 体力不足，今天没法打工了。</span></span>
<span class="line"><span style="color:#569CD6;">        WAIT</span></span>
<span class="line"><span style="color:#C586C0;">      ELSE</span></span>
<span class="line"><span style="color:#9CDCFE;">        BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> -=</span><span style="color:#B5CEA8;"> 20</span></span>
<span class="line"><span style="color:#9CDCFE;">        MONEY</span><span style="color:#D4D4D4;"> +=</span><span style="color:#B5CEA8;"> 100</span></span>
<span class="line"><span style="color:#9CDCFE;">        DAY</span><span style="color:#D4D4D4;"> +=</span><span style="color:#B5CEA8;"> 1</span></span>
<span class="line"><span style="color:#C586C0;">      ENDIF</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 101</span></span>
<span class="line"><span style="color:#9CDCFE;">      LIMIT</span><span style="color:#9CDCFE;"> BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> +</span><span style="color:#B5CEA8;"> 50</span><span style="color:#E6E6E6;">, </span><span style="color:#B5CEA8;">0</span><span style="color:#E6E6E6;">, </span><span style="color:#B5CEA8;">100</span></span>
<span class="line"><span style="color:#9CDCFE;">      BASE</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;"> =</span><span style="color:#9CDCFE;"> RESULT</span></span>
<span class="line"><span style="color:#9CDCFE;">      DAY</span><span style="color:#D4D4D4;"> +=</span><span style="color:#B5CEA8;"> 1</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 102</span></span>
<span class="line"><span style="color:#569CD6;">      SAVEGAME</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 103</span></span>
<span class="line"><span style="color:#569CD6;">      LOADGAME</span></span>
<span class="line"><span style="color:#C586C0;">    CASE</span><span style="color:#B5CEA8;"> 104</span></span>
<span class="line"><span style="color:#C586C0;">      BEGIN</span><span style="color:#9CDCFE;"> TITLE</span></span>
<span class="line"><span style="color:#C586C0;">  ENDSELECT</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">; ---------- 存档简介 ----------</span></span>
<span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">SAVEINFO</span></span>
<span class="line"><span style="color:#569CD6;">  PUTFORM</span><span style="color:#E6E6E6;"> 第 </span><span style="color:#569CD6;">{</span><span style="color:#9CDCFE;">DAY</span><span style="color:#569CD6;">}</span><span style="color:#E6E6E6;"> 天　金钱 </span><span style="color:#569CD6;">{</span><span style="color:#9CDCFE;">MONEY</span><span style="color:#569CD6;">}</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">; ---------- 结算 ----------</span></span>
<span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">SHOW_ENDING</span></span>
<span class="line"><span style="color:#569CD6;">  CLEARLINE</span><span style="color:#9CDCFE;"> LINECOUNT</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 十天的打工结束了。</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 小明一共攒下</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTV</span><span style="color:#9CDCFE;"> MONEY</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 枚金币。</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span></span>
<span class="line"><span style="color:#569CD6;">  PRINTL</span><span style="color:#9CDCFE;"> 按任意键回到标题画面。</span></span>
<span class="line"><span style="color:#569CD6;">  WAIT</span></span>
<span class="line"><span style="color:#C586C0;">  RETURN</span></span></code></pre></div><h2 id="运行效果" tabindex="-1">运行效果 <a class="header-anchor" href="#运行效果" aria-label="Permalink to “运行效果”">​</a></h2><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span>══════ 打工养成 ══════</span></span>
<span class="line"><span>第1天</span></span>
<span class="line"><span>小明　体力：100　金钱：0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[100] 打工（体力 -20，金钱 +100）</span></span>
<span class="line"><span>[101] 休息（体力 +50）</span></span>
<span class="line"><span>[102] 保存游戏</span></span>
<span class="line"><span>[103] 读取游戏</span></span>
<span class="line"><span>[104] 结束游戏</span></span></code></pre></div><p>点击 <code>[100]</code> 打工，体力变成 80、金钱变成 100、天数变成 2；天数超过 10 后自动进入结算。</p><h2 id="你可以继续扩展的方向" tabindex="-1">你可以继续扩展的方向 <a class="header-anchor" href="#你可以继续扩展的方向" aria-label="Permalink to “你可以继续扩展的方向”">​</a></h2><p>这个骨架已经能跑，接下来可以往这些方向加内容：</p><ul><li><strong>更多属性</strong>：给小明的 <code>CFLAG</code>（角色标志）加“心情”“技能”等自定义数值；</li><li><strong>事件</strong>：在 <code>@SHOW_SHOP</code> 开头用随机数触发随机事件（<code>RAND:100</code>）；</li><li><strong>结尾流程</strong>：把 <code>BEGIN TITLE</code> 换成 <code>BEGIN AFTERTRAIN</code>，让引擎调用 <code>@EVENTEND</code> 来做正式结算；</li><li><strong>训练流程</strong>：需要更复杂的养成玩法时，改为使用引擎的 <code>TRAIN</code> 流程（<code>@EVENTTRAIN</code> / <code>@SHOW_USERCOM</code> / <code>@EVENTCOM</code>）；</li><li><strong>图片</strong>：用 <code>PRINT_IMG</code> 或 <code>HTML_PRINT</code> 显示立绘，详见 <a href="./../../translation/HTML_PRINT.html">HTML_PRINT 相关</a>；</li><li><strong>发布</strong>：确认目标玩家使用的引擎版本，再打包 <code>exe</code> + <code>CSV</code> + <code>ERB</code>。</li></ul><h2 id="相关链接" tabindex="-1">相关链接 <a class="header-anchor" href="#相关链接" aria-label="Permalink to “相关链接”">​</a></h2><ul><li><a href="./../tutorials/">入门教程</a></li><li><a href="./Character.html">角色的定义、注册、使用与注销</a></li><li><a href="./Experience.html">开发实战经验与技巧</a></li><li><a href="./../../reference/ERB_Internal_Process.html">ERB 的内置流程</a></li><li><a href="./../../translation/Command.html">命令</a></li></ul>`,48)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};