import express from 'express';

import './shared/env';
import middlewaresConfig from './helpers/middlewares';
import apiRoutes from './routes';
import errorHandlerConfig from './helpers/error-handler';
import createDirectory from './helpers/directory';
import { print } from './helpers/functions';
import { connectMongoDB } from './shared/mongodb';
import { Logger } from './shared/winston';

const startServer = () => {
  const app = express();

  middlewaresConfig(app); // Implementing middlewares
  app.use('/', apiRoutes); // Implementing routes
  errorHandlerConfig(app); // Implementing error handling

  app.listen(process.env.SERVER_PORT, () => {
    createDirectory();
    connectMongoDB();
    Logger.info(
      `Server started at '${process.env.SERVER_PORT}' port and with '${process.env.NODE_ENV}' environment on ${new Date()}`
    );
    print(`Server is running at '${process.env.SERVER_PORT}' port and with '${process.env.NODE_ENV}' environment`);
  });
};

export { startServer };
