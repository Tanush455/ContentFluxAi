import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import BentoGrid from '@/components/Hero/BentoGrid'
import Testimonials from '@/components/Hero/Carousel'
import Pricing from '@/components/Hero/Pricing'
import Footer from '@/components/Hero/Footer'
import FooterContent from '@/components/Hero/FooterContent'
export default function Home() {
    return (

        <div className='min-h-screen relative bg-gradient-to-b from-white via-neutral-50 to-white no-scrollbar'>
            <Navbar />
            <main className='w-full flex flex-col'>
                <Hero />
                <BentoGrid />
                <Testimonials />
                <Pricing />
                <Footer />
            </main>

            <FooterContent />
        </div>
    )
}