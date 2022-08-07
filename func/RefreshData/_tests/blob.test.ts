import { act, randomNumber, randomString } from "./common"

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