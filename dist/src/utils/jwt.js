"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAccessToken = exports.signInAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret_key = process.env.ACCESS_TOKEN_SECRET || "";
const signInAccessToken = async (payload) => {
    return await jsonwebtoken_1.default.sign(payload, secret_key, {
        expiresIn: "1h",
    });
};
exports.signInAccessToken = signInAccessToken;
const VerifyAccessToken = async (access_token) => {
    return await jsonwebtoken_1.default.verify(access_token, secret_key);
};
exports.VerifyAccessToken = VerifyAccessToken;
