import { useCallback, useEffect, useRef, useState } from "react"
import { useSelection } from "../hooks/useSelection"
import { World } from "../types/World"
import classes from "./WorldListDropdown.module.scss"
import WorldListDropdownOption from "./WorldListDropdownOption"

const WorldListDropdown = () => {
    const [showingOptions, setShowingOptions] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const { worlds, selectedWorld, setSelectedWorld } = useSelection()

    const onSelectWorld = (world: World) => {
        setSelectedWorld(world)
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

    return (
        <div ref={ref} className="d-flex flex-column position-relative">
            <div
                className={`d-flex justify-content-between align-items-center mx-4 px-4 py-2 ${classes.dropdown} ${showingOptions && classes.open}`}
                role="button"
                onClick={() => setShowingOptions(!showingOptions)}
            >
                <div></div>
                <div>
                    {
                        selectedWorld != undefined ? <WorldListDropdownOption world={selectedWorld} onClick={() => undefined} /> : "Select a world"
                    }
                </div>
                <div className="d-flex align-items-center">
                    <i className={`position-absolute fa-solid fa-chevron-right ${classes.chevron} ${showingOptions && classes.chevronRotated}`} />
                </div>
            </div>
            <div>
                <div className="position-absolute overflow-hidden w-100 px-4 pb-4">
                    <div className={`d-flex flex-column overflow-auto w-100 ${classes.options} ${showingOptions && classes.open}`}>
                        {
                            worlds.filter(world => !world.isClosed).map(world => <WorldListDropdownOption key={world.id} world={world} onClick={() => onSelectWorld(world)} />)
                        }
                        <div className="d-flex flex-grow-1 border mx-3 "></div>
                        {
                            worlds.filter(world => world.isClosed).map(world => <WorldListDropdownOption key={world.id} world={world} onClick={() => onSelectWorld(world)} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorldListDropdown