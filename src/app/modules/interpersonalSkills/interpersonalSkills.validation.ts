import { z } from 'zod';

const createInterpersonalSkillsValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    details: z.string(),
  }),
});

const updateInterpersonalSkillsValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    details: z.string().optional(),
  }),
});

export const InterpersonalSkillsValidations = {
  createInterpersonalSkillsValidationSchema,
  updateInterpersonalSkillsValidationSchema,
};
