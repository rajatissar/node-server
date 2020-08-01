const ERROR_MESSAGES = {
  NOT_ALLOWED_TO_ACCESS_SERVER: 'You are not allowed to access server',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  BODY_EMPTY: 'Body can not be empty',
  EMAIL_ID_NOT_EXIST: 'Email Id not exist',
  INCORRECT_PASSWORD: 'Incorrect password',
  EMAIL_ALREADY_EXIST: 'Email Id already exist',
  USER_NOT_LOGGED_IN: 'User not logged in',
  USER_NOT_AUTHORIZED: 'User is not authorized to access route',
  FILE_EXTENSION_NOT_SUPPORTED: 'File Extension not supported',
  ROUTE_NOT_EXIST: 'Route does not exist',
  AUTH_TOKEN_NOT_SUPPLIED: 'Auth token is not supplied',
  AUTH_TOKEN_NOT_VALID: 'Auth token is not valid'
};

const INFO_MESSAGES = {
  SIGN_UP_SUCCESS: 'SignUp Successfully',
  LOGOUT_SUCCESS: 'Logout Successfully',
  FILE_UPLOAD_SUCCESS: 'file uploaded Successfully',
  COURSE_CREATE_SUCCESS: 'course created successfully',
  COURSE_UPDATE_SUCCESS: 'course updated Successfully'
};

export {
  ERROR_MESSAGES,
  INFO_MESSAGES
};
