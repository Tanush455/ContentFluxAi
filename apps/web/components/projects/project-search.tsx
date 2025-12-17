import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProjectSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ProjectSearch({ value, onChange }: ProjectSearchProps) {
    return (
        <div className="flex items-center space-x-2 bg-card p-1 rounded-md border w-fit">
            <Search className="h-4 w-4 ml-2 text-muted-foreground" />
            <Input
                placeholder="Search projects..."
                className="border-none shadow-none focus-visible:ring-0 w-[200px] sm:w-[250px]"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}