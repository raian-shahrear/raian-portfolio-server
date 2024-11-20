import express, { NextFunction, Request, Response } from 'express';
import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blogs.validation';
import { BlogControllers } from './blogs.controller';
import auth from '../../middlewares/user.auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = {
      ...JSON.parse(req?.body?.data),
      image: req?.file?.path,
    };
    next();
  },
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/', BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getBlogById);

router.patch(
  '/:id',
  auth('admin'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    const data = JSON.parse(req?.body?.data);
    let imgLink = '';
    if (req?.file) {
      imgLink = req?.file?.path;
    } else {
      imgLink = data?.image;
    }
    req.body = {
      ...data,
      image: imgLink,
    };
    next();
  },
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', auth('admin'), BlogControllers.deleteBlog);

export const BlogRoutes = router;
