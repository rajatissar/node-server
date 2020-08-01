class InternalServerError extends Error {
  constructor(name, message, stack, statusCode) {
    super();
    this.name = name || 'Internal Server Error';
    this.message = message || 'Internal Server Error';
    this.stack = stack || 'no error stack';
    this.statusCode = statusCode || 500;
  }
}

class NotAllowedToAccessServerError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = 'Not Allowed To Access Server Error';
    this.message = message || 'Not Allowed To Access Server Error';
    this.statusCode = statusCode || 405;
  }
}

class RouteNotExistError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = 'Route Not Exist Error';
    this.message = message || 'Route Not Exist Error';
    this.statusCode = statusCode || 404;
  }
}

class AuthenticationError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = 'Authentication Error';
    this.message = message || 'Authentication Error';
    this.statusCode = statusCode || 401;
    this.success = false;
  }
}

class AuthorizationError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = 'Authorization Error';
    this.message = message || 'Authorization Error';
    this.statusCode = statusCode || 403;
    this.success = false;
  }
}
class EmptyFieldError extends Error {
  constructor(message) {
    super();
    this.name = 'Empty Field Error';
    this.message = message || 'Empty Field Error';
  }
}

class ValidationError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = 'Validation Error';
    this.message = message || 'Validation Error';
    this.statusCode = statusCode || 422;
  }
}

class AlreadyExistError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = 'Already Exist Error';
    this.message = message || 'Already Exist Error';
    this.statusCode = statusCode || 409;
  }
}

class NotExistError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = 'Not Exist Error';
    this.message = message || 'Not Exist Error';
    this.statusCode = statusCode || 422;
  }
}

export {
  InternalServerError,
  NotAllowedToAccessServerError,
  RouteNotExistError,
  AuthenticationError,
  AuthorizationError,
  EmptyFieldError,
  ValidationError,
  AlreadyExistError,
  NotExistError
};
