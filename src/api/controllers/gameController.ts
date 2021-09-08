import { Response, Request, NextFunction } from 'express'
import gameService from '../services/gameService'

export const index = async (
  req: Request, res: Response, next: NextFunction
) => {
  try {
    const games = await gameService.gameList()
    res.send(games)
  } catch (error){
    next(error)
  }
}

export const createGame = async (
  req: Request, res: Response, next: NextFunction
) => {
  const { title, timestamp, playerIds } = req.body

  try {
    const gameDetails = await gameService.createGame(title, timestamp, playerIds)
    res.send(gameDetails)
  } catch (error){
    next(error)
  }
}

export const getGameDetails = async (
  req: Request, res: Response, next: NextFunction
) => {
  const { id } = req.params

  try {
    const gameDetails = await gameService.gameDetails(id)
    res.send(gameDetails)
  } catch (error){
    next(error)
  }
}