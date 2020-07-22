import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import AdminRouter from './modules/admin'
import AuthRouter from './modules/auth'
import QuestionRouter from './modules/question'
import UserRouter from './modules/user'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.config()
    this.routes()

    this.express.use('/v1', AuthRouter)
    this.express.use('/v1', UserRouter)
    this.express.use('/v1', AdminRouter)

    // this.express.use(AuthMiddleware)

    this.express.use('/v1', QuestionRouter)
  }

  private config(): void {
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  public routes(): void {
    this.express.get('/health', (_req: Request, _res: Response) => {
      return _res.json({ health: true })
    })
  }
}

export default new App().express
