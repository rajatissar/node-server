import winston from 'winston';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

import { DIRECTORY } from '../helpers/constants';

const {
  WINSTON_LOGS,
  WINSTON_ERROR_LOGS,
  WINSTON_INFO_LOGS,
  WINSTON_HTTP_LOGS
} = DIRECTORY;

const datePattern = 'YYYY-MM-DD';
const transportsJSON = {
  error: new WinstonDailyRotateFile({
    filename: path.join(`${__dirname}/../../${WINSTON_LOGS}/${WINSTON_ERROR_LOGS}`, 'error'),
    level: 'error',
    datePattern
    // zippedArchive: true
    // maxSize: '20m',
    // maxFiles: '14d'
  }),
  info: new WinstonDailyRotateFile({
    filename: path.join(`${__dirname}/../../${WINSTON_LOGS}/${WINSTON_INFO_LOGS}`, 'info'),
    level: 'info',
    datePattern
    // zippedArchive: true
    // maxSize: '20m',
    // maxFiles: '14d'
  }),
  http: new WinstonDailyRotateFile({
    filename: path.join(`${__dirname}/../../${WINSTON_LOGS}/${WINSTON_HTTP_LOGS}`, 'http'),
    level: 'info',
    datePattern
    // zippedArchive: true
    // maxSize: '20m',
    // maxFiles: '14d'
  })
};

const LoggerJSON = {
  error: winston.createLogger({
    transports: [transportsJSON.error]
  }),
  info: winston.createLogger({
    transports: [transportsJSON.info]
  }),
  http: winston.createLogger({
    format: winston.format.json(),
    transports: [transportsJSON.http]
  })
};

if (process.env.NODE_ENV === 'development') {
  LoggerJSON.info.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
  LoggerJSON.error.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
  LoggerJSON.http.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

const Logger = {
  error: (msg, ...others) => {
    LoggerJSON.error.log('error', msg, others);
  },
  info: (msg, ...others) => {
    LoggerJSON.info.log('info', msg, others);
  },
  http: (msg, ...others) => {
    LoggerJSON.http.log('info', msg, others);
  }
};

// create a stream object with a 'write' function that will be used by `morgan`
Logger.http.stream = {
  // eslint-disable-next-line
  write: function (message, encoding) {
    Logger.http(message, encoding);
  }
};

export { Logger };
