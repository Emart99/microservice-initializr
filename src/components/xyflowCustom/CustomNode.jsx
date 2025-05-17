import { Handle, Position } from '@xyflow/react';
 
export default function CustomNode  ({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div className="bg-white dark:bg-gray rounded-sm" style={{ padding: '10px 20px' }}>
        {data.label}
      </div>
 
      <Handle type="source" position={Position.Right} />
    </>
  );
}