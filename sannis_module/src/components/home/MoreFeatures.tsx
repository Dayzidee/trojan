import React from 'react';
import {
    Copy,
    ShieldCheck,
    Bell,
    Database,
    HeadphonesIcon,
    List,
    Activity,
    CreditCard
} from 'lucide-react';

const MORE_FEATURES = [
    {
        title: 'Copy Trading',
        description: "Copy a wallet’s buys and sells with precision and endless customizable options.",
        icon: Copy,
        color: 'text-blue-400',
        bg: 'group-hover:bg-blue-500/10'
    },
    {
        title: 'Token Audits',
        description: "Instant insights to contract functions, sniped and bundled percentages, top holders and more.",
        icon: ShieldCheck,
        color: 'text-green-400',
        bg: 'group-hover:bg-green-500/10'
    },
    {
        title: 'Real-Time Alerts',
        description: "The most important notifications you need in-app, from tracked wallet trades to migration alerts.",
        icon: Bell,
        color: 'text-yellow-400',
        bg: 'group-hover:bg-yellow-500/10'
    },
    {
        title: 'Most Complete Data',
        description: "Access years of onchain history. Every buy, sell, mint, burn, and more, on even the oldest tokens.",
        icon: Database,
        color: 'text-purple-400',
        bg: 'group-hover:bg-purple-500/10'
    },
    {
        title: '24/7 Support',
        description: "Live support whenever you need it. Our support team is standing by to answer your questions.",
        icon: HeadphonesIcon,
        color: 'text-pink-400',
        bg: 'group-hover:bg-pink-500/10'
    },
    {
        title: 'Watchlists',
        description: "Quickly create, label, and organize lists of tickers to keep track of potential gems.",
        icon: List,
        color: 'text-orange-400',
        bg: 'group-hover:bg-orange-500/10'
    },
    {
        title: 'Perpetuals',
        description: "Trade perpetuals directly onchain with speed, precision, and zero compromise.",
        icon: Activity,
        color: 'text-red-400',
        bg: 'group-hover:bg-red-500/10'
    },
    {
        title: 'Custom PNL Cards',
        description: "Flex your holdings with a collection of curated Trojan originals, or use your own. You choose.",
        icon: CreditCard,
        color: 'text-cyan-400',
        bg: 'group-hover:bg-cyan-500/10'
    },
];

const MoreFeatures = () => {
    return (
        <div className="mt-32 relative">
            {/* Background glow for this section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-0"></div>

            <div className="relative z-10 text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Everything you need to <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">escape the trenches.</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {MORE_FEATURES.map((feature, idx) => (
                    <div
                        key={idx}
                        className="group relative p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:translate-y-[-4px] hover:shadow-2xl"
                    >
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${feature.bg}`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.color}`}>
                                <feature.icon size={24} />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreFeatures;
