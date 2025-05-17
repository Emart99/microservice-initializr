import { useCallback, useEffect, useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { CircleAlert } from 'lucide-react';

const defaultValues = {
    microservice: {
        name: '',
        port: '',
        language: 'Java',
        dependencies: '',
        description: '',
        version: '1.0.0',
        javaVersion: '17',
    },
    database: {
        name: '',
        type: 'MongoDB',
        port: '',
        username: '',
        password: '',
        databaseName: '',
        version: '',
    },
    'api-gateway': {
        name: '',
        port: '',
        routes: '',
        authEnabled: false,
        rateLimit: '',
        corsEnabled: false,
    },
    'config-server': {
        name: '',
        port: '',
        configSource: 'Git',
        repositoryUrl: '',
        configPath: '',
    },
    'library-module': {
        name: '',
        version: '1.0.0',
        language: 'Java',
        dependencies: '',
        description: '',
    },
    'service-discovery': {
        name: '',
        port: '',
        registrationMethod: 'Auto',
        healthCheckPath: '/actuator/health',
    }
};

const formFields = {
    microservice: [
        { id: 'name', label: 'Service Name', type: 'text' },
        { id: 'port', label: 'Port', type: 'number' },
        { id: 'language', label: 'Language', type: 'select', options: ['Java', 'Kotlin'] },
        { id: 'dependencies', label: 'Dependencies', type: 'textarea' },
        { id: 'version', label: 'Version', type: 'text' },
        { id: 'javaVersion', label: 'Java Version', type: 'select', options: ['17', '21', '24'] },
    ],
    database: [
        { id: 'name', label: 'Database Name', type: 'text' },
        { id: 'type', label: 'Database Type', type: 'select', options: ['MongoDB', 'PostgreSQL', 'MySQL', 'MariaDB', 'Oracle', 'SQLite', 'Redis', 'Cassandra'] },
        { id: 'port', label: 'Port', type: 'number' },
        { id: 'username', label: 'Username', type: 'text' },
        { id: 'password', label: 'Password', type: 'password' },
        { id: 'databaseName', label: 'Database Instance Name', type: 'text' },
        { id: 'version', label: 'Version', type: 'text' },
    ],
    'api-gateway': [
        { id: 'name', label: 'Gateway Name', type: 'text' },
        { id: 'port', label: 'Port', type: 'number' },
        { id: 'routes', label: 'Routes Configuration', type: 'textarea' },
        { id: 'authEnabled', label: 'Enable Authentication', type: 'checkbox' },
        { id: 'rateLimit', label: 'Rate Limit (req/s)', type: 'number' },
        { id: 'corsEnabled', label: 'Enable CORS', type: 'checkbox' },
    ],
    'config-server': [
        { id: 'name', label: 'Server Name', type: 'text' },
        { id: 'port', label: 'Port', type: 'number' },
        { id: 'configSource', label: 'Config Source', type: 'select', options: ['Git', 'Vault', 'Local', 'Database'] },
        { id: 'repositoryUrl', label: 'Repository URL', type: 'text' },
        { id: 'configPath', label: 'Config Path', type: 'text' },
    ],
    'library-module': [
        { id: 'name', label: 'Library Name', type: 'text' },
        { id: 'version', label: 'Version', type: 'text' },
        { id: 'language', label: 'Language', type: 'select', options: ['Java', 'Kotlin'] },
        { id: 'dependencies', label: 'Dependencies', type: 'textarea' },
        { id: 'description', label: 'Description', type: 'textarea' },
    ],
    'service-discovery': [
        { id: 'name', label: 'Service Name', type: 'text' },
        { id: 'port', label: 'Port', type: 'number' },
        { id: 'registrationMethod', label: 'Registration Method', type: 'select', options: ['Auto', 'Manual', 'Hybrid'] },
        { id: 'healthCheckPath', label: 'Health Check Path', type: 'text' },
    ],
};

export default function NodeDetailsForm() {
    const { getNodes, setNodes, getEdges } = useReactFlow();
    const [selectedNode, setSelectedNode] = useState(null);
    const [formData, setFormData] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false);
    console.log(selectedNode)
    useEffect(() => {
        const nodes = getNodes();
        const selected = nodes.find(node => node.selected);

        if (selected) {
            setSelectedNode(selected);
            const nodeType = selected.data.type;
            const existingData = selected.data.details || {};
            setFormData({ ...defaultValues[nodeType], ...existingData });
            setIsFormVisible(true);
        } else {
            setSelectedNode(null);
            setIsFormVisible(false);
        }
    }, [getNodes]);

    const handleInputChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!selectedNode) return;

        setNodes(nodes => nodes.map(node => {
            if (node.id === selectedNode.id) {
                const updatedNode = {
                    ...node,
                    data: {
                        ...node.data,
                        details: formData,
                        label: (
                            <div className="flex gap-2 items-center">
                                {node.data.label.props.children[0]}
                                <div className="text-start">
                                    <h1 className="text-lg">{formData.name || node.data.label.props.children[1].props.children[0].props.children}</h1>
                                    <p>port: {formData.port || selectedNode.data.label.props.children[1].props.children[1].props.children[1]}</p>
                                    {nodeTypeFields[node.data.type]?.map(field =>
                                        field.showInLabel && formData[field.id] ?
                                            <p key={field.id}>{field.label}: {formData[field.id]}</p> : null
                                    )}
                                </div>
                            </div>
                        )
                    }
                };
                return updatedNode;
            }
            return node;
        }));
    }, [selectedNode, formData, setNodes]);

    const nodeTypeFields = {
        microservice: [
            { id: 'language', label: 'language', showInLabel: true },
        ],
        database: [
            { id: 'type', label: 'type', showInLabel: true },
        ],
        'api-gateway': [
            { id: 'routes', label: 'routes', showInLabel: false },
        ],
        'config-server': [
            { id: 'configSource', label: 'source', showInLabel: true },
        ],
        'library-module': [
            { id: 'language', label: 'language', showInLabel: true },
        ],
        'service-discovery': [
            { id: 'registrationMethod', label: 'method', showInLabel: true },
        ],
    };

    if (!isFormVisible) {
        return (
            <div className="p-4 text-center dark:text-gray-300">
                <CircleAlert className="mx-auto mb-2" />
                <p>Please select a node to edit its details</p>
            </div>
        );
    }

    return (
        <div className="p-4 dark:text-gray-100">
            <h3 className="text-lg font-medium mb-4">Edit {selectedNode?.data.type} Details</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {selectedNode && formFields[selectedNode.data.type]?.map((field) => (
                    <div key={field.id} className="space-y-2">
                        <label
                            htmlFor={field.id}
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {field.label}
                        </label>

                        {field.type === 'select' ? (
                            <select
                                id={field.id}
                                name={field.id}
                                value={formData[field.id] || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-700 dark:border-zinc-600"
                            >
                                {field.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                id={field.id}
                                name={field.id}
                                value={formData[field.id] || ''}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-700 dark:border-zinc-600"
                            />
                        ) : field.type === 'checkbox' ? (
                            <div className="flex items-center">
                                <input
                                    id={field.id}
                                    name={field.id}
                                    type="checkbox"
                                    checked={formData[field.id] || false}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:bg-zinc-700 dark:border-zinc-600"
                                />
                                <label htmlFor={field.id} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    {field.label}
                                </label>
                            </div>
                        ) : (
                            <input
                                id={field.id}
                                name={field.id}
                                type={field.type}
                                value={formData[field.id] || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-700 dark:border-zinc-600"
                            />
                        )}
                    </div>
                ))}

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        Update Node
                    </button>
                </div>
            </form>
        </div>
    );
}