import { PayloadType, ReturnCreatedAccessToken } from '../types/types'
import jwt, { Secret } from 'jsonwebtoken'

interface TokenServiceInterface {
  createAccessToken: (payload: PayloadType) => Promise<Partial<ReturnCreatedAccessToken>>
  createRefreshToken: (payload: PayloadType) => Promise<ReturnCreatedAccessToken>
}

export class TokenService implements TokenServiceInterface {
  async createAccessToken(payload: PayloadType): Promise<ReturnCreatedAccessToken> {
    return await new Promise((resolve, reject) => {
      const expiresIn = 60 * 15
      jwt.sign(
        payload,
        process.env.TOKEN_KEY as Secret,
        {
          expiresIn
        },
        (err, token) => {
          token !== undefined
            ? resolve({
              token,
              expiresIn
            })
            : reject(err)
        }
      )
    })
  }

  async createRefreshToken(payload: PayloadType): Promise<ReturnCreatedAccessToken> {
    return await new Promise((resolve, reject) => {
      const expiresIn = 60 * 60 * 24 * 30
      jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_KEY as Secret,
        {
          expiresIn
        },
        (err, token) => {
          token !== undefined
            ? resolve({
              token, expiresIn
            })
            : reject(err)
        }
      )
    })
  }
}
