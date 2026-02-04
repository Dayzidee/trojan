import React from 'react';
import { Link } from 'react-router-dom';
import HeroWallets from './HeroWallets';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen bg-black flex flex-col items-center overflow-hidden font-sans bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]">
            
            {/* 1. Top Spacing: Pushing content down significantly (approx 200px+) */}
            <div className="w-full pt-[100px] pb-20 flex flex-col items-center px-4">

                {/* 2. Logo Section */}
                {/* Matches framer-15n7jim */}
                <div className="mb-12 animate-fade-in flex justify-center">
                    <div className="w-[52px] h-[64px]">
                        <img
                            src="/assets/0jFf17uSgqGoLNoLVets7WrCspI.svg" 
                            alt="Trojan Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* 3. Title & Subtitle Section */}
                {/* Matches framer-jbb1e4 */}
                <div className="flex flex-col items-center text-center max-w-[800px] mb-12">
                    
                    {/* H1 Title */}
                    <h1 className="text-white text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                        Your Ultimate <br />Onchain
                        Trading <br /> Experience
                    </h1>

                    {/* Subtext with Specific Colors from your HTML */}
                    {/* Color 1: rgb(201, 204, 209) -> text-[#C9CCD1] */}
                    {/* Color 2: rgb(142, 148, 157) -> text-[#8E949D] */}
                    <p className="text-[18px] md:text-[20px] leading-[1.6] font-medium">
                        <span className="text-[#C9CCD1]">The best onchain tools. Your edge in the arena.<br /></span>{' '}
                        <span className="text-[#8E949D]">
                            Buy, sell and snipe<br className="hidden sm:block" /> instantly with Trojan. <br /> Exclusive real-time data and automation.
                        </span>
                    </p>
                </div>

                {/* 4. Actions Section (Vertical Stack) */}
                {/* Matches framer-1790n1k -> framer-1dkxpx6 */}
                <div className="flex flex-col items-center gap-5 mb-20 w-full">
                    
                    {/* "Watch Video" - Top of stack, small text */}
                    {/* Color: rgb(201, 204, 209) -> text-[#C9CCD1] */}
                    <button className="text-[#C9CCD1] text-[14px] font-medium tracking-[-0.01em] hover:text-white transition-colors">
                        Watch Video
                    </button>

                    {/* "Start Trading" - Bottom of stack, White Button */}
                    {/* Background: rgb(247, 248, 249) -> bg-[#F7F8F9] */}
                    {/* Text: rgb(1, 4, 9) -> text-[#010409] */}
                    {/* Border Radius: 10px -> rounded-[10px] */}
                    <Link
                        to="/terminal"
                        className="group flex items-center justify-center gap-2 w-[350px] sm:w-auto px-10 h-[40px] bg-[#F7F8F9] rounded-[10px] text-[#010409] font-medium text-[14px] hover:bg-white hover:scale-[1.02] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <span>Start Trading</span>
                        {/* Exact SVG Icon from your HTML */}
                        <div className="flex items-center justify-center w-5 h-5">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    stroke="currentColor" 
                                    strokeLinecap="square" 
                                    d="M14 5.75L20.25 12L14 18.25M19.5 12H3.75" 
                                    strokeWidth="2.5" 
                                />
                            </svg>
                        </div>
                    </Link>
                </div>

                {/* 5. Wallets Section */}
                {/* Matches framer-1m9jhu8 */}
                <div className="w-full flex justify-center mb-24">
                    <div className="flex flex-wrap items-center justify-center gap-6 opacity-100">
                        <HeroWallets />
                    </div>
                </div>

                {/* 6. Dashboard Image */}
                <div className="relative w-full max-w-[1000px] perspective-[2000px] group">
                    <div className="relative rounded-t-2xl border-t border-x border-white/10 bg-[#0A0A0A] overflow-hidden">
                        <img
                            src="/assets/FAzhbjgCtYndiyvcGW2aBof5WGk.webp"
                            alt="Trojan Terminal Dashboard"
                            className="w-full h-auto object-cover opacity-100"
                        />
                         {/* Gloss Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;