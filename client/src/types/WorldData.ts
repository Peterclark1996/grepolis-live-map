import { Alliance } from "./Alliance"
import { Town } from "./Town"
import { Player } from "./Player"

export type WorldData = {
    alliances: Alliance[]
    players: Player[]
    towns: Town[]
}
