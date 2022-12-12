"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = require("express");
const paramsValidator_1 = require("../middlewares/paramsValidator");
const bookServices_1 = __importDefault(require("../services/bookServices"));
const jwt_1 = require("../utils/jwt");
exports.MemberRoutes = (0, express_1.Router)();
exports.MemberRoutes.post("/loanbook/:book_id", paramsValidator_1.book_id_validator, async (req, res, next) => {
    try {
        const decoded = await (0, jwt_1.VerifyAccessToken)(req.cookies.access_token);
        if (decoded) {
            const member_id = decoded.member_id;
            await bookServices_1.default.loanBook(req.params.book_id, member_id);
            res.status(201).json({
                status: "success",
                statusCode: 201,
                message: "book loaned successfully 😊 👌",
                data: [],
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.MemberRoutes.get("/books/:member_id", paramsValidator_1.member_id_validator, async (req, res, next) => {
    try {
        const books = await bookServices_1.default.memberBooks(req.params.member_id);
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "books fetched successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
