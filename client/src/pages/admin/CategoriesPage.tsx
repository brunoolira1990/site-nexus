import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/admin/Modal';
import CategoryForm from '../../components/admin/CategoryForm';

// Define the Category type
interface Category {
    id: number;
    name: string;
    created_at: string;
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); // Assuming useAuth provides the token
    
    // State for modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data: Category[] = await response.json();
            setCategories(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenModal = (category: Category | null = null) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleFormSubmit = async (name: string) => {
        const url = editingCategory
            ? `${import.meta.env.VITE_API_URL}/api/categories/${editingCategory.id}`
            : `${import.meta.env.VITE_API_URL}/api/categories`;
        
        const method = editingCategory ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save category');
            }

            await fetchCategories(); // Re-fetch to show the new/updated data
            handleCloseModal();
        } catch (err: any) {
            setError(err.message);
            // Optionally, keep the modal open on error
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!response.ok) throw new Error('Failed to delete category');
                await fetchCategories(); // Re-fetch
            } catch (err: any) {
                setError(err.message);
            }
        }
    };

    if (loading && categories.length === 0) return <div>Loading...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Categories</h1>
                <button 
                    onClick={() => handleOpenModal()} 
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Add New Category
                </button>
            </div>
            <div className="bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(category.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenModal(category)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
            >
                <CategoryForm 
                    onSubmit={handleFormSubmit}
                    initialData={editingCategory ? { name: editingCategory.name } : undefined}
                    isLoading={loading}
                />
            </Modal>
        </div>
    );
};

export default CategoriesPage; 