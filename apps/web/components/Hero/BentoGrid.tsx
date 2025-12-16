import React from 'react';
import {
    Sparkles,
    BarChart3,
    Globe,
    Share2,
    Wand2,
    Zap
} from 'lucide-react';
import BentoCard from './Bento-config/BentoCard';
import BentoSectionHeader from './Bento-config/BentoSectionHeader';
import BentoGridSection from './Bento-config/BentoGridSection';


export default function BentoGrid() {
    return (
        <section className="py-20 bg-transparent relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <BentoSectionHeader />
                {/* --- THE BENTO GRID --- */}
                <BentoGridSection />
            </div>
        </section>
    );
}