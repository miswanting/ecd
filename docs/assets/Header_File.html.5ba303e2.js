import{g as e}from"./app.b380f23f.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const s={},a=e(`<h1 id="\u5934\u6587\u4EF6-erh" tabindex="-1"><a class="header-anchor" href="#\u5934\u6587\u4EF6-erh" aria-hidden="true">#</a> \u5934\u6587\u4EF6\uFF08ERH\uFF09</h1><blockquote><p>\u7FFB\u8BD1\u81EA\u539F\u6587\u6863\uFF1Ahttps://osdn.net/projects/emuera/wiki/ERH</p></blockquote><p>\u4E5F\u53EF\u8DF3\u8F6C\u81F3\uFF1A<a href="Header_File-df32">\u98CE\u98CF@df32\u7FFB\u8BD1\u7248</a></p><p>\u9664\u4E86\u6269\u5C55\u540D\u4E3A<code>ERB</code>\u7684\u6587\u4EF6\u5916\uFF0CERB\u6587\u4EF6\u5939\u8FD8\u53EF\u4EE5\u5305\u542B\u6269\u5C55\u540D\u4E3A<code>ERH</code>\u7684\u6587\u4EF6\u3002</p><p><code>ERH</code>\u6587\u4EF6\u5305\u542B\u5FC5\u987B\u5728<code>ERB</code>\u4E4B\u524D\u5904\u7406\u7684\u4FE1\u606F\uFF0C\u5373\u7528<code>#DIM</code>\u548C<code>#DIMS</code>\u5B9A\u4E49\u5E7F\u57DF\u53D8\u91CF\uFF0C\u7528<code>#DEFINE</code>\u5B9A\u4E49\u5B8F\u3002</p><p>\u9664\u4E86<code>#DIM</code>\u3001<code>#DIMS</code>\u548C<code>#DEFINE</code>\u4E4B\u5916\uFF0C\u6807\u9898\u4E2D\u4E0D\u5E94\u8BE5\u6709\u5176\u4ED6\u884C\u3002</p><p>Emuera \u8BFB\u53D6\u6240\u6709\u653E\u5728<code>ERB</code>\u6587\u4EF6\u5939\u4E2D\u7684<code>*.ERH</code>\u6587\u4EF6\u3002</p><p>\u5904\u7406\u7684\u987A\u5E8F\u662F<code>csv\u6587\u4EF6\u5939\u4E2D\u7684\u6587\u4EF6</code>-&gt; <code>*.ERH</code> -&gt; <code>*.ERB</code>\uFF0C\u6240\u4EE5ERH\u7684\u6548\u679C\u4E0ECSV\u6587\u4EF6\u5939\u4E2D\u7684\u63CF\u8FF0\u4E0D\u4E00\u6837\u3002</p><p>\u53CD\u4E4B\uFF0C\u7531<code>_rename.csv</code>\u8FDB\u884C\u7684\u66FF\u6362\u4E5F\u5C06\u9002\u7528\u4E8E<code>*.ERH</code>\u3002</p><p>\u7531\u4E8EeramakerEX\u6CA1\u6709\u5BF9ERH\u5E94\u7528_rename.csv\uFF0C\u6240\u4EE5 EramakerEX \u4E0E ERH \u4E0D\u517C\u5BB9\u3002</p><h2 id="\u5E7F\u57DF\u53D8\u91CF\u7684\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u5E7F\u57DF\u53D8\u91CF\u7684\u5B9A\u4E49" aria-hidden="true">#</a> \u5E7F\u57DF\u53D8\u91CF\u7684\u5B9A\u4E49</h2><p>\u53E6\u8BF7\u53C2\u89C1<a href="">\u7528\u6237\u5B9A\u4E49\u7684\u53D8\u91CF</a>\u3002</p><p>\u5728\u5934\u6587\u4EF6\u4E2D\uFF0C\u53EF\u4EE5\u58F0\u660E\u65B0\u7684\u53D8\u91CF\u3002</p><p>\u4E0E\u5728<code>ERB</code>\u4E2D\u58F0\u660E\u7684\u79C1\u6709\u53D8\u91CF\u4E0D\u540C\uFF0C\u8FD9\u5C06\u662F\u4E00\u4E2A\u5E7F\u57DF\u53D8\u91CF\uFF0C\u53EF\u4EE5\u4ECE<code>ERB</code>\u7684\u6240\u6709\u70B9\u5F15\u7528\u3002</p><p>\u4E0E\u79C1\u6709\u53D8\u91CF\u4E0D\u540C\uFF0C<code>DYNAMIC</code>\u548C<code>STATIC</code>\u53D8\u91CF\u4E4B\u95F4\u6CA1\u6709\u533A\u522B\uFF0C\u4E0D\u53EF\u80FD\u4F7F\u7528<code>REF</code>\u6765\u58F0\u660E\u5F15\u7528\u7C7B\u578B\u7684\u53D8\u91CF\uFF0C\u4F46\u662F\u4F7F\u7528<code>CONST</code>\u7684\u5E38\u91CF\u53EF\u4EE5\u4EE5\u540C\u6837\u7684\u65B9\u5F0F\u58F0\u660E\u3002</p><p>\u4F60\u53EF\u4EE5\u58F0\u660E\u591A\u8FBE\u4E09\u4E2A\u7EF4\u5EA6\u7684\u53D8\u91CF\u3002</p><p>\u5982\u679C\u6CA1\u6709\u6307\u5B9A\u5143\u7D20\u7684\u6570\u91CF\uFF0C\u8BE5\u53D8\u91CF\u5C31\u4F1A\u53D8\u6210\u4E00\u4E2A\u6709\u4E00\u4E2A\u5143\u7D20\u7684\u6570\u7EC4\uFF0C\u6240\u4EE5\u5B83\u53EF\u4EE5\u50CF\u975E\u6570\u7EC4\u53D8\u91CF\u4E00\u6837\u4F7F\u7528\u3002</p><p>\u53D8\u91CF\u53EF\u4EE5\u7528<code>#DIM</code>\u6216<code>#DIMS</code>\u6765\u58F0\u660E\uFF0C\u5982\u4E0B\u6240\u793A\u3002</p><p>\u5982\u679C\u4F7F\u7528<code>#DIM HOGE,1,2</code>\uFF0C\u5B83\u5C31\u4F1A\u53D8\u6210\u4E00\u4E2A\u4E8C\u7EF4\u6570\u7EC4\u3002</p><p>\u5728<code>*.erh</code>\u4E2D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#DIM MY_INT
#DIM MY_INT_ARRAY, 100
#DIMS MY_STR
#DIMS MY_STR_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u901A\u8FC7\u5728<code>ERH</code>\u4E2D\u5B9A\u4E49\u4E0A\u8FF0\u5185\u5BB9\uFF0C\u5C31\u6709\u53EF\u80FD\u5728<code>ERB</code>\u4E2D\u5B9A\u4E49\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>MY_INT = 100
MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45
MY_STR = AAA
PRINTFORML {MY_INT_ARRAY:10} %MY_STR%
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u53EF\u4EE5\u4F5C\u4E3A\u4E00\u4E2A\u53D8\u91CF\u4F7F\u7528\u3002</p><p>\u5728\u4F7F\u7528<code>#DIM</code>\u7684\u53D8\u91CF\u58F0\u660E\u4E2D\uFF0C\u5143\u7D20\u7684\u6570\u91CF\u53EF\u4EE5\u88AB\u6307\u5B9A\u4E3A\u4E00\u4E2A\u6570\u5B57\u6216\u4E00\u4E2A\u5E38\u91CF\u8868\u8FBE\u3002</p><p>\u7136\u800C\uFF0C\u8BF7\u6CE8\u610F\uFF0C\u4E0E<code>*.ERB</code>\u4E2D\u7684<code>#DIM</code>\u4E0D\u540C\uFF0C\u8BE5\u5B8F\u6CA1\u6709\u88AB\u6269\u5C55\u3002</p><h3 id="savedata-\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#savedata-\u5173\u952E\u5B57" aria-hidden="true">#</a> SAVEDATA \u5173\u952E\u5B57</h3><p>\u4F60\u53EF\u4EE5\u5728\u58F0\u660E\u4E00\u4E2A\u53D8\u91CF\u65F6\u52A0\u5165<code>SAVEDATA</code>\u5173\u952E\u5B57\u6765\u58F0\u660E\u8BE5\u53D8\u91CF\u88AB\u4FDD\u5B58\u3002</p><p>\u7136\u800C\uFF0C\u5F53\u58F0\u660E\u4E00\u4E2A\u53EF\u4EE5\u4F7F\u7528<code>SAVEDATA</code>\u5173\u952E\u5B57\u4FDD\u5B58\u7684\u591A\u7EF4\u53D8\u91CF\u65F6\uFF0C\u5FC5\u987B\u542F\u7528<code>\u4EE5\u4E8C\u8FDB\u5236\u683C\u5F0F\u4FDD\u5B58\u4FDD\u5B58\u7684\u6570\u636E</code>\u9009\u9879\u3002</p><p>\u5728ERH\u4E2D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#DIM SAVEDATA MY_INT_ARRAY, 100
#DIMS SAVEDATA MY_STR_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u901A\u8FC7\u8FD9\u6837\u7684\u58F0\u660E\uFF0C<code>MY_INT_ARRAY</code>\u548C<code>MY_STR_ARRAY</code>\u7684\u5185\u5BB9\u5C06\u4EE5\u4E0E\u73B0\u6709\u53D8\u91CF\uFF08\u5982<code>DAY</code>\u548C<code>MONEY</code>\uFF09\u76F8\u540C\u7684\u65B9\u5F0F\u4FDD\u5B58\u548C\u52A0\u8F7D\u3002</p><p>\u53CD\u4E4B\uFF0C\u6CA1\u6709<code>SAVEDATA</code>\u5173\u952E\u5B57\u7684\u53D8\u91CF\u58F0\u660E\u5C06\u4E0D\u4F1A\u88AB\u4FDD\u5B58\uFF0C\u800C\u5728\u52A0\u8F7D\u65F6\u5C06\u88AB\u521D\u59CB\u5316\u3002</p><h3 id="charadata-\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#charadata-\u5173\u952E\u5B57" aria-hidden="true">#</a> CHARADATA \u5173\u952E\u5B57</h3><p>\u53EF\u4EE5\u901A\u8FC7\u5728\u53D8\u91CF\u58F0\u660E\u4E2D\u6DFB\u52A0<code>CHARADATA</code>\u5173\u952E\u5B57\u6765\u58F0\u660E\u5B57\u7B26\u53D8\u91CF\u3002</p><p><code>CHARADATA</code>\u53EF\u4EE5\u548C<code>SAVEDATA</code>\u5173\u952E\u5B57\u4E00\u8D77\u4F7F\u7528\u3002</p><p>\u5728 ERH \u4E2D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#DIM CHARADATA C_INT_ARRAY, 100
#DIMS CHARADATA C_STR_ARRAY, 100
#DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\uFF0C<code>C_INT_ARRAY</code>\u548C<code>C_STR_ARRAY</code>\u662F\u5B57\u7B26\u53D8\u91CF\uFF0C\u4F46\u6CA1\u6709\u88AB\u4FDD\u5B58\u548C\u52A0\u8F7D\u3002</p><p><code>CS_INT_ARRAY</code>\u662F\u4E00\u4E2A\u5B57\u7B26\u53D8\u91CF\uFF0C\u53EF\u4EE5\u88AB\u4FDD\u5B58\u548C\u52A0\u8F7D\u3002</p><h3 id="global-\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#global-\u5173\u952E\u5B57" aria-hidden="true">#</a> GLOBAL \u5173\u952E\u5B57</h3><p>\u4F60\u53EF\u4EE5\u901A\u8FC7\u5728\u53D8\u91CF\u58F0\u660E\u4E2D\u52A0\u5165<code>GLOBAL</code>\u5173\u952E\u5B57\u6765\u58F0\u660E\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u3002</p><p><code>GLOBAL</code>\u53EF\u4EE5\u548C<code>SAVEDATA</code>\u5173\u952E\u5B57\u4E00\u8D77\u4F7F\u7528\u3002</p><p>\u5728 ERH \u4E2D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#DIM GLOBAL G_INT_ARRAY, 100
#DIMS GLOBAL G_STR_ARRAY, 100
#DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u5728\u6B63\u5E38\u7684\u4FDD\u5B58\u52A0\u8F7D\u8FC7\u7A0B\u4E2D\uFF0C\u5168\u5C40\u53D8\u91CF\u4E0D\u88AB\u52A0\u8F7D\u6216\u521D\u59CB\u5316\u3002</p><p>\u7531\u4E8E\u8FD9\u4E00\u7279\u6027\uFF0C\u5B83\u4EEC\u53EF\u4EE5\u88AB\u7528\u6765\u5728\u4E0D\u540C\u7684\u4FDD\u5B58\u6570\u636E\u4E4B\u95F4\u5171\u4EAB\u6570\u636E\u3002</p><p>\u5982\u679C\u540C\u65F6\u4F7F\u7528<code>GLOBAL</code>\u548C<code>SAVEDATA</code>\u5173\u952E\u5B57\uFF0C\u53D8\u91CF\u5C06\u88AB<code>SAVEGLOBAL</code>\u548C<code>LOADGLOBAL</code>\u6307\u4EE4\u8BFB\u5199\u5230<code>global.sav</code>\u6587\u4EF6\u3002</p><p>\u5173\u4E8E\u5176\u4ED6\u7EC6\u8282\uFF0C\u5982\u521D\u59CB\u503C\u548C\u5E38\u91CF\u5316\uFF0C\u8BF7\u53C2\u89C1<a href="">\u7528\u6237\u5B9A\u4E49\u7684\u53D8\u91CF</a>\u3002</p><h2 id="\u5B8F\u7684\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u7684\u5B9A\u4E49" aria-hidden="true">#</a> \u5B8F\u7684\u5B9A\u4E49</h2><p>\u5B8F\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u5B83\u5C06 ERB \u4EE3\u7801\u4E2D\u7684\u4E00\u4E32\u5B57\u7B26\u66FF\u6362\u4E3A\u53E6\u4E00\u4E2A\u9884\u5148\u5B9A\u4E49\u7684\u5B57\u7B26\u4E32\u3002</p><p>\u867D\u7136\u5B83\u88AB\u79F0\u4E3A\u5B8F\uFF0C\u4F46\u5B83\u4E0E Emuera \u8FD0\u884C\u65F6\u53EF\u4F7F\u7528<code>F1</code>-<code>F12</code>\u952E\u7684\u952E\u76D8\u5B8F\u6CA1\u6709\u5173\u7CFB\u3002</p><p>\u8FD9\u4E2A\u51FD\u6570\u662F\u57FA\u4E8E C \u548C C++ \u7684<code>#define</code>\u3002</p><p>\u901A\u8FC7\u5728 ERH \u6587\u4EF6\u4E2D\u5B9A\u4E49\u5B8F\uFF0C\u5B83\u9002\u7528\u4E8E\u6240\u6709 ERB \u6587\u4EF6\u4E2D\u7684\u4EE3\u7801\u3002</p><h3 id="\u57FA\u672C\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u7528\u6CD5" aria-hidden="true">#</a> \u57FA\u672C\u7528\u6CD5</h3><p>\u4E00\u4E2A\u5B8F\u901A\u5E38\u5B9A\u4E49\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#DEFINE &lt;\u66FF\u6362\u6E90\u6807\u8BC6\u7B26&gt; &lt;\u66FF\u6362\u76EE\u6807\u8868\u8FBE\u5F0F&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FD9\u5C06\u7528 ERB \u4E2D\u7684&lt;\u66FF\u6362\u6E90\u6807\u8BC6\u7B26&gt;\u66FF\u6362&lt;\u66FF\u6362\u76EE\u6807\u8868\u8FBE\u5F0F&gt;\u3002\u4F8B\u5982\uFF0C\u5728 ERH \u4E2D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#DEFINE FIVE 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u90A3\u4E48 ERB \u4E2D\u7684\u5B57\u7B26\u4E32<code>FIVE</code>\u5C06\u88AB\u66FF\u6362\u6210<code>5</code>\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u4F60\u5B9A\u4E49\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>X = FIVE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u66FF\u6362\u540E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>X = 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u4E00\u4E2A\u5B8F\u4E5F\u53EF\u4EE5\u6709\u884C\u672B\u6CE8\u91CA\u3002</p><p>\u5206\u53F7\u540E\u7684\u4EFB\u4F55\u5185\u5BB9\u90FD\u4F1A\u4F5C\u4E3A\u6CE8\u91CA\u88AB\u5FFD\u7565\u3002</p><p>\u5206\u53F7\u4E4B\u540E\u7684\u5185\u5BB9\u4E0D\u5305\u62EC\u5728\u5B8F\u4E2D\uFF0C\u4E5F\u4E0D\u4F1A\u88AB\u5C55\u5F00\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE FIVE 5 ;\u6CE8\u91CA

;ERB
X = FIVE + FIVE

;\u8FD0\u884C\u65F6
X = 5 + 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u8BF7\u6CE8\u610F\uFF0C\u5B8F\u7684\u6269\u5C55\u51E0\u4E4E\u662F\u4F5C\u4E3A\u4E00\u4E2A\u5B57\u7B26\u4E32\u6765\u5B8C\u6210\u7684\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE SIX           1 + 5
#DEFINE NINE          8 + 1

;ERB
X = SIX * NINE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u4F60\u53EF\u80FD\u8BA4\u4E3A6*9\u621636\u5C06\u88AB\u5206\u914D\u7ED9X\uFF0C\u4F46\u4E8B\u5B9E\u4E0A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>X = 1 + 5 * 8 + 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u6240\u4EE5\u4E58\u6CD5\u4F18\u5148\uFF0C\u5F97\u5230X=42\u3002</p><p>\u5B8F\u53EF\u4EE5\u6269\u5C55\u4E3A\u4E00\u4E2A\u5E38\u6570\u5B57\u7B26\u4E32\uFF0C\u5982<code>~~</code>\uFF0C\u6216\u6269\u5C55\u4E3A\u4E00\u4E2A\u53D8\u91CF\u3001\u51FD\u6570\u6216\u8868\u8FBE\u5F0F\u3002</p><p>\u8FD9\u4E2A\u5B8F\u4E5F\u53EF\u4EE5\u6269\u5C55\u6210\u4E00\u4E2A\u5E38\u91CF\u5B57\u7B26\u4E32\uFF0C\u6BD4\u5982<code>~~</code>\uFF0C\u6216\u8005\u6269\u5C55\u6210\u4E00\u4E2A\u53D8\u91CF\u3001\u51FD\u6570\u6216\u8868\u8FBE\u5F0F\uFF0C\u6240\u4EE5\u5982\u679C\u4F60\u628A\u5B83\u770B\u4F5C\u662F\u6269\u5C55<code>#DEFINE</code>\u53F3\u8FB9\u7684\u5B57\u7B26\u4E32\uFF0C\u4F60\u5C31\u4F1A\u660E\u767D\u8FD9\u4E2A\u610F\u601D\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE HOGE        &quot;\u563F\u563F\u563F\u563F&quot;
#DEFINE PIYO        A
#DEFINE FUGA        DA:10
#DEFINE HOGERA      LOCAL + MY_FUNC(X, Y)

;ERB
X = STRLEN(HOGE)
Y = PIYO + 5
FUGA:20 += PIYO
LOCAL = HOGERA

@MY_FUNC(ARG, ARG:1)
#FUNCTION

;\u8FD0\u884C\u65F6
X = STRLEN(&quot;\u563F\u563F\u563F\u563F&quot;)
Y = A + 5
DA:10:20 += A
LOCAL = LOCAL + MY_FUNC(X, Y)

@MY_FUNC(ARG, ARG:1)
#FUNCTION
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u7531\u4E8E\u5B8F\u88AB\u6269\u5C55\u4E3A\u5B57\u7B26\u4E32\uFF0C\u56E0\u6B64\u66FF\u6362\u6709\u53EF\u80FD\u662F\u8FD0\u7B97\u7B26\u6216\u8868\u8FBE\u5F0F\u7684\u4E00\u90E8\u5206\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u5B8C\u6574\u7684\u8868\u8FBE\u5F0F\u3002</p><p>\u7136\u800C\uFF0C\u4E0D\u5EFA\u8BAE\u4F7F\u7528\u8FD9\u79CD\u65B9\u6CD5\u3002</p><p>\u5982\u679C\u4E0D\u4ED4\u7EC6\u4F7F\u7528\uFF0C\u4F1A\u4E25\u91CD\u7834\u574F\u4EE3\u7801\u7684\u53EF\u8BFB\u6027\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE PLUS       +
#DEFINE FIVEPLUS   5 +

;ERB
X = 1 PLUS 2
Y = FIVEPLUS 2

;\u8FD0\u884C\u65F6
X = 1 + 2
Y = 5 + 2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="\u591A\u91CD\u5B8F\u66FF\u6362" tabindex="-1"><a class="header-anchor" href="#\u591A\u91CD\u5B8F\u66FF\u6362" aria-hidden="true">#</a> \u591A\u91CD\u5B8F\u66FF\u6362</h3><p>\u53EF\u4EE5\u5B9A\u4E49\u5305\u542B\u5DE8\u96C6\u7684\u5B8F\u3002\u8FD9\u6837\u7684\u5B8F\u5C06\u88AB\u500D\u6570\u5C55\u5F00\uFF0C\u76F4\u5230\u52A0\u8F7D ERB \u65F6\u5B8F\u4E0D\u80FD\u518D\u88AB\u5E94\u7528\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE FIVE_1 5
#DEFINE FIVE_2 FIVE_1 + FIVE_1
#DEFINE FIVE_3 FIVE_2 + FIVE_2

;ERB
X = FIVE_3

;\u8FD0\u884C\u65F6
X = 5 + 5 + 5 + 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u5982\u679C\u8BE5\u5B8F\u5728\u4E00\u5B9A\u6570\u91CF\u7684\u6269\u5C55\u540E\u4ECD\u7136\u5B58\u5728\uFF0CEmuera \u5C06\u4F5C\u4E3A\u4E00\u4E2A\u7591\u4F3C\u81EA\u5F15\u7528\u6216\u5FAA\u73AF\u5F15\u7528\u7684\u5B8F\u7EC8\u6B62\u8FDB\u7A0B\uFF0C\u5E76\u4EE5\u9519\u8BEF\u9000\u51FA\u3002</p><p>\u8BF7\u6CE8\u610F\u4E0D\u8981\u521B\u5EFA\u81EA\u6211\u53C2\u7167\u6216\u5FAA\u73AF\u7684\u5B8F\uFF0C\u5982\u4EE5\u4E0B\u5185\u5BB9\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE HOGE HOGE
#DEFINE PIYO FUGA + 1
#DEFINE FUGA PIYO + 2

;ERB(\u4F1A\u62A5\u9519)
X = HOGE
Y = PIYO
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="\u9884\u5904\u7406\u7A0B\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u9884\u5904\u7406\u7A0B\u5E8F" aria-hidden="true">#</a> \u9884\u5904\u7406\u7A0B\u5E8F</h3><p>\u53EF\u4EE5\u6839\u636E\u662F\u5426\u5B9A\u4E49\u4E86\u67D0\u4E00\u540D\u79F0\u7684\u5B8F\uFF0C\u5206\u5272\u6267\u884C\u591A\u884C\u3002</p><p>\u53EA\u6709\u5F53XXX\u662F<code>DEFINE</code>\u65F6\uFF0C<code>[IF XXX]</code>\u548C<code>[ENDIF]</code>\u884C\u4E4B\u95F4\u7684\u884C\u624D\u4F1A\u88AB\u6267\u884C\u3002\u4F8B\u5982\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERB
[IF HOGE]
  PRINTL HOGE\u304C\u5B9A\u7FA9\u3055\u308C\u3066\u3044\u308B
[ELSEIF PUYO]
  PRINTL HOGE\u304C\u5B9A\u7FA9\u3055\u308C\u3066\u3044\u306A\u3044
  PRINTL PUYO\u304C\u5B9A\u7FA9\u3055\u308C\u3066\u3044\u308B
[ELSE]
  PRINTL HOGE\u3082PUYO\u3082\u5B9A\u7FA9\u3055\u308C\u3066\u3044\u306A\u3044
[ENDIF]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u4E3A\u6B64\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u5B9A\u4E49\u7A7A\u5B8F\uFF08\u6CA1\u6709\u66FF\u6362\u76EE\u6807\u7684\u5B8F\uFF09\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE HOGE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="\u5B8F\u7684\u9650\u5236\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u7684\u9650\u5236\u6761\u4EF6" aria-hidden="true">#</a> \u5B8F\u7684\u9650\u5236\u6761\u4EF6</h3><p>\u5B8F\u57FA\u672C\u4E0A\u53EA\u5728\u8868\u8FBE\u5F0F\u4E2D\u90E8\u7F72\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE FIVE 5

;ERB
PRINT FIVE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u7B80\u5355\u5730\u6253\u5370\u51FA\u5B57\u7B26<code>FIVE</code>\u3002</p><p>\u8FD9\u4E0E<code>PRINT X</code>\u76F8\u540C\uFF0C\u5B83\u53EA\u6253\u5370\u5B57\u6BCDX\uFF0C\u800C\u4E0D\u662FX\u7684\u503C\u3002</p><p>\u5B8F\u66FF\u6362\u4E0D\u80FD\u662F\u4E00\u4E2A\u8D4B\u503C\u8FD0\u7B97\u7B26\u6216\u5305\u542B\u8D4B\u503C\u8FD0\u7B97\u7B26\u7684\u8868\u8FBE\u5F0F\u3002</p><p>\u4E0B\u9762\u7684\u5B8F\u5B9A\u4E49\u5C06\u5BFC\u81F4\u4E00\u4E2A\u9519\u8BEF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH(\u4F1A\u62A5\u9519)
#DEFINE HOGE =
#DEFINE PUGE X = 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u6211\u63D0\u5230\uFF0C\u5B8F\u53EF\u4EE5\u5728\u8868\u8FBE\u5F0F\u4E2D\u66FF\u6362\uFF0C\u4F46\u5728\u5B8F\u4E2D\u53EA\u9700\u5B8C\u6210\u62EC\u53F7\u5BF9\u5E94\u3002\u4E0B\u9762\u7684\u5B8F\u5B9A\u4E49\u5C06\u5BFC\u81F4\u4E00\u4E2A\u9519\u8BEF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH(\u4F1A\u62A5\u9519)
#DEFINE HOGE ( X +
#DEFINE PUGE Y )

;ERB
Z = HOGE PUGE
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u4E0D\u53EF\u80FD\u5C06\u4E00\u4E2A\u5B8F\u66FF\u6362\u6210\u4E00\u6761\u6307\u4EE4\u3002</p><p>\u4E0B\u9762\u7684\u5B8F\u5B9A\u4E49\u5C06\u5BFC\u81F4\u4E00\u4E2A\u9519\u8BEF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE MY_PRINTL     PRINTL

;ERB
MY_PRINTL \u8FD9\u662FPRINTL

;\u8FD0\u884C\u65F6
;\u4F1A\u62A5\u9519
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u5982\u4E0A\u6240\u8FF0\uFF0C\u8BE5\u5B8F\u53EA\u9002\u7528\u4E8E<code>*.ERB</code>\uFF0C\u4E0D\u9002\u7528\u4E8E<code>*.csv</code>\u548C<code>*.ERH</code>\u3002</p><p>ERB\uFF0C\u4F46\u4E0D\u5305\u62EC<code>*.csv</code>\u6216<code>*.ERH</code>\uFF0C\u4E5F\u4E0D\u5305\u62EC\u9884\u5904\u7406\u7A0B\u5E8F\u3001\u5C5E\u6027\u540D\u79F0\u6216\u884C\u9996\u3002</p><p><code>[SKIPSTART]</code>\u7B49\uFF0C<code>#DIM</code>\u3001<code>#FUNCTION</code>\u7B49\uFF0C\u4EE5\u53CA<code>@EVENTFIRST</code>\u7684<code>@</code>\u90E8\u5206\u7B49\uFF0C\u90FD\u4E0D\u88AB\u66FF\u6362\u3002</p><p>\u4F8B\u5982\uFF0C<code>#DEFINE HOGE SKIPSTART</code>\u5E76\u4E0D\u4EE5<code>[HOGE]</code>\u5F00\u59CB\u6CE8\u91CA\u3002</p><p>\u7136\u800C\uFF0C\u5373\u4F7F\u662F<code>#</code>\u540E\u9762\u7684\u5B57\u7B26\u4E32\uFF0C\u5982<code>#DIM</code>\u7684\u53D8\u91CF\u540D\uFF0C\u4E5F\u53EF\u4EE5\u88AB\u66FF\u6362\u3002</p><p>\u4F8B\u5982\uFF0C\u4E0B\u9762\u7684\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;ERH
#DEFINE HOGE MY_INT
#DEFINE FIVE 5

;ERB
@FUNC
#DIM HOGE, FIVE
HOGE:0 = 10

;\u8FD0\u884C\u65F6
@FUNC
#DIM MY_INT, 5
MY_INT:0 = 10
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u5C31\u5DE5\u4F5C\u6B63\u5E38\u3002</p>`,112);function r(p,l){return a}var i=n(s,[["render",r]]);export{i as default};
