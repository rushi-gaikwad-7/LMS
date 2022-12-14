"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memberQuery_1 = __importDefault(require("../db/dbQuerys/memberQuery"));
const errorClass_1 = require("../utils/errorClass");
class memberService {
    // get all members
    async getAllmembers() {
        const member_data = await memberQuery_1.default.getAllMembers();
        if (member_data.length === 0) {
            throw new errorClass_1.NOT_FOUND();
        }
        return member_data;
    }
}
exports.default = new memberService();
