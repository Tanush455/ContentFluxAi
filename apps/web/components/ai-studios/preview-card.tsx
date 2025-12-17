import { Bot, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PreviewCardProps {
    output: string;
    onUseContent: () => void;
}

export function PreviewCard({ output, onUseContent }: PreviewCardProps) {
    return (
        <Card className="h-full flex flex-col bg-muted/30 border-dashed relative overflow-hidden">
            <CardContent className="flex-1 p-6 overflow-auto">
                {output ? (
                    <div className="prose dark:prose-invert max-w-none">
                        {output}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <Bot className="h-8 w-8 text-primary" />
                        </div>
                        <p>AI output will appear here...</p>
                    </div>
                )}
            </CardContent>

            {output && (
                <div className="p-4 border-t bg-background/50 backdrop-blur-sm absolute bottom-0 w-full">
                    <Button className="w-full shadow-lg" onClick={onUseContent}>
                        Use in Create Post <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </Card>
    )
}