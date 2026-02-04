import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import CoreFeatures from './CoreFeatures';
import MoreFeatures from './MoreFeatures';

const Features = () => {
  return (
    <Section id="features" className="bg-black relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-0"></div>

      <Container className="relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
            One terminal.<br />
            <span className="text-gray-500">Built for traders by traders.</span>
          </h2>
          <p className="text-lg text-gray-400">
            Our products are designed with all traders in mind, from beginners to seasoned pros.
            Step into the <a href="/terminal" className="text-white underline hover:text-blue-400 transition-colors">arena</a> with the best onchain tools to stay ahead of the rest.
          </p>
        </div>

        <CoreFeatures />

        <MoreFeatures />

      </Container>
    </Section>
  );
};

export default Features;
