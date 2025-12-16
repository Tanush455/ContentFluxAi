import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroContent = () => {
    return (
        <div className="container relative z-10 px-4 md:px-6 lg:px-8 flex flex-col items-center text-center mx-auto mt-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/90 backdrop-blur-sm sm:backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-neutral-600 shadow-xs sm:shadow-sm mb-6 sm:mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-600" />
                <span className="whitespace-nowrap">AI-Powered Marketing Platform</span>
            </div>

            {/* Headline */}
            <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight sm:tracking-tight text-neutral-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-100 leading-[1.15] sm:leading-[1.1]">
                Create, Schedule & Grow With{' '}
                <span className="bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 bg-clip-text text-transparent">
                    AI-Powered Content
                </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-10 leading-relaxed sm:leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-200 px-2 sm:px-0">
                Automate your content creation, optimize for SEO, schedule across all social platforms, and track performance—all in one intelligent platform built for modern marketers.
            </p>

            {/* CTA Button Wrapper */}
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-300">
                <Button
                    asChild
                    size="lg"
                    className="h-11 sm:h-12 md:h-14 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-full bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700 text-white shadow-lg sm:shadow-xl shadow-neutral-900/10 hover:shadow-2xl hover:shadow-neutral-900/20 hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 active:scale-95"
                >
                    <Link href="/signup">
                        <span className="flex items-center gap-1.5 sm:gap-2">
                            Start Free Trial
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </span>
                    </Link>
                </Button>

                {/* Trust Footer */}
                <div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-2 gap-y-1 text-xs sm:text-sm text-neutral-500 mt-2 sm:mt-4 px-2">
                    <span className="flex items-center gap-1 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" />
                        No credit card required
                    </span>
                    <span className="hidden sm:inline text-neutral-300">•</span>
                    <span className="hidden sm:inline">14-day free trial</span>
                    <span className="hidden sm:inline text-neutral-300">•</span>
                    <span className="whitespace-nowrap">Cancel anytime</span>
                </div>
            </div>
        </div>
    );
};