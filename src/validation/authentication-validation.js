import Joi from '@hapi/joi';

import { ValidationError } from '../shared/error';

const signupSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email().required(),
  username: Joi.string(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export default {
  signUp: (req, res, next) => {
    const { error } = signupSchema.validate(
      req.body,
      { abortEarly: false, allowUnknown: true, convert: true }
    );
    if (error) {
      next(new ValidationError(error.details));
    } else {
      next();
    }
  },

  login: (req, res, next) => {
    const { error } = loginSchema.validate(
      req.body,
      { abortEarly: false, allowUnknown: true, convert: true }
    );
    if (error) {
      next(new ValidationError(error.details));
    } else {
      next();
    }
  }
};
