import BaseRouter from '../config/base-router'
import { AuthUserController } from '../controllers/auth'

export class AuthRoutes extends BaseRouter {
  constructor(
    private readonly controller: AuthUserController = new AuthUserController()
  ) {
    super()
  }

  public routes(): void {
    this.router.post('/login', async (req, res) => await this.controller.login(req, res))
    this.router.post('/register', async (req, res) => await this.controller.register(req, res))
    this.router.post('/logout', (req, res) => this.controller.logout(req, res))
  }
}
