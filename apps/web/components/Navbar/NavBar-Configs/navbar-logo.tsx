import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const NavbarLogo = () => {
    return (
        <Link href="/" className='flex items-center gap-2 group'>
            <div className='size-8 rounded-xl bg-gradient-to-tr from-primary to-primary/70 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105'>
                <Sparkles className='w-4 h-4' />
            </div>
            <span className='font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-700 to-neutral-500'>
                ContentFlux
            </span>
        </Link>
    );
};