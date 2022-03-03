import{d as n,o as a,c,e as d,F as r,g as e}from"./app.840b3997.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const i={},t=e('<h1 id="\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u547D\u4EE4" aria-hidden="true">#</a> \u547D\u4EE4</h1><blockquote><p>\u7FFB\u8BD1\u81EA\u539F\u6587\u6863\uFF1Ahttps://osdn.net/projects/emuera/wiki/excom</p></blockquote><h2 id="print\u7CFB" tabindex="-1"><a class="header-anchor" href="#print\u7CFB" aria-hidden="true">#</a> Print\u7CFB</h2><h3 id="print-\u7CFB\u547D\u4EE4\u8F85\u52A9\u9009\u62E9\u5668" tabindex="-1"><a class="header-anchor" href="#print-\u7CFB\u547D\u4EE4\u8F85\u52A9\u9009\u62E9\u5668" aria-hidden="true">#</a> Print \u7CFB\u547D\u4EE4\u8F85\u52A9\u9009\u62E9\u5668</h3>',4),l=e(`<h3 id="print-v-s-form-forms-k-d-l-w" tabindex="-1"><a class="header-anchor" href="#print-v-s-form-forms-k-d-l-w" aria-hidden="true">#</a> Print(|V|S|Form|FormS)(|K|D)(|L|W)</h3><p>\u8FD9\u662FPRINT\u7CFB\u7EDF\u7684\u57FA\u672C\u6307\u4EE4\u3002</p><p>\u7B2C\u4E00\u4E2A\u62EC\u53F7\u4E2D\u7684\u5173\u952E\u8BCD\u6307\u5B9A\u4E86<strong>\u53C2\u6570\u7C7B\u578B</strong>\u3002</p><ul><li><code>\u65E0</code>\uFF1A\u5B57\u7B26\u4E32</li><li><code>V</code>\uFF1A\u6570\u503C\u8868\u8FBE\u5F0F</li><li><code>S</code>\uFF1A\u5B57\u7B26\u4E32\u8868\u8FBE\u5F0F</li><li><code>Form</code>\uFF1A\u683C\u5F0F\u5316\u5B57\u7B26\u4E32</li><li><code>FormS</code>\uFF1A\u683C\u5F0F\u5316\u5B57\u7B26\u4E32\u8868\u8FBE\u5F0F</li></ul><p>\u7B2C\u4E8C\u4E2A\u62EC\u53F7\u4E2D\u7684\u5173\u952E\u5B57<code>K</code>\u6307\u5B9A\u5E94\u7528<code>ForceKana</code>\u6307\u4EE4\uFF0C\u5173\u952E\u5B57<code>D</code>\u6307\u5B9A\u5FFD\u7565<code>SetColor</code>\u6307\u4EE4\u3002 \u4ECE1.736\u7248\u672C\u5F00\u59CB\uFF0C\u5173\u952E\u8BCD<code>K</code>\u548C<code>D</code>\u4E0D\u80FD\u540C\u65F6\u6307\u5B9A\u3002</p><ul><li><code>\u65E0</code>\uFF1A\u5FFD\u7565<code>ForceKana</code>\uFF0C\u4EE5<code>SetColor</code>\u6307\u5B9A\u7684\u989C\u8272\u4F5C\u753B</li><li><code>K</code>\uFF1A\u5E94\u7528<code>ForceKana</code>\u7ED8\u5236</li><li><code>D</code>\uFF1A\u5FFD\u7565<code>SetColor</code>\uFF0C\u4EE5\u914D\u7F6E\u4E2D\u6307\u5B9A\u7684\u9ED8\u8BA4\u989C\u8272\u7ED8\u5236</li></ul><p>\u7B2C\u4E09\u4E2A\u62EC\u53F7\u4E2D\u7684\u5173\u952E\u5B57\u6307\u5B9A\u4E86\u5728\u7ED8\u56FE\u540E<strong>\u662F\u5426\u5E94\u51FA\u73B0\u6362\u884C\u6216\u7B49\u5F85</strong>\u3002</p><ul><li><code>\u65E0</code>\uFF1A\u53EA\u6253\u5370\uFF0C\u65E0\u6362\u884C\u6216\u7B49\u5F85</li><li><code>K</code>\uFF1A<code>Print</code>\u540E\u6362\u884C</li><li><code>D</code>\uFF1A\u5728<code>Print</code>\u4E4B\u540E\u6362\u884C\uFF0C\u5E76\u6267\u884C<code>Wait</code>\u6307\u4EE4</li></ul><p>\u4F8B\u5982\uFF0C<code>PrintSDW</code>\u5373\u6307\u5B9A<code>\u5B57\u7B26\u4E32\u8868\u8FBE\u5F0F</code>\u4F5C\u4E3A\u53C2\u6570\uFF0C\u4EE5\u9ED8\u8BA4\u989C\u8272\u7ED8\u5236\uFF0C\u5E76\u5728<code>Print</code>\u4E4B\u540E\u6267\u884C<code>Wait</code>\u6307\u4EE4\u3002</p><h3 id="printsingle-v-s-form-forms-k-d" tabindex="-1"><a class="header-anchor" href="#printsingle-v-s-form-forms-k-d" aria-hidden="true">#</a> PrintSingle(|V|S|Form|FormS)(|K|D)</h3><p><code>PrintSingle</code>\u7CFB\u547D\u4EE4\u51E0\u4E4E\u4E0E<code>PrintL</code>\u76F8\u540C\uFF0C\u53EA\u662F<code>PrintSingle</code>\u7CFB\u547D\u4EE4\u4E0D\u5BF9\u6587\u672C\u6EA2\u51FA\u8FDB\u884C\u6362\u884C\uFF0C\u800C\u662F\u59CB\u7EC8\u5728\u5355\u884C\u4E0A\u663E\u793A\u3002</p><p>\u8D85\u8FC7\u5C4F\u5E55\u8FB9\u7F18\u7684\u6587\u5B57\u4E0D\u4F1A\u88AB\u7ED8\u5236\u3002</p><p>\u53E6\u5916\uFF0C\u6CA1\u6709<code>(|L|W)</code>\u5173\u952E\u8BCD\uFF0C\u56E0\u4E3A\u4F1A\u81EA\u52A8\u6DFB\u52A0\u6362\u884C\u7B26\u3002</p><p>\u5176\u4ED6\u5173\u952E\u8BCD\u7684\u542B\u4E49\u4E0E<code>Print</code>\u7CFB\u547D\u4EE4\u76F8\u540C\u3002</p><h3 id="print-form-c-lc-k-d" tabindex="-1"><a class="header-anchor" href="#print-form-c-lc-k-d" aria-hidden="true">#</a> Print(|Form)(C|LC)(|K|D)</h3><p>\u8FD9\u662F\u4E00\u6761<code>PrintC</code>\u6307\u4EE4\u3002</p><p>\u5B83\u662F\u901A\u8FC7\u589E\u52A0\u534A\u89D2\u7A7A\u683C\u4F7F\u5176\u8FBE\u5230\u914D\u7F6E\u4E2D<code>PrintC\u7684\u5B57\u7B26\u6570</code>\uFF08\u521D\u59CB\u503C25\uFF09\u6240\u8BBE\u7F6E\u7684\u5B57\u7B26\u6570\u7684<code>Print</code>\u7684\u6307\u4EE4\u3002</p><p>\u5728Emuera\u4E2D\uFF0C<code>PrintC</code>\u6307\u4EE4\u5728<code>Print</code>\u5B57\u7B26\u4E32\u88AB\u6309\u94AE\u5316\u5904\u7406\u7684\u8FC7\u7A0B\u4E2D\u6709\u4E9B\u7279\u6B8A\u3002</p><p>\u7B2C\u4E00\u4E2A\u62EC\u53F7\u4E2D\u7684\u5173\u952E\u8BCD\u6307\u5B9A\u4E86<strong>\u53C2\u6570\u7C7B\u578B</strong>\u3002</p><ul><li><code>\u65E0</code>\uFF1A\u5B57\u7B26\u4E32</li><li><code>Form</code>\uFF1A\u683C\u5F0F\u5316\u5B57\u7B26\u4E32</li></ul><p>\u62EC\u53F7\u4E2D\u7684\u7B2C\u4E8C\u4E2A\u5173\u952E\u8BCD\u6307\u5B9A\u4E86<strong>\u5BF9\u9F50\u4F4D\u7F6E</strong>\u3002</p><ul><li><code>C</code>\uFF1A\u53F3\u5BF9\u9F50\uFF08\u5DE6\u4FA7\u7528\u534A\u89D2\u7A7A\u683C\u586B\u5145\uFF09</li><li><code>LC</code>\uFF1A\u5DE6\u5BF9\u9F50</li></ul><p>\u7B2C\u4E09\u62EC\u53F7\u4E2D\u7684<code>K</code>\u548C<code>D</code>\u4E0E<code>Print</code>\u7CFB\u4E2D\u7684\u76F8\u540C\u3002</p><h3 id="printdata-k-d-l-w" tabindex="-1"><a class="header-anchor" href="#printdata-k-d-l-w" aria-hidden="true">#</a> PrintData(|K|D)(|L|W)</h3><div class="language-basic ext-basic line-numbers-mode"><pre class="language-basic"><code>PrintData<span class="token punctuation">(</span>\u6570\u5024\u5909\u6570\uFF1A\u7701\u7565\u53EF<span class="token punctuation">)</span>
<span class="token keyword">Data</span><span class="token punctuation">(</span>\u6587\u5B57<span class="token punctuation">)</span>
DataForm<span class="token punctuation">(</span>Form\u6587\u5B57\u5217<span class="token punctuation">)</span>
DataList
<span class="token punctuation">(</span><span class="token keyword">Data</span> <span class="token operator">or</span> DataForm\u7684\u6392\u5217<span class="token punctuation">)</span>
EndList
EndData
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,25);function p(u,h){const o=n("PrintCommandChooser");return a(),c(r,null,[t,d(o),l],64)}var k=s(i,[["render",p]]);export{k as default};
