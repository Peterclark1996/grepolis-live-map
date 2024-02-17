import { Layer } from "leaflet"
import { RefObject, useEffect, useRef } from "react"
import { LayerGroup } from "react-leaflet"
import { Alliance } from "../../types/Alliance"
import { AllianceColour } from "../../types/AllianceColour"
import { Player } from "../../types/Player"
import { Town } from "../../types/Town"
import LeafletPlayer from "./LeafletPlayer"

type AllianceLayerProps = {
    alliance: Alliance
    players: Player[]
    towns: Town[]
    allianceColours: AllianceColour[]
    setAllianceLayer: (allianceId: number, ref: RefObject<Layer>) => void
}

const AllianceLayer = ({
    alliance,
    players,
    towns,
    allianceColours,
    setAllianceLayer
}: AllianceLayerProps) => {
    const ref = useRef(null)

    useEffect(() => setAllianceLayer(alliance.id, ref), [setAllianceLayer, alliance.id])

    return (
        <LayerGroup ref={ref}>
            {players
                .filter(player => player.alliance === alliance.id)
                .map(player => (
                    <LeafletPlayer
                        key={player.id}
                        player={player}
                        alliance={alliance}
                        towns={towns.filter(town => town.playerId === player.id)}
                        allianceColours={allianceColours}
                    />
                ))}
        </LayerGroup>
    )
}

export default AllianceLayer
