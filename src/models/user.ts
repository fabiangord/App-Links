import { getModelForClass, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'

export class UserModel {
  @prop() userId!: mongoose.Types.ObjectId

  @prop({
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  }) email!: string

  @prop({
    type: String,
    trim: true,
    required: true,
    maxlength: 100
  }) password!: string
}

export const ModelUser = getModelForClass(UserModel)
