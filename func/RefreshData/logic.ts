import { islandPositionOffsetMatrix, TOWN_MAX_SIZE, TOWN_MIN_SIZE, TOWN_MAX_POINTS, TOWN_OFFSET_RATIO, OCEAN_OVERLAP, OCEAN_PIXEL_SIZE, IMAGE_PATH, islandImagesNames, ISLAND_SCALE } from "./constants"
import { BlobTown } from "./types/BlobTown"
import { GrepolisFunctions } from "./types/GrepolisFunctions"
import { GrepolisTown } from "./types/GrepolisTown"
import { Island } from "./types/Island"
import { WorldData } from "./types/WorldData"
import "./number.extensions"
import { Ocean } from "./types/Ocean"
import Jimp from "jimp"

export const generateDataForWorlds = async (
    grepolisFunctions: GrepolisFunctions,
    saveWorldDataFile: (worldCode: string, fileName: string, worldData: WorldData) => Promise<void>,
    saveOceanFile: (worldCode: string, fileName: string, oceanData: string) => Promise<void>,
    getOceanFileNames: (worldCode: string) => Promise<string[]>,
    getCurrentDate: () => Date
): Promise<void> => {
    const worldCodes = await grepolisFunctions.fetchWorldCodeList()

    await Promise.all(worldCodes.map(async worldCode => {
        const alliances = await grepolisFunctions.fetchAlliances(worldCode)
        const players = await grepolisFunctions.fetchPlayers(worldCode)
        const towns = await grepolisFunctions.fetchTowns(worldCode)
        const islands = await grepolisFunctions.fetchIslands(worldCode)

        const positionedTowns = calculateAbsoluteTownPositions(towns, islands)

        const worldData = {
            alliances: alliances.filter(alliance => alliance.towns > 0),
            players: players.filter(player => player.towns > 0),
            towns: positionedTowns
        }

        const currentDate = getCurrentDate()
        const fileName = `${currentDate.getUTCFullYear()}_${String(currentDate.getUTCMonth() + 1).padStart(2, '0')}_${String(currentDate.getUTCDate()).padStart(2, '0')}`

        saveWorldDataFile(worldCode, fileName, worldData)

        const oceans = getOceanList()
        const existingOceanFiles = await getOceanFileNames(worldCode)

        for (const ocean of oceans) {
            const fileName = `${ocean.x}_${ocean.y}`
            if (existingOceanFiles.includes(fileName)) continue

            const oceanImageData = await generateOceanImage(ocean, islands)
            saveOceanFile(worldCode, fileName, oceanImageData)
        }
    }))
}

const calculateAbsoluteTownPositions = (towns: GrepolisTown[], islands: Island[]): BlobTown[] =>
    towns.map(town => {
        const island = islands.find(i => i.x === town.islandX && i.y === town.islandY)
        if (!island) return

        const islandOffset = islandPositionOffsetMatrix.filter(islandOffset =>
            islandOffset.islandType === island.islandType
        ).find(islandOffset =>
            islandOffset.posOnIsland === town.posOnIsland
        )
        if (!islandOffset) return

        const x = 1000 - town.islandY + islandOffset.yOffset * TOWN_OFFSET_RATIO
        const y = town.islandX + islandOffset.xOffset * TOWN_OFFSET_RATIO
        const size = TOWN_MIN_SIZE + ((TOWN_MAX_SIZE - TOWN_MIN_SIZE) * (town.points / TOWN_MAX_POINTS))

        return {
            id: town.id,
            playerId: town.playerId,
            name: town.name,
            islandX: town.islandX,
            islandY: town.islandY,
            posOnIsland: town.posOnIsland,
            points: town.points,
            x: x.roundTo(2),
            y: y.roundTo(2),
            size: size.roundTo(3)
        }
    }).filter(town => town !== undefined)

const generateOceanImage = async (ocean: Ocean, islands: Island[]) => {
    const oceanOffsetX = ocean.x * 100
    const oceanOffsetY = ocean.y * 100
    const islandBoundMinX = oceanOffsetX - OCEAN_OVERLAP
    const islandBoundMaxX = oceanOffsetX + 100 + OCEAN_OVERLAP
    const islandBoundMinY = oceanOffsetY - OCEAN_OVERLAP
    const islandBoundMaxY = oceanOffsetY + 100 + OCEAN_OVERLAP

    const islandsInOcean = islands
        .filter(i =>
            i.x > islandBoundMinX &&
            i.x < islandBoundMaxX &&
            i.y > islandBoundMinY &&
            i.y < islandBoundMaxY
        )

    if (islandsInOcean.length == 0) return

    const oceanImage = await Jimp.read(IMAGE_PATH + "sea.png")
    oceanImage.resize(1000, 1000)

    for (const island of islandsInOcean) {
        const islandImage = await getIslandImage(island.islandType)
        if (!islandImage) continue

        oceanImage.composite(
            islandImage,
            ((island.x - oceanOffsetX) / 100) * OCEAN_PIXEL_SIZE,
            ((island.y - oceanOffsetY) / 100) * OCEAN_PIXEL_SIZE
        )
    }

    return await oceanImage.getBase64Async(Jimp.MIME_PNG)
}

const getOceanList = (): Ocean[] => {
    const oceanList: Ocean[] = []
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            oceanList.push({ x, y })
        }
    }
    return oceanList
}

const getIslandImage = async (islandId: number) => {
    const imageFileName = islandImagesNames[islandId]
    if (!imageFileName) return

    const islandImage = await Jimp.read(IMAGE_PATH + imageFileName)
    islandImage.resize(islandImage.bitmap.width * ISLAND_SCALE, islandImage.bitmap.height * ISLAND_SCALE)
    return islandImage
}