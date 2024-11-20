import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    phone: z.string(),
    address: z.string(),
    profile: z.string(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    profile: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required!' }),
    newPassword: z.string({ required_error: 'New password is required!' }),
  }),
});

const updateUserEmailValidationSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  updateUserEmailValidationSchema,
};
