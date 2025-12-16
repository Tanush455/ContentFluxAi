import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
    return (
        <div className="bg-neutral-50/50 border-b border-neutral-100 py-24 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                {badge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/5 text-neutral-600 text-xs font-semibold uppercase tracking-wider mb-6">
                        {badge}
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            </div>

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50"></div>
        </div>
    );
}