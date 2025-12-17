import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DailyStatsProps {
    count: number;
}

export function DailyStats({ count }: DailyStatsProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Daily Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">Posts scheduled for this day</p>
            </CardContent>
        </Card>
    )
}