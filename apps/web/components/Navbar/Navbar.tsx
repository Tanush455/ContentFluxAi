"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust path
import { NavbarLogo } from './NavBar-Configs/navbar-logo';
import { DesktopNav } from './NavBar-Configs/desktop-nav';
import { MobileToggle } from './NavBar-Configs/mobile-toggle';
import { MobileDropdown } from './NavBar-Configs/mobile-dropdown';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className='sticky top-0 z-50 w-[80%] border-b border-neutral-300 mx-auto rounded-2xl shadow-2xl bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 z-20'>
            <div className='container flex h-16 items-center justify-between px-4 md:px-6'>

                <NavbarLogo />

                <DesktopNav />

                <div className='hidden md:flex items-center gap-4'>
                    <Button asChild variant="ghost" className='text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300'>
                        <Link href='/signup'>Sign up</Link>
                    </Button>
                    <Button asChild className='bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95'>
                        <Link href='/login'>Login</Link>
                    </Button>
                </div>

                <MobileToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </div>

            <MobileDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </header>
    );
}