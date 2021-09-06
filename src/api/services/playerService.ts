import playerRepository from "../../repositories/playerRepository"

class PlayerService {
    async playerList() {
        const players = await playerRepository.listPlayers()
        return players
    }
}

const playerService = new PlayerService()

export default playerService