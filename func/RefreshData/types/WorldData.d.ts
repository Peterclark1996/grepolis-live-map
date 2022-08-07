import { Alliance } from "./Alliance"
import { BlobTown } from "./BlobTown"
import { Player } from "./Player"

export type WorldData = {
    alliances: Alliance[],
    players: Player[],
    towns: BlobTown[]
}