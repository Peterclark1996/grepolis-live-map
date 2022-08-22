import { WorldData } from "./types/WorldData"
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import Jimp from "jimp"
import { WorldInfo } from "./types/WorldInfo"

const WORLD_DATA_CONTAINER_NAME = "world-data"

export const saveWorldDataFile = async (worldCode: string, fileName: string, worldData: WorldData) => {
    const containerClient = await getBlobClientConnection()

    const blockBlobClient = containerClient.getBlockBlobClient(`${worldCode}/data/${fileName}.json`)
    const dataToSave = JSON.stringify(worldData)
    await blockBlobClient.upload(dataToSave, dataToSave.length)
}

export const saveOceanFile = async (worldCode: string, fileName: string, image: Jimp) => {
    const containerClient = await getBlobClientConnection()

    const blockBlobClient = containerClient.getBlockBlobClient(`${worldCode}/ocean/${fileName}.png`)
    const imageBuffer = await convertJimpToBuffer(image)
    await blockBlobClient.uploadData(imageBuffer)
}

export const getOceanFileNames = async (worldCode: string): Promise<string[]> => {
    const containerClient = await getBlobClientConnection()

    const fileNames = []
    for await (const blob of containerClient.listBlobsFlat({ prefix: `${worldCode}/ocean/` })) {
        fileNames.push(blob.name)
    }

    return fileNames
}

export const saveWorldInfo = async (worldCode: string, worldInfo: WorldInfo): Promise<void> => {
    const containerClient = await getBlobClientConnection()

    const blockBlobClient = containerClient.getBlockBlobClient(`${worldCode}/info.json`)
    const dataToSave = JSON.stringify(worldInfo)
    await blockBlobClient.upload(dataToSave, dataToSave.length)
}

export const getWorldDataFileNames = async (worldCode: string): Promise<string[]> => {
    const containerClient = await getBlobClientConnection()

    const fileNames = []
    for await (const blob of containerClient.listBlobsFlat({ prefix: `${worldCode}/data/` })) {
        fileNames.push(blob.name)
    }

    return fileNames
}

const getBlobClientConnection = async (): Promise<ContainerClient> => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env["AZURE_STORAGE_CONNECTION"])
    const containerClient = blobServiceClient.getContainerClient(WORLD_DATA_CONTAINER_NAME)

    const containerExists = await containerClient.exists()

    if (!containerExists) {
        await containerClient.create()
    }

    return containerClient
}

const convertJimpToBuffer = (image: Jimp): Promise<Buffer> =>
    new Promise<Buffer>((resolve, reject) => {
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            if (error) reject(error)
            else resolve(buffer)
        })
    })