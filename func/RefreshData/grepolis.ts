import { Alliance } from "./types/Alliance"
import { Island } from "./types/Island"
import { Player } from "./types/Player"
import { GrepolisTown } from "./types/GrepolisTown"

export const fetchWorldCodeList = () => Promise.resolve(["en137"])

export const fetchAlliances = (worldCode: string): Promise<Alliance[]> =>
    fetch(`https://${worldCode}.grepolis.com/data/alliances.txt`)
        .then(res => res.text())
        .then(alliances =>
            alliances.split("\n").map(alliance => alliance.split(",")).map(allianceParts => ({
                id: Number(allianceParts[0]),
                name: cleanName(allianceParts[1]),
                points: Number(allianceParts[2]),
                towns: Number(allianceParts[3]),
                players: Number(allianceParts[4]),
                rank: Number(allianceParts[5])
            }))
        )

export const fetchPlayers = (worldCode: string): Promise<Player[]> =>
    fetch(`https://${worldCode}.grepolis.com/data/players.txt`)
        .then(res => res.text())
        .then(players =>
            players.split("\n").map(player => player.split(",")).map(playerParts => ({
                id: Number(playerParts[0]),
                name: cleanName(playerParts[1]),
                alliance: Number(playerParts[2]),
                points: Number(playerParts[3]),
                rank: Number(playerParts[4]),
                towns: Number(playerParts[5])
            }))
        )

export const fetchTowns = (worldCode: string): Promise<GrepolisTown[]> =>
    fetch(`https://${worldCode}.grepolis.com/data/towns.txt`)
        .then(res => res.text())
        .then(towns =>
            towns.split("\n").map(town => town.split(",")).map(townParts => ({
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
    fetch(`https://${worldCode}.grepolis.com/data/islands.txt`)
        .then(res => res.text())
        .then(islands =>
            islands.split("\n").map(island => island.split(",")).map(islandParts => ({
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