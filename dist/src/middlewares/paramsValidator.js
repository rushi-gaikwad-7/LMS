"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid_id_Validator = void 0;
const joi_1 = __importDefault(require("joi"));
const errorClass_1 = require("../utils/errorClass");
const uuid_id_Validator = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            book_id: joi_1.default.string().length(36).uuid(),
        });
        const result = schema.validate(req.params);
        if (result.error) {
            throw new errorClass_1.BAD_REQUEST(result.error.message);
        }
        next();
    }
    catch (error) {
        next(next(error));
    }
};
exports.uuid_id_Validator = uuid_id_Validator;
