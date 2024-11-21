import { z } from 'zod';

const createCertificatesValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    link: z.string().optional(),
    organization: z.string().optional(),
    time: z.string().optional(),
  }),
});

const updateCertificatesValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    link: z.string().optional(),
    organization: z.string().optional(),
    time: z.string().optional(),
  }),
});

export const CertificatesValidations = {
  createCertificatesValidationSchema,
  updateCertificatesValidationSchema,
};
