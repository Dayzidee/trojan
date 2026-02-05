import { Container } from '../components/ui/Container';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Partners } from '../components/Partners';
import { ArenaCards } from '../components/ArenaCards';
import { CommunityPartners } from '../components/CommunityPartners';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AppPreview } from '../components/AppPreview';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-brand-green selection:text-black overflow-x-hidden">
            <div className="bg-noise" />

            <Header />

            <Hero />
            <AppPreview />
            <Partners />
            <Features />
            <ArenaCards />
            <CommunityPartners />
            <FAQ />
            <Footer />
        </main>
    );
}
