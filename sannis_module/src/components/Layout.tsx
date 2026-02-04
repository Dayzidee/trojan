import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './layout/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
                    <div className="text-xl font-bold text-white">Trojan</div>
                    {/* Add simplified nav links here if needed, or stick to the Hero's nav */}
                </nav>
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
