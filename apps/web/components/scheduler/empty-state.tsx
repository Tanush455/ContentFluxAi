import { Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
    date: Date | undefined;
    onCreate: () => void;
}

export function EmptyState({ date, onCreate }: EmptyStateProps) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4 p-8 text-center">
            <div className="bg-muted/50 p-6 rounded-full">
                <Clock className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <div>
                <h3 className="font-semibold text-lg text-foreground">No posts scheduled</h3>
                <p className="max-w-xs mx-auto mt-2">
                    There is no content scheduled for {date?.toLocaleDateString()}.
                    Click the button below to add one.
                </p>
            </div>
            <Button onClick={onCreate}>
                <Plus className="mr-2 h-4 w-4" /> Create Post
            </Button>
        </div>
    )
}