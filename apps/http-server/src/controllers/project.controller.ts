import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { prisma } from "db/prisma";

export const getAllListProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const tenantId = req.headers['x-tenant-id'] as string;
        if (!tenantId) return res.status(400).json({ message: "Tenant ID header is missing" });

        // 1. Get Search Query from URL (e.g. /projects/list?query=campaign)
        const searchQuery = req.query.query as string | undefined;

        // 2. Gatekeeper Check
        const isMember = await prisma.tenantUser.findUnique({
            where: {
                tenantId_userId: {
                    tenantId: tenantId,
                    userId: session.user.id
                }
            }
        });

        if (!isMember) return res.status(403).json({ message: "Access Denied" });

        // 3. Build the Where Clause
        const whereClause: any = {
            tenantId: tenantId, // Always filter by Tenant
        };

        // If a search term exists, add the filter
        if (searchQuery) {
            whereClause.projectName = {
                contains: searchQuery,
                mode: 'insensitive' // Case-insensitive search (e.g., "marketing" finds "Marketing")
            };
        }

        // 4. Fetch Projects
        const projects = await prisma.project.findMany({
            where: whereClause,
            include: {
                createdBy: {
                    select: { name: true, image: true }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        res.status(200).json(projects);

    } catch (error: any) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// Logic to create a Project  only those how are the owner or admin in the workspace can create the project

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Authenticate User
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // 2. Get Data
        // Use Header for Context (Tenant ID), Body for Payload (Project Name)
        const tenantId = req.headers['x-tenant-id'] as string;
        const { projectName, projectDescription } = req.body;

        if (!tenantId) return res.status(400).json({ message: "Tenant ID missing" });

        // 3. SECURITY CHECK: Query the Database for the REAL Role
        const membership = await prisma.tenantUser.findUnique({
            where: {
                tenantId_userId: {
                    tenantId: tenantId,
                    userId: session.user.id
                }
            }
        });

        // 4. Verify Role
        // Check if they exist AND if they have permission
        if (!membership) {
            return res.status(403).json({ message: "You are not a member of this workspace" });
        }

        // Decide: Can regular Members create projects? Or only Admins?
        // Usually, Members CAN create projects. If you want ONLY Owners, keep this check:
        if (membership.role !== "OWNER" && membership.role !== "ADMIN") {
            return res.status(403).json({ message: "Only Admins can create projects" });
        }

        // 5. Create Project
        const project = await prisma.project.create({
            data: {
                tenantId: tenantId,
                projectName: projectName,
                projectDescription: projectDescription,
                createdById: session.user.id
            }
        });

        res.status(201).json(project);

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Failed to create project" });
    }
}


export const getProjectById = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const { projectId } = req.params;
        const tenantId = req.headers['x-tenant-id'] as string;

        // 1. Gatekeeper: Am I in this Tenant?
        const membership = await prisma.tenantUser.findUnique({
            where: { tenantId_userId: { tenantId, userId: session.user.id } }
        });
        if (!membership) return res.status(403).json({ message: "Access Denied" });

        // 2. Fetch Project (MUST belong to this Tenant)
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                tenantId: tenantId // <--- Critical Security Check
            },
            include: {
                _count: { select: { posts: true } } // Optional: Stats
            }
        });

        if (!project) return res.status(404).json({ message: "Project not found" });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const updateProject = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const { projectId } = req.params;
        const { projectName, projectDescription } = req.body;
        const tenantId = req.headers['x-tenant-id'] as string;

        // 1. Gatekeeper (Are you in this Tenant?)
        const membership = await prisma.tenantUser.findUnique({
            where: { tenantId_userId: { tenantId, userId: session.user.id } }
        });
        if (!membership) return res.status(403).json({ message: "Access Denied" });

        // 2. Fetch Project SECURELY (Must belong to THIS Tenant)
        const existingProject = await prisma.project.findFirst({
            where: {
                id: projectId,
                tenantId: tenantId
            }
        });

        if (!existingProject) return res.status(404).json({ message: "Project not found in this workspace" });

        // 3. Permission Check
        const isCreator = existingProject.createdById === session.user.id;
        const isAdmin = membership.role === 'OWNER' || membership.role === 'ADMIN';

        if (!isCreator && !isAdmin) {
            return res.status(403).json({ message: "Only Admins or the Creator can edit this." });
        }

        // 4. Update
        const updated = await prisma.project.update({
            where: { id: projectId },
            data: { projectName, projectDescription }
        });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const { projectId } = req.params;
        const tenantId = req.headers['x-tenant-id'] as string;

        // 1. Gatekeeper & Role Check combined
        const membership = await prisma.tenantUser.findUnique({
            where: { tenantId_userId: { tenantId, userId: session.user.id } }
        });

        if (!membership) return res.status(403).json({ message: "Access Denied" });

        // 2. Fetch Project to verify Tenant ownership
        const project = await prisma.project.findFirst({
            where: { id: projectId, tenantId }
        });

        if (!project) return res.status(404).json({ message: "Project not found" });

        // 3. Strict Permission: Only Owner/Admin or Creator
        const isCreator = project.createdById === session.user.id;
        const isAdmin = membership.role === 'OWNER' || membership.role === 'ADMIN';

        if (!isAdmin && !isCreator) {
            return res.status(403).json({ message: "You don't have permission to delete this." });
        }

        // 4. Delete
        await prisma.project.delete({ where: { id: projectId } });

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
}