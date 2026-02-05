import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { ArrowRight } from "lucide-react";

export function ArenaCards() {
    return (
        <section className="py-24 relative z-10 bg-[#050505]">
            <Container>
                <div className="relative group overflow-hidden rounded-[16px] border border-white/5 bg-[#0D1015] min-h-[400px] flex flex-col md:grid md:grid-cols-[1.2fr_0.8fr]">
                    {/* Content Area */}
                    <div className="relative z-20 p-8 md:p-16 flex flex-col justify-center items-start">
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[32px] md:text-[48px] font-black tracking-[-1.5px] leading-none mb-1 text-[#F7F8F9]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            INTRODUCING
                        </motion.h3>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[48px] md:text-[72px] font-black tracking-[-3.2px] leading-none mb-8 bg-gradient-to-r from-[#FFC800] via-[#FFEC16] to-[#FFC800] bg-clip-text text-transparent"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            THE ARENA
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="max-w-lg"
                        >
                            <h2 className="text-[16px] md:text-[18px] text-[#8E949D] leading-[1.6em] tracking-[-0.2px] font-medium transition-colors">
                                Climb the ranks to unlock massive rewards. Stack{" "}
                                <span className="inline-flex items-baseline gap-1 bg-[#EEF0F3]/10 px-1.5 py-0.5 rounded align-middle">
                                    <span className="text-white font-semibold text-[14px]">SOL</span>
                                    <img
                                        src="https://framerusercontent.com/images/us1sc2GaZZfvK5IBugLFfBxMuo.png"
                                        alt="SOL"
                                        className="w-[16px] h-[16px] self-center"
                                    />
                                </span>
                                , conquer leaderboards, and watch the{" "}
                                <span className="inline-flex items-baseline gap-1 bg-yellow-500/10 px-1.5 py-0.5 rounded align-middle">
                                    <span className="text-[#FACC15] font-semibold text-[14px]">Gold</span>
                                    <img
                                        src="https://framerusercontent.com/images/AgGVgjC5RHgHPM4nEgevJUK5cIA.png"
                                        alt="Gold"
                                        className="w-[16px] h-[16px] self-center"
                                    />
                                </span>{" "}
                                rewards pile up.
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-10"
                        >
                            <a
                                href="/arena"
                                className="inline-flex items-center gap-2 bg-[#F7F8F9] text-[#010409] px-6 py-3.5 rounded-[10px] font-bold text-[14px] hover:bg-white transition-all transform hover:scale-105 active:scale-95 group/btn"
                            >
                                ENTER THE ARENA
                                <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Banner Graphic Area */}
                    <div className="relative h-64 md:h-auto overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 z-0"
                        >
                            <img
                                src="https://framerusercontent.com/images/A3be2DMeN6XcN5sFmw6Q7KFv0.webp"
                                alt="Arena Honors Ranks"
                                className="w-full h-full object-cover object-center scale-110 md:scale-150 origin-left"
                            />
                            {/* Fade masks */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1015] via-transparent to-transparent hidden md:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1015] via-transparent to-transparent md:hidden" />
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

