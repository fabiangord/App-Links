import { LoginType } from '@/types/types'
import z from 'zod'

const loginSchema = z.object({
    email: z.string().email({
        message: 'e-mail must be required'
    }).min(6, {
        message: 'e-mail must have less than 6 characters'
    }),
    password: z.string().min(6, {
        message: 'password must have less than 6 characters'
    })
})

export function validationLogin(data: LoginType): LoginType {
    return loginSchema.parse(data)
}