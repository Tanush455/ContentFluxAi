// types/project.ts
export interface Project {
    id: number;
    title: string;
    description: string;
    lastUpdated: string;
    status: "Active" | "Archived" | "Draft";
}