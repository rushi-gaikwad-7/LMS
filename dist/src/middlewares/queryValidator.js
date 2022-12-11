"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search_query_Validator = void 0;
const joi_1 = __importDefault(require("joi"));
const errorClass_1 = require("../utils/errorClass");
const Search_query_Validator = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            query: joi_1.default.string().max(25).min(3).required(),
        });
        const result = schema.validate(req.query);
        if (result.error) {
            throw new errorClass_1.BAD_REQUEST(result.error.message);
        }
        next();
    }
    catch (error) {
        next(next(error));
    }
};
exports.Search_query_Validator = Search_query_Validator;
