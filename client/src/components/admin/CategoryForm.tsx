import React, { useState, useEffect } from 'react';

interface CategoryFormProps {
    onSubmit: (name: string) => void;
    initialData?: { name: string };
    isLoading: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialData, isLoading }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Category Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-nexus-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-blue disabled:bg-nexus-blue-light transition duration-300"
            >
                {isLoading ? 'Saving...' : 'Save Category'}
            </button>
        </form>
    );
};

export default CategoryForm; 