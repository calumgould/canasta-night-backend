import scoreRepository from "../../repositories/scoreRepository"

class ScoreService {
  async getScores(gameId: string) {
    const scores = await scoreRepository.getScores(gameId)
    return scores
  }

  async getTotalScores(gameId: string) {
    const totalScores = await scoreRepository.getTotalScores(gameId)
    return totalScores
  }
}

const scoreService = new ScoreService()

export default scoreService