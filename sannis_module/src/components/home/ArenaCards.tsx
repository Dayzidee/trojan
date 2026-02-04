import React from 'react';

// Data for the 'Arena' cards - these seem to be community/project cards based on the assets.
const ARENA_CARDS = [
    { name: 'MonkeDAO', image: '/assets/Q7NstazpHc4nXKpsI8mixDq1I.webp' },
    { name: 'Boryoku', image: '/assets/t0j6zukNGRyKTQDholuuCc5htnw.webp' },
    { name: 'Slerf', image: '/assets/JsiLO9qUM40gvqjU0zZldg0qH6k.webp' },
    { name: 'Play Solana', image: '/assets/HKzHdIz9njaXRL1ZFruuC114H18.webp' },
    { name: 'Portals', image: '/assets/WBOH0L6vw044HtI6GOVPUedXp5k.webp' },
    { name: 'Fwog', image: '/assets/rgrrH2efcfNGK5TELfuJ7jzcxA.png' },
    { name: 'Mew', image: '/assets/zjYAYkO6ADs90QGxiB3I8melYw.png' },
    { name: 'Wif', image: '/assets/ReTjjtrfaM02JzJVBOxaRA8bdjw.png' },
    { name: 'Wen', image: '/assets/hrQTr1HiIXp42zkcfKqHSk03BlE.png' },
    { name: 'Stanley', image: '/assets/tQbG8MxeCvsS3ibRevsjynaeAQ.png' },
    { name: 'Labubu', image: '/assets/8KyBMOu6Ju8SmF4Qv7LRiKWHdiE.png' },
    { name: 'Tremp', image: '/assets/jzL64PbXM6s2421vihWE3GabVA.png' },
];

const ArenaCards = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ARENA_CARDS.map((card, index) => (
                <div
                    key={index}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <img
                        src={card.image}
                        alt={card.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-white text-sm font-bold">{card.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArenaCards;
