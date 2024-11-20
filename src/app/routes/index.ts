import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blogs/blogs.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
