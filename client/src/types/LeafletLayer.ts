import { Layer } from "leaflet"
import { RefObject } from "react"

export type LeafletLayer = {
    id: number
    ref: RefObject<Layer>
}
