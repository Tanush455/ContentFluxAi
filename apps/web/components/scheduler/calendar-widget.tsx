import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

interface CalendarWidgetProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export function CalendarWidget({ date, setDate }: CalendarWidgetProps) {
    return (
        <Card className="h-fit">
            <CardContent className="p-1.5 flex justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                    className="rounded-md border shadow-sm w-full"
                    fromYear={2024}
                    toYear={2030}
                />
            </CardContent>
        </Card>
    )
}