// types/content.ts
export type PostStatus = "PUBLISHED" | "DRAFT" | "SCHEDULED";
export type Platform = "twitter" | "linkedin";

export interface Post {
    id: string;
    title: string;
    project: string;
    status: PostStatus;
    author: string;
    date: string;
    platforms: Platform[];
}