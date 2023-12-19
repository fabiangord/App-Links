import { Request, Response } from 'express'
import { AuthUserService, UserService } from '../services/auth'
import { ReturnRefreshToken, UserType } from '../types/types'
import { validatedUser } from '../schemas/user'
import { TokenService } from '../services/token'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

export class AuthUserController {
  constructor(private readonly authService: AuthUserService = new AuthUserService(),
    private readonly userService: UserService = new UserService(),
    private readonly tokenService: TokenService = new TokenService()
  ) {

  }

  async refreshToken(req: Request, res: Response): Promise<any | Response<Error>> {
    try {
      if (!req.cookies.refreshToken) {
        return res.status(401).json({ message: 'No refreshToken, authorization denied' })
      }

      const { refreshToken } = req.cookies

      const payload: unknown = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as Secret)

      const accessToken = await this.tokenService.createRefreshToken({ id: (payload as ReturnRefreshToken).id })

      return res.json(accessToken)
    } catch (error) {
      return res.status(400).json(error)
    }
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

      // const token = await this.tokenService.createAccessToken({ id: userFound._id as string })

      const refreshToken = await this.tokenService.createRefreshToken({ id: userFound._id as string })

      res.cookie('refreshToken', refreshToken.token, {
        httpOnly: true,
        secure: !(process.env.MOOD === 'dev'),
        expires: new Date(Date.now() + refreshToken.expiresIn * 1000)
      })

      return res.json({ id: userFound._id })
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
