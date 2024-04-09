webgl二维平移

一、引入dat.gui

下载地址：[dataarts/dat.gui：JavaScript 的轻量级控制器库。 --- dataarts/dat.gui: Lightweight controller library for JavaScript. (github.com)](https://github.com/dataarts/dat.gui)

```js
import * as dat from './dat.gui-master/build/dat.gui.module.js'
const gui = new dat.GUI();
```

```js
    let xPosition,
        yPosition;

    //创建X,Y方向滑块
    const creatSlider = () => {
        const xSliderConfig = {
            value: 0,
            min: 0,
            max: canvasWidth,
            label: 'X'
        }
        const ySliderConfig = {
            value: 0,
            min: 0,
            max: canvasHeight,
            label: 'Y'
        }
        const xSlider = gui.add(xSliderConfig, 'value', xSliderConfig.min, xSliderConfig.max, xSliderConfig.step).name(xSliderConfig.label);
        const ySlider = gui.add(ySliderConfig, 'value', ySliderConfig.min, ySliderConfig.max, ySliderConfig.step).name(ySliderConfig.label);
        xSlider.onChange((value) => {
            console.log(value);
            xPosition = value;
            updatePosition(0, value);//更新X位置
        })
        ySlider.onChange((value) => {
            console.log(value);
            yPosition = value;
            updatePosition(1, value);//更新Y位置
        })
        const updateSliderValues = (xValue, yValue) => {
            xSliderConfig.value = xValue;
            ySliderConfig.value = yValue;
            gui.updateDisplay();
            console.log(xSliderConfig);
        }
    }
```

```html [index.html]
<style>
  h2 {
    color: red;
  }
</style>

<div>
  <h2>这是一个 Demo</h2>
  <button id="btn">点击 0</button>
</div>

<script>
  let num = 1
  const btn = document.querySelector('#btn')
  btn.addEventListener('click', e => {
    btn.innerHTML = '点击 ' + num++
  })
</script>
```