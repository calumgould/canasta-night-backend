import db from '../db/client'
import { sql } from 'slonik'

class RoundRepository {
  async getRounds(gameId: string) {
    const rounds = await db.connect(async (connection) => {
      const result = await connection.any(sql`
        SELECT players.name as dealer, rounds.id, round_number
        FROM rounds
        INNER JOIN players
        ON players.id = rounds.dealer_id
        WHERE rounds.game_id = ${gameId};
      `)
      return result
    })
          
    return rounds
  }
}

const roundRepository = new RoundRepository()

export default roundRepository