/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/user.auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectControllers } from './projects.controller';
import { ProjectValidations } from './projects.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  multerUpload.fields([{ name: 'images' }]),
  (req: Request, res: Response, next: NextFunction) => {
    const files = req?.files as { [fieldname: string]: Express.Multer.File[] };
    req.body = {
      ...JSON.parse(req?.body?.data),
      image: files?.images?.map((file: any) => file?.path),
    };
    next();
  },
  validateRequest(ProjectValidations.createProjectValidationSchema),
  ProjectControllers.createProject,
);

router.get('/', ProjectControllers.getAllProjects);
router.get('/:id', ProjectControllers.getProjectById);

router.patch(
  '/:id',
  auth('admin'),
  multerUpload.fields([{ name: 'images' }]),
  (req: Request, res: Response, next: NextFunction) => {
    const files = req?.files as { [fieldname: string]: Express.Multer.File[] };
    const data = JSON.parse(req?.body?.data);
    req.body = {
      ...data,
      image: [
        ...data.image,
        ...(files?.images?.map((file: any) => file?.path) || []),
      ],
    };
    next();
  },
  validateRequest(ProjectValidations.updateProjectValidationSchema),
  ProjectControllers.updateProject,
);

router.delete('/:id', auth('admin'), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
