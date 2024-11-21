import { z } from 'zod';

const technicalValidationSchema = z.object({
  icon: z.string(),
  title: z.string(),
});

const createTechnicalSkillValidationSchema = z.object({
  body: z.object({
    expertise: z.array(technicalValidationSchema).optional(),
    comfortable: z.array(technicalValidationSchema).optional(),
    familiar: z.array(technicalValidationSchema).optional(),
    tools: z.array(technicalValidationSchema).optional(),
  }),
});

const updateTechnicalSkillValidationSchema = z.object({
  body: z.object({
    expertise: z.array(technicalValidationSchema.partial()).optional(),
    comfortable: z.array(technicalValidationSchema.partial()).optional(),
    familiar: z.array(technicalValidationSchema.partial()).optional(),
    tools: z.array(technicalValidationSchema.partial()).optional(),
  }),
});

export const TechnicalSkillsValidations = {
  createTechnicalSkillValidationSchema,
  updateTechnicalSkillValidationSchema,
};
