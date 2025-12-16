"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function LoginForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [message, setMessage] = useState<string>("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        startTransition(async () => {
            const res = await signIn.email({
                email,
                password,
            });

            if (res.error) {
                setMessage(res.error.message || "Invalid credentials.");
                return;
            }

            router.push("/dashboard");
        });
    }

    async function onGitHub() {
        await signIn.social({
            provider: "github",
            callbackURL: "http://localhost:3000/dashboard",
        });
    }

    async function onGoogle() {
        await signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000/dashboard",
        });
    }

    return (
        <>
            <div className="flex flex-col gap-2 text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Welcome back</h1>
                <p className="text-neutral-500">Enter your email to sign in to your workspace.</p>
            </div>

            <div className="grid gap-6">
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        {message && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                                {message}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="name@example.com" type="email" className="h-11" />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" className="h-11" />
                        </div>

                        <Button type="submit" disabled={isPending} className="h-11 bg-neutral-900 hover:bg-neutral-800 text-white mt-2">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In with Email <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-neutral-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-neutral-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" onClick={onGitHub} className="h-11 border-neutral-200 hover:bg-neutral-50">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                    </Button>
                    <Button variant="outline" type="button" onClick={onGoogle} className="h-11 border-neutral-200 hover:bg-neutral-50">
                        Google
                    </Button>
                </div>

                <div className="text-center text-sm text-neutral-500 mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="underline underline-offset-4 hover:text-neutral-900 font-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </>
    );
}
