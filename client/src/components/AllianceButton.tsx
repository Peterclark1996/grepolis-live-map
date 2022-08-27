import { Alliance } from "../types/Alliance"
import classes from "./AllianceButton.module.scss"
import allianceIcon from "../icons/icon_alliance.png"
import pointsIcon from "../icons/icon_points.png"
import playerIcon from "../icons/icon_player.png"

const AllianceButton = ({ alliance, position, colour, selected, onClick }: {
    alliance: Alliance,
    position: number,
    colour: string,
    selected: boolean,
    onClick: () => void
}) => {
    return (
        <div
            className={`d-flex my-1 ${classes.toggle} ${selected && classes.selected}`}
            onClick={onClick}
            role="button"
        >
            <div className={`d-flex flex-grow-1 overflow-hidden ${classes.background}`} style={{ "backgroundColor": `${colour}40` }}>
                <div className={`d-flex align-items-center me-2 px-1 ${classes.colour}`} style={{ "backgroundColor": colour }}>
                    <input
                        className="form-check-input bg-transparent shadow-none border-0 mx-2 mb-1"
                        type="checkbox"
                        checked={selected}
                        readOnly
                        role="button"
                    />
                </div>
                <div className="d-flex flex-grow-1 flex-column align-items-center">
                    <div className={classes.title}>
                        {alliance.name}
                    </div>
                    <div className="d-flex w-100 px-3 mb-1 justify-content-around">
                        <div className={`d-flex align-items-center ${classes.infoTag}`}>
                            <img className="me-1" src={allianceIcon} />
                            #{position}
                        </div>
                        <div className={`d-flex align-items-center ${classes.infoTag}`}>
                            <img className="me-1" src={pointsIcon} />
                            {alliance.points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className={`d-flex align-items-center ${classes.infoTag}`}>
                            <img className="me-1" src={playerIcon} />
                            {alliance.players}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllianceButton