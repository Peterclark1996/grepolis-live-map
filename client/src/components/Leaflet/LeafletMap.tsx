import { MapContainer } from "react-leaflet"
import Grid from "./Grid"
import Oceans from "./Oceans"
import L from "leaflet"

const LeafletMap = () => {
    return (
        <MapContainer
            className="d-flex flex-grow-1 h-100"
            center={[500, 500]}
            zoom={2}
            scrollWheelZoom={true}
            bounds={[[1000, 0], [0, 1000]]}
            crs={L.CRS.Simple}
            minZoom={0}
            maxZoom={10}
        >
            <Grid />
            <Oceans />
        </MapContainer>
    )
}

export default LeafletMap