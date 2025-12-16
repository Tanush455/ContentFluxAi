import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Hero/FooterContent';
import PageHeader from '@/components/Pages/PageHeader';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="Privacy Policy"
                subtitle="Last updated: January 1, 2025"
                badge="Legal"
            />

            <div className="container mx-auto px-4 md:px-6 py-20 max-w-3xl">
                {/* Prose class requires @tailwindcss/typography plugin, or standard CSS */}
                <article className="prose prose-neutral prose-lg max-w-none">
                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to ContentFlux. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website.
                    </p>

                    <h3>2. Data We Collect</h3>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                    </ul>

                    <h3>3. How We Use Your Data</h3>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party).</li>
                    </ul>
                </article>
            </div>
            <Footer />
        </main>
    );
}