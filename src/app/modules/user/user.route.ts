import express, { NextFunction, Request, Response } from 'express';
import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/user.auth';
import { UserValidations } from './user.validation';

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
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.loginValidationSchema),
  UserControllers.loginUser,
);

router.patch(
  '/users/:id',
  auth('admin'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    const data = JSON.parse(req?.body?.data);
    let imgLink = '';
    if (req?.file) {
      imgLink = req?.file?.path;
    } else {
      imgLink = data?.profile;
    }
    req.body = {
      ...data,
      profile: imgLink,
    };
    next();
  },
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.get('/users', auth('admin'), UserControllers.getAllUsers);
router.get('/users/:id', auth('admin'), UserControllers.getUserById);

router.patch(
  '/user-email',
  auth('admin'),
  validateRequest(UserValidations.updateUserEmailValidationSchema),
  UserControllers.updateUserEmail,
);

router.post(
  '/change-password',
  auth('admin'),
  validateRequest(UserValidations.changePasswordValidationSchema),
  UserControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(UserValidations.refreshTokenValidationSchema),
  UserControllers.refreshToken,
);

export const UserRoutes = router;
