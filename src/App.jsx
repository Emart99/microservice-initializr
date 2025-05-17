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
  useOnSelectionChange,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './components/xy-theme.css';
import { useCallback, useEffect, useRef, useState } from "react";
import FloatingEdge from "./components/xyflowCustom/FloatingEdge";
import FloatingConnectionLine from "./components/xyflowCustom/FloatingConnectionLine";
import CustomNode from "./components/xyflowCustom/CustomNode"
import Sidebar, { sidebarComponents } from './components/Sidebar';
import { Moon, Sun } from 'lucide-react';
import DownloadButton from './components/xyflowCustom/DownloadButton';
const initialNodes = [];
const initialEdges = [];
const edgeTypes = {
  floating: FloatingEdge,
};
const getNodeIcon = (type) => {
  const component = sidebarComponents.find(comp => comp.type === type);
  return component ? component.icon : null;
};

const getNodeName = (type) => {
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
  const [port, setPort] = useState(8080);
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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const onDrop = useCallback(
    (event) => {
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
        port: port,
        position,
        deletable: true,
        data: {
          label: (
            <div className="flex gap-2 items-center">
              {nodeIcon}
              <div className="text-start">
                <h1 className="text-lg">{`${nodeName} ${count}`}</h1>
                <p>port: {port}</p>
              </div>
            </div>
          ),
          type: type,
        },
      };
      setNodes((nds) => nds.concat(newNode));
      setPort(prev => prev + 1)
    },
    [reactFlowInstance, nodeCounters]
  );


  return (
    <div className="w-full h-full dark:bg-[#171717]" ref={reactFlowWrapper}>
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
        connectionMode={ConnectionMode.Loose}

      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls position="bottom-right" showFitView={false} showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default function app() {

  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;

    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  };


  return (
    <ReactFlowProvider>
      <main className="min-h-screen dark:bg-gray-900">
        <div style={{ width: '100vw', height: '100vh' }}>
          <Sidebar />
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <DownloadButton />
            <button type="button" onClick={() => alert("Im working on this feature")} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:hover:bg-zinc-800 dark:focus:ring-zinc-800">
              Generate Code
            </button>
            {theme === 'light' && (
              <button
                type="button"
                onClick={() => toggleTheme('dark')}
                className="block p-2 hover:cursor-pointer hover:bg-gray-100 text-gray-800 rounded"
              >
                <Moon />
              </button>
            )}
            {theme === 'dark' && (
              <button
                type="button"
                onClick={() => toggleTheme('light')}
                className="block p-2 hover:bg-zinc-800 hover:cursor-pointer text-gray-200 rounded"
              >
                <Sun />
              </button>
            )}
          </div>
          <Flow />
        </div>
      </main>
    </ReactFlowProvider>
  );
}