import {
    Sparkles,
    BarChart3,
    Globe,
    Share2,
    Wand2,
    Zap
} from 'lucide-react';
import BentoCard from '@/components/Hero/Bento-config/BentoCard';

import React from 'react'

export default function BentoGridSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">

            {/* 1. Large Feature: AI Writer (Spans 2 columns) */}
            <BentoCard
                className="md:col-span-2"
                title="Intelligent Writing Assistant"
                description="Generate blog posts, emails, and ad copy in seconds with our context-aware AI."
                icon={Wand2}
            >
                {/* Mock UI: Chat Interface */}
                <div className="absolute top-6 left-6 right-6 bottom-0 bg-white rounded-t-xl border border-neutral-200 shadow-sm p-6 flex flex-col gap-4 transform group-hover:translate-y-[-5px] transition-transform duration-500">
                    {/* User Message */}
                    <div className="flex justify-end">
                        <div className="bg-neutral-100 text-neutral-600 text-xs py-2 px-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                            Write a catchy hook for a marketing newsletter about AI.
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-blue-50/50 border border-blue-100 text-blue-800 text-xs py-3 px-4 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm">
                            "Stop guessing what your customers want. Start predicting it. 🚀"
                        </div>
                    </div>

                    {/* Loading State */}
                    <div className="flex gap-1.5 mt-2 ml-8">
                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-150" />
                    </div>
                </div>
            </BentoCard>

            {/* 2. Tall Feature: Analytics */}
            <BentoCard
                className="md:col-span-1"
                title="Real-time Analytics"
                description="Track performance metrics and SEO scores instantly."
                icon={BarChart3}
            >
                {/* Mock UI: Graph */}
                <div className="absolute inset-x-6 bottom-0 top-10 flex items-end justify-between gap-2 px-2 pb-0">
                    <div className="w-full bg-neutral-200/60 rounded-t-md h-[40%] group-hover:h-[60%] group-hover:bg-neutral-800/60 transition-all duration-700" />
                    <div className="w-full bg-neutral-200/60 rounded-t-md h-[60%] group-hover:h-[80%] group-hover:bg-neutral-800/80 transition-all duration-700 delay-100" />
                    <div className="w-full bg-neutral-200/60 rounded-t-md h-[30%] group-hover:h-[50%] group-hover:bg-neutral-800/40 transition-all duration-700 delay-200" />
                    <div className="w-full bg-neutral-200/60 rounded-t-md h-[75%] group-hover:h-[90%] group-hover:bg-neutral-900 transition-all duration-700 delay-300" />
                </div>
            </BentoCard>

            {/* 3. Tall Feature: Global Reach */}
            <BentoCard
                className="md:col-span-1"
                title="Multi-Language"
                description="Translate content into 30+ languages with native nuance."
                icon={Globe}
            >
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full">
                        {/* Floating Badges */}
                        <div className="absolute top-1/4 left-0 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium rotate-[-6deg] group-hover:rotate-[-12deg] group-hover:scale-105 transition-all duration-300 z-10">
                            🇺🇸 English
                        </div>
                        <div className="absolute top-1/3 right-0 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium rotate-[6deg] group-hover:rotate-[12deg] group-hover:scale-105 transition-all duration-300 z-20">
                            🇪🇸 Spanish
                        </div>
                        <div className="absolute bottom-1/3 left-4 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium rotate-[-3deg] group-hover:rotate-[-6deg] group-hover:scale-105 transition-all duration-300 z-10">
                            🇯🇵 Japanese
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
                    </div>
                </div>
            </BentoCard>

            {/* 4. Wide Feature: Integration */}
            <BentoCard
                className="md:col-span-2"
                title="Seamless Integrations"
                description="Connect directly to LinkedIn and Twitter."
                icon={Share2}
            >
                <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                    {/* Mock Logos */}
                    {/* <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-blue-600 font-bold text-xl shadow-sm hover:scale-110 transition-transform">W</div> */}
                    <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-sky-500 font-bold text-xl shadow-sm hover:scale-110 transition-transform delay-75">in</div>
                    <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-black font-bold text-xl shadow-sm hover:scale-110 transition-transform delay-150">X</div>
                    {/* <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-orange-600 font-bold text-xl shadow-sm hover:scale-110 transition-transform delay-200">M</div> */}
                </div>
            </BentoCard>

        </div>
    )
}
