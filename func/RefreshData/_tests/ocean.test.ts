import { act, createWorldStatus } from "./common"

test('Ocean data is generated and saved to blob', async () => {

    const fetchWorldList = () => Promise.resolve([createWorldStatus("en01")])
    const saveOceanFile = jest.fn()

    await act({ fetchWorldList, saveOceanFile })

    const oceanStrings: string[] = []
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            oceanStrings.push(`${x}_${y}`)
        }
    }

    expect(saveOceanFile.mock.calls.length).toBe(100)
    saveOceanFile.mock.calls.forEach(call => expect(call[0]).toStrictEqual("en01"))
    expect(saveOceanFile.mock.calls.map(call => call[1])).toEqual(oceanStrings)

})

test('Oceans that already have image files are not saved to blob', async () => {
    const fetchWorldList = () => Promise.resolve([createWorldStatus("en01")])
    const saveOceanFile = jest.fn()
    const oceanNames = ["en01/ocean/0_0.png", "en01/ocean/3_7.png", "en01/ocean/6_9.png", "en01/ocean/9_9.png"]
    const getOceanFileNames = () => Promise.resolve(oceanNames)

    await act({ fetchWorldList, saveOceanFile, getOceanFileNames })

    const oceanStrings: string[] = []
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const filename = `${x}_${y}`
            if (filename !== "0_0" && filename !== "3_7" && filename !== "6_9" && filename !== "9_9") {
                oceanStrings.push(filename)
            }
        }
    }

    expect(saveOceanFile.mock.calls.length).toBe(96)
    saveOceanFile.mock.calls.forEach(call => expect(call[0]).toStrictEqual("en01"))
    expect(saveOceanFile.mock.calls.map(call => call[1])).toEqual(oceanStrings)
})