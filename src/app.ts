import express from 'express'
import './config/db'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { ConfigServer } from './config/config'
import { AuthRoutes } from './routes/auth'
import { LinkRoutes } from './routes/link'
import { CorsType } from './types/types'

class ServerInit extends ConfigServer {
  public app: express.Application = express()
  public port: number = this.getEnviromentNumber('PORT')
  private readonly corsOptions: CorsType = {
    origin: '*',
    optionsSuccessStatus: 200
  }

  constructor() {
    super()
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(cors(this.corsOptions))
    this.app.use(morgan('dev'))
    this.app.use('/api', this.routers())
    this.listen()
  }

  public routers(): express.Router[] {
    return [
      new AuthRoutes().router,
      new LinkRoutes().router
    ]
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`listening on ${this.port}`)
    })
  }
}

void new ServerInit()
