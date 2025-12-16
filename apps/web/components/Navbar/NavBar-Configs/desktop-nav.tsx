import Link from 'next/link';
import { NAV_LINKS } from './utils/nav-config'; // Adjust path as needed

export const DesktopNav = () => {
    return (
        <nav className='hidden md:flex items-center gap-8'>
            {NAV_LINKS.map((link, index) => (
                <Link
                    href={link.href}
                    key={index}
                    className='text-sm font-medium text-neutral-700 hover:text-primary transition-colors duration-300 hover:drop-shadow-sm'
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};