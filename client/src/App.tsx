import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_CONTENT_URL } from "./constants"
import { World } from "./types/World"

const App = () => {
    const [worlds, setWorlds] = useState<World[]>([])
    const [errored, setErrored] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (errored || loading || loaded) return

        setLoading(true)

        axios.get(`${BASE_CONTENT_URL}/worlds.json`)
            .then(res => {
                setWorlds(res.data)
                setLoaded(true)
                setLoading(false)
            })
            .catch(() => {
                setErrored(true)
                setLoaded(true)
                setLoading(false)
            })
    }, [errored, loaded, loading])

    if (errored) return <div>Error</div>

    if (loading) return <div>Loading</div>

    return (
        <div className="d-flex flex-column align-items-center">
            {
                worlds.map(world => <span key={world.id}>{`${world.id} - ${world.name}`}</span>)
            }
        </div>
    )
}

export default App