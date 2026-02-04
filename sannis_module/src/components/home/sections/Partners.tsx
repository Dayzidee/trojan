import React from 'react';
import Section from '../../ui/Section';
import Container from '../../ui/Container';
import PartnerLogos from './PartnerLogos';
import SectionHeader from '../ui/SectionHeader';

const Partners = () => {
    return (
        <Section className="border-t border-white/5 bg-black py-24">
            <Container>
                <SectionHeader
                    title="Our Community Partners"
                    subtitle="Trojan partners with leading Community projects, builders, and protocols to strengthen activity and grow the culture of onchain trading."
                    className="mb-16"
                />
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-10"></div>
                    <PartnerLogos />
                </div>
            </Container>
        </Section>
    );
};

export default Partners;
