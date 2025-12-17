import { Save, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SchedulePopover } from "./schedule-popover"

interface PostHeaderProps {
    title: string;
    setTitle: (title: string) => void;
    // Props to pass down to popover
    scheduleProps: any;
}

export function PostHeader({ title, setTitle, scheduleProps }: PostHeaderProps) {
    return (
        <div className="flex items-center justify-between bg-background z-10">
            <div className="flex-1 mr-4">
                <Input
                    placeholder="Enter post title..."
                    className="text-lg font-semibold h-12 border-transparent hover:border-input focus:border-input transition-all bg-white shadow-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Save className="mr-2 h-4 w-4" /> Save Draft
                </Button>

                <SchedulePopover {...scheduleProps} />

                <Button disabled={scheduleProps.isScheduled}>
                    <Send className="mr-2 h-4 w-4" /> Publish Now
                </Button>
            </div>
        </div>
    )
}