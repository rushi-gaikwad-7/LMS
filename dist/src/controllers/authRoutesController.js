"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const authServices_1 = __importDefault(require("../services/authServices"));
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post("/register", schemaValidator_1.memberSchemaValidator, async (req, res, next) => {
    try {
        await authServices_1.default.addNewMember(req.body);
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
        const token = await authServices_1.default.login(req.body);
        res
            .status(200)
            .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
        })
            .json({
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
