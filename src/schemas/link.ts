import { z } from 'zod'
import { LinkType } from '../types/types'

const linkSchema = z.object({
  originLink: z.string({
    required_error: 'type not supported'
  }).trim().url().nonempty()
})

export function validatedLink(object: Partial<LinkType>): Partial<LinkType> {
  return linkSchema.parse(object)
}
