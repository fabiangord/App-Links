import { z } from 'zod'
import { LoginType } from '../types/types'

const userSchema = z.object({
  email: z.string({
    required_error: 'email required'
  }).trim().email(),
  password: z.string({
    required_error: 'password required'
  }).trim()
})

export function validatedUser(object: LoginType): LoginType {
  return userSchema.parse(object)
}
