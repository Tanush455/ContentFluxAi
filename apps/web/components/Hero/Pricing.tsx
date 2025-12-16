import React from 'react';
import PricingHeader from './Pricing-config/PricingHeader';
import PricingCardGrid from './Pricing-config/PricingCardGrid';

export default function Pricing() {
    return (
        <section className="py-24 bg-transparent relative" id="pricing">
            <div className="container px-4 md:px-6 mx-auto">

                {/* --- Header --- */}
                <PricingHeader />

                {/* --- Pricing Cards Grid --- */}
                <PricingCardGrid />
            </div>
        </section>
    );
}

