"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, ArrowRight, Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";

export default function SignupForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [message, setMessage] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        // Minimal client-side validation (optional)
        const errors: typeof fieldErrors = {};
        if (name.trim().length < 3) errors.name = "Name must be at least 3 characters";
        if (!email.includes("@")) errors.email = "Invalid email";
        if (!password) errors.password = "Password is required";
        if (Object.keys(errors).length) return setFieldErrors(errors);

        startTransition(async () => {
            const res = await signUp.email({
                name,
                email,
                password,
                // autoSignIn: true is default; you can set false if you want.
            });

            if (res.error) {
                setMessage(res.error.message || "Something went wrong. Please try again.");
                return;
            }

            router.push("/dashboard");
        });
    }

    async function onGitHub() {
        // Redirect flow (OAuth)
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
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Create an account</h1>
                <p className="text-neutral-500">Get started with your 14-day free trial.</p>
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
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" className="h-11" disabled={isPending} />
                            {fieldErrors.name && <span className="text-red-500 text-sm">{fieldErrors.name}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="name@example.com" type="email" className="h-11" disabled={isPending} />
                            {fieldErrors.email && <span className="text-red-500 text-sm">{fieldErrors.email}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" className="h-11" disabled={isPending} />
                            {fieldErrors.password && <span className="text-red-500 text-sm">{fieldErrors.password}</span>}
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="h-11 bg-neutral-900 hover:bg-neutral-800 text-white mt-2 shadow-lg shadow-neutral-900/20"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                                </>
                            ) : (
                                <>
                                    Create Account <ArrowRight className="w-4 h-4 ml-2" />
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
                        <span className="bg-white px-2 text-neutral-500">Or sign up with</span>
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
            </div>

            <div className="text-center text-sm text-neutral-500 mt-4">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-neutral-900 font-medium">
                    Sign in
                </Link>
            </div>
        </>
    );
}
