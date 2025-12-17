import SocialMediapost from "@/components/SocialMedia/SocialMediapost"
import { Twitter, Linkedin } from "lucide-react"

const companies = [
    {
        Medianame: "Twitter / X",
        description: "Connect to post tweets and threads.",
        buttoncontent: "Connect Twitter",
        logo: <Twitter className="h-6 w-6 text-blue-500" />,
        isConnected: false
    },
    {
        Medianame: "LinkedIn",
        description: "Connect your professional profile.",
        buttoncontent: "Connect LinkedIn",
        logo: <Linkedin className="h-6 w-6 text-blue-700" />,
        isConnected: true,
        username: "Alex Dev"
    }
]

export default function SocialPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Social Accounts</h2>
                <p className="text-muted-foreground">Connect your social media profiles for auto-posting.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {companies.map((company) => (
                    <SocialMediapost
                        key={company.Medianame}
                        Medianame={company.Medianame}
                        description={company.description}
                        logo={company.logo}
                        buttoncontent={company.buttoncontent}
                        isConnected={company.isConnected}
                        username={company.username}
                    />
                ))}
            </div>
        </div>
    )
}