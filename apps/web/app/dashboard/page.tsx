import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, CreditCard, Activity } from 'lucide-react'
import { PieGraph } from '@/components/analytics/charts/pie-graph'
import { BarGraph } from '@/components/analytics/charts/bar-graph'

export default function DashboardPage() {
    const stats = [
        { title: "Total Revenue", value: "$45,231.89", icon: CreditCard, desc: "+20.1% from last month" },
        { title: "Subscriptions", value: "+2350", icon: Users, desc: "+180.1% from last month" },
        { title: "Active Projects", value: "12,234", icon: BarChart3, desc: "+19% from last month" },
        { title: "Active Now", value: "+573", icon: Activity, desc: "+201 since last hour" },
    ]

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
                <p className="text-muted-foreground">Here's what's happening with your content today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.desc}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-1 border-dashed lg:col-span-4">
                    <BarGraph />
                </div>
                <div className="col-span-1 border-dashed lg:col-span-3">
                    <PieGraph />
                </div>
            </div>
        </div>
    )
}