import { act, createWorldStatus } from "./common"

test('World data files are generated for given worlds and saved to blob with correct name', async () => {

    const getCurrentDate = () => new Date("2022-07-05T16:00:00.000Z")
    const fetchWorldList = () => Promise.resolve([createWorldStatus("en01"), createWorldStatus("en02")])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldList, saveWorldDataFile, getCurrentDate })

    expect(saveWorldDataFile.mock.calls.length).toBe(2)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual("2022_07_05")
    expect(saveWorldDataFile.mock.calls[1][0]).toStrictEqual("en02")
    expect(saveWorldDataFile.mock.calls[1][1]).toStrictEqual("2022_07_05")

})

test('World full info blob is generated with all data files', async () => {

    const fetchWorldList = () => Promise.resolve([createWorldStatus("en01"), createWorldStatus("en123")])
    const worldDataDates = ["2022_08_22", "2022_08_21", "2022_08_20", "2022_07_10"]
    const getWorldDataFileNames = (worldCode: string) => Promise.resolve(worldDataDates.map(date => `${worldCode}/data/${date}.json`))
    const saveWorldInfo = jest.fn()

    await act({ fetchWorldList, getWorldDataFileNames, saveWorldInfo })

    expect(saveWorldInfo.mock.calls.length).toBe(2)
    expect(saveWorldInfo.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldInfo.mock.calls[0][1].avialableDates).toEqual(worldDataDates)
    expect(saveWorldInfo.mock.calls[1][0]).toStrictEqual("en123")
    expect(saveWorldInfo.mock.calls[1][1].avialableDates).toEqual(worldDataDates)

})

test('Closed worlds have world full info saved to blob', async () => {

    const fetchWorldList = () => Promise.resolve([{ ...createWorldStatus("en01"), isClosed: true }])
    const worldDataDates = ["2022_08_22"]
    const getWorldDataFileNames = (worldCode: string) => Promise.resolve(worldDataDates.map(date => `${worldCode}/data/${date}.json`))
    const saveWorldInfo = jest.fn()

    await act({ fetchWorldList, getWorldDataFileNames, saveWorldInfo })

    const expectedWorldFullInfo = {
        avialableDates: worldDataDates,
        id: "en01",
        name: "World Name",
        endgame: "end_game_type_none",
        isClosed: true
    }
    expect(saveWorldInfo.mock.calls.length).toBe(1)
    expect(saveWorldInfo.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldInfo.mock.calls[0][1]).toEqual(expectedWorldFullInfo)

})

test('Closed worlds do not have data saved to a blob', async () => {

    const fetchWorldList = () => Promise.resolve([{ ...createWorldStatus("en01"), isClosed: true }])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldList, saveWorldDataFile })

    expect(saveWorldDataFile.mock.calls.length).toBe(0)

})