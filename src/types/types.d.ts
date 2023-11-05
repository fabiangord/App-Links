import mongoose from 'mongoose'

declare module 'express-serve-static-core' {
  export interface Request {
    id: string
  }
}

export type UserType = {
  _id?: unknown
  email: string
  password: string
}

export type PayloadType = {
  id: string
}

export type LoginType = {
  email: string
  password: string
}

export type ReturnCreatedAccessToken = {
  token: string
  expiresIn: number
}

export type ReturnRefreshToken = {
  id: string
  iat: string
  exp: string
}

export type LinkType = {
  originLink: string
  shortLink: string
  uid: unknown
  _id: mongoose.Types.ObjectId
}

export type CorsType = {
  origin: string
  optionsSuccessStatus: number
}
