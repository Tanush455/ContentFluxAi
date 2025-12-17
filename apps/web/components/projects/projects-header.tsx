import { CreateProjectDialog } from "./create-project-dialog"

export function ProjectsHeader() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                <p className="text-muted-foreground">Manage your campaigns and client workspaces.</p>
            </div>
            <CreateProjectDialog />
        </div>
    )
}