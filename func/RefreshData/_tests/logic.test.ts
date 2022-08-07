import { act, randomNumber, randomString } from "./common"

test('World data files are generated for given worlds', async () => {

    const fetchWorldCodeList = () => Promise.resolve(["en01", "en02"])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(2)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[1][0]).toStrictEqual("en02")

})

test('Alliance data is generated as expected', async () => {

    const inputAlliance = {
        id: randomNumber(),
        name: randomString(),
        points: randomNumber(),
        towns: randomNumber(),
        players: randomNumber(),
        rank: randomNumber()
    }
    const fetchWorldCodeList = () => Promise.resolve(["en01"])
    const fetchAlliances = () => Promise.resolve([inputAlliance])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, fetchAlliances, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual({ alliances: [inputAlliance], players: [] })

})

test('Player data is generated as expected', async () => {

    const inputPlayer = {
        id: randomNumber(),
        name: randomString(),
        alliance: randomNumber(),
        points: randomNumber(),
        rank: randomNumber(),
        towns: randomNumber()
    }
    const fetchWorldCodeList = () => Promise.resolve(["en01"])
    const fetchPlayers = () => Promise.resolve([inputPlayer])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, fetchPlayers, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual({ alliances: [], players: [inputPlayer] })

})