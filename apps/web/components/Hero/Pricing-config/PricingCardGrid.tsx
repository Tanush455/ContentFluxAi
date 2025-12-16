import React from 'react'
import PricingCard from '@/components/Hero/Pricing-config/PricingCard'
export default function PricingCardGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-center">

            {/* 1. STARTER PLAN */}
            <PricingCard
                title="Starter"
                price="$0"
                period="/ forever"
                description="Perfect for individual creators just getting started."
                buttonText="Get Started"
                buttonVariant="outline"
                features={[
                    "2,000 AI words / month",
                    "1 Social Media Account",
                    "Basic Content Scheduler",
                    "Standard Analytics",
                    "Email Support"
                ]}
            />

            {/* 3. SEMI-ANNUAL PLAN ($150) - Highlighted */}

            <div className="relative transform md:-translate-y-4">
                {/* "Best Value" Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-bold px-4 py-1.5 rounded-full z-20 shadow-lg whitespace-nowrap">
                    Best Value (Save $50)
                </div>

                <PricingCard
                    title="Semi-Annual"
                    price="$150"
                    period="/ 6 months"
                    subPrice="(Equivalent to $25/mo)"
                    description="Maximum savings for committed content teams."
                    buttonText="Start 14-Day Free Trial"
                    buttonVariant="primary"
                    highlighted={true}
                    features={[
                        "Everything in Quarterly",
                        "50,000 AI words / month",
                        "Multi-tenant Collaboration",
                        "Advanced Analytics",
                        "Dedicated Account Support"
                    ]}
                />
            </div>

            {/* 2. QUARTERLY PLAN ($100) */}
            <PricingCard
                title="Quarterly"
                price="$100"
                period="/ 3 months"
                description="Great for short-term projects and seasonal campaigns."
                buttonText="Get Started"
                buttonVariant="outline"
                features={[
                    "50,000 AI words / month",
                    "3 Social Media Accounts",
                    "Advanced SEO Tools",
                    "Unlimited Scheduling",
                    "Priority Support"
                ]}
            />



        </div>
    )
}
