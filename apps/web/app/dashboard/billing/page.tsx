import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function BillingPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Billing & Plans</h2>
                <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Free</CardTitle>
                        <CardDescription>For individuals starting out.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <span className="text-3xl font-bold">$0</span><span className="text-muted-foreground">/mo</span>
                        <ul className="space-y-2 pt-4">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 5 AI Posts/mo</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 1 Social Account</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Current Plan</Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary shadow-lg">
                    <CardHeader>
                        <CardTitle>Pro</CardTitle>
                        <CardDescription>For growing teams.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <span className="text-3xl font-bold">$29</span><span className="text-muted-foreground">/mo</span>
                        <ul className="space-y-2 pt-4">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Unlimited AI Posts</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 5 Social Accounts</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Advanced Analytics</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Upgrade to Pro</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}