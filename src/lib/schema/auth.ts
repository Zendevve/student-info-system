import { z } from 'zod'

export const loginEmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const loginPhoneSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, 'Please enter a valid Philippine mobile number (09XXXXXXXXX)'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  useOTP: z.boolean().default(false),
})

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^09\d{9}$/, 'Please enter a valid Philippine mobile number (09XXXXXXXXX)'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type LoginEmailInput = z.infer<typeof loginEmailSchema>
export type LoginPhoneInput = z.infer<typeof loginPhoneSchema>
export type RegisterInput = z.infer<typeof registerSchema>
