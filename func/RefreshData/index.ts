import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    context.log(`Function triggered at ${new Date()}.`)
}

export default timerTrigger;