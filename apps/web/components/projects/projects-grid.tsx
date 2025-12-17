import { Project } from "@/components/projects/types/project"
import { ProjectCard } from "./project-card"

interface ProjectsGridProps {
    projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    if (projects.length === 0) {
        return <div className="text-center py-10 text-muted-foreground">No projects found.</div>
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}