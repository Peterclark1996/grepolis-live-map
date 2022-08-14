import { WorldData } from "./types/WorldData"
import { BlobServiceClient } from '@azure/storage-blob'
import Jimp from "jimp"

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

export const saveOceanFile = async (worldCode: string, fileName: string, image: Jimp) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION)
    const containerClient = blobServiceClient.getContainerClient(WORLD_DATA_CONTAINER_NAME)

    const imageBuffer = await convertJimpToBuffer(image)

    const containerExists = await containerClient.exists()

    if (!containerExists) {
        await containerClient.create()
    }

    const blockBlobClient = containerClient.getBlockBlobClient(`${worldCode}/ocean/${fileName}.png`)
    await blockBlobClient.uploadData(imageBuffer)
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

const convertJimpToBuffer = (image: Jimp): Promise<Buffer> =>
    new Promise<Buffer>((resolve, reject) => {
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            if (error) reject(error)
            else resolve(buffer)
        })
    })