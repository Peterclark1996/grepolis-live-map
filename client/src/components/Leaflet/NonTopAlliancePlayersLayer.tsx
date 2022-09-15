import { Layer } from "leaflet"
import { LayerGroup } from "react-leaflet"
import { useEffect, useRef } from "react"
import { NON_TOP_ALLIANCE } from "../../constants"
import { Alliance } from "../../types/Alliance"
import { AllianceColour } from "../../types/AllianceColour"
import { Player } from "../../types/Player"
import { Town } from "../../types/Town"
import LeafletPlayer from "./LeafletPlayer"

const NonTopAlliancePlayersLayer = ({ players, alliances, towns, allianceColours, setNonTopAlliancePlayersLayer }: {
    players: Player[],
    alliances: Alliance[],
    towns: Town[],
    allianceColours: AllianceColour[],
    setNonTopAlliancePlayersLayer: (ref: React.RefObject<Layer>) => void
}) => {

    const ref = useRef(null)

    useEffect(() => {
        if (!ref) return
        if (!ref.current) return
        setNonTopAlliancePlayersLayer(ref)
    }, [setNonTopAlliancePlayersLayer])

    return (
        <LayerGroup ref={ref}>
            {
                players
                    .map(player => {
                        const alliance = alliances.find(a => a.id === player.alliance) || NON_TOP_ALLIANCE
                        return (
                            <LeafletPlayer
                                key={player.id}
                                player={player}
                                alliance={alliance}
                                towns={towns.filter(town => town.playerId === player.id)}
                                allianceColours={allianceColours}
                            />
                        )
                    })
            }
        </LayerGroup>
    )
}

export default NonTopAlliancePlayersLayer