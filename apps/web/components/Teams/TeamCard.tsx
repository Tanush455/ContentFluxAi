import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from '../ui/button'

export default function TeamCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Invite Member</CardTitle>
                <CardDescription>Send an invitation email to add a new user.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Input placeholder="user@example.com" />
                <Select defaultValue="MEMBER">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MEMBER">Member</SelectItem>
                        <SelectItem value="VIEWER">Viewer</SelectItem>
                    </SelectContent>
                </Select>
                <Button>Invite</Button>
            </CardContent>
        </Card>
    )
}
