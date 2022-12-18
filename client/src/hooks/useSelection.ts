import { useNavigate, useLocation } from "react-router-dom"
import { World } from "../types/World"

const useSelection = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const urlFirstPart = location.pathname.split("/")[1]
    const selectedWorldId = urlFirstPart === "" ? undefined : urlFirstPart

    const urlSecondPart = location.pathname.split("/")[2]
    const selectedDate = urlSecondPart === "" ? undefined : urlSecondPart

    const setSelectedWorld = (world: World) => navigate(`/${world.id}`)

    const setSelectedDate = (date: string) => {
        if (!selectedWorldId) return
        navigate(`/${selectedWorldId}/${date}`)
    }

    return {
        selectedWorldId,
        setSelectedWorld,
        selectedDate,
        setSelectedDate
    }
}

export default useSelection
