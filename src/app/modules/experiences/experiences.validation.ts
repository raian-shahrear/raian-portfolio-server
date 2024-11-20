import { z } from 'zod';

// create experience
const companyProjectSchema = z.object({
  title: z.string(),
  link: z.string(),
  details: z.string().optional(),
  technology: z.string().optional(),
});
const createExperienceValidationSchema = z.object({
  body: z.object({
    companyName: z.string(),
    joiningDate: z.date(),
    endingDate: z.date().optional(),
    designation: z.string(),
    employeeType: z.enum(['Full-time', 'Part-time', 'Contact', 'Internship']),
    locationType: z.enum(['On-site', 'Hybrid', 'Remote']),
    responsibility: z.string(),
    companyProject: z.array(companyProjectSchema).optional(),
  }),
});

// update experience
const updateCompanyProjectSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
  details: z.string().optional(),
  technology: z.string().optional(),
});
const updateExperienceValidationSchema = z.object({
  body: z.object({
    companyName: z.string().optional(),
    joiningDate: z.date().optional(),
    endingDate: z.date().optional(),
    designation: z.string().optional(),
    employeeType: z
      .enum(['Full-time', 'Part-time', 'Contact', 'Internship'])
      .optional(),
    locationType: z.enum(['On-site', 'Hybrid', 'Remote']).optional(),
    responsibility: z.string().optional(),
    companyProject: z.array(updateCompanyProjectSchema).optional(),
  }),
});

export const ExperienceValidations = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
};
