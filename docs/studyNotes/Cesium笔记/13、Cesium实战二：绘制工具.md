# 13、绘制工具

### 1、配置路径别名

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"src"),
    },
  },
})
```

### 2、dooTool.vue文件

```vue
<!--
 * @Author: TWJ
 * @Date: 2023-07-24 20:10:57
 * @LastEditTime: 2023-07-26 15:55:38
 * @Description: 绘制工具组件
-->
<template>
  <div class="buttonDrawTool"></div>
  <div class="drawToolContainer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>绘制工具</span>
        </div>
      </template>
      <el-row>
        <el-col :span="5"
          ><el-button @click="drawTool.activate('Point')">点</el-button></el-col
        >
        <el-col :span="5"><el-button @click="drawTool.activate('Polyline')">线</el-button></el-col>
        <el-col :span="5"><el-button @click="drawTool.activate('Polygon')">面</el-button></el-col>
        <el-col :span="5"><el-button @click="drawTool.activate('Rectangle')">矩形</el-button></el-col>
        <el-col :span="4"
          ><el-button @click="drawTool.clearAll()">清除</el-button></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import bus from "@/utils/bus.ts"; //导入mitt
import DrawTool from "./drawTool"; //引入DrawTool工具类
import * as Cesium from "cesium";

let viewerCopy: Cesium.Viewer; //定义变量接收Viewer实例
let drawTool: DrawTool; //定义变量接收DrawTool实例
bus.on("toOtherCesium", (res: Cesium.Viewer) => {
  viewerCopy = res;
  drawTool = new DrawTool(viewerCopy); //创建DrawTool实例
});
</script>
<style scoped>
.drawToolContainer {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 350px;
  height: 130px;
  background-color: red;
}
</style>
```

### 3、drowTool.ts文件

```typescript
/*
 * @Author: TWJ
 * @Date: 2023-07-24 20:10:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-26 17:46:25
 * @Description: 绘制工具
 */

import * as Cesium from "cesium";

export default class DrawTool {
  viewer: Cesium.Viewer;
  _drawHandler: Cesium.ScreenSpaceEventHandler | null;
  _dataSource: Cesium.DataSource;
  _drawType: String | null;
  _pointColltction: Cesium.Cartesian3[];
  _mousePosition: Cesium.Cartesian3 | null;
  _pointPolygon: Cesium.Cartesian3[];
  _rectangleDiagonalPoint: Cesium.Cartesian3[];
  _finallyDataSource: Cesium.DataSource; //最后保存绘制结果的数据源
  /**
   * @description: DrawTool类构造函数
   * @param {Cesium} viewer
   * @return {*}
   */
  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer;
    this._drawHandler = null; //鼠标事件
    this._dataSource = new Cesium.CustomDataSource("_defaultDataSource"); //在创建DrawTool实例的时候，创建实体默认数据源
    this._finallyDataSource = new Cesium.CustomDataSource("_finallyDataSource");
    this._drawType = null; //类型
    this._pointColltction = <Cesium.Cartesian3[]>[]; //存储每一条折线的点的集合
    this._mousePosition = null; //移动点
    this._pointPolygon = <Cesium.Cartesian3[]>[]; //存储多边形每一条边界的点的集合
    this._rectangleDiagonalPoint = []; //存储矩形对角线的两个端点
    this.viewer.dataSources.add(<Cesium.DataSource>this._finallyDataSource); //保存最终的绘制结果
    this.viewer.dataSources.add(<Cesium.DataSource>this._dataSource); //将数据源添加到Viewer的数据源集合中
  }

  /**
   * @description: 根据参数激活对应鼠标事件
   * @param {*} drawType
   * @return {*}
   */
  activate(drawType: String) {
    this._removeAllEvent();
    this._mousePosition = null; //移动点
    this._drawType = null; //类型
    this._drawType = drawType;
    this._registerEvents(); //注册鼠标事件
  }
  /**
   * @description: 注册鼠标事件
   * @return {*}
   */
  _registerEvents(): void {
    this._drawHandler = new Cesium.ScreenSpaceEventHandler(
      this.viewer.scene.canvas
    );
    this.viewer.scene.globe.depthTestAgainstTerrain = true; //开启深度检测
    switch (this._drawType) {
      case "Point": {
        this._leftClickEventForPoint();
        break;
      }
      case "Polyline": {
        this._leftClickEvnetForPolyline();
        this._mouseMoveEventForPolyline();
        this._leftDoubleClickEventForPolyline();
        break;
      }
      case "Polygon": {
        this._leftClickEventForPolygon();
        this._mouseMoveEventForPolygon();
        this._leftDoubleClickEventForPolygon();
        break;
      }
      case "Rectangle": {
        this._leftClickEventForRectangle();
        this._mouseMoveEventForRectangle();
        break;
      }
    }
  }
  /**
   * @description: 鼠标事件---绘制点的左击事件
   * @return {*}
   */
  _leftClickEventForPoint(): void {
    //设置要在输入事件上执行的函数
    this._drawHandler?.setInputAction((e: any) => {
      const position = this.viewer.scene.pickPosition(e.position); //获从深度缓冲区和窗口位置重建的笛卡尔3坐标
      if (!position) return;
      const car3to_position = Cesium.Cartographic.fromCartesian(position); //笛卡尔3转换为经纬度
      const positionIncrease = [
        Cesium.Math.toDegrees(car3to_position.longitude),
        Cesium.Math.toDegrees(car3to_position.latitude),
        car3to_position.height + 50, //给点的高度拔高50米
      ];
      this._addPoint(positionIncrease); //调用_addPoint方法
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * @description: 鼠标事件---绘制线的左击事件
   * @return {*}
   */
  _leftClickEvnetForPolyline(): void {
    this._drawHandler?.setInputAction((e: any) => {
      const position = this.viewer.scene.pickPosition(e.position);
      if (!position) return;
      this._pointColltction.push(position);
      this._addPolyline(); //调用_addPolyline()
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * @description: 鼠标事件---绘制线的移动事件
   * @return {*}
   */
  _mouseMoveEventForPolyline(): void {
    this._drawHandler?.setInputAction((e: any) => {
      let position = this.viewer.scene.pickPosition(e.endPosition);
      if (!position) return;
      this._mousePosition = position; //将鼠标目前的坐标存入移动坐标数组
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  /**
   * @description: 鼠标事件---绘制线的右击事件
   * @return {*}
   */
  _leftDoubleClickEventForPolyline(): void {
    this._drawHandler?.setInputAction((e: any) => {
      const position = this.viewer.scene.pickPosition(e.position);
      if (!position) return;
      this._removeAllEvent(); //移除所有鼠标事件
      this._dataSource.entities.removeAll();
      //根据保存的线坐标数组进行线实体创建并添加进最终数据源的实体集合
      this._finallyDataSource.entities.add({
        polyline: {
          positions: this._pointColltction,
          clampToGround: true,
          width: 5,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.3,
            color: Cesium.Color.BLUE,
          }),
          depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.YELLOW,
          }),
        },
      });
      this._pointColltction = []; //双击左键结束Polyline绘制，并清空临时存放线坐标的数组
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  /**
   * @description: 鼠标事件---绘制多边形左键
   * @return {*}
   */
  _leftClickEventForPolygon() {
    this._drawHandler?.setInputAction((e: any) => {
      let position = this.viewer.scene.pickPosition(e.position);
      if (!position) return;
      this._pointPolygon.push(position);//将左键单击坐标转换后添加进多边形的顶点坐标集
      this._addPolygon(); //调用_addPolygon()
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * @description: 鼠标事件---绘制多边形移动鼠标
   * @return {*}
   */
  _mouseMoveEventForPolygon() {
    this._drawHandler?.setInputAction((e: any) => {
      const position = this.viewer.scene.pickPosition(e.endPosition);
      if (!position) return;
      this._mousePosition = position; //将鼠标目前的坐标存入移动坐标数组
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  /**
   * @description: 鼠标事件---绘制多边形右键
   * @return {*}
   */
  _leftDoubleClickEventForPolygon() {
    this._drawHandler?.setInputAction((e: any) => {
      const position = this.viewer.scene.pickPosition(e.position);
      if (!position) return;
      this._pointPolygon.push(this._pointPolygon[0]);
      this._removeAllEvent(); //移除所有鼠标事件
      this._dataSource.entities.removeAll();
      this._finallyDataSource.entities.add({
        polyline: {
          positions: this._pointPolygon,
          clampToGround: true,
          width: 3,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.3,
            color: Cesium.Color.RED,
          }),
          depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.YELLOW,
          }),
        },
        polygon: {
          hierarchy: this._pointPolygon,
          extrudedHeightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          material: Cesium.Color.YELLOW.withAlpha(0.4),
        },
      });
      this._pointPolygon = []; //右键结束polygon绘制，并清空临时存放多边形边界坐标的数组
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  /**
   * @description:鼠标事件---绘制矩形左键
   * @return {*}
   */
  _leftClickEventForRectangle() {
    //左键录入起始点
    this._drawHandler?.setInputAction((e: any) => {
      const p = this.viewer.scene.pickPosition(e.position);
      if (!p) return;
      this._rectangleDiagonalPoint.push(p);
      this._addRectangle();
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   * @description: 鼠标事件---绘制矩形移动
   * @return {*}
   */
  _mouseMoveEventForRectangle() {
    this._drawHandler?.setInputAction((e: any) => {
      const position = this.viewer.scene.pickPosition(e.endPosition);
      if (!position) return;
      this._mousePosition = position; //将鼠标目前的坐标存入移动坐标变量
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * @description: 添加点实体到最终数据源
   * @param {number} p
   * @return {*}
   */
  _addPoint(p: number[]): void {
    this._dataSource.entities.removeAll();
    this._finallyDataSource.entities.add({
      position: Cesium.Cartesian3.fromDegrees(p[0], p[1], p[2]),
      point: {
        color: Cesium.Color.RED,
        pixelSize: 10,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 1,
      },
    });
  }
  /**
   * @description: 添加线到临时数据源
   * @return {*}
   */
  _addPolyline(): void {
    this._dataSource.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          const coordinate: Cesium.Cartesian3[] = Array.from(
            this._pointColltction
          );
          if (this._mousePosition) {
            coordinate.push(this._mousePosition);
          }
          return coordinate;
        }, false),
        clampToGround: true, //开启贴地,帧率会下降
        width: 5,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.ORANGE,
          outlineWidth: 3,
          outlineColor: Cesium.Color.BLACK,
        }),
        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.YELLOW,
        }),
      },
    });
  }

  /**
   * @description: 添加多边形到临时数据源
   * @return {*}
   */
  _addPolygon(): void {
    //一个顶点
    if (this._pointPolygon.length == 1) {
      this._dataSource.entities.add({
        polyline: {
          positions: new Cesium.CallbackProperty(() => {
            const coordinate: Cesium.Cartesian3[] = Array.from(
              this._pointPolygon
            );
            if (this._mousePosition) {
              coordinate.push(this._mousePosition);
            }
            return coordinate;
          }, false),
          clampToGround: true, //开启贴地,帧率会下降
          width: 5,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 1,
            color: Cesium.Color.GREEN,
          }),
          depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.YELLOW,
          }),
        },
      });
    } else {
      //两个顶点
      this._dataSource.entities.add({
        polygon: {
          hierarchy: new Cesium.CallbackProperty(() => {
            const poss = Array.from(this._pointPolygon);
            if (this._mousePosition) {
              poss.push(this._mousePosition);
            }
            return new Cesium.PolygonHierarchy(poss);
          }, false),
          extrudedHeightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          material: Cesium.Color.RED.withAlpha(0.4),
        },
        polyline: {
          positions: new Cesium.CallbackProperty(() => {
            const coordinate = Array.from(this._pointPolygon);
            if (this._mousePosition) {
              coordinate.push(this._mousePosition);
              coordinate.push(coordinate[0]);
            }
            return coordinate;
          }, false),
          clampToGround: true,
          width: 3,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.3,
            color: Cesium.Color.RED,
          }),
          depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.YELLOW,
          }),
        },
      });
    }
  }
  /**
   * @description: 添加矩形到数据源
   * @return {*}
   */
  _addRectangle() {
    //当矩形对角线端点数为1或0时
    if (this._rectangleDiagonalPoint.length < 2) {
      this._dataSource.entities.add({
        rectangle: {
          coordinates: new Cesium.CallbackProperty(() => {
            //回调计算矩形的构造属性
            const c = Array.from(this._rectangleDiagonalPoint);
            //根据鼠标移动的目前坐标计算矩形对角线坐标
            if (this._mousePosition) {
              c.push(this._mousePosition);
            }
            const startLong = Cesium.Cartographic.fromCartesian(c[0]).longitude;
            const startLat = Cesium.Cartographic.fromCartesian(c[0]).latitude;
            const endLong = Cesium.Cartographic.fromCartesian(c[1]).longitude;
            const endLat = Cesium.Cartographic.fromCartesian(c[1]).latitude;
            const rectangle = new Cesium.Rectangle(
              this._min(startLong, endLong),
              this._min(startLat, endLat),
              this._max(startLong, endLong),
              this._max(startLat, endLat)
            );
            return rectangle;
          }, false),
          material: Cesium.Color.BLUE.withAlpha(0.5), // 设置矩形的填充颜色和透明度
          outline: true, // 显示矩形的边框线
          outlineColor: Cesium.Color.RED, // 设置矩形边框线的颜色
          outlineWidth: 2,
          extrudedHeightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 高度参考为 CLAMP_TO_GROUND，即矩形始终位于地表上
        },
      });
    } else if (this._rectangleDiagonalPoint.length == 2) {
      //当矩形对角线端点数为2时
      this._dataSource.entities.removeAll();//移除所有临时数据源的实体
      const c = Array.from(this._rectangleDiagonalPoint);
      //将端点坐标从笛卡尔3转换为经纬度弧度
      const startLong = Cesium.Cartographic.fromCartesian(c[0]).longitude;
      const startLat = Cesium.Cartographic.fromCartesian(c[0]).latitude;
      const endLong = Cesium.Cartographic.fromCartesian(c[1]).longitude;
      const endLat = Cesium.Cartographic.fromCartesian(c[1]).latitude;
      const rectangle = new Cesium.Rectangle(//根据弧度创建矩形对象
        this._min(startLong, endLong),
        this._min(startLat, endLat),
        this._max(startLong, endLong),
        this._max(startLat, endLat)
      );
      //将矩形实体添加到最终数据源的实体集合中
      this._finallyDataSource.entities.add({
        rectangle: {
          coordinates: rectangle,
          material: Cesium.Color.RED.withAlpha(0.5), // 设置矩形的填充颜色和透明度
          outline: true, // 显示矩形的边框线
          outlineColor: Cesium.Color.BLACK, // 设置矩形边框线的颜色
          extrudedHeightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 高度参考为 CLAMP_TO_GROUND，即矩形始终位于地表上
        },
      });
      this._removeAllEvent();//关闭所有监听事件
      this._rectangleDiagonalPoint.length = 0;//初始化矩形的端点坐标数组
    }
  }

  /**
   * @description: 最小值
   * @param {number} a
   * @param {number} b
   * @return {*}
   */
  _min(a: number, b: number): number {
    return a < b ? a : b;
  }
  /**
   * @description: 最大值
   * @param {number} a
   * @param {number} b
   * @return {*}
   */
  _max(a: number, b: number): number {
    return a > b ? a : b;
  }
  /**
   * @description: 清除所有
   * @return {*}
   */
  clearAll(): void {
    this._removeAllEvent();
    this._resetParams();
  }

  /**
   * @description: 关闭事件监听
   * @return {*}
   */
  _removeAllEvent(): void {
    this._drawHandler &&
      (this._drawHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      ),
      this._drawHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      ),
      this._drawHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      ),
      this._drawHandler.destroy(),
      (this._drawHandler = null));
  }

  /**
   * @description: 初始化参数
   * @return {*}
   */
  _resetParams(): void {
    if (this._dataSource != null) {
      this._dataSource.entities.removeAll(); //清空临时数据源的实体集合
      this._finallyDataSource.entities.removeAll(); //清空最终数据源的实体集合
    }
    this._pointColltction = []; //清空存储点的集合
    this._mousePosition = null; //清空移动点
    this._drawType = null; //初始化绘制类型
  }
}
```

将工具类与组件页面进行解耦，将绘制功能单独封装为绘制工具类。

> 封装思路:
>
> 1. 先考虑实现功能的逻辑
> 2. 抽离出公共部分
> 3. 确定需要的参数
> 4. 在合适的地方进行内存释放与事件解绑
> 5. 采用ts需要注意类型判断
>
> 问题：
>
> 1. 在封装过程中，采用`const a = []` 和`const a;a.length = 0`两种方式进行初始化为什么不一样？
>
>    答：const a = []
>
> 2. 封装逻辑的过程还没有捋的很清楚。
>
> 3. 为什么线、面需要采用不同的临时顶点数组来存放临时顶点坐标？因为每一次绘制完当前图形都会清空临时数组，但是如果不给面单独重新创建一个临时数组，在绘制多边形之后，再绘制线，会在绘制的鼠标移动过程中，线的移动绘制变成面的移动绘制。
>
>    ![](./img/NU[C3(6E{W84{$MTD$O6)3W-1690366897711.png)
>
> 4. 功能需要进一步完善：撤销绘制、自由曲线、三角形、圆...，可以参考mars3D的示例。
>
> 5. 代码结构需要完善，主文件类似drowTool.ts只放最抽象的函数签名这类的，函数的实现放到主文件外部，提高代码可读性和可维护性。

