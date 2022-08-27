import axios from "axios"
import { useEffect, useState } from "react"

const useApi = <T>(
    url: string,
    transform: (data: any) => T = data => data as T
) => {
    const [lastFetchedUrl, setLastFetchedUrl] = useState<string>()
    const [data, setData] = useState<T>()
    const [errored, setErrored] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (lastFetchedUrl === url && (errored || loading || loaded)) return

        setLoading(true)
        setLastFetchedUrl(url)

        axios.get(url)
            .then(res => {
                setData(transform(res.data))
                setLoaded(true)
                setLoading(false)
            })
            .catch(() => {
                setErrored(true)
                setLoaded(true)
                setLoading(false)
            })
    }, [errored, lastFetchedUrl, loaded, loading, transform, url])

    return { data, errored, loading, loaded }
}

export default useApi