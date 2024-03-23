import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-DVIbrNyI.js";const e="/assets/image-20230724195354148-CUbXu024.png",p={},o=t(`<h1 id="_12、创建地球" tabindex="-1"><a class="header-anchor" href="#_12、创建地球"><span>12、创建地球</span></a></h1><p>承接第一节的Cesium加载地球与环境搭建，需要注意几个点：</p><h3 id="_1、vue的响应式与地图、三维等复杂状态对象" tabindex="-1"><a class="header-anchor" href="#_1、vue的响应式与地图、三维等复杂状态对象"><span>1、Vue的响应式与地图、三维等复杂状态对象</span></a></h3><h4 id="_1-1、如何避免响应式" tabindex="-1"><a class="header-anchor" href="#_1-1、如何避免响应式"><span>1.1、如何避免响应式</span></a></h4><p>在<strong>Vue 2</strong>中，其响应式是通过Object.defineProperty递归实现的，在Vue 2的文档中也明确指出：</p><blockquote><p><strong>data</strong>是<strong>Vue</strong>实例的数据对象，<strong>Vue</strong>会递归地吧<strong>data</strong>的<strong>property</strong>转换为<strong>getter/setter</strong>，从而让<strong>data</strong>的<strong>property</strong>能够响应数据变化。<strong>对象必须是纯粹的对象（含有零个或多个Key/value对）</strong>：浏览器<strong>API</strong>创建的原生对象，原型上的<strong>property</strong>会被忽略。<strong>大概来说，data应该只能是数据，不推荐观察拥有状态行为的对象。</strong></p></blockquote><p>问题：如何在Vue 2中避免响应式？？？？</p><p>在<strong>Vue 3</strong>中，有对应避免深层代理的API，如：<strong>shallowRef、shallowReactive、markRaw</strong>，这种就适用于</p><ul><li><strong>GIS</strong>类对象：<strong>openlayers</strong>、<strong>Cesium</strong>、<strong>mapbox GL</strong>等等</li><li>三维类对象：<strong>threejs</strong>、babylonjs等等</li><li>图形接口对象：<strong>WebGL</strong>、<strong>WebGPU</strong>等等</li><li>任何具备自我行为与复杂内部状态的对象</li></ul><h4 id="_1-2、cesium中共享viewer" tabindex="-1"><a class="header-anchor" href="#_1-2、cesium中共享viewer"><span>1.2、Cesium中共享Viewer</span></a></h4><h5 id="_1-2-1、pinia全局状态管理" tabindex="-1"><a class="header-anchor" href="#_1-2-1、pinia全局状态管理"><span>1.2.1、pinia全局状态管理</span></a></h5><p>Vue 中使用pinia ，可以把核心的 Viewer 对象送入全局状态中，但是要避免 Vue 的响应式劫持，响应式问题可以通过 Vue3 的 <code>shallowRef</code> 或 <code>shallowReactive</code> 来解决：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> shallowRef<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Viewer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;cesium&#39;</span>

<span class="token keyword">const</span> viewerDivRef <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLDivElement<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> viewerRef <span class="token operator">=</span> shallowRef<span class="token operator">&lt;</span>Viewer<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  viewerRef<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Viewer</span><span class="token punctuation">(</span>viewerDivRef<span class="token punctuation">.</span>value <span class="token keyword">as</span> HTMLElement<span class="token punctuation">,</span> <span class="token comment">/* ... */</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者用 <code>shallowReactive</code>：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> shallowReactive<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Viewer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;cesium&#39;</span>

<span class="token keyword">const</span> viewerDivRef <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLDivElement<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> viewerRef <span class="token operator">=</span> shallowReactive<span class="token operator">&lt;</span><span class="token punctuation">{</span>
  <span class="token literal-property property">viewer</span><span class="token operator">:</span> Viewer <span class="token operator">|</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">viewer</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  viewerRef<span class="token punctuation">.</span>viewer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Viewer</span><span class="token punctuation">(</span>viewerDivRef<span class="token punctuation">.</span>value <span class="token keyword">as</span> HTMLElement<span class="token punctuation">,</span> <span class="token comment">/* ... */</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>甚至可以更简单一些：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Viewer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;cesium&#39;</span>

<span class="token keyword">const</span> viewerDivRef <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLDivElement<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> <span class="token literal-property property">viewer</span><span class="token operator">:</span> Viewer <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  viewer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Viewer</span><span class="token punctuation">(</span>viewerDivRef<span class="token punctuation">.</span>value <span class="token keyword">as</span> HTMLElement<span class="token punctuation">,</span> <span class="token comment">/* ... */</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_1-2-2、provide-inject" tabindex="-1"><a class="header-anchor" href="#_1-2-2、provide-inject"><span>1.2.2、<code>provide/inject</code></span></a></h5><p>仅适用于地图组件在最顶层的情况：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token comment">&lt;!-- 顶层组件下发 Viewer --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> provide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Viewer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;cesium&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">CESIUM_VIEWER</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/symbol&#39;</span>

<span class="token keyword">const</span> viewerDivRef <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLDivElement<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> <span class="token literal-property property">viewer</span><span class="token operator">:</span> Viewer <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  viewer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Viewer</span><span class="token punctuation">(</span>viewerDivRef<span class="token punctuation">.</span>value <span class="token keyword">as</span> HTMLElement<span class="token punctuation">,</span> <span class="token comment">/* ... */</span><span class="token punctuation">)</span>
  <span class="token function">provide</span><span class="token punctuation">(</span><span class="token constant">CESIUM_VIEWER</span><span class="token punctuation">,</span> viewer<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 下面是子组件调用 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> type <span class="token punctuation">{</span> Viewer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;cesium&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">CESIUM_VIEWER</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/symbol&#39;</span>

<span class="token keyword">const</span> viewer <span class="token operator">=</span> inject<span class="token operator">&lt;</span>Viewer<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token constant">CESIUM_VIEWER</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_1-2-3、兄弟组件或父子组件传值" tabindex="-1"><a class="header-anchor" href="#_1-2-3、兄弟组件或父子组件传值"><span>1.2.3、兄弟组件或父子组件传值</span></a></h5><ul><li><strong>defineExpose</strong></li><li>层层事件冒泡至父级组件，或者使用全局事件库（如 <strong>mitt</strong>）</li><li>使用全局状态 <strong>pinia</strong> 或 <strong>vuex</strong></li></ul><blockquote><p>关于全局事件库mitt：</p><ul><li><p>安装mitt：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code>npm install mitt <span class="token operator">-</span><span class="token constant">S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>封装mitt：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">//封装mitt</span>
<span class="token keyword">import</span> mitt <span class="token keyword">from</span> <span class="token string">&#39;mitt&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> bus <span class="token operator">=</span> <span class="token function">mitt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> bus<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>按需引入mitt：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">//将实例提交到事件总线</span>
bus<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;toOther&#39;</span><span class="token punctuation">,</span>viewer<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">//监听数据转发</span>
bus<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;toOther&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span>res<span class="token operator">:</span>Viewer<span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	viewerCopy <span class="token operator">=</span> res
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">//移除指定事件</span>
bus<span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">&#39;toOther&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></blockquote><h3 id="_2、效果图" tabindex="-1"><a class="header-anchor" href="#_2、效果图"><span>2、效果图</span></a></h3><figure><img src="`+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',25),c=[o];function l(i,r){return s(),a("div",null,c)}const d=n(p,[["render",l],["__file","12、Cesium实战一：创建地球.html.vue"]]),m=JSON.parse('{"path":"/studyNotes/Cesium%E7%AC%94%E8%AE%B0/12%E3%80%81Cesium%E5%AE%9E%E6%88%98%E4%B8%80%EF%BC%9A%E5%88%9B%E5%BB%BA%E5%9C%B0%E7%90%83.html","title":"12、创建地球","lang":"zh-CN","frontmatter":{"description":"12、创建地球 承接第一节的Cesium加载地球与环境搭建，需要注意几个点： 1、Vue的响应式与地图、三维等复杂状态对象 1.1、如何避免响应式 在Vue 2中，其响应式是通过Object.defineProperty递归实现的，在Vue 2的文档中也明确指出： data是Vue实例的数据对象，Vue会递归地吧data的property转换为gett...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/studyNotes/Cesium%E7%AC%94%E8%AE%B0/12%E3%80%81Cesium%E5%AE%9E%E6%88%98%E4%B8%80%EF%BC%9A%E5%88%9B%E5%BB%BA%E5%9C%B0%E7%90%83.html"}],["meta",{"property":"og:site_name","content":"歪脖祭司"}],["meta",{"property":"og:title","content":"12、创建地球"}],["meta",{"property":"og:description","content":"12、创建地球 承接第一节的Cesium加载地球与环境搭建，需要注意几个点： 1、Vue的响应式与地图、三维等复杂状态对象 1.1、如何避免响应式 在Vue 2中，其响应式是通过Object.defineProperty递归实现的，在Vue 2的文档中也明确指出： data是Vue实例的数据对象，Vue会递归地吧data的property转换为gett..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-23T11:02:41.000Z"}],["meta",{"property":"article:author","content":"祭司唐"}],["meta",{"property":"article:modified_time","content":"2024-03-23T11:02:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"12、创建地球\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-23T11:02:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"祭司唐\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":3,"title":"1、Vue的响应式与地图、三维等复杂状态对象","slug":"_1、vue的响应式与地图、三维等复杂状态对象","link":"#_1、vue的响应式与地图、三维等复杂状态对象","children":[]},{"level":3,"title":"2、效果图","slug":"_2、效果图","link":"#_2、效果图","children":[]}],"git":{"createdTime":1711191761000,"updatedTime":1711191761000,"contributors":[{"name":"tangwenjian","email":"gistwj@163.com","commits":1}]},"readingTime":{"minutes":2.26,"words":678},"filePathRelative":"studyNotes/Cesium笔记/12、Cesium实战一：创建地球.md","localizedDate":"2024年3月23日","excerpt":"\\n<p>承接第一节的Cesium加载地球与环境搭建，需要注意几个点：</p>\\n<h3>1、Vue的响应式与地图、三维等复杂状态对象</h3>\\n<h4>1.1、如何避免响应式</h4>\\n<p>在<strong>Vue 2</strong>中，其响应式是通过Object.defineProperty递归实现的，在Vue 2的文档中也明确指出：</p>\\n<blockquote>\\n<p><strong>data</strong>是<strong>Vue</strong>实例的数据对象，<strong>Vue</strong>会递归地吧<strong>data</strong>的<strong>property</strong>转换为<strong>getter/setter</strong>，从而让<strong>data</strong>的<strong>property</strong>能够响应数据变化。<strong>对象必须是纯粹的对象（含有零个或多个Key/value对）</strong>：浏览器<strong>API</strong>创建的原生对象，原型上的<strong>property</strong>会被忽略。<strong>大概来说，data应该只能是数据，不推荐观察拥有状态行为的对象。</strong></p>\\n</blockquote>","autoDesc":true}');export{d as comp,m as data};
