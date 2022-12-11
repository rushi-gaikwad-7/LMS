"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRoutes = void 0;
const express_1 = require("express");
const paramsValidator_1 = require("../middlewares/paramsValidator");
const queryValidator_1 = require("../middlewares/queryValidator");
const bookServices_1 = __importDefault(require("../services/bookServices"));
exports.OpenRoutes = (0, express_1.Router)();
exports.OpenRoutes.get("/books", async (req, res, next) => {
    try {
        const books = await bookServices_1.default.getAllbooks();
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
exports.OpenRoutes.get("/books/search", queryValidator_1.Search_query_Validator, async (req, res, next) => {
    try {
        const books = await bookServices_1.default.searchBook(req.params.query);
        res.status(200).send({
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
exports.OpenRoutes.get("/books/:book_id", paramsValidator_1.book_id_Validator, async (req, res, next) => {
    try {
        const books = await bookServices_1.default.getSingleBook(req.params.book_id);
        res.status(200).send({
            status: "success",
            statusCode: 200,
            message: "book fetched successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
