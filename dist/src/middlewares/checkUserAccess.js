"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMemberAccess = exports.checkAdminAccess = void 0;
const errorClass_1 = require("../utils/errorClass");
const jwt_1 = require("../utils/jwt");
const checkAdminAccess = async (req, res, next) => {
    try {
        if (!req.cookies.access_token) {
            throw new errorClass_1.UNAUTHORIZED("please login to access");
        }
        const decoded = await (0, jwt_1.VerifyAccessToken)(req.cookies.access_token);
        if (decoded.role === "admin") {
            next();
        }
        else {
            throw new errorClass_1.FORBIDDEN("access denied");
        }
    }
    catch (error) {
        next(next(next(error)));
    }
};
exports.checkAdminAccess = checkAdminAccess;
const checkMemberAccess = async (req, res, next) => {
    try {
        if (!req.cookies.access_token) {
            throw new errorClass_1.UNAUTHORIZED("please login to access");
        }
        const decoded = await (0, jwt_1.VerifyAccessToken)(req.cookies.access_token);
        if (decoded.role === "member" || decoded.role === "admin") {
            next();
        }
        else {
            throw new errorClass_1.FORBIDDEN("access denied");
        }
    }
    catch (error) {
        next(next(next(error)));
    }
};
exports.checkMemberAccess = checkMemberAccess;
