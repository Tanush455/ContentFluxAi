import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { FeedHeader } from "./feed-header"
import { PostItem } from "./post-item"
import { EmptyState } from "./empty-state"
import { ScheduledPost } from "@/components/scheduler/types/scheduler"

interface SchedulerFeedProps {
    date: Date | undefined;
    posts: ScheduledPost[];
    onCreate: () => void;
}

export function SchedulerFeed({ date, posts, onCreate }: SchedulerFeedProps) {
    return (
        <Card className="lg:col-span-8 xl:col-span-9 flex flex-col h-full overflow-hidden">
            <FeedHeader date={date} count={posts.length} />
            <CardContent className="p-0 flex-1 relative">
                {posts.length > 0 ? (
                    <ScrollArea className="h-full">
                        <div className="divide-y">
                            {posts.map((post) => (
                                <PostItem key={post.id} post={post} />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <EmptyState date={date} onCreate={onCreate} />
                )}
            </CardContent>
        </Card>
    )
}