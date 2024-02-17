import { Layer } from "leaflet"
import { RefObject } from "react"
import { DEFAULT_ALLIANCE_COLOUR } from "../constants"
import { Alliance } from "../types/Alliance"
import { AllianceColour } from "../types/AllianceColour"
import { LeafletLayer } from "../types/LeafletLayer"
import AllianceButton from "./AllianceButton"
import classes from "./AllianceList.module.scss"
import useOptions from "../hooks/useOptions"

type AllianceListProps = {
    alliances: Alliance[]
    allianceColours: AllianceColour[]
    allianceLayers: LeafletLayer[]
    showLayer: (ref: RefObject<Layer>) => void
    hideLayer: (ref: RefObject<Layer>) => void
}

const AllianceList = ({ alliances, allianceColours, allianceLayers, showLayer, hideLayer }: AllianceListProps) => {
    const options = useOptions()

    const isAllianceHidden = (alliance: Alliance) => options.hiddenAllianceIds.includes(alliance.id)

    const onAllianceClicked = (alliance: Alliance) => {
        if (isAllianceHidden(alliance)) {
            options.setOption({ key: "hiddenAllianceIds", value: options.hiddenAllianceIds.filter(id => id !== alliance.id) })

            const layer = allianceLayers.find(layer => layer.id === alliance.id)
            if (layer === undefined) return
            showLayer(layer.ref)
        } else {
            options.setOption({ key: "hiddenAllianceIds", value: [...options.hiddenAllianceIds, alliance.id] })

            const layer = allianceLayers.find(layer => layer.id === alliance.id)
            if (layer === undefined) return
            hideLayer(layer.ref)
        }
    }

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <span className={`d-flex justify-content-center ${classes.title}`}>Alliances</span>
            <div className="d-flex flex-grow-1 flex-column mt-2 px-2 gap-2 overflow-auto">
                {alliances.map((alliance, index) => (
                    <AllianceButton
                        key={alliance.id}
                        alliance={alliance}
                        position={index + 1}
                        colour={allianceColours.find(c => c.id === alliance.id)?.colour || DEFAULT_ALLIANCE_COLOUR}
                        selected={!isAllianceHidden(alliance)}
                        onClick={() => onAllianceClicked(alliance)}
                    />
                ))}
                <div className="mb-4" />
            </div>
        </div>
    )
}

export default AllianceList
