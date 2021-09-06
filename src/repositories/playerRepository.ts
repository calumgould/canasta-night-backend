import db, { sql } from '../db/client'
import { DatabasePoolConnectionType } from 'slonik'

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
}

const playerRepository = new PlayerRepository()

export default playerRepository