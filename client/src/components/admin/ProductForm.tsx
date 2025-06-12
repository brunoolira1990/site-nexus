import React, { useState, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
}

// This is the data shape the form will manage internally
interface ProductFormData {
    id?: number;
    name: string;
    description: string;
    long_description: string;
    image_url: string;
    specifications: Record<string, any>;
    category_id: number | null; // Allow null for initial state
}

// This is the data shape the onSave callback expects, matching the API
type ProductSaveData = Omit<ProductFormData, 'id' | 'category_id'> & { category_id: number };


interface ProductFormProps {
    product?: ProductFormData | null;
    categories: Category[];
    onSave: (product: ProductSaveData) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSave, onCancel }) => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        long_description: '',
        image_url: '',
        specifications: {},
        category_id: null,
    });
    const [specificationsString, setSpecificationsString] = useState('{}');


    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                category_id: product.category_id,
            });
            setSpecificationsString(JSON.stringify(product.specifications, null, 2));
        } else {
            // Reset form for new product
            setFormData({
                name: '',
                description: '',
                long_description: '',
                image_url: '',
                specifications: {},
                category_id: categories.length > 0 ? categories[0].id : null,
            });
            setSpecificationsString('{}');
        }
    }, [product, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSpecificationsString(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const parsedSpecifications = JSON.parse(specificationsString);
            if (formData.category_id === null) {
                alert('Please select a category.');
                return;
            }

            const dataToSave: ProductSaveData = {
                name: formData.name,
                description: formData.description,
                long_description: formData.long_description,
                image_url: formData.image_url,
                specifications: parsedSpecifications,
                category_id: formData.category_id,
            };
            onSave(dataToSave);
        } catch (error) {
            alert('Specifications must be valid JSON.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id ?? ''}
                    onChange={(e) => setFormData(prev => ({...prev, category_id: Number(e.target.value) }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="long_description" className="block text-sm font-medium text-gray-700">Long Description</label>
                <textarea
                    id="long_description"
                    name="long_description"
                    value={formData.long_description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">Specifications (JSON)</label>
                <textarea
                    id="specifications"
                    name="specifications"
                    value={specificationsString}
                    onChange={handleSpecChange}
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder='{ "key": "value" }'
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Save
                </button>
            </div>
        </form>
    );
};

export default ProductForm; 