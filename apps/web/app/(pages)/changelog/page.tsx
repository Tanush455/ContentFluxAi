import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Hero/FooterContent';
import PageHeader from '@/components/Pages/PageHeader';

const UPDATES = [
    {
        version: "v2.4.0",
        date: "October 24, 2025",
        title: "Advanced Analytics & Team Roles",
        changes: [
            "Introduced role-based access control (Admin, Editor, Viewer).",
            "New Analytics Dashboard with exportable PDF reports.",
            "Fixed an issue with LinkedIn image sizing."
        ]
    },
    {
        version: "v2.3.1",
        date: "September 12, 2025",
        title: "AI Tone Adjustments",
        changes: [
            "Added 5 new brand voices to the AI generator.",
            "Improved speed of content generation by 40%.",
        ]
    }
];

export default function ChangelogPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="Changelog"
                subtitle="We're constantly improving. Here's what's new."
                badge="Updates"
            />

            <div className="container mx-auto px-4 md:px-6 py-20 max-w-3xl">
                <div className="space-y-16">
                    {UPDATES.map((update, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-48 shrink-0">
                                <span className="font-mono text-sm text-neutral-500">{update.date}</span>
                                <div className="mt-2 inline-block px-2 py-1 bg-neutral-100 text-neutral-700 text-xs font-bold rounded">
                                    {update.version}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-4">{update.title}</h3>
                                <ul className="space-y-3">
                                    {update.changes.map((change, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-neutral-600">
                                            <span className="mt-2 w-1.5 h-1.5 bg-neutral-300 rounded-full shrink-0" />
                                            {change}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}