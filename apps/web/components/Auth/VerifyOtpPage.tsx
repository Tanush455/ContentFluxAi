"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { emailOtp } from "@/lib/auth-client";

type OtpType = "email-verification" | "forget-password";

export default function VerifyPage() {
    const params = useSearchParams();
    const router = useRouter();

    const email = useMemo(() => params.get("email") || "", [params]);
    const type = useMemo(() => (params.get("type") || "email-verification") as OtpType, [params]);

    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    async function resend() {
        setMessage("");
        const res = await emailOtp.sendVerificationOtp({ email, type }); // [web:133]
        if (res.error) setMessage(res.error.message || "Could not resend OTP.");
        else setMessage("OTP sent.");
    }

    async function verify() {
        setMessage("");
        startTransition(async () => {
            // Optional check [web:133]
            const check = await emailOtp.checkVerificationOtp({ email, type, otp });
            if (check.error) {
                setMessage(check.error.message || "Invalid OTP.");
                return;
            }

            if (type === "email-verification") {
                // Verify email [web:133]
                const res = await emailOtp.verifyEmail({ email, otp });
                if (res.error) {
                    setMessage(res.error.message || "Verification failed.");
                    return;
                }
                router.push("/dashboard");
                return;
            }

            // forget-password: go to reset page with otp
            router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
        });
    }

    return (
        <div className="grid gap-6">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Verify code</h1>
                <p className="text-neutral-500">
                    Enter the 6-digit code sent to <span className="text-neutral-900">{email}</span>
                </p>
            </div>

            {message && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                    {message}
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="otp">6-digit code</Label>
                <Input
                    id="otp"
                    inputMode="numeric"
                    placeholder="123456"
                    className="h-11"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={isPending}
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button onClick={resend} type="button" variant="outline" disabled={isPending} className="h-11">
                    Resend
                </Button>

                <Button onClick={verify} type="button" disabled={isPending} className="h-11">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                        </>
                    ) : (
                        "Verify"
                    )}
                </Button>
            </div>
        </div>
    );
}
