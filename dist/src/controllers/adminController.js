"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const bookService_1 = __importDefault(require("../services/bookService"));
const memberService_1 = __importDefault(require("../services/memberService"));
const schemaValidator_1 = require("../middlewares/schemaValidator");
exports.AdminRouter = (0, express_1.Router)();
exports.AdminRouter.post("/addbook", schemaValidator_1.bookSchemaValidator, async (req, res, next) => {
    try {
        await bookService_1.default.addNewBook(req);
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "book added successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AdminRouter.put("/updatebook/:book_id", schemaValidator_1.updatebookSchemaValidator, async (req, res, next) => {
    try {
        await bookService_1.default.updateBook(req);
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "book updated successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AdminRouter.get("/members", async (req, res, next) => {
    try {
        const members = await memberService_1.default.getAllmembers();
        res.status(200).json({
            status: true,
            message: "data fetched successfully",
            data: members,
        });
    }
    catch (error) {
        next(error);
    }
});
