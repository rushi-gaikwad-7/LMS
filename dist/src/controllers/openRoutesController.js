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
const cryptoRandom_1 = require("../utils/cryptoRandom");
const logger_1 = require("../utils/logger");
exports.OpenRoutes = (0, express_1.Router)();
exports.OpenRoutes.get("/books", async (req, res, next) => {
    const loggerForgetBooks = logger_1.logger.child({ req_id: await (0, cryptoRandom_1.randomString)() }, true);
    loggerForgetBooks.info({ req: req });
    try {
        const books = await bookServices_1.default.getAllbooks();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "books fetched successfully",
            data: books,
        });
        loggerForgetBooks.info({ res: res });
    }
    catch (error) {
        loggerForgetBooks.error({ err: error });
        next(error);
    }
});
exports.OpenRoutes.get("/books/search", queryValidator_1.Search_query_Validator, async (req, res, next) => {
    const loggerForSearchbooks = logger_1.logger.child({ req_id: await (0, cryptoRandom_1.randomString)() }, true);
    loggerForSearchbooks.info({ req: req });
    try {
        const query = req.query.query;
        const books = await bookServices_1.default.searchBook(query);
        res.status(200).send({
            status: "success",
            statusCode: 200,
            message: "books fetched successfully",
            data: books,
        });
        loggerForSearchbooks.info({ res: res });
    }
    catch (error) {
        loggerForSearchbooks.error({ err: error });
        next(error);
    }
});
exports.OpenRoutes.get("/books/:book_id", paramsValidator_1.book_id_validator, async (req, res, next) => {
    const loggerForbook_byid = logger_1.logger.child({ req_id: await (0, cryptoRandom_1.randomString)() }, true);
    loggerForbook_byid.info({ req: req });
    try {
        const books = await bookServices_1.default.getSingleBook(req.params.book_id);
        res.status(200).send({
            status: "success",
            statusCode: 200,
            message: "book fetched successfully",
            data: books,
        });
        loggerForbook_byid.info({ res: res });
    }
    catch (error) {
        loggerForbook_byid.error({ err: error });
        next(error);
    }
});
