import { useState } from "react";
import { Alliance } from "../types/Alliance"
import AllianceButton from "./AllianceButton"
import classes from "./AllianceList.module.scss"

const AllianceList = ({ alliances }: { alliances: Alliance[] }) => {

    const topAlliances = alliances
        .sort((a, b) => a.points < b.points ? 1 : -1)
        .slice(0, 20)

    const [selectedAllianceIds, setSelectedAllianceIds] = useState<number[]>(topAlliances.slice(0, 10).map(a => a.id))

    const isAllianceSelected = (alliance: Alliance) => selectedAllianceIds.includes(alliance.id)

    const onAllianceClicked = (alliance: Alliance) => {
        if (isAllianceSelected(alliance)) {
            setSelectedAllianceIds(selectedAllianceIds.filter(id => id !== alliance.id))
        } else {
            setSelectedAllianceIds([...selectedAllianceIds, alliance.id])
        }
    }

    return (
        <div>
            <div className={`d-flex flex-grow-1 justify-content-center ${classes.title}`}>
                Alliances
            </div>
            <div>
                {
                    topAlliances.map(alliance =>
                        <AllianceButton
                            key={alliance.id}
                            alliance={alliance}
                            selected={isAllianceSelected(alliance)}
                            onClick={() => onAllianceClicked(alliance)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default AllianceList