import { useCallback, useEffect, useRef, useState } from "react"
import { BASE_CONTENT_URL } from "../constants"
import useApi from "../hooks/useApi"
import { World } from "../types/World"
import classes from "./WorldListDropdown.module.scss"
import WorldListDropdownOption from "./WorldListDropdownOption"

const WorldListDropdown = () => {
    const [showingOptions, setShowingOptions] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const { data: worlds, errored, loading } = useApi<World[]>(`${BASE_CONTENT_URL}/worlds.json`)

    const onSelectWorld = (world: World) => {
        console.log("Selecting world", world)
        setShowingOptions(false)
    }

    const handleClickOutsideComponent = useCallback((event: MouseEvent) => {
        if (!ref || !ref.current) return
        if (ref.current.contains(event.target as Node)) return
        setShowingOptions(false)
    }, [])

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideComponent)
        return () => document.removeEventListener("click", handleClickOutsideComponent)
    }, [handleClickOutsideComponent])

    if (errored) return <div>Failed to fetch worlds</div>

    if (loading || worlds == undefined) return <div>Loading</div>

    return (
        <div ref={ref} className="d-flex flex-column position-relative">
            <div
                className={`d-flex justify-content-center px-4 py-2 ${classes.dropdown}`}
                role="button"
                onClick={() => setShowingOptions(!showingOptions)}
            >
                Select a world
            </div>
            {
                showingOptions &&
                <div>
                    <div className={`d-flex flex-column position-absolute overflow-auto mt-2 w-100 ${classes.options}`}>
                        {
                            worlds.filter(world => !world.isClosed).map(world => <WorldListDropdownOption key={world.id} world={world} onClick={() => onSelectWorld(world)} />)
                        }
                        <div className="d-flex flex-grow-1 border mx-3 "></div>
                        {
                            worlds.filter(world => world.isClosed).map(world => <WorldListDropdownOption key={world.id} world={world} onClick={() => onSelectWorld(world)} />)
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default WorldListDropdown