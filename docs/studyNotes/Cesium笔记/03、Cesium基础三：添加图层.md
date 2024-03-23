# 03、cesium添加图层

### 1、添加影像数据

利用**viewer**的**imageryLayer**属性，调用其**addImageryProvider()**方法向**imageryLayer**中添加一个**ImageryProvider**对象。

```typescript
//添加图层
const imageryLayers = viewer.imageryLayers;
imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
        url: "http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
        credit:"Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
    })
);
```

### 2、添加地形数据

直接对**viewer**对象的**terrainProvider**属性进行赋值。要构造 **CesiumTerrainProvider**，请调用 [`ArcGISTiledElevationTerrainProvider.fromUrl`](https://cesium.com/learn/cesiumjs/ref-doc/ArcGISTiledElevationTerrainProvider.html#.fromUrl)。不要直接调用构造函数。

```typescript
viewer.terrainProvider =
    await Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(    "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",{
 token:"KED1aF_I4UzXOHy3BnhwyBHU4l5oY6rO6walkmHoYqGp4XyIWUd5YZUC1ZrLAzvV40pR6gBXQayh0eFA8m6vPg..",
   }
);
```

> 注意：
>
> 顶层await导致白屏问题
