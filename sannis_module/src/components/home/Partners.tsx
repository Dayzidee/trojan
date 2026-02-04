import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import PartnerLogos from './PartnerLogos';

const Partners = () => {
  return (
    <Section className="border-t border-white/5 bg-black">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Community Partners
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trojan partners with leading Community projects, builders, and protocols to strengthen activity and grow the culture of onchain trading.
          </p>
        </div>

        <PartnerLogos />
      </Container>
    </Section>
  );
};

export default Partners;
