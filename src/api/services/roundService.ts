import roundRepository from "../../repositories/roundRepository"

class RoundService {
  async getRounds(gameId: string) {
    const rounds = await roundRepository.getRounds(gameId)
    return rounds
  }
}

const roundService = new RoundService()

export default roundService