import { Handle, Position } from '@xyflow/react';
 
export default function CustomNode  ({ data }) {
  return (
    <>
      <div style={{ padding: '10px 20px' }}>
        {data.label}
      </div>
 
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}