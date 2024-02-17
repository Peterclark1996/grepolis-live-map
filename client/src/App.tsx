import { Layer } from "leaflet"
import { RefObject, useCallback, useEffect, useMemo, useState } from "react"
import AllianceList from "./components/AllianceList"
import DatePicker from "./components/DatePicker"
import ErrorBox from "./components/ErrorBox"
import LeafletMap from "./components/Leaflet/LeafletMap"
import LoadingSpinner from "./components/LoadingSpinner"
import TabbedOptions from "./components/TabbedOptions"
import WorldListDropdown from "./components/WorldListDropdown"
import { DEFAULT_COLOURS, ALLIANCE_COUNT_TO_SHOW, BASE_CONTENT_URL } from "./constants"
import useApi from "./hooks/useApi"
import useSelection from "./hooks/useSelection"
import { AllianceColour } from "./types/AllianceColour"
import { OceanRenderOption } from "./types/enums/OceanRenderOption"
import { LeafletLayer } from "./types/LeafletLayer"
import { World } from "./types/World"
import { WorldData } from "./types/WorldData"
import { WorldInfo } from "./types/WorldInfo"
import classes from "./App.module.scss"

const App = () => {
    const [oceanRenderOption, setOceanRenderOption] = useState(OceanRenderOption.Outer)
    const [showingGreyPlayers, setShowingGreyPlayers] = useState(true)
    const [allianceLayers, setAllianceLayers] = useState<LeafletLayer[]>([])
    const [greyPlayerLayer, setGreyPlayerLayer] = useState<Layer | null>(null)
    const [map, setMap] = useState<L.Map>()
    const { selectedWorldId, setSelectedWorld, selectedDate } = useSelection()

    const worldsQuery = useApi<World[]>(`${BASE_CONTENT_URL}/worlds.json`)
    const infoQuery = useApi<WorldInfo>(
        `${BASE_CONTENT_URL}/${selectedWorldId}/info.json`,
        selectedWorldId !== undefined
    )
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

    const topAlliances = useMemo(
        () =>
            worldDataQuery.data === undefined
                ? []
                : worldDataQuery.data.alliances
                      .sort((a, b) => (a.points < b.points ? 1 : -1))
                      .slice(0, ALLIANCE_COUNT_TO_SHOW),
        [worldDataQuery.data]
    )

    const allianceColours: AllianceColour[] = useMemo(
        () =>
            topAlliances.map((alliance, index) => ({
                id: alliance.id,
                colour: DEFAULT_COLOURS[index]
            })),
        [topAlliances]
    )

    const setAllianceLayer = useCallback(
        (allianceId: number, ref: RefObject<Layer>) =>
            setAllianceLayers(allianceLayers => [
                ...allianceLayers.filter(layer => layer.id != allianceId),
                { id: allianceId, ref }
            ]),
        []
    )

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
        if (showingGreyPlayers) {
            map.addLayer(greyPlayerLayer)
            return
        }
        map.removeLayer(greyPlayerLayer)
    }, [greyPlayerLayer, map, showingGreyPlayers])

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
            return (
                <ErrorBox
                    message="Failed to fetch world data"
                    subMessage="This is usually due to the world closing before this project was started"
                />
            )
        if (worldDataQuery.loading) return <LoadingSpinner />
        if (worldDataQuery.data == undefined) return <></>
        return (
            <LeafletMap
                worldData={worldDataQuery.data}
                allianceColours={allianceColours}
                oceanRenderOption={oceanRenderOption}
                setAllianceLayer={setAllianceLayer}
                setNonTopAlliancePlayersLayer={setNonTopAlliancePlayersLayer}
                setMap={setMap}
            />
        )
    }

    const hasWorldData = worldDataQuery.data !== undefined

    const hasWorldDates =
        infoQuery.data?.avialableDates !== undefined && infoQuery.data?.avialableDates.length > 0

    return (
        <div className="app bg-secondary">
            <div className="d-flex flex-grow-1 justify-content-center">
                <aside className={`d-flex flex-column gap-2 ${classes.sidePanel}`}>
                    {getWorldListDropdown()}
                    {hasWorldDates && (
                        <div className="d-flex justify-content-center">{getDatePicker()}</div>
                    )}
                    {hasWorldData && (
                        <>
                            <div className="d-flex justify-content-center">
                                <TabbedOptions
                                    title="Oceans"
                                    options={Object.entries(OceanRenderOption).map(pair => ({
                                        label: pair[0],
                                        value: pair[1]
                                    }))}
                                    selectedOption={oceanRenderOption}
                                    setSelectedOption={setOceanRenderOption}
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <TabbedOptions
                                    title="Grey Players"
                                    options={[
                                        { label: "On", value: "on" },
                                        { label: "Off", value: "off" }
                                    ]}
                                    selectedOption={showingGreyPlayers ? "on" : "off"}
                                    setSelectedOption={option =>
                                        setShowingGreyPlayers(option === "on")
                                    }
                                />
                            </div>
                            <AllianceList
                                alliances={topAlliances}
                                allianceColours={allianceColours}
                                allianceLayers={allianceLayers}
                                showLayer={showLayer}
                                hideLayer={hideLayer}
                            />
                        </>
                    )}
                </aside>
                {getMapContent()}
            </div>
        </div>
    )
}

export default App
