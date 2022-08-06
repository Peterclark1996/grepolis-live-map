import { generateDataForWorlds } from "./logic"

test('World data files are generated for given worlds', async () => {

    const fetchWorldCodeList = () => Promise.resolve(["en01", "en02"])
    const saveWorldDataFile = jest.fn()

    await generateDataForWorlds(fetchWorldCodeList, saveWorldDataFile)

    expect(saveWorldDataFile.mock.calls.length).toBe(2)
    expect(saveWorldDataFile.mock.calls[0][0]).toBe("en01")
    expect(saveWorldDataFile.mock.calls[1][0]).toBe("en02")

})