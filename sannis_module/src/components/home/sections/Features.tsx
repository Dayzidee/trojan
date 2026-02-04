import React from 'react';
import Section from '../../ui/Section';
import Container from '../../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import { BentoGrid, BentoGridItem } from '../ui/BentoGrid';
import {
    Copy,
    ShieldCheck,
    Bell,
    Database,
    HeadphonesIcon,
    List,
    Activity,
    CreditCard,
    TrendingUp,
    Zap,
    Users
} from 'lucide-react';

const Features = () => {
    return (
        <Section className="py-24 relative overflow-hidden bg-black">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-green-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

            <Container>
                <SectionHeader
                    title="Everything you need to"
                    highlight="escape the trenches."
                    subtitle="From advanced order types to real-time analytics, we provide the toolkit for the modern onchain trader."
                />

                {/* Primary Features - Bento Grid */}
                <BentoGrid className="mb-24">
                    <BentoGridItem
                        title={<span className="text-xl font-bold text-white">Market Orders</span>}
                        description={<span className="text-gray-400">Buy and Sell at the speed of Trojan. Fully optimized to ensure you're first, every trade.</span>}
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 overflow-hidden relative group-hover/bento:border-green-500/30 transition-colors">
                                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500"></div>
                                <img src="/assets/A5sD1PzsziMGJkceXN9XhAexM8.webp" alt="Market Orders" className="w-full h-full object-cover opacity-60 group-hover/bento:scale-105 transition-transform duration-500" />
                            </div>
                        }
                        className="md:col-span-2 bg-neutral-900/30"
                        icon={<Zap className="h-6 w-6 text-green-400" />}
                    />
                    <BentoGridItem
                        title={<span className="text-xl font-bold text-white">Limit & DCA</span>}
                        description={<span className="text-gray-400">Deploy your strategy onchain with precision using Limit Orders or DCA.</span>}
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 overflow-hidden relative group-hover/bento:border-blue-500/30 transition-colors">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500"></div>
                                <img src="/assets/3T9p0m8vlNAHqUSzCID9b87gXv8.webp" alt="Limit Orders" className="w-full h-full object-cover opacity-60 group-hover/bento:scale-105 transition-transform duration-500" />
                            </div>
                        }
                        className="md:col-span-1 bg-neutral-900/30"
                        icon={<List className="h-6 w-6 text-blue-400" />}
                    />
                    <BentoGridItem
                        title={<span className="text-xl font-bold text-white">Multi-Wallet</span>}
                        description={<span className="text-gray-400">Place orders across multiple wallets. Distribute and consolidate in clicks.</span>}
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 overflow-hidden relative group-hover/bento:border-purple-500/30 transition-colors">
                                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500"></div>
                                <img src="/assets/s8oe11se4VnNh5xdAR1g7nF8nk.webp" alt="Multi-Wallet" className="w-full h-full object-cover opacity-60 group-hover/bento:scale-105 transition-transform duration-500" />
                            </div>
                        }
                        className="md:col-span-1 bg-neutral-900/30"
                        icon={<Users className="h-6 w-6 text-purple-400" />}
                    />
                    <BentoGridItem
                        title={<span className="text-xl font-bold text-white">Trenches</span>}
                        description={<span className="text-gray-400">Every new token, every platform, all on one page. Find your edge with fast data.</span>}
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 overflow-hidden relative group-hover/bento:border-orange-500/30 transition-colors">
                                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500"></div>
                                <img src="/assets/v8FfaO10XQjY4JMXwC5xe9i4xqU.webp" alt="Trenches" className="w-full h-full object-cover opacity-60 group-hover/bento:scale-105 transition-transform duration-500" />
                            </div>
                        }
                        className="md:col-span-2 bg-neutral-900/30"
                        icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
                    />
                </BentoGrid>

                {/* Secondary Features - Grid */}
                <SectionHeader
                    title="Advanced Tools"
                    subtitle="Power user features for the demanding trader."
                    align="left"
                    className="mb-10 pl-2 border-l-4 border-green-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: 'Copy Trading', desc: "Copy a wallet’s buys and sells with precision.", icon: Copy, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
                        { title: 'Token Audits', desc: "Instant insights to contract functions and safety.", icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
                        { title: 'Real-Time Alerts', desc: "The most important notifications you need in-app.", icon: Bell, color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
                        { title: 'Most Complete Data', desc: "Access years of onchain history. Every buy, sell, mint.", icon: Database, color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
                        { title: '24/7 Support', desc: "Live support whenever you need it.", icon: HeadphonesIcon, color: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-400/20' },
                        { title: 'Watchlists', desc: "Quickly create, label, and organize lists.", icon: List, color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
                        { title: 'Perpetuals', desc: "Trade perpetuals directly onchain with speed.", icon: Activity, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
                        { title: 'Custom PNL Cards', desc: "Flex your holdings with curated PNL cards.", icon: CreditCard, color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
                    ].map((feature, idx) => (
                        <div key={idx} className="group p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${feature.bg}`}>
                                <feature.icon size={24} className={feature.color} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

            </Container>
        </Section>
    );
};

export default Features;
