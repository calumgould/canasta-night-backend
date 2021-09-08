import { Response, Request, NextFunction } from 'express'
import playerService from '../services/playerService'

export const index = async (
  req: Request, res: Response, next: NextFunction
) => {
  try {
    const players = await playerService.playerList()
    res.send(players)
  } catch (error){
    next(error)
  }
}

export const createPlayer = async (
  req: Request, res: Response, next: NextFunction
) => {

  const { name, createdAt } = req.body

  try {
    const player = await playerService.createPlayer(name, createdAt)
    res.send(player)
  } catch (error){
    next(error)
  }
}

export const getPlayersForGame = async (
  req: Request, res: Response, next: NextFunction
) => {

  const { id } = req.body

  try {
    const players = await playerService.getPlayersForGame(id)
    res.send(players)
  } catch (error){
    next(error)
  }
}