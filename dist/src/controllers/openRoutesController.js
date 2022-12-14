"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRoutes = void 0;
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const paramsValidator_1 = require("../middlewares/paramsValidator");
const queryValidator_1 = require("../middlewares/queryValidator");
const bookServices_1 = __importDefault(require("../services/bookServices"));
const logger_1 = require("../utils/logger");
exports.OpenRoutes = (0, express_1.Router)();
const reqId = crypto_1.default.randomBytes(3).toString("hex");
exports.OpenRoutes.get("/books", async (req, res, next) => {
    const loggerForSearchbooks = logger_1.logger.child({ reqId }, true);
    loggerForSearchbooks.info({ req: req }, reqId);
    try {
        const books = await bookServices_1.default.getAllbooks(loggerForSearchbooks);
        loggerForSearchbooks.info({ req: req }, "books fetched successfully", reqId);
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
        const loggerForSearchbooks = logger_1.logger.child({ reqId }, true);
        const query = req.query.query;
        const books = await bookServices_1.default.searchBook(query, loggerForSearchbooks);
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
exports.OpenRoutes.get("/books/:book_id", paramsValidator_1.book_id_validator, async (req, res, next) => {
    const loggerForSearchbooks = logger_1.logger.child({ reqId }, true);
    loggerForSearchbooks.info({ req: req }, reqId);
    try {
        const books = await bookServices_1.default.getSingleBook(req.params.book_id, loggerForSearchbooks);
        res.status(200).send({
            status: "success",
            statusCode: 200,
            message: "book fetched successfully",
            data: books,
        });
        loggerForSearchbooks.info({ res: res }, reqId);
    }
    catch (error) {
        next(error);
    }
});
