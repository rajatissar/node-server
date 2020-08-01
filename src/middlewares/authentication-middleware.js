import { get } from 'lodash';

import userModel from '../models/user-model';
import { ERROR_MESSAGES } from '../helpers/messages';
import { InternalServerError, AlreadyExistError } from '../shared/error';
import { findOneRecord } from '../shared/mongodb';

export default {
  signUp: async (req, res, next) => {
    try {
      const bodyParams = get(req, 'body', {});
      const email = get(bodyParams, 'email', null);
      const findQuery = { email };
      const existedUser = await findOneRecord(userModel, findQuery);
      if (!existedUser) {
        next();
      } else {
        next(new AlreadyExistError(ERROR_MESSAGES.EMAIL_ALREADY_EXIST, 409));
      }
    } catch (error) {
      next(new InternalServerError(error.name, error.message, error.stack, 500));
    }
  }
};
