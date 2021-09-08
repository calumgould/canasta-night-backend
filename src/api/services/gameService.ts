import { QueryResult } from "pg"
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
    const game = await gameRepository.getGame(gameId)
    const playersResult = await playerRepository.getPlayersForGame(gameId)
    const scoresResult = await scoreRepository.getScores(gameId)
    const roundsResult = await roundRepository.getRounds(gameId)
    const totalScoresResult = await scoreRepository.getTotalScores(gameId)

    const mappedRounds = roundsResult.map((r: any) => {
      const filteredScores = scoresResult.filter((score: any) => score.round_id === r.id)

      return {
        id:           r.id,
        dealer:       r.dealer,
        round_number: r.round_number,
        scores:       filteredScores
      }
    })

    const gameDetails = {
      ...game,
      players: playersResult.rows.map((p) => p),
      rounds: mappedRounds,
      totalScores: totalScoresResult
    }

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