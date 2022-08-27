import { LayerGroup, ImageOverlay } from "react-leaflet"
import { BASE_CONTENT_URL } from "../../constants"
import { useSelection } from "../../hooks/useSelection"

const Oceans = () => {
    const { selectedWorld } = useSelection()

    if (!selectedWorld) return <></>

    return (
        <LayerGroup>
            {
                [...Array(10)].map((_, xIndex) =>
                    [...Array(10)].map((_, yIndex) =>
                        <ImageOverlay
                            key={`${xIndex}-${yIndex}`}
                            url={`${BASE_CONTENT_URL}/${selectedWorld.id}/ocean/${xIndex}_${yIndex}.png`}
                            bounds={[
                                [
                                    (9 - yIndex) * 100,
                                    xIndex * 100
                                ], [
                                    ((9 - yIndex) * 100) + 100,
                                    (xIndex * 100) + 100
                                ]
                            ]}
                        />
                    )
                )
            }
        </LayerGroup>
    )
}

export default Oceans