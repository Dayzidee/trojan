import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../../ui/Section';
import Container from '../../ui/Container';

const CallToAction = () => {
    return (
        <Section className="relative bg-black overflow-hidden py-32">
            {/* Background Nebula Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-900/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen opacity-30 animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-20"></div>

            <Container className="relative z-10 flex flex-col items-center">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85] font-display uppercase">
                        TRADE WITH <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">ACCELERATED SPEED</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Our architecture is built from the ground-up to be the fastest and most accurate on the market. Precision at scale.
                    </p>

                    <Link
                        to="/terminal"
                        className="group relative inline-flex items-center px-12 py-6 rounded-full bg-white text-black font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:shadow-[0_0_100px_rgba(255,255,255,0.4)]"
                    >
                        <span className="relative z-10 uppercase tracking-widest">Trade Instantly</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-50"></div>
                    </Link>
                </div>

                <div className="relative w-full max-w-4xl mx-auto transform transition-transform duration-700 hover:scale-[1.02]">
                    <div className="absolute -inset-4 bg-blue-500/10 rounded-[4rem] blur-3xl opacity-20"></div>
                    <img
                        src="/assets/YxGM1P3AhNye15q5wC4k8BNoeSs.png"
                        alt="Trojan Mascots"
                        className="w-full h-auto object-cover relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-40 bottom-0 z-20"></div>
                </div>
            </Container>
        </Section>
    );
};

export default CallToAction;
