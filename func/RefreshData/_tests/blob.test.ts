import { act } from "./common"

test('World data files are generated for given worlds and saved to blob with correct name', async () => {

    const getCurrentDate = () => new Date("2022-07-05T16:00:00.000Z")
    const fetchWorldCodeList = () => Promise.resolve(["en01", "en02"])
    const saveWorldDataFile = jest.fn()

    await act({ fetchWorldCodeList, saveWorldDataFile, getCurrentDate })

    expect(saveWorldDataFile.mock.calls.length).toBe(2)
    expect(saveWorldDataFile.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldDataFile.mock.calls[0][1]).toStrictEqual("2022_07_05")
    expect(saveWorldDataFile.mock.calls[1][0]).toStrictEqual("en02")
    expect(saveWorldDataFile.mock.calls[1][1]).toStrictEqual("2022_07_05")

})

test('World info blob is generated with all data files', async () => {

    const fetchWorldCodeList = () => Promise.resolve(["en01"])
    const worldDataDates = ["2022_08_22", "2022_08_21", "2022_08_20", "2022_07_10"]
    const getWorldDataFileNames = () => Promise.resolve(worldDataDates.map(date => `en01/data/${date}.json`))
    const saveWorldInfo = jest.fn()

    await act({ fetchWorldCodeList, getWorldDataFileNames, saveWorldInfo })

    expect(saveWorldInfo.mock.calls.length).toBe(1)
    expect(saveWorldInfo.mock.calls[0][0]).toStrictEqual("en01")
    expect(saveWorldInfo.mock.calls[0][1].avialableDates).toEqual(worldDataDates)

})