import TeamCard from "@/components/Teams/TeamCard"
import TeamsHeader from "@/components/Teams/TeamsHeader"
import TeamsMemebers from "@/components/Teams/TeamsMemebers"

export default function TeamPage() {
    return (
        <div className="space-y-6">
            <TeamsHeader />
            <TeamCard />
            <TeamsMemebers />
        </div >
    )
}