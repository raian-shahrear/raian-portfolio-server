import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blogs/blogs.route';
import { ProjectRoutes } from '../modules/projects/projects.route';
import { ExperienceRoutes } from '../modules/experiences/experiences.route';
import { SkillRoutes } from '../modules/interpersonalSkills/interpersonalSkills.route';
import { CertificatesRoutes } from '../modules/certificates/certificates.route';

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
  {
    path: '/skills',
    route: SkillRoutes,
  },
  {
    path: '/certificates',
    route: CertificatesRoutes,
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
