import { Wand2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GeneratorConfig } from "@/components/ai-studios/types/ai-studio"

interface ConfigurationFormProps {
    config: GeneratorConfig;
    setConfig: (config: GeneratorConfig) => void;
    isGenerating: boolean;
    onGenerate: () => void;
}

export function ConfigurationForm({ config, setConfig, isGenerating, onGenerate }: ConfigurationFormProps) {
    const handleChange = (key: keyof GeneratorConfig, value: string) => {
        setConfig({ ...config, [key]: value });
    };

    return (
        <Card className="flex flex-col h-fit lg:h-full">
            <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Define your content parameters.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Content Type</Label>
                        <Select
                            value={config.contentType}
                            onValueChange={(val) => handleChange('contentType', val)}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blog">Blog Post</SelectItem>
                                <SelectItem value="tweet">Tweet / Thread</SelectItem>
                                <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                                <SelectItem value="email">Email Newsletter</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Tone</Label>
                        <Select
                            value={config.tone}
                            onValueChange={(val) => handleChange('tone', val)}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="casual">Casual & Fun</SelectItem>
                                <SelectItem value="marketing">Marketing / Sales</SelectItem>
                                <SelectItem value="academic">Academic</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2 flex flex-col">
                    <Label>Prompt</Label>
                    <Textarea
                        placeholder="Describe what you want to create..."
                        className="min-h-[150px] lg:flex-1 resize-none p-4 text-base"
                        value={config.prompt}
                        onChange={(e) => handleChange('prompt', e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="pt-4 lg:pt-0 lg:mt-auto">
                <Button className="w-full" size="lg" onClick={onGenerate} disabled={isGenerating}>
                    {isGenerating ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    {isGenerating ? "Generating..." : "Generate Content"}
                </Button>
            </CardFooter>
        </Card>
    )
}