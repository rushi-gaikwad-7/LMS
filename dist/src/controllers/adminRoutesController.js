"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const bookServices_1 = __importDefault(require("../services/bookServices"));
const memberServices_1 = __importDefault(require("../services/memberServices"));
const schemaValidator_1 = require("../middlewares/schemaValidator");
const paramsValidator_1 = require("../middlewares/paramsValidator");
exports.AdminRouter = (0, express_1.Router)();
exports.AdminRouter.post("/addnewbook", schemaValidator_1.bookSchemaValidator, async (req, res, next) => {
    try {
        await bookServices_1.default.addNewBook(req.body);
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
exports.AdminRouter.put("/updatebook/:book_id", paramsValidator_1.book_id_validator, schemaValidator_1.updatebookSchemaValidator, async (req, res, next) => {
    try {
        await bookServices_1.default.updateBook(req.params.book_id, req.body);
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
        const members = await memberServices_1.default.getAllmembers();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "data fetched successfully",
            data: members,
        });
    }
    catch (error) {
        next(error);
    }
});
