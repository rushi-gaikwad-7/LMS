"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.createHashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createHashPassword = async (password) => {
    const hash = await bcrypt_1.default.hash(password, 10);
    return hash;
};
exports.createHashPassword = createHashPassword;
const checkPassword = async (password, hash_key) => {
    return await bcrypt_1.default.compare(password, hash_key);
};
exports.checkPassword = checkPassword;
