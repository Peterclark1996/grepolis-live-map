import { Alliance } from "./Alliance"
import { Island } from "./Island"
import { Player } from "./Player"
import { GrepolisTown } from "./GrepolisTown"

export type GrepolisFunctions = {
    fetchWorldCodeList: () => Promise<string[]>,
    fetchAlliances: (worldCode: string) => Promise<Alliance[]>,
    fetchPlayers: (worldCode: string) => Promise<Player[]>,
    fetchTowns: (worldCode: string) => Promise<GrepolisTown[]>,
    fetchIslands: (worldCode: string) => Promise<Island[]>
}