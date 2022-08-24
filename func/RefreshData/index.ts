import { AzureFunction, Context } from "@azure/functions"
import Jimp from "jimp/"
import { getOceanFileNames, getWorldDataFileNames, saveOceanFile, saveWorldDataFile, saveWorldInfo, saveWorldList } from "./blob"
import { IMAGE_PATH } from "./constants"
import { fetchAlliances, fetchIslands, fetchPlayers, fetchTowns, fetchWorldList } from "./grepolis"
import { generateDataForWorlds } from "./logic"

const timerTrigger: AzureFunction = async (context: Context, myTimer: any): Promise<void> => {
    context.log(`Function triggered at ${new Date()}.`)

    const grepolisFunctions = {
        fetchWorldList,
        fetchAlliances,
        fetchPlayers,
        fetchTowns,
        fetchIslands
    }

    const blobFunctions = {
        saveWorldDataFile,
        saveOceanFile,
        saveWorldInfo,
        saveWorldList,
        getWorldDataFileNames,
        getOceanFileNames
    }

    const getImageFromFile = (imageFileName: string): Promise<Jimp> => Jimp.read(IMAGE_PATH + imageFileName)

    return generateDataForWorlds(
        grepolisFunctions,
        blobFunctions,
        getImageFromFile,
        () => new Date()
    )
        .then(_ => context.log(`Function finished at ${new Date()}.`))
        .catch(error => {
            console.error(`Function failed at ${new Date()}`)
            throw error
        })
}

export default timerTrigger