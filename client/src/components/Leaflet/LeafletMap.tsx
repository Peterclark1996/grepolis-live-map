import { MapContainer } from "react-leaflet"
import GridLayer from "./GridLayer"
import OceansLayer from "./OceansLayer"
import L, { Layer } from "leaflet"
import { WorldData } from "../../types/WorldData"
import Alliance from "./LeafletAlliance"
import { AllianceColour } from "../../types/AllianceColour"
import { useMemo } from "react"

const LeafletMap = ({ worldData, allianceColours, oceanRenderOption, setAllianceLayer, setMap }: {
    worldData: WorldData,
    allianceColours: AllianceColour[],
    oceanRenderOption: string,
    setAllianceLayer: (allianceId: number, ref: React.RefObject<Layer>) => void
    setMap: (map: L.Map) => void
}) => {
    const towns = useMemo(() => worldData.alliances.map(alliance =>
        <Alliance
            key={alliance.id}
            alliance={alliance}
            players={worldData.players}
            towns={worldData.towns}
            allianceColours={allianceColours}
            setAllianceLayer={setAllianceLayer}
        />
    ), [setAllianceLayer, allianceColours, worldData.alliances, worldData.players, worldData.towns])

    const map = useMemo(() => {
        return <MapContainer
            className="d-flex flex-grow-1 h-100"
            center={[500, 500]}
            zoom={2}
            scrollWheelZoom={true}
            bounds={[[1000, 0], [0, 1000]]}
            crs={L.CRS.Simple}
            minZoom={0}
            maxZoom={5}
            ref={setMap}
        >
            <GridLayer />
            <OceansLayer renderOption={oceanRenderOption} />
            {towns}
        </MapContainer>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oceanRenderOption])

    return map
}

export default LeafletMap