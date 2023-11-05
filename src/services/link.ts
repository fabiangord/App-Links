import mongoose from 'mongoose'
import { modelLink } from '../models/link'
import { LinkType } from '../types/types'
import crypto from 'node:crypto'

interface LinkServiceInterface {
  getLinks: (id: string) => Promise<LinkType[] | null>
  getLink: (nanoid: string) => Promise<LinkType | null>
  createLink: (originLink: string, id: string) => Promise<LinkType>
  updateLink: (originLink: string, id: mongoose.Types.ObjectId) => Promise<LinkType | null>
  deleteLink: (id: string) => Promise<LinkType | null>
}

interface LinkHelpersServiceInterface {
  getLink: (id: string) => Promise<LinkType | null>
  generateShortLink: () => string
}

export class LinkService implements LinkServiceInterface {
  constructor(
    private readonly helpers: LinkHelpersService = new LinkHelpersService()
  ) { }

  async getLinks(id: string): Promise<LinkType[] | null> {
    return await modelLink.find({ uid: id })
  }

  async getLink(nanoid: string): Promise<LinkType | null> {
    return await modelLink.findOne({ shortLink: nanoid })
  }

  async createLink(originLink: string, id: string): Promise<LinkType> {
    return await modelLink.create({
      originLink,
      shortLink: this.helpers.generateShortLink(),
      uid: id
    })
  }

  async updateLink(originLink: string, id: mongoose.Types.ObjectId): Promise<LinkType | null> {
    return await modelLink.findByIdAndUpdate(id, { originLink }, { new: true })
  }

  async deleteLink(id: string): Promise<LinkType | null> {
    return await modelLink.findByIdAndDelete(id)
  }
}

export class LinkHelpersService implements LinkHelpersServiceInterface {
  async getLink(_id: string): Promise<LinkType | null> {
    return await modelLink.findById({ _id })
  }

  generateShortLink(): string {
    const bytes = crypto.randomBytes(3)
    return bytes.toString('hex')
  }
}
