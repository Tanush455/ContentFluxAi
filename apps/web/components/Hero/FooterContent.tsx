import React from 'react';
import Link from 'next/link';
import { Sparkles, Twitter, Linkedin, Github, Globe } from 'lucide-react';

export default function FooterContent() {
    return (
        // Main container with dark background and white text
        <div className="bg-neutral-800 text-white p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">

                {/* --- Brand Column (Spans 2 on large screens) --- */}
                <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 pr-4">
                    <Link href="/" className="flex items-center gap-2 w-fit group">
                        {/* Logo container with white background */}
                        <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:bg-neutral-200 transition-colors">
                            {/* Explicitly set icon color to black for visibility */}
                            <Sparkles className="w-5 h-5 text-neutral-900" />
                        </div>
                        <span className="font-bold text-xl text-white tracking-tight group-hover:text-neutral-200 transition-colors">ContentFlux</span>
                    </Link>
                    <p className="text-neutral-300 leading-relaxed text-sm max-w-sm">
                        The AI-powered content marketing platform that helps modern businesses create, schedule, and grow faster.
                    </p>
                </div>

                {/* --- Product Column --- */}
                <div>
                    <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li><Link href="#features" className="text-neutral-300 hover:text-white transition-colors">Features</Link></li>
                        <li><Link href="#pricing" className="text-neutral-300 hover:text-white transition-colors">Pricing</Link></li>
                        <li>
                            <Link href="/integrations" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2">
                                Integrations
                                <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                            </Link>
                        </li>
                        <li><Link href="/changelog" className="text-neutral-300 hover:text-white transition-colors">Changelog</Link></li>
                    </ul>
                </div>

                {/* --- Company Column --- */}
                <div>
                    <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li><Link href="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/blog" className="text-neutral-300 hover:text-white transition-colors">Blog</Link></li>
                        <li><Link href="/careers" className="text-neutral-300 hover:text-white transition-colors">Careers</Link></li>
                        <li><Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* --- Legal Column --- */}
                <div>
                    <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li><Link href="/privacy" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-neutral-300 hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link href="/security" className="text-neutral-300 hover:text-white transition-colors">Security</Link></li>
                    </ul>
                </div>
            </div>

            {/* --- Bottom Section: Copyright & Socials --- */}
            <div className="border-t border-neutral-800 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4">

                {/* Copyright */}
                <p className="text-neutral-400 text-sm text-center md:text-left">
                    © {new Date().getFullYear()} ContentFlux Inc. All rights reserved.
                </p>

                {/* Social Links & Language */}
                <div className="flex items-center gap-6">
                    {/* Language Selector (Mock) */}
                    <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                        <span>English (US)</span>
                    </button>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <Link href="https://twitter.com" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="https://github.com" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}