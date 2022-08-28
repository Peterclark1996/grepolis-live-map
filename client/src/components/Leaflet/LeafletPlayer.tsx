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

const LeafletPlayer = ({ player, alliance, towns, allianceColours }: { player: Player, alliance: Alliance, towns: Town[], allianceColours: AllianceColour[] }) => {

    const colour = allianceColours.find(c => c.id === alliance.id)?.colour || DEFAULT_ALLIANCE_COLOUR

    return (
        <div>
            {
                towns
                    .filter(town => town.playerId === player.id)
                    .map(town =>
                        <Circle center={[town.x, town.y]} color={colour} radius={town.size}>
                            <Tooltip>
                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <img src={townIcon} alt="Town" />
                                        <span className="ms-1">{town.name}</span>
                                    </div>
                                    <div>
                                        <img src={playerIcon} alt="Player" />
                                        <span className="ms-1">{player.name}</span>
                                    </div>
                                    <div>
                                        <img src={pointsIcon} alt="Points" />
                                        <span className="ms-1">{player.points}</span>
                                    </div>
                                    <div>
                                        <img src={allianceIcon} alt="Alliance" />
                                        <span className="ms-1">{alliance.name}</span>
                                    </div>
                                </div>
                            </Tooltip>
                        </Circle>
                    )
            }
        </div>
    )
}

export default LeafletPlayer