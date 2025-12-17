import { StatItem } from "@/components/analytics/types/analytics"
import { StatCard } from "./stat-card"

interface StatsGridProps {
    stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
                <StatCard key={index} item={stat} />
            ))}
        </div>
    )
}