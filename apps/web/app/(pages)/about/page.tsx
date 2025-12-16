import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Hero/FooterContent';
import PageHeader from '@/components/Pages/PageHeader';
import { Users, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="We are ContentFlux"
                subtitle="We're on a mission to help marketing teams build sustainable, high-quality content engines without the burnout."
                badge="About Us"
            />

            <div className="container mx-auto px-4 md:px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-neutral-900">Built for creators, by creators.</h2>
                        <p className="text-neutral-600 leading-relaxed">
                            Founded in 2024, ContentFlux started as a simple internal tool to help our small agency manage multiple clients. We realized that existing tools were either too simple or overly complex enterprise software.
                        </p>
                        <p className="text-neutral-600 leading-relaxed">
                            Today, we power thousands of marketing teams across the globe, helping them generate, schedule, and analyze their content with the power of AI.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-100 rounded-2xl aspect-square flex flex-col items-center justify-center p-6 text-center">
                            <Users className="w-8 h-8 text-neutral-900 mb-3" />
                            <span className="text-2xl font-bold text-neutral-900">10k+</span>
                            <span className="text-sm text-neutral-500">Users</span>
                        </div>
                        <div className="bg-neutral-900 text-white rounded-2xl aspect-square flex flex-col items-center justify-center p-6 text-center mt-8">
                            <Zap className="w-8 h-8 mb-3 text-yellow-400" />
                            <span className="text-2xl font-bold">5M+</span>
                            <span className="text-sm text-neutral-400">Posts Generated</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}