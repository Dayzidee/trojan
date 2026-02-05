import React from 'react';
import { Container } from './ui/Container';
import { ChevronDown, ExternalLink, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
            <Container className="h-20 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <img
                        src="https://framerusercontent.com/images/i9OyPSrgzIrCX31I4IvuJ2jDl4.svg?width=53&height=64"
                        alt="Trojan Horse"
                        className="w-8 h-8 object-contain h-auto"
                    />
                    <span className="font-bold text-xl tracking-[0.1em] text-white">TROJAN</span>
                </div>

                {/* Navigation Links - Hidden on Mobile */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/60">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#communities" className="hover:text-white transition-colors">Communities</a>
                    <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/terminal')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-medium transition-all"
                    >
                        Launch App
                        <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                </div>
            </Container>
        </header>
    );
}
