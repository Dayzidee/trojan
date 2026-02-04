import React, { useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';

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
  },
  {
    question: "What slippage and gas settings does Trojan recommend?",
    answer: "We recommend using 'Auto' slippage for most pairs, which adjusts dynamically based on volatility. For gas, our 'Turbo' mode ensures transaction priority during network congestion."
  },
  {
    question: "Can I use Trojan Terminal without a wallet?",
    answer: "No, you must connect a Solana-compatible wallet (like Phantom or Solflare) to interact with the blockchain and execute trades."
  },
  {
    question: "What happens to my trades if I’m offline?",
    answer: "Once a trade is confirmed on the blockchain, it is final regardless of your connection status. However, limit orders or advanced strategies hosted on our servers will continue to execute according to your settings."
  },
  {
    question: "Where can I get help or learn more?",
    answer: "You can check our comprehensive documentation, join our Discord community for live support, or follow us on Twitter for the latest updates."
  }
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        className="w-full flex items-start justify-between py-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-medium transition-colors duration-200 ${isOpen ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>
          {question}
        </span>
        <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <Section className="bg-[#050505] py-24">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight">
              FAQs
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Have a question that wasn't answered? Check out the <a href="#" className="text-green-400 hover:text-green-300 underline underline-offset-4">Trojan Docs</a>.
            </p>
            <div className="hidden md:block p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-white font-bold mb-2">Still need help?</h4>
              <p className="text-sm text-gray-400 mb-4">Our support team is available 24/7 on Discord.</p>
              <a href="#" className="inline-flex items-center text-sm font-bold text-black bg-white px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Join Discord
              </a>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 md:px-10">
              {FAQ_ITEMS.map((item, index) => (
                <FAQItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
