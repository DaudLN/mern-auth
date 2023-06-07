import { z } from 'zod';

export const userCreateSchema = z.object({
  name: z.string({ required_error: 'Name can not be empty' }).nonempty(),
  email: z
    .string({ required_error: 'Email can not be empty' })
    .email({ message: 'Provide a valid email' })
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password can not be empty' })
    .min(8, { message: 'Pasword should contain atleast 8 characters' }),
  passwordConfirm: z.string({ required_error: 'Password should be confirmed' }),
});

export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});
