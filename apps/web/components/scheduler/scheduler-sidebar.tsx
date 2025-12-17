import { CalendarWidget } from "./calendar-widget"
import { DailyStats } from "./daily-stats"

interface SchedulerSidebarProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    count: number;
}

export function SchedulerSidebar({ date, setDate, count }: SchedulerSidebarProps) {
    return (
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            <CalendarWidget date={date} setDate={setDate} />
            <DailyStats count={count} />
        </div>
    )
}