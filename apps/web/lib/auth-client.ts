// apps/web/src/lib/auth-client.ts
"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3005",
    fetchOptions: { credentials: "include" },
});

export const { signIn, signUp, signOut, useSession } = authClient;
