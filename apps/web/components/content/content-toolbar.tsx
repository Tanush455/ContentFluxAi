import { Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContentToolbarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}

export function ContentToolbar({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter
}: ContentToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-[250px]">
                    <Input
                        placeholder="Search titles..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="DRAFT">Drafts</SelectItem>
                        <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectContent>
                </Select>

                <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Project" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="q3">Q3 Launch</SelectItem>
                        <SelectItem value="evergreen">Evergreen</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}