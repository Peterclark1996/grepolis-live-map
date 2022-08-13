import { AzureFunction, Context } from "@azure/functions"
import { saveWorldDataFile } from "./blob"
import { fetchAlliances, fetchIslands, fetchPlayers, fetchTowns, fetchWorldCodeList } from "./grepolis"
import { generateDataForWorlds } from "./logic"

const timerTrigger: AzureFunction = async (context: Context, myTimer: any): Promise<void> => {
    context.log(`Function triggered at ${new Date()}.`)

    const grepolisFunctions = {
        fetchWorldCodeList,
        fetchAlliances,
        fetchPlayers,
        fetchTowns,
        fetchIslands
    }

    return generateDataForWorlds(
        grepolisFunctions,
        saveWorldDataFile,
        () => new Date()
    )
        .then(_ => context.log(`Function finished at ${new Date()}.`))
        .catch(error => {
            console.error(`Function failed at ${new Date()}`)
            throw error
        })
}

export default timerTrigger