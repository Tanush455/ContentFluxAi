"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { SchedulerHeader } from "@/components/scheduler/scheduler-header"
import { SchedulerSidebar } from "@/components/scheduler/scheduler-sidebar"
import { SchedulerFeed } from "@/components/scheduler/scheduler-feed"

// Mock Data 
const scheduledPosts = [
    {
        id: 1,
        title: "Launch Day Announcement",
        platform: "linkedin",
        date: new Date(2025, 5, 12),
        time: "09:00 AM",
        status: "SCHEDULED"
    },
    {
        id: 2,
        title: "Feature Highlight Thread",
        platform: "twitter",
        date: new Date(2025, 5, 12),
        time: "02:30 PM",
        status: "SCHEDULED"
    },
    {
        id: 3,
        title: "Weekly Summary",
        platform: "linkedin",
        date: new Date(2025, 5, 15),
        time: "10:00 AM",
        status: "DRAFT"
    }
]

export default function SchedulerPage() {
    const router = useRouter()
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 12))

    // Logic: Filter posts for the selected date
    const selectedDatePosts = React.useMemo(() => {
        return scheduledPosts.filter(post =>
            date &&
            post.date.getDate() === date.getDate() &&
            post.date.getMonth() === date.getMonth() &&
            post.date.getFullYear() === date.getFullYear()
        )
    }, [date])

    const handleCreatePost = () => {
        const dateStr = date ? date.toISOString() : new Date().toISOString()
        router.push(`/dashboard/create?date=${dateStr}`)
    }

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col gap-6">
            <SchedulerHeader
                date={date}
                onCreate={handleCreatePost}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden">
                <SchedulerSidebar
                    date={date}
                    setDate={setDate}
                    count={selectedDatePosts.length}
                />

                <SchedulerFeed
                    date={date}
                    posts={selectedDatePosts}
                    onCreate={handleCreatePost}
                />
            </div>
        </div>
    )
}