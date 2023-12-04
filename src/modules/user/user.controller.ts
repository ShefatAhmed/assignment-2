import { Request, Response } from 'express'
import { UserServices } from './user.services'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const zodparseData = userValidationSchema.parse(req.body)
    const data = await UserServices.createUserIntoDB(zodparseData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: data,
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User creation failed!',
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
    res.status(404).json({
      success: false,
      message: err.message || 'Users fetched failed!',
      error: err,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const data = await UserServices.getSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: data,
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const updatedUserData = req.body
  try {
    const updatedUser = await UserServices.updateUserInDB(
      userId,
      updatedUserData,
    )
    if (updatedUser === null) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      const serializedUser = {
        userId: updatedUser.userId,
        username: updatedUser.username,
        fullName: {
          firstName: updatedUser.fullName.firstName,
          lastName: updatedUser.fullName.lastName,
        },
        age: updatedUser.age,
        email: updatedUser.email,
        isActive: updatedUser.isActive === true,
        hobbies: updatedUser.hobbies,
        address: {
          street: updatedUser.address.street,
          city: updatedUser.address.city,
          country: updatedUser.address.country,
        },
      }
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: serializedUser,
      })
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    await UserServices.deleteUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

//orders
const addOrder = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { productName, price, quantity } = req.body

  try {
    const updatedUser = await UserServices.addOrder(userId, {
      productName,
      price,
      quantity,
    })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Failed to create order',
      error: err,
    })
  }
}

const getOrders = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const orders = await UserServices.getOrdersFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders },
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

const getTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const totalPriceData = await UserServices.getTotalPriceFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: totalPriceData,
    })
  } catch (err: any) {
    res.status(err.code).json({
      success: false,
      message: err.description,
      error: {
        code: err.code,
        description: err.description,
      },
    })
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
}
