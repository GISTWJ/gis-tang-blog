# 14、飞行航线追踪

可视化从旧金山到哥本哈根的真实航班。

1、获取点位数据：[构建飞行跟踪器 – Cesium (cesium.com)](https://cesium.com/learn/cesiumjs-learn/cesiumjs-flight-tracker/)

2、在地图上添加飞行点位：循环遍历点位数据，利用Entity直接添加点至地图上。

```typescript
//添加飞行点位
const addFlightPoint = () => {
  const length = filghtData.length;
  for (let i = 0; i < length; i++) {
    const dataPoint = filghtData[i];
    viewer.entities.add({
      description: `Location:(${dataPoint.longitude},${dataPoint.latitude},${dataPoint.height})`,
      position: Cesium.Cartesian3.fromDegrees(
        dataPoint.longitude, //经度
        dataPoint.latitude, //纬度
        dataPoint.height //高度
      ),
      point: {
        pixelSize: 8, //点尺寸
        color: Cesium.Color.RED, //点颜色
      },
    });
  }
};
```

3、将飞行点位连接起来，并创建飞行移动实体：

- 假设雷达样本采样间隔为30s,设定飞行开始时间，飞行结束时间由飞行开始时间+飞行持续时间计算出来。
- 将开始、结束时间绑定到viewer的时间轴上去，调整时间速率，开启时间动画。
- 利用采样位置属性实例`Cesium.SampledPositionProperty()`，循环遍历将所有点与时间创建成样本实例并利用`addSample()`添加进采样位置属性实例。
- 创建飞机模型实例，绑定时间间隔集合。利用` Cesium.VelocityOrientationProperty()`将飞机实体方向设置为样本一致。
- 创建飞行路线，利用`Cesium.PathGraphics({ width: 3 })`设置线条宽度为3.
- 利用 `viewer.trackedEntity = airPlaneEntity`设置相机视角跟随飞机实体。

```typescript
//将飞行点位连接起来，并创建飞行移动实体
const createFlyLine = () => {
  const length = filghtData.length;
  const timeStepInSeconds = 30; //雷达样本间隔
  const totalSeconds = timeStepInSeconds * (length - 1); //飞行的持续时间
  const start = Cesium.JulianDate.fromIso8601("2022-12-17T23:10:00Z"); //飞行开始时间
  const stop = Cesium.JulianDate.addSeconds(
    start,
    totalSeconds,
    new Cesium.JulianDate()
  ); //通过计算获得飞行结束时间

  viewer.clock.startTime = start; //开始时间
  viewer.clock.stopTime = stop; //停止时间
  viewer.clock.currentTime = start; //当前时间
  viewer.timeline.zoomTo(start, stop); //将视图设置为提供的时间。

  viewer.clock.multiplier = 50; //加快播放速度
  viewer.clock.shouldAnimate = true; //时针向前走
  //创建采样位置属性实例
  const positionProperty = new Cesium.SampledPositionProperty();
  for (let i = 0; i < length; i++) {
    const dataPoint = filghtData[i];
    const time = Cesium.JulianDate.addSeconds(
      start,
      i * timeStepInSeconds,
      new Cesium.JulianDate()
    );
    const position = Cesium.Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    );
    positionProperty.addSample(time, position); //调用addSample方法将样本实例添加进去
  }
  //添加飞机模型
  // const airPlaneUri = Cesium.IonResource.fromAssetId(1980066).then((a)=>{return a});
  // console.log(airPlaneUri);

  const airPlaneEntity = viewer.entities.add({
    //创建时间间隔集合
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: start, stop: stop }), //创建时间间隔
    ]),
    position: positionProperty,
    //添加飞机模型
    model: {
      uri: "../public/GLB/Cesium_Air.glb",
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
    orientation: new Cesium.VelocityOrientationProperty(positionProperty), //设置方向与采样属性一致
    path: new Cesium.PathGraphics({ width: 3 }), //路径图形，并宽度为3
  });
  viewer.trackedEntity = airPlaneEntity; //视角跟随飞机实体
};
```

4、添加三维建筑、地形图层：

```typescript
//添加三维建筑
const loadOSMBuildings = async () => {
  viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(96188, {
      show: true,
    })
  );
};
//添加地形
const addTerrainProvider = async () => {
  viewer.terrainProvider =
    await Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
      "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
      {
        token:
          "KED1aF_I4UzXOHy3BnhwyBHU4l5oY6rO6walkmHoYqGp4XyIWUd5YZUC1ZrLAzvV40pR6gBXQayh0eFA8m6vPg..",
      }
    );
};
```

![](./img/image-20230712192205823.png)

附：完整代码：

```vue
<template>
  <div id="view_container"></div>
</template>
<script setup lang="ts">
import * as Cesium from "cesium";
import "../public/Widgets/widgets.css";
import { onMounted } from "vue";

import filghtData from "../public/JSON/flightData.json";

let viewer: Cesium.Viewer; //地图实例

//中国地图JSON：https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json
//1、加载静态资源
window.CESIUM_BASE_URL = "/";
//2、添加令牌
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYTVhNjE0YS02YWVhLTQxNTAtYWI5NS1jYzUwMzliNmRjYjciLCJpZCI6OTc4NDgsImlhdCI6MTY1NTM4NDM0OH0.aT_4OCAgJ95R0l6Tg--u4jo9Ky6TlFa40p-8OxzYy2M";
//3、设置地图初始默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  73.5, //西经
  4, //南纬
  135.4, //东经
  53.5 //北纬
);
onMounted(async () => {
  //5、创建并初始化viewer实例
  viewer = new Cesium.Viewer("view_container", {
    infoBox: false, //小弹窗
    // animation: false, //左下角动画仪表盘
    baseLayerPicker: false, //右上角图层选择按钮
    geocoder: false, //搜索框
    homeButton: false, //home按钮
    sceneModePicker: false, //模式切换按钮
    // timeline: false, //底部时间轴
    navigationHelpButton: false, //右上角帮助按钮
    fullscreenButton: false, //右下角全屏按钮
    selectionIndicator: false, //选择指示器
  });
  //6、隐藏logo
  (viewer.cesiumWidget.creditContainer as HTMLElement).style.display = "none";
  loadGeoJSON();
  loadCZML();
  addFlightPoint();
  createFlyLine();
  loadOSMBuildings();
  addTerrainProvider();
});

//7、加载GeoJSON数据
const loadGeoJSON = () => {
  // viewer.dataSources.add(Cesium.GeoJsonDataSource.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',{
  //   stroke:Cesium.Color.fromCssColorString('#048dfa'),//折线和多边形轮廓的默认颜色。
  //   fill:Cesium.Color.fromCssColorString('#afd6f0'),//填充颜色#048dfa
  //   strokeWidth:3,//轮廓宽度
  //   markerSymbol:'?',//为每个点创建的地图图钉的默认符号。
  // }));
  //因为加载是Ajax请求，所以可以使用以下方式加载
  Cesium.GeoJsonDataSource.load(
    "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
    {
      stroke: Cesium.Color.fromCssColorString("#048dfa"), //折线和多边形轮廓的默认颜色。
      fill: Cesium.Color.fromCssColorString("#afd6f0"), //填充颜色#048dfa
      strokeWidth: 3, //轮廓宽度
      markerSymbol: "?", //为每个点创建的地图图钉的默认符号。
    }
  ).then((dataSources: Cesium.GeoJsonDataSource) => {
    viewer.dataSources.add(dataSources);
  });
};

//8、加载KML
//9、加载czml
const czml = [
  {
    id: "document",
    name: "box",
    version: "1.0",
  },
  {
    id: "shape1",
    name: "Blue box",
    position: {
      cartographicDegrees: [-114.0, 40.0, 300000.0],
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0],
      },
      material: {
        solidColor: {
          color: {
            rgba: [0, 0, 255, 255],
          },
        },
      },
    },
  },
  {
    id: "shape2",
    name: "Red box with black outline",
    position: {
      cartographicDegrees: [-107.0, 40.0, 300000.0],
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0],
      },
      material: {
        solidColor: {
          color: {
            rgba: [255, 0, 0, 128],
          },
        },
      },
      outline: true,
      outlineColor: {
        rgba: [0, 0, 0, 255],
      },
    },
  },
  {
    id: "shape3",
    name: "Yellow box outline",
    position: {
      cartographicDegrees: [-100.0, 40.0, 300000.0],
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0],
      },
      fill: false,
      outline: true,
      outlineColor: {
        rgba: [255, 255, 0, 255],
      },
    },
  },
];
const loadCZML = () => {
  Cesium.CzmlDataSource.load(czml).then(
    (datasoutcePromise: Cesium.CzmlDataSource) => {
      viewer.dataSources.add(datasoutcePromise);
    }
  );
};
//10、添加飞行点位
const addFlightPoint = () => {
  const length = filghtData.length;
  for (let i = 0; i < length; i++) {
    const dataPoint = filghtData[i];
    viewer.entities.add({
      description: `Location:(${dataPoint.longitude},${dataPoint.latitude},${dataPoint.height})`,
      position: Cesium.Cartesian3.fromDegrees(
        dataPoint.longitude, //经度
        dataPoint.latitude, //纬度
        dataPoint.height //高度
      ),
      point: {
        pixelSize: 8, //点尺寸
        color: Cesium.Color.RED, //点颜色
      },
    });
  }
};
//11、将飞行点位连接起来，并创建飞行移动实体
const createFlyLine = () => {
  const length = filghtData.length;
  const timeStepInSeconds = 30; //雷达样本间隔
  const totalSeconds = timeStepInSeconds * (length - 1); //飞行的持续时间
  const start = Cesium.JulianDate.fromIso8601("2022-12-17T23:10:00Z"); //飞行开始时间
  const stop = Cesium.JulianDate.addSeconds(
    start,
    totalSeconds,
    new Cesium.JulianDate()
  ); //通过计算获得飞行结束时间

  viewer.clock.startTime = start; //开始时间
  viewer.clock.stopTime = stop; //停止时间
  viewer.clock.currentTime = start; //当前时间
  viewer.timeline.zoomTo(start, stop); //将视图设置为提供的时间。

  viewer.clock.multiplier = 50; //加快播放速度
  viewer.clock.shouldAnimate = true; //时针向前走
  //创建采样位置属性实例
  const positionProperty = new Cesium.SampledPositionProperty();
  for (let i = 0; i < length; i++) {
    const dataPoint = filghtData[i];
    const time = Cesium.JulianDate.addSeconds(
      start,
      i * timeStepInSeconds,
      new Cesium.JulianDate()
    );
    const position = Cesium.Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    );
    positionProperty.addSample(time, position); //调用addSample方法将样本实例添加进去
  }
  //添加飞机模型
  // const airPlaneUri = Cesium.IonResource.fromAssetId(1980066).then((a)=>{return a});
  // console.log(airPlaneUri);

  const airPlaneEntity = viewer.entities.add({
    //创建时间间隔集合
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: start, stop: stop }), //创建时间间隔
    ]),
    position: positionProperty,
    //添加飞机模型
    model: {
      uri: "../public/GLB/Cesium_Air.glb",
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
    orientation: new Cesium.VelocityOrientationProperty(positionProperty), //设置方向与采样属性一致
    path: new Cesium.PathGraphics({ width: 3 }), //路径图形，并宽度为3
  });
  viewer.trackedEntity = airPlaneEntity; //视角跟随飞机实体
};
//12、添加三维建筑
const loadOSMBuildings = async () => {
  viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(96188, {
      show: true,
    })
  );
};
//13、添加地形
const addTerrainProvider = async () => {
  viewer.terrainProvider =
    await Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
      "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
      {
        token:
          "KED1aF_I4UzXOHy3BnhwyBHU4l5oY6rO6walkmHoYqGp4XyIWUd5YZUC1ZrLAzvV40pR6gBXQayh0eFA8m6vPg..",
      }
    );
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
*,
#app {
  margin: 0;
  padding: 0;
}
#view_container {
  width: 100vw;
  height: 100vh;
}
</style>
```
