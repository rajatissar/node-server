import mongoose from 'mongoose';
import { isEmpty } from 'lodash';

import { Logger } from './winston';
import { ERROR_MESSAGES } from '../helpers/messages';

const MONGO_URL = `mongodb://${process.env.DB_USER ? `${process.env.DB_USER}:${process.env.DB_PASSWORD}` : ''}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const connectMongoDB = () => {
  mongoose.connect(
    MONGO_URL,
    { useNewUrlParser: true }
  );

  mongoose.connection.on('connected', () => {
    Logger.info(`Connected to MongoDB(${MONGO_URL}) Successfully on ${new Date()}`);
  });
  mongoose.connection.on('disconnecting', () => {
    Logger.info(`MongoDB(${MONGO_URL}) connection successfully disconnecting on ${new Date()}`);
  });
  mongoose.connection.on('reconnected', () => {
    Logger.info(`MongoDB(${MONGO_URL}) connection successfully reconnected on ${new Date()}`);
  });
  mongoose.connection.on('disconnected', (error) => {
    Logger.error(`MongoDB(${MONGO_URL}) connection disconnected on ${new Date()}`, error);
  });
  mongoose.connection.on('error', (error) => {
    Logger.error(`Error connecting to MongoDB(${MONGO_URL}) on ${new Date()}`, error);
  });
};

// --------------------------------------------------------------------------------------------
// mongodb queries starts
// --------------------------------------------------------------------------------------------

const createRecord = (
  model,
  records
) => new Promise((resolve, reject) => {
  if (isEmpty(records)) {
    reject(ERROR_MESSAGES.BODY_EMPTY);
  } else {
    model.create(records, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }
});


const findOneRecord = (
  model,
  findQuery
) => new Promise((resolve, reject) => {
  if (isEmpty(findQuery)) {
    reject(ERROR_MESSAGES.BODY_EMPTY);
  } else {
    model.findOne(findQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }
});

// eslint-disable-next-line
const findAllRecord = (
  model,
  {
    query = {},
    projection = {},
    options = {}
  } = {}
) => new Promise((resolve, reject) => {
  model.find(query, projection, options, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const updateOneRecord = (
  model,
  updateQuery = {}
) => new Promise((resolve, reject) => {
  const { filter = {}, updateData = {}, options = {} } = updateQuery;
  model.updateOne(filter, updateData, options, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

// --------------------------------------------------------------------------------------------
// mongodb queries ends
// --------------------------------------------------------------------------------------------

export {
  connectMongoDB,
  createRecord,
  findOneRecord,
  findAllRecord,
  updateOneRecord
};
