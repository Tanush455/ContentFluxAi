import { Folder, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Project } from "@/components/projects/types/project"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="group hover:border-primary/50 transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Folder className="h-5 w-5 text-primary" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="pt-4">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                    {project.description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-muted/10">
                <span className="text-xs text-muted-foreground">Updated {project.lastUpdated}</span>
                <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    project.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                        project.status === "Archived" ? "bg-gray-100 text-gray-700" :
                            "bg-yellow-100 text-yellow-700"
                )}>
                    {project.status}
                </span>
            </CardFooter>
        </Card>
    )
}