import { z } from 'zod';
export const signInFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpFormSchema = z.object({
  email: z.string().email('please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  displayName: z.string().min(2, 'Please enter a valid display name'),
  companyCode: z
    .string()
    .min(4, 'Company code must be 4 characters')
    .max(4, 'Company code must be 4 characters')
    .transform((val) => val.toUpperCase()),
});
