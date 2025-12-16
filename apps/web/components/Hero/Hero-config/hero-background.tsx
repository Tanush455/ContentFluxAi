import React from 'react';

export const HeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            {/* Circle 1 - Top Left */}
            <div className="absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-50/20 to-purple-50/10 animate-pulse-slow blur-xl opacity-30"></div>

            {/* Circle 2 - Center Right */}
            <div className="absolute top-1/3 right-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-88 lg:h-88 rounded-full bg-gradient-to-tr from-cyan-50/15 to-blue-50/10 animate-float-slower blur-2xl opacity-20" style={{ animationDelay: '0.5s' }}></div>

            {/* Circle 3 - Bottom Center */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-tl from-violet-50/10 to-purple-50/5 animate-pulse-slow blur-xl opacity-15" style={{ animationDelay: '1s' }}></div>

            {/* Circle 4 - Top Right */}
            <div className="absolute top-20 right-1/4 w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-sky-50/10 to-blue-50/5 animate-float-slower blur-2xl opacity-10"></div>

            {/* Circle 5 - Bottom Left */}
            <div className="absolute bottom-10 left-1/4 w-28 h-28 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-76 lg:h-76 rounded-full bg-gradient-to-tr from-indigo-50/10 to-purple-50/5 animate-pulse-slow blur-xl opacity-10" style={{ animationDelay: '1.5s' }}></div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        </div>
    );
};