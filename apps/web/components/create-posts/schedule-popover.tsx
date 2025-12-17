import { Calendar as CalendarIcon, Clock, XCircle } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SchedulePopoverProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    time: string;
    setTime: (time: string) => void;
    isScheduled: boolean;
    onConfirm: () => void;
    onUnschedule: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function SchedulePopover({
    date, setDate, time, setTime, isScheduled, onConfirm, onUnschedule, isOpen, setIsOpen
}: SchedulePopoverProps) {
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={isScheduled ? "outline" : "secondary"}
                    className={cn(
                        "min-w-[140px]",
                        isScheduled && "border-green-500 text-green-600 bg-green-50 hover:bg-green-100"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {isScheduled && date ? (
                        <span>{format(date, "MMM d")} @ {time}</span>
                    ) : (
                        "Schedule"
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <div className="p-4 border-b">
                    <h4 className="font-medium leading-none">Pick a date & time</h4>
                    <p className="text-sm text-muted-foreground mt-1">Select when this post should go live.</p>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-md border mx-auto"
                    />

                    <div className="space-y-2">
                        <label className="text-xs font-medium">Time</label>
                        <Select defaultValue={time} onValueChange={setTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <Button onClick={onConfirm} className="w-full">
                            {isScheduled ? "Update Schedule" : "Confirm Schedule"}
                        </Button>

                        {/* The Unschedule Button - Only shows if currently scheduled */}
                        {isScheduled && (
                            <Button
                                variant="ghost"
                                onClick={onUnschedule}
                                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                                <XCircle className="mr-2 h-4 w-4" /> Remove Schedule
                            </Button>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}