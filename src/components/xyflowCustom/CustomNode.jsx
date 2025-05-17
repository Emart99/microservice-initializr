import { Handle, Position } from '@xyflow/react';
 
export default function CustomNode  ({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div className="bg-gray-50 dark:bg-zinc-800 dark:text-white rounded-sm border-zinc-200 dark:border-zinc-400 border" style={{ padding: '10px 20px' }}>
        {data.label}
      </div>
 
      <Handle type="source" position={Position.Right} />
    </>
  );
}