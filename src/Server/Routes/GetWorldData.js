import express from 'express'
const router = express.Router()
import { GetLiveWorldState } from "../Services/WorldDataService.js"
import { LogError } from "../Util/LogF.js"

router.get('/', function (req, res, next) {
    const world = req.query.world
    if (world == null || world === "") {
        res.status(400).send('Invalid world')
        return
    }

    GetLiveWorldState(world)
        .then(worldState => res.send({
            alliances: worldState.alliances,
            players: worldState.players,
            cities: worldState.cities
        }))
        .catch(error => {
            LogError(error)
            res.status(500).send("Internal Server Error: 500")
        })
});

export default router