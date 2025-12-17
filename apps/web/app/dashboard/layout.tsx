import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import MainSidebar from "@/components/sidebars/MainSidebar"
import { Separator } from '@/components/ui/separator'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <MainSidebar />
            <main className="flex-1 h-screen overflow-auto bg-background no-scrollbar">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background/95 backdrop-blur z-10">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className='text-sm font-medium'>Dashboard</h1>
                </header>

                <div className="p-6 bg-gradient-to-b from-neutral-200 via-neutral-50 to-white">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}