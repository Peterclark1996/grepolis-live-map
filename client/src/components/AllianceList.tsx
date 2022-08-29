import { useState } from "react";
import { DEFAULT_ALLIANCE_COLOUR } from "../constants";
import { Alliance } from "../types/Alliance"
import { AllianceColour } from "../types/AllianceColour";
import AllianceButton from "./AllianceButton"
import classes from "./AllianceList.module.scss"

const AllianceList = ({ alliances, allianceColours }: { alliances: Alliance[], allianceColours: AllianceColour[] }) => {

    const [selectedAllianceIds, setSelectedAllianceIds] = useState<number[]>(alliances.map(a => a.id))

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
            <span className={`d-flex justify-content-center ${classes.title}`}>
                Alliances
            </span>
            <div className={`d-flex flex-grow-1 flex-column mt-2 px-4 overflow-auto`}>
                {
                    alliances.map((alliance, index) =>
                        <AllianceButton
                            key={alliance.id}
                            alliance={alliance}
                            position={index + 1}
                            colour={allianceColours.find(c => c.id === alliance.id)?.colour || DEFAULT_ALLIANCE_COLOUR}
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