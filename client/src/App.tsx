import { Layer } from "leaflet"
import { RefObject, useEffect, useState } from "react"
import AllianceList from "./components/AllianceList"
import DatePicker from "./components/DatePicker"
import ErrorBox from "./components/ErrorBox"
import LeafletMap from "./components/Leaflet/LeafletMap"
import LoadingSpinner from "./components/LoadingSpinner"
import TabbedOptions from "./components/TabbedOptions"
import WorldListDropdown from "./components/WorldListDropdown"
import { DEFAULT_COLOURS, ALLIANCE_COUNT_TO_SHOW, BASE_CONTENT_URL, ISLAND_RENDER_OPTIONS } from "./constants"
import useApi from "./hooks/useApi"
import useSelection from "./hooks/useSelection"
import { LeafletLayer } from "./types/LeafletLayer"
import { World } from "./types/World"
import { WorldData } from "./types/WorldData"
import { WorldInfo } from "./types/WorldInfo"
import classes from "./App.module.scss"
import CityScaleSlider from "./components/CityScaleSlider"
import useOptions from "./hooks/useOptions"

const App = () => {
    const [allianceLayers, setAllianceLayers] = useState<LeafletLayer[]>([])
    const [greyPlayerLayer, setGreyPlayerLayer] = useState<Layer | null>(null)
    const [map, setMap] = useState<L.Map>()
    const { selectedWorldId, setSelectedWorld, selectedDate } = useSelection()
    const options = useOptions()

    const worldsQuery = useApi<World[]>(`${BASE_CONTENT_URL}/worlds.json`)
    const infoQuery = useApi<WorldInfo>(`${BASE_CONTENT_URL}/${selectedWorldId}/info.json`, selectedWorldId !== undefined)
    const worldDataQuery = useApi<WorldData>(
        `${BASE_CONTENT_URL}/${selectedWorldId}/data/${selectedDate}.json`,
        selectedWorldId !== undefined && selectedDate !== undefined
    )

    useEffect(() => {
        if (selectedWorldId !== undefined) return
        if (worldsQuery.data === undefined) return

        const openWorlds = worldsQuery.data.filter(world => !world.isClosed)
        if (openWorlds.length === 0) return

        setSelectedWorld(openWorlds[0])
    }, [selectedWorldId, setSelectedWorld, worldsQuery.data])

    const topAlliances =
        worldDataQuery.data === undefined ? [] : worldDataQuery.data.alliances.sort((a, b) => (a.points < b.points ? 1 : -1)).slice(0, ALLIANCE_COUNT_TO_SHOW)

    const allianceColours = topAlliances.map((alliance, index) => ({
        id: alliance.id,
        colour: DEFAULT_COLOURS[index]
    }))

    const setAllianceLayer = (allianceId: number, ref: RefObject<Layer>) =>
        setAllianceLayers(allianceLayers => [...allianceLayers.filter(layer => layer.id != allianceId), { id: allianceId, ref }])

    const showLayer = (ref: RefObject<Layer>) => {
        if (map === undefined) return
        if (ref.current == null) return
        map.addLayer(ref.current)
    }

    const hideLayer = (ref: RefObject<Layer>) => {
        if (map === undefined) return
        if (ref.current == null) return
        map.removeLayer(ref.current)
    }

    const setNonTopAlliancePlayersLayer = (ref: RefObject<Layer>) => {
        const current = ref.current
        if (current === null) return
        setGreyPlayerLayer(current)
    }

    useEffect(() => {
        if (map === undefined || map === null) return
        if (greyPlayerLayer === null) return
        if (options.greyPlayers) {
            map.addLayer(greyPlayerLayer)
            return
        }
        map.removeLayer(greyPlayerLayer)
    }, [greyPlayerLayer, map, options.greyPlayers])

    const getWorldListDropdown = () => {
        if (worldsQuery.errored) return <ErrorBox message="Failed to fetch worlds" />
        if (worldsQuery.loading) return <LoadingSpinner />
        if (worldsQuery.data == undefined) return <></>
        return <WorldListDropdown worlds={worldsQuery.data} />
    }

    const getDatePicker = () => {
        if (infoQuery.errored) return <ErrorBox message="Failed to fetch world info" />
        if (infoQuery.loading) return <LoadingSpinner />
        if (infoQuery.data == undefined) return <></>
        return <DatePicker dates={infoQuery.data.avialableDates} />
    }

    const getMapContent = () => {
        if (worldDataQuery.errored)
            return <ErrorBox message="Failed to fetch world data" subMessage="This is usually due to the world closing before this project was started" />
        if (worldDataQuery.loading) return <LoadingSpinner />
        if (worldDataQuery.data == undefined) return <></>
        return (
            <LeafletMap
                worldData={worldDataQuery.data}
                allianceColours={allianceColours}
                setAllianceLayer={setAllianceLayer}
                setNonTopAlliancePlayersLayer={setNonTopAlliancePlayersLayer}
                setMap={setMap}
            />
        )
    }

    const hasWorldData = worldDataQuery.data !== undefined

    const hasWorldDates = infoQuery.data?.avialableDates !== undefined && infoQuery.data?.avialableDates.length > 0

    return (
        <div className="app bg-secondary">
            <aside className={`d-flex flex-column gap-2 ${classes.sidePanel}`}>
                {getWorldListDropdown()}
                {hasWorldDates && (
                    <>
                        {getDatePicker()}
                        <CityScaleSlider />
                        <TabbedOptions
                            title="Islands"
                            options={ISLAND_RENDER_OPTIONS}
                            selectedOption={options.islands}
                            setSelectedOption={option => options.setOption({ key: "islands", value: option })}
                        />
                        <TabbedOptions
                            title="Grey Players"
                            options={["on", "off"]}
                            selectedOption={options.greyPlayers ? "on" : "off"}
                            setSelectedOption={option => options.setOption({ key: "greyPlayers", value: option === "on" })}
                        />
                    </>
                )}
                {hasWorldData && (
                    <AllianceList
                        alliances={topAlliances}
                        allianceColours={allianceColours}
                        allianceLayers={allianceLayers}
                        showLayer={showLayer}
                        hideLayer={hideLayer}
                    />
                )}
            </aside>
            {getMapContent()}
        </div>
    )
}

export default App
