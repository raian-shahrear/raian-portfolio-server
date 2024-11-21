import express from 'express';
import auth from '../../middlewares/user.auth';
import validateRequest from '../../middlewares/validateRequest';
import { CertificatesValidations } from './certificates.validation';
import { CertificatesControllers } from './certificates.controller';

const router = express.Router();

// interpersonal skill
router.post(
  '/',
  auth('admin'),
  validateRequest(
    CertificatesValidations.createCertificatesValidationSchema
  ),
  CertificatesControllers.createCertificate
);

router.get(
  '/',
  CertificatesControllers.getAllCertificates
);
router.get(
  '/:id',
  CertificatesControllers.getCertificateById
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(
    CertificatesValidations.updateCertificatesValidationSchema
  ),
  CertificatesControllers.updateCertificate
);

router.delete(
  '/:id',
  auth('admin'),
  CertificatesControllers.deleteCertificate
);

export const CertificatesRoutes = router;
