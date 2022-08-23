import { Alliance } from "./types/Alliance"
import { Island } from "./types/Island"
import { Player } from "./types/Player"
import { GrepolisTown } from "./types/GrepolisTown"
import axios from "axios"
import { WorldStatus } from "./types/WorldStatus"

export const fetchWorldList = (): Promise<WorldStatus[]> =>
    axios.get("https://en.grepolis.com/start/hall_of_fame").then(response => {
        const worldsString = response.data.match(/(?<=var warriors_worlds = )[\W|\w]*}]/)[0]
        const worldList = JSON.parse(worldsString)
        return worldList.map(world => ({
            id: world.id,
            name: world.name,
            endgame: world.endgame,
            isClosed: world.closed
        }))
    })

export const fetchAlliances = (worldCode: string): Promise<Alliance[]> =>
    axios.get(`https://${worldCode}.grepolis.com/data/alliances.txt`)
        .then(response =>
            response.data.split("\n")
                .map(alliance => alliance.split(","))
                .filter(allianceParts => allianceParts.length === 6)
                .map(allianceParts => ({
                    id: Number(allianceParts[0]),
                    name: cleanName(allianceParts[1]),
                    points: Number(allianceParts[2]),
                    towns: Number(allianceParts[3]),
                    players: Number(allianceParts[4]),
                    rank: Number(allianceParts[5])
                }))
        )

export const fetchPlayers = (worldCode: string): Promise<Player[]> =>
    axios.get(`https://${worldCode}.grepolis.com/data/players.txt`)
        .then(response =>
            response.data.split("\n")
                .map(player => player.split(","))
                .filter(playerParts => playerParts.length === 6)
                .map(playerParts => ({
                    id: Number(playerParts[0]),
                    name: cleanName(playerParts[1]),
                    alliance: Number(playerParts[2]),
                    points: Number(playerParts[3]),
                    rank: Number(playerParts[4]),
                    towns: Number(playerParts[5])
                }))
        )

export const fetchTowns = (worldCode: string): Promise<GrepolisTown[]> =>
    axios.get(`https://${worldCode}.grepolis.com/data/towns.txt`)
        .then(response =>
            response.data.split("\n")
                .map(town => town.split(","))
                .filter(townParts => townParts.length === 7)
                .map(townParts => ({
                    id: Number(townParts[0]),
                    playerId: Number(townParts[1]),
                    name: cleanName(townParts[2]),
                    islandX: Number(townParts[3]),
                    islandY: Number(townParts[4]),
                    posOnIsland: Number(townParts[5]),
                    points: Number(townParts[6])
                }))
        )

export const fetchIslands = (worldCode: string): Promise<Island[]> =>
    axios.get(`https://${worldCode}.grepolis.com/data/islands.txt`)
        .then(response =>
            response.data.split("\n")
                .map(island => island.split(","))
                .filter(islandParts => islandParts.length === 7)
                .map(islandParts => ({
                    id: Number(islandParts[0]),
                    x: Number(islandParts[1]),
                    y: Number(islandParts[2]),
                    islandType: Number(islandParts[3]),
                    availableSpots: Number(islandParts[4]),
                    resourcePlus: islandParts[5],
                    resourceMinus: islandParts[6]
                }))
        )

const cleanName = (name: string): string =>
    name.split('+').join(' ')
        .split('%27').join('\'')
        .split('%2A').join('*')
        .split('%3D').join('=')
        .split('%3F').join('?')