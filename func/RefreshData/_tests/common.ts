import { generateDataForWorlds } from "../logic"
import { Alliance } from "../types/Alliance"
import { Island } from "../types/Island"
import { Player } from "../types/Player"
import { GrepolisTown } from "../types/GrepolisTown"
import Jimp from "jimp"
import { WorldFullInfo } from "../types/WorldFullInfo"
import { WorldStatus } from "../types/WorldStatus"

export const createWorldStatus = (id: string): WorldStatus => ({
    id,
    name: "World Name",
    endgame: "end_game_type_none",
    isClosed: false
})

type actParams = {
    fetchWorldList?: () => Promise<WorldStatus[]>
    fetchAlliances?: (worldCode: string) => Promise<Alliance[]>
    fetchPlayers?: (worldCode: string) => Promise<Player[]>
    fetchTowns?: (worldCode: string) => Promise<GrepolisTown[]>
    fetchIslands?: (worldCode: string) => Promise<Island[]>
    saveWorldDataFile?: (worldName: string) => Promise<void>
    saveOceanFile?: (worldName: string, fileName: string, image: Jimp) => Promise<void>
    saveWorldInfo?: (worldCode: string, WorldFullInfo: WorldFullInfo) => Promise<void>
    saveWorldList?: (worldList: WorldStatus[]) => Promise<void>
    getWorldDataFileNames?: (worldCode: string) => Promise<string[]>
    getOceanFileNames?: (worldName: string) => Promise<string[]>
    getImageFromFile?: (imageFileName: string) => Promise<Jimp>
    getCurrentDate?: () => Date
}

export const act = (passedParams: actParams): Promise<void> =>
    generateDataForWorlds(
        {
            fetchWorldList: passedParams.fetchWorldList ?? (() => Promise.resolve([])),
            fetchAlliances: passedParams.fetchAlliances ?? (() => Promise.resolve([])),
            fetchPlayers: passedParams.fetchPlayers ?? (() => Promise.resolve([])),
            fetchTowns: passedParams.fetchTowns ?? (() => Promise.resolve([])),
            fetchIslands: passedParams.fetchIslands ?? (() => Promise.resolve([]))
        },
        {
            saveWorldDataFile: passedParams.saveWorldDataFile ?? (() => Promise.resolve()),
            saveOceanFile: passedParams.saveOceanFile ?? (() => Promise.resolve()),
            saveWorldInfo: passedParams.saveWorldInfo ?? (() => Promise.resolve()),
            saveWorldList: passedParams.saveWorldList ?? (() => Promise.resolve()),
            getWorldDataFileNames:
                passedParams.getWorldDataFileNames ?? (() => Promise.resolve([])),
            getOceanFileNames: passedParams.getOceanFileNames ?? (() => Promise.resolve([]))
        },
        passedParams.getImageFromFile ?? (() => Promise.resolve(new Jimp(1000, 1000))),
        passedParams.getCurrentDate ?? (() => new Date())
    )

export const randomNumber = (from: number = 1, to: number = 100) =>
    Math.floor(Math.random() * to + from)
export const randomString = () => (Math.random() + 1).toString(36).substring(2)
