"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { emailOtp } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");

        startTransition(async () => {
            // Sends "forget-password" OTP [web:133]
            const res = await emailOtp.sendVerificationOtp({ email, type: "forget-password" });
            if (res.error) {
                setMessage(res.error.message || "Could not send OTP.");
                return;
            }
            router.push(`/verify?type=forget-password&email=${encodeURIComponent(email)}`);
        });
    }

    return (
        <div className="grid gap-6">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Forgot password</h1>
                <p className="text-neutral-500">Enter your email to receive a 6-digit code.</p>
            </div>

            {message && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                    {message}
                </div>
            )}

            <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        className="h-11"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isPending}
                    />
                </div>

                <Button type="submit" disabled={isPending} className="h-11">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                        </>
                    ) : (
                        "Send code"
                    )}
                </Button>

                <div className="text-center text-sm text-neutral-500">
                    Remembered your password?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    );
}
