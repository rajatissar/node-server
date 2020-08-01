import { Router } from 'express';

import authenticationRouter from './authentication-routes';
import fileUploadRouter from './file-upload-routes';
import courseRouter from './course-routes';
import {
  AUTHENTICATION_ROUTES,
  FILE_UPLOAD_ROUTES,
  COURSE_ROUTES
} from '../helpers/routes';

const router = Router();

// authentication routes
router.use(
  AUTHENTICATION_ROUTES.PRECEDED_BY,
  authenticationRouter
);

// file upload routes
router.use(
  FILE_UPLOAD_ROUTES.PRECEDED_BY,
  fileUploadRouter
);

// course routes
router.use(
  COURSE_ROUTES.PRECEDED_BY,
  courseRouter
);

export default router;
