import BaseRouter from '../config/base-router'
import { LinkController } from '../controllers/link'
import { AuthMiddleware } from '../middlewares/middleware'

export class LinkRoutes extends BaseRouter {
  constructor(
    private readonly controller: LinkController = new LinkController(),
    private readonly middleware: AuthMiddleware = new AuthMiddleware()
  ) {
    super()
  }

  public routes(): void {
    this.router.get('/links', async (req, res, next) => await this.middleware.routePermission(req, res, next), async (req, res) => await this.controller.getLinks(req, res))

    this.router.post('/links', async (req, res, next) => await this.middleware.routePermission(req, res, next), async (req, res) => await this.controller.createLink(req, res))

    this.router.patch('/links/:id', async (req, res, next) => await this.middleware.routePermission(req, res, next), async (req, res) => await this.controller.updateLink(req, res))

    this.router.delete('/links/:id', async (req, res, next) => await this.middleware.routePermission(req, res, next), async (req, res) => await this.controller.deleteLink(req, res))

    this.router.get('/link/:nanoid', async (req, res) => await this.controller.getLink(req, res))
  }
}
