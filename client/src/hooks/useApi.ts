import axios from "axios"
import { useEffect, useState } from "react"

const useApi = <T>(url: string, canRun = true) => {
    const [lastFetchedUrl, setLastFetchedUrl] = useState<string>()
    const [data, setData] = useState<T>()
    const [errored, setErrored] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [couldRun, setCouldRun] = useState(canRun)

    useEffect(() => {
        if (!couldRun && canRun) {
            setLastFetchedUrl(undefined)
            setData(undefined)
            setLoading(false)
            setErrored(false)
            setLoaded(false)
        }
        setCouldRun(canRun)
    }, [canRun, couldRun])

    useEffect(() => {
        if (lastFetchedUrl === url && (errored || loading || loaded)) return

        if (!canRun) return

        setLoading(true)
        setErrored(false)
        setLoaded(false)
        setLastFetchedUrl(url)

        axios
            .get(url)
            .then(res => {
                setLoaded(true)
                setLoading(false)
                setData(res.data)
            })
            .catch(() => {
                setErrored(true)
                setLoaded(true)
                setLoading(false)
            })
    }, [canRun, errored, lastFetchedUrl, loaded, loading, url])

    return { data, errored, loading, loaded }
}

export default useApi
