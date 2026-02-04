import React from 'react';

const FEATURES = [
    {
        title: 'Market Orders',
        description: "Buy and Sell at the speed of Trojan. Fully optimized to ensure you're first, every trade.",
        image: '/assets/A5sD1PzsziMGJkceXN9XhAexM8.webp',
        className: 'md:col-span-12 lg:col-span-8',
    },
    {
        title: 'Limit & DCA Orders',
        description: "Deploy your strategy onchain with precision using Trojan’s Limit Orders or DCA automations.",
        image: '/assets/3T9p0m8vlNAHqUSzCID9b87gXv8.webp',
        className: 'md:col-span-6 lg:col-span-4',
    },
    {
        title: 'Multi-Wallet',
        description: "Place orders across multiple wallets. Distribute, consolidate, and withdraw in just a few clicks.",
        image: '/assets/s8oe11se4VnNh5xdAR1g7nF8nk.webp',
        className: 'md:col-span-6 lg:col-span-4',
    },
    {
        title: 'Trenches',
        description: "Every new token, every platform, all on one page. Find your edge with fast data.",
        image: '/assets/v8FfaO10XQjY4JMXwC5xe9i4xqU.webp',
        className: 'md:col-span-12 lg:col-span-8',
    },
    {
        title: 'Social Tracker',
        description: "Breaking news in real time, with instant alerts as it unfolds. Now including TruthSocial.",
        image: '/assets/o05IvQDZGEo8SQEPuYVzt19YzI.webp',
        className: 'md:col-span-6 lg:col-span-4',
    },
    {
        title: 'Wallet Tracker',
        description: "Track any wallet with custom tags, real-time alerts, and a streaming list of activity.",
        image: '/assets/VEbHirs4Tokbnns0MWWwQMOgQKA.webp',
        className: 'md:col-span-6 lg:col-span-4',
    },
    {
        title: 'Wallet Analyzer',
        description: "Instantly gain valuable insights into any wallet’s activity, holdings, and performance.",
        image: '/assets/wT3ANfljcm0Hpwe97eZ9Fe2oeI.webp',
        className: 'md:col-span-12 lg:col-span-4', // Adjusted to span 4 to match grid flow or 12 for full width on mobile
    },
];

const CoreFeatures = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
            {FEATURES.map((feature, idx) => (
                <div
                    key={idx}
                    className={`relative group overflow-hidden rounded-3xl bg-gray-900/50 border border-white/10 ${feature.className} min-h-[400px] flex flex-col justify-end p-8 transition-all hover:border-white/20`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-lg">
                        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoreFeatures;
