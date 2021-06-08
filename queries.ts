import { QueryResult } from "pg"

const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'canasta',
  password: 'password',
  port: 5432,
})




// USERS

/* 
    [{
        id: number
        name: string
        createdAt: number
    }]
*/

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (
        error: any, results: QueryResult
    ) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (
        error: any, results: QueryResult
    ) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, createdAt } = request.body
    // or search for user here (throw error if not null)
    pool.query('INSERT INTO users (name, createdAt) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING', [name, createdAt], (
        error: any, results: QueryResult
    ) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Created user: ${name}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, WHERE id = $2',
      [name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (
        error: any, results: QueryResult
    ) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

/* 
    NOTES
    - look at uuids (column type)
    - google normalisation - shouldn't need to go past 3rd degree
    - how to add arrays / arrays of objects to games table (inner joins & more tables needed?)
    - nested object inside above (see games structure)

    - check if user already exists before adding
    - proper error handling -> response.error

    - game table
      - id, timestamp (TIMESTAMPZ), title,
    - users table
      - id, name, createdAt
    - game_users table (joining table)
      - id, game_id (FK), user_id (FK)
    - rounds table (joining table)
      - id, game_id (FK), dealer_id (FK), round_number
    - scores table (joining table)
      - id, user_id (FK), round_id, game_id, score, extraData (JSON)
*/

// GAMES
// 
/* 
    [{
        id: number
        timestamp: number
        title: string
        players: string[]
        rounds: [{
            round: number
            dealer: string
            scores: [{
                player: string
                score: number
                extraData: {
                    concealed: boolean
                    fourRedThrees: boolean
                }
            }]
        }]
    }]
*/

const getGames = (request, response) => {
    pool.query('SELECT * FROM games ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getGameById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM games WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createGame = (request, response) => {
    const { timestamp, title } = request.body
  
    pool.query('INSERT INTO games (timestamp, title) VALUES ($1, $2)', [timestamp, title], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Created game: ${title}`)
    })
}

const updateGame = (request, response) => {
    const id = parseInt(request.params.id)
    const { timestamp, title } = request.body
  
    pool.query(
      'UPDATE games SET timestamp = $1, title = $2 WHERE id = $3',
      [timestamp, title, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Game modified with ID: ${id}`)
      }
    )
}

const deleteGame = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM games WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Game deleted with ID: ${id}`)
    })
}

module.exports = {
    // User
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    // Game
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}