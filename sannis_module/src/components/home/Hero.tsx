import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Container from '../ui/Container';
import HeroWallets from './HeroWallets';
import './Hero.css';

const Hero = () => {
  return (
    <Section className="relative overflow-hidden min-h-screen flex flex-col items-center pt-32 pb-20">
      <Container className="flex flex-col items-center text-center z-10 relative max-w-4xl mx-auto">

        {/* Trojan Logo (Centered) */}
        <div className="mb-8 animate-fade-in-up flex justify-center">
          <img
            src="/assets/0jFf17uSgqGoLNoLVets7WrCspI.svg"
            alt="Trojan Logo"
            className="h-16 w-auto" // Slightly larger as per reference
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight mb-8 animate-fade-in-up delay-100 text-white leading-[1.1]">
          Your Ultimate Onchain<br />
          Trading Experience
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#8E949D] max-w-2xl mb-12 animate-fade-in-up delay-200 leading-relaxed font-medium">
          <span className="text-[#C9CCD1]">The best onchain tools. Your edge in the arena.</span>{' '}
          Buy, sell and snipe instantly with Trojan. Exclusive real-time data and automation.
        </p>

        {/* CTA Buttons - Exact Replica */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16 animate-fade-in-up delay-300">
          {/* Watch Video - Dark Grey */}
          <button className="h-[48px] px-6 rounded-lg bg-[#181C20] hover:bg-[#22262a] text-[#C9CCD1] font-medium text-[14px] transition-colors flex items-center justify-center">
            Watch Video
          </button>

          {/* Start Trading - White */}
          <Link
            to="/terminal"
            className="h-[48px] px-6 rounded-lg bg-[#F7F8F9] hover:bg-white text-[#010409] font-medium text-[14px] transition-colors flex items-center gap-2"
          >
            Start Trading
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M14 5.75L20.25 12L14 18.25M19.5 12H3.75" />
            </svg>
          </Link>
        </div>

        {/* Wallets - Reusing Component but ensuring styling matches */}
        <div className="mb-20 animate-fade-in-up delay-500">
          <HeroWallets />
        </div>

        {/* Dashboard Preview - Kept as floating element below */}
        <div className="relative w-full rounded-xl animate-fade-in-up delay-700 floating perspective-1000">
          <div className="premium-card p-2 rounded-2xl border border-white/5 bg-[#121212]/50">
            <img
              src="/assets/FAzhbjgCtYndiyvcGW2aBof5WGk.webp"
              alt="Trojan Terminal Dashboard"
              className="w-full h-auto rounded-xl shadow-2xl hero-dashboard-image opacity-90"
            />
          </div>
        </div>

      </Container>
      {/* Background Gradient Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </Section>
  );
};

export default Hero;
