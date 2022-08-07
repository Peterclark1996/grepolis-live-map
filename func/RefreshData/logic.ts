import { GrepolisFunctions } from "./types/GrepolisFunctions"

export const generateDataForWorlds = async (
    grepolisFunctions: GrepolisFunctions,
    saveWorldDataFile: (worldCode: string, worldData) => Promise<void>
): Promise<void> => {
    const worldCodes = await grepolisFunctions.fetchWorldCodeList()

    await Promise.all(worldCodes.map(async worldCode => {
        const alliances = await grepolisFunctions.fetchAlliances(worldCode)
        const players = await grepolisFunctions.fetchPlayers(worldCode)

        const worldData = {
            alliances,
            players
        }

        saveWorldDataFile(worldCode, worldData)
    }))
}