import { AzureFunction, Context } from "@azure/functions"
import { saveWorldDataFile } from "./blob"
import { fetchWorldCodeList } from "./grepolis"
import { generateDataForWorlds } from "./logic"

const timerTrigger: AzureFunction = async (context: Context, myTimer: any): Promise<void> => {
    context.log(`Function triggered at ${new Date()}.`)
    return generateDataForWorlds(
        fetchWorldCodeList,
        saveWorldDataFile
    )
        .then(_ => context.log(`Function finished at ${new Date()}.`))
        .catch(error => console.error(`Function failed at ${new Date()}. ${error}`))
}

export default timerTrigger