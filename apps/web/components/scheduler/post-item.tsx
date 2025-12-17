import { MoreVertical, Twitter, Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScheduledPost } from "@/components/scheduler/types/scheduler"

interface PostItemProps {
    post: ScheduledPost;
}

export function PostItem({ post }: PostItemProps) {
    return (
        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/50 transition-colors group">
            {/* Time Column */}
            <div className="min-w-[100px] flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                <span className="text-sm font-bold font-mono">{post.time}</span>
                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">
                    {post.status}
                </Badge>
            </div>

            {/* Content Column */}
            <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    {post.platform === 'linkedin' ? (
                        <Linkedin className="h-4 w-4 text-blue-700" />
                    ) : (
                        <Twitter className="h-4 w-4 text-blue-400" />
                    )}
                    <h4 className="font-semibold text-base">{post.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                    This is a preview of the content scheduled for this slot...
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">Edit</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Publish Now</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}