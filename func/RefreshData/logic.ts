import { GrepolisFunctions } from "./types/GrepolisFunctions"

export const generateDataForWorlds = async (
    grepolisFunctions: GrepolisFunctions,
    saveWorldDataFile: (worldCode: string, worldData) => Promise<void>
): Promise<void> => {
    const worldCodes = await grepolisFunctions.fetchWorldCodeList()

    worldCodes.forEach(async worldCode => {
        const alliances = await grepolisFunctions.fetchAlliances(worldCode)

        const worldData = {
            alliances
        }

        saveWorldDataFile(worldCode, worldData)
    })
}