import axios from "axios"
import { useEffect, useState } from "react"

const useApi = <T>(url: string) => {
    const [data, setData] = useState<T>()
    const [errored, setErrored] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (errored || loading || loaded) return

        setLoading(true)

        axios.get(url)
            .then(res => {
                setData(res.data)
                setLoaded(true)
                setLoading(false)
            })
            .catch(() => {
                setErrored(true)
                setLoaded(true)
                setLoading(false)
            })
    }, [errored, loaded, loading, url])

    return { data, errored, loading, loaded }
}

export default useApi