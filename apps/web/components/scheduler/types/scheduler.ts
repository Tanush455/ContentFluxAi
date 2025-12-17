// types/scheduler.ts
export interface ScheduledPost {
    id: number;
    title: string;
    platform: string;
    date: Date;
    time: string;
    status: string;
}