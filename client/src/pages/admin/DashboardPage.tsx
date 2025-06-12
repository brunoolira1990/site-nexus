import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Manage Categories Card */}
                <Link to="/admin/categories" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Manage Categories</h2>
                    <p className="font-normal text-gray-700">Add, edit, or delete product categories.</p>
                </Link>

                {/* Manage Products Card */}
                <Link to="/admin/products" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Manage Products</h2>
                    <p className="font-normal text-gray-700">Add, edit, or delete products.</p>
                </Link>

                {/* Placeholder for Manage Blog Posts */}
                <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow opacity-50 cursor-not-allowed">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Manage Blog Posts</h2>
                    <p className="font-normal text-gray-700">Coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage; 