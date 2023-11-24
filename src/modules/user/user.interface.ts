export type User = {
  userId: string
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: string
  email: string
  isActive: 'true' | 'false'
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
}
