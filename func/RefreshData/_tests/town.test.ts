import { act, randomNumber, randomString } from "./common"

test('Town data is fetched and saved to blob with calculated position values', async () => {

    const inputTown = {
        id: randomNumber(),
        playerId: randomNumber(),
        name: randomString(),
        islandX: 500,
        islandY: 500,
        posOnIsland: 1,
        points: 10000
    }
    const inputIsland = {
        id: randomNumber(),
        x: 500,
        y: 500,
        islandType: 3,
        availableSpots: 10,
        resourcePlus: randomString(),
        resourceMinus: randomString()
    }
    const fetchWorldCodeList = () => Promise.resolve(["en01"])
    const fetchTowns = () => Promise.resolve([inputTown])
    const fetchIslands = () => Promise.resolve([inputIsland])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, fetchTowns, fetchIslands, saveWorldDataFile })

    const expectedTown = {
        ...inputTown,
        size: 0.184,
        x: 499.46,
        y: 503.4
    }
    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual({ alliances: [], players: [], towns: [expectedTown] })

})

test('Towns with missing islands are not saved to blob', async () => {

    const inputTown = {
        id: randomNumber(),
        playerId: randomNumber(),
        name: randomString(),
        islandX: randomNumber(),
        islandY: randomNumber(),
        posOnIsland: randomNumber(),
        points: randomNumber()
    }
    const fetchWorldCodeList = () => Promise.resolve(["en01"])
    const fetchTowns = () => Promise.resolve([inputTown])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, fetchTowns, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual({ alliances: [], players: [], towns: [] })

})

test('Towns with invalid island positions are not saved to blob', async () => {

    const inputTown = {
        id: randomNumber(),
        playerId: randomNumber(),
        name: randomString(),
        islandX: 500,
        islandY: 500,
        posOnIsland: 99,
        points: 10000
    }
    const inputIsland = {
        id: randomNumber(),
        x: 500,
        y: 500,
        islandType: 3,
        availableSpots: 10,
        resourcePlus: randomString(),
        resourceMinus: randomString()
    }
    const fetchWorldCodeList = () => Promise.resolve(["en01"])
    const fetchTowns = () => Promise.resolve([inputTown])
    const fetchIslands = () => Promise.resolve([inputIsland])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, fetchTowns, fetchIslands, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(1)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual({ alliances: [], players: [], towns: [] })

})