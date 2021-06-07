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

// User
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// Game
app.get('/games', db.getGames)
app.get('/games/:id', db.getGameById)
app.post('/games', db.createGame)
app.put('/games/:id', db.updateGame)
app.delete('/games/:id', db.deleteGame)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})