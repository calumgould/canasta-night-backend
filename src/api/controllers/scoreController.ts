import { Response, Request, NextFunction } from 'express'
import scoreService from '../services/scoreService'

export const index = async (
  req: Request, res: Response, next: NextFunction
) => {
  const { id } = req.body
  
  try {
    const scores = await scoreService.getScores(id)
    res.send(scores)
  } catch (error){
    next(error)
  }
}

export const totalScores = async (
  req: Request, res: Response, next: NextFunction
) => {
  const { id } = req.body
  
  try {
    const totalScores = await scoreService.getTotalScores(id)
    res.send(totalScores)
  } catch (error){
    next(error)
  }
}