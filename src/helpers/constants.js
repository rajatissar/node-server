const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client'
};

const DIRECTORY = {
  TEMPORARY: 'temp',
  WINSTON_LOGS: 'winston-logs',
  WINSTON_ERROR_LOGS: 'error-logs',
  WINSTON_INFO_LOGS: 'info-logs',
  WINSTON_HTTP_LOGS: 'http-logs',
};

const REDIS_DB = {
  IP_ADDRESSES: 'ipAddresses'
};

const FILE_UPLOAD_EXTENSIONS_SUPPORTED = [
  'jpeg',
  'jpg'
];

const SENDGRID = {
  FROM: 'admin@nodeserver.com'
};

const WHITE_LIST_DOMAINS = [
  'http://localhost:3000',
  'http://localhost:4200'
];

export {
  ROLES,
  DIRECTORY,
  REDIS_DB,
  FILE_UPLOAD_EXTENSIONS_SUPPORTED,
  SENDGRID,
  WHITE_LIST_DOMAINS
};
