import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SchedulerHeaderProps {
    date: Date | undefined;
    onCreate: () => void;
}

export function SchedulerHeader({ date, onCreate }: SchedulerHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Scheduler</h2>
                <p className="text-muted-foreground">Manage your content timeline.</p>
            </div>
            <Button onClick={onCreate}>
                <Plus className="mr-2 h-4 w-4" /> Schedule for {date ? date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Selected Date'}
            </Button>
        </div>
    )
}