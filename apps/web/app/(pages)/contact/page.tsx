import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Hero/FooterContent';
import PageHeader from '@/components/Pages/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have shadcn textarea

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="Get in touch"
                subtitle="Have a question about our pricing, features, or need a custom enterprise plan? We're here to help."
                badge="Contact"
            />

            <div className="container mx-auto px-4 md:px-6 py-20 max-w-xl">
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input placeholder="Jane" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="jane@company.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
                    </div>
                    <Button className="w-full bg-neutral-900 text-white h-12">Send Message</Button>
                </form>
            </div>
            <Footer />
        </main>
    );
}