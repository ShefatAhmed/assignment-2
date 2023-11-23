import { Request, Response } from 'express'
import { UserServices } from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const {user: userData} = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const UserController = {
  createUser,
}