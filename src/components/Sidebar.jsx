import { Database, GitBranch, Package, Router, Server, Settings } from "lucide-react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './sidebar.css';
import NodeDetailsForm from './NodeDetailsForm';
import { useCallback, useState } from "react";
import { useOnSelectionChange } from "@xyflow/react";


export const sidebarComponents = [
    {
        name: 'Microservice',
        icon: <Server size={16} />,
        type: 'microservice'
    },
    {
        name: 'Database',
        icon: <Database size={16} />,
        type: 'database'
    },
    {
        name: 'Api Gateway',
        icon: <Router size={16} />,
        type: 'api-gateway'
    },
    {
        name: 'Config Server',
        icon: <Settings size={16} />,
        type: 'config-server'
    },
    {
        name: 'Library Module',
        icon: <Package size={16} />,
        type: 'library-module'
    },
    {
        name: 'Service Discovery',
        icon: <GitBranch size={16} />,
        type: 'service-discovery'
    }
]

export default function Sidebar() {
    const [toggleDetails, setToggleDetails] = useState(false)
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const onChange = useCallback((event) => {
        if (event.nodes[0]) {
            setToggleDetails(prev => !prev)
        }
        else {
            setToggleDetails(false)
        }
    })
    useOnSelectionChange({ onChange, })

    return (
        <div>
            <div id="hs-sidebar-basic-usage" className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-80
                    hs-overlay-open:translate-x-0
                    -translate-x-full transition-all duration-300 transform
                    h-full
                    hidden
                    fixed top-0 start-0 bottom-0 z-60
                    bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabIndex="-1" aria-label="Sidebar" >
                <div className="relative flex flex-col h-full max-h-full ">
                    <header className="p-4 flex justify-center items-center gap-x-2">
                        <p className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 p-6 dark:text-white" href="#" aria-label="Brand">
                            Spring Microservice Initializr
                        </p>
                    </header>

                    <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <div className=" pb-0 px-2  w-full flex flex-col flex-wrap" >
                            <Tabs>
                                <TabList className="tab-active flex gap-2 justify-center sticky top-0 z-10 dark:bg-zinc-800 dark:bg-zinc-800  border-neutral-700">
                                    <Tab>Components</Tab>
                                    <Tab>Edit Details</Tab>
                                </TabList>

                                <TabPanel className="pt-5">
                                    <p className="dark:text-gray-300 text-gray-700 text-xs text-center pb-5">Drag and drop component to the canvas</p>
                                    <ul className="space-y-3 ml-3 font-medium">
                                        {sidebarComponents.map((component, index) => {
                                            return (
                                                <li key={index}>
                                                    <div
                                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-grab"
                                                        draggable
                                                        onDragStart={(event) => onDragStart(event, component.type)}
                                                    >
                                                        {component.icon}
                                                        <span className="flex-1 ms-3 whitespace-nowrap">{component.name}</span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </TabPanel>
                                <TabPanel className="h-full">
                                    <NodeDetailsForm toggleDetails={toggleDetails} />
                                </TabPanel>
                            </Tabs>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}