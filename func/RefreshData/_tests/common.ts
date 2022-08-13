import { generateDataForWorlds } from "../logic"
import { Alliance } from "../types/Alliance"
import { Island } from "../types/Island"
import { Player } from "../types/Player"
import { GrepolisTown } from "../types/GrepolisTown"

type actParams = {
    fetchWorldCodeList?: () => Promise<string[]>,
    fetchAlliances?: (worldCode: string) => Promise<Alliance[]>,
    fetchPlayers?: (worldCode: string) => Promise<Player[]>,
    fetchTowns?: (worldCode: string) => Promise<GrepolisTown[]>,
    fetchIslands?: (worldCode: string) => Promise<Island[]>,
    saveWorldDataFile?: (worldName: string) => Promise<void>,
    saveOceanFile?: (worldName: string, fileName: string, imageData: string) => Promise<void>,
    getOceanFileNames?: (worldName: string) => Promise<string[]>,
    getCurrentDate?: () => Date
}

export const act = (passedParams: actParams): Promise<void> =>
    generateDataForWorlds(
        {
            fetchWorldCodeList: passedParams.fetchWorldCodeList || (() => Promise.resolve([])),
            fetchAlliances: passedParams.fetchAlliances || (() => Promise.resolve([])),
            fetchPlayers: passedParams.fetchPlayers || (() => Promise.resolve([])),
            fetchTowns: passedParams.fetchTowns || (() => Promise.resolve([])),
            fetchIslands: passedParams.fetchIslands || (() => Promise.resolve([]))
        },
        passedParams.saveWorldDataFile || (() => Promise.resolve()),
        passedParams.saveOceanFile || (() => Promise.resolve()),
        passedParams.getOceanFileNames || (() => Promise.resolve([])),
        passedParams.getCurrentDate || (() => new Date())
    )

export const randomNumber = (from: number = 1, to: number = 100) => Math.floor((Math.random() * to) + from)
export const randomString = () => (Math.random() + 1).toString(36).substring(2)