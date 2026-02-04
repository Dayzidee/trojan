import React from 'react';

// Using a mix of icons or text if SVGs are unavailable directly.
// In a real scenario, we'd fetch these SVGs. For now, text is cleaner than broken SVGs.
// However, I will check if I can use the existing SVG logic from before but slightly improved.
// Since the user says "looks horrible", broken logos are likely part of it.
// I will use a high quality text representation for now as it is safest and looks premium.

const PARTNERS = [
    { name: 'Solana', color: 'hover:text-[#9945FF]' },
    { name: 'Privy', color: 'hover:text-blue-500' },
    { name: 'MoonPay', color: 'hover:text-[#7D4CDB]' },
    { name: 'World Liberty Financial', color: 'hover:text-gold' },
    { name: 'deBridge', color: 'hover:text-blue-400' },
    { name: 'DFlow', color: 'hover:text-purple-400' },
    { name: 'Switchboard', color: 'hover:text-cyan-400' },
    { name: 'Titan', color: 'hover:text-white' },
    { name: 'Raydium', color: 'hover:text-[#14F195]' },
    { name: 'Helius', color: 'hover:text-orange-500' },
    { name: 'Bubblemaps', color: 'hover:text-pink-500' },
    { name: 'Triton', color: 'hover:text-blue-600' },
    { name: 'TradingView', color: 'hover:text-blue-600' },
];

const PartnerLogos = () => {
    return (
        <div className="w-full overflow-hidden">
            {/* Gradient fade masks */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-16">
                {PARTNERS.map((partner) => (
                    <div
                        key={partner.name}
                        className={`text-xl md:text-2xl font-bold text-gray-600 transition-colors duration-300 ${partner.color} cursor-default select-none`}
                    >
                        {partner.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerLogos;
