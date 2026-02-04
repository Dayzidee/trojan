import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import ArenaCards from './ArenaCards';

const PnLCards = () => {
  return (
    <Section className="bg-gradient-to-b from-black to-[#050505] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div className="flex flex-col items-center mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 mb-6 border border-green-500/30 rounded-full bg-green-500/10 backdrop-blur-sm">
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Welcome To</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight uppercase font-display">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Arena</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Climb the ranks and compete with the best traders in the ecosystem.
            </p>
          </div>

          {/* Hero Banner Image for Arena */}
          <div className="relative w-full max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="/assets/A3be2DMeN6XcN5sFmw6Q7KFv0.webp"
              alt="The Arena Banner"
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20">
              <div className="flex items-center gap-2 text-white font-bold text-lg md:text-xl">
                <img src="/assets/ULCAfmLVjzh5wfAhV1XhgS7w.webp" alt="Turnkey" className="h-8 w-auto" />
                <span>Powered by Turnkey</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community/Project Cards Grid */}
        <div className="relative">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">Join the Community</h3>
          </div>
          <ArenaCards />
        </div>
      </Container>
    </Section>
  );
};

export default PnLCards;
