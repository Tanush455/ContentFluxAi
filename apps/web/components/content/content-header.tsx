import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContentHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Content</h2>
                <p className="text-muted-foreground">View and manage all your generated posts.</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">Bulk Actions</Button>
                <Button><Plus className="mr-2 h-4 w-4" /> Create Post</Button>
            </div>
        </div>
    )
}