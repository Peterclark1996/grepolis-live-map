import { LayerGroup, Polyline } from "react-leaflet"

const GridLayer = () => {
    return (
        <LayerGroup>
            {
                [...Array(10)].map((_, index) => (
                    <div key={index}>
                        <Polyline
                            positions={[[0, 1000 - (index * 100)], [1000, 1000 - (index * 100)]]}
                            color="#000000"
                            weight={1}
                            key="vertical"
                        />
                        <Polyline
                            positions={[[(index * 100), 0], [(index * 100), 1000]]}
                            color="#000000"
                            weight={1}
                            key="horizontal"
                        />
                    </div>
                ))
            }
        </LayerGroup>
    )
}

export default GridLayer