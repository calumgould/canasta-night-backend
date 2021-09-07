import db from '../db/client'
import { sql } from 'slonik'

class ScoreRepository {
  async getScores(gameId: string) {
    const scores = await db.connect(async (connection) => {
      const result = await connection.many(sql`
        SELECT scores.id, rounds.id as round_id, players.name, score, extra_data
        FROM scores
        INNER JOIN rounds ON scores.round_id = rounds.id
        INNER JOIN players ON scores.player_id = players.id
        WHERE scores.game_id = ${gameId};
      `)
      return result
    })
          
    return scores
  }

  async getTotalScores(gameId: string) {
    const scoreTotals = await db.connect(async (connection) => {
      const result = await connection.many(sql`
        SELECT player_id, players.name, SUM (score) as total_score
        FROM scores
        INNER JOIN players ON players.id = scores.player_id
        WHERE scores.game_id = ${gameId}
        GROUP BY scores.player_id, players.name
        ORDER BY total_score DESC;
      `)
      return result
    })
          
    return scoreTotals
  }
}

const scoreRepository = new ScoreRepository()

export default scoreRepository