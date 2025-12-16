import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "db/prisma";

export const auth = betterAuth({
    baseURL: "http://localhost:3005",
    basePath: "/api/auth",

    trustedOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],

    database: prismaAdapter(prisma, { provider: "postgresql" }),

    emailAndPassword: { enabled: true },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});
