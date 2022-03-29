import{d as l,o as e,c as p,a as n,e as c,F as r,b as s,g as i}from"./app.d32e40b2.js";import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";const o={},d=n("h1",{id:"\u5F0F\u4E2D\u51FD\u6570",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5F0F\u4E2D\u51FD\u6570","aria-hidden":"true"},"#"),s(" \u5F0F\u4E2D\u51FD\u6570")],-1),b=n("blockquote",null,[n("p",null,"\u7FFB\u8BD1\u81EA\u539F\u6587\u6863\uFF1Ahttps://osdn.net/projects/emuera/wiki/exmeth")],-1),u=s("\u8BD1\u8005\uFF1A"),m={href:"https://github.com/df32",target:"_blank",rel:"noopener noreferrer"},y=s("\u98CE\u98CF@df32"),S=i(`<p>Emuera 1.712\u8FFD\u52A0\u4E86\u65B0\u7684\u8BED\u6CD5\uFF0C\u88AB\u79F0\u4E3A<strong>\u5F0F\u4E2D\u51FD\u6570</strong>\uFF0C\u6216\u8005\u53EB\u201C\u65B9\u6CD5\u201D\uFF08Method\uFF09\u3002</p><p>ERB\u811A\u672C\u4E2D\uFF0C<strong>\u51FD\u6570</strong>\u662F\u6307\u4EE5 <code>@ ~ ~</code> \u7684\u5F62\u5F0F\u5B9A\u4E49\uFF0C\u901A\u8FC7<code>CALL</code>\u547D\u4EE4\u6765\u8C03\u7528\u7684\u4E1C\u897F\u3002 \u800C<strong>\u5F0F\u4E2D\u51FD\u6570</strong>\u5219\u662F\u540C\u6837\u4EE5 <code>@ ~ ~</code> \u5F62\u5F0F\u5B9A\u4E49\uFF0C\u4F46\u76F4\u63A5\u5728\u8868\u8FBE\u5F0F\u4E2D\u4F7F\u7528\u7684\u4E1C\u897F\u3002 \u7B80\u5355\u7684\u8BF4\uFF0C\u5F0F\u4E2D\u51FD\u6570\u662F\u53EF\u4EE5\u5728\u8868\u8FBE\u5F0F\u4E2D\u4F7F\u7528\u7684<strong>\u51FD\u6570</strong>\u3002</p><p>\u4E0B\u9762\u6F14\u793A\u4E86\u5F0F\u4E2D\u51FD\u6570\u7684\u4F7F\u7528\uFF1A</p><div class="language-erb ext-erb line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#C9D1D9;">A = ABS(A)</span></span>
<span class="line"><span style="color:#C9D1D9;">IF STRLENS(STR:0) &gt; A</span></span>
<span class="line"><span style="color:#C9D1D9;">	LOCALS:0 = %SUBSTRING(STR:0, A, 1)%</span></span>
<span class="line"><span style="color:#C9D1D9;">ENDIF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u811A\u672C\u4E2D\uFF0C \u4EE4<code>A</code>\u4E3A<code>A</code>\u7684\u7EDD\u5BF9\u503C\uFF0C \u82E5<code>STR:0</code>\u7684\u5B57\u7B26\u4E32\u957F\u5EA6\u6BD4<code>A</code>\u5927\uFF0C \u5219\u4EE4<code>LOCALS:0</code>\u4E3A<code>STR:0</code>\u7684<code>A</code>\u4F4D\u7F6E\u4EE5\u540E\u7684\u622A\u53D6\u5185\u5BB9\u3002</p><p>\u82E5\u4E0D\u4F7F\u7528\u5F0F\u4E2D\u51FD\u6570\uFF0C\u4E0A\u9762\u7684\u811A\u672C\u53EF\u4EE5\u91CD\u5199\u4E3A\u4E0B\u9762\uFF1A</p><div class="language-erb ext-erb line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#C9D1D9;">ABS A</span></span>
<span class="line"><span style="color:#C9D1D9;">A = RESULT</span></span>
<span class="line"><span style="color:#C9D1D9;">STRLENS STR:0</span></span>
<span class="line"><span style="color:#C9D1D9;">IF RESULT &gt; A</span></span>
<span class="line"><span style="color:#C9D1D9;">	SUBSTRING STR:0, A, 1</span></span>
<span class="line"><span style="color:#C9D1D9;">	LOCALS:0 = %RESULTS:0%</span></span>
<span class="line"><span style="color:#C9D1D9;">ENDIF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u9664\u4E86\u4F1A\u4EA7\u751F\u4E2D\u95F4\u503C<code>RESULT</code>\u4E0E<code>RESULTS</code>\u4EE5\u5916\uFF0C\u8FD9\u4E24\u6BB5\u811A\u672C\u6548\u679C\u5B8C\u5168\u76F8\u540C\u3002</p><h2 id="\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B" aria-hidden="true">#</a> \u793A\u4F8B</h2><p>\u4EE5\u4E0B\u5185\u5BB9\u89E3\u91CA\u4E86\u672C\u6587\u7528\u5230\u7684\u4E00\u4E9B\u7B26\u53F7\u3002 \u4F8B\u5982\uFF0C</p><div class="language-text ext-text line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#c9d1d9;">	int STRLENS(str s)</span></span>
<span class="line"><span style="color:#c9d1d9;">	str SUBSTRING(str s, int start = 0, int length = -1)</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u884C\u9996\u7684<code>int</code>\u548C<code>str</code>\u662F\u5F0F\u4E2D\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u7C7B\u578B\u3002 <code>int</code>\u662F\u6570\u503C\u578B\uFF0C<code>str</code>\u662F\u5B57\u7B26\u4E32\u578B\u3002 \u4E0B\u9762\u811A\u672C\u7B2C\u4E00\u884C\u662F\u6B63\u786E\u7684\uFF0C\u7B2C\u4E8C\u884C\u662F\u9519\u8BEF\u7684\u3002</p><div class="language-erb ext-erb line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#C9D1D9;">	A = STRLENS(&quot;abc&quot;)</span></span>
<span class="line"><span style="color:#C9D1D9;">	A = SUBSTRING(&quot;abc&quot;, 0, 1)</span></span>
<span class="line"><span style="color:#C9D1D9;">	</span><span style="color:#8B949E;">; \u9519\u8BEF\uFF0C\u8BD5\u56FE\u4E3A\u6570\u503C\u578B\u53D8\u91CF\u8D4B\u4E88\u5B57\u7B26\u4E32\u578B\u7684\u503C</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u63A5\u4E0B\u6765\u7684<code>STRLENS</code>\u548C<code>SUBSTRING</code>\u662F\u5F0F\u4E2D\u51FD\u6570\u7684\u540D\u5B57\u3002</p><p><code>( )</code>\u4E2D\u7684\u6587\u5B57<code>str s</code>\u7B49\u8868\u793A\u5F0F\u4E2D\u51FD\u6570\u7684\u53C2\u6570\u3002 \u5F53\u6709\u591A\u4E2A\u53C2\u6570\u65F6\uFF0C\u4F7F\u7528\u9017\u53F7\u5206\u9694\u3002 <code>STRLENS</code>\u6709\u4E00\u4E2A\u53C2\u6570\uFF0C<code>SUBSTRING</code>\u67093\u4E2A\u53C2\u6570\u3002</p><p>\u53C2\u6570\u7684\u7B2C\u4E00\u4E2A\u5355\u8BCD\u8868\u793A\u53C2\u6570\u7684\u503C\u7C7B\u578B\u3002 <code>STRLENS</code>\u53C2\u6570\u662F\u5B57\u7B26\u4E32\u578B<code>str</code>\u3002 <code>SUBSTRING</code>\u7684\u7B2C\u4E00\u53C2\u6570\u662F\u5B57\u7B26\u4E32\u578B<code>str</code>\uFF0C\u7B2C\u4E8C\u3001\u4E09\u53C2\u6570\u662F64\u4F4D\u6570\u503C\u578B<code>int</code>\u3002</p><p>\u63A5\u4E0B\u6765\u7684<code>str</code>\u3001<code>start</code>\u3001<code>length</code>\u7684\u5355\u8BCD\u662F\u53C2\u6570\u7684\u540D\u5B57\u3002 \u53C2\u6570\u7684\u540D\u5B57\u901A\u5E38\u4E3A\u4E86\u65B9\u4FBF\u7406\u89E3\u53C2\u6570\u7684\u4F5C\u7528\u800C\u8D77\u3002</p><p>\u53C2\u6570\u540D\u5B57\u4E4B\u540E\u7684 <code>=0</code> \u8868\u793A\u8FD9\u4E2A\u53C2\u6570\u53EF\u4EE5\u7701\u7565\uFF0C\u7701\u7565\u65F6\u4F7F\u7528\u7684\u9ED8\u8BA4\u503C\u3002 \u4E0B\u9762\u811A\u672C\u6BCF\u4E00\u884C\u7684\u610F\u601D\u90FD\u76F8\u540C\uFF1A</p><div class="language-erb ext-erb line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#C9D1D9;">	STR = SUBSTRING(RESULTS)</span></span>
<span class="line"><span style="color:#C9D1D9;">	STR = SUBSTRING(RESULTS, 0)</span></span>
<span class="line"><span style="color:#C9D1D9;">	STR = SUBSTRING(RESULTS, , -1)</span></span>
<span class="line"><span style="color:#C9D1D9;">	STR = SUBSTRING(RESULTS, 0, -1)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u4E5F\u53EF\u4EE5\u7701\u7565\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002</p><div class="language-erb ext-erb line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#C9D1D9;">	</span><span style="color:#8B949E;">;int RAND(int min = 0, int max)</span></span>
<span class="line"><span style="color:#C9D1D9;">	A = RAND(100)</span></span>
<span class="line"><span style="color:#C9D1D9;">	A = RAND( , 100)</span></span>
<span class="line"><span style="color:#C9D1D9;">	A = RAND(0, 100)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u9664\u6B64\u4E4B\u5916\uFF0C\u5F0F\u4E2D\u51FD\u6570\u4E5F\u53EF\u4EE5\u6CA1\u6709\u53C2\u6570\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#c9d1d9;">	int GETTIME()</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u867D\u7136<code>GETTIME</code>\u6CA1\u6709\u53C2\u6570\uFF0C\u4F46\u662F<code>()</code>\u662F\u5FC5\u987B\u7684\u3002\uFF08\u4E3A\u4E86\u533A\u5206\u53D8\u91CF\u548C\u5F0F\u4E2D\u51FD\u6570\uFF09</p><div class="language-text ext-text line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#c9d1d9;">	int FINDCHARA(var key, ? value, int start = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FD9\u6BB5\u811A\u672C\u4E2D\uFF0C<code>var</code>\u8868\u793A\u53D8\u91CF\u7C7B\u578B\u3002\u8FD9\u91CC\u5E94\u5F53\u8F93\u5165\u7684\u662F<code>TALENT</code>\u7B49\u53D8\u91CF\u3002 <code>?</code> \u8868\u793A\u53EF\u4EE5\u63A5\u53D7\u591A\u79CD\u7C7B\u578B\u7684\u503C\u3002</p><p><code>FINDCHARA</code>\u4E2D\u7B2C\u4E8C\u53C2\u6570\u7684\u7C7B\u578B\u662F\u7531\u7B2C\u4E00\u53C2\u6570\u51B3\u5B9A\u7684\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#c9d1d9;">	int MAX(int n\uFF0Cint m ...)</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u7701\u7565\u53F7\u8868\u793A\u4E0D\u9650\u5236\u53C2\u6570\u7684\u6570\u91CF\u3002</p><div class="language-erb ext-erb line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#C9D1D9;">	M = MAX(A\uFF0CB\uFF0CC\uFF0CE\uFF0CD\uFF0CF\uFF0CG\uFF09</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>M</code>\u5C06\u7B49\u4E8E<code>A~G</code>\u4E2D\u6570\u503C\u6700\u5927\u7684\u53D8\u91CF\u3002</p><h2 id="\u5185\u7F6E\u5F0F\u4E2D\u51FD\u6570\u4E00\u89C8" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u5F0F\u4E2D\u51FD\u6570\u4E00\u89C8" aria-hidden="true">#</a> \u5185\u7F6E\u5F0F\u4E2D\u51FD\u6570\u4E00\u89C8</h2><div class="language-text ext-text line-numbers-mode"><pre class="shiki" style="background-color:#0d1117;"><code><span class="line"><span style="color:#c9d1d9;">int GETCHARA(int no, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETSPCHARA(int no)</span></span>
<span class="line"><span style="color:#c9d1d9;">int FINDCHARA(var key, ? value, int start = 0, int end = \u203B)</span></span>
<span class="line"><span style="color:#c9d1d9;">int FINDLASTCHARA(var key, ? value, int start = 0, int end = \u203B)</span></span>
<span class="line"><span style="color:#c9d1d9;">str CSVNAME(int no, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">str CSVCALLNAME(int no, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">str CSVNICKNAME(int no, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">str CSVMASTERNAME(int no, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">str CSVCSTR(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVBASE(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVABL(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVTALENT(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVMARK(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVEXP(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVRELATION(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVJUEL(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVEQUIP(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CSVCFLAG(int no, int index, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int EXISTCSV(int no, int flag = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETNUM(var key, str name)</span></span>
<span class="line"><span style="color:#c9d1d9;">int STRLENS(str s)</span></span>
<span class="line"><span style="color:#c9d1d9;">int STRLENSU(str s)</span></span>
<span class="line"><span style="color:#c9d1d9;">str SUBSTRING(str s, int start = 0, int length = -1)</span></span>
<span class="line"><span style="color:#c9d1d9;">str SUBSTRINGU(str s, int start = 0, int length = -1)</span></span>
<span class="line"><span style="color:#c9d1d9;">str CHARATU(str s, int position = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int STRFIND(str str, str find, int start = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int STRFINDU(str str, str find, int start = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int STRCOUNT(str input, str match)</span></span>
<span class="line"><span style="color:#c9d1d9;">str UNICODE(int value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int ENCODETOUNI(str value, int position = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">str REPLACE(str source, str match, str newvalue)</span></span>
<span class="line"><span style="color:#c9d1d9;">str ESCAPE(str value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int VARSIZE(str name, int dim = 0)</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETTIME()</span></span>
<span class="line"><span style="color:#c9d1d9;">str GETTIMES()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETMILLISECOND()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETSECOND()</span></span>
<span class="line"><span style="color:#c9d1d9;">int CHKFONT(str fontname)</span></span>
<span class="line"><span style="color:#c9d1d9;">int POWER(int x, int y)</span></span>
<span class="line"><span style="color:#c9d1d9;">int RAND(int min = 0, int max)</span></span>
<span class="line"><span style="color:#c9d1d9;">int ABS(int n)</span></span>
<span class="line"><span style="color:#c9d1d9;">int SIGN(int n)</span></span>
<span class="line"><span style="color:#c9d1d9;">int MAX(int n, int m...)</span></span>
<span class="line"><span style="color:#c9d1d9;">int MIN(int n, int m...)</span></span>
<span class="line"><span style="color:#c9d1d9;">int LIMIT(int value, int min, int max)</span></span>
<span class="line"><span style="color:#c9d1d9;">int INRANGE(int value, int min, int max)</span></span>
<span class="line"><span style="color:#c9d1d9;">int SQRT(int n)</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETBIT(int n, int m)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CBRT(int value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int LOG(int value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int LOG10(int value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int EXPONENT(int value)</span></span>
<span class="line"><span style="color:#c9d1d9;">str GETFONT()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETCOLOR()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETDEFCOLOR()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETBGCOLOR()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETDEFBGCOLOR()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETFOCUSCOLOR()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETSTYLE()</span></span>
<span class="line"><span style="color:#c9d1d9;">str CURRENTALIGN()</span></span>
<span class="line"><span style="color:#c9d1d9;">int CURRENTREDRAW()</span></span>
<span class="line"><span style="color:#c9d1d9;">str TOSTR(int value, str format = &quot;&quot;)</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETPALAMLV(int value, int maxLV)</span></span>
<span class="line"><span style="color:#c9d1d9;">int GETEXPLV(int value, int maxLV)</span></span>
<span class="line"><span style="color:#c9d1d9;">str TOUPPER(str value)</span></span>
<span class="line"><span style="color:#c9d1d9;">str TOLOWER(str value)</span></span>
<span class="line"><span style="color:#c9d1d9;">str TOHALF(str value)</span></span>
<span class="line"><span style="color:#c9d1d9;">str TOFULL(str value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int SUMARRAY(var array, int start = 0, int end = \u203B)</span></span>
<span class="line"><span style="color:#c9d1d9;">int MATCH(var array, ? value, int start = 0, int end = \u203B)</span></span>
<span class="line"><span style="color:#c9d1d9;">int MAXARRAY(var array, int start = 0, int end = \u203B)</span></span>
<span class="line"><span style="color:#c9d1d9;">int MINARRAY(var array, int start = 0, int end = \u203B)</span></span>
<span class="line"><span style="color:#c9d1d9;">int SUMCARRAY(var carray, int start = 0, int end = CHARANUM)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CMATCH(var carray, ? value, int start = 0, int end = CHARANUM)</span></span>
<span class="line"><span style="color:#c9d1d9;">int MAXCARRAY(var carray, int start = 0, int end = CHARANUM)</span></span>
<span class="line"><span style="color:#c9d1d9;">int MINCARRAY(var carray, int start = 0, int end = CHARANUM)</span></span>
<span class="line"><span style="color:#c9d1d9;">int ISNUMERIC(str value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int TOINT(str value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int CHKDATA(int value)</span></span>
<span class="line"><span style="color:#c9d1d9;">int SAVENOS()</span></span>
<span class="line"><span style="color:#c9d1d9;">int PRINTCPERLINE()</span></span>
<span class="line"><span style="color:#c9d1d9;">int LINEISEMPTY()</span></span>
<span class="line"><span style="color:#c9d1d9;">int GROUPMATCH(? key, ? value1, ? value2...)</span></span>
<span class="line"><span style="color:#c9d1d9;">int NOSAMES(? value1, ? value2...)</span></span>
<span class="line"><span style="color:#c9d1d9;">int ALLSAMES(? value1, ? value2...)</span></span>
<span class="line"><span style="color:#c9d1d9;">int ISSKIP()</span></span>
<span class="line"><span style="color:#c9d1d9;">int MOUSESKIP()</span></span>
<span class="line"><span style="color:#c9d1d9;">str CONVERT(int value, \u203B)</span></span>
<span class="line"><span style="color:#c9d1d9;">str MONEYSTR(int value, str format = &quot;&quot;)</span></span>
<span class="line"><span style="color:#c9d1d9;">int FINDELEMENT(var array, ? value, int start = 0, int end = \u203B, int flag)</span></span>
<span class="line"><span style="color:#c9d1d9;">int FINDLASTELEMENT(var array, ? value, int start = 0, int end = \u203B, int flag)</span></span>
<span class="line"><span style="color:#c9d1d9;">str BARSTR(int value, int max, int length)</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div>`,33);function T(E,R){const a=l("ExternalLinkIcon");return e(),p(r,null,[d,b,n("p",null,[u,n("a",m,[y,c(a)])]),S],64)}var C=t(o,[["render",T]]);export{C as default};
