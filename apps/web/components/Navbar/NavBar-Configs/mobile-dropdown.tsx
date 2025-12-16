import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust path to your UI button
import { NAV_LINKS } from './utils/nav-config';

interface MobileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileDropdown = ({ isOpen, onClose }: MobileDropdownProps) => {
    if (!isOpen) return null;

    return (
        <div className='md:hidden absolute top-16 left-0 w-full border-b border-border/5 bg-white rounded-t-2xl backdrop-blur-xl p-4 shadow-lg animate-in slide-in-from-top-5 fade-in duration-200'>
            <div className='flex flex-col space-y-4'>
                {/* Mobile Links */}
                {NAV_LINKS.map((link, index) => (
                    <Link
                        href={link.href}
                        key={index}
                        onClick={onClose}
                        className='text-sm font-medium text-neutral-700 hover:text-primary transition-colors px-2 py-1'
                    >
                        {link.label}
                    </Link>
                ))}

                {/* Divider */}
                <div className='h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent my-3' />

                {/* Mobile Auth Buttons */}
                <div className='flex flex-col gap-3 justify-center items-center'>
                    <Button asChild variant="ghost" className='justify-center w-full border border-neutral-500 text-neutral-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 rounded-full py-5'>
                        <Link href='/signup' onClick={onClose} className='text-center'>Sign up</Link>
                    </Button>
                    <Button asChild className='w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 rounded-full py-5'>
                        <Link href='/login' onClick={onClose}>Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};