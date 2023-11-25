import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoute } from './modules/user/user.route'
// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/users', UserRoute)

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to assignment-2 server!',
  })
}

app.get('/', getAController)

export default app
