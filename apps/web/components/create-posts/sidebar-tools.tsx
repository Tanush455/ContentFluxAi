import { ImageIcon, FileText, Sparkles, History } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SidebarTools() {
    return (
        <div className="lg:col-span-4 h-full flex flex-col border-l pl-6">
            <Tabs defaultValue="media" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="media"><ImageIcon className="h-4 w-4" /></TabsTrigger>
                    <TabsTrigger value="docs"><FileText className="h-4 w-4" /></TabsTrigger>
                    <TabsTrigger value="ai"><Sparkles className="h-4 w-4" /></TabsTrigger>
                    <TabsTrigger value="versions"><History className="h-4 w-4" /></TabsTrigger>
                </TabsList>

                <div className="flex-1 mt-4 overflow-y-auto bg-muted/10 rounded-lg border p-4">
                    <TabsContent value="media" className="mt-0 space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                            <ImageIcon className="h-8 w-8 mb-2" />
                            <span className="text-sm text-center">Drag images here</span>
                        </div>
                        {/* Mock Images Grid */}
                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-muted rounded-md relative group overflow-hidden"></div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="ai" className="mt-0 space-y-4">
                        <Card>
                            <CardHeader className="p-4"><CardTitle className="text-sm">Quick Rewrite</CardTitle></CardHeader>
                            <CardContent className="p-4 pt-0 space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start">Make it professional</Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">Fix grammar</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Other tabs omitted for brevity but would follow same pattern */}
                </div>
            </Tabs>
        </div>
    )
}