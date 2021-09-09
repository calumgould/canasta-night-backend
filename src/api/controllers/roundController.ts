import { Response, Request, NextFunction } from 'express'
import roundService from '../services/roundService'

export const index = async (
  req: Request, res: Response, next: NextFunction
) => {
  const { id } = req.body
  
  try {
    const rounds = await roundService.getRounds(id)
    res.send(rounds)
  } catch (error){
    next(error)
  }
}

export const createRound = async (
  req: Request, res: Response, next: NextFunction
) => {
  const { gameId, dealerId, roundNumber, scores } = req.body
  
  try {
    const rounds = await roundService.createRound(gameId, dealerId, roundNumber, scores)
    res.send(rounds)
  } catch (error){
    next(error)
  }
}