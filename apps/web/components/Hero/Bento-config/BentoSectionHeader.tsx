import React from 'react'
import { Zap } from 'lucide-react'
export default function BentoSectionHeader() {
    return (
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold uppercase tracking-wider mb-4 border border-neutral-200">
                <Zap className="w-3 h-3 fill-neutral-400" />
                Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
                Everything you need to <br />
                <span className="bg-gradient-to-r from-neutral-800 to-neutral-500 bg-clip-text text-transparent">master content creation</span>
            </h2>
            <p className="text-lg text-neutral-600">
                Our bento-style tools give you granular control over every aspect of your marketing, from generation to analytics.
            </p>
        </div>
    )
}
