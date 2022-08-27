import AllianceList from "./components/AllianceList"
import ErrorBox from "./components/ErrorBox"
import LoadingSpinner from "./components/LoadingSpinner"
import WorldListDropdown from "./components/WorldListDropdown"
import { BASE_CONTENT_URL } from "./constants"
import useApi from "./hooks/useApi"
import { useSelection } from "./hooks/useSelection"
import { WorldData } from "./types/WorldData"

const LoadedWorldPage = () => {

    const { selectedWorld } = useSelection()

    const { data: worldDates, errored: worldDatesErrored, loading: worldDatesLoading } = useApi<string[]>(
        `${BASE_CONTENT_URL}/${selectedWorld?.id}/info.json`,
        data => data.avialableDates
    )

    const { data: worldData, errored: worldDataErrored, loading: worldDataLoading } = useApi<WorldData>(
        `${BASE_CONTENT_URL}/${selectedWorld?.id}/data/${(new Date()).toISOString().split('T')[0].replaceAll("-", "_")}.json`
    )

    if (worldDatesErrored || worldDataErrored) return <ErrorBox message="Failed to fetch world data" />
    if (worldDatesLoading || worldDates == undefined || worldDataLoading || worldData == undefined) return <LoadingSpinner />

    return (
        <div className="d-flex flex-grow-1">
            <div className="d-flex flex-column w-25 pt-4 px-4">
                <WorldListDropdown />
                <div className="my-1" />
                <AllianceList alliances={worldData.alliances} />
            </div>
            <div className="d-flex w-75 bg-primary">
                Map
            </div>
        </div>
    )
}

export default LoadedWorldPage