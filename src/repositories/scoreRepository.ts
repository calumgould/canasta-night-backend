import db from '../db/client'
import { sql } from 'slonik'

class ScoreRepository {
  async getScores(gameId: string) {
    const scores = await db.connect(async (connection) => {
      const result = await connection.any(sql`
        SELECT scores.id, rounds.id as round_id, players.name, score, extra_data, player_id
        FROM scores
        INNER JOIN rounds ON scores.round_id = rounds.id
        INNER JOIN players ON scores.player_id = players.id
        WHERE scores.game_id = ${gameId};
      `)
      return result
    })
          
    return scores
  }

  async createScore(
    gameId: string, playerId: string, roundId: string, score: number, extraData: string
  ) {
    const createdScore = await db.connect(async (connection) => {
      const result = await connection.query(sql`
          INSERT INTO scores (player_id, round_id, game_id, score, extra_data)
          VALUES (${playerId}, ${roundId}, ${gameId}, ${score}, ${extraData});
        `)

      return result
    })

    return createdScore
  }

  async getTotalScores(gameId: string) {
    const scoreTotals = await db.connect(async (connection) => {
      const result = await connection.any(sql`
        SELECT player_id, players.name, CAST(SUM (score) as INT) as total_score
        FROM scores
        INNER JOIN players ON players.id = scores.player_id
        WHERE scores.game_id = ${gameId}
        GROUP BY scores.player_id, players.name;
      `)
      return result
    })
          
    return scoreTotals
  }
}

const scoreRepository = new ScoreRepository()

export default scoreRepository