import WorldListDropdown from "./components/WorldListDropdown"

const LoadedWorldPage = () => {
    return (
        <div className="d-flex flex-grow-1">
            <div className="d-flex flex-column w-25 p-4">
                <WorldListDropdown />
                <div className="mt-4">
                    Alliances
                </div>
            </div>
            <div className="d-flex w-75 bg-primary">
                Map
            </div>
        </div>
    )
}

export default LoadedWorldPage