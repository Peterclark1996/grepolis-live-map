import { Alliance } from "../types/Alliance"
import classes from "./AllianceButton.module.scss"

const AllianceButton = ({ alliance, selected, onClick }: { alliance: Alliance, selected: boolean, onClick: () => void }) => {
    return (
        <div className={`my-1 ${classes.toggle} ${selected && classes.selected}`} onClick={onClick}>
            <input className="form-check-input bg-transparent shadow-none border-0 mx-2" type="checkbox" checked={selected} readOnly />
            {alliance.name}
        </div>
    )
}

export default AllianceButton