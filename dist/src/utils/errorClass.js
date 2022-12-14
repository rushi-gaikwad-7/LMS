"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IINTERNAL_SERVER_ERROR = exports.NOT_FOUND = exports.FORBIDDEN = exports.UNAUTHORIZED = exports.BAD_REQUEST = exports.OperationalError = exports.ErrorMessage = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["IINTERNAL_SERVER_ERROR"] = 500] = "IINTERNAL_SERVER_ERROR";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["BAD_REQUEST"] = "Invalid syntax for this request was provided.";
    ErrorMessage["UNAUTHORIZED"] = "You are unauthorized to access the requested resource. Please log in.";
    ErrorMessage["FORBIDDEN"] = "Your account is not authorized to access the requested resource.";
    ErrorMessage["NOT_FOUND"] = "We could not find the resource you requested.";
    ErrorMessage["IINTERNAL_SERVER_ERROR"] = "Unexpected internal server error.";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
class OperationalError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
exports.OperationalError = OperationalError;
class BAD_REQUEST extends OperationalError {
    constructor(message = ErrorMessage.BAD_REQUEST) {
        super("BAD_REQUEST", StatusCode.BAD_REQUEST, message);
    }
}
exports.BAD_REQUEST = BAD_REQUEST;
class UNAUTHORIZED extends OperationalError {
    constructor(message = ErrorMessage.UNAUTHORIZED) {
        super("UNAUTHORIZED", StatusCode.UNAUTHORIZED, message);
    }
}
exports.UNAUTHORIZED = UNAUTHORIZED;
class FORBIDDEN extends OperationalError {
    constructor(message = ErrorMessage.FORBIDDEN) {
        super("FORBIDDEN", StatusCode.FORBIDDEN, message);
    }
}
exports.FORBIDDEN = FORBIDDEN;
class NOT_FOUND extends OperationalError {
    constructor(message = ErrorMessage.NOT_FOUND) {
        super("NOT_FOUND", StatusCode.NOT_FOUND, message);
    }
}
exports.NOT_FOUND = NOT_FOUND;
class IINTERNAL_SERVER_ERROR extends OperationalError {
    constructor(message = ErrorMessage.IINTERNAL_SERVER_ERROR) {
        super("IINTERNAL_SERVER_ERROR", StatusCode.IINTERNAL_SERVER_ERROR, message);
    }
}
exports.IINTERNAL_SERVER_ERROR = IINTERNAL_SERVER_ERROR;
