import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PublicLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow">
                <Outlet /> {/* Child routes will render here */}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout; 