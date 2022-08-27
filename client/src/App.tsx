import ErrorBox from "./components/ErrorBox"
import LoadingSpinner from "./components/LoadingSpinner"
import DefaultPage from "./DefaultPage"
import { useSelection } from "./hooks/useSelection"
import LoadedWorldPage from "./LoadedWorldPage"

const App = () => {

    const { worlds, errored, loading, selectedWorld } = useSelection()

    const render = () => {
        if (errored) return <ErrorBox message="Failed to fetch worlds" />
        if (loading || worlds == undefined) return <LoadingSpinner />

        return selectedWorld == undefined ? <DefaultPage /> : <LoadedWorldPage />
    }


    return (
        <div className="app bg-secondary">
            {
                render()
            }
        </div>
    )
}

export default App