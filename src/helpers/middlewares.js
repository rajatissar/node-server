import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
// import cookieSession from 'cookie-session';
import session from 'express-session';

import { REDIS_DB, WHITE_LIST_DOMAINS } from './constants';
import { print, isDev } from './functions';
import { ERROR_MESSAGES } from './messages';
import { NotAllowedToAccessServerError } from '../shared/error';
import { Logger } from '../shared/winston';
import { redisClient, storeInSet } from '../shared/redis';

const RedisStore = require('connect-redis')(session);

export default (app) => {
  // 1. express.static: used for serving static files
  // if you do not want to serve static files other than white domains,
  // then move this line below cors module
  app.use(express.static('public'));

  // 2. cors: used for restricting other domains from accessing server
  app.use(
    cors({
      origin(origin, callback) {
        if ((isDev() && !origin) || WHITE_LIST_DOMAINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(
            new NotAllowedToAccessServerError(ERROR_MESSAGES.NOT_ALLOWED_TO_ACCESS_SERVER, 405)
          );
        }
      }
    })
  );

  // 3. view engine: used for template rendering
  app.set('view engine', 'jade');

  // 4. morgan: used for logging incoming requests with winston stream
  app.use(morgan('combined', { stream: Logger.http.stream }));

  // 5. bodyParser: used for parsing request body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // 6. cookieParser:
  // app.use(express.cookieParser());

  // 7. expressSession: used for storing session
  app.use(
    session({
      // use different name in place of connect.sid for security reason
      name: process.env.EXPRESS_SESSION_NAME,
      secret: process.env.EXPRESS_SESSION_SECRET_KEY,
      store: new RedisStore({
        client: redisClient,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        // socket,
        // url,
        ttl: process.env.REDIS_TTL
        // disableTTL,
        // db,
        // pass,
        // prefix,
        // unref,
        // serializer,
        // logErrors,
        // scanCount,
      }),
      resave: process.env.EXPRESS_SESSION_RESAVE,
      saveUninitialized: process.env.EXPRESS_SESSION_SAVE_UNINITIALIZED,
      cookie: {
        secure: process.env.EXPRESS_SESSION_COOKIE_SECURE,
        maxAge: process.env.EXPRESS_SESSION_COOKIE_MAX_AGE
      }
    })
  );

  // 8: passport: used for authentication purposes
  // it must be used after express session middleware
  // app.use(
  //   cookieSession({
  //     maxAge: 60 * 1000,
  //     keys: ['rajat']
  //   })
  // );
  app.use(passport.initialize());
  app.use(passport.session());

  // 9. captures request and response data
  app.use((req, res, next) => {
    // requestData
    const requestData = {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      headers: req.headers
    };
    print('requestData', JSON.stringify(requestData, null, 4));
    Logger.http('requestData', requestData);

    // responseData
    const responseData = {};
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];
    res.write = function unnamedFunction1(chunk) {
      chunks.push(Buffer.from(chunk));
      oldWrite.apply(res, arguments); // eslint-disable-line
    };
    res.end = function unnamedFunction2(chunk) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      responseData.body = Buffer.concat(chunks).toString('utf8');
      oldEnd.apply(res, arguments); // eslint-disable-line
    };
    res.on('finish', () => {
      responseData.statusCode = res.statusCode;
      responseData.statusMessage = res.statusMessage;
      responseData.contentLength = `${res.get('Content-Length') || 0} b sent`;
      print('responseData', responseData);
      Logger.http('responseData', responseData);
    });
    next();
  });

  // 10: captures ip address and store in redis
  app.use((req, res, next) => {
    let ip = req.connection.remoteAddress;
    if (ip.substr(0, 7) === '::ffff:') {
      ip = ip.substr(7);
    }
    storeInSet(REDIS_DB.IP_ADDRESSES, ip);
    next();
  });
};
