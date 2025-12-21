import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
// I recommend using built-in crypto instead of external packages for tokens
import crypto from 'crypto';
import { inviteEmailHtml } from '../lib/emails/invitaion.link';
import { prisma } from "db/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const teamInvite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Authenticate
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const { email, role } = req.body;
        const tenantId = req.headers['x-tenant-id'] as string;
        const userId = session.user.id;

        // FIX 1: Check if tenantId is MISSING, not if it exists
        if (!tenantId) {
            return res.status(400).json({ message: "Workspace context missing" });
        }

        // 2. Gatekeeper: Is the sender an Admin/Owner?
        const member = await prisma.tenantUser.findUnique({
            where: {
                tenantId_userId: {
                    tenantId: tenantId,
                    userId: userId
                }
            }
        });

        if (!member || (member.role !== 'OWNER' && member.role !== 'ADMIN')) {
            return res.status(403).json({ message: "Only Admins can invite members" });
        }

        // 3. Check if user is already in the workspace
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            const isAlreadyMember = await prisma.tenantUser.findUnique({
                where: {
                    tenantId_userId: {
                        tenantId: tenantId,
                        userId: existingUser.id
                    }
                }
            });
            if (isAlreadyMember) {
                return res.status(409).json({ message: "User is already a member of this workspace" });
            }
        }

        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId }
        });

        if (!tenant) return res.status(404).json({ message: "Tenant not found" });

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        const inviteUrl = `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;

        // 5. Upsert Invite to DB
        await prisma.invite.upsert({
            where: {
                email_tenantId: {
                    email,
                    tenantId
                }
            },
            update: {
                token,
                expiresAt,
                role: role || 'MEMBER',
                inviterId: userId
            },
            create: {
                email,
                tenantId,
                token,
                expiresAt,
                role: role || 'MEMBER',
                inviterId: userId
            }
        });

        // 6. Send Email
        await resend.emails.send({
            from: 'ContentFlux <onboarding@yourdomain.com>',
            to: email,
            subject: `Invitation to join ${tenant.name} on ContentFlux`,
            html: inviteEmailHtml({
                appName: "ContentFlux",
                inviterName: session.user.name,
                workspaceName: tenant.name, // Use the real workspace name
                inviteUrl: inviteUrl,       // Pass the defined URL
                expiresInMinutes: 10
            })
        });

        // FIX 4: Send success response
        res.status(200).json({ message: "Invite sent successfully" });

    } catch (error: any) {
        console.error("Invite Error:", error);
        res.status(500).json({ message: "Failed to send invite" });
    }
}


export const acceptInvite = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is missing" });
        }

        // 1. Authenticate (User must be logged in to accept)
        // Ideally, your frontend redirects to Login/Signup before calling this
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) {
            return res.status(401).json({ message: "Please login to accept the invite" });
        }

        // 2. Find the Invite
        const invite = await prisma.invite.findUnique({
            where: { token },
            include: { tenant: true }
        });

        if (!invite) {
            return res.status(404).json({ message: "Invalid or used invite link" });
        }

        // 3. Check Expiration
        if (new Date() > invite.expiresAt) {
            // Clean up the expired row (Optional, but keeps DB clean)
            await prisma.invite.delete({ where: { id: invite.id } });
            return res.status(410).json({ message: "This invite has expired. Ask for a new one." });
        }

        // 4. SECURITY CHECK: Identity Mismatch
        // Prevent "Alice" from forwarding her invite link to "Bob" so Bob can join.
        if (session.user.email !== invite.email) {
            return res.status(403).json({
                message: `This invite is for ${invite.email}, but you are logged in as ${session.user.email}.`
            });
        }

        // 5. Transaction: Join Team & Burn Invite
        await prisma.$transaction(async (tx) => {
            // A. Add to Tenant
            await tx.tenantUser.create({
                data: {
                    userId: session.user.id,
                    tenantId: invite.tenantId,
                    role: invite.role
                }
            });

            // B. Delete Invite (It is one-time use)
            await tx.invite.delete({ where: { id: invite.id } });
        });

        // 6. Return Success + TenantID
        // Frontend needs 'tenantId' to save into localStorage ("currentTenantId")
        res.status(200).json({
            message: "Joined workspace successfully",
            tenantId: invite.tenantId,
            tenantName: invite.tenant.name
        });

    } catch (error: any) {
        // Handle "Unique Constraint" error if user somehow double-clicked
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "You are already a member of this workspace" });
        }
        console.error("Accept Invite Error:", error);
        res.status(500).json({ message: "Failed to join workspace" });
    }
};
