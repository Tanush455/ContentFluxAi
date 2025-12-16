import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
interface PricingCardProps {
    title: string;
    price: string;
    period: string;
    subPrice?: string;
    description: string;
    buttonText: string;
    buttonVariant: 'primary' | 'outline';
    features: string[];
    highlighted?: boolean;
}

export default function PricingCard({
    title,
    price,
    period,
    subPrice,
    description,
    buttonText,
    buttonVariant,
    features,
    highlighted = false
}: PricingCardProps) {
    return (
        <Card className={`h-full border transition-all duration-300 flex flex-col ${highlighted
            ? 'border-neutral-200 bg-white shadow-xl scale-100 md:scale-105 z-10'
            : 'border-neutral-100 bg-white/50 hover:border-neutral-200 hover:shadow-lg'
            }`}>
            <CardHeader className="p-8 pb-4 text-center">
                <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
                <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold text-neutral-900 tracking-tight">{price}</span>
                        <span className="text-neutral-500 font-medium">{period}</span>
                    </div>
                    {subPrice && (
                        <span className="text-sm text-green-600 font-semibold mt-1">{subPrice}</span>
                    )}
                </div>
                <p className="text-sm text-neutral-600 mt-4 leading-relaxed px-4">
                    {description}
                </p>
            </CardHeader>

            <CardContent className="p-8 pt-4 flex-1">
                <ul className="space-y-4">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${highlighted ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500'
                                }`}>
                                <Check className="w-3 h-3" strokeWidth={3} />
                            </div>
                            <span className="text-sm text-neutral-600 font-medium">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="p-8 pt-0">
                <Button
                    asChild
                    className={`w-full h-12 text-base font-semibold rounded-lg shadow-sm transition-all duration-200 ${buttonVariant === 'primary'
                        ? 'bg-neutral-900 hover:bg-neutral-800 text-white hover:shadow-md'
                        : 'bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-50'
                        }`}
                >
                    <Link href="/signup">{buttonText}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}