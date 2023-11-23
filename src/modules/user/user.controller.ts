import { Request, Response } from 'express'
import { UserServices } from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const data = await UserServices.createUserIntoDB(userData)
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: data,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  const data = await UserServices.getAllUserFromDB()
  try {
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: data,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const data = await UserServices.getSingleUserFromDB(userId)
  try {
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: data,
    })
  } catch (err) {
    console.log(err)
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { user: updatedUserData } = req.body
  const updatedUser = await UserServices.updateSingleUserInDB(
    userId,
    updatedUserData,
  )
  try {
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    })
  } catch (err) {
    console.log(err)
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser
}