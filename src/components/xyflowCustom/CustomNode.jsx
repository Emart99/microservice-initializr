import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data, selected }) {

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <div
        className={`bg-gray-50 dark:bg-zinc-800 dark:text-white rounded-md border 
        ${selected ? 'border-blue-500' : 'border-zinc-200 dark:border-zinc-400'}`}
        style={{ padding: '10px 20px', minWidth: '220px' }}
      >
        {data.label}
      </div>
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}