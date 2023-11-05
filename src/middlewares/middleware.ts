import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { ReturnRefreshToken } from '../types/types'

export class AuthMiddleware {
  async routePermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.cookies.refreshToken) {
        res.status(401).json({ message: 'No refreshToken, authorization denied' })
        return
      }

      const { refreshToken } = req.cookies

      jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_KEY as Secret, async (err: unknown, _decoded: unknown) => {
        if (err) {
          console.log(err)
          res.status(401).json({ message: 'Invalid refresh Token' })
          return
        }

        const tokenBearer = req.headers.authorization

        const token = tokenBearer?.split(' ')[1]

        if (token === undefined) return res.status(401).json({ message: 'Invalid Token' })

        return jwt.verify(token, process.env.TOKEN_KEY as Secret, (err: unknown, user: unknown) => {
          if (err) {
            res.status(401).json({ message: 'Invalid access Token' })
            return
          }

          const { id } = user as ReturnRefreshToken

          req.id = id

          next()
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
