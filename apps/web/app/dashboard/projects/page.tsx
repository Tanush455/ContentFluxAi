"use client"

import * as React from "react"
import { ProjectsHeader } from "@/components/projects/projects-header"
import { ProjectSearch } from "@/components/projects/project-search"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { Project } from "@/components/projects/types/project"

// Mock Data
const allProjects: Project[] = [
    {
        id: 1,
        title: "SaaS Marketing Q1",
        description: "Campaign focused on increasing organic traffic through AI-generated blog posts.",
        lastUpdated: "2 days ago",
        status: "Active"
    },
    {
        id: 2,
        title: "Website Redesign",
        description: "Overhauling the landing page for better conversion rates.",
        lastUpdated: "5 days ago",
        status: "Active"
    },
    {
        id: 3,
        title: "Email Sequence 2025",
        description: "Drafting the automated welcome sequence for new users.",
        lastUpdated: "1 week ago",
        status: "Draft"
    },
    {
        id: 4,
        title: "Legacy Blog Archive",
        description: "Old content that needs to be reviewed and pruned.",
        lastUpdated: "3 weeks ago",
        status: "Archived"
    }
]

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = React.useState("")

    // Filter logic
    const filteredProjects = React.useMemo(() => {
        return allProjects.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    return (
        <div className="space-y-6">
            <ProjectsHeader />

            <ProjectSearch
                value={searchQuery}
                onChange={setSearchQuery}
            />

            <ProjectsGrid projects={filteredProjects} />
        </div>
    )
}