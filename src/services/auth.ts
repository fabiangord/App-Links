import { ModelUser } from '../models/user'
import { LoginType, UserType } from '../types/types'
import bcrypt from 'bcrypt'

interface AuthUserServiceInterface {
  register: (object: LoginType) => Promise<UserType>
}

interface UserServiceInterface {
  findUser: (email: string) => Promise<UserType | null>
}

export class AuthUserService implements AuthUserServiceInterface {
  async register(object: LoginType): Promise<UserType> {
    const user = {
      email: object.email,
      password: await this.encryption(object.password)
    }
    return await ModelUser.create(user)
  }

  async encryption(clientPassword: string): Promise<unknown> {
    return await bcrypt.hash(clientPassword, 10)
  }
}

export class UserService implements UserServiceInterface {
  async findUser(email: string): Promise<UserType | null> {
    return await ModelUser.findOne({ email }).lean()
  }
}
