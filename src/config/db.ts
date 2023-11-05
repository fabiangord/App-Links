import mongoose from 'mongoose'
import { ConfigServer } from './config'

class Database extends ConfigServer {
  async database(): Promise<void> {
    try {
      await mongoose.connect(this.getEnvironment('DATABASE_URL')!)
      console.log('Database connection established')
    } catch (error) {
      console.log('database not working')
      error instanceof Error ? console.log(error.message) : console.error(error)
    }
  }
}

void new Database().database()
