import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatItem } from "@/components/analytics/types/analytics"
import { cn } from "@/lib/utils"

interface StatCardProps {
    item: StatItem;
}

export function StatCard({ item }: StatCardProps) {
    const Icon = item.icon;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className={cn(
                    "text-xs flex items-center pt-1",
                    item.trendDirection === "up" ? "text-green-500" : "text-red-500"
                )}>
                    {item.trendDirection === "up" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {item.trend}
                </p>
            </CardContent>
        </Card >
    )
}