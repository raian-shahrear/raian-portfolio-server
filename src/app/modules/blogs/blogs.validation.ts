import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
