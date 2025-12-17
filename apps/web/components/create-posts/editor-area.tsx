import { TiptapEditor } from "@/components/editor/tiptap-editor"

interface EditorAreaProps {
    content: string;
    onChange: (content: string) => void;
}

export function EditorArea({ content, onChange }: EditorAreaProps) {
    return (
        <div className="lg:col-span-8 h-full overflow-y-auto pb-20 scrollbar-hide">
            <TiptapEditor content={content} onChange={onChange} />
        </div>
    )
}