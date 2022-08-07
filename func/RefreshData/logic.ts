import { islandPositionOffsetMatrix, TOWN_MAX_SIZE, TOWN_MIN_SIZE, TOWN_MAX_POINTS, TOWN_OFFSET_RATIO } from "./constants"
import { BlobTown } from "./types/BlobTown"
import { GrepolisFunctions } from "./types/GrepolisFunctions"
import { GrepolisTown } from "./types/GrepolisTown"
import { Island } from "./types/Island"
import { WorldData } from "./types/WorldData"
import "./number.extensions"

export const generateDataForWorlds = async (
    grepolisFunctions: GrepolisFunctions,
    saveWorldDataFile: (worldCode: string, fileName: string, worldData: WorldData) => Promise<void>,
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