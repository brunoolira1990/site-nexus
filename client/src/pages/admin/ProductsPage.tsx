import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/admin/Modal';
import ProductForm from '../../components/admin/ProductForm';

// Define the Product and Category types
interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    long_description: string;
    image_url: string;
    specifications: Record<string, any>;
    category_id: number;
    category_name?: string; 
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const { token } = useAuth();
    
    const fetchProductsAndCategories = async () => {
        setLoading(true);
        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (!productsResponse.ok) throw new Error('Failed to fetch products');
            if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');

            const productsData: Omit<Product, 'category_name'>[] = await productsResponse.json();
            const categoriesData: Category[] = await categoriesResponse.json();
            
            setCategories(categoriesData);

            const productsWithCategories = productsData.map(product => ({
                ...product,
                category_name: categoriesData.find(c => c.id === product.category_id)?.name || 'N/A'
            }));

            setProducts(productsWithCategories);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProductsAndCategories();
    }, [token]);

    const handleOpenModal = (product: Product | null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const handleSave = async (productData: Omit<Product, 'id' | 'category_name'>) => {
        const method = editingProduct ? 'PUT' : 'POST';
        const url = editingProduct 
            ? `${import.meta.env.VITE_API_URL}/api/products/${editingProduct.id}`
            : `${import.meta.env.VITE_API_URL}/api/products`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to save product`);
            }
            
            await fetchProductsAndCategories(); // Re-fetch data to show changes
            handleCloseModal();

        } catch (err: any) {
            setError(err.message);
        }
    };
    
    const handleDelete = async (productId: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                
                // Optimistically update UI or re-fetch
                setProducts(products.filter(p => p.id !== productId));

            } catch (err: any) {
                setError(err.message);
            }
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
            <div className="mb-4">
                <button 
                    onClick={() => handleOpenModal(null)}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Add New Product
                </button>
            </div>
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.category_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap max-w-sm truncate" title={product.description}>{product.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
            >
                <ProductForm
                    product={editingProduct}
                    categories={categories}
                    onSave={handleSave}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default ProductsPage; 