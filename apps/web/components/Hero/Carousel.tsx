import React from 'react';
import { TESTIMONIALS } from '@/components/Hero/Testimonials-config/testimonial-data';
import { TestimonialCard } from '@/components/Hero/Testimonials-config/testimonial-card';
import { TestimonialCarousel } from '@/components/Hero/Testimonials-config/testimonial-carousel';

export default function Testimonials() {
    return (
        <section className="py-24 bg-transparent relative" id="testimonials">
            <div className="container px-4 md:px-6 mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
                        Trusted by modern teams
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Join thousands of marketers who are scaling their content engines with ContentFlux.
                    </p>
                </div>

                {/* --- MOBILE VIEW: Vertical Stack --- */}
                <div className="flex flex-col gap-6 md:hidden">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <div key={index} className="w-full">
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>

                {/* --- DESKTOP VIEW: Carousel Component --- */}
                <TestimonialCarousel />

            </div>
        </section>
    );
}