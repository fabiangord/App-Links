import { Request, Response } from 'express'
import { AuthUserService, UserService } from '../services/auth'
import { UserType } from '../types/types'
import { validatedUser } from '../schemas/user'
import { TokenService } from '../services/token'
import bcrypt from 'bcrypt'

export class AuthUserController {
  constructor(private readonly authService: AuthUserService = new AuthUserService(),
    private readonly userService: UserService = new UserService(),
    private readonly tokenService: TokenService = new TokenService()
  ) {

  }

  async register(req: Request, res: Response): Promise<Response<UserType>> {
    try {
      const validateUser = validatedUser(req.body)

      const user = await this.authService.register(validateUser)

      return res.json({ id: user._id, email: user.email })
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async login(req: Request, res: Response): Promise<Response | string> {
    try {
      const validateUserSchema = validatedUser(req.body)

      const userFound = await this.userService.findUser(validateUserSchema.email)

      if (!userFound) return res.status(400).json({ message: 'user not found' })

      const isMatch = await bcrypt.compare(validateUserSchema.password, userFound.password)

      if (!isMatch) return res.status(400).json({ message: 'invalid credentials' })

      if (userFound._id === undefined) throw new Error('User don`t created')

      const token = await this.tokenService.createAccessToken({ id: userFound._id as string })

      const refreshToken = await this.tokenService.createRefreshToken({ id: userFound._id as string })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: !(process.env.MOOD === 'dev'),
        expires: new Date(Date.now() + refreshToken.expiresIn * 1000)
      })

      return res.json({ id: userFound._id, token })
    } catch (error) {
      return error instanceof Error ? res.json({ error: error.message }) : 'unexpected error'
    }
  }

  logout(_req: Request, res: Response): Response | string {
    try {
      res.cookie('refreshToken', ' ', {
        expires: new Date(0)
      })

      return res.sendStatus(200)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : 'unexpected error'
    }
  }
}
