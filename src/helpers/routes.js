const AUTHENTICATION_ROUTES = {
  PRECEDED_BY: '/',
  SIGN_UP: '/signUp',
  LOGIN: '/login',
  LOGOUT: '/logout',
  IS_LOGIN: '/isLogin'
};

const FILE_UPLOAD_ROUTES = {
  PRECEDED_BY: '/file-upload',
  UPLOAD: '/'
};

const COURSE_ROUTES = {
  PRECEDED_BY: '/course',
  CREATE: '/',
  GET_ALL: '/',
  PUT: '/:courseId'
};

export {
  AUTHENTICATION_ROUTES,
  FILE_UPLOAD_ROUTES,
  COURSE_ROUTES
};
