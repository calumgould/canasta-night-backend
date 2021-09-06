import express from "express"
import compression from "compression"
import lusca from "lusca"

import { healthController, playerController } from './api/controllers'

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
app.get('/players', playerController.index)

export default app