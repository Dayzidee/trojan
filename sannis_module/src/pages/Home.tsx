// @ts-nocheck
import React from 'react';
import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import Features from '../components/home/Features';
import PnLCards from '../components/home/PnLCards';
import FAQ from '../components/home/FAQ';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen">
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
