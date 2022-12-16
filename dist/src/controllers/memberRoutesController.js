"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = require("express");
const paramsValidator_1 = require("../middlewares/paramsValidator");
const bookServices_1 = __importDefault(require("../services/bookServices"));
const cryptoRandom_1 = require("../utils/cryptoRandom");
const jwt_1 = require("../utils/jwt");
const logger_1 = require("../utils/logger");
exports.MemberRoutes = (0, express_1.Router)();
exports.MemberRoutes.post("/loanbook/:book_id", paramsValidator_1.book_id_validator, async (req, res, next) => {
    const loggerForloanbook = logger_1.logger.child({ req_id: await (0, cryptoRandom_1.randomString)() }, true);
    loggerForloanbook.info({ req: req });
    try {
        const decoded = await (0, jwt_1.VerifyAccessToken)(req.cookies.access_token);
        if (decoded) {
            const member_id = decoded.member_id;
            const data = await bookServices_1.default.loanBook(req.params.book_id, member_id);
            res.status(201).json({
                status: "success",
                statusCode: 201,
                message: "book loaned successfully",
                data,
            });
            loggerForloanbook.info({ res: res });
        }
    }
    catch (error) {
        loggerForloanbook.error({ err: error });
        next(error);
    }
});
exports.MemberRoutes.get("/books", async (req, res, next) => {
    const loggergetMemberBooks = logger_1.logger.child({ req_id: await (0, cryptoRandom_1.randomString)() }, true);
    loggergetMemberBooks.info({ req: req });
    try {
        const decoded = await (0, jwt_1.VerifyAccessToken)(req.cookies.access_token);
        if (decoded) {
            const member_id = decoded.member_id;
            const books = await bookServices_1.default.memberBooks(member_id);
            res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "books fetched successfully",
                data: books,
            });
            loggergetMemberBooks.info({ res: res });
        }
    }
    catch (error) {
        loggergetMemberBooks.error({ err: error });
        next(error);
    }
});
