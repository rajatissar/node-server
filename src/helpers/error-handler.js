import { set, unset } from 'lodash';

import {
  errorHandler
  //  renderHandler
} from './response-handler';
import { ERROR_MESSAGES } from './messages';
import { print, isProd } from './functions';
import { RouteNotExistError } from '../shared/error';

export default (app) => {
  // route does not exist
  app.use((req, res) => {
    const { ROUTE_NOT_EXIST } = ERROR_MESSAGES;
    const error = new RouteNotExistError(ROUTE_NOT_EXIST, 404);
    errorHandler(res, error, 404);
    // renderHandler(res, 'page-not-found', 404);
  });

  // error handler
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    print('error handler', JSON.stringify(err));
    if (isProd()) {
      set(err, 'name', 'Internal Server Error');
      unset(err, 'message');
    }
    errorHandler(res, err, err.statusCode);
  });
};
