import { LayerGroup, ImageOverlay } from "react-leaflet"
import { BASE_CONTENT_URL, ISLAND_RENDER_OPTIONS } from "../../constants"
import useSelection from "../../hooks/useSelection"
import sea from "../../img/sea.png"

type OceansLayerProps = { renderOption: (typeof ISLAND_RENDER_OPTIONS)[number] }

const OceansLayer = ({ renderOption }: OceansLayerProps) => {
    const { selectedWorldId } = useSelection()

    const getOceanUrl = (xIndex: number, yIndex: number): string => {
        switch (renderOption) {
            case "none":
                return sea
            case "center":
                if (xIndex !== 4 && xIndex !== 5) return sea
                if (yIndex !== 4 && yIndex !== 5) return sea
                return `${BASE_CONTENT_URL}/${selectedWorldId}/ocean/${xIndex}_${yIndex}.png`
            case "outer":
                if (xIndex < 3 || xIndex > 6) return sea
                if (yIndex < 3 || yIndex > 6) return sea
                return `${BASE_CONTENT_URL}/${selectedWorldId}/ocean/${xIndex}_${yIndex}.png`
            case "all":
                return `${BASE_CONTENT_URL}/${selectedWorldId}/ocean/${xIndex}_${yIndex}.png`
            default:
                return sea
        }
    }

    return (
        <LayerGroup>
            {[...Array(10)].map((_, xIndex) =>
                [...Array(10)].map((_, yIndex) => (
                    <ImageOverlay
                        key={`${xIndex}-${yIndex}`}
                        url={getOceanUrl(xIndex, yIndex)}
                        errorOverlayUrl={sea}
                        bounds={[
                            [(9 - yIndex) * 100, xIndex * 100],
                            [(9 - yIndex) * 100 + 100, xIndex * 100 + 100]
                        ]}
                    />
                ))
            )}
        </LayerGroup>
    )
}

export default OceansLayer
