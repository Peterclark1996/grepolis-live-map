import { useSearchParams } from "react-router-dom"
import { ISLAND_RENDER_OPTIONS } from "../constants"

type Options = {
    islands: (typeof ISLAND_RENDER_OPTIONS)[number]
    greyPlayers: boolean
    cityScale: number
    hiddenAllianceIds: number[]
    fullscreen: boolean
    setOption: (action: OptionSetActions) => void
}

type OptionSetActions =
    | {
          key: "islands"
          value: (typeof ISLAND_RENDER_OPTIONS)[number]
      }
    | {
          key: "greyPlayers"
          value: boolean
      }
    | {
          key: "cityScale"
          value: number
      }
    | {
          key: "hiddenAllianceIds"
          value: number[]
      }

const useOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const islandsParam = searchParams.get("islands")
    const islands = islandsParam === "none" || islandsParam === "center" || islandsParam === "all" ? islandsParam : "outer"

    const greyPlayers = searchParams.get("greyPlayers") === "true"

    const cityScale = parseFloat(searchParams.get("cityScale") ?? "100")

    const fullscreen = searchParams.get("fullscreen") === "true"

    const hiddenAllianceIds =
        searchParams
            .get("hiddenAllianceIds")
            ?.split(",")
            .map(id => parseInt(id))
            .filter(id => !Number.isNaN(id)) ?? []

    const setOption = (action: OptionSetActions) => {
        const currentOptions = {
            islands,
            greyPlayers: greyPlayers.toString(),
            cityScale: cityScale.toString()
        }

        const value = Array.isArray(action.value) ? action.value.join(",") : action.value.toString()

        const updatedOptions = {
            ...currentOptions,
            [action.key]: value
        }

        setSearchParams(updatedOptions)
    }

    const options: Options = {
        islands,
        greyPlayers,
        cityScale,
        hiddenAllianceIds,
        fullscreen,
        setOption
    }

    return options
}

export default useOptions
