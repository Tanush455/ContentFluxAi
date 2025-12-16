import React from 'react';
import { HeroBackground } from './Hero-config/hero-background'; // Adjust paths as needed
import { HeroImages } from './Hero-config/hero-images';
import { HeroContent } from './Hero-config/hero-content';
import BentoGrid from './BentoGrid';

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32 xl:py-40 bg-transparent">
            <HeroBackground />
            <HeroImages />
            <HeroContent />
        </section>
    );
}