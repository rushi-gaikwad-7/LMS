export enum StatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  IINTERNAL_SERVER_ERROR = 500,
}
export enum ErrorMessage {
  BAD_REQUEST = "Invalid syntax for this request was provided.",
  UNAUTHORIZED = "You are unauthorized to access the requested resource. Please log in.",
  FORBIDDEN = "Your account is not authorized to access the requested resource.",
  NOT_FOUND = "We could not find the resource you requested.",
  IINTERNAL_SERVER_ERROR = "Unexpected internal server error.",
}

export class OperationalError extends Error {
  public name: string;
  public statusCode: StatusCode;
  constructor(name: string, statusCode: StatusCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export class BAD_REQUEST extends OperationalError {
  constructor(message: string = ErrorMessage.BAD_REQUEST) {
    super("BAD_REQUEST", StatusCode.BAD_REQUEST, message);
  }
}
export class UNAUTHORIZED extends OperationalError {
  constructor(message: string = ErrorMessage.UNAUTHORIZED) {
    super("UNAUTHORIZED", StatusCode.UNAUTHORIZED, message);
  }
}
export class FORBIDDEN extends OperationalError {
  constructor(message: string = ErrorMessage.FORBIDDEN) {
    super("FORBIDDEN", StatusCode.FORBIDDEN, message);
  }
}
export class NOT_FOUND extends OperationalError {
  constructor(message: string = ErrorMessage.NOT_FOUND) {
    super("NOT_FOUND", StatusCode.NOT_FOUND, message);
  }
}

export class IINTERNAL_SERVER_ERROR extends OperationalError {
  constructor(message: string = ErrorMessage.IINTERNAL_SERVER_ERROR) {
    super("IINTERNAL_SERVER_ERROR", StatusCode.IINTERNAL_SERVER_ERROR, message);
  }
}
