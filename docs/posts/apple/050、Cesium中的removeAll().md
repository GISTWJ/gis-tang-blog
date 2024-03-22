# Cesium中的removeAll

在Cesium中，清除实体Entity的方法主要是在`Cesium.viewer.entities`实体集合中调用`remove()`、`removeById(id)`或`removeAll()`

### 一、remove()方法

1、用法

从集合中删除一个实体。

```typescript
viewer.entities.remove(entity)
```

2、源码

```js
EntityCollection.prototype.remove = function (entity) {
  // 如果实体未定义，则返回 false
  if (!defined(entity)) {
    return false;
  }
  // 调用 removeById 方法移除实体
  return this.removeById(entity.id);
};
```

### 二、removeById(id)方法

1、用法

移除指定ID的Entity

```js
viewer.entities.removeById(entityId)
```

2、源码

```js
EntityCollection.prototype.removeById = function (id) {
  // 如果 id 未定义，则返回 false
  if (!defined(id)) {
    return false;
  }
    
  // 从实体集合中移除具有指定 id 的实体
  const entities = this._entities;
  const entity = entities.get(id);
  if (!this._entities.remove(id)) {
    return false;
  }

  // 从 _addedEntities 中移除实体，如果不存在则将实体添加到 _removedEntities
  if (!this._addedEntities.remove(id)) {
    this._removedEntities.set(id, entity);
    this._changedEntities.remove(id);
  }
  this._entities.remove(id);
  // 移除监听实体定义更改的事件处理函数
  entity.definitionChanged.removeEventListener(
    EntityCollection.prototype._onEntityDefinitionChanged,
    this
  );
  // 触发集合变更事件
  fireChangedEvent(this);

  return true;
};
```

### 三、removeAll()

1、用法

移除所有实体

```js
viewer.entities.removeAll();
```

2、源码

```js
EntityCollection.prototype.removeAll = function () {
  // 从 _entities 中移除所有实体
  // 只包含在事件暂停前添加的项目和集合的内容。
  const entities = this._entities;
  const entitiesLength = entities.length;
  const array = entities.values;

  const addedEntities = this._addedEntities;
  const removed = this._removedEntities;

  for (let i = 0; i < entitiesLength; i++) {
    // 对于每个实体，如果它是在添加实体集合中不存在的实体，则将其从集合中移除
    const existingItem = array[i];
    const existingItemId = existingItem.id;
    const addedItem = addedEntities.get(existingItemId);
    if (!defined(addedItem)) {
      existingItem.definitionChanged.removeEventListener(
        EntityCollection.prototype._onEntityDefinitionChanged,
        this
      );
      removed.set(existingItemId, existingItem);
    }
  }

  // 移除所有实体
  entities.removeAll();
  addedEntities.removeAll();
  this._changedEntities.removeAll();
  // 触发集合变更事件
  fireChangedEvent(this);
};
```

在Cesium中，图元**Primitive**是最基本单位，所以可以从webGL层面销毁**Primitive**，也可以从集合层面移除所有**Primitive**。

### 四、destroy()---Primitive层面

1、用法

销毁该对象持有的 WebGL 资源。销毁对象可以确定性地释放 WebGL 资源，而不是依赖垃圾收集器来销毁该对象。

一旦对象被销毁，就不应再使用；调用除此之外的任何函数 `isDestroyed`都会导致[`DeveloperError`](https://cesium.com/learn/cesiumjs/ref-doc/DeveloperError.html)异常。因此，将返回值 ( `undefined`) 分配给该对象，

```js
primitiveTest = new Cesium.Primitive()
primitiveTest.destroy()
```

2、源码

```js
Primitive.prototype.destroy = function () {
  let length;
  let i;

  // 销毁渲染时的着色器程序和深度测试失败时的着色器程序
  this._sp = this._sp && this._sp.destroy();
  this._spDepthFail = this._spDepthFail && this._spDepthFail.destroy();

  // 销毁顶点数组
  const va = this._va;
  length = va.length;
  for (i = 0; i < length; ++i) {
    va[i].destroy();
  }
  this._va = undefined;

  // 销毁拾取 ID
  const pickIds = this._pickIds;
  length = pickIds.length;
  for (i = 0; i < length; ++i) {
    pickIds[i].destroy();
  }
  this._pickIds = undefined;

  // 销毁批处理表和实例 ID
  this._batchTable = this._batchTable && this._batchTable.destroy();
  this._instanceIds = undefined;
  this._perInstanceAttributeCache = undefined;
  this._attributeLocations = undefined;

  // 最后销毁 Primitive 对象本身
  return destroyObject(this);
};
```

### 五、remove()

1、用法

从集合中删除一个**Primitive**

```js
const billboards = scene.primitives.add(new Cesium.BillboardCollection());
scene.primitives.remove(billboards);  // Returns true
```

2、源码

```js
PrimitiveCollection.prototype.remove = function (primitive) {
  // 如果 PrimitiveCollection 包含指定的 primitive
  if (this.contains(primitive)) {
    // 获取 primitive 在 _primitives 数组中的索引
    const index = this._primitives.indexOf(primitive);
    if (index !== -1) {
      // 从 _primitives 数组中移除指定的 primitive
      this._primitives.splice(index, 1);

      // 删除 primitive 在 _external._composites 中的引用
      delete primitive._external._composites[this._guid];

      // 如果设置了 destroyPrimitives 属性，销毁 primitive
      if (this.destroyPrimitives) {
        primitive.destroy();
      }

      // 触发 primitiveRemoved 事件
      this._primitiveRemoved.raiseEvent(primitive);

      return true;
    }
  }

  return false;
};
```

### 六、removeAll()

1、用法

移除集合中所有**Primitive**

```js
scene.primitives.removeAll(); 
```

2、源码

```js
PrimitiveCollection.prototype.removeAll = function () {
  const primitives = this._primitives;
  const length = primitives.length;
  // 遍历所有的 Primitive 对象
  for (let i = 0; i < length; ++i) {
    // 删除 Primitive 对象在 _external._composites 中的引用
    delete primitives[i]._external._composites[this._guid];

    // 如果设置了 destroyPrimitives 属性，销毁 Primitive 对象
    if (this.destroyPrimitives) {
      primitives[i].destroy();
    }

    // 触发 primitiveRemoved 事件
    this._primitiveRemoved.raiseEvent(primitives[i]);
  }
  // 清空 _primitives 数组
  this._primitives = [];
};
```

### 七、destroy()---PrimitiveCollection层面

1、用法

销毁该集合中每个图元所持有的 WebGL 资源。显式销毁此集合可以确定性地释放 WebGL 资源，而不是依赖垃圾收集器来销毁此集合。

由于销毁集合会销毁所有包含的基元，因此只有在确定没有其他代码仍在使用任何包含的基元时才销毁集合。

一旦该集合被销毁，则不应再使用；调用除此之外的任何函数 `isDestroyed`都会导致[`DeveloperError`](https://cesium.com/learn/cesiumjs/ref-doc/DeveloperError.html)异常。

```js
primitives = primitives && primitives.destroy();
```

2、源码

```js
PrimitiveCollection.prototype.destroy = function () {
  this.removeAll();
  return destroyObject(this);
};
```

> 注意：
>
> 不要轻易使用**PrimitiveCollection**的`removeAll()`与`destroy()`，因为Entity也是会解析转换为Primitive，不正确使用会导致移除其他单元的**Primitive**。