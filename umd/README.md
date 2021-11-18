# undo/redo manager

undo redo manager simple for H5DS

[h5ds](https://www.h5ds.com)的undo/redo的记录操作,采用数组缓存数据

### [github](https://github.com/mtsee/undo-redo-manager)

### [example](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/www/redo_undo/index.html)

### [npm](https://www.npmjs.com/package/undo-redo-manager2)

# use

> npm i undo-redo-manager2 --save

```javascript
import UndoRedoManager from 'undo-redo-manager2';

const manager = new UndoRedoManager({
  limit: 10  // 设置最大记录10次，默认是50次
});

manager.add(1);
manager.add(2);
manager.add(3);
manager.add(4);

const num1 = manager.undo();
// 3

const num2 = manager.undo();
// 2

const num3 = manager.redo();
// 3

```

# API

方法&参数|说明|返回值
--:|--:|--
add(any)|添加记录|插入的值
undo()|撤销|撤销后的记录值
redo()|重做|重做后的记录值
destroy()|销毁|销毁后释放内存
current|getter|当前记录值
canUndo|getter|是否可执行撤销操作
canRedo|getter|是否可执行重做操作
count|getter|记录数量
stacks|getter|记录数据
