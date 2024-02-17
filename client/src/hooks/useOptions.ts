import { useSearchParams } from "react-router-dom"
import { ISLAND_RENDER_OPTIONS } from "../constants"

type Options = {
    islands: (typeof ISLAND_RENDER_OPTIONS)[number]
    greyPlayers: boolean
    cityScale: number
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

const useOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const islandsParam = searchParams.get("islands")
    const islands = islandsParam === "none" || islandsParam === "center" || islandsParam === "all" ? islandsParam : "outer"

    const greyPlayers = searchParams.get("greyPlayers") === "true"

    const cityScale = parseFloat(searchParams.get("cityScale") ?? "100")

    const setOption = (action: OptionSetActions) => {
        const currentOptions = {
            islands,
            greyPlayers: greyPlayers.toString(),
            cityScale: cityScale.toString()
        }

        const updatedOptions = {
            ...currentOptions,
            [action.key]: action.value.toString()
        }

        setSearchParams(updatedOptions)
    }

    const options: Options = {
        islands,
        greyPlayers,
        cityScale,
        setOption
    }

    return options
}

export default useOptions
