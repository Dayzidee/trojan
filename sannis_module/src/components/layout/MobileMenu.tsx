import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Menu Content */}
            <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#0A0A0A] border-l border-white/10 shadow-xl transform transition-transform duration-300 ease-in-out p-6 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                        <img src="/assets/i9OyPSrgzIrCX31I4IvuJ2jDl4.svg" alt="Trojan" className="h-8 w-auto" />
                        <span className="text-xl font-bold text-white">Trojan</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-6">
                        <li>
                            <Link
                                to="/terminal"
                                className="block p-4 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-lg group"
                                onClick={onClose}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-green-400">Launch Terminal</span>
                                    <ChevronRight size={16} className="text-green-500 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-green-500/70">Access advanced trading tools</p>
                            </Link>
                        </li>

                        <li>
                            <a href="#features" className="text-lg font-medium text-gray-300 hover:text-white block py-2 border-b border-white/5" onClick={onClose}>Features</a>
                        </li>
                        <li>
                            <a href="#partners" className="text-lg font-medium text-gray-300 hover:text-white block py-2 border-b border-white/5" onClick={onClose}>Communities</a>
                        </li>
                        <li>
                            <a href="#faqs" className="text-lg font-medium text-gray-300 hover:text-white block py-2 border-b border-white/5" onClick={onClose}>FAQs</a>
                        </li>

                    </ul>
                </nav>

                <div className="pt-8 border-t border-white/10 mt-auto">
                    <div className="flex gap-4 justify-center">
                        {/* Social placeholders */}
                        <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors"></div>
                        <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors"></div>
                        <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors"></div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default MobileMenu;
