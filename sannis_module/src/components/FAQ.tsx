import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './ui/Container';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "What is Trojan's Terminal?",
        answer: "Trojan Terminal is the fastest onchain Solana trading platform with real-time data, sniping tools, automation, multi-wallet support, and non-custodial wallets powered by Privy."
    },
    {
        question: "What does non-custodial mean?",
        answer: "Non-custodial means you fully control your private keys and funds. Trojan uses Privy's secure infrastructure so your crypto stays in your control with enterprise-grade protection."
    },
    {
        question: "Can I earn rewards and SOL?",
        answer: "Yes. Join The Arena rewards program to rank up, earn SOL, dominate leaderboards, and stack Gold rewards."
    },
    {
        question: "Minimum SOL to start trading?",
        answer: "Enough for trade amount + fees (typically 0.1–0.5 SOL minimum, depending on network and activity)."
    },
    {
        question: "Is Trojan the fastest?",
        answer: "Yes, built for maximum speed and accuracy on Solana, so you're first on every trade."
    },
    {
        question: "Any fees to use Trojan?",
        answer: "Trojan charges 1% per completed trade, Solana network fees (not paid to Trojan) apply."
    },
    {
        question: "Recommended slippage & gas settings?",
        answer: "Several defaults available. Customize in-terminal based on liquidity and market conditions."
    },
    {
        question: "Need a wallet to use Trojan?",
        answer: "Create a non-custodial wallet instantly via Privy integration right in the platform."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 relative z-10">
            <Container>
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">FAQ</h2>
                    <div className="h-px w-full bg-white/10" />
                </div>

                <div className="space-y-0">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-white/10">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                            >
                                <span className="text-xl font-medium text-white/80 group-hover:text-white transition-colors">
                                    {faq.question}
                                </span>
                                <span className="text-white/50 group-hover:text-brand-green transition-colors">
                                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-8 text-white/50 leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
