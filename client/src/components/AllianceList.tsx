import { useState } from "react";
import { ALLIANCE_COLOURS } from "../constants";
import { Alliance } from "../types/Alliance"
import AllianceButton from "./AllianceButton"
import classes from "./AllianceList.module.scss"

const AllianceList = ({ alliances }: { alliances: Alliance[] }) => {

    const topAlliances = alliances
        .sort((a, b) => a.points < b.points ? 1 : -1)
        .slice(0, 14)

    const [selectedAllianceIds, setSelectedAllianceIds] = useState<number[]>(topAlliances.slice(0, 14).map(a => a.id))

    const isAllianceSelected = (alliance: Alliance) => selectedAllianceIds.includes(alliance.id)

    const onAllianceClicked = (alliance: Alliance) => {
        if (isAllianceSelected(alliance)) {
            setSelectedAllianceIds(selectedAllianceIds.filter(id => id !== alliance.id))
        } else {
            setSelectedAllianceIds([...selectedAllianceIds, alliance.id])
        }
    }

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <div className={`d-flex justify-content-center ${classes.title}`}>
                Alliances
            </div>
            <div className={`d-flex flex-grow-1 flex-column mt-2 px-4 overflow-auto`}>
                {
                    topAlliances.map((alliance, index) =>
                        <AllianceButton
                            key={alliance.id}
                            alliance={alliance}
                            position={index + 1}
                            colour={ALLIANCE_COLOURS[index]}
                            selected={isAllianceSelected(alliance)}
                            onClick={() => onAllianceClicked(alliance)}
                        />
                    )
                }
                <div className="mb-4" />
            </div>
        </div>
    )
}

export default AllianceList