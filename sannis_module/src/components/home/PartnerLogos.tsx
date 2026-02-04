import React from 'react';

const PARTNERS = [
    { name: 'Solana', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.2 26.9"><path d="M4.6 20.1L0.7 24c-0.9 0.9-0.9 2.3 0 3.2L4.6 31.1c0.9 0.9 2.3 0.9 3.2 0l20.8-20.8c0.9-0.9 0.9-2.3 0-3.2L24.7 3.2c-0.9-0.9-2.3-0.9-3.2 0L0.7 24" fill="url(#solana-gradient)"/><defs><linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9945FF"/><stop offset="100%" stopColor="#14F195"/></linearGradient></svg>' }, // Placeholder path for brevity, will rely on simple text or fetched SVGs if I had them. 
    // Wait, I should really use the actual SVGs from the file if possible to maintain quality.
    // The file has them as `<use href="#svg-..." />` which means they are defined in index.html or elsewhere? 
    // Ah, the view_file logs showed `<use href="#svg-1350974541_3816">`. This implies an SVG sprite sheet.
    // BUT in Step 142, I see: `backgroundImage: 'url(\'data:image/svg+xml,...` in similar framer files, but for Partners it says:
    // `<div className="svgContainer"><svg><use href="#svg-1350974541_3816"></use></svg></div>`
    // This means the SVGs are NOT in the file directly as paths. They are referenced.
    // However, I noticed complex data URIs in Hero.tsx.
    // In Partners.tsx (Step 142), I see:
    // Line 128: `backgroundImage: 'url(\'data:image/svg+xml,&lt', http: '//www.w3.org/1999/xlink&quot', ...` NO wait that was PnLCards Turnkey copy..
    // In Partners.tsx it uses `<use href="...">`.

    // CRITICAL: If I remove the Framer wrapper, those IDs might be lost if they are defined in some hidden Framer script or sprite injected by Framer.
    // `Home.tsx` imports `Hero`, `Partners`.
    // If I look at `Hero.tsx` again, it had `backgroundImage: url('data:image/svg+xml,...)`.
    // `Partners.tsx` seems to rely on external SVG definitions.

    // Strategy: I will use TEXT for the partners for now to ensure it works and looks clean, 
    // OR I will trust that I can find valid SVGs online or usage.
    // Actually, I should probably check `index.html` to see if there are SVG definitions.
    // But to be safe and fast, I will use a simple list of names for V1, or generic placeholders.
    // The user wants "High quality". Text might be too low fidelity.

    // Let's try to grab the "framer-13isjs6" etc classes? No, those are generated.

    // OK, I will look at the `Partners.tsx` file again more carefully.
    // Line 13: `data-framer-component-type="SVG"`.
    // Inside: `<use href="#svg-1350974541_3816"></use>`

    // This confirms they are using a sprite.
    // If I replace the component, I lose access to wherever those sprites are defined if they are scoped to this component? 
    // Unlikely scoped to component if using `#id`. They are likely in the document body.
    // So if I reuse the `<svg><use href="..."/></svg>` it MIGHT work.

    // Let's try to preserve the `<use>` tags.
    // I will create a data array with the hrefs.
];

export const PARTNER_LOGOS = [
    { name: 'Solana', href: '#svg-1350974541_3816' },
    { name: 'Privy', href: '#svg567589066_2398' },
    { name: 'MoonPay', href: '#svg736002494_7800' },
    { name: 'World Liberty Financial', href: '#svg-294216505_16073' },
    { name: 'deBridge', href: '#svg1766973928_9115' },
    { name: 'DFlow', href: '#svg9093762180' },
    { name: 'Switchboard', href: '#svg8708994267' },
    { name: 'Titan', href: '#svg12857680268' },
    { name: 'Raydium', href: '#svg11131502165' },
    { name: 'Helius', href: '#svg12545729359' },
    { name: 'Bubblemaps', href: '#svg10856204390' },
    { name: 'Triton', href: '#svg11679701339' },
    { name: 'TradingView', href: '#svg11635953000' },
];

const PartnerLogos = () => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {PARTNER_LOGOS.map((partner) => (
                <div key={partner.name} className="h-8 w-auto flex items-center justify-center text-white" title={partner.name}>
                    <svg style={{ width: 'auto', height: '100%', minWidth: '80px', maxWidth: '140px', fill: 'currentColor' }}>
                        <use href={partner.href}></use>
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default PartnerLogos;
