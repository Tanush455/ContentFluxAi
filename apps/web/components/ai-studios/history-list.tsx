import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HistoryItem } from "@/components/ai-studios/types/ai-studio"

interface HistoryListProps {
    history: HistoryItem[];
}

export function HistoryList({ history }: HistoryListProps) {
    return (
        <Card className="h-full overflow-hidden">
            <CardHeader>
                <CardTitle className="text-sm">Recent Generations</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto h-[calc(100%-4rem)]">
                <div className="space-y-4 pb-4">
                    {history.map((item) => (
                        <div key={item.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <span className="text-xs text-muted-foreground">{item.timestamp} • {item.type}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}