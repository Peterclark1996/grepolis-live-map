import Jimp from "jimp"
import { WorldData } from "./WorldData"
import { WorldFullInfo } from "./WorldFullInfo"

export type BlobFunctions = {
    saveWorldDataFile: (worldCode: string, fileName: string, worldData: WorldData) => Promise<void>,
    saveOceanFile: (worldCode: string, fileName: string, image: Jimp) => Promise<void>,
    saveWorldInfo: (worldCode: string, WorldFullInfo: WorldFullInfo) => Promise<void>,
    getWorldDataFileNames: (worldCode: string) => Promise<string[]>,
    getOceanFileNames: (worldCode: string) => Promise<string[]>
}