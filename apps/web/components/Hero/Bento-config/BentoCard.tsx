// --- Reusable Card Wrapper ---
import React from 'react'
import { ArrowUpRight } from 'lucide-react';
export default function BentoCard({
    children,
    className = "",
    title,
    description,
    icon: Icon
}: {
    children?: React.ReactNode;
    className?: string;
    title: string;
    description: string;
    icon?: any;
}) {
    return (
        <div className={`group relative overflow-hidden rounded-3xl bg-white/60 border border-neutral-200 shadow-sm hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-500 flex flex-col backdrop-blur-sm ${className} rounded-2xl`}>

            {/* Content Header */}
            <div className="p-6 md:p-8 flex flex-col gap-2 relative z-20">
                <div className="flex items-center justify-between">
                    <div className="size-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300 shadow-sm">
                        {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mt-4">{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mt-1">{description}</p>
            </div>

            {/* Visual/Image Area */}
            <div className="flex-1 relative w-full min-h-[200px] bg-neutral-50/50 group-hover:bg-white/50 transition-colors duration-500 overflow-hidden rounded-t-xl mx-4 mt-2 border-t border-x border-neutral-100 shadow-inner">
                {children}
            </div>
        </div>
    );
}
