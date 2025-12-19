import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import * as React from "react"

export default function ToolbarTooltip({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side="bottom" align="center">
                <p className="text-xs">{label}</p>
            </TooltipContent>
        </Tooltip>
    )
}
