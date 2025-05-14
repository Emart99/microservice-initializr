"use client"
import { DarkThemeToggle } from "flowbite-react";
import Sidebar, { sidebarComponents } from "../app/component/Sidebar"
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Controls,
  useReactFlow,
  ReactFlowProvider,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useCallback, useRef, useState } from "react";
import FloatingEdge from "./component/xyflowCustom/FloatingEdge";
import FloatingConnectionLine from "./component/xyflowCustom/FloatingConnectionLine";
import CustomNode from "./component/xyflowCustom/CustomNode"
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];
const edgeTypes: floating = {
  floating: FloatingEdge,
};
const getNodeIcon = (type: string) => {
  const component = sidebarComponents.find(comp => comp.type === type);
  return component ? component.icon : null;
};

const getNodeName = (type: string) => {
  const component = sidebarComponents.find(comp => comp.type === type);
  return component ? component.name : type;
};
const nodeTypes = {
  customNode: CustomNode
};

function Flow() {
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [nodeCounters, setNodeCounters] = useState({
    'microservice': 0,
    'database': 0,
    'api-gateway': 0,
    'config-server': 0,
    'library-module': 0,
    'service-discovery': 0
  });

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'floating',
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>): void => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const nodeName = getNodeName(type);
      const nodeIcon = getNodeIcon(type);

      setNodeCounters(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));

      const count = nodeCounters[type] + 1;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${count}`,
        type: 'customNode',
        position,
        data: {
          label: (
            <div className="flex gap-2 justify-center items-center">
              {nodeIcon}
              {`${nodeName} ${count}`}
            </div>
          ),
          type: type,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodeCounters]
  );

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls position="bottom-right" />
      </ReactFlow>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-gray-900">
      <div className="fixed top-4 right-4 z-50">
        <DarkThemeToggle />
      </div>
      <Sidebar />
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </main>
  );
}