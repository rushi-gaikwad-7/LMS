"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorClass_1 = require("../utils/errorClass");
const errorHandler = (error, req, res, next) => {
    if (error instanceof errorClass_1.OperationalError) {
        return res.status(error.statusCode || 500).json({
            status: "error",
            statusCode: error.statusCode || 500,
            message: error.message || "something went wrong",
        });
    }
};
exports.errorHandler = errorHandler;
