import { createContext, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { BASE_CONTENT_URL } from "../constants"
import { World } from "../types/World"
import useApi from "./useApi"

interface SelectionContextInterface {
    worlds: World[],
    errored: boolean,
    loading: boolean,
    selectedWorld: World | undefined,
    setSelectedWorld: (world: World) => void
}

const SelectionContext = createContext<SelectionContextInterface>({
    worlds: [],
    errored: false,
    loading: true,
    selectedWorld: undefined,
    setSelectedWorld: () => undefined
})

export const SelectionProvider = (props: React.PropsWithChildren<unknown>) => {
    const location = useLocation()
    const navigate = useNavigate()

    const { data: worlds, errored, loading } = useApi<World[]>(`${BASE_CONTENT_URL}/worlds.json`)

    const selectedWorldId = location.pathname.split("/")[1]
    const selectedWorld = worlds?.find(world => world.id === selectedWorldId)

    useEffect(() => {
        if (errored || loading || worlds == undefined || selectedWorldId === "") return
        if (selectedWorld != undefined) return

        navigate("/")

    }, [errored, loading, navigate, selectedWorld, selectedWorldId, worlds])

    const setSelectedWorld = (world: World) => navigate(`/${world.id}`)

    const value = { worlds: worlds || [], errored, loading, selectedWorld, setSelectedWorld }

    return <SelectionContext.Provider value={value} {...props} />
}

export const useSelection = () => useContext(SelectionContext)