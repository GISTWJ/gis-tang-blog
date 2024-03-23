# 15、轨迹追踪

需求：锁定当前最终要素视角居中，展示轨迹动画，数据采用随机数据模拟经纬度。轨迹追踪可以理解为：一个物体沿着设定的轨迹进行移动，并将移动的路径绘制出来

<img src="./img/003-1709200022437.gif" alt="003" style="zoom: 67%;" />

一、添加指定路径

二、时刻与位置绑定，创建采样位置属性对象

三、添加模型与运动轨迹

四、完整代码：

```vue
<!--
 * @Author: twj
 * @Date: 2024-01-25 10:48:06
 * @LastEditTime: 2024-02-29 17:21:59
 * @LastEditors: twj
 * @Description: 轨迹回放
-->
<template>
  <div id="viewContainer"></div>
</template>

<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted } from "vue";

// import liechejiantou from "./lichejiantou"

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYTVhNjE0YS02YWVhLTQxNTAtYWI5NS1jYzUwMzliNmRjYjciLCJpZCI6OTc4NDgsImlhdCI6MTY1NTM4NDM0OH0.aT_4OCAgJ95R0l6Tg--u4jo9Ky6TlFa40p-8OxzYy2M";

let viewer: Cesium.Viewer;
// 静态轨迹坐标经纬度

let lnglatArr = [
  [121.527589, 38.957547],
  [121.527825, 38.960166],
  [121.536472, 38.959098],
  [121.540442, 38.958464],
  [121.543489, 38.958131],
  [121.542888, 38.955861],
  [121.542266, 38.953325],
];
let timeObj: { timeSum: number; siteTime: number[] };
let starTime: Cesium.JulianDate;
let stopTime: Cesium.JulianDate;
// 初始化地图
const initMap = () => {
  viewer = new Cesium.Viewer("viewContainer", {
    infoBox: false,
    baseLayerPicker: false, //右上角图层选择按钮
    geocoder: false, //搜索框
    homeButton: false, //home按钮
    sceneModePicker: true, //模式切换按钮
    navigationHelpButton: false, //右上角帮助按钮
    fullscreenButton: false, //右下角全屏按钮
    // terrainProvider: await Cesium.createWorldTerrainAsync(),
  });
};

//设置时间轴开始与结束时间
const setTimeline = () => {
  timeObj = timeBetweenTwoPoints(lnglatArr, 50);
  starTime = Cesium.JulianDate.fromDate(new Date());
  stopTime = Cesium.JulianDate.addSeconds(
    starTime,
    timeObj.timeSum,
    new Cesium.JulianDate()
  );
  viewer.clock.startTime = starTime.clone();
  viewer.clock.stopTime = stopTime.clone();
  viewer.clock.currentTime = starTime.clone();
};
//计算两点之间的耗时
const timeBetweenTwoPoints = (lnglatArr: number[][], speed: number) => {
  const positionsArr = coordinateConversion(lnglatArr);
  let timeSum: number = 0; //时间累计总和
  let times: number[] = [];
  for (let i = 0; i < positionsArr.length; i++) {
    if (i === 0) {
      times.push(timeSum);
      continue;
    }
    timeSum +=
      distanceBetweenTwoPoints(positionsArr[i - 1], positionsArr[i]) / speed;
    times.push(timeSum);
  }
  return {
    timeSum,
    siteTime: times,
  };
};
//经纬度转笛卡尔3
const coordinateConversion = (lnglatArr: number[][]) => {
  const positionsArr = lnglatArr.map((item) => {
    return Cesium.Cartesian3.fromDegrees(item[0], item[1], 0.5);
  });
  return positionsArr;
};
//计算两点之间测地线距离
const distanceBetweenTwoPoints = (
  positionsOne: Cesium.Cartesian3,
  positionsTwo: Cesium.Cartesian3
): number => {
  let distance: number;
  const pointOneCartographic = Cesium.Cartographic.fromCartesian(positionsOne);
  const pointTwoCartographic = Cesium.Cartographic.fromCartesian(positionsTwo);
  const geodesic = new Cesium.EllipsoidGeodesic();
  geodesic.setEndPoints(pointOneCartographic, pointTwoCartographic);
  distance = Math.sqrt(
    Math.pow(geodesic.surfaceDistance, 2) +
      Math.pow(pointTwoCartographic.height - pointOneCartographic.height, 2)
  );

  return +distance.toFixed(2);
};
//创建对于样本属性数据
const createdProperty = (
  lnglatArr: number[][]
): Cesium.SampledPositionProperty => {
  const positionsArr = coordinateConversion(lnglatArr);
  const property = new Cesium.SampledPositionProperty();
  for (let i = 0; i < positionsArr.length; i++) {
    const time = Cesium.JulianDate.addSeconds(
      starTime,
      timeObj.siteTime[i],
      new Cesium.JulianDate()
    );
    property.addSample(time, positionsArr[i]);
  }

  return property;
};
const craetedEintiyTrack = () => {
  const property = createdProperty(lnglatArr);
  const trackEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({
        start: starTime,
        stop: stopTime,
      }),
    ]),
    position: property,
    orientation: new Cesium.VelocityOrientationProperty(property),
    model: {
      uri: "/public/Cesium_Air.glb",
      maximumScale:268,
    },
    path: {
      resolution: 1,
      width: 5,
      material: Cesium.Color.RED,
    },
  });
  viewer.trackedEntity = trackEntity;
};
onMounted(() => {
  initMap();
  setTimeline();
  craetedEintiyTrack();
});
</script>
<style scoped>
#viewContainer {
  height: calc(100vh - 100px);
  width: calc(100vw - 260px);
}
</style>
```



