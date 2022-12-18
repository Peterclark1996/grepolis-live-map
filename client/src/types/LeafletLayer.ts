import { Layer } from "leaflet"

export type LeafletLayer = {
    id: number
    ref: React.RefObject<Layer>
}
