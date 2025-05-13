"use client"
import { Node } from "@xyflow/react";
import { Database, GitBranch, Package, Server, Settings } from "lucide-react";

const sidebarComponents = [
    {
        name: 'Microservice',
        icon: <Server size={16} />,
        id: '1'
    },
    {
        name: 'Database',
        icon: <Database size={16} />,
        id: '2'
    },
    {
        name: 'Api Gateway',
        icon: <Database size={16} />,
        id: '3'
    },
    {
        name: 'Config Server',
        icon: <Settings size={16} />,
        id: '4'

    },
    {
        name: 'Library Module',
        icon: <Package size={16} />,
        id: '5'

    },
    {
        name: 'Service Discovery',
        icon: <GitBranch size={16} />,
        id: '6'
    }
]
export default function Sidebar({ setNodes }) {
    const handleClick = (name: string, id: string, icon: any) => {
        const newNode = { id: id, position: { x: 760, y: 350 }, data: { label: <div className="flex gap-2 justify-center items-center">{icon}{name}</div> } }
        setNodes((nds: Node[]) => nds.concat(newNode));
    }
    return (
        <div>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-[23%] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <h1 className=" mb-8 pt-8 text-xl font-semibold text-gray-900 dark:text-white text-center w-full ">Spring Microservice Initializr</h1>
                    <ul className="space-y-2 font-medium ">

                        {sidebarComponents.map((component, index) => {
                            return (
                                <li key={index}>
                                    <a href="#" onClick={() => handleClick(component.name, component.id, component.icon)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        {component.icon}
                                        <span className="flex-1 ms-3 whitespace-nowrap">{component.name}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>


        </div>
    )
}