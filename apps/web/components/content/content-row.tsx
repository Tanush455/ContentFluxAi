import { MoreHorizontal, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Post } from "@/components/content/types/content"
import { StatusBadge } from "./status-badge"

interface ContentRowProps {
    post: Post;
}

export function ContentRow({ post }: ContentRowProps) {
    return (
        <TableRow>
            <TableCell>
                <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-xs text-muted-foreground">Edited {post.date} by {post.author}</span>
                </div>
            </TableCell>
            <TableCell>{post.project}</TableCell>
            <TableCell>
                <div className="flex gap-1">
                    {post.platforms.includes('twitter') && <Twitter className="h-4 w-4 text-blue-400" />}
                    {post.platforms.includes('linkedin') && <Linkedin className="h-4 w-4 text-blue-700" />}
                </div>
            </TableCell>
            <TableCell>
                <StatusBadge status={post.status} />
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}