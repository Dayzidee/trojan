import { Container } from './ui/Container';

export function Footer() {
    return (
        <footer className="relative py-20 overflow-hidden bg-black text-white/60">
            {/* Massive Watermark */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-full pointer-events-none opacity-[0.03] select-none">
                <svg viewBox="0 0 100 20" className="w-full h-auto">
                    <text x="50" y="15" textAnchor="middle" fontSize="18" fontWeight="900" fill="currentColor" fontFamily="sans-serif">TROJAN</text>
                </svg>
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-lg font-bold mb-6">Trojan Onchain</h3>
                        <p className="max-w-sm mb-6">
                            The fastest, most secure terminal to buy, sell, trade and snipe crypto and meme coins onchain.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-brand-green transition-colors">Terminal</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">The Arena</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">Documentation</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Socials</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-brand-green transition-colors">Twitter / X</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">Telegram</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">Discord</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Trojan. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Built with precision.</p>
                </div>
            </Container>
        </footer>
    );
}
