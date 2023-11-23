import { User } from './user.interface'
import { UserModel } from '../user.model'

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user)
  return result
}
const getAllUserFromDB = async () => {
  const data = await UserModel.find()
  return data
}
const getSingleUserFromDB = async (userId: string) => {
  const data = await UserModel.findOne({ userId })
  return data
}
const updateSingleUserInDB = async (userId: string, updatedUser: User) => {
  const result = await UserModel.updateOne({ userId }, updatedUser)
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
}
