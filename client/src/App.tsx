import ErrorBox from "./components/ErrorBox"
import DefaultPage from "./DefaultPage"
import { useSelection } from "./hooks/useSelection"
import LoadedWorldPage from "./LoadedWorldPage"

const App = () => {

    const { worlds, errored, loading, selectedWorld } = useSelection()

    if (errored) return (
        <div className="m-4">
            <ErrorBox message={"Failed to fetch worlds"} />
        </div>
    )

    if (loading || worlds == undefined) return <div>Loading</div>

    return (
        <div className="app">
            {
                selectedWorld == undefined ? <DefaultPage /> : <LoadedWorldPage />
            }
        </div>
    )
}

export default App