import config from "../config.json"

export const NON_TOP_ALLIANCE = {
    id: 0,
    name: "Non Top Alliance",
    points: 0,
    towns: 0,
    players: 0,
    rank: 0
} as const

export const ALLIANCE_COUNT_TO_SHOW = 20

export const BASE_CONTENT_URL = config.storageAccountUrl + "world-data"

export const ISLAND_RENDER_OPTIONS = ["none", "center", "outer", "all"] as const

export const DEFAULT_ALLIANCE_COLOUR = "#676767"

export const DEFAULT_COLOURS = [
    "#FF0000",
    "#8B5A00",
    "#FFC125",
    "#3D9140",
    "#00F5FF",
    "#0000FF",
    "#FFB6C1",
    "#4B0082",
    "#FF3E96",
    "#00FF00",
    "#808000",
    "#8470FF",
    "#CD69C9",
    "#C95700",
    "#008DD4",
    "#C4F0C0",
    "#83B19B",
    "#BF05D0",
    "#9C9289",
    "#2DD09C"
] as const
