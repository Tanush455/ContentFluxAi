"use client";

import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from './testimonial-card';
import { TESTIMONIALS } from './testimonial-data';

export const TestimonialCarousel = () => {
    return (
        <div className="hidden md:flex justify-center w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-6xl"
            >
                <CarouselContent className="-ml-4">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <div className="hidden md:block">
                    <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 border-neutral-200 text-neutral-600 hover:text-primary hover:border-primary bg-white/80" />
                    <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 border-neutral-200 text-neutral-600 hover:text-primary hover:border-primary bg-white/80" />
                </div>
            </Carousel>
        </div>
    );
};