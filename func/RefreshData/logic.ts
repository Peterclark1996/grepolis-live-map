import { islandPositionOffsetMatrix, TOWN_MAX_SIZE, TOWN_MIN_SIZE, TOWN_MAX_POINTS, TOWN_OFFSET_RATIO, OCEAN_OVERLAP, OCEAN_PIXEL_SIZE, IMAGE_PATH, islandImagesNames, ISLAND_SCALE } from "./constants"
import { BlobTown } from "./types/BlobTown"
import { GrepolisFunctions } from "./types/GrepolisFunctions"
import { GrepolisTown } from "./types/GrepolisTown"
import { Island } from "./types/Island"
import "./number.extensions"
import { Ocean } from "./types/Ocean"
import Jimp from "jimp"
import { BlobFunctions } from "./types/BlobFunctions"

export const generateDataForWorlds = async (
    grepolisFunctions: GrepolisFunctions,
    blobFunctions: BlobFunctions,
    getImageFromFile: (imageFileName: string) => Promise<Jimp>,
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

        blobFunctions.saveWorldDataFile(worldCode, fileName, worldData)


        const savedDates = await blobFunctions.getWorldDataFileNames(worldCode)
        const worldInfo = {
            avialableDates: savedDates.map(date => date.replace("en01/data/", "")).map(date => date.replace(".json", ""))
        }
        blobFunctions.saveWorldInfo(worldCode, worldInfo)


        const oceans = getOceanList()
        const existingOceanFiles = await blobFunctions.getOceanFileNames(worldCode)

        for (const ocean of oceans) {
            const fileName = `${ocean.x}_${ocean.y}`

            if (existingOceanFiles.includes(`${worldCode}/ocean/${fileName}.png`)) continue

            const oceanImage = await generateOceanImage(ocean, islands, getImageFromFile)
            blobFunctions.saveOceanFile(worldCode, fileName, oceanImage)
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

const generateOceanImage = async (
    ocean: Ocean,
    islands: Island[],
    getImageFromFile: (imageFileName: String) => Promise<Jimp>
): Promise<Jimp> => {
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

    const oceanImage = await getImageFromFile("sea.png")

    for (const island of islandsInOcean) {
        const islandImage = await getIslandImage(island.islandType, getImageFromFile)
        if (!islandImage) continue

        oceanImage.composite(
            islandImage,
            ((island.x - oceanOffsetX) / 100) * OCEAN_PIXEL_SIZE,
            ((island.y - oceanOffsetY) / 100) * OCEAN_PIXEL_SIZE
        )
    }

    return oceanImage
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

let cachedIslandImages: { [key: string]: Jimp } = {}

const getIslandImage = async (islandId: number, getImageFromFile: (imageFileName: String) => Promise<Jimp>) => {
    const imageFileName = islandImagesNames[islandId]
    if (!imageFileName) return

    if (cachedIslandImages[imageFileName]) {
        return cachedIslandImages[imageFileName]
    }

    const islandImage = await getImageFromFile(imageFileName)

    cachedIslandImages[imageFileName] = islandImage

    islandImage.resize(islandImage.bitmap.width * ISLAND_SCALE, islandImage.bitmap.height * ISLAND_SCALE)
    return islandImage
}