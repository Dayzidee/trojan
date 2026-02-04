import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Container from '../ui/Container';

const CallToAction = () => {
  return (
    <Section className="relative bg-black overflow-hidden !py-0">
      <div className="absolute inset-0 bg-blue-900/10 opacity-20 pointer-events-none"></div>

      <Container className="relative z-10 flex flex-col items-center">
        <div className="text-center max-w-4xl mx-auto py-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            The Blockchain is for Everyone,<br />
            <span className="text-gray-500">We Make it Better to Trade.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Our architecture is built from the ground-up to be the fastest and most accurate on the market.
          </p>

          <Link
            to="/terminal"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1"
          >
            Trade Instantly
          </Link>
        </div>

        <div className="relative w-full max-w-5xl mx-auto mt-[-50px] md:mt-[-100px]">
          <img
            src="/assets/YxGM1P3AhNye15q5wC4k8BNoeSs.png"
            alt="Trojan Mascots"
            className="w-full h-auto object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-40 bottom-0"></div>
        </div>
      </Container>
    </Section>
  );
};

export default CallToAction;
