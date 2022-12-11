"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebookSchemaValidator = exports.bookSchemaValidator = exports.loginSchemaValidator = exports.memberSchemaValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const errorClass_1 = require("../utils/errorClass");
const memberSchemaValidator = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            name: joi_1.default.string().min(2).max(15).required(),
            role: joi_1.default.string().optional(),
            email: joi_1.default.string()
                .required()
                .email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
            }),
            password: joi_1.default.string()
                .required()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        });
        const result = schema.validate(req.body);
        if (result.error) {
            throw new errorClass_1.BAD_REQUEST(result.error.message);
        }
        next();
    }
    catch (error) {
        next(next(error));
    }
};
exports.memberSchemaValidator = memberSchemaValidator;
const loginSchemaValidator = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
            }),
            password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        });
        const result = schema.validate(req.body);
        if (result.error) {
            throw new errorClass_1.BAD_REQUEST(result.error.message);
        }
        next();
    }
    catch (error) {
        next(next(error));
    }
};
exports.loginSchemaValidator = loginSchemaValidator;
const bookSchemaValidator = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            title: joi_1.default.string().min(2).max(15).required(),
            author: joi_1.default.string().min(2).max(15).required(),
            category: joi_1.default.string().min(2).max(15).required(),
            publish_year: joi_1.default.number().required(),
            rating: joi_1.default.number().required().max(10).min(1),
            language: joi_1.default.string().min(2).max(15).required(),
            pages: joi_1.default.number().required(),
            cover: joi_1.default.string().optional(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
            throw new errorClass_1.BAD_REQUEST(result.error.message);
        }
        next();
    }
    catch (error) {
        next(next(error));
    }
};
exports.bookSchemaValidator = bookSchemaValidator;
const updatebookSchemaValidator = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            title: joi_1.default.string().min(2).max(15).optional(),
            author: joi_1.default.string().min(2).max(15).optional(),
            category: joi_1.default.string().min(2).max(15).optional(),
            publish_year: joi_1.default.number().optional(),
            language: joi_1.default.string().min(2).max(15).optional(),
            rating: joi_1.default.number().optional().max(10).min(1),
            pages: joi_1.default.number().optional(),
            cover: joi_1.default.string().optional(),
            availablity: joi_1.default.boolean().optional(),
            lib_book_id: joi_1.default.string().optional(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
            throw new errorClass_1.BAD_REQUEST(result.error.message);
        }
        next();
    }
    catch (error) {
        next(next(error));
    }
};
exports.updatebookSchemaValidator = updatebookSchemaValidator;
