import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isTerminal = location.pathname.startsWith('/terminal');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Don't show this marketing header on the terminal page if it has its own header, 
    // but based on valid routes, we might want a unified header or switch. 
    // For now, consistent marketing header.

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#010409]/95 backdrop-blur-md border-b border-[#8E949D]/10 py-5`}
            >
                <Container>
                    <div className="flex items-center justify-between">
                        {/* Logo & Nav Wrapper */}
                        <div className="flex items-center gap-12">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 lg:w-[53px] lg:h-[64px] relative">
                                    <img
                                        src="/assets/i9OyPSrgzIrCX31I4IvuJ2jDl4.svg"
                                        alt="Trojan Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl lg:text-2xl font-bold text-white tracking-tight leading-none">TROJAN</span>
                                </div>
                            </Link>

                            {/* Desktop Nav - Next to Logo as per snippet layout hints */}
                            <nav className="hidden lg:flex items-center gap-8">
                                <a href="#features" className="text-[14px] font-medium text-[#8E949D] hover:text-[#C9CCD1] transition-colors font-['Inter']">Features</a>
                                <a href="#partners" className="text-[14px] font-medium text-[#8E949D] hover:text-[#C9CCD1] transition-colors font-['Inter']">Communities</a>
                                <a href="#faqs" className="text-[14px] font-medium text-[#8E949D] hover:text-[#C9CCD1] transition-colors font-['Inter']">FAQs</a>
                            </nav>
                        </div>

                        {/* Actions */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link
                                to="/terminal"
                                className="group flex items-center gap-2 px-6 py-2.5 bg-[#0D1015] border border-[#8E949D]/10 text-[#C9CCD1] font-medium text-[14px] rounded-lg transition-all hover:bg-[#1A1E24] hover:border-[#8E949D]/20 hover:text-white"
                            >
                                <span>Launch App</span>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-70 group-hover:opacity-100 transition-opacity">
                                    <path d="M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 3H11V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </Container>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};

export default Header;
