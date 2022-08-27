import WorldListDropdown from "./components/WorldListDropdown"

const DefaultPage = () => {
    return (
        <div className="d-flex flex-grow-1 justify-content-center p-4 bg-secondary">
            <div className="p-4 w-25">
                <WorldListDropdown />
            </div>
        </div>
    )
}

export default DefaultPage