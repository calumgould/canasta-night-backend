import gameRepository from "../../repositories/gameRepository"
import playerRepository from "../../repositories/playerRepository"
import roundRepository from "../../repositories/roundRepository"
import scoreRepository from "../../repositories/scoreRepository"

class GameService {
  async gameList() {
    const games = await gameRepository.listGames()
    return games
  }

  async gameDetails(gameId: string) {
    const gameDetails = await Promise.all([
      playerRepository.getPlayersForGame(gameId),
      roundRepository.getRounds(gameId),
      scoreRepository.getScores(gameId),
      scoreRepository.getTotalScores(gameId)
    ])

    console.log({ gameDetails })

    return gameDetails
  }

  async createGame(title: string, timestamp: string, playerIds: string[]) {
    const game = await gameRepository.createGame(title, timestamp)

    const gameId = (game.rows[0].id as string)

    console.log({ playerIds, gameId })

    const players = await Promise.all(playerIds.map((id) => {
      playerRepository.addPlayerToGame(gameId, id)
    }))

    console.log({ game, players })

    return {
      ...game,
      ...players
    }
  }
}

const gameService = new GameService()

export default gameService