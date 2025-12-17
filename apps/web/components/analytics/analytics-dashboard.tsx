import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewLayout } from "./charts/overview-layout"

export function AnalyticsDashboard() {
    return (
        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="platform">By Platform</TabsTrigger>
                <TabsTrigger value="posts">Top Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
                <OverviewLayout />
            </TabsContent>
            <TabsContent value="platform">
                <div className="h-24 flex items-center justify-center border rounded-md text-muted-foreground">Platform view...</div>
            </TabsContent>
            <TabsContent value="posts">
                <div className="h-24 flex items-center justify-center border rounded-md text-muted-foreground">Top posts view...</div>
            </TabsContent>
        </Tabs>
    )
}