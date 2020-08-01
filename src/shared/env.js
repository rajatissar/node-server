import dotenv from 'dotenv';
import Joi from '@hapi/joi';

const envSchema = Joi.object({
  ENV: Joi.string().default('development'),
  NODE_ENV: Joi.string().default('development'),

  SERVER_PORT: Joi.number().default(1415),

  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(27017),
  DB_NAME: Joi.string().default('nodeServer'),
  DB_USER: Joi.string(),
  DB_PASSWORD: Joi.string(),

  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_TTL: Joi.number().default(20),
  REDIS_LOG_ERRORS: Joi.boolean().default(true),

  EXPRESS_SESSION_NAME: Joi.string().default('serverId'),
  EXPRESS_SESSION_SECRET_KEY: Joi.string().default('secretKey'),
  EXPRESS_SESSION_RESAVE: Joi.boolean().default(false),
  EXPRESS_SESSION_SAVE_UNINITIALIZED: Joi.boolean().default(true),

  EXPRESS_SESSION_COOKIE_SECURE: Joi.boolean().default(true),
  EXPRESS_SESSION_COOKIE_MAX_AGE: Joi.number().default(2592000000),

  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('24h'),

  SENDGRID_API_KEY: Joi.string().required()
});

// set env variables from .env file
dotenv.config({ debug: process.env === 'development' });
// validate env variables
const { error, value } = envSchema.validate(
  process.env,
  { abortEarly: false, allowUnknown: true, convert: true }
);
if (error) {
  throw new Error(error);
} else {
  process.env = JSON.parse(JSON.stringify(value));
}
