// @ts-nocheck
import React from 'react';
import Hero from '../components/home/sections/Hero';
import Partners from '../components/home/sections/Partners';
import Features from '../components/home/sections/Features';
import PnLCards from '../components/home/sections/PnLCards';
import FAQ from '../components/home/sections/FAQ';
import CallToAction from '../components/home/sections/CallToAction';

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500/30">
            <Hero />
            <Partners />
            <Features />
            <PnLCards />
            <FAQ />
            <CallToAction />
        </div>
    );
};

export default Home;
