"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
class memberQuery {
    // get all memebers data
    async getAllMembers() {
        return await (0, connection_1.default)("members").select("*");
    }
}
exports.default = new memberQuery();
