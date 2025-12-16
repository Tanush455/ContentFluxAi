"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { emailOtp } from "@/lib/auth-client";

export default function ResetPasswordPage() {
    const params = useSearchParams();
    const router = useRouter();

    const email = useMemo(() => params.get("email") || "", [params]);
    const otp = useMemo(() => params.get("otp") || "", [params]);

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");

        startTransition(async () => {
            // Reset password [web:133]
            const res = await emailOtp.resetPassword({ email, otp, password });
            if (res.error) {
                setMessage(res.error.message || "Failed to reset password.");
                return;
            }
            router.push("/login");
        });
    }

    return (
        <div className="grid gap-6">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Reset password</h1>
                <p className="text-neutral-500">Set a new password for {email}</p>
            </div>

            {message && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                    {message}
                </div>
            )}

            <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="password">New password</Label>
                    <Input
                        id="password"
                        type="password"
                        className="h-11"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isPending}
                    />
                </div>

                <Button type="submit" disabled={isPending} className="h-11">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                        </>
                    ) : (
                        "Update password"
                    )}
                </Button>

                <div className="text-center text-sm text-neutral-500">
                    <Link href="/login" className="underline underline-offset-4">
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    );
}
