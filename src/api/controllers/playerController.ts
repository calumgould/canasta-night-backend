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