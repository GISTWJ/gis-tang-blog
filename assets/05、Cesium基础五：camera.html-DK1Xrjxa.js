import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-DVIbrNyI.js";const p="/assets/image-20230710122807072-C3vT1Uvg.png",e={},o=t(`<h1 id="_05、camera" tabindex="-1"><a class="header-anchor" href="#_05、camera"><span>05、camera</span></a></h1><p>相机由位置、方向和视锥体定义。</p><h3 id="_1、相机位置" tabindex="-1"><a class="header-anchor" href="#_1、相机位置"><span>1、相机位置</span></a></h3><p><strong>Cesium</strong>中的相机位置通过<strong>destination</strong>来确定，<strong>position</strong>指的是相机位置的三维坐标（可以用经纬度和大地高表达，也可以用笛卡尔坐标来表达），让相机飞到对应的位置：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//天安门经纬度转笛卡尔坐标</span>
<span class="token keyword">const</span> position <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">116.390512</span><span class="token punctuation">,</span><span class="token number">39.913574</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">setView</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">destination</span><span class="token operator">:</span> position<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、相机方向" tabindex="-1"><a class="header-anchor" href="#_2、相机方向"><span>2、相机方向</span></a></h3><p>通过<strong>orientation</strong>来确定相机的方向，其设定原理和<strong>右手笛卡尔坐标系</strong>原理相同，有两种表达方法。</p><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_2-1、heading、pitch、roll三参数" tabindex="-1"><a class="header-anchor" href="#_2-1、heading、pitch、roll三参数"><span>2.1、heading、pitch、roll三参数</span></a></h4><ul><li><strong>heading</strong>: 偏航角，xy平面绕z轴旋转，默认方向为正北（0°），正角度为向东旋转。</li><li><strong>pitch</strong>: 俯仰角，yz平面绕x轴旋转，默认角度为-90°，即朝向地面，0°为平视，正角度为仰视，负角度为俯视，即抬头低头。</li><li><strong>roll</strong>: 翻转角，xz平面绕y轴旋转，默认角度为0°，正角度向右旋转，负角度向左旋转，即左右歪头。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//确定相机位置</span>
<span class="token keyword">var</span> position <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">86.889</span><span class="token punctuation">,</span> <span class="token number">27.991</span><span class="token punctuation">,</span> <span class="token number">4000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//飞到相机位置并确定相机姿态</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">destination</span><span class="token operator">:</span> position<span class="token punctuation">,</span>
    <span class="token literal-property property">orientation</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">heading</span><span class="token operator">:</span>Cesium<span class="token punctuation">.</span>Math<span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//正北</span>
        <span class="token literal-property property">pitch</span><span class="token operator">:</span>Cesium<span class="token punctuation">.</span>Math<span class="token punctuation">.</span><span class="token function">toDegrees</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//平视</span>
        <span class="token literal-property property">roll</span><span class="token operator">:</span> <span class="token number">0.0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2、direction、up两个参数" tabindex="-1"><a class="header-anchor" href="#_2-2、direction、up两个参数"><span>2.2、direction、up两个参数</span></a></h4><ul><li><strong>direction</strong>：表示相机视线方向相对于世界坐标的单位向量。</li><li><strong>up</strong>：表示相机的up方向的单位向量。</li></ul><p>这两个参数就确定了相机的局部坐标系方向</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//确定相机位置</span>
<span class="token keyword">var</span> position <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">86.889</span><span class="token punctuation">,</span> <span class="token number">27.991</span><span class="token punctuation">,</span> <span class="token number">4000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//飞到相机位置并确定相机姿态</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">destination</span><span class="token operator">:</span> position<span class="token punctuation">,</span>
    <span class="token literal-property property">orientation</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">direction</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium<span class="token punctuation">.</span>Cartesian3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.042312</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.201232</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.978629</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//相机视线方向单位向量</span>
        <span class="token literal-property property">up</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium<span class="token punctuation">.</span>Cartesian3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.479345</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.855321</span><span class="token punctuation">,</span> <span class="token number">0.1966022</span><span class="token punctuation">)</span>         <span class="token comment">//相机的up方向单位向量</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、相机控制方法" tabindex="-1"><a class="header-anchor" href="#_3、相机控制方法"><span>3、相机控制方法</span></a></h3><h4 id="_3-1、setview" tabindex="-1"><a class="header-anchor" href="#_3-1、setview"><span>3.1、setView()</span></a></h4><p>setView通过定义相机飞行目的点的三维坐标（经纬度和大地高）和视线方向，将视角直接切换到所设定的视域范围内，<strong>没有空中飞行的过程，适合快速切换视角</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">//设定相机</span>
<span class="token keyword">var</span> position <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">86.889</span><span class="token punctuation">,</span> <span class="token number">27.991</span><span class="token punctuation">,</span> <span class="token number">4000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//相机聚焦位置并确定相机姿态</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">setView</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    destination<span class="token operator">:</span> position<span class="token punctuation">,</span>
    orientation<span class="token operator">:</span><span class="token punctuation">{</span>
        heading<span class="token operator">:</span>Cesium<span class="token punctuation">.</span>Math<span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//正北</span>
        pitch<span class="token operator">:</span>Cesium<span class="token punctuation">.</span>Math<span class="token punctuation">.</span><span class="token function">toDegrees</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//平视</span>
        roll<span class="token operator">:</span> <span class="token number">0.0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2、flyto" tabindex="-1"><a class="header-anchor" href="#_3-2、flyto"><span>3.2、flyTo()</span></a></h4><p>**flyTo则是有相机空中飞行的过程，**可以设置飞行时间。</p><ul><li><p><strong>基础用法</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">// 1. 确定相机位置，角度默认</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    destination <span class="token operator">:</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">117.16</span><span class="token punctuation">,</span> <span class="token number">32.71</span><span class="token punctuation">,</span> <span class="token number">15000.0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2.确定相机角度和位置</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    destination <span class="token operator">:</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">122.19</span><span class="token punctuation">,</span> <span class="token number">46.25</span><span class="token punctuation">,</span> <span class="token number">5000.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    orientation <span class="token operator">:</span> <span class="token punctuation">{</span>
        heading <span class="token operator">:</span> Cesium<span class="token punctuation">.</span>Math<span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span><span class="token number">175.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        pitch <span class="token operator">:</span> Cesium<span class="token punctuation">.</span>Math<span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">35.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        roll <span class="token operator">:</span> <span class="token number">0.0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 3.类似于fitbounds函数</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    destination <span class="token operator">:</span> Cesium<span class="token punctuation">.</span>Rectangle<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span>west<span class="token punctuation">,</span> south<span class="token punctuation">,</span> east<span class="token punctuation">,</span> north<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 4.用单位向量表示的相机角度</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    destination <span class="token operator">:</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">122.19</span><span class="token punctuation">,</span> <span class="token number">46.25</span><span class="token punctuation">,</span> <span class="token number">5000.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    orientation <span class="token operator">:</span> <span class="token punctuation">{</span>
        direction <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.04231243104240401</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.20123236049443421</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.97862924300734</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        up <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.47934589305293746</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.8553216253114552</span><span class="token punctuation">,</span> <span class="token number">0.1966022179118339</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>运动效果</strong></p><p><strong>easingFunction</strong>设置运动效果，类别见https://cesium.com/learn/cesiumjs/ref-doc/EasingFunction.html?classFilter=easingFunction</p><p><strong>duration</strong>设置运动时间</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">// flyTo using QUADRATIC_IN_OUT easing function</span>
viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  destination <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3961951.575572026</span><span class="token punctuation">,</span> <span class="token number">3346492.0945766014</span><span class="token punctuation">,</span> <span class="token number">3702340.5336036095</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  orientation <span class="token operator">:</span> <span class="token punctuation">{</span>
      direction <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token number">0.8982074415844437</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.4393530288745287</span><span class="token punctuation">,</span> <span class="token number">0.013867512433959908</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      up <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token number">0.12793638617798253</span><span class="token punctuation">,</span> <span class="token number">0.29147314437764565</span><span class="token punctuation">,</span> <span class="token number">0.9479850669701113</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token function-variable function">complete</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">flyTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        destination <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2304817.2435183465</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3639113.128132953</span><span class="token punctuation">,</span> <span class="token number">4688495.013644141</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        orientation <span class="token operator">:</span> <span class="token punctuation">{</span>
            direction <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token number">0.3760550186878076</span><span class="token punctuation">,</span> <span class="token number">0.9007147395506565</span><span class="token punctuation">,</span> <span class="token number">0.21747547189489164</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            up <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cesium</span><span class="token punctuation">.</span><span class="token function">Cartesian3</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.20364591529594356</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.14862471084230877</span><span class="token punctuation">,</span> <span class="token number">0.9676978022659334</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        easingFunction<span class="token operator">:</span> Cesium<span class="token punctuation">.</span>EasingFunction<span class="token punctuation">.</span><span class="token constant">QUADRATIC_IN_OUT</span><span class="token punctuation">,</span>
        duration<span class="token operator">:</span> <span class="token number">5</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,22),c=[o];function i(l,u){return s(),a("div",null,c)}const d=n(e,[["render",i],["__file","05、Cesium基础五：camera.html.vue"]]),m=JSON.parse('{"path":"/studyNotes/Cesium%E7%AC%94%E8%AE%B0/05%E3%80%81Cesium%E5%9F%BA%E7%A1%80%E4%BA%94%EF%BC%9Acamera.html","title":"05、camera","lang":"zh-CN","frontmatter":{"description":"05、camera 相机由位置、方向和视锥体定义。 1、相机位置 Cesium中的相机位置通过destination来确定，position指的是相机位置的三维坐标（可以用经纬度和大地高表达，也可以用笛卡尔坐标来表达），让相机飞到对应的位置： 2、相机方向 通过orientation来确定相机的方向，其设定原理和右手笛卡尔坐标系原理相同，有两种表达方法...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/studyNotes/Cesium%E7%AC%94%E8%AE%B0/05%E3%80%81Cesium%E5%9F%BA%E7%A1%80%E4%BA%94%EF%BC%9Acamera.html"}],["meta",{"property":"og:site_name","content":"歪脖祭司"}],["meta",{"property":"og:title","content":"05、camera"}],["meta",{"property":"og:description","content":"05、camera 相机由位置、方向和视锥体定义。 1、相机位置 Cesium中的相机位置通过destination来确定，position指的是相机位置的三维坐标（可以用经纬度和大地高表达，也可以用笛卡尔坐标来表达），让相机飞到对应的位置： 2、相机方向 通过orientation来确定相机的方向，其设定原理和右手笛卡尔坐标系原理相同，有两种表达方法..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-23T11:02:41.000Z"}],["meta",{"property":"article:author","content":"祭司唐"}],["meta",{"property":"article:modified_time","content":"2024-03-23T11:02:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"05、camera\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-23T11:02:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"祭司唐\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":3,"title":"1、相机位置","slug":"_1、相机位置","link":"#_1、相机位置","children":[]},{"level":3,"title":"2、相机方向","slug":"_2、相机方向","link":"#_2、相机方向","children":[]},{"level":3,"title":"3、相机控制方法","slug":"_3、相机控制方法","link":"#_3、相机控制方法","children":[]}],"git":{"createdTime":1711191761000,"updatedTime":1711191761000,"contributors":[{"name":"tangwenjian","email":"gistwj@163.com","commits":1}]},"readingTime":{"minutes":2.51,"words":753},"filePathRelative":"studyNotes/Cesium笔记/05、Cesium基础五：camera.md","localizedDate":"2024年3月23日","excerpt":"\\n<p>相机由位置、方向和视锥体定义。</p>\\n<h3>1、相机位置</h3>\\n<p><strong>Cesium</strong>中的相机位置通过<strong>destination</strong>来确定，<strong>position</strong>指的是相机位置的三维坐标（可以用经纬度和大地高表达，也可以用笛卡尔坐标来表达），让相机飞到对应的位置：</p>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\" data-title=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token comment\\">//天安门经纬度转笛卡尔坐标</span>\\n<span class=\\"token keyword\\">const</span> position <span class=\\"token operator\\">=</span> Cesium<span class=\\"token punctuation\\">.</span>Cartesian3<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">fromDegrees</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">116.390512</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">39.913574</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nviewer<span class=\\"token punctuation\\">.</span>camera<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setView</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token literal-property property\\">destination</span><span class=\\"token operator\\">:</span> position<span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,m as data};
