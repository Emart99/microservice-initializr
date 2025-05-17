import { Database, GitBranch, Package, Server, Settings } from "lucide-react";

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
        icon: <Database size={16} />,
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
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
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
                    <header className="p-4 flex justify-between items-center gap-x-2">
                        <a className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white" href="#" aria-label="Brand">Spring Microservice Initializr</a>

                    </header>

                    <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <div className=" pb-0 px-2  w-full flex flex-col flex-wrap" >
                            <ul className="space-y-2 font-medium ">
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
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    )
}