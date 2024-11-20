import express, { NextFunction, Request, Response } from 'express';
import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/user.auth';

const router = express.Router();

router.post(
  '/signup',
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = {
      ...JSON.parse(req?.body?.data),
      profile: req?.file?.path,
    };
    next();
  },
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);

router.patch(
  '/users/:id',
  auth('admin'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = {
      ...JSON.parse(req?.body?.data),
      profile: req?.file?.path,
    };
    next();
  },
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.get('/users', auth('admin'), UserControllers.getAllUsers);
router.get('/users/:id', auth('admin'), UserControllers.getUserById);

router.patch(
  '/user-email',
  auth('admin'),
  validateRequest(UserValidation.updateUserEmailValidationSchema),
  UserControllers.updateUserEmail,
);

router.post(
  '/change-password',
  auth('admin'),
  validateRequest(UserValidation.changePasswordValidationSchema),
  UserControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken,
);

export const UserRoutes = router;
