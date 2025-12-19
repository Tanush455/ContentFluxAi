"use client"

import * as React from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"

import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Minus,
    Undo,
    Redo,
    WrapText,
    ChevronDown,
    Type,
    Heading1,
    Heading2,
    Heading3,
} from "lucide-react"

interface EditorProps {
    content?: string
    onChange?: (content: string) => void
}

/** Tooltip wrapper for toolbar buttons */
function ToolbarTooltip({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <Tooltip>
            {/* Use a span as trigger so tooltips can show even if the inner button is disabled */}
            <TooltipTrigger asChild>
                <span className="inline-flex">{children}</span>
            </TooltipTrigger>

            <TooltipContent side="bottom" align="center" className="rounded-full px-3 py-1.5">
                <p className="text-xs">{label}</p>
            </TooltipContent>
        </Tooltip>
    )
}

function getHeadingLabel(editor: Editor) {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1"
    if (editor.isActive("heading", { level: 2 })) return "Heading 2"
    if (editor.isActive("heading", { level: 3 })) return "Heading 3"
    return "Normal"
}

function HeadingDropdown({ editor }: { editor: Editor }) {
    const label = getHeadingLabel(editor)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                    {label === "Normal" ? (
                        <Type className="h-4 w-4" />
                    ) : label === "Heading 1" ? (
                        <Heading1 className="h-4 w-4" />
                    ) : label === "Heading 2" ? (
                        <Heading2 className="h-4 w-4" />
                    ) : (
                        <Heading3 className="h-4 w-4" />
                    )}
                    <span className="text-xs">{label}</span>
                    <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuItem
                    onSelect={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive("paragraph") ? "bg-muted" : ""}
                >
                    <Type className="mr-2 h-4 w-4" />
                    Normal
                </DropdownMenuItem>

                <DropdownMenuItem
                    onSelect={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
                >
                    <Heading1 className="mr-2 h-4 w-4" />
                    Heading 1
                </DropdownMenuItem>

                <DropdownMenuItem
                    onSelect={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
                >
                    <Heading2 className="mr-2 h-4 w-4" />
                    Heading 2
                </DropdownMenuItem>

                <DropdownMenuItem
                    onSelect={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
                >
                    <Heading3 className="mr-2 h-4 w-4" />
                    Heading 3
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function TiptapEditor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3, 4, 5, 6] },
            }),
            Placeholder.configure({
                placeholder: "Write something amazing...",
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class:
                    "tiptap prose prose-neutral dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-4",
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
        immediatelyRender: false,
    })

    if (!editor) return null

    return (
        <div className="border rounded-md bg-card flex flex-col w-full overflow-hidden">
            <TooltipProvider delayDuration={150}>
                {/* Editor Toolbar */}
                <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted/30 sticky top-0 z-10">
                    {/* Text Style Group */}
                    <ToolbarTooltip label="Bold">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive("bold")}
                            onPressedChange={() => editor.chain().focus().toggleBold().run()}
                        >
                            <Bold className="h-4 w-4" />
                        </Toggle>
                    </ToolbarTooltip>

                    <ToolbarTooltip label="Italic">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive("italic")}
                            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                        >
                            <Italic className="h-4 w-4" />
                        </Toggle>
                    </ToolbarTooltip>

                    <ToolbarTooltip label="Strikethrough">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive("strike")}
                            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                        >
                            <Strikethrough className="h-4 w-4" />
                        </Toggle>
                    </ToolbarTooltip>

                    <ToolbarTooltip label="Inline code">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive("code")}
                            onPressedChange={() => editor.chain().focus().toggleCode().run()}
                        >
                            <Code className="h-4 w-4" />
                        </Toggle>
                    </ToolbarTooltip>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    {/* Heading Dropdown */}
                    <ToolbarTooltip label="Headings">
                        <div>
                            <HeadingDropdown editor={editor} />
                        </div>
                    </ToolbarTooltip>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    {/* List Group */}
                    <ToolbarTooltip label="Bullet list">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive("bulletList")}
                            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                        >
                            <List className="h-4 w-4" />
                        </Toggle>
                    </ToolbarTooltip>

                    <ToolbarTooltip label="Numbered list">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive("orderedList")}
                            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                        >
                            <ListOrdered className="h-4 w-4" />
                        </Toggle>
                    </ToolbarTooltip>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    {/* Block Elements Group */}
                    <ToolbarTooltip label="Quote">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive("blockquote")}
                            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                        >
                            <Quote className="h-4 w-4" />
                        </Toggle>
                    </ToolbarTooltip>

                    <ToolbarTooltip label="Divider">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                    </ToolbarTooltip>

                    <ToolbarTooltip label="Line break">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().setHardBreak().run()}
                        >
                            <WrapText className="h-4 w-4" />
                        </Button>
                    </ToolbarTooltip>

                    {/* History Group */}
                    <div className="ml-auto flex gap-1">
                        <ToolbarTooltip label="Undo">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().chain().focus().undo().run()}
                            >
                                <Undo className="h-4 w-4" />
                            </Button>
                        </ToolbarTooltip>

                        <ToolbarTooltip label="Redo">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().chain().focus().redo().run()}
                            >
                                <Redo className="h-4 w-4" />
                            </Button>
                        </ToolbarTooltip>
                    </div>
                </div>
            </TooltipProvider>

            <EditorContent editor={editor} className="no-scrollbar" />
        </div>
    )
}
