"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const authServices_1 = __importDefault(require("../services/authServices"));
const cryptoRandom_1 = require("../utils/cryptoRandom");
const logger_1 = require("../utils/logger");
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post("/register", schemaValidator_1.memberSchemaValidator, async (req, res, next) => {
    const gregisterLogs = logger_1.logger.child({ req_id: await (0, cryptoRandom_1.randomString)() }, true);
    gregisterLogs.info({ req: req });
    try {
        await authServices_1.default.addNewMember(req.body);
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "member added successfully",
            data: [],
        });
        gregisterLogs.info({ res: res });
    }
    catch (error) {
        gregisterLogs.error({ err: error });
        next(error);
    }
});
exports.AuthRouter.post("/login", schemaValidator_1.loginSchemaValidator, async (req, res, next) => {
    const loginLogs = logger_1.logger.child({ req_id: await (0, cryptoRandom_1.randomString)() }, true);
    loginLogs.info({ req: req });
    try {
        const token = await authServices_1.default.login(req.body);
        res
            .status(200)
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .json({
            status: "success",
            statusCode: 200,
            message: "Logged in successfully",
            data: [],
        });
        loginLogs.info({ res: res });
    }
    catch (error) {
        loginLogs.error({ err: error });
        next(error);
    }
});
