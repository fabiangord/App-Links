import { Request, Response } from 'express'
import { LinkHelpersService, LinkService } from '../services/link'
import { validatedLink } from '../schemas/link'
import { LinkType } from '../types/types'

export class LinkController {
  constructor(
    private readonly linkService: LinkService = new LinkService(),
    private readonly helpers: LinkHelpersService = new LinkHelpersService()
  ) { }

  async getLinks(req: Request, res: Response): Promise<Response | string> {
    try {
      const links = await this.linkService.getLinks(req.id)
      return res.json(links)
    } catch (error) {
      console.log(error)
      return error instanceof Error ? res.json({ error: error.message }) : 'unexpected error'
    }
  }

  async createLink(req: Request, res: Response): Promise<Response | string> {
    try {
      const { originLink } = validatedLink(req.body)
      const linkSaved = await this.linkService.createLink(originLink as string, req.id)
      return res.json(linkSaved)
    } catch (error) {
      return error instanceof Error ? res.json({ error: error.message }) : 'unexpected error'
    }
  }

  async updateLink(req: Request, res: Response): Promise<Response<LinkType> | string> {
    try {
      const { id } = req.params

      const { originLink } = validatedLink(req.body)

      const link = await this.helpers.getLink(id)

      if (!link) return res.status(401).json({ error: 'link dont exist' })

      if (!originLink) return res.status(401).json({ error: 'not originLink' })

      const linkUpdated = await this.linkService.updateLink(originLink, link._id)

      return res.json(linkUpdated)
    } catch (error) {
      return error instanceof Error ? res.status(401).json({ error: 'id not valid', errorCode: error.message }) : 'unexpected error'
    }
  }

  async deleteLink(req: Request, res: Response): Promise<Response<LinkType> | string> {
    try {
      const { id } = req.params
      const userDeleted = await this.linkService.deleteLink(id)
      console.log(userDeleted)
      return res.json(userDeleted)
    } catch (error) {
      return error instanceof Error ? res.status(401).json({ error: 'id not valid', errorCode: error.message }) : 'unexpected error'
    }
  }

  async getLink(req: Request, res: Response): Promise<Response | string> {
    try {
      const { nanoid } = req.params
      const links = await this.linkService.getLink(nanoid)
      return res.json(links?.originLink)
    } catch (error) {
      return error instanceof Error ? res.json({ error: error.message }) : 'unexpected error'
    }
  }
}
