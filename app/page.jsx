import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Footer } from '@/components/home/Footer';
import { Navbar } from '@/components/home/Navbar';
import Installation from '../components/home/Installation';
import Services from '../components/home/Services';
import Community from '../components/home/Community';
import FAQ from '../components/home/FAQ';

const Index = () => {
    return (
        <div className="min-h-[100svh] relative ">
            <header className="sticky top-0 z-50 bg-background"> 
                <Navbar />
            </header>
            <main>
                <Hero />
                <Services />
                <Installation />
                <Community />
                <FAQ />
            </main>
            <Footer />
            <div className='w-full h-8 bg-primary fixed bottom-0 -z-50 blur-3xl opacity-40 ' />
        </div>
    );
};

export default Index;