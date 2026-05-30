import {z} from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username is required'),

  password: z
    .string()
    .min(8, 'Minimum 8 characters'),
});

export type LoginFormData =
  z.infer<typeof loginSchema>;