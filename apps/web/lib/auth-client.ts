"use client";

import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://127.0.0.1:3005",
    fetchOptions: { credentials: "include" },
    plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, emailOtp, forgetPassword } = authClient;
