export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/intro.html", { loader: () => import(/* webpackChunkName: "intro.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/intro.html.js"), meta: {"v":"/assets/images/cover3.jpg","e":"\n<p>将你的个人介绍和档案放置在此处。</p>\n","y":"a","t":"介绍页","i":"circle-info"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/index.html.js"), meta: {"y":"h","t":"主页","i":"home"} }],
  ["/demo/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/demo/index.html.js"), meta: {"c":["代码案例"],"y":"a","t":"代码案例","i":"code"} }],
  ["/studyNotes/Openlayers%E7%AC%94%E8%AE%B0/Openlayers%E7%AC%94%E8%AE%B0.html", { loader: () => import(/* webpackChunkName: "Openlayers笔记.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/studyNotes/Openlayers笔记/Openlayers笔记.html.js"), meta: {"c":["Openlayers"],"e":"\n<h2>一、基础配置</h2>\n<h3>1、准备工作</h3>\n<h4>1.1、安装openlayers</h4>\n<div class=\"language-typescript\" data-ext=\"ts\" data-title=\"ts\"><pre class=\"language-typescript\"><code>npm install ol\n</code></pre></div><h4>1.2、导入ol</h4>\n<div class=\"language-typescript\" data-ext=\"ts\" data-title=\"ts\"><pre class=\"language-typescript\"><code><span class=\"token keyword\">import</span> <span class=\"token string\">'ol/ol.css'</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">// 在main.ts引入地图样式</span>\n<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> ol <span class=\"token keyword\">from</span> <span class=\"token string\">'ol'</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">// 在地图组件页面中一级属性可一次性全部导入</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Map<span class=\"token punctuation\">,</span> View<span class=\"token punctuation\">,</span> Feature <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'ol'</span> <span class=\"token comment\">// 在地图组件页面中一级属性也可按需导入</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Tile <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'ol/layer'</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">// 二级属性必须由ol/xxx(一级属性名)进行按需导入</span>\n</code></pre></div>","y":"a","t":"Openlayers笔记"} }],
  ["/studyNotes/%E5%BC%80%E5%8F%91%E8%BF%87%E7%A8%8B%E9%97%AE%E9%A2%98/050%E3%80%81Cesium%E4%B8%AD%E7%9A%84removeAll().html", { loader: () => import(/* webpackChunkName: "050、Cesium中的removeAll().html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/studyNotes/开发过程问题/050、Cesium中的removeAll().html.js"), meta: {"c":["杂谈","Cesium"],"e":"\n<p>在Cesium中，清除实体Entity的方法主要是在<code>Cesium.viewer.entities</code>实体集合中调用<code>remove()</code>、<code>removeById(id)</code>或<code>removeAll()</code></p>\n<h3>一、remove()方法</h3>\n<p>1、用法</p>\n<p>从集合中删除一个实体。</p>\n<div class=\"language-typescript\" data-ext=\"ts\" data-title=\"ts\"><pre class=\"language-typescript\"><code>viewer<span class=\"token punctuation\">.</span>entities<span class=\"token punctuation\">.</span><span class=\"token function\">remove</span><span class=\"token punctuation\">(</span>entity<span class=\"token punctuation\">)</span>\n</code></pre></div>","y":"a","t":"Cesium中的removeAll"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/404.html.js"), meta: {"y":"p","t":""} }],
  ["/studyNotes/Openlayers%E7%AC%94%E8%AE%B0/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/studyNotes/Openlayers笔记/index.html.js"), meta: {"y":"p","t":"Openlayers笔记"} }],
  ["/studyNotes/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/studyNotes/index.html.js"), meta: {"y":"p","t":"Study Notes"} }],
  ["/studyNotes/%E5%BC%80%E5%8F%91%E8%BF%87%E7%A8%8B%E9%97%AE%E9%A2%98/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/studyNotes/开发过程问题/index.html.js"), meta: {"y":"p","t":"开发过程问题"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/category/index.html.js"), meta: {"y":"p","t":"分类","I":false} }],
  ["/category/%E4%BB%A3%E7%A0%81%E6%A1%88%E4%BE%8B/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/category/代码案例/index.html.js"), meta: {"y":"p","t":"代码案例 分类","I":false} }],
  ["/category/openlayers/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/category/openlayers/index.html.js"), meta: {"y":"p","t":"Openlayers 分类","I":false} }],
  ["/category/%E6%9D%82%E8%B0%88/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/category/杂谈/index.html.js"), meta: {"y":"p","t":"杂谈 分类","I":false} }],
  ["/category/cesium/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/category/cesium/index.html.js"), meta: {"y":"p","t":"Cesium 分类","I":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/tag/index.html.js"), meta: {"y":"p","t":"标签","I":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/article/index.html.js"), meta: {"y":"p","t":"文章","I":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/star/index.html.js"), meta: {"y":"p","t":"星标","I":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"y":"p","t":"时间轴","I":false} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
