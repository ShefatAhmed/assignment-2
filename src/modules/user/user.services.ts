import { TUser } from './user.interface'
import { User } from '../user.model'

const createUserIntoDB = async (userData: TUser) => {
  if(await User.isUserExists(userData.userId)){
    throw new Error('User already exists!');
  }
  const data = await User.create(userData);
  return data
}
const getAllUserFromDB = async () => {
  const data = await User.find()
  return data
}
const getSingleUserFromDB = async (userId: string) => {
  const data = await User.findOne({ userId })
  return data
}
const updateSingleUserInDB = async (userId: string, updatedUser: TUser) => {
  const data = await User.updateOne({ userId }, updatedUser)
  return data
}


export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
}