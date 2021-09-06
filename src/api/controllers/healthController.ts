import { Response, Request } from "express"

export const index = (req: Request, res: Response) => {
  res.status(204).send()
}

export const health = async (req: Request, res: Response) => {
  res
    .status(200)
    .set("Content-Type", "application/health+json")
    .send({ "healthy": true })
}