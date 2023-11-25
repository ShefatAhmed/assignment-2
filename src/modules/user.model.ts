import { Schema, model } from 'mongoose'
import { TOrder, TUser, UserModel } from './user/user.interface'
import bcrypt from 'bcrypt'
import config from '../app/config'

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
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
  age: { type: Number, required: [true, 'age is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
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
  orders: [
    {
      productName: String,
      price: Number,
      quantity: Number,
    },
  ],
})

// mongoose middleware

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

userSchema.statics.updateUser = async function (
  userId: string,
  updatedUserData: TUser,
): Promise<TUser | null> {
  const updatedUser = await User.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  })
  if (!updatedUser) {
    throw new Error('User cannot updated!')
  }
  return updatedUser
}

userSchema.statics.deleteUser = async function (userId: string): Promise<void> {
  const result = await User.deleteOne({ userId })
  if (result.deletedCount === 0) {
    throw new Error('User not found')
  }
}

//orders schema
userSchema.statics.addOrder = async function (
  userId: string,
  orderData: TOrder,
) {
  const user = await this.findOne({ userId })

  if (!user) {
    throw new Error('User not found')
  }
  user.orders = user.orders || []

  user.orders.push(orderData)
  const updatedUser = await user.save()
  return updatedUser
}

userSchema.statics.getOrders = async function (
  userId: string,
): Promise<TOrder[]> {
  const user = await this.findOne({ userId })
  if (!user) {
    throw new Error('User not found')
  }
  return user.orders || []
}

userSchema.statics.getTotalPrice = async function (
  userId: string,
): Promise<{ totalPrice: number }> {
  const user = await this.findOne({ userId })
  if (!user) {
    throw { code: 404, description: 'User not found!' }
  }
  const totalPrice = (user.orders ?? []).reduce(
    (acc, order) => acc + order.price * order.quantity,
    0,
  )
  return { totalPrice }
}

export const User = model<TUser, UserModel>('User', userSchema)