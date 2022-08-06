export const generateDataForWorlds = async (
    fetchWorldCodeList: () => Promise<Array<string>>,
    saveWorldDataFile: (worldName: string) => Promise<void>
): Promise<void> => {
    const worldCodes = await fetchWorldCodeList()

    worldCodes.forEach(worldCode => saveWorldDataFile(worldCode))
}