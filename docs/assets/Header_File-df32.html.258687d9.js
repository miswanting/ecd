import{d as a,o as r,c as l,a as n,e as p,F as c,b as e,g as t}from"./app.b380f23f.js";import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";const i={},b=n("h1",{id:"\u5934\u6587\u4EF6-erh-\u98CE\u98CF-df32\u7FFB\u8BD1\u7248",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5934\u6587\u4EF6-erh-\u98CE\u98CF-df32\u7FFB\u8BD1\u7248","aria-hidden":"true"},"#"),e(" \u5934\u6587\u4EF6\uFF08ERH\uFF09\uFF08\u98CE\u98CF@df32\u7FFB\u8BD1\u7248\uFF09")],-1),u=n("blockquote",null,[n("p",null,"\u7FFB\u8BD1\u81EA\u539F\u6587\u6863\uFF1Ahttps://osdn.net/projects/emuera/wiki/ERH")],-1),o=e("\u8BD1\u8005\uFF1A"),m={href:"https://github.com/df32",target:"_blank",rel:"noopener noreferrer"},E=e("\u98CE\u98CF@df32"),R=t(`<p>\u4E5F\u53EF\u8DF3\u8F6C\u81F3\uFF1A<a href="Header_File">\u539F\u7248</a></p><p>\u9664\u4E86\u6269\u5C55\u540D\u4E3A<code>ERB</code>\u7684\u6587\u4EF6\u5916\uFF0CERB\u6587\u4EF6\u5939\u8FD8\u53EF\u4EE5\u5305\u542B\u6269\u5C55\u540D\u4E3A<code>ERH</code>\u7684\u6587\u4EF6\u3002</p><p>ERH\u6587\u4EF6\u4E2D\u5305\u542B\u9700\u8981\u5728ERB\u6587\u4EF6\u4E4B\u524D\u5904\u7406\u7684\u4FE1\u606F\uFF0C\u5373\u7528<code>#DIM</code>\u548C<code>#DIMS</code>\u58F0\u660E\u7684\u5E7F\u57DF\u53D8\u91CF\u548C\u7528<code>#DEFINE</code>\u5B9A\u4E49\u7684\u5B8F\u3002</p><p>\u9664\u4E86<code>#DIM</code>\u3001<code>#DIMS</code>\u548C<code>#DEFINE</code>\u4E4B\u5916\uFF0CERH\u6587\u4EF6\u4E2D\u4E0D\u5E94\u5F53\u5305\u542B\u5176\u4ED6\u5185\u5BB9\u3002</p><p>Emuera \u8BFB\u53D6\u653E\u5728<code>ERB</code>\u6587\u4EF6\u5939\u4E2D\u7684\u6240\u6709<code>*.ERH</code>\u6587\u4EF6\uFF0C \u5176\u8BFB\u53D6\u987A\u5E8F\u662F<code>csv\u6587\u4EF6\u5939\u4E2D\u7684\u6587\u4EF6</code>-&gt; <code>*.ERH</code> -&gt; <code>*.ERB</code>\u3002</p><p>\u56E0\u6B64ERH\u4E2D\u7684\u5B9A\u4E49\u65E0\u6CD5\u4F5C\u7528\u4E8ECSV\uFF0C\u800CCSV\u4E2D\u7684\u5B9A\u4E49\u53EF\u4EE5\u4F5C\u7528\u4E8EERH\u6587\u4EF6\u3002 \u6BD4\u5982\u7531<code>_rename.csv</code>\u5B9A\u4E49\u7684\u66FF\u6362\u4E5F\u5C06\u9002\u7528\u4E8E<code>*.ERH</code>\u3002</p><blockquote><p>\u7531\u4E8EeramakerEX\u6CA1\u6709\u5BF9ERH\u5E94\u7528<code>_rename.csv</code>\uFF0C\u6240\u4EE5Emuera\u4E0EeramakerEx\u5728ERH\u6587\u4EF6\u4E0A\u4E0D\u517C\u5BB9\u3002</p></blockquote><h2 id="\u5E7F\u57DF\u53D8\u91CF\u7684\u58F0\u660E" tabindex="-1"><a class="header-anchor" href="#\u5E7F\u57DF\u53D8\u91CF\u7684\u58F0\u660E" aria-hidden="true">#</a> \u5E7F\u57DF\u53D8\u91CF\u7684\u58F0\u660E</h2><p>\u53E6\u8BF7\u53C2\u89C1<a href="Custom_Variable#%E5%B9%BF%E5%9F%9F%E5%8F%98%E9%87%8F%E7%9A%84%E4%B9%A6%E5%86%99%E6%A0%BC%E5%BC%8F">\u7528\u6237\u5B9A\u4E49\u7684\u53D8\u91CF</a>\u3002</p><p>\u5728ERH\u6587\u4EF6\u4E2D\u58F0\u660E\u7684\u53D8\u91CF\u4E3A\u5E7F\u57DF\u53D8\u91CF\uFF0C\u53EF\u4EE5\u5728\u4EFB\u4F55ERB\u7684\u4EFB\u4F55\u5730\u65B9\u5F15\u7528\u3002</p><p>\u4E0E\u79C1\u6709\u53D8\u91CF\u4E0D\u540C\uFF0C\u5E7F\u57DF\u53D8\u91CF\u4E0D\u5B58\u5728<code>DYNAMIC</code>\u548C<code>STATIC</code>\u7684\u533A\u522B\uFF0C\u4E5F\u4E0D\u80FD\u7528<code>REF</code>\u6765\u5B9A\u4E49\u5F15\u7528\u7C7B\u578B\u7684\u53D8\u91CF\uFF0C\u4F46\u5E7F\u57DF\u53D8\u91CF\u4ECD\u7136\u53EF\u4EE5\u7528<code>CONST</code>\u6765\u5B9A\u4E49\u5E38\u91CF\u3002</p><p>\u58F0\u660E\u53D8\u91CF\u6700\u9AD8\u4E09\u7EF4\u3002</p><p>\u5982\u679C\u6CA1\u6709\u6307\u5B9A\u5143\u7D20\u7684\u6570\u91CF\uFF0C\u8BE5\u53D8\u91CF\u5C31\u4F1A\u53D8\u6210\u4E00\u4E2A\u6709\u4E00\u4E2A\u5143\u7D20\u7684\u6570\u7EC4\uFF0C\u6240\u4EE5\u5B83\u53EF\u4EE5\u50CF\u975E\u6570\u7EC4\u53D8\u91CF\u4E00\u6837\u4F7F\u7528\u3002</p><p>\u53D8\u91CF\u53EF\u4EE5\u7528<code>#DIM</code>\u6216<code>#DIMS</code>\u6765\u58F0\u660E\uFF0C\u5982\u4E0B\u6240\u793A\u3002</p><p>\u5982\u679C\u4F7F\u7528<code>#DIM HOGE,1,2</code>\uFF0C\u5B83\u5C31\u4F1A\u53D8\u6210\u4E00\u4E2A\u4E8C\u7EF4\u6570\u7EC4\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
  #DIM MY_INT
  #DIM MY_INT_ARRAY, 100
  #DIMS MY_STR
  #DIMS MY_STR_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u5728ERH\u6587\u4EF6\u4E2D\u58F0\u660E\u4E0A\u8FF0\u5185\u5BB9\u540E\uFF0CERB\u6587\u4EF6\u4E2D\u5373\u53EF\u4F7F\u7528\u58F0\u660E\u7684\u53D8\u91CF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERB&gt;
	MY_INT = 100
	MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45
	MY_STR = \u3042\u3042\u3042
	PRINTFORML {MY_INT_ARRAY:10} %MY_STR%
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u53EF\u4EE5\u4F5C\u4E3A\u4E00\u4E2A\u53D8\u91CF\u4F7F\u7528\u3002</p><p>\u5728\u4F7F\u7528<code>#DIM</code>\u7684\u53D8\u91CF\u58F0\u660E\u4E2D\uFF0C\u5143\u7D20\u7684\u6570\u91CF\u53EF\u4EE5\u88AB\u6307\u5B9A\u4E3A\u4E00\u4E2A\u6570\u5B57\u6216\u4E00\u4E2A\u5E38\u91CF\u8868\u8FBE\u5F0F\u3002</p><blockquote><p>\u6CE8\u610F\uFF0C\u4E0E<code>*.ERB</code>\u4E2D\u7684<code>#DIM</code>\u4E0D\u540C\uFF0CERH\u58F0\u660E\u53D8\u91CF\u65F6\u4E0D\u4F1A\u6269\u5C55\u5B8F\u3002</p></blockquote><h3 id="savedata-\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#savedata-\u5173\u952E\u5B57" aria-hidden="true">#</a> SAVEDATA \u5173\u952E\u5B57</h3><p>\u58F0\u660E\u53D8\u91CF\u65F6\u52A0\u5165<code>SAVEDATA</code>\u5173\u952E\u5B57\uFF0C\u4EE5\u4F7F\u8BE5\u53D8\u91CF\u53EF\u4EE5\u88AB\u4FDD\u5B58\u5728\u5B58\u6863\u4E2D\u3002</p><p>\u5F53\u4F7F\u7528<code>SAVEDATA</code>\u5173\u952E\u5B57\u4FDD\u5B58\u7684\u591A\u7EF4\u53D8\u91CF\u65F6\uFF0C\u5FC5\u987B\u5728\u8BBE\u7F6E\u4E2D\u542F\u7528<code>\u4EE5\u4E8C\u8FDB\u5236\u5F62\u5F0F\u4FDD\u5B58\u5B58\u6863</code>\u9009\u9879\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
  #DIM SAVEDATA MY_INT_ARRAY, 100
  #DIMS SAVEDATA MY_STR_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u901A\u8FC7\u8FD9\u6837\u7684\u58F0\u660E\uFF0C<code>MY_INT_ARRAY</code>\u548C<code>MY_STR_ARRAY</code>\u5C06\u4EE5\u4E0E\u5185\u7F6E\u53D8\u91CF\uFF08\u5982<code>DAY</code>\u548C<code>MONEY</code>\uFF09\u76F8\u540C\u7684\u65B9\u5F0F\u4FDD\u5B58\u548C\u52A0\u8F7D\u3002</p><p>\u53CD\u4E4B\uFF0C\u6CA1\u6709\u7528<code>SAVEDATA</code>\u5173\u952E\u5B57\u58F0\u660E\u7684\u53D8\u91CF\u5C06\u4E0D\u4F1A\u88AB\u4FDD\u5B58\u5230\u6E38\u620F\u5B58\u6863\uFF0C\u5E76\u5728\u52A0\u8F7D\u6E38\u620F\u65F6\u4F1A\u88AB\u521D\u59CB\u5316\u3002</p><h3 id="charadata-\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#charadata-\u5173\u952E\u5B57" aria-hidden="true">#</a> CHARADATA \u5173\u952E\u5B57</h3><p>\u53EF\u4EE5\u901A\u8FC7\u5728\u53D8\u91CF\u58F0\u660E\u4E2D\u6DFB\u52A0<code>CHARADATA</code>\u5173\u952E\u5B57\u6765\u58F0\u660E\u89D2\u8272\u53D8\u91CF\u3002</p><p><code>CHARADATA</code>\u53EF\u4EE5\u548C<code>SAVEDATA</code>\u5173\u952E\u5B57\u4E00\u8D77\u4F7F\u7528\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
  #DIM CHARADATA C_INT_ARRAY, 100
  #DIMS CHARADATA C_STR_ARRAY, 100
  #DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\uFF0C<code>C_INT_ARRAY</code>\u548C<code>C_STR_ARRAY</code>\u662F\u89D2\u8272\u53D8\u91CF\uFF0C\u4F46\u4E0D\u4F1A\u88AB\u6E38\u620F\u5B58\u6863\u4FDD\u5B58\u6216\u52A0\u8F7D\u3002</p><p><code>CS_INT_ARRAY</code>\u662F\u4E00\u4E2A\u89D2\u8272\u53D8\u91CF\uFF0C\u53EF\u4EE5\u88AB\u6E38\u620F\u5B58\u6863\u4FDD\u5B58\u548C\u52A0\u8F7D\u3002</p><h3 id="global-\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#global-\u5173\u952E\u5B57" aria-hidden="true">#</a> GLOBAL \u5173\u952E\u5B57</h3><p>\u4F60\u53EF\u4EE5\u901A\u8FC7\u5728\u53D8\u91CF\u58F0\u660E\u4E2D\u52A0\u5165<code>GLOBAL</code>\u5173\u952E\u5B57\u6765\u58F0\u660E\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u3002</p><p><code>GLOBAL</code>\u53EF\u4EE5\u548C<code>SAVEDATA</code>\u5173\u952E\u5B57\u4E00\u8D77\u4F7F\u7528\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
  #DIM GLOBAL G_INT_ARRAY, 100
  #DIMS GLOBAL G_STR_ARRAY, 100
  #DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5168\u5C40\u53D8\u91CF\u4E0D\u4F1A\u968F\u6E38\u620F\u5B58\u6863\u7684\u4FDD\u5B58\u52A0\u8F7D\u800C\u53D8\u5316\u3002</p><p>\u7531\u4E8E\u8FD9\u4E00\u7279\u6027\uFF0C\u5168\u5C40\u53D8\u91CF\u88AB\u7528\u6765\u5728\u4E0D\u540C\u7684\u5B58\u6863\u4E4B\u95F4\u5171\u4EAB\u6570\u636E\u3002</p><p>\u5982\u679C\u540C\u65F6\u4F7F\u7528<code>GLOBAL</code>\u548C<code>SAVEDATA</code>\u5173\u952E\u5B57\uFF0C\u53D8\u91CF\u5C06\u88AB<code>SAVEGLOBAL</code>\u548C<code>LOADGLOBAL</code>\u6307\u4EE4\u8BFB\u5199\u5230<code>global.sav</code>\u6587\u4EF6\u3002</p><p>\u5173\u4E8E\u5176\u4ED6\u7EC6\u8282\uFF0C\u5982\u521D\u59CB\u503C\u548C\u5E38\u91CF\u5316\uFF0C\u8BF7\u53C2\u89C1<a href="">\u7528\u6237\u5B9A\u4E49\u7684\u53D8\u91CF</a>\u3002</p><h2 id="\u5B8F\u7684\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u7684\u5B9A\u4E49" aria-hidden="true">#</a> \u5B8F\u7684\u5B9A\u4E49</h2><p>\u5B8F\u7528\u4E8E\u5C06ERB\u4EE3\u7801\u4E2D\u7684\u4E00\u4E32\u6587\u672C\u66FF\u6362\u4E3A\u53E6\u4E00\u4E2A\u9884\u5148\u5B9A\u4E49\u7684\u6587\u672C\u3002</p><p>\u8FD9\u91CC\u8BF4\u7684\u5B8F\u4E0D\u662FEmuera\u8FD0\u884C\u4E2D\u6309\u4E0BF1~F12\u6309\u952E\u7684\u952E\u76D8\u5B8F\u3002 \u5B8F\u7684\u6982\u5FF5\u53EF\u4EE5\u53C2\u8003C\u548CC++\u4E2D\u7684#define\u6307\u4EE4\u3002</p><p>\u901A\u8FC7\u5728 ERH \u6587\u4EF6\u4E2D\u5B9A\u4E49\u5B8F\uFF0C\u5B83\u9002\u7528\u4E8E\u6240\u6709 ERB \u6587\u4EF6\u4E2D\u7684\u4EE3\u7801\u3002</p><h3 id="\u57FA\u672C\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u7528\u6CD5" aria-hidden="true">#</a> \u57FA\u672C\u7528\u6CD5</h3><p>\u4E00\u4E2A\u5B8F\u901A\u5E38\u5B9A\u4E49\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;*.ERH&gt;
	#DEFINE &lt;\u66FF\u6362\u6E90\u6807\u8BC6\u7B26&gt; &lt;\u66FF\u6362\u76EE\u6807\u8868\u8FBE\u5F0F&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u8FD9\u5C06\u628AERB\u4E2D\u7684<code>&lt;\u66FF\u6362\u6E90\u6807\u8BC6\u7B26&gt;</code>\u66FF\u6362\u4E3A<code>&lt;\u66FF\u6362\u76EE\u6807\u8868\u8FBE\u5F0F&gt;</code>\u3002\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE FIVE 5

;&lt;*.ERB&gt;
	X = FIVE

;(\u5B8F\u5C55\u5F00\u540E)
	X = 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u4E00\u4E2A\u5B8F\u4E5F\u53EF\u4EE5\u6709\u884C\u672B\u6CE8\u91CA\u3002 \u5206\u53F7\u540E\u7684\u4EFB\u4F55\u5185\u5BB9\u90FD\u4F1A\u4F5C\u4E3A\u6CE8\u91CA\u88AB\u5FFD\u7565\uFF0C\u4E0D\u4F1A\u88AB\u5305\u62EC\u5728\u5B8F\u4E2D\uFF0C\u4E5F\u4E0D\u4F1A\u88AB\u5C55\u5F00\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE FIVE 5 ;\u5B9A\u4E49\u5B8F

;&lt;*.ERB&gt;
	X = FIVE + FIVE

;(\u5C55\u5F00\u540E)
	X = 5 + 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u8BF7\u6CE8\u610F\uFF0C\u5B8F\u7684\u5C55\u5F00\u51E0\u4E4E\u7B49\u540C\u4E8E\u6587\u672C\u66FF\u6362\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
  #DEFINE SIX           1 + 5
  #DEFINE NINE          8 + 1

;&lt;*.ERB&gt;
  X = SIX * NINE

;(\u5C55\u5F00\u540E)
	X = 1 + 5 * 8 + 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u56E0\u4E3A\u4E58\u6CD5\u4F18\u5148\uFF0C\u5F97\u5230<code>X=42</code>\u3002</p><p>\u5B8F\u53EF\u4EE5\u5C55\u5F00\u4E3A\u4E00\u4E2A\u5B57\u7B26\u4E32\u5E38\u91CF\uFF0C\u5982<code>~~</code>\uFF0C\u6216\u5C55\u5F00\u4E3A\u4E00\u4E2A\u53D8\u91CF\u3001\u51FD\u6570\u6216\u8868\u8FBE\u5F0F\u3002 \u56E0\u6B64\u53EF\u4EE5\u628A\u5B8F\u770B\u4F5C\u662F\u6269\u5C55<code>#DEFINE</code>\u53F3\u8FB9\u7684\u6587\u672C\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE HOGE        &quot;\u307B\u3052\u307B\u3052&quot;
	#DEFINE PIYO        A
	#DEFINE FUGA        DA:10
	#DEFINE HOGERA      LOCAL + MY_FUNC(X, Y)

;&lt;*.ERB&gt;
	X = STRLEN(HOGE)
	Y = PIYO + 5
	FUGA:20 += PIYO
	LOCAL = HOGERA

	@MY_FUNC(ARG, ARG:1)
	#FUNCTION
		;\uFF5E\u7565\uFF5E

;(\u5C55\u5F00\u540E)
	X = STRLEN(&quot;\u307B\u3052\u307B\u3052&quot;)
	Y = A + 5
	DA:10:20 += A
	LOCAL = LOCAL + MY_FUNC(X, Y)

	@MY_FUNC(ARG, ARG:1)
	#FUNCTION
		;\uFF5E\u7565\uFF5E
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>\u5B8F\u5728\u5C55\u5F00\u65F6\uFF0C\u53EF\u80FD\u66FF\u6362\u7684\u662F\u8FD0\u7B97\u7B26\u6216\u8868\u8FBE\u5F0F\u7684\u4E00\u90E8\u5206\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u5B8C\u6574\u7684\u8868\u8FBE\u5F0F\u3002</p><p>\u8FD9\u79CD\u5B8F\u7684\u5B9A\u4E49\u4E25\u91CD\u5F71\u54CD\u4EE3\u7801\u7684\u53EF\u8BFB\u6027\uFF0C\u4E0D\u5EFA\u8BAE\u8FD9\u79CD\u5B9A\u4E49\u65B9\u5F0F\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE PLUS       +
	#DEFINE FIVEPLUS   5 +

;&lt;*.ERB&gt;
	X = 1 PLUS 2
	Y = FIVEPLUS 2

;(\u5C55\u5F00\u540E)
	X = 1 + 2
	Y = 5 + 2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="\u5B8F\u7684\u591A\u91CD\u5C55\u5F00" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u7684\u591A\u91CD\u5C55\u5F00" aria-hidden="true">#</a> \u5B8F\u7684\u591A\u91CD\u5C55\u5F00</h3><p>\u5B8F\u7684\u5B9A\u4E49\u53EF\u4EE5\u5D4C\u5957\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;.ERH&gt;
	#DEFINE FIVE_1 5
	#DEFINE FIVE_2 FIVE_1 + FIVE_1
	#DEFINE FIVE_3 FIVE_2 + FIVE_2

;&lt;.ERB&gt;
	X = FIVE_3

;(\u5C55\u5F00\u540E)
	X = 5 + 5 + 5 + 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u5982\u679C\u5B8F\u5728\u591A\u6B21\u5C55\u5F00\u540E\u4ECD\u672A\u5C55\u5F00\u5B8C\u6BD5\uFF0CEmuera\u4F1A\u5C06\u5176\u89C6\u4F5C\u4E00\u4E2A\u7591\u4F3C\u81EA\u5F15\u7528\u6216\u5FAA\u73AF\u5F15\u7528\u7684\u5B8F\u7EC8\u6B62\u8FDB\u7A0B\uFF0C\u5E76\u629B\u51FA\u9519\u8BEF\u3002</p><p>\u6CE8\u610F\u907F\u514D\u81EA\u6211\u5F15\u7528\u548C\u5FAA\u73AF\u5F15\u7528\uFF0C\u5982\u4EE5\u4E0B\u5185\u5BB9\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;.ERH&gt;
	#DEFINE HOGE HOGE
	#DEFINE PIYO FUGA + 1
	#DEFINE FUGA PIYO + 2

;&lt;.ERB&gt;
;\u4F1A\u629B\u51FA\u9519\u8BEF
	X = HOGE
	Y = PIYO
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="\u9884\u5904\u7406\u6307\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u9884\u5904\u7406\u6307\u4EE4" aria-hidden="true">#</a> \u9884\u5904\u7406\u6307\u4EE4</h3><p>\u53EF\u4EE5\u6839\u636E\u662F\u5426\u5B9A\u4E49\u4E86\u67D0\u4E00\u540D\u79F0\u7684\u5B8F\uFF0C\u6765\u6267\u884C\u4E0D\u540C\u7684\u4EE3\u7801\u3002</p><p>\u53EA\u6709\u5F53XXX\u88AB\u5B9A\u4E49\u65F6\uFF0C<code>[IF XXX]</code>\u548C<code>[ENDIF]</code>\u884C\u4E4B\u95F4\u7684\u884C\u624D\u4F1A\u88AB\u6267\u884C\u3002\u4F8B\u5982\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERB&gt;
	[IF HOGE]
		PRINTL HOGE\u88AB\u5B9A\u4E49
	[ELSEIF PUYO]
		PRINTL HOGE\u6CA1\u6709\u88AB\u5B9A\u4E49
		PRINTL PUYO\u88AB\u5B9A\u4E49
	[ELSE]
		PRINTL HOGE\u548CPUYO\u90FD\u6CA1\u6709\u88AB\u5B9A\u4E49
	[ENDIF]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u4E3A\u6B64\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u5B9A\u4E49\u7A7A\u5B8F\uFF08\u6CA1\u6709\u66FF\u6362\u76EE\u6807\u7684\u5B8F\uFF09\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE HOGE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="\u5B8F\u7684\u9650\u5236\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u7684\u9650\u5236\u6761\u4EF6" aria-hidden="true">#</a> \u5B8F\u7684\u9650\u5236\u6761\u4EF6</h3><p>\u5B8F\u57FA\u672C\u4E0A\u53EA\u5728\u8868\u8FBE\u5F0F\u4E2D\u5C55\u5F00\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE FIVE 5

;&lt;*.ERB&gt;
	PRINT FIVE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>PRINT\u7ED3\u679C\u4E3A\u6587\u672C<code>FIVE</code>\u3002 \u8FD9\u4E0E<code>PRINT X</code>\u76F8\u540C\uFF0C\u5B83\u53EA\u6253\u5370\u5B57\u6BCDX\uFF0C\u800C\u4E0D\u662FX\u7684\u503C\u3002</p><p>\u5B8F\u66FF\u6362\u4E0D\u80FD\u662F\u4E00\u4E2A\u8D4B\u503C\u8FD0\u7B97\u7B26\u6216\u5305\u542B\u8D4B\u503C\u8FD0\u7B97\u7B26\u7684\u8868\u8FBE\u5F0F\u3002 \u4E0B\u9762\u7684\u5B8F\u5B9A\u4E49\u5C06\u5BFC\u81F4\u4E00\u4E2A\u9519\u8BEF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
;\u4F1A\u53D1\u751F\u9519\u8BEF
	#DEFINE HOGE =
	#DEFINE PUGE X = 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u4E0A\u9762\u63D0\u5230\uFF0C\u5B8F\u53EF\u4EE5\u5728\u8868\u8FBE\u5F0F\u4E2D\u66FF\u6362\uFF0C\u4F46\u5B8F\u7684\u5B9A\u4E49\u5FC5\u987B\u5B8C\u6210\u62EC\u53F7\u7684\u5BF9\u5E94\u3002 \u4E0B\u9762\u7684\u5B8F\u5B9A\u4E49\u5C06\u5BFC\u81F4\u4E00\u4E2A\u9519\u8BEF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
;\u4F1A\u53D1\u751F\u9519\u8BEF
	#DEFINE HOGE ( X +
	#DEFINE PUGE Y )

;&lt;*.ERB&gt;
	Z = HOGE PUGE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u4E0D\u53EF\u80FD\u5C06\u4E00\u4E2A\u5B8F\u66FF\u6362\u6210\u547D\u4EE4\u3002 \u4E0B\u9762\u7684\u5B8F\u5B9A\u4E49\u5C06\u5BFC\u81F4\u4E00\u4E2A\u9519\u8BEF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE MY_PRINTL     PRINTL

;&lt;*.ERB&gt;
	MY_PRINTL \u6267\u884CPRINTL\u4E2D

;(\u5C55\u5F00\u540E)
	;\u4F1A\u53D1\u751F\u9519\u8BEF
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u6B64\u5916\uFF0CERB\u811A\u672C\u4E2D\u7684\u4E5F\u9884\u5904\u7406\u6307\u4EE4\u3001\u5C5E\u6027\u540D\u79F0\u6216\u884C\u5934\u6807\u8BB0\u7B49\u5173\u952E\u5B57\u90FD\u65E0\u6CD5\u9002\u7528\u4E8E\u5B8F\u3002</p><p>\u4F8B\u5982\uFF0C<code>#DEFINE HOGE SKIPSTART</code>\u5E76\u4E0D\u80FD\u5C06<code>[HOGE]</code>\u5C55\u5F00\u4E3A<code>[SKIPSTART]</code>\u3002</p><p>\u4F46\u5176\u540E\u7684\u6587\u672C\u53EF\u4EE5\u88AB\u5B8F\u5C55\u5F00\uFF0C\u5982ERB\u811A\u672C\u4E2D<code>#DIM</code>\u540E\u58F0\u660E\u7684\u53D8\u91CF\u540D\uFF0C\u53EF\u4EE5\u88AB\u5B8F\u66FF\u6362\u3002 \u4F8B\u5982\uFF0C\u4E0B\u9762\u7684\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;&lt;*.ERH&gt;
	#DEFINE HOGE MY_INT
	#DEFINE FIVE 5

;&lt;*.ERB&gt;
	@FUNC
	#DIM HOGE, FIVE
	HOGE:0 = 10

;(\u5C55\u5F00\u540E)
	@FUNC
	#DIM MY_INT, 5
	MY_INT:0 = 10
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u4E0A\u9762\u7684\u4EE3\u7801\u53EF\u4EE5\u6B63\u5E38\u5DE5\u4F5C\u3002</p>`,87);function A(I,g){const s=a("ExternalLinkIcon");return r(),l(c,null,[b,u,n("p",null,[o,n("a",m,[E,p(s)])]),R],64)}var v=d(i,[["render",A]]);export{v as default};
