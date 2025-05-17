import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, selected }) => {
  return (
    <>
      <div
        className={`bg-gray-50 dark:bg-zinc-800 dark:text-white rounded-md border 
        ${selected ? 'border-blue-500' : 'border-zinc-200 dark:border-zinc-400'}`}
        style={{ padding: '10px 20px', minWidth: '220px' }}
      >
        <div className={`absolute top-[-15px] right-[-15px] rounded-full bg-white dark:bg-zinc-900 p-2  ${selected ? 'border-blue-400 border' : 'border-gray-300 border'}`}>
          {data.icon}
        </div>
        {data.label}
      </div>
      <Handle type="source" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="source" position={Position.Bottom} id="c" />
      <Handle type="source" position={Position.Left} id="d" />
    </>
  );
});