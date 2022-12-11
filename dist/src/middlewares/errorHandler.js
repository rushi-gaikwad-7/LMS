"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorClass_1 = require("../utils/errorClass");
const errorHandler = (error, req, res, next) => {
    if (error instanceof errorClass_1.OperationalError) {
        return res.status(error.statusCode).json({
            status: "error",
            statusCode: error.statusCode,
            message: error.message,
            error_detail: error.discription,
        });
    }
    else {
        // log.error(error);
        return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "Something went wrong",
            error_detail: errorClass_1.ErrorMessage.IINTERNAL_SERVER_ERROR,
        });
    }
};
exports.errorHandler = errorHandler;
