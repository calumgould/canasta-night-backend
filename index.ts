const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 8000

const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.get('/', (request: any, response: any) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Players
app.get('/players', db.getPlayers)
app.get('/players/:id', db.getPlayerById)
app.post('/players', db.createPlayer)
app.put('/players/:id', db.updatePlayer)
app.delete('/players/:id', db.deletePlayer)

// Games
app.get('/games', db.getGames)
app.get('/games/:id', db.getGameById)
app.post('/games', db.createGame)
app.put('/games/:id', db.updateGame)
app.delete('/games/:id', db.deleteGame)

// Rounds
app.get('/rounds', db.getRounds)
app.post('/rounds/new', db.createRoundForGame)
app.get('/rounds/:id', db.getRoundById)
app.post('/rounds', db.createRound)
app.put('/rounds/:id', db.updateRound)
app.delete('/rounds/:id', db.deleteRound)

// Scores
app.get('/scores', db.getScores)
app.get('/scores/:id', db.getScoreById)
app.post('/scores', db.createScore)
app.put('/scores/:id', db.updateScore)
app.delete('/scores/:id', db.deleteScore)

// Combined
app.post('/games/new', db.createGameWithPlayers)
app.get('/games/players/:id', db.getPlayersFromGame)
app.get('/games/rounds/:id', db.getRoundsFromGame)
app.get('/games/scores/:id', db.getScoresForGame)
app.get('/games/scores/total/:id', db.getTotalScoreForPlayersInGame)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})