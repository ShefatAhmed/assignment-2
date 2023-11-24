import { Schema, model } from 'mongoose'
import { User } from './user/user.interface'

const userSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'userId is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    trim: true,
    unique: true,
  },
  password: { type: String, required: [true, 'password is required'] },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  age: { type: String, required: [true, 'age is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  isActive: {
    type: String,
    enum: ['true', 'false'],
    default: 'true',
    required: [true, 'isActive is required'],
  },
  hobbies: {
    type: [String],
    required: [true, 'hobbies are required'],
  },
  address: {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
})

export const UserModel = model<User>('User', userSchema)
