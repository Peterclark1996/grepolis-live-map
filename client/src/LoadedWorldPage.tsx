import AllianceList from "./components/AllianceList"
import ErrorBox from "./components/ErrorBox"
import LeafletMap from "./components/Leaflet/LeafletMap"
import LoadingSpinner from "./components/LoadingSpinner"
import WorldListDropdown from "./components/WorldListDropdown"
import { ALLIANCE_COLOURS, BASE_CONTENT_URL } from "./constants"
import useApi from "./hooks/useApi"
import { useSelection } from "./hooks/useSelection"
import { AllianceColour } from "./types/AllianceColour"
import { WorldData } from "./types/WorldData"

const LoadedWorldPage = () => {

    const { selectedWorld } = useSelection()

    const { data: worldDates, errored: worldDatesErrored, loading: worldDatesLoading } = useApi<string[]>(
        `${BASE_CONTENT_URL}/${selectedWorld?.id}/info.json`,
        data => data.avialableDates
    )

    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() - 2)

    const { data: worldData, errored: worldDataErrored, loading: worldDataLoading } = useApi<WorldData>(
        `${BASE_CONTENT_URL}/${selectedWorld?.id}/data/${currentDate.toISOString().split('T')[0].replaceAll("-", "_")}.json`
    )

    if (worldDatesErrored || worldDataErrored) return <ErrorBox message="Failed to fetch world data" />
    if (worldDatesLoading || worldDates == undefined || worldDataLoading || worldData == undefined) return <LoadingSpinner />

    const topAlliances = worldData.alliances
        .sort((a, b) => a.points < b.points ? 1 : -1)
        .slice(0, 14)

    const allianceColours: AllianceColour[] = topAlliances.map((alliance, index) => ({
        id: alliance.id,
        colour: ALLIANCE_COLOURS[index]
    }))

    return (
        <div className="d-flex flex-grow-1">
            <div className="d-flex flex-column w-25 pt-4 px-4">
                <WorldListDropdown />
                <div className="my-1" />
                <AllianceList alliances={topAlliances} allianceColours={allianceColours} />
            </div>
            <LeafletMap worldData={worldData} allianceColours={allianceColours} />
        </div>
    )
}

export default LoadedWorldPage