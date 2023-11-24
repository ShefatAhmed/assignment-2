import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoute } from './modules/user/user.route'
// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/', UserRoute)

const getAController = (req: Request, res: Response) => {
  const a = 0
  res.send(a)
}

app.get('/', getAController)

export default app
