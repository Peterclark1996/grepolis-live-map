import { useRef } from "react"
import { LayerGroup } from "react-leaflet"
import { Alliance } from "../../types/Alliance"
import { AllianceColour } from "../../types/AllianceColour"
import { Player } from "../../types/Player"
import { Town } from "../../types/Town"
import LeafletPlayer from "./LeafletPlayer"

const LeafletAlliance = ({ alliance, players, towns, allianceColours }: { alliance: Alliance, players: Player[], towns: Town[], allianceColours: AllianceColour[] }) => {

    const ref = useRef(null)

    return (
        <LayerGroup ref={ref}>
            {
                players
                    .filter(player => player.alliance === alliance.id)
                    .map(player =>
                        <LeafletPlayer
                            key={player.id}
                            player={player}
                            alliance={alliance}
                            towns={towns.filter(town => town.playerId === player.id)}
                            allianceColours={allianceColours}
                        />
                    )
            }
        </LayerGroup>
    )
}

export default LeafletAlliance