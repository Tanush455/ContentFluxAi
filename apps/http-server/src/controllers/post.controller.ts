import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { prisma } from "db/prisma";
import { Resend } from "resend";

// GET /api/projects/:projectId/posts
export const getPostsOfProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Authenticate
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const tenantId = req.headers['x-tenant-id'] as string;
        const userId = session.user.id;
        const { projectId } = req.params;

        // 2. Gatekeeper: Check if User is in this Workspace
        const member = await prisma.tenantUser.findUnique({
            where: {
                tenantId_userId: {
                    tenantId: tenantId,
                    userId: userId
                }
            }
        });

        if (!member) {
            return res.status(403).json({ message: 'You are not a member of this workspace' });
        }

        // 3. Security Check: Ensure Project belongs to this Tenant
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                tenantId: tenantId
            }
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found in this workspace" });
        }

        // 4. Fetch the Posts
        const posts = await prisma.post.findMany({
            where: {
                projectId: projectId
            },
            include: {
                author: {
                    select: { name: true, image: true }
                },
                _count: {
                    select: { versions: true } // Optional: Stats
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        res.status(200).json(posts);

    } catch (error: any) {
        console.error("Get Posts Error:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}


// GET /api/projects/:projectId/posts/postId

// GET /api/projects/:projectId/posts/:postId
export const getThePostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Authenticate
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const tenantId = req.headers['x-tenant-id'] as string;
        const userId = session.user.id;
        const { projectId, postId } = req.params;

        // 2. Gatekeeper: Check if User is in this Workspace
        const member = await prisma.tenantUser.findUnique({
            where: {
                tenantId_userId: {
                    tenantId: tenantId,
                    userId: userId
                }
            }
        });

        if (!member) {
            return res.status(403).json({ message: 'You are not a member of this workspace' });
        }

        // 3. Fetch Post SECURELY
        // We use findFirst so we can filter by Project AND Tenant at the same time
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                projectId: projectId, // Ensure it matches the URL
                project: {
                    tenantId: tenantId // <--- CRITICAL: Ensures post belongs to this tenant
                }
            },
            include: {
                versions: {
                    orderBy: { createdAt: 'desc' },
                    take: 5 // Get last 5 versions
                },
                socialVariants: true,
                media: true
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);

    } catch (error: any) {
        console.error("Get Post Error:", error);
        res.status(500).json({ message: "Failed to fetch post" });
    }
}


export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const tenantId = req.headers['x-tenant-id'] as string;
        const { projectId } = req.params;
        const { title } = req.body;

        // FIX 1: Validate projectId immediately
        // This tells TypeScript: "If projectId is missing, stop here."
        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        // 1. Verify User is in Tenant
        const member = await prisma.tenantUser.findUnique({
            where: { tenantId_userId: { tenantId, userId: session.user.id } }
        });
        if (!member) return res.status(403).json({ message: "Access Denied" });

        // 2. Verify Project is in Tenant
        const project = await prisma.project.findFirst({
            where: { id: projectId, tenantId }
        });
        if (!project) return res.status(404).json({ message: "Project not found" });

        // 3. Create Draft
        const newPost = await prisma.post.create({
            data: {
                title: title || "Untitled Draft",
                projectId: projectId,
                authorId: session.user.id,
                status: "DRAFT",
                body: { type: 'doc', content: [] },
            },
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create post" });
    }
}

// PATCH /api/projects/:projectId/posts/:postId
export const savePost = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const tenantId = req.headers['x-tenant-id'] as string;
        const { projectId, postId } = req.params;
        const { title, body, status } = req.body;

        // 1. Verify User is in Tenant
        const member = await prisma.tenantUser.findUnique({
            where: { tenantId_userId: { tenantId, userId: session.user.id } }
        });
        if (!member) return res.status(403).json({ message: "Access Denied" });

        // 2. Update Post (Securely Scoped)
        // We use updateMany to ensure we only update if the post belongs to this Project & Tenant
        const result = await prisma.post.updateMany({
            where: {
                id: postId,
                projectId: projectId,
                project: { tenantId: tenantId } // <--- The Tenant Lock
            },
            data: {
                title,
                body,
                status,
                updatedAt: new Date()
            }
        });

        if (result.count === 0) {
            return res.status(404).json({ message: "Post not found or permission denied" });
        }

        res.status(200).json({ message: "Post saved successfully" });

    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ message: "Failed to save post" });
    }
};



export const deletePost = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const tenantId = req.headers['x-tenant-id'] as string;
        const { projectId, postId } = req.params;

        // 1. Fetch to check permissions
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                projectId: projectId,
                project: { tenantId: tenantId }
            }
        });

        if (!post) return res.status(404).json({ message: "Post not found" });

        // 2. Check Permissions (Author OR Admin)
        const membership = await prisma.tenantUser.findUnique({
            where: { tenantId_userId: { tenantId, userId: session.user.id } }
        });

        const isAuthor = post.authorId === session.user.id;
        const isAdmin = membership?.role === 'OWNER' || membership?.role === 'ADMIN';

        if (!isAuthor && !isAdmin) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }

        // 3. Delete
        await prisma.post.delete({ where: { id: postId } });

        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete" });
    }
};