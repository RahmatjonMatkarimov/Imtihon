interface ErrorDetail {
  [key: string]: any;
}

class CustomErrorHandler extends Error {
  status: number;
  errors: ErrorDetail[];

  constructor(status: number, message: string, errors: ErrorDetail[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, CustomErrorHandler.prototype); // Error extend muammosi uchun
  }

  static BadRequest(message: string, errors: ErrorDetail[] = []): CustomErrorHandler {
    return new CustomErrorHandler(400, message, errors);
  }

  static UnAuthorized(message: string, errors: ErrorDetail[] = []): CustomErrorHandler {
    return new CustomErrorHandler(401, message, errors);
  }

  static NotFound(message: string, errors: ErrorDetail[] = []): CustomErrorHandler {
    return new CustomErrorHandler(404, message, errors);
  }

  static Forbidden(message: string, errors: ErrorDetail[] = []): CustomErrorHandler {
    return new CustomErrorHandler(403, message, errors);
  }
}

export default CustomErrorHandler;
