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

// Users
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// Games
app.get('/games', db.getGames)
app.get('/games/:id', db.getGameById)
app.post('/games', db.createGame)
app.put('/games/:id', db.updateGame)
app.delete('/games/:id', db.deleteGame)

// Rounds
app.get('/rounds', db.getRounds)
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
app.get('/games/users/:id', db.getUsersFromGame)
app.get('/games/rounds/:id', db.getRoundsFromGame)
app.get('/games/scores/:id', db.getScoresForGame)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})