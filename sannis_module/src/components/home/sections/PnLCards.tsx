import React from 'react';
import Section from '../../ui/Section';
import Container from '../../ui/Container';
import ArenaCards from './ArenaCards';

const PnLCards = () => {
    return (
        <Section className="bg-gradient-to-b from-black to-[#050505] overflow-hidden py-32 relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            {/* Radial Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="flex flex-col items-center mb-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-block px-5 py-2 mb-8 border border-green-500/30 rounded-full bg-green-500/10 backdrop-blur-sm animate-fade-in-up">
                            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Welcome To</span>
                        </div>

                        <h2 className="text-6xl md:text-8xl lg:text-[120px] font-black text-white mb-8 tracking-tighter uppercase font-display leading-[0.8] drop-shadow-2xl">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">ARENA</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Climb the ranks and compete with the best traders in the ecosystem.
                        </p>
                    </div>

                    {/* Hero Banner Image for Arena */}
                    <div className="relative w-full max-w-6xl mx-auto mb-24 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                        <img
                            src="/assets/A3be2DMeN6XcN5sFmw6Q7KFv0.webp"
                            alt="The Arena Banner"
                            className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                        />
                        {/* Turnkey Badge */}
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20">
                            <div className="flex items-center gap-3 text-white font-bold text-xl md:text-2xl bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 transition-colors hover:bg-black/80">
                                <img src="/assets/ULCAfmLVjzh5wfAhV1XhgS7w.webp" alt="Turnkey" className="h-8 w-auto" />
                                <span className="tracking-tight">Powered by Turnkey</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community/Project Cards Grid */}
                <div className="relative">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the Community</h3>
                        <p className="text-gray-500 text-lg">Connect with other traders in your favorite communities.</p>
                    </div>
                    <ArenaCards />
                </div>
            </Container>
        </Section>
    );
};

export default PnLCards;
