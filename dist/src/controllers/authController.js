"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const authService_1 = __importDefault(require("../services/authService"));
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post("/register", schemaValidator_1.memberSchemaValidator, async (req, res, next) => {
    try {
        await authService_1.default.addNewMember(req);
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "member added successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthRouter.post("/login", schemaValidator_1.loginSchemaValidator, async (req, res, next) => {
    try {
        await authService_1.default.login(req, res);
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Logged in successfully 😊 👌",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
});
