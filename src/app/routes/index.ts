import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
