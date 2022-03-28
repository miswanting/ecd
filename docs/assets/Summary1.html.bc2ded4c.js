import{g as n}from"./app.550d6991.js";import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";const s={},a=n(`<h1 id="\u5C0F\u7ED31" tabindex="-1"><a class="header-anchor" href="#\u5C0F\u7ED31" aria-hidden="true">#</a> \u5C0F\u7ED31</h1><p>\u606D\u559C\u4F60\uFF0C\u4F60\u73B0\u5728\u5DF2\u7ECF\u5B66\u4F1A\u4E86\u65B0\u624B\u4E09\u5927\u4EF6\uFF1A</p><ul><li>\u53D8\u91CF</li><li>\u7C7B\u578B</li><li>\u8F93\u5165\u4E0E\u8F93\u51FA</li></ul><p>\u524D\u9762\u7684\u4E09\u7BC7\u4EC5\u4EC5\u662F\u5BF9\u76F8\u5173\u6982\u5FF5\u8FDB\u884C\u4E86\u6700\u57FA\u7840\u7684\u63CF\u8FF0\uFF0C\u4F46\u8FD9\u8FD8\u6CA1\u6709\u89E6\u53CA ERB \u4EE3\u7801\u7684\u57FA\u51C6\u7EBF\uFF0C\u73B0\u5728\u6211\u4EEC\u901A\u8FC7\u5C0F\u7ED3\u6765\u878D\u4F1A\u8D2F\u901A\uFF0C\u8BA9\u5927\u5BB6\u80FD\u591F\u638C\u63E1\u8FD9\u4E2A\u90E8\u5206\u4E2D\u7684\u5E38\u7528\u77E5\u8BC6\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;\u6211\u662F\u6CE8\u91CA\uFF08\u6CE8\u610F\u5DE6\u8FB9\u7684\u534A\u89D2\u5206\u53F7\uFF09\u3002
;\u4E0B\u9762\u4E00\u884C\u662F\u5185\u7F6E\u7684\u51FD\u6570\u201C\u7B2C\u4E00\u4E8B\u4EF6\u201D\uFF0C\u662F\u5728\u73A9\u5BB6\u70B9\u51FB\u65B0\u7684\u5F00\u59CB\u540E\u6267\u884C\u7684\u7B2C\u4E00\u6BB5\u4EE3\u7801\u3002
@EventFirst ;\u6CE8\u91CA\u4E5F\u53EF\u4EE5\u5199\u5728\u884C\u672B\uFF08\u4F46\u4E0D\u9002\u7528\u4E8E\u6240\u6709\u8BED\u53E5\uFF09\u3002
  ;\u5B9A\u4E49\u6570\u503C\u53D8\u91CFMyNumber
  #Dim MyNumber = 123
  ;\u5B9A\u4E49\u5B57\u7B26\u4E32\u53D8\u91CFMyText
  #DimS MyText = &quot;Hello World!&quot;
  Print \u6570\u503C\u53D8\u91CF\u7684\u540D\u79F0\u662F\uFF1A
  Print MyNumber
  Print \u6570\u503C\u53D8\u91CF\u7684\u503C\u662F\uFF1A
  PrintV MyNumber
  ;\u53EF\u4EE5\u4F7F\u7528PrintL\u6307\u4EE4\u624B\u52A8\u6362\u884C
  PrintL 
  Print \u5B57\u7B26\u4E32\u53D8\u91CF\u7684\u540D\u79F0\u662F\uFF1A
  Print MyText
  Print \u5B57\u7B26\u4E32\u53D8\u91CF\u7684\u503C\u662F\uFF1A
  PrintS MyText
  Print \u8BF7\u8F93\u5165\u6570\u5B57\uFF1A
  Input
  Print \u8F93\u5165\u7684\u6570\u5B57\u4E3A\uFF1A
  PrintVL Result ;\u6CE8\u610F\u8FD9\u91CC\u4F7F\u7528\u7684\u8F93\u51FA\u5177\u6709\u6362\u884C\u529F\u80FD\u3002
  Print \u8BF7\u8F93\u5165\u6587\u672C\uFF1A
  InputS
  Print \u8F93\u5165\u7684\u6587\u672C\u4E3A\uFF1A
  PrintSL ResultS ;\u6CE8\u610F\u8FD9\u91CC\u4F7F\u7528\u7684\u8F93\u51FA\u4E5F\u5177\u6709\u6362\u884C\u529F\u80FD\u3002
  Print \u6309\u4EFB\u610F\u952E\u9000\u51FA
  Quit
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="\u5C0F\u6D4B\u9A8C" tabindex="-1"><a class="header-anchor" href="#\u5C0F\u6D4B\u9A8C" aria-hidden="true">#</a> \u5C0F\u6D4B\u9A8C</h2><p>\u8BF4\u51FA\u4E0B\u5217\u547D\u4EE4\u5206\u522B\u4EE3\u8868\u4EC0\u4E48\u610F\u601D\uFF1F</p><ul><li><code>#Dim</code></li><li><code>#DimS</code></li><li><code>Print</code></li><li><code>PrintV</code></li><li><code>PrintS</code></li><li><code>PrintL</code></li><li><code>PrintVL</code></li><li><code>PrintSL</code></li><li><code>Input</code></li><li><code>InputS</code></li><li><code>Result</code></li><li><code>ResultS</code></li></ul><p>\u597D\u4E86\uFF0C\u6211\u4EEC\u5BF9\u6700\u5E38\u7528\u7684\u7B80\u5355\u8BED\u6CD5\u5DF2\u7ECF\u5FC3\u91CC\u6709\u6570\u4E86\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u5C31\u53EF\u4EE5\u52A0\u5FEB\u5B66\u4E60\u7684\u901F\u5EA6\u4E86\uFF01</p>`,9);function r(i,l){return a}var t=e(s,[["render",r]]);export{t as default};
