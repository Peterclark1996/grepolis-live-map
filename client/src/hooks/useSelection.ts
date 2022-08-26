import { useNavigate, useLocation } from "react-router-dom"

const useSelection = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const clearSelection = () => navigate("/")

    const selectedWorldId = location.pathname.split("/")[1]

    const setSelectedWorldId = (world: string) => navigate(`/${world}`)

    return { clearSelection, selectedWorldId, setSelectedWorldId }
}

export default useSelection