import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface SocialMediaProps {
    Medianame: string
    description: string
    buttoncontent: string
    logo: React.ReactNode
    isConnected?: boolean
    username?: string
}

export default function SocialMediapost({
    Medianame,
    description,
    buttoncontent,
    logo,
    isConnected = false,
    username
}: SocialMediaProps) {
    return (
        <Card className={isConnected ? "border-green-500/50 bg-green-500/5" : ""}>
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    {logo}
                </div>
                <div>
                    <CardTitle>{Medianame}</CardTitle>
                    <CardDescription>
                        {isConnected && username ? (
                            <span>Connected as <strong>{username}</strong></span>
                        ) : (
                            description
                        )}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {isConnected ? (
                    <Button variant="outline" className="w-full text-green-600 border-green-200 hover:bg-green-50">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Connected
                    </Button>
                ) : (
                    <Button className="w-full">{buttoncontent}</Button>
                )}
            </CardContent>
        </Card>
    )
}