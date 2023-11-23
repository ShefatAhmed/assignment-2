import { Schema, model } from 'mongoose'
import { User } from './user/user.interface'

const userSchema = new Schema<User>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: String },
  email: { type: String, required: true, unique: true },
  isActive: { type: String, required: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
})

export const UserModel = model<User>('User', userSchema)