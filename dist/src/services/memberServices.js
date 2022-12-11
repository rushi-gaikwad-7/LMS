"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memberQuery_1 = __importDefault(require("../db/dbQuerys/memberQuery"));
class memberService {
    // get all members
    async getAllmembers() {
        return await memberQuery_1.default.getAllMembers();
    }
}
exports.default = new memberService();
