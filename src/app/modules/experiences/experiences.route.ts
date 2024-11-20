import express from 'express';
import auth from '../../middlewares/user.auth';
import validateRequest from '../../middlewares/validateRequest';
import { ExperienceValidations } from './experiences.validation';
import { ExperienceControllers } from './experiences.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ExperienceValidations.createExperienceValidationSchema),
  ExperienceControllers.createExperience,
);

router.get('/', ExperienceControllers.getAllExperiences);
router.get('/:id', ExperienceControllers.getExperienceById);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(ExperienceValidations.updateExperienceValidationSchema),
  ExperienceControllers.updateExperience,
);

router.delete('/:id', auth('admin'), ExperienceControllers.deleteExperience);

export const ExperienceRoutes = router;
