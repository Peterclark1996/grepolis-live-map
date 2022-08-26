import { World } from "../types/World"
import classes from "./WorldListDropdownOption.module.scss"

const WorldListDropdownOption = ({ world, onClick }: { world: World, onClick: () => void }) => {
    return (
        <div className={`d-flex justify-content-center py-1 ${classes.option}`} role="button" onClick={onClick}>
            <span>{`${world.id} ${world.name}`}</span>
        </div>
    )
}
export default WorldListDropdownOption