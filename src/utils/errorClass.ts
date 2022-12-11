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
  public discription: string;
  public statusCode: StatusCode;
  constructor(
    name: string,
    statusCode: StatusCode,
    message: string,
    discription: string
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.discription = discription;
    Error.captureStackTrace(this);
  }
}

export class BAD_REQUEST extends OperationalError {
  constructor(discription = "") {
    super(
      "BAD_REQUEST",
      StatusCode.BAD_REQUEST,
      ErrorMessage.BAD_REQUEST,
      discription
    );
  }
}
export class UNAUTHORIZED extends OperationalError {
  constructor(discription = "") {
    super(
      "UNAUTHORIZED",
      StatusCode.UNAUTHORIZED,
      ErrorMessage.UNAUTHORIZED,
      discription
    );
  }
}
export class FORBIDDEN extends OperationalError {
  constructor(discription = "") {
    super(
      "FORBIDDEN",
      StatusCode.FORBIDDEN,
      ErrorMessage.FORBIDDEN,
      discription
    );
  }
}
export class NOT_FOUND extends OperationalError {
  constructor(discription = "") {
    super(
      "NOT_FOUND",
      StatusCode.NOT_FOUND,
      ErrorMessage.NOT_FOUND,
      discription
    );
  }
}
