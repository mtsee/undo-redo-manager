# undo/redo manager

[demo][https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/www/redo_undo/index.html]

> npm install 安装依赖包

> npm start 启动项目

> npm run build 打包项目

如果希望打包后资源文件名不被修改，放到public/assets中

如果希望打包后资源文件名自动修改，放到src/source中

# 环境变量

### 开发环境
> process.env.NODE_ENV === 'development'

### 正式环境
> process.env.NODE_ENV === 'production'

# 其他说明

```javascript
import React, { useState, useEffect, useRef } from 'react';
import UndoRedoManager from './UndoRedoManager';
import { Space, Button, Toast, Tag } from '@douyinfe/semi-ui';
import dayjs from 'dayjs';

export default function App() {
  const [target, setTarget] = useState();
  const [arr, setArr] = useState([]);
  const manager = useRef();

  useEffect(() => {
    manager.current = new UndoRedoManager({
      onChange: m => {
        console.log('-->', m.current);
        setTarget(m.current?.time);
        setArr([...m.stacks]);
      }
    });
  }, []);

  function onUndo() {
    if (manager.current.canUndo) {
      const data = manager.current.undo();
      console.log(data);
    } else {
      Toast.error('unable undo');
    }
  }

  function onRedo() {
    if (manager.current.canRedo) {
      const data = manager.current.redo();
      console.log(data);
    } else {
      Toast.error('unable redo');
    }
  }

  function onAdd() {
    const data = {
      time: dayjs().format('hh:mm:ss-SSS')
    };
    manager.current.add(data);
  }

  return (
    <div>
      <div>
        <Space>
          {arr.map(d => {
            return (
              <Tag key={d.time} color="blue" type={target === d.time ? 'solid' : 'light'}>
                {d.time}
              </Tag>
            );
          })}
        </Space>
      </div>
      <br />
      <Space>
        <Button onClick={onAdd}>add</Button>
        <Button onClick={onUndo}>undo</Button>
        <Button onClick={onRedo}>redo</Button>
      </Space>
    </div>
  );
}

```
