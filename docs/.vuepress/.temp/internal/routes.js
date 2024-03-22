export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/intro.html", { loader: () => import(/* webpackChunkName: "intro.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/intro.html.js"), meta: {"v":"/assets/images/cover3.jpg","e":"\n<p>将你的个人介绍和档案放置在此处。</p>\n","y":"a","t":"介绍页","i":"circle-info"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/index.html.js"), meta: {"y":"h","t":"主页","i":"home"} }],
  ["/demo/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/demo/index.html.js"), meta: {"c":["代码案例"],"y":"a","t":"代码案例","i":"laptop-code"} }],
  ["/posts/apple/050%E3%80%81Cesium%E4%B8%AD%E7%9A%84removeAll().html", { loader: () => import(/* webpackChunkName: "050、Cesium中的removeAll().html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/posts/apple/050、Cesium中的removeAll().html.js"), meta: {"e":"\n<p>在Cesium中，清除实体Entity的方法主要是在<code>Cesium.viewer.entities</code>实体集合中调用<code>remove()</code>、<code>removeById(id)</code>或<code>removeAll()</code></p>\n<h3>一、remove()方法</h3>\n<p>1、用法</p>\n<p>从集合中删除一个实体。</p>\n<div class=\"language-typescript\" data-ext=\"ts\" data-title=\"ts\"><pre class=\"language-typescript\"><code>viewer<span class=\"token punctuation\">.</span>entities<span class=\"token punctuation\">.</span><span class=\"token function\">remove</span><span class=\"token punctuation\">(</span>entity<span class=\"token punctuation\">)</span>\n</code></pre></div>","y":"a","t":"Cesium中的removeAll"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/404.html.js"), meta: {"y":"p","t":""} }],
  ["/posts/apple/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/posts/apple/index.html.js"), meta: {"y":"p","t":"Apple"} }],
  ["/posts/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/posts/index.html.js"), meta: {"y":"p","t":"Posts"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/category/index.html.js"), meta: {"y":"p","t":"分类","I":false} }],
  ["/category/%E4%BB%A3%E7%A0%81%E6%A1%88%E4%BE%8B/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/gitee/gistwj.github.io/docs/.vuepress/.temp/pages/category/代码案例/index.html.js"), meta: {"y":"p","t":"代码案例 分类","I":false} }],
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
