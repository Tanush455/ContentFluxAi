import { Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PreviewCard } from "./preview-card"
import { HistoryList } from "./history-list"
import { GeneratorConfig, HistoryItem } from "@/components/ai-studios/types/ai-studio"

interface StudioResultsProps {
    output: string;
    history: HistoryItem[];
    onUseContent: () => void;
}

export function StudioResults({ output, history, onUseContent }: StudioResultsProps) {
    return (
        <div className="flex flex-col gap-4 h-[500px] lg:h-full">
            <Tabs defaultValue="preview" className="flex-1 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="preview" className="flex-1 sm:flex-none">Preview</TabsTrigger>
                        <TabsTrigger value="history" className="flex-1 sm:flex-none">History</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                        <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="preview" className="flex-1 mt-0 h-full">
                    <PreviewCard output={output} onUseContent={onUseContent} />
                </TabsContent>

                <TabsContent value="history" className="flex-1 mt-0">
                    <HistoryList history={history} />
                </TabsContent>
            </Tabs>
        </div>
    )
}