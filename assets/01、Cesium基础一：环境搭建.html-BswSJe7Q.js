import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as p,c,a as n,d as s,b as o,e as a}from"./app-DVIbrNyI.js";const l="/assets/image-20230705115254785-rPnos3YH.png",u="/assets/image-20230705135743030-edEWAMZb.png",r="/assets/image-20230705145454188-Ev0hCtNH.png",d="/assets/image-20230705143434341-joMM6chn.png",m={},v=a(`<h1 id="_01、cesium加载地球与环境搭建" tabindex="-1"><a class="header-anchor" href="#_01、cesium加载地球与环境搭建"><span>01、cesium加载地球与环境搭建</span></a></h1><h3 id="_1、搭建vue3项目" tabindex="-1"><a class="header-anchor" href="#_1、搭建vue3项目"><span>1、搭建vue3项目</span></a></h3><p>使用vite进行搭建。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>npm init vite@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据操作提示选择：vue 3 + Typescript</p><h3 id="_2、下载cesium库" tabindex="-1"><a class="header-anchor" href="#_2、下载cesium库"><span>2、下载cesium库</span></a></h3><p>终端输入：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>npm install cesium
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、创建cesium地图容器" tabindex="-1"><a class="header-anchor" href="#_3、创建cesium地图容器"><span>3、创建cesium地图容器</span></a></h3><div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>view_container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、导入cesium" tabindex="-1"><a class="header-anchor" href="#_4、导入cesium"><span>4、导入cesium</span></a></h3><h4 id="_4-1、复制cesium资源至public文件夹" tabindex="-1"><a class="header-anchor" href="#_4-1、复制cesium资源至public文件夹"><span>4.1、复制cesium资源至public文件夹</span></a></h4><figure><img src="`+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-2、在组件中导入cesium模块与样式" tabindex="-1"><a class="header-anchor" href="#_4-2、在组件中导入cesium模块与样式"><span>4.2、在组件中导入cesium模块与样式</span></a></h4><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Cesium <span class="token keyword">from</span> <span class="token string">&quot;cesium&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&quot;../public/Widgets/widgets.css&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意</p><ol><li><p>如果报错：<code>无法找到&#39;cesium&#39;模块声明</code>。可以在**.d.ts声明文件**中创建声明：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;cesium&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>引入样式文件时，编辑器是没有提示的，具体原因可能和public文件夹有关。</p></li></ol></blockquote><h3 id="_5、导入生命周期钩子" tabindex="-1"><a class="header-anchor" href="#_5、导入生命周期钩子"><span>5、导入生命周期钩子</span></a></h3><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、创建cesium地图容器" tabindex="-1"><a class="header-anchor" href="#_6、创建cesium地图容器"><span>6、创建cesium地图容器</span></a></h3><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> viewer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Viewer</span><span class="token punctuation">(</span><span class="token string">&quot;view_container&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意</p><p>如果报错：<code>变量声明未使用</code>。可以在tsconfig.json文件中修改：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token string-property property">&quot;noUnusedLocals&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//开启时声明的变量未使用会报警告</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><h3 id="_7、添加cesium-base-url" tabindex="-1"><a class="header-anchor" href="#_7、添加cesium-base-url"><span>7、添加CESIUM_BASE_URL</span></a></h3><p>添加cesium静态资源</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token punctuation">(</span>window <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token constant">CESIUM_BASE_URL</span><span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>注意</p><p>不考虑<strong>Typescript</strong>的情况下，应该为：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code>window<span class="token punctuation">.</span><span class="token constant">CESIUM_BASE_URL</span> <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是在<strong>Typescript</strong>中会报错：<code>“Window &amp; typeof globalThis”上不存在属性“CESIUM_BASE_URL”</code></p><p>有两种解决方案：</p><ol><li><p>在**.d.ts声明文件<strong>中对</strong>window**对象进行声明：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">interface</span> <span class="token class-name">Window</span> <span class="token punctuation">{</span>
  <span class="token constant">CESIUM_BASE_URL</span><span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>对<strong>window</strong>进行类型断言为<strong>any</strong>类型：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token punctuation">(</span>window <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token constant">CESIUM_BASE_URL</span><span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol></blockquote><h3 id="_8、设置地图容器宽高" tabindex="-1"><a class="header-anchor" href="#_8、设置地图容器宽高"><span>8、设置地图容器宽高</span></a></h3><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">&lt;style&gt;
html , body</span> <span class="token punctuation">{</span> 
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> 
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> 
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> 
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> 
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
<span class="token selector">*,
#app</span><span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#view_container</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、启动项目、预览" tabindex="-1"><a class="header-anchor" href="#_9、启动项目、预览"><span>9、启动项目、预览</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>npm run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>效果：</p><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_10、cesium基础设置" tabindex="-1"><a class="header-anchor" href="#_10、cesium基础设置"><span>10、cesium基础设置</span></a></h3><h4 id="_10-1、cesium-token" tabindex="-1"><a class="header-anchor" href="#_10-1、cesium-token"><span>10.1、cesium token</span></a></h4>',33),k={href:"https://ion.cesium.com/",target:"_blank",rel:"noopener noreferrer"},g=a(`<p>在代码中添加令牌：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code>Cesium<span class="token punctuation">.</span>Ion<span class="token punctuation">.</span>defaultAccessToken<span class="token operator">=</span><span class="token string">&#39;your token&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_10-2、隐藏logo" tabindex="-1"><a class="header-anchor" href="#_10-2、隐藏logo"><span>10.2、隐藏logo</span></a></h4><p>通过后台查看元素和API可以发现，将<strong>viewer</strong>上的小部件设置为隐藏即可。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token punctuation">(</span>viewer<span class="token punctuation">.</span>cesiumWidget<span class="token punctuation">.</span>creditContainer <span class="token keyword">as</span> HTMLElement<span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要进行类型断言。</p><h4 id="_10-3、设置默认视角" tabindex="-1"><a class="header-anchor" href="#_10-3、设置默认视角"><span>10.3、设置默认视角</span></a></h4><p>通过设置 <code>Cesium.Camera.DEFAULT_VIEW_RECTANGLE : Rectangle</code>来进行默认视角调整。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">//其中Rectangle是矩形范围，指定为经度和纬度坐标的二维区域</span>
Cesium<span class="token punctuation">.</span>Camera<span class="token punctuation">.</span><span class="token constant">DEFAULT_VIEW_RECTANGLE</span><span class="token operator">=</span>Cesium<span class="token punctuation">.</span>Rectangle<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span>
	<span class="token number">73.5</span><span class="token punctuation">,</span><span class="token comment">//西经</span>
	<span class="token number">4</span><span class="token punctuation">,</span><span class="token comment">//南纬</span>
	<span class="token number">135.4</span><span class="token punctuation">,</span><span class="token comment">//东经</span>
	<span class="token number">53.5</span><span class="token comment">//北纬</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中:</p><p><code>Cesium.Rectangle.fromDegrees(west, south, east, north, result) → Rectangle</code></p><p>在给定边界经度和纬度（以度为单位）的情况下创建一个矩形。</p><figure><img src="`+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_10-4、infobox报错" tabindex="-1"><a class="header-anchor" href="#_10-4、infobox报错"><span>10.4、infobox报错</span></a></h4><figure><img src="'+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>解决方法：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code> <span class="token keyword">const</span> viewer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Viewer</span><span class="token punctuation">(</span><span class="token string">&quot;view_container&quot;</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
   infoBox<span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function h(b,_){const e=i("ExternalLinkIcon");return p(),c("div",null,[v,n("p",null,[s("访问网址："),n("a",k,[s("Stories | Cesium ion"),o(e)]),s("获取令牌。")]),g])}const E=t(m,[["render",h],["__file","01、Cesium基础一：环境搭建.html.vue"]]),x=JSON.parse(`{"path":"/studyNotes/Cesium%E7%AC%94%E8%AE%B0/01%E3%80%81Cesium%E5%9F%BA%E7%A1%80%E4%B8%80%EF%BC%9A%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.html","title":"01、cesium加载地球与环境搭建","lang":"zh-CN","frontmatter":{"category":["Cesium"],"description":"01、cesium加载地球与环境搭建 1、搭建vue3项目 使用vite进行搭建。 根据操作提示选择：vue 3 + Typescript 2、下载cesium库 终端输入： 3、创建cesium地图容器 4、导入cesium 4.1、复制cesium资源至public文件夹 4.2、在组件中导入cesium模块与样式 注意 如果报错：无法找到'ces...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/studyNotes/Cesium%E7%AC%94%E8%AE%B0/01%E3%80%81Cesium%E5%9F%BA%E7%A1%80%E4%B8%80%EF%BC%9A%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.html"}],["meta",{"property":"og:site_name","content":"歪脖祭司"}],["meta",{"property":"og:title","content":"01、cesium加载地球与环境搭建"}],["meta",{"property":"og:description","content":"01、cesium加载地球与环境搭建 1、搭建vue3项目 使用vite进行搭建。 根据操作提示选择：vue 3 + Typescript 2、下载cesium库 终端输入： 3、创建cesium地图容器 4、导入cesium 4.1、复制cesium资源至public文件夹 4.2、在组件中导入cesium模块与样式 注意 如果报错：无法找到'ces..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-23T11:02:41.000Z"}],["meta",{"property":"article:author","content":"祭司唐"}],["meta",{"property":"article:modified_time","content":"2024-03-23T11:02:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"01、cesium加载地球与环境搭建\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-23T11:02:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"祭司唐\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":3,"title":"1、搭建vue3项目","slug":"_1、搭建vue3项目","link":"#_1、搭建vue3项目","children":[]},{"level":3,"title":"2、下载cesium库","slug":"_2、下载cesium库","link":"#_2、下载cesium库","children":[]},{"level":3,"title":"3、创建cesium地图容器","slug":"_3、创建cesium地图容器","link":"#_3、创建cesium地图容器","children":[]},{"level":3,"title":"4、导入cesium","slug":"_4、导入cesium","link":"#_4、导入cesium","children":[]},{"level":3,"title":"5、导入生命周期钩子","slug":"_5、导入生命周期钩子","link":"#_5、导入生命周期钩子","children":[]},{"level":3,"title":"6、创建cesium地图容器","slug":"_6、创建cesium地图容器","link":"#_6、创建cesium地图容器","children":[]},{"level":3,"title":"7、添加CESIUM_BASE_URL","slug":"_7、添加cesium-base-url","link":"#_7、添加cesium-base-url","children":[]},{"level":3,"title":"8、设置地图容器宽高","slug":"_8、设置地图容器宽高","link":"#_8、设置地图容器宽高","children":[]},{"level":3,"title":"9、启动项目、预览","slug":"_9、启动项目、预览","link":"#_9、启动项目、预览","children":[]},{"level":3,"title":"10、cesium基础设置","slug":"_10、cesium基础设置","link":"#_10、cesium基础设置","children":[]}],"git":{"createdTime":1711191761000,"updatedTime":1711191761000,"contributors":[{"name":"tangwenjian","email":"gistwj@163.com","commits":1}]},"readingTime":{"minutes":1.95,"words":586},"filePathRelative":"studyNotes/Cesium笔记/01、Cesium基础一：环境搭建.md","localizedDate":"2024年3月23日","excerpt":"\\n<h3>1、搭建vue3项目</h3>\\n<p>使用vite进行搭建。</p>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\" data-title=\\"js\\"><pre class=\\"language-javascript\\"><code>npm init vite@latest\\n</code></pre></div><p>根据操作提示选择：vue 3 + Typescript</p>\\n<h3>2、下载cesium库</h3>\\n<p>终端输入：</p>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\" data-title=\\"js\\"><pre class=\\"language-javascript\\"><code>npm install cesium\\n</code></pre></div>","autoDesc":true}`);export{E as comp,x as data};
