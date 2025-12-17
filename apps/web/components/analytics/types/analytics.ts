// types/analytics.ts
import { LucideIcon } from "lucide-react"

export interface StatItem {
    title: string;
    value: string;
    trend: string;
    trendDirection: "up" | "down";
    icon: LucideIcon;
}