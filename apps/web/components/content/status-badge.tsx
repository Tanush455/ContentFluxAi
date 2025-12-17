import { Badge } from "@/components/ui/badge"
import { PostStatus } from "@/components/content/types/content"

export function StatusBadge({ status }: { status: PostStatus }) {
    const variant =
        status === 'PUBLISHED' ? 'default' :
            status === 'SCHEDULED' ? 'secondary' :
                'outline';

    return <Badge variant={variant}>{status}</Badge>
}