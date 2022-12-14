"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFound = void 0;
const errorClass_1 = require("../utils/errorClass");
const logger_1 = require("../utils/logger");
const pageNotFound = async (req, res) => {
    res.status(404).json({
        status: "error",
        statusCode: 404,
        message: errorClass_1.ErrorMessage.NOT_FOUND,
    });
    logger_1.logger.info({ res: res });
};
exports.pageNotFound = pageNotFound;
