import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Post } from "@/components/content/types/content"
import { ContentRow } from "./content-row"

interface ContentTableProps {
    posts: Post[];
}

export function ContentTable({ posts }: ContentTableProps) {
    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[400px]">Title</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Platforms</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <ContentRow key={post.id} post={post} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}