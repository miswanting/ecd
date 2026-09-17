import{X as e,Y as t,ct as n,t as r}from"./chunks/framework.CaFWb3SA.js";var i=JSON.parse(`{"title":"小结1","description":"","frontmatter":{},"headers":[],"relativePath":"guide/tutorials/Summary1.md","filePath":"guide/tutorials/Summary1.md"}`),a={name:`guide/tutorials/Summary1.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="小结1" tabindex="-1">小结1 <a class="header-anchor" href="#小结1" aria-label="Permalink to “小结1”">​</a></h1><p>恭喜你，你现在已经学会了新手三大件：</p><ul><li>变量</li><li>类型</li><li>输入与输出</li></ul><p>前面的三篇仅仅是对相关概念进行了最基础的描述，但这还没有触及 ERB 代码的基准线，现在我们通过小结来融会贯通，让大家能够掌握这个部分中的常用知识。</p><div class="language-erb"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">erb</span><pre class="shiki slack-dark" style="background-color:#222222;color:#E6E6E6;" tabindex="0" dir="ltr"><code><span class="line"><span style="color:#6A9955;">;我是注释（注意左边的半角分号）。</span></span>
<span class="line"><span style="color:#6A9955;">;下面一行是内置的函数“第一事件”，是在玩家点击新的开始后执行的第一段代码。</span></span>
<span class="line"><span style="color:#E6E6E6;">@</span><span style="color:#DCDCAA;">EventFirst</span><span style="color:#6A9955;"> ;注释也可以写在行末（但不适用于所有语句）。</span></span>
<span class="line"><span style="color:#6A9955;">  ;定义数值变量MyNumber</span></span>
<span class="line"><span style="color:#569CD6;">  #</span><span style="color:#C586C0;">Dim</span><span style="color:#9CDCFE;"> MyNumber</span><span style="color:#D4D4D4;"> =</span><span style="color:#B5CEA8;"> 123</span></span>
<span class="line"><span style="color:#6A9955;">  ;定义字符串变量MyText</span></span>
<span class="line"><span style="color:#569CD6;">  #</span><span style="color:#C586C0;">DimS</span><span style="color:#9CDCFE;"> MyText</span><span style="color:#D4D4D4;"> =</span><span style="color:#CE9178;"> &quot;Hello World!&quot;</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 数值变量的名称是：</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> MyNumber</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 数值变量的值是：</span></span>
<span class="line"><span style="color:#569CD6;">  PrintV</span><span style="color:#9CDCFE;"> MyNumber</span></span>
<span class="line"><span style="color:#6A9955;">  ;可以使用PrintL指令手动换行</span></span>
<span class="line"><span style="color:#569CD6;">  PrintL</span><span style="color:#E6E6E6;"> </span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 字符串变量的名称是：</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> MyText</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 字符串变量的值是：</span></span>
<span class="line"><span style="color:#569CD6;">  PrintS</span><span style="color:#9CDCFE;"> MyText</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 请输入数字：</span></span>
<span class="line"><span style="color:#569CD6;">  Input</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 输入的数字为：</span></span>
<span class="line"><span style="color:#569CD6;">  PrintVL</span><span style="color:#9CDCFE;"> Result</span><span style="color:#6A9955;"> ;注意这里使用的输出具有换行功能。</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 请输入文本：</span></span>
<span class="line"><span style="color:#569CD6;">  InputS</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 输入的文本为：</span></span>
<span class="line"><span style="color:#569CD6;">  PrintSL</span><span style="color:#9CDCFE;"> ResultS</span><span style="color:#6A9955;"> ;注意这里使用的输出也具有换行功能。</span></span>
<span class="line"><span style="color:#569CD6;">  Print</span><span style="color:#9CDCFE;"> 按任意键退出</span></span>
<span class="line"><span style="color:#569CD6;">  Quit</span></span></code></pre></div><h2 id="小测验" tabindex="-1">小测验 <a class="header-anchor" href="#小测验" aria-label="Permalink to “小测验”">​</a></h2><p>说出下列命令分别代表什么意思？</p><ul><li><code>#Dim</code></li><li><code>#DimS</code></li><li><code>Print</code></li><li><code>PrintV</code></li><li><code>PrintS</code></li><li><code>PrintL</code></li><li><code>PrintVL</code></li><li><code>PrintSL</code></li><li><code>Input</code></li><li><code>InputS</code></li><li><code>Result</code></li><li><code>ResultS</code></li></ul><p>好了，我们对最常用的简单语法已经心里有数了，接下来我们就可以加快学习的速度了！</p>`,9)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};