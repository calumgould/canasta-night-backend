import db from '../db/client'
import { sql } from 'slonik'

class GameRepository {
  async listGames() {
    const gamesList = await db.connect(async (connection) => {
      const games = await connection.any(sql`
              SELECT * FROM games;
            `)
      return games
    })
          
    return gamesList
  }

  async getGame(gameId: string) {
    const game  = await db.connect(async (connection) => {
      const result = await connection.maybeOne(sql`
        SELECT * FROM games WHERE id = ${gameId}
      `)

      return result
    })

    return game
  }

  async createGame(title: string, timestamp: string) {
    const game = await db.connect(async (connection) => {
      const result = await connection.query(sql`
        INSERT INTO games (title, timestamp)
        VALUES (${title}, ${timestamp})
        RETURNING id, title, timestamp;
      `)
      return result
    })
          
    return game
  }
}

const gameRepository = new GameRepository()

export default gameRepository