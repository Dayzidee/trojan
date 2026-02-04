import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layout/Header';
import BottomNav from './BottomNav';
import Footer from './layout/Footer';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#010409]">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <BottomNav />
            <Footer />
        </div>
    );
};

export default Layout;
