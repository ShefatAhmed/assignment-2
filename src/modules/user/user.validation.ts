import { z } from 'zod'
const fullNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
})

const userValidationSchema = z.object({
  userId: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: fullNameValidationSchema,
  age: z.string().min(1),
  email: z.string().email(),
  isActive: z.enum(['true', 'false']),
  hobbies: z
    .array(z.string())
    .refine((val) => val.length > 0, {
      message: 'At least one hobby is required',
    }),
  address: addressValidationSchema,
})

export default userValidationSchema
