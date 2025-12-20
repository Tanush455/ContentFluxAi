import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { prisma } from "db/prisma";


export const teamInvite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        const { email, role } = req.body;


    } catch (error: any) {

    }
}