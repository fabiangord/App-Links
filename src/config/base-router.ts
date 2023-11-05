import { Router } from 'express'

abstract class BaseRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  // public addRoute(
  //   method: 'get' | 'post' | 'patch' | 'delete',
  //   path: string,
  //   handler: (req: Request, res: Response) => unknown
  // ): void {
  //   this.router[method](path, this.middleware, handler)
  // }

  public routes(): void {

  }
}

export default BaseRouter
