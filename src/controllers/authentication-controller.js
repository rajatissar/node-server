import { get } from 'lodash';
import passport from 'passport';

import userModel from '../models/user-model';
import { isProd } from '../helpers/functions';
import { successHandler, errorHandler } from '../helpers/response-handler';
import { SIGN_UP_RESPONSES, LOGOUT_RESPONSES } from '../helpers/responses';
import { InternalServerError } from '../shared/error';
import { createRecord } from '../shared/mongodb';
import { sendMail } from '../shared/sendgrid';

export default {
  signUp: async (req, res, next) => {
    try {
      const bodyParams = get(req, 'body', {});
      const to = get(bodyParams, 'email', null);
      const password = get(bodyParams, 'password', null);

      const signUpMailData = {
        to,
        subject: 'SignUp mail',
        content: [
          { type: 'text/plain', value: `Username: ${to} Password: ${password}` },
          { type: 'text/html', value: `<h1>Username: ${to} <br> Password: ${password}</h1>` }
        ]
      };

      const signUpQuery = bodyParams;
      await createRecord(userModel, signUpQuery);

      if (isProd()) {
        await sendMail(signUpMailData);
      }

      return successHandler(
        res,
        SIGN_UP_RESPONSES.SUCCESS,
        SIGN_UP_RESPONSES.SUCCESS.statusCode
      );
    } catch (error) {
      return next(new InternalServerError(error.name, error.message, error.stack, 500));
    }
  },

  loginWithPassport: (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return next(new InternalServerError(error.name, error.message, error.stack, 500));
      }

      // user not found in db
      if (!user) {
        return errorHandler(res, info, 422);
      }

      // this function will call serializeUser and deserializeUser function of passport
      req.logIn(user, (errorLogin) => {
        if (errorLogin) {
          return next(
            new InternalServerError(errorLogin.name, errorLogin.message, errorLogin.stack, 500)
          );
        }
        return successHandler(res, user, 200);
      });
      return null;
    })(req, res, next);
  },

  logoutWithPassport: (req, res) => {
    req.logout();
    return successHandler(
      res,
      LOGOUT_RESPONSES.SUCCESS,
      LOGOUT_RESPONSES.SUCCESS.statusCode
    );
  },

  isLogin: (req, res) => {
    if (get(req, 'user', null)) {
      return successHandler(res, { success: true }, 200);
    }
    return errorHandler(res, { success: false }, 200);
  }
};
