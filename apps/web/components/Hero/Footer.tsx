import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
    return (
        <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6">

                {/* --- CTA Section (Dark Card) --- */}
                <div className="bg-slate-800 rounded-3xl p-8 md:p-16 text-center mb-20 shadow-xl shadow-slate-900/5">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Transform Your Content Marketing?
                    </h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of marketers who are already saving time and getting better results with ContentFlux AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-full px-8 h-12">
                            <Link href="/signup">Start Your Free Trial</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-700 hover:text-white rounded-full px-8 h-12 bg-transparent">
                            <Link href="#pricing">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}