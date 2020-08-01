import { Router } from 'express';

import { COURSE_ROUTES } from '../helpers/routes';
import routeMiddlewareConfig from '../routes-middlewares/course-route-middleware';
import courseValidation from '../validation/course-validation';
import courseController from '../controllers/course-controller';

const router = Router();
routeMiddlewareConfig(router);

// create Course
router.post(
  COURSE_ROUTES.CREATE,
  courseValidation.createCourse,
  courseController.createCourse
);

// update course
router.put(
  COURSE_ROUTES.PUT,
  courseValidation.updateCourse,
  courseController.updateCourse
);

// get all course
router.get(
  COURSE_ROUTES.GET_ALL,
  courseController.getAllCourses
);

export default router;
