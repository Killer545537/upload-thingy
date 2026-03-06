import { createFileRoute } from '@tanstack/react-router';
import BentoGrid from '#/components/landing/bento-grid';
import Footer from '#/components/landing/footer';
import Hero from '#/components/landing/hero-section';
import HowItWorks from '#/components/landing/how-it-works';
import LogoCloud from '#/components/landing/logo-cloud.tsx';
import Navbar from '#/components/landing/navbar';

export const Route = createFileRoute('/')({ component: App });

function App() {
    return (
        <main className='min-h-screen bg-background'>
            <Navbar />
            <Hero />
            <LogoCloud />
            <BentoGrid />
            <HowItWorks />
            <Footer />
        </main>
    );
}
