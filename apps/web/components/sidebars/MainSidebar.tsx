'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Sparkles,
    LayoutDashboard,
    FolderKanban,
    FileText,
    PenSquare,
    Bot,
    CalendarDays,
    BarChart3,
    Share2,
    Users,
    CreditCard,
    Settings,
    User,
    LogOut,
    ChevronUp
} from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from '@/components/ui/sidebar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 1. "Team" moved here as requested
const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
    { title: "Content", url: "/dashboard/content", icon: FileText },
    { title: "Create Post", url: "/dashboard/create", icon: PenSquare },
    { title: "AI Studio", url: "/dashboard/ai-studio", icon: Bot },
    { title: "Scheduler", url: "/dashboard/scheduler", icon: CalendarDays },
    { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
    { title: "Social Accounts", url: "/dashboard/social", icon: Share2 },
    { title: "Team", url: "/dashboard/team", icon: Users },
]

export default function MainSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className='flex justify-center p-3.5 pb-2'>
                <Link href="/dashboard" className='flex items-center gap-2 group overflow-hidden'>
                    <div className='size-8 rounded-xl bg-gradient-to-tr from-primary to-primary/70 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105 shrink-0 sm:size-5 sm:rounded-sm'>
                        <Sparkles className='w-4 h-4' />
                    </div>
                    <span className='font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-700 to-neutral-500 dark:from-neutral-200 dark:to-neutral-400 whitespace-nowrap transition-[width,opacity] duration-300 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0'>
                        ContentFlux
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* 2. Consolidated Settings Dropdown in the Footer */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Settings className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Settings</span>
                                        <span className="truncate text-xs">Account & Billing</span>
                                    </div>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width] min-w-56 rounded-lg"
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/billing" className="cursor-pointer">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Billing</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}