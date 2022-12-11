"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = require("express");
const bookService_1 = __importDefault(require("../services/bookService"));
exports.MemberRoutes = (0, express_1.Router)();
exports.MemberRoutes.post("/loanbook", async (req, res, next) => {
    try {
        await bookService_1.default.loanBook(req);
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "book loaned successfully 😊 👌",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.MemberRoutes.get("/books/:member_id", async (req, res, next) => {
    try {
        const books = await bookService_1.default.memberBooks(req);
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
