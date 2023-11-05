import { getModelForClass, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { UserModel } from './user'

class Link {
  @prop({
    type: String,
    required: true,
    trim: true
  }) originLink!: string

  @prop({
    type: String,
    unique: true,
    trim: true,
    required: true
  }) shortLink!: string

  @prop({
    type: mongoose.Types.ObjectId,
    ref: UserModel,
    required: true
  }) uid!: mongoose.Types.ObjectId
}

export const modelLink = getModelForClass(Link)
