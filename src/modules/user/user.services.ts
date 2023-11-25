import { TOrder, TUser } from './user.interface'
import { User } from '../user.model'

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(`${userData.userId}`)) {
    throw new Error('User already exists!')
  }
  const createdUser = await User.create(userData)
  const { password, ...data } = createdUser.toObject()
  return data
}

const getAllUserFromDB = async () => {
  const users = await User.find(
    {},
    {
      username: 1,
      'fullName.firstName': 1,
      'fullName.lastName': 1,
      age: 1,
      email: 1,
      'address.street': 1,
      'address.city': 1,
      'address.country': 1,
      _id: 0,
    },
  )

  const data = users.map((user) => ({
    username: user.username,
    fullName: {
      firstName: user.fullName.firstName,
      lastName: user.fullName.lastName,
    },
    age: user.age,
    email: user.email,
    address: {
      street: user.address.street,
      city: user.address.city,
      country: user.address.country,
    },
  }))

  return data
}

const getSingleUserFromDB = async (userId: string) => {
  const data = await User.findOne({ userId })
  if (!data) {
    throw new Error('User not found!')
  }
  return data
}

const updateUserInDB = async (
  userId: string,
  updatedUser: TUser,
): Promise<TUser | null> => {
  const data = await User.updateUser(userId, updatedUser)
  return data
}

const deleteUserFromDB = async (userId: string) => {
  await User.deleteUser(userId)
}

//addOrder
const addOrder = async (userId: string, orderData: any) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $push: { orders: orderData } },
      { new: true },
    )
    if (!updatedUser) {
      throw { code: 404, description: 'User not found' }
    }
    return updatedUser
  } catch (err) {
    throw { code: 404, description: 'Failed to create order' }
  }
}

const getOrdersFromDB = async (userId: string): Promise<TOrder[]> => {
  const orders = await User.getOrders(userId);
  return orders;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addOrder,
  getOrdersFromDB
}