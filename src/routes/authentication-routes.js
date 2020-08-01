import express from 'express';

import { AUTHENTICATION_ROUTES } from '../helpers/routes';
import authenticationValidation from '../validation/authentication-validation';
import authenticationMiddleware from '../middlewares/authentication-middleware';
import authenticationController from '../controllers/authentication-controller';

import '../shared/passport/local-strategy';

const router = express.Router();

// signUp user
router.post(
  AUTHENTICATION_ROUTES.SIGN_UP,
  authenticationValidation.signUp,
  authenticationMiddleware.signUp,
  authenticationController.signUp
);

// login user with passport
router.post(
  AUTHENTICATION_ROUTES.LOGIN,
  authenticationValidation.login,
  authenticationController.loginWithPassport
);

// logout user with passport
router.post(
  AUTHENTICATION_ROUTES.LOGOUT,
  authenticationController.logoutWithPassport
);

// check if user is logged in or not (with passport)
router.get(
  AUTHENTICATION_ROUTES.IS_LOGIN,
  authenticationController.isLogin
);

export default router;
