import express from "express"
import compression from "compression"
import lusca from "lusca"
import cors from "cors"

import { gameController, 
  healthController, 
  playerController,
  roundController 
} from './api/controllers'

const PORT = 4000

const app = express()

// CORS Values
function getCorsValues(httpMethods?: string) {
  const corsValues = {
    origin:         "*",
    credentials:    true,
    maxAge:         3600,
    allowedHeaders: "Origin, Content-Type, Accept, Authorization, Referer, api-key, x-application-version"
  }
  
  if (httpMethods) {
    const optionsValues = {
      methods:              httpMethods,
      optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    return { ...corsValues, ...optionsValues }
  }
  
  return corsValues
}

// Express configuration
app.set("port", PORT)
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(lusca.xframe("SAMEORIGIN"))

// Health
app.get('/', healthController.index)
app.get('/health', healthController.health)

// Player
app.options("/players", cors(getCorsValues("GET,POST")))
app.get('/players', cors(getCorsValues()), playerController.index)
app.post('/players', cors(getCorsValues()), playerController.createPlayer)

// Round
app.options("/rounds", cors(getCorsValues("GET,POST")))
app.get('/rounds', cors(getCorsValues()), roundController.index)
app.post('/rounds', cors(getCorsValues()), roundController.createRound)

// Game
app.options("/games", cors(getCorsValues("GET,POST")))
app.get('/games', cors(getCorsValues()), gameController.index)
app.post('/games', cors(getCorsValues()), gameController.createGame)
app.get('/games/:id', cors(getCorsValues()), gameController.getGameDetails)

export default app