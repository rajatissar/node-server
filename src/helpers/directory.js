import path from 'path';
import fs from 'fs';

import { DIRECTORY } from './constants';

const {
  TEMPORARY,
  WINSTON_LOGS,
  WINSTON_ERROR_LOGS,
  WINSTON_INFO_LOGS,
  WINSTON_HTTP_LOGS,
} = DIRECTORY;
const rootDirectory = path.dirname(require.main.filename);

const createDirectory = () => {
  // Make Directory for saving files temporary before uploading to database
  const tempDirectory = `${rootDirectory}/${TEMPORARY}`;
  if (!fs.existsSync(tempDirectory)) {
    fs.mkdirSync(tempDirectory);
  }

  // Make Directory for winston
  const winstonLogsDirectory = `${rootDirectory}/${WINSTON_LOGS}`;
  if (!fs.existsSync(winstonLogsDirectory)) {
    fs.mkdirSync(winstonLogsDirectory);
  }
  const winstonErrorLogsDirectory = `${rootDirectory}/${WINSTON_LOGS}/${WINSTON_ERROR_LOGS}`;
  if (!fs.existsSync(winstonErrorLogsDirectory)) {
    fs.mkdirSync(winstonErrorLogsDirectory);
  }
  const winstonInfoLogsDirectory = `${rootDirectory}/${WINSTON_LOGS}/${WINSTON_INFO_LOGS}`;
  if (!fs.existsSync(winstonInfoLogsDirectory)) {
    fs.mkdirSync(winstonInfoLogsDirectory);
  }
  const winstonHTTPLogsDirectory = `${rootDirectory}/${WINSTON_LOGS}/${WINSTON_HTTP_LOGS}`;
  if (!fs.existsSync(winstonHTTPLogsDirectory)) {
    fs.mkdirSync(winstonHTTPLogsDirectory);
  }
};

export default createDirectory;
