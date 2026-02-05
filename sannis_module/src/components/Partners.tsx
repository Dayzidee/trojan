import { Container } from './ui/Container';

const partners = [
    // Extracted from backup or inferred. Using logos from provided assets would be best if I extracted exact filenames.
    // I found "Q7NstazpHc4nXKpsI8mixDq1I.webp" for MonkeDAO.
    { name: "MonkeDAO", logo: "/assets/Q7NstazpHc4nXKpsI8mixDq1I.webp" },
    { name: "Trojan", logo: "https://framerusercontent.com/images/i9OyPSrgzIrCX31I4IvuJ2jDl4.svg" }, // From schema
    // Adding placeholders for effect as infinite loop needs multiple items
    { name: "Partner 1", logo: "" },
    { name: "Partner 2", logo: "" },
    { name: "Partner 3", logo: "" },
];

export function Partners() {
    return (
        <section className="py-20 border-y border-white/5 bg-black/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-noise opacity-50"></div>

            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

            <Container>
                <div className="flex overflow-hidden mask-image-linear-gradient-to-r-transparent-black-transparent">
                    <div className="flex animate-marquee gap-16 items-center min-w-full">
                        {/* Double the list for infinite loop */}
                        {[...partners, ...partners, ...partners].map((p, i) => (
                            <div key={i} className="flex items-center justify-center shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                                {p.logo ? (
                                    <img src={p.logo} alt={p.name} className="h-12 w-auto object-contain" />
                                ) : (
                                    <span className="text-xs font-bold font-mono tracking-widest text-white/40">{p.name || "PARTNER"}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

// Add strict marquee animation to index.css or tailwind config later if class 'animate-marquee' is missing.
// I'll add the keyframes to index.css or via style injection.
