import { act, randomNumber, randomString } from "./common"

test('Alliance data is fetched and saved to blob', async () => {

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
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual({ alliances: [inputAlliance], players: [], towns: [] })

})

test('Alliances with no towns are not saved to blob', async () => {

    const validInputAlliance = {
        id: randomNumber(),
        name: randomString(),
        points: randomNumber(),
        towns: 10,
        players: randomNumber(),
        rank: randomNumber()
    }
    const invalidInputAlliance = {
        id: randomNumber(),
        name: randomString(),
        points: randomNumber(),
        towns: 0,
        players: randomNumber(),
        rank: randomNumber()
    }
    const fetchWorldCodeList = () => Promise.resolve(["en01"])
    const fetchAlliances = () => Promise.resolve([validInputAlliance, invalidInputAlliance])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, fetchAlliances, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual({ alliances: [validInputAlliance], players: [], towns: [] })

})