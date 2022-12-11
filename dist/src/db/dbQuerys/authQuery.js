"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
class authQuery {
    // find memeber is present in db or not
    async findMember(email) {
        return await (0, connection_1.default)("members").where({ email }).first("*");
    }
    //add new member in db
    async addNewMember(payload) {
        return await (0, connection_1.default)("members").insert(payload).returning("*");
    }
}
exports.default = new authQuery();
