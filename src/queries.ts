// import { QueryResult } from "pg"

// const Pool = require(`pg`).Pool

// const pool = new Pool({
//   user: `calum`,
//   host: `localhost`,
//   database: `canasta`,
//   password: `password`,
//   port: 5432
// })

// // PLAYERS

// /* 
//     [{
//         id: number
//         name: string
//         createdAt: number
//     }]
// */

// const getPlayers = (request, response) => {
//   pool.query('SELECT * FROM players', (
//     error: any, result: QueryResult
//   ) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const getPlayerById = (request, response) => {
//   const id = request.params.id
  
//   pool.query('SELECT * FROM players WHERE id = $1', [id], (
//     error: any, result: QueryResult
//   ) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const createPlayer = (request, response) => {
//   const { name, created_at } = request.body

//   pool.query('SELECT 1 FROM players WHERE name = $1', [name], (
//     error: any, result: QueryResult
//   ) => {
//     if (result.rowCount > 0) {
//       response.status(409).send('Player name already taken')
//     } else {
//       pool.query(`
//         INSERT INTO players (name, created_at) 
//         VALUES ($1, $2)`,
//       [name, created_at], (
//         error: any, result: QueryResult
//       ) => {
//         if (error) {
//           throw error
//         }
//         response.status(201).send(`Successfully created player: ${name}`)
//       })
//     }
//   })

// }

// const updatePlayer = (request, response) => {
//   const id = request.params.id
//   const { name } = request.body
  
//   pool.query(
//     'UPDATE players SET name = $1, WHERE id = $2',
//     [name, id],
//     (error, result) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`Player modified with ID: ${id}`)
//     }
//   )
// }

// const deletePlayer = (request, response) => {
//   const id = request.params.id
  
//   pool.query('DELETE FROM players WHERE id = $1', [id], (
//     error: any, result: QueryResult
//   ) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Player deleted with ID: ${id}`)
//   })
// }

// // GAMES

// const getGames = (request, response) => {
//   pool.query('SELECT * FROM games', (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const getGameById = (request, response) => {
//   const id = request.params.id
  
//   pool.query('SELECT * FROM games WHERE id = $1', [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const createGame = (request, response) => {
//   const { timestamp, title } = request.body
  
//   pool.query(`
//       INSERT INTO games (timestamp, title)
//       VALUES ($1, $2)
//       RETURNING id, timestamp, title;`, 
//   [timestamp, title], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).json(result.rows)
//   })
// }

// const updateGame = (request, response) => {
//   const id = request.params.id
//   const { timestamp, title } = request.body
  
//   pool.query(`
//       UPDATE games SET timestamp = $1, title = $2 
//       WHERE id = $3`,
//   [timestamp, title, id],
//   (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Game modified with ID: ${id}`)
//   }
//   )
// }

// const deleteGame = (request, response) => {
//   const id = request.params.id
  
//   pool.query('DELETE FROM games WHERE id = $1', [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Game deleted with ID: ${id}`)
//   })
// }

// // ROUNDS
// const getRounds = (request, response) => {
//   pool.query('SELECT * FROM rounds', (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const getRoundById = (request, response) => {
//   const id = request.params.id

//   pool.query('SELECT * FROM rounds WHERE id = $1', [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const createRound = (request, response) => {
//   const { game_id, dealer_id, round_number } = request.body

//   pool.query(`
//     INSERT INTO rounds (game_id, dealer_id, round_number)
//     VALUES ($1, $2, $3)`,
//   [game_id, dealer_id, round_number], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`Created round number: ${round_number}`)
//   })
// }

// const updateRound = (request, response) => {
//   const id = request.params.id
//   const { game_id, dealer_id, round_number } = request.body

//   pool.query(`
//     UPDATE rounds SET game_id = $1, dealer_id = $2, round_number = $3 
//     WHERE id = $4`,
//   [game_id, dealer_id, round_number, id],
//   (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Round modified with ID: ${id}`)
//   }
//   )
// }

// const deleteRound = (request, response) => {
//   const id = request.params.id

//   pool.query('DELETE FROM rounds WHERE id = $1', [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Round deleted with ID: ${id}`)
//   })
// }

// // SCORES
// const getScores = (request, response) => {
//   pool.query('SELECT * FROM scores', (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const getScoreById = (request, response) => {
//   const id = request.params.id

//   pool.query('SELECT * FROM scores WHERE id = $1', [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const createScore = (request, response) => {
//   const { player_id, round_id, game_id, score, extra_data } = request.body

//   pool.query(`
//     INSERT INTO scores (player_id, round_id, game_id, score, extra_data)
//     VALUES ($1, $2, $3, $4, $5)`,
//   [player_id, round_id, game_id, score, extra_data], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`Created score: ${score} with extra_data: ${extra_data}`)
//   })
// }

// const updateScore = (request, response) => {
//   const id = request.params.id
//   const { player_id, round_id, game_id, score, extra_data } = request.body

//   pool.query(`
//     UPDATE scores SET player_id = $1, round_id = $2, game_id = $3, score = $4, extra_data = $5 
//     WHERE id = $6`,
//   [player_id, round_id, game_id, score, extra_data, id],
//   (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Score modified with ID: ${id}`)
//   }
//   )
// }

// const deleteScore = (request, response) => {
//   const id = request.params.id

//   pool.query('DELETE FROM scores WHERE id = $1', [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Score deleted with ID: ${id}`)
//   })
// }

// // COMBINED
// const createGameWithPlayers = (request, response) => {
//   const { timestamp, title, player_ids } = request.body

//   pool.query(`
//     INSERT INTO games (timestamp, title)
//     VALUES ($1, $2)
//     RETURNING id, timestamp, title;`, 
//   [timestamp, title], (error, result) => {
//     if (error) {
//       throw error
//     }

//     const created_game_id = result.rows[0].id

//     player_ids.forEach((id) => {
//       pool.query(`
//       INSERT INTO game_players (game_id, player_id)
//       VALUES ($1, $2);`, 
//       [created_game_id, id], (error, result) => {
//         if (error) {
//           throw error
//         }
//       })
//     })

//     response.status(200).json(result.rows)
//   })
// }

// const createRoundForGame = (request, response) => {
//   const { game_id, dealer_id, round_number, scores } = request.body

//   pool.query(`
//     INSERT INTO rounds (game_id, dealer_id, round_number)
//     VALUES ($1, $2, $3)
//     RETURNING id;`,
//   [game_id, dealer_id, round_number], (error, result) => {
//     if (error) {
//       throw error
//     }

//     const round_id = result.rows[0].id

//     scores.forEach((score) => {
//       pool.query(`
//         INSERT INTO scores (player_id, round_id, game_id, score, extra_data)
//         VALUES ($1, $2, $3, $4, $5)`, 
//       [score.player_id, round_id, game_id, score.score, score.extra_data], (error, result) => {
//         if (error) {
//           throw error
//         }
//       })
//     })
//     response.status(201).send(`Added round ${round_number}`)
//   })
// }

// const getPlayersFromGame = (request, response) => {
//   const id = request.params.id

//   pool.query(`
//     SELECT name, players.id FROM players
//     INNER JOIN game_players
//     ON players.id = game_players.player_id
//     WHERE game_players.game_id = $1;`,
//   [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }
// // COMBINED
// const getRoundsFromGame = (request, response) => {
//   const id = request.params.id

//   pool.query(`
//     SELECT players.name as dealer, rounds.id, round_number
//     FROM rounds
//     INNER JOIN players
//     ON players.id = rounds.dealer_id
//     WHERE rounds.game_id = $1;`,
//   [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const getScoresForGame = (request, response) => {
//   const id = request.params.id

//   pool.query(`
//     SELECT scores.id, rounds.id as round_id, players.name, score, extra_data
//     FROM scores
//     INNER JOIN rounds ON scores.round_id = rounds.id
//     INNER JOIN players ON scores.player_id = players.id
//     WHERE scores.game_id = $1;`,
//   [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// const getTotalScoreForPlayersInGame = (request, response) => {
//   const id = request.params.id

//   pool.query(`
//     SELECT player_id, players.name, SUM (score) as total_score
//     FROM scores
//     INNER JOIN players ON players.id = scores.player_id
//     WHERE scores.game_id = $1
//     GROUP BY scores.player_id, players.name
//     ORDER BY total_score DESC;`,
//   [id], (error, result) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(result.rows)
//   })
// }

// module.exports = {
//   // Player
//   getPlayers,
//   getPlayerById,
//   createPlayer,
//   updatePlayer,
//   deletePlayer,
//   // Game
//   getGames,
//   getGameById,
//   createGame,
//   updateGame,
//   deleteGame,
//   // Rounds
//   getRounds,
//   getRoundById,
//   createRound,
//   updateRound,
//   deleteRound,
//   // Scores
//   getScores,
//   getScoreById,
//   createScore,
//   updateScore,
//   deleteScore,
//   // Combined
//   createGameWithPlayers,
//   createRoundForGame,
//   getPlayersFromGame,
//   getRoundsFromGame,
//   getScoresForGame,
//   getTotalScoreForPlayersInGame
// }