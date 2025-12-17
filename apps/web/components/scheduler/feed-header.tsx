import { Calendar as CalendarIcon } from "lucide-react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FeedHeaderProps {
    date: Date | undefined;
    count: number;
}

export function FeedHeader({ date, count }: FeedHeaderProps) {
    return (
        <CardHeader className="border-b bg-muted/20 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>
                        {date ? date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
                    </CardTitle>
                </div>
                {count > 0 && (
                    <Badge variant="outline">{count} Posts</Badge>
                )}
            </div>
        </CardHeader>
    )
}