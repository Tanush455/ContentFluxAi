import React from 'react';
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from './testimonial-data';

// Helper type based on your data structure
type Testimonial = typeof TESTIMONIALS[0];

export const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
        <Card className="h-[400px] border-neutral-200 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 flex flex-col">
            <CardContent className="flex flex-col p-6 h-full justify-between">

                {/* Top Section: Icon & Text */}
                <div>
                    <Quote className="w-8 h-8 text-neutral-200 mb-4 fill-neutral-100" />
                    <p className="text-neutral-700 leading-relaxed mb-6 line-clamp-6">
                        "{testimonial.content}"
                    </p>
                </div>

                {/* Bottom Section: User Profile */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-neutral-100">
                    <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${testimonial.color}`}>
                        {testimonial.initials}
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm text-neutral-900 truncate">{testimonial.name}</span>
                        <span className="text-xs text-neutral-500 truncate">{testimonial.role}</span>
                    </div>

                    <div className="ml-auto flex gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};