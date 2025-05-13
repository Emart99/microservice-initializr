"use client"
import { DarkThemeToggle } from "flowbite-react";
import Sidebar from "../app/component/Sidebar"
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useCallback } from "react";

const initialNodes = [
];
const initialEdges = [];



export default function Home() {


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );



  return (
    <main className=" min-h-screen dark:bg-gray-900">
      <div className="fixed top-4 right-4 z-1">
        <DarkThemeToggle />
      </div>
      <Sidebar setNodes={setNodes} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}

        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Controls position="bottom-right" />

        </ReactFlow>
      </div>
    </main>
  );
}
