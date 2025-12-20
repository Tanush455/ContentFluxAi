import { PostItem } from "./post-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyState from "./empty-state";
export function PostList() {
    // This would normally fetch data or receive props
    const posts = [
        {
            time: "10:00 AM",
            content: "Excited to share our new roadmap for Q4! Lots of amazing features coming up. #product #tech",
            platform: "twitter" as const,
            status: "scheduled" as const,
        },
        {
            time: "02:30 PM",
            content: "Join us for a live demo of the new application dashboard. Link in bio.",
            platform: "instagram" as const,
            status: "published" as const,
        },
        {
            time: "04:15 PM",
            content: "We are hiring! Looking for talented frontend engineers to join our team.",
            platform: "linkedin" as const,
            status: "failed" as const,
        },
        {
            time: "06:00 PM",
            content: "Sneak peek at the new dark mode design.",
            platform: "twitter" as const,
            status: "scheduled" as const,
        },
    ];

    const hasPosts = posts.length > 0;

    return (
        <div className="flex-1 min-h-0 bg-background rounded-md border">
            {hasPosts ? (
                <ScrollArea className="h-[calc(100vh-250px)] p-4">
                    <div className="space-y-4">
                        {posts.map((post, index) => (
                            <PostItem
                                key={index}
                                time={post.time}
                                content={post.content}
                                platform={post.platform}
                                status={post.status}
                            />
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <EmptyState />
            )}
        </div>
    );
}
