import { useState } from 'react';
import { X, MousePointerClick, Trash2, ArrowRightCircle, RefreshCcw, Layers, Info } from 'lucide-react';

export default function InfoModal() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="z-50 text-gray-800 dark:text-white p-3 rounded-full  hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                aria-label="Show tutorial"
            >
                <Info size={24} />
            </button>

            {isOpen && (
                <div className="fixed inset-0 dark:bg-zinc-900 bg-white  z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-zinc-700">
                            <h2 className="text-xl justify-center w-full font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <Info size={20} /> Quick Start Guide
                            </h2>
                            <button
                                onClick={toggleModal}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                            </button>
                        </div>

                        <div className="p-6 space-y-6 text-gray-700 dark:text-gray-200">

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                                        <MousePointerClick className="text-blue-600 dark:text-blue-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Drag and Drop Components</h4>
                                        <p className="mt-1">Select components from the sidebar and drag them onto the canvas to create your microservice architecture.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                                        <ArrowRightCircle className="text-green-600 dark:text-green-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Create Connections</h4>
                                        <p className="mt-1">Click and drag from one component's handle to another component to create a connection between services, databases, api gateways, etc.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                                        <Trash2 className="text-red-600 dark:text-red-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Delete Elements</h4>
                                        <p className="mt-1">Select a node or edge and press <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 rounded text-sm">Delete</span> or <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 rounded text-sm">Backspace</span> to remove it from your diagram.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                                        <Layers className="text-purple-600 dark:text-purple-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Edit Component Details</h4>
                                        <p className="mt-1">Select a component and click the "Edit Details" tab in the sidebar to configure its properties.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                                        <RefreshCcw className="text-amber-600 dark:text-amber-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Generate & Download</h4>
                                        <p className="mt-1">Use the buttons in the top-right corner to download your diagram as an image or generate code from your architecture.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 p-4 border-t border-gray-300 dark:border-zinc-700">
                            <button
                                onClick={toggleModal}
                                className="w-full cursor-pointer text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}