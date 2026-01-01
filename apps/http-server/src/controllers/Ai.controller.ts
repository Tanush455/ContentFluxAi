import { openai } from '@ai-sdk/openai';
import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { z } from "zod";
import { prisma } from "db/prisma";
import { generateObject } from 'ai';
import AiRedisManager, { ChatMessage } from "../utils/AiRedisManager"; // Import the manager

export const generateAiContentText = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Auth & Checks
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session) return res.status(401).json({ message: "Unauthorized" });

        const tenantId = req.headers['x-tenant-id'] as string;
        if (!tenantId) return res.status(400).json({ message: "Tenant ID header is missing" });

        const isMember = await prisma.tenantUser.findUnique({
            where: { tenantId_userId: { tenantId, userId: session.user.id } }
        });
        if (!isMember) return res.status(403).json({ message: "Access Denied" });

        // 2. Get Input
        const { prompt, tone = "Professional" } = req.body;
        if (!prompt) return res.status(400).json({ message: "Prompt is required" });

        const redisManager = AiRedisManager.getInstance();

        // Fetch previous conversation from Redis
        const history = await redisManager.getHistory(session.user.id, tenantId);

        // Construct the new User Message
        const currentUserMessage: ChatMessage = { role: 'user', content: prompt };

        const allMessages = [...history, currentUserMessage];

        const aiResponse = await generateObject({
            model: 'openai/gpt-4o-mini',
            schema: z.object({
                productName: z.string().describe("The name of the feature or product"),
                viralTitle: z.string().describe("A catchy, click-worthy title for the post"),
                seoDescription: z.string().describe("A 150-character meta description for SEO"),
                mainContent: z.string().describe("The main body of the blog post or announcement (Markdown supported)"),
                socialPosts: z.object({
                    twitter: z.string().describe("A punchy tweet with hashtags"),
                    linkedin: z.string().describe("A professional LinkedIn update")
                }),
                tags: z.array(z.string()).describe("5 relevant keywords")
            }),
            system: `You are an expert Product Marketing Manager. 
                     Tone: ${tone}.
                     Use the conversation history to maintain context about the product.`,
            // CHANGE: Use 'messages' instead of 'prompt' to include history
            messages: allMessages,
            temperature: 0.7,
        });

        // A. Save the User's Message
        await redisManager.addMessage(session.user.id, tenantId, currentUserMessage);

        // B. Save the AI's Response
        // Since aiResponse.object is JSON, we stringify it to store as text content in history
        const aiContentString = JSON.stringify(aiResponse.object);
        await redisManager.addMessage(session.user.id, tenantId, {
            role: 'assistant',
            content: aiContentString
        });

        res.status(200).json(aiResponse.object);

    } catch (error: any) {
        console.error("Error generating AI content:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

