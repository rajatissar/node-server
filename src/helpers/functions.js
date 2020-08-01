import { get } from 'lodash';
import jwt from 'jsonwebtoken';

import { ROLES } from './constants';
import { ERROR_MESSAGES } from './messages';
import { ADMIN_ROUTES, CLIENT_ROUTES } from './role-authorization';
import { AuthenticationError, AuthorizationError } from '../shared/error';

const isDev = () => process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';

const isProd = () => process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'PROD';

const print = (
  loggingKey,
  ...messages
  // eslint-disable-next-line no-console
) => isDev() && console.log(loggingKey, ...messages);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return next(new AuthenticationError(ERROR_MESSAGES.USER_NOT_LOGGED_IN, 401));
};

const isAuthorized = (req, res, next) => {
  const role = get(req, 'user.role', ROLES.CLIENT);
  const route = get(req, 'originalUrl', '/').substr(1);

  if (role === ROLES.ADMIN && ADMIN_ROUTES.indexOf(route) === -1) {
    return next(new AuthorizationError(ERROR_MESSAGES.USER_NOT_AUTHORIZED, 403));
  }
  if (CLIENT_ROUTES.indexOf(route) === -1) {
    return next(new AuthorizationError(ERROR_MESSAGES.USER_NOT_AUTHORIZED, 403));
  }
  return next();
};

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, 'config.secret', (err, decoded) => {
      if (err) {
        return next(new AuthenticationError(ERROR_MESSAGES.AUTH_TOKEN_NOT_VALID, 401));
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    next(new AuthenticationError(ERROR_MESSAGES.AUTH_TOKEN_NOT_SUPPLIED, 401));
  }
};

const validatePassword = (formPassword, dbPassword) => formPassword === dbPassword;

const binaryToBase64 = binaryData => new Promise((resolve, reject) => {
  if (!binaryData) {
    // eslint-disable-next-line
    reject({ 
      message: 'No binary data provided'
    });
  }
  resolve(Buffer.from(binaryData).toString('base64'));
});

export {
  print,
  isDev,
  isProd,
  isLoggedIn,
  isAuthorized,
  checkToken,
  validatePassword,
  binaryToBase64
};
