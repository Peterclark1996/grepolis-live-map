import { WorldData } from "./types/WorldData"
import { BlobServiceClient } from '@azure/storage-blob'

const WORLD_DATA_CONTAINER_NAME = "world-data"

export const saveWorldDataFile = async (worldCode: string, fileName: string, worldData: WorldData) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION)
    const containerClient = blobServiceClient.getContainerClient(WORLD_DATA_CONTAINER_NAME)

    const containerExists = await containerClient.exists()

    if (!containerExists) {
        await containerClient.create()
    }

    const blockBlobClient = containerClient.getBlockBlobClient(`${worldCode}/${fileName}.json`)
    const dataToSave = JSON.stringify(worldData)
    await blockBlobClient.upload(dataToSave, dataToSave.length)
}