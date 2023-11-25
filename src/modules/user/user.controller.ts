import { Request, Response } from 'express'
import { UserServices } from './user.services'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const zodparseData = userValidationSchema.parse(userData)
    const data = await UserServices.createUserIntoDB(zodparseData)
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: data,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Users fetched failed!',
      error: err,
    })
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Users fetched failed!',
      error: err,
    })
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Users fetched failed!',
      error: err,
    })
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'failed to update user!',
      error: err,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to delete user!',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}