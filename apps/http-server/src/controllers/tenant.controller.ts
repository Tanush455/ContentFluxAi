import { Request, Response, NextFunction } from "express";
import { auth } from '../lib/auth';
import { fromNodeHeaders } from "better-auth/node";
import { prisma } from "db/prisma";

// ==========================================
// 1. CREATE WORKSPACE (With Unique Slug Fix)
// ==========================================
export const createTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const { name } = req.body;

        // FIX: Ensure slug is unique. "My Team" -> "my-team-1709324823"
        const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

        const userId = session.user.id;

        const newTenant = await prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: { name, slug }
            });

            await tx.tenantUser.create({
                data: {
                    userId: userId,
                    tenantId: tenant.id,
                    role: 'OWNER'
                }
            });
            return tenant;
        });

        res.status(200).json(newTenant);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to create workspace" });
    }
}


export const getMyWorkspaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) return res.status(401).json({ message: "Unauthorized" });

        // 1. Get the search query from URL (e.g., ?query=marketing)
        const searchQuery = req.query.query as string | undefined;

        // 2. Fetch Memberships with a Relation Filter
        const memberships = await prisma.tenantUser.findMany({
            where: {
                userId: session.user.id,
                tenant: searchQuery ? {
                    name: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                } : undefined
            },
            include: {
                tenant: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        createdAt: true,
                    }
                }
            },
        });

        // Flatten the array to just return the tenant objects
        const tenants = memberships.map((m: any) => m.tenant);

        res.status(200).json(tenants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch workspaces" });
    }
}
