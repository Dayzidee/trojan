import React, { useState } from 'react';
import Section from '../../ui/Section';
import Container from '../../ui/Container';
import SectionHeader from '../ui/SectionHeader';

const FAQ_ITEMS = [
    {
        question: "What is Trojan's Terminal?",
        answer: "Trojan’s Terminal is a pro-class trading interface designed for speed and precision, offering advanced charting, real-time data, and direct execution capabilities."
    },
    {
        question: "What is non-custodial and how does it ensure trust?",
        answer: "Non-custodial means you retain full control of your private keys and funds at all times. Trojan never holds your assets, ensuring that your funds are safe and only accessible by you."
    },
    {
        question: "Can I earn rewards and SOL on Trojan?",
        answer: "Yes, Trojan offers various reward programs and referral incentives that allow you to earn SOL based on trading volume and community engagement."
    },
    {
        question: "What is the minimum amount of SOL needed to start trading?",
        answer: "There is no strict minimum to use the terminal itself, but you will need enough SOL to cover network transaction fees (gas) and the minimum order sizes of the tokens you wish to trade."
    },
    {
        question: "Is Trojan really the fastest platform?",
        answer: "Our infrastructure is built for low-latency execution, leveraging optimized RPC nodes and direct-to-validator connections to ensure your trades land on-chain as fast as physically possible."
    },
    {
        question: "Is there a fee to use Trojan Terminal?",
        answer: "Trojan Terminal has a competitive fee structure. Basic trading is often free or low-cost, while premium features may carry specific fees. Check our documentation for the latest fee schedule."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className={`mb-6 rounded-2xl transition-all duration-500 ${isOpen ? 'bg-white/5 border-white/20 shadow-2xl' : 'bg-[#0A0A0A] border-white/5 hover:border-white/10 hover:bg-white/5'} border`}>
            <button
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                onClick={onClick}
            >
                <span className={`text-lg md:text-2xl font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-400'}`}>
                    {question}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${isOpen ? 'bg-white border-white' : 'border-white/10'}`}>
                    <svg className={`h-6 w-6 transition-all duration-500 ${isOpen ? 'text-black rotate-180' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-6 md:px-8 md:pb-8 text-gray-400 leading-relaxed text-base md:text-xl border-t border-white/5 pt-6">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Section className="py-20 md:py-32 bg-black relative">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

            <Container>
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <SectionHeader
                                title="Frequently Asked"
                                highlight="Questions"
                                align="left"
                                className="mb-10 pl-0"
                            />
                            <p className="text-gray-400 mb-12 text-xl font-medium leading-relaxed max-w-md">
                                Get clear answers to commonly asked questions about the <span className="text-white">Trojan Terminal</span> ecosystem.
                            </p>
                            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0A0A0A] to-[#121212] border border-white/10 shadow-2xl">
                                <h4 className="text-xl md:text-2xl font-black text-white mb-4">Still need help?</h4>
                                <p className="text-gray-500 mb-8 leading-relaxed">Our pro support team is available around the clock to assist you.</p>
                                <a href="#" className="inline-flex items-center justify-center w-full font-black text-black bg-white hover:bg-gray-100 px-6 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                    Join Community Discord
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        {FAQ_ITEMS.map((item, index) => (
                            <FAQItem
                                key={index}
                                {...item}
                                isOpen={index === openIndex}
                                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default FAQ;
