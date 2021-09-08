import playerRepository from "../../repositories/playerRepository"

class PlayerService {
  async playerList() {
    const players = await playerRepository.listPlayers()
    return players
  }

  async createPlayer(playerName: string, createdAt: string) {
    const doesPlayerExist = await playerRepository.getPlayerDetails(playerName)

    let player

    if (doesPlayerExist.rowCount > 0) {
      throw new Error('Player already exists')
    } else {
      player = await playerRepository.createPlayer(playerName, createdAt)
    }

    return player
  }

  async getPlayersForGame(gameId: string) {
    const players = await playerRepository.getPlayersForGame(gameId)

    return players
  }
}

const playerService = new PlayerService()

export default playerService