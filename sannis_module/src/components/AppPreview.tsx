import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from './ui/Container';

const tabs = [
    {
        id: 'trade',
        label: 'Trade',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M1.83333 3.16667V12.8333H14.1667" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M4.5 10.1667L7.33333 7.33333L8.66667 8.66666L12.5025 4.83081" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M9.83333 4.5H12.8333V7.5" stroke-width="1.5"></path>
            </svg>
        )
    },
    {
        id: 'trenches',
        label: 'Trenches',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="miter" stroke="currentColor" d="M4.57407 8.83333H2.16666L4.16666 5.16666H7.48613M4.57407 8.83333L7.16666 11.4259M4.57407 8.83333L7.48613 5.16666M7.48613 5.16666C9.3704 3.11111 11.4259 1.83333 14.1667 1.83333C14.1667 4.57407 12.8889 6.62962 10.8333 8.51386M7.16666 11.4259V13.8333L10.8333 11.8333V8.51386M7.16666 11.4259L10.8333 8.51386M3.2037 14.1667H1.83333V12.7963C1.83333 12.0395 2.44686 11.4259 3.2037 11.4259C3.96054 11.4259 4.57407 12.0395 4.57407 12.7963C4.57407 13.5531 3.96054 14.1667 3.2037 14.1667Z" stroke-width="1.5"></path>
            </svg>
        )
    },
    {
        id: 'explorer',
        label: 'Explorer',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M8 8V7.16667C8 4.58934 5.91066 2.5 3.33333 2.5H2.5V3.33333C2.5 5.91066 4.58934 8 7.16667 8H8ZM8 8V13.5" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M13.5 4.5H12.6667C10.0893 4.5 8 6.58934 8 9.16667V10.1667H8.83333C11.4107 10.1667 13.5 8.07733 13.5 5.5V4.5Z" stroke-width="1.5"></path>
            </svg>
        )
    },
    {
        id: 'swap',
        label: 'Swap',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M2 10.6667L4.66667 13.3334L7.33333 10.6667M8.66667 5.33341L11.3333 2.66675L14 5.33341M4.66667 12.6667V2.66675M11.3333 13.3334V3.33341" stroke-width="1.5"></path>
            </svg>
        )
    },
    {
        id: 'trackers',
        label: 'Trackers',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M7.99999 12.8333C5.33062 12.8333 3.16666 10.6694 3.16666 8C3.16666 5.33063 5.33062 3.16667 7.99999 3.16667C10.6694 3.16667 12.8333 5.33063 12.8333 8C12.8333 10.6694 10.6694 12.8333 7.99999 12.8333Z" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M8 1.16667V5.50001" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M14.8333 8H10.5" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M8 10.5V14.8333" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M5.49999 8H1.16666" stroke-width="1.5"></path>
            </svg>
        )
    },
    {
        id: 'holdings',
        label: 'Holdings',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M10.8333 5.83333H4C3.17157 5.83333 2.5 5.16176 2.5 4.33333C2.5 3.32081 3.32081 2.5 4.33333 2.5H10.8333V5.83333ZM10.8333 5.83333H13.5V13.5H4.5C3.39543 13.5 2.5 12.6046 2.5 11.5V4.83333" stroke-width="1.5"></path>
                <path stroke-linejoin="miter" stroke="currentColor" stroke-linecap="square" d="M10.3333 9.16667C10.6094 9.16667 10.8333 9.39054 10.8333 9.66667C10.8333 9.94281 10.6094 10.1667 10.3333 10.1667C10.0572 10.1667 9.83331 9.94281 9.83331 9.66667C9.83331 9.39054 10.0572 9.16667 10.3333 9.16667Z" fill="#6C737C" stroke-width="0.5"></path>
            </svg>
        )
    },
    {
        id: 'analyzer',
        label: 'Analyzer',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="miter" stroke="currentColor" d="M7.99998 1.83333C4.59423 1.83333 1.83331 4.59424 1.83331 8C1.83331 11.4057 4.59423 14.1667 7.99998 14.1667C10.685 14.1667 12.9692 12.4507 13.8158 10.0555M7.99998 1.83333C11.4057 1.83333 14.1666 4.59424 14.1666 8C14.1666 8.72073 14.043 9.41259 13.8158 10.0555M7.99998 1.83333V8L13.8158 10.0555" stroke-width="1.5"></path>
            </svg>
        )
    }
];

export function AppPreview() {
    const [activeTab, setActiveTab] = useState('trade');
    const { scrollYProgress } = useScroll();

    // Parallax values
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <section className="relative py-20 overflow-hidden bg-[#050505]">
            <Container>
                {/* Tabs Wrapper */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center p-1 bg-[#0A0A0A] border border-white/5 rounded-2xl shadow-inner-white/5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                                    ${activeTab === tab.id ? 'text-white' : 'text-[#8E949D] hover:text-white/80'}
                                `}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="tab-bg"
                                        className="absolute inset-0 bg-[#181C20] border-t border-white/5 rounded-xl shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative z-10 transition-colors ${activeTab === tab.id ? 'text-white' : 'text-inherit'}`}>
                                    {tab.icon}
                                </span>
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Preview Window */}
                <div className="relative max-w-6xl mx-auto group">
                    <div className="relative aspect-[16/9] md:aspect-[1.8/1] rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-3xl">
                        {/* Main App Layer */}
                        <motion.div
                            style={{ y: y1 }}
                            className="absolute inset-0"
                        >
                            <img
                                src="https://framerusercontent.com/images/LM3palyokwWQ5n7OF77xx46BS4.webp?width=2592&height=1440"
                                alt="Trojan App Interface"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Floating Elements / Parallax Layer */}
                        <motion.div
                            style={{ y: y2 }}
                            className="absolute inset-x-0 inset-y-[-10%] z-20 pointer-events-none"
                        >
                            <img
                                src="https://framerusercontent.com/images/dh0bLqeJIGrC0g47DigkQMGtR5o.webp?width=5526&height=2880"
                                alt="Floating Trading Elements"
                                className="w-full h-full object-cover scale-110"
                            />
                        </motion.div>

                        {/* Top Bar / Scanline Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent z-30" />
                        <div className="absolute inset-0 border border-white/5 rounded-2xl z-40 pointer-events-none shadow-inner-white/10" />
                    </div>

                    {/* Background Ambience Underlap */}
                    <div className="absolute -inset-x-20 -bottom-20 h-64 bg-brand-green/5 blur-[120px] rounded-full opacity-50 z-0" />
                </div>
            </Container>
        </section>
    );
}
