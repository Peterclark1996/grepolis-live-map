import { World } from "../types/World"
import classes from "./WorldListDropdownOption.module.scss"

type WorldListDropdownOptionProps = { world: World; onClick: () => void }

const WorldListDropdownOption = ({ world, onClick }: WorldListDropdownOptionProps) => {
    return (
        <div
            className={`d-flex justify-content-center py-1 ${classes.option}`}
            role="button"
            onClick={onClick}
        >
            <span>{`${world.id} ${world.name}`}</span>
        </div>
    )
}
export default WorldListDropdownOption
