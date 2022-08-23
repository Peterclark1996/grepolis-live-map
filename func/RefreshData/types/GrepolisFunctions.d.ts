import { Alliance } from "./Alliance"
import { Island } from "./Island"
import { Player } from "./Player"
import { GrepolisTown } from "./GrepolisTown"
import { WorldStatus } from "./WorldStatus"

export type GrepolisFunctions = {
    fetchWorldList: () => Promise<WorldStatus[]>,
    fetchAlliances: (worldCode: string) => Promise<Alliance[]>,
    fetchPlayers: (worldCode: string) => Promise<Player[]>,
    fetchTowns: (worldCode: string) => Promise<GrepolisTown[]>,
    fetchIslands: (worldCode: string) => Promise<Island[]>
}