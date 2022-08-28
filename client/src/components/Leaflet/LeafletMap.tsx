import { MapContainer } from "react-leaflet"
import GridLayer from "./GridLayer"
import OceansLayer from "./OceansLayer"
import L from "leaflet"
import { useSelection } from "../../hooks/useSelection"
import { WorldData } from "../../types/WorldData"
import Alliance from "./LeafletAlliance"
import { AllianceColour } from "../../types/AllianceColour"

const LeafletMap = ({ worldData, allianceColours }: { worldData: WorldData, allianceColours: AllianceColour[] }) => {
    const { selectedWorld } = useSelection()

    if (!selectedWorld) return <></>

    return (
        <MapContainer
            className="d-flex flex-grow-1 h-100"
            center={[500, 500]}
            zoom={2}
            scrollWheelZoom={true}
            bounds={[[1000, 0], [0, 1000]]}
            crs={L.CRS.Simple}
            minZoom={0}
            maxZoom={5}
        >
            <GridLayer />
            <OceansLayer />
            {
                worldData.alliances.map(alliance =>
                    <Alliance
                        key={alliance.id}
                        alliance={alliance}
                        players={worldData.players}
                        towns={worldData.towns}
                        allianceColours={allianceColours}
                    />
                )
            }
        </MapContainer>
    )
}

export default LeafletMap