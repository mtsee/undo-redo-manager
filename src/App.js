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
      <br />
      <br />
      <div>
        <a target="_blank" rel="noreferrer" href="https://github.com/mtsee/undo-redo-manager">
          https://github.com/mtsee/undo-redo-manager
        </a>
      </div>
    </div>
  );
}
