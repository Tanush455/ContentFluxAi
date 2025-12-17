// app/ai-studio/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StudioHeader } from "@/components/ai-studios/studio-header"
import { ConfigurationForm } from "@/components/ai-studios/configuration-form"
import { StudioResults } from "@/components/ai-studios/studio-results"
import { GeneratorConfig, HistoryItem } from "@/components/ai-studios/types/ai-studio"

// Mock History Data
const mockHistory: HistoryItem[] = [
    { id: 1, title: "Marketing Strategy for Q3 SaaS Launch", type: "Blog Post", timestamp: "2 hours ago" },
    { id: 2, title: "10 Tips for Remote Work", type: "LinkedIn Post", timestamp: "5 hours ago" },
    { id: 3, title: "Product Hunt Launch Thread", type: "Tweet", timestamp: "1 day ago" },
    { id: 4, title: "Welcome Email Sequence", type: "Email", timestamp: "2 days ago" },
]

export default function AIStudioPage() {
    const router = useRouter()

    // State
    const [aiOutput, setAiOutput] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [config, setConfig] = useState<GeneratorConfig>({
        contentType: "blog",
        tone: "professional",
        prompt: ""
    })

    const handleGenerate = () => {
        setIsGenerating(true)
        // Simulate API call using the config
        setTimeout(() => {
            setAiOutput(`[Generated ${config.contentType} in ${config.tone} tone]: \n\nHere is your AI generated content based on the prompt: "${config.prompt}". \n\nRemote work offers flexibility, reduces commute stress, and allows access to a global talent pool...`)
            setIsGenerating(false)
        }, 1500)
    }

    const handlePasteToPost = () => {
        if (!aiOutput) return;
        const params = new URLSearchParams()
        params.set("content", aiOutput)
        router.push(`/dashboard/create?${params.toString()}`)
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-0 min-h-[calc(100vh-8rem)]">
            <StudioHeader />

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 h-full">
                <ConfigurationForm
                    config={config}
                    setConfig={setConfig}
                    isGenerating={isGenerating}
                    onGenerate={handleGenerate}
                />

                <StudioResults
                    output={aiOutput}
                    history={mockHistory}
                    onUseContent={handlePasteToPost}
                />
            </div>
        </div>
    )
}