import { Request, Response } from 'express'
import { UserServices } from './user.services'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodparseData = userValidationSchema.parse(userData);
    const data = await UserServices.createUserIntoDB(zodparseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User creation failed!',
      error: err,
    });
  }
};

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
  const { userId } = req.params;

  try {
    const data = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { user: updatedUserData } = req.body;
  try {
    const updatedUser = await UserServices.updateUserInDB(userId, updatedUserData);

    if (updatedUser === null) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
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
        isActive: updatedUser.isActive === 'true', // Convert to boolean
        hobbies: updatedUser.hobbies,
        address: {
          street: updatedUser.address.street,
          city: updatedUser.address.city,
          country: updatedUser.address.country,
        },
      };

      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: serializedUser,
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};




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
    res.status(400).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
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