"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentValidator = void 0;
const errorClass_1 = require("../utils/errorClass");
const contentValidator = async (req, res, next) => {
    try {
        if (req.is("application/json") === false &&
            req.headers["content-type"] !== undefined) {
            throw new errorClass_1.BAD_REQUEST("Invalid Content type");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.contentValidator = contentValidator;
