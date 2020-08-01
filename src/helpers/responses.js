import { INFO_MESSAGES } from './messages';

const SIGN_UP_RESPONSES = {
  SUCCESS: {
    success: true,
    message: INFO_MESSAGES.SIGN_UP_SUCCESS,
    statusCode: 200
  }
};

const LOGOUT_RESPONSES = {
  SUCCESS: {
    success: true,
    message: INFO_MESSAGES.LOGOUT_SUCCESS,
    statusCode: 200
  }
};

const FILE_UPLOAD_RESPONSES = {
  SUCCESS: {
    success: true,
    message: INFO_MESSAGES.FILE_UPLOAD_SUCCESS,
    statusCode: 200
  }
};

const COURSE_CREATE_RESPONSES = {
  SUCCESS: {
    success: true,
    message: INFO_MESSAGES.COURSE_CREATE_SUCCESS,
    statusCode: 200
  }
};

const COURSE_UPDATE_RESPONSES = {
  SUCCESS: {
    success: true,
    message: INFO_MESSAGES.COURSE_UPDATE_SUCCESS,
    statusCode: 200
  },
};

export {
  SIGN_UP_RESPONSES,
  LOGOUT_RESPONSES,
  FILE_UPLOAD_RESPONSES,
  COURSE_CREATE_RESPONSES,
  COURSE_UPDATE_RESPONSES
};
