# 08、ScreenSpaceEventHandler

**GeometryInstance** 绘制后仍然是可以独立访问的，只需分配一个 id 即可。

```typescript
    //自定义属性颜色
  const instance_red = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
      rectangle: Cesium.Rectangle.fromDegrees(-85, 20, -75, 30),
      vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    }),
    id: "red",
    attributes: {
      color: new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, 0.8),
    },
  });
  const instance_yellow = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
      rectangle: Cesium.Rectangle.fromDegrees(-65, 20, -55, 30),
      vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    }),
    id: "yellow",
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA),
    },
  });
  //拾取要素
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement: any) {
    const pick = scene.pick(movement.position);
    if (Cesium.defined(pick)) {
      console.log(pick.id);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

绘制几何完成后，可以更新 GeometryInstance 的属性，包括：

- Color：确定 GeometryInstance 颜色的 `ColorGeometryInstanceAttribute` 对象，使用此属性，Primitive 必须使用的是 `PerInstanceColorAppearance`

- Show：布尔值，表达 GeometryInstance 是否可视。

  ```typescript
    //定时器改变几何属性
  setInterval(function () {
      var attributes = primitive.getGeometryInstanceAttributes("circle");
      //toValue():将颜色转换为可用于分配颜色属性的类型化数组。返回修改后的结果参数或新实例（如果未定义结果）。
      attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
        Cesium.Color.fromRandom({ alpha: 1.0 })
      );
    }, 2000);
  ```

