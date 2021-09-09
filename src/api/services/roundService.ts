import roundRepository from "../../repositories/roundRepository"
import scoreRepository from "../../repositories/scoreRepository"

class RoundService {
  async getRounds(gameId: string) {
    const rounds = await roundRepository.getRounds(gameId)
    return rounds
  }

  async createRound(
    gameId: string, dealerId: string, roundNumber: number, scores: any[]
  ) {
    const round = await roundRepository.createRound(gameId, dealerId, roundNumber)

    console.log({ round })

    const roundId = (round.rows[0].id as string)

    await Promise.all(scores.map((entry) => {
      scoreRepository.createScore(
        gameId, entry.playerId, roundId, entry.score, JSON.stringify(entry.extraData)
      )
    }))
  }
}

const roundService = new RoundService()

export default roundService