// app/analytics/page.tsx
import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { StatsGrid } from "@/components/analytics/stats-grid"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { StatItem } from "@/components/analytics/types/analytics"
import { Eye, MousePointerClick, Share2 } from "lucide-react"

// Mock Data
const analyticsData: StatItem[] = [
    {
        title: "Total Impressions",
        value: "45.2K",
        trend: "+20.1% from last month",
        trendDirection: "up",
        icon: Eye
    },
    {
        title: "Engagement Rate",
        value: "3.8%",
        trend: "+1.2% from last month",
        trendDirection: "up",
        icon: MousePointerClick
    },
    {
        title: "Shares & Retweets",
        value: "1,203",
        trend: "+14% from last month",
        trendDirection: "up",
        icon: Share2
    }
]

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <AnalyticsHeader />
            <StatsGrid stats={analyticsData} />
            <AnalyticsDashboard />
        </div>
    )
}