import db from '../db/client'
import { sql } from 'slonik'

class PlayerRepository {
  async listPlayers() {
    const playerList = await db.connect(async (connection) => {
      const players = await connection.any(sql`
              SELECT * FROM players;
            `)
      return players
    })
          
    return playerList
  }

  async getPlayerDetails(playerName: string) {
    const player = await db.connect(async (connection) => {
      const result = 
        await connection.query(sql`
            SELECT 1 FROM players WHERE name = ${playerName}
        `)
      return result
    })

    return player
  }

  async createPlayer(playerName: string, createdAt: string) {
    const newPlayer = await db.connect(async (connection) => {
      const result = 
        await connection.query(sql`
            INSERT INTO players (name, created_at)
            VALUES (${playerName}, ${createdAt})
        `)
      return result
    })

    return newPlayer
  }

  async addPlayerToGame(gameId: string, playerId: string) {
    const player = await db.connect(async (connection) => {
      const result = 
        await connection.query(sql`
          INSERT INTO game_players (game_id, player_id)
          VALUES (${gameId}, ${playerId});
        `)
      return result
    })

    return player
  }

  async getPlayersForGame(gameId: string) {
    const players = await db.connect(async (connection) => {
      const result = 
        await connection.query(sql`
          SELECT name, players.id FROM players
          INNER JOIN game_players
          ON players.id = game_players.player_id
          WHERE game_players.game_id = ${gameId};
        `)
      return result
    })

    return players
  }
}

const playerRepository = new PlayerRepository()

export default playerRepository