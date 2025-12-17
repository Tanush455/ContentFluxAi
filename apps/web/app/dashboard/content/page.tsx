// app/content/page.tsx
"use client"

import * as React from "react"
import { ContentHeader } from "@/components/content/content-header"
import { ContentToolbar } from "@/components/content/content-toolbar"
import { ContentTable } from "@/components/content/content-table"
import { Post } from "@/components/content/types/content"

// Mock Data
const allPosts: Post[] = [
    { id: "1", title: "Top 10 AI Tools", project: "Q3 Launch", status: "PUBLISHED", author: "Alex", date: "2024-03-10", platforms: ["twitter"] },
    { id: "2", title: "How to Scale SaaS", project: "Evergreen", status: "DRAFT", author: "Sarah", date: "2024-03-12", platforms: ["linkedin"] },
    { id: "3", title: "Marketing Guide", project: "Q3 Launch", status: "SCHEDULED", author: "Alex", date: "2024-03-15", platforms: ["twitter", "linkedin"] },
]

export default function ContentPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")

    // Filter Logic
    const filteredPosts = React.useMemo(() => {
        return allPosts.filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || post.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
    }, [searchQuery, statusFilter])

    return (
        <div className="space-y-6">
            <ContentHeader />

            <ContentToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <ContentTable posts={filteredPosts} />
        </div>
    )
}