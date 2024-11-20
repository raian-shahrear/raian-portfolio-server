import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blogs/blogs.route';
import { ProjectRoutes } from '../modules/projects/projects.route';
import { ExperienceRoutes } from '../modules/experiences/experiences.route';

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
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/experiences',
    route: ExperienceRoutes,
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
