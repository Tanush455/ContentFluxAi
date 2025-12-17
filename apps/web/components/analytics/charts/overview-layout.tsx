import { BarGraph } from "./bar-graph"
import { PieGraph } from "./pie-graph"

export function OverviewLayout() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
                <BarGraph />
            </div>
            <div className="col-span-3">
                <PieGraph />
            </div>
        </div>
    )
}