import express from 'express';
import auth from '../../middlewares/user.auth';
import validateRequest from '../../middlewares/validateRequest';
import { InterpersonalSkillsValidations } from './interpersonalSkills.validation';
import { InterpersonalSkillControllers } from './interpersonalSkills.controller';
import { TechnicalSkillsValidations } from '../technicalSkills/technicalSkills.validation';
import { TechnicalSkillsControllers } from '../technicalSkills/technicalSkills.controller';

const router = express.Router();

// interpersonal skill
router.post(
  '/interpersonal',
  auth('admin'),
  validateRequest(
    InterpersonalSkillsValidations.createInterpersonalSkillsValidationSchema,
  ),
  InterpersonalSkillControllers.createInterpersonalSkill,
);

router.get(
  '/interpersonal',
  InterpersonalSkillControllers.getAllInterpersonalSkills,
);
router.get(
  '/interpersonal/:id',
  InterpersonalSkillControllers.getInterpersonalSkillById,
);

router.patch(
  '/interpersonal/:id',
  auth('admin'),
  validateRequest(
    InterpersonalSkillsValidations.updateInterpersonalSkillsValidationSchema,
  ),
  InterpersonalSkillControllers.updateInterpersonalSkill,
);

router.delete(
  '/interpersonal/:id',
  auth('admin'),
  InterpersonalSkillControllers.deleteInterpersonalSkill,
);
// ===========================================

// technical skill
router.post(
  '/technical',
  auth('admin'),
  validateRequest(
    TechnicalSkillsValidations.createTechnicalSkillValidationSchema,
  ),
  TechnicalSkillsControllers.createTechnicalSkill,
);

router.get('/technical', TechnicalSkillsControllers.getAllTechnicalSkills);
router.get('/technical/:id', TechnicalSkillsControllers.getTechnicalSkillById);

router.delete(
  '/technical/:id',
  auth('admin'),
  TechnicalSkillsControllers.deleteTechnicalSkill,
);

export const SkillRoutes = router;
