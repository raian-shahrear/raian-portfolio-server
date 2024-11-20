import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    subtitle: z.string(),
    mainFeatures: z.string(),
    allFeatures: z.string(),
    liveLink: z.string(),
    githubClient: z.string(),
    githubServer: z.string(),
    technologies: z.string(),
    image: z.array(z.string()),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    mainFeatures: z.string().optional(),
    allFeatures: z.string().optional(),
    liveLink: z.string().optional(),
    githubClient: z.string().optional(),
    githubServer: z.string().optional(),
    technologies: z.string().optional(),
    image: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const ProjectValidations = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
