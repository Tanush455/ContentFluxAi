import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function TeamsMemebers() {
    return (
        <div className="space-y-4">
            {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">User Name {i}</p>
                            <p className="text-sm text-muted-foreground">user{i}@example.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Admin</span>
                        <Button variant="outline" size="sm">Remove</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
