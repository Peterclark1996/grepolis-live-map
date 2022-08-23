import { act, createWorldStatus, randomNumber, randomString } from "./common"

test('Player data is fetched and saved to blob', async () => {

    const inputPlayer = {
        id: randomNumber(),
        name: randomString(),
        alliance: randomNumber(),
        points: randomNumber(),
        rank: randomNumber(),
        towns: randomNumber()
    }
    const fetchWorldList = () => Promise.resolve([createWorldStatus("en01")])
    const fetchPlayers = () => Promise.resolve([inputPlayer])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldList, fetchPlayers, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][2]).toStrictEqual({ alliances: [], players: [inputPlayer], towns: [] })

})

test('Players with no towns are not saved to blob', async () => {

    const validInputPlayer = {
        id: randomNumber(),
        name: randomString(),
        alliance: randomNumber(),
        points: randomNumber(),
        rank: randomNumber(),
        towns: 10
    }
    const invalidInputPlayer = {
        id: randomNumber(),
        name: randomString(),
        alliance: randomNumber(),
        points: randomNumber(),
        rank: randomNumber(),
        towns: 0
    }
    const fetchWorldList = () => Promise.resolve([createWorldStatus("en01")])
    const fetchPlayers = () => Promise.resolve([validInputPlayer, invalidInputPlayer])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldList, fetchPlayers, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][2]).toStrictEqual({ alliances: [], players: [validInputPlayer], towns: [] })

})