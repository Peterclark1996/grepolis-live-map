import { World } from "../types/World"
import classes from "./WorldListDropdownOption.module.scss"

type WorldListDropdownOptionProps = {
    world: World
    onClick?: () => void
}

const WorldListDropdownOption = ({ world, onClick }: WorldListDropdownOptionProps) => {
    return (
        <option
            className={`d-flex justify-content-center py-1 ${classes.option}`}
            onClick={onClick && onClick}
            value={world.id}
        >
            {`${world.id} ${world.name}`}
        </option>
    )
}
export default WorldListDropdownOption
