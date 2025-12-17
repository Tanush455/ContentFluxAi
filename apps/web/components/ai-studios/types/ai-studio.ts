// types/ai-studio.ts
export interface GeneratorConfig {
    contentType: string;
    tone: string;
    prompt: string;
}

export interface HistoryItem {
    id: number;
    title: string;
    type: string;
    timestamp: string;
}