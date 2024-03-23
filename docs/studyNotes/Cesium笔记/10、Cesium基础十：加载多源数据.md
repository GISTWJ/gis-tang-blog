# 10、Cesium加载多源数据

### 1、GeoJSON

调用`Cesium.GeoJsonDataSource()`:处理**GeoJSON**和**TopoJSON**数据的数据源。

1. 第一种加载方式：

   ```
   const loadGeoJSON = () => {
     viewer.dataSources.add(
       Cesium.GeoJsonDataSource.load(
          "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
          {
            stroke: Cesium.Color.fromCssColorString("#048dfa"), //折线和多边形轮廓的默认颜色。
            fill: Cesium.Color.fromCssColorString("#afd6f0"), //填充颜色#048dfa
            strokeWidth: 3, //轮廓宽度
            markerSymbol: "?", //为每个点创建的地图图钉的默认符号。
          }
        )
      );
   };
   ```

2. 第二种加载方式：

   ```typescript
   const loadGeoJSON = ()=>{
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
   ```

   

### 2、KML

调用`Cesium.KmlDataSource()`:处理KML的数据源。与 `Cesium.GeoJsonDataSource()`类似。

### 3、CZML

#### 3.1、[CZML标准](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide)

CZML 是一种**用于描述时间动态图形场景的 JSON 格式**，主要用于在运行 Cesium 的 Web 浏览器中显示。它描述了线、点、广告牌、模型和其他图形基元，并指定了它们如何随时间变化。虽然 Cesium 具有丰富的客户端 API，但 CZML 允许它是数据驱动的，以便通用 Cesium 查看器可以显示丰富的场景，而无需任何自定义代码。在许多方面，Cesium和CZML之间的关系类似于谷歌地球和KML之间的关系。CZML 和 KML 都是用于描述各自客户端中的场景的数据格式，旨在由各种应用程序生成，甚至可能手写。两者都意味着与客户端充分无关，以便其他兼容的客户端可以渲染其中描述的场景。CZML具有许多重要特征，其中一些特征将其与KML区分开来：

- CZML基于**JSON**。
- CZML 可以准确地描述**随时间变化**值的属性。例如，一条线可以在一个时间间隔内为红色，在另一个时间间隔内为蓝色。客户还应该能够在带时间标记的样本上进行插值。如果指定了两次车辆的位置，则客户端可以使用 CZML 指定的**插值算法**准确显示这两次之间的车辆位置。每个属性都是时间动态的。
- CZML 的结构用于向客户端进行高效的增量流式传输。在显示场景之前，客户端上不需要存在整个文档。在许多情况下，单个客户端甚至可以在流进行时加入和离开流。
- CZML 针对客户端使用进行了优化;它旨在紧凑且易于解析。它也可以被人类合理地阅读和写入。
- CZML 是**可扩展的**。虽然 CZML 的主要目标是将场景传达给类似虚拟地球的客户端，但该格式可以轻松扩展，以将其他静态或时间动态数据传达给更复杂的客户端。例如，时间动态数据可以显示在二维图表上。
- CZML是一种**开放格式**。没有与标准机构正式化。

#### 3.2、CZML加载

定义CZML数据：

```typescript
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
```

调用 `Cesium.CzmlDataSource.load()`进行加载：

```typescript
const loadCZML = () => {
  Cesium.CzmlDataSource.load(czml).then(
    (datasoutcePromise: Cesium.CzmlDataSource) => {
      viewer.dataSources.add(datasoutcePromise);
    }
  );
};
```

## Cesium加载多源数据

### 1、GeoJSON

调用`Cesium.GeoJsonDataSource()`:处理**GeoJSON**和**TopoJSON**数据的数据源。

1. 第一种加载方式：

   ```
   const loadGeoJSON = () => {
     viewer.dataSources.add(
       Cesium.GeoJsonDataSource.load(
          "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
          {
            stroke: Cesium.Color.fromCssColorString("#048dfa"), //折线和多边形轮廓的默认颜色。
            fill: Cesium.Color.fromCssColorString("#afd6f0"), //填充颜色#048dfa
            strokeWidth: 3, //轮廓宽度
            markerSymbol: "?", //为每个点创建的地图图钉的默认符号。
          }
        )
      );
   };
   ```

2. 第二种加载方式：

   ```typescript
   const loadGeoJSON = ()=>{
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
   ```

   

### 2、KML

调用`Cesium.KmlDataSource()`:处理KML的数据源。与 `Cesium.GeoJsonDataSource()`类似。

### 3、CZML

#### 3.1、[CZML标准](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide)

CZML 是一种**用于描述时间动态图形场景的 JSON 格式**，主要用于在运行 Cesium 的 Web 浏览器中显示。它描述了线、点、广告牌、模型和其他图形基元，并指定了它们如何随时间变化。虽然 Cesium 具有丰富的客户端 API，但 CZML 允许它是数据驱动的，以便通用 Cesium 查看器可以显示丰富的场景，而无需任何自定义代码。在许多方面，Cesium和CZML之间的关系类似于谷歌地球和KML之间的关系。CZML 和 KML 都是用于描述各自客户端中的场景的数据格式，旨在由各种应用程序生成，甚至可能手写。两者都意味着与客户端充分无关，以便其他兼容的客户端可以渲染其中描述的场景。CZML具有许多重要特征，其中一些特征将其与KML区分开来：

- CZML基于**JSON**。
- CZML 可以准确地描述**随时间变化**值的属性。例如，一条线可以在一个时间间隔内为红色，在另一个时间间隔内为蓝色。客户还应该能够在带时间标记的样本上进行插值。如果指定了两次车辆的位置，则客户端可以使用 CZML 指定的**插值算法**准确显示这两次之间的车辆位置。每个属性都是时间动态的。
- CZML 的结构用于向客户端进行高效的增量流式传输。在显示场景之前，客户端上不需要存在整个文档。在许多情况下，单个客户端甚至可以在流进行时加入和离开流。
- CZML 针对客户端使用进行了优化;它旨在紧凑且易于解析。它也可以被人类合理地阅读和写入。
- CZML 是**可扩展的**。虽然 CZML 的主要目标是将场景传达给类似虚拟地球的客户端，但该格式可以轻松扩展，以将其他静态或时间动态数据传达给更复杂的客户端。例如，时间动态数据可以显示在二维图表上。
- CZML是一种**开放格式**。没有与标准机构正式化。

#### 3.2、CZML加载

定义CZML数据：

```typescript
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
```

调用 `Cesium.CzmlDataSource.load()`进行加载：

```typescript
const loadCZML = () => {
  Cesium.CzmlDataSource.load(czml).then(
    (datasoutcePromise: Cesium.CzmlDataSource) => {
      viewer.dataSources.add(datasoutcePromise);
    }
  );
};
```
