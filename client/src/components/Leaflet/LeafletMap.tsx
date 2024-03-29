import { MapContainer } from "react-leaflet"
import GridLayer from "./GridLayer"
import OceansLayer from "./OceansLayer"
import L, { Layer } from "leaflet"
import { WorldData } from "../../types/WorldData"
import AllianceLayer from "./AllianceLayer"
import { AllianceColour } from "../../types/AllianceColour"
import { RefObject, useMemo } from "react"
import NonTopAlliancePlayersLayer from "./NonTopAlliancePlayersLayer"
import useOptions from "../../hooks/useOptions"

type LeafletMapProps = {
    worldData: WorldData
    allianceColours: AllianceColour[]
    setAllianceLayer: (allianceId: number, ref: RefObject<Layer>) => void
    setNonTopAlliancePlayersLayer: (ref: RefObject<Layer>) => void
    setMap: (map: L.Map) => void
}

const LeafletMap = ({ worldData, allianceColours, setAllianceLayer, setNonTopAlliancePlayersLayer, setMap }: LeafletMapProps) => {
    const options = useOptions()

    const allianceLayers = useMemo(
        () =>
            worldData.alliances
                .filter(a => allianceColours.find(ac => ac.id === a.id))
                .map(alliance => (
                    <AllianceLayer
                        key={alliance.id}
                        alliance={alliance}
                        players={worldData.players}
                        towns={worldData.towns}
                        allianceColours={allianceColours}
                        setAllianceLayer={setAllianceLayer}
                    />
                )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setAllianceLayer, allianceColours, worldData.alliances, worldData.players, worldData.towns, options.cityScale]
    )

    const map = useMemo(() => {
        return (
            <MapContainer
                className="d-flex flex-grow-1 h-100"
                center={[500, 500]}
                zoom={2}
                scrollWheelZoom={true}
                bounds={[
                    [1000, 0],
                    [0, 1000]
                ]}
                crs={L.CRS.Simple}
                minZoom={0}
                maxZoom={5}
                ref={setMap}
            >
                <GridLayer />
                <OceansLayer />
                <NonTopAlliancePlayersLayer
                    players={worldData.players.filter(p => !allianceColours.find(a => a.id === p.alliance))}
                    alliances={worldData.alliances}
                    towns={worldData.towns}
                    allianceColours={allianceColours}
                    setNonTopAlliancePlayersLayer={setNonTopAlliancePlayersLayer}
                />
                {allianceLayers}
            </MapContainer>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.islands, options.cityScale])

    return map
}

export default LeafletMap
