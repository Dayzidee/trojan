import { motion } from "framer-motion";
import { Container } from "./ui/Container";

const communityPartners = [
    { name: "MONKEDAO", image: "https://framerusercontent.com/images/Q7NstazpHc4nXKpsI8mixDq1I.webp" },
    { name: "BORYOKU", image: "https://framerusercontent.com/images/t0j6zukNGRyKTQDholuuCc5htnw.webp" },
    { name: "SLERF", image: "https://framerusercontent.com/images/JsiLO9qUM40gvqjU0zZldg0qH6k.webp" },
    { name: "PLAY", image: "https://framerusercontent.com/images/HKzHdIz9njaXRL1ZFruuC114H18.webp" },
    { name: "PORTALS", image: "https://framerusercontent.com/images/WBOH0L6vw044HtI6GOVPUedXp5k.webp" },
    { name: "FWOG", image: "https://framerusercontent.com/images/rgrrH2efcfNGK5TELfuJ7jzcxA.png" },
    { name: "MEW", image: "https://framerusercontent.com/images/zjYAYkO6ADs90QGxiB3I8melYw.png" },
    { name: "$WIF", image: "https://framerusercontent.com/images/ReTjjtrfaM02JzJVBOxaRA8bdjw.png" },
    { name: "WEN", image: "https://framerusercontent.com/images/hrQTr1HiIXp42zkcfKqHSk03BlE.png" },
];

export function CommunityPartners() {
    return (
        <section className="py-24 relative bg-[#050505] overflow-hidden">
            <Container>
                {/* Heading & Intro */}
                <div className="max-w-3xl mx-auto text-center mb-16 px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                    >
                        Our Community Partners
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#8E949D] text-[16px] md:text-[18px] leading-[1.6em] font-medium"
                    >
                        As a longstanding member of the Solana ecosystem, Trojan strives to support and reenforce the growth of the network through collaboration and innovation. Trojan partners with leading Community projects, builders, and protocols to strengthen activity and grow the culture of onchain trading.
                    </motion.p>
                </div>

                {/* Art Grid Container */}
                <div className="relative group/grid">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-hidden max-h-[820px] transition-all duration-700">
                        {communityPartners.map((partner, i) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="relative aspect-[1.43/1] rounded-[16px] overflow-hidden border border-white/5 bg-[#0D1015]"
                            >
                                {/* Art Image */}
                                <img
                                    src={partner.image}
                                    alt={partner.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />

                                {/* Overlay Label */}
                                <div className="absolute top-3 left-3 z-10">
                                    <div className="backdrop-blur-md bg-black/60 border border-white/10 px-3 py-1.5 rounded-[10px] flex items-center justify-center">
                                        <span className="text-[12px] md:text-[13px] font-bold text-[#F7F8F9] tracking-[-0.02em]">
                                            {partner.name}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Fade Mask */}
                    <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />

                    {/* Show More Button */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                        <button className="bg-[#181C20] border border-white/10 px-6 py-2 rounded-[6px] text-[#C9CCD1] text-[14px] font-medium hover:bg-[#20252a] hover:text-white transition-colors duration-200">
                            Show More
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
