import React from 'react';
import Image from 'next/image';

export const HeroImages = () => {
    return (
        <>
            {/* --- Background Image 1: Top Left --- */}
            <div className='absolute top-4 left-4 z-0 transform -translate-x-1/4 -translate-y-1/4 md:-translate-x-1/3 md:-translate-y-1/3 lg:-translate-x-1/4 lg:-translate-y-1/4 pointer-events-none select-none'>
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-[28rem] md:h-[28rem] lg:w-[35rem] lg:h-[35rem] xl:w-[40rem] xl:h-[40rem] animate-float-slow -rotate-12 opacity-30 sm:opacity-40 md:opacity-60 lg:opacity-70 blur-[1px] sm:blur-[2px]">
                    <Image
                        src="/content-creation/AHeroBg.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 448px, 560px"
                    />
                </div>
            </div>

            {/* --- Background Image 2: Bottom Right --- */}
            <div className='absolute bottom-18 right-20 z-0 transform translate-x-1/4 translate-y-1/4 md:translate-x-1/3 md:translate-y-1/3 lg:translate-x-1/4 lg:translate-y-1/4 pointer-events-none select-none'>
                <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-[24rem] md:h-[24rem] lg:w-[32rem] lg:h-[32rem] xl:w-[35rem] xl:h-[35rem] animate-float-slow -rotate-[15deg] opacity-25 sm:opacity-35 md:opacity-50 lg:opacity-60 blur-[1px] sm:blur-[2px]" style={{ animationDelay: '1s' }}>
                    <Image
                        src="/content-creation/HeroContent.png"
                        alt=""
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, (max-width: 1024px) 384px, 512px"
                    />
                </div>
            </div>
        </>
    );
};