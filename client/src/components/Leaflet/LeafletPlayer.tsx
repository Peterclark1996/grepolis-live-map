import { Circle, Tooltip } from "react-leaflet"
import { DEFAULT_ALLIANCE_COLOUR } from "../../constants"
import { Alliance } from "../../types/Alliance"
import { AllianceColour } from "../../types/AllianceColour"
import { Player } from "../../types/Player"
import { Town } from "../../types/Town"
import allianceIcon from "../../img/icon_alliance.png"
import playerIcon from "../../img/icon_player.png"
import pointsIcon from "../../img/icon_points.png"
import townIcon from "../../img/icon_town.png"
import { renderNumberAsString } from "../../helpers"
import classes from "./LeafletPlayer.module.scss"
import useOptions from "../../hooks/useOptions"

type LeafletPlayerProps = {
    player: Player
    alliance: Alliance
    towns: Town[]
    allianceColours: AllianceColour[]
}

const LeafletPlayer = ({ player, alliance, towns, allianceColours }: LeafletPlayerProps) => {
    const colour = allianceColours.find(c => c.id === alliance.id)?.colour || DEFAULT_ALLIANCE_COLOUR

    const options = useOptions()

    const townScale = options.cityScale / 100

    return (
        <div>
            {towns
                .filter(town => town.playerId === player.id)
                .map(town => (
                    <Circle key={town.id} center={[town.x, town.y]} color={colour} radius={town.size * townScale}>
                        <Tooltip>
                            <div className="d-flex flex-column">
                                {player.name.toLocaleLowerCase() === "vynd" && (
                                    <div className="lead">
                                        🎉<span className={classes.rainbow}>Developer</span>🎉
                                    </div>
                                )}
                                <div className="mx-auto">
                                    <img src={playerIcon} alt="Player" />
                                    <span className="mx-1">{player.name}</span>
                                    <img src={playerIcon} alt="Player" />
                                </div>
                                {alliance.id !== 0 && (
                                    <div className="mx-auto">
                                        <img src={allianceIcon} alt="Alliance" />
                                        <span className="mx-1">{alliance.name}</span>
                                        <img src={allianceIcon} alt="Alliance" />
                                    </div>
                                )}
                                <div className="d-flex flex-grow-1 border my-1" />
                                <div className="mx-auto">
                                    <img src={townIcon} alt="Town" />
                                    <span className="mx-1">{town.name}</span>
                                    <img src={townIcon} alt="Town" />
                                </div>
                                <div className="mx-auto">
                                    <img src={pointsIcon} alt="Points" />
                                    <span className="mx-1">{renderNumberAsString(town.points)}</span>
                                    <img src={pointsIcon} alt="Points" />
                                </div>
                            </div>
                        </Tooltip>
                    </Circle>
                ))}
        </div>
    )
}

export default LeafletPlayer
