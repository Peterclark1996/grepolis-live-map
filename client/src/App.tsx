import ErrorBox from "./components/ErrorBox"
import LoadingSpinner from "./components/LoadingSpinner"
import DefaultPage from "./DefaultPage"
import { useSelection } from "./hooks/useSelection"
import LoadedWorldPage from "./LoadedWorldPage"

const App = () => {

    const { worlds, errored, loading, selectedWorld } = useSelection()

    const render = () => {
        if (errored) return (
            <div className="m-4">
                <ErrorBox message={"Failed to fetch worlds"} />
            </div>
        )

        if (loading || worlds == undefined) return (
            <div className="d-flex h-100 align-items-center">
                <LoadingSpinner />
            </div>
        )

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