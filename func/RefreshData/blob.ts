import { WorldData } from "./types/WorldData"
import { BlobServiceClient } from '@azure/storage-blob'
import { Ocean } from "./types/Ocean"

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

export const saveOceanFile = async (worldCode: string, fileName: string, imageData: string) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION)
    const containerClient = blobServiceClient.getContainerClient(WORLD_DATA_CONTAINER_NAME)

    const containerExists = await containerClient.exists()

    if (!containerExists) {
        await containerClient.create()
    }

    const blockBlobClient = containerClient.getBlockBlobClient(`${worldCode}/ocean/${fileName}.png`)
    const dataToSave = JSON.stringify(imageData)
    await blockBlobClient.upload(dataToSave, dataToSave.length)
}

export const getOceanFileNames = async (worldCode: string): Promise<string[]> => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION)
    const containerClient = blobServiceClient.getContainerClient(WORLD_DATA_CONTAINER_NAME)

    const containerExists = await containerClient.exists()

    if (!containerExists) return []

    const fileNames = []
    for await (const blob of containerClient.listBlobsFlat({ prefix: `${worldCode}/ocean/` })) {
        fileNames.push(blob.name)
    }

    return fileNames
}