// app/create/page.tsx
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { PostHeader } from "@/components/create-posts/post-header"
import { EditorArea } from "@/components/create-posts/editor-area"
import { SidebarTools } from "@/components/create-posts/sidebar-tools"
import { Separator } from "@/components/ui/separator"

export default function CreatePostPage() {
    const searchParams = useSearchParams()
    const initialDate = searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined

    // State
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState<Date | undefined>(initialDate)
    const [time, setTime] = useState("09:00")

    // Scheduling State
    const [isScheduled, setIsScheduled] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    // Handlers
    const handleScheduleConfirm = () => {
        if (!date) return;
        setIsScheduled(true)
        setIsCalendarOpen(false)
        console.log(`Scheduled for ${date.toDateString()} at ${time}`)
    }

    const handleUnschedule = () => {
        setIsScheduled(false)
        setDate(undefined)
        setIsCalendarOpen(false)
        console.log("Schedule removed")
    }

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col gap-4">
            <PostHeader
                title={title}
                setTitle={setTitle}
                scheduleProps={{
                    date,
                    setDate,
                    time,
                    setTime,
                    isScheduled,
                    onConfirm: handleScheduleConfirm,
                    onUnschedule: handleUnschedule,
                    isOpen: isCalendarOpen,
                    setIsOpen: setIsCalendarOpen
                }}
            />

            <Separator />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                <EditorArea content={content} onChange={setContent} />
                <SidebarTools />
            </div>
        </div>
    )
}