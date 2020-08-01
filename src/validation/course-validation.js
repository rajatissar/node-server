import Joi from '@hapi/joi';

import { ValidationError } from '../shared/error';

const createCourseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
});

const updateCourseSchema = Joi.object({
  description: Joi.string()
});

export default {
  createCourse: (req, res, next) => {
    const { error } = createCourseSchema.validate(
      req.body,
      { abortEarly: false, allowUnknown: true, convert: true }
    );
    if (error) {
      next(new ValidationError(error.details));
    } else {
      next();
    }
  },

  updateCourse: (req, res, next) => {
    const { error } = updateCourseSchema.validate(
      req.body,
      { abortEarly: false, allowUnknown: false, convert: true }
    );
    if (error) {
      next(new ValidationError(error.details));
    } else {
      next();
    }
  }
};
